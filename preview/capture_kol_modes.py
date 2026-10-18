"""Open browser, capture 4 KOL section screenshots:
1. Featured view (default)
2. Grid view
3. Table view
4. Modal open
"""
import os, sys, time, subprocess
from PIL import Image, ImageDraw, ImageFont

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

CHROME = r"C:\Users\Administrator\AppData\Local\Google\Chrome\Bin\chrome.exe"
PREVIEW = r"F:\deepseek\openmeme-rebuild\preview"

def find_font(sz):
    for p in [r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\msyh.ttc",
              r"C:\Windows\Fonts\arial.ttf"]:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, sz)
            except: pass
    return ImageFont.load_default()

def build_sheet(paths, labels, out):
    imgs = [Image.open(p).convert("RGB") for p in paths]
    w, h = imgs[0].size
    label_h = 60
    sheet = Image.new("RGB", (w, (h + label_h) * len(imgs) + 20), (15, 15, 18))
    d = ImageDraw.Draw(sheet)
    fnt = find_font(36)
    sub = find_font(20)
    y = 10
    for img, lbl in zip(imgs, labels):
        d.text((20, y), lbl, font=fnt, fill=(230, 230, 230))
        sheet.paste(img, (0, y + label_h - 10))
        y += h + label_h
    sheet.save(out, optimize=True)
    print(f"saved: {out}  {sheet.size}")

# Step 1: kill old chrome, open KOL section
subprocess.run(["powershell", "-Command", "Get-Process chrome -ErrorAction SilentlyContinue | ForEach-Object { $_.Kill() }"],
               capture_output=True)
time.sleep(2)
subprocess.Popen([CHROME, "--start-maximized", "--new-window", "https://openmeme.art#kol"],
                 creationflags=subprocess.CREATE_NO_WINDOW)
time.sleep(8)  # wait for load

# Screenshot 1: Featured (default)
out1 = os.path.join(PREVIEW, "kol-1-featured.png")
subprocess.run(["powershell", "-Command", f"""
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)
$bmp.Save('{out1}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
"""])
print(f"saved 1: featured")

# Step 2: Click Grid tab - need to find tab position
# Tabs are near the top. Let me click via keyboard or coordinates
# Easier: use Ctrl+F5 to refresh, then navigate via URL hash
# Actually the view tabs are buttons, can't reach them via URL
# Let me use SendKeys to click them

# Click Grid tab - position: roughly 1050, 410 (in 1920x1080)
# Actually let me use URL approach: I'll need JS via DevTools, too complex
# Let me use mouse click via PowerShell

print("clicking grid tab...")
subprocess.run(["powershell", "-Command", f"""
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WC {{
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(int dw, int dx, int dy, int dw2, int dw3);
}}
"@ -ReferencedAssemblies System.Runtime.InteropServices
[WC]::SetCursorPos(1010, 410)
Start-Sleep -Milliseconds 200
[WC]::mouse_event(2, 0, 0, 0, 0)  # down
[WC]::mouse_event(4, 0, 0, 0, 0)  # up
Start-Sleep -Seconds 2
"""])
time.sleep(2)

out2 = os.path.join(PREVIEW, "kol-2-grid.png")
subprocess.run(["powershell", "-Command", f"""
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)
$bmp.Save('{out2}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
"""])
print(f"saved 2: grid")

# Step 3: Click Table tab (~1180, 410)
print("clicking table tab...")
subprocess.run(["powershell", "-Command", f"""
[WC]::SetCursorPos(1140, 410)
Start-Sleep -Milliseconds 200
[WC]::mouse_event(2, 0, 0, 0, 0)
[WC]::mouse_event(4, 0, 0, 0, 0)
Start-Sleep -Seconds 2
"""])
time.sleep(2)

out3 = os.path.join(PREVIEW, "kol-3-table.png")
subprocess.run(["powershell", "-Command", f"""
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)
$bmp.Save('{out3}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
"""])
print(f"saved 3: table")

# Step 4: Click first project to open modal
print("opening modal...")
subprocess.run(["powershell", "-Command", f"""
[WC]::SetCursorPos(640, 740)  # first card center
Start-Sleep -Milliseconds 200
[WC]::mouse_event(2, 0, 0, 0, 0)
[WC]::mouse_event(4, 0, 0, 0, 0)
Start-Sleep -Seconds 2
"""])
time.sleep(2)

out4 = os.path.join(PREVIEW, "kol-4-modal.png")
subprocess.run(["powershell", "-Command", f"""
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)
$bmp.Save('{out4}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
"""])
print(f"saved 4: modal")

# Build comparison sheet
build_sheet(
    [out1, out2, out3, out4],
    [
        "1. 精选视图 (Featured) - Top 3 大卡",
        "2. 网格视图 (Grid) - 15 项目 5×3 网格",
        "3. 列表视图 (Table) - 排序列表",
        "4. 详情弹窗 (Modal) - 点击项目展开",
    ],
    os.path.join(PREVIEW, "kol-all-modes.png")
)
print("done")
