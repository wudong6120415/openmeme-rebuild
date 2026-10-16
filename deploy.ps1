# OpenMeme 一键部署脚本
# 用途: 改完代码后跑一次这个，代码上 GitHub + 网站更新，全程无需手动

param(
    [string]$Message = "update: content refresh"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Load credentials
. $env:USERPROFILE\.openmeme\load.ps1

Write-Host "=== Step 1/3: git commit + push ===" -ForegroundColor Cyan
git add -A
$hasChanges = git diff --cached --quiet; $hasChanges = $LASTEXITCODE -ne 0
if (-not $hasChanges) {
    Write-Host "  (no local changes to commit)" -ForegroundColor Yellow
} else {
    git commit -m $Message 2>&1 | Select-Object -Last 3
}
git push 2>&1 | Select-Object -Last 3

Write-Host "`n=== Step 2/3: deploy to Vercel ===" -ForegroundColor Cyan
vercel deploy --prod --yes --token $env:VERCEL_TOKEN --scope $env:VERCEL_SCOPE 2>&1 | Select-Object -Last 10

Write-Host "`n=== Step 3/3: verify ===" -ForegroundColor Cyan
Start-Sleep -Seconds 5
$h = @{ Authorization = "Bearer $env:VERCEL_TOKEN" }
$teamId = $env:VERCEL_ORG_ID
$projId = $env:VERCEL_PROJECT_ID
$proj = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/$projId/deployments?teamId=$teamId&limit=1" -Headers $h
$d = $proj.deployments[0]
Write-Host "  deployment: $($d.uid)" -ForegroundColor Green
Write-Host "  state: $($d.state)"
Write-Host "  url: https://$($d.url)"
Write-Host "  ready: $(if ($d.ready) {'YES'} else {'building...'})"

Write-Host "`n=== Live site check ===" -ForegroundColor Cyan
try {
  $prod = Invoke-WebRequest -Uri "https://openmeme.art" -Method GET -UseBasicParsing -TimeoutSec 15
  Write-Host "  openmeme.art: HTTP $($prod.StatusCode) · title=$(([regex]::Match($prod.Content, '<title>(.*?)</title>')).Groups[1].Value)"
} catch {
  Write-Host "  ERROR: $($_.Exception.Message)"
}

Write-Host "`n✓ Done. openmeme.art updated." -ForegroundColor Green
