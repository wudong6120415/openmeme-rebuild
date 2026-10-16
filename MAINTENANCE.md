# 🛠️ 长期维护手册

> 任何时候你想更新 / 修改 / 加功能 — **直接跟 AI 说就行**，AI 会自动调用 Token 完成部署。

---

## 📍 项目位置

| 资源 | 路径 / URL |
|---|---|
| **本地项目** | `F:\deepseek\openmeme-rebuild\` |
| **GitHub 仓库** | https://github.com/wudong6120415/openmeme-rebuild |
| **Vercel 项目** | https://vercel.com/dashboard/openmeme1/openmeme-rebuild |
| **生产 URL（临时）** | https://openmeme-rebuild.vercel.app |
| **生产 URL（绑定后）** | https://openmeme.art |

---

## 🔐 Token 存储位置

| 文件 | 内容 | 权限 |
|---|---|---|
| `C:\Users\Administrator\.openmeme\credentials.json` | GitHub + Vercel Token + 项目元信息 | 只有当前用户 + SYSTEM 可读 |
| `C:\Users\Administrator\.openmeme\load.ps1` | 加载脚本 (`source` 即生效) | — |
| `C:\Users\Administrator\.openmeme\.git-credentials` | Git HTTPS 凭证 (自动) | 只有当前用户 + SYSTEM 可读 |

**加载方式**：每次 AI 需要执行 `git` / `vercel` 命令时，会自动运行：
```powershell
. $env:USERPROFILE\.openmeme\load.ps1
```

你不需要手动做任何事。

---

## 🔄 日常更新工作流

### 场景 1: 加 / 改 / 删信号内容
**你说**： `"加一条新 Meme, XYZ 项目, Solana 链, 7 天 TGE"`  
**我做**：
1. 改 `data/signals.ts`
2. `git commit && git push`  → 自动部署到 Vercel
3. 30 秒 - 2 分钟后 `openmeme.art` 显示新内容

### 场景 2: 改文案 / Slogan / 标题
**你说**： `"主标题改成 '撸毛人自己的站'"`  
**我做**：改对应文件 → push → 部署。

### 场景 3: 加新功能（搜索、详情页、表单、爬虫……）
**你说**： `"我要加个搜索框，按链筛选 Meme"`  
**我做**：写新组件 / 路由 / API → push → 部署。

### 场景 4: 接入新数据源
**你说**： `"加 CoinGecko 的市值数据"`  
**我做**：写 API route → 接入 → push → 部署。

### 场景 5: 紧急回滚
**你说**： `"刚才那次部署有问题，回滚到上版本"`  
**我做**：`vercel rollback` 到上一个 production 部署。

---

## ⏱ 部署时间参考

| 操作 | 时间 |
|---|---|
| GitHub push | 5-10 秒 |
| Vercel 自动 build | 30-60 秒 |
| 全球 CDN 生效 | 1-3 分钟 |
| DNS 缓存（如有变更） | 5-30 分钟 |

**总计：每次更新从你说话到上线，约 1-3 分钟**。

---

## 📊 部署后能做的事

| 工具 | 用途 |
|---|---|
| Vercel Dashboard | 看每次部署日志、回滚、查看流量 |
| Vercel Analytics | （开启后）看访问量、用户来源 |
| GitHub | 看每次 commit 历史 |
| `/stats/` 子页（未来） | 自建访问统计 |

---

## ⚠️ 重要事项

1. **Token 不能丢**：`credentials.json` 不要删。如果重装系统或换电脑，需要重新生成 Token 给我。
2. **DNS 不能动**：openmeme.art 的 A 记录和 CNAME 记录保留指向 Vercel。
3. **Vercel 团队**：项目在 `openmeme1` 团队下，不要删除这个团队。
4. **GitHub 仓库**：仓库 `openmeme-rebuild` 不能改成 Private（Vercel 免费层需要 Public）。

---

## 🆘 常见问题

**Q: AI 不工作了？**
- 检查 `C:\Users\Administrator\.openmeme\credentials.json` 是否还在
- 检查文件内容是否被误改
- 让 AI 重新跑一次 `. $env:USERPROFILE\.openmeme\load.ps1` 自检

**Q: 想换域名？**
- 跟我说："我要把 openmeme.art 换成新域名"
- 我帮你 Vercel 加新域名 + 你在 DNSPod 改解析

**Q: 想加广告 / 变现？**
- 跟我说："加 Google Analytics" / "加广告位"
- 我帮你接 GA4 / 接广告代码 / 接联盟链接

**Q: Token 过期了怎么办？**
- Vercel Token 我设的 1 年有效期，GitHub PAT 是 No expiration
- 1 年后我会提醒你重新生成

---

## 📞 你只需要说一句话

```
"加新信号: ..."
"改 Slogan: ..."
"加功能: ..."
"出了什么问题: ..."
```

剩下的我处理。
