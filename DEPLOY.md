# 部署指南 (给非技术用户)

本指南一步一步教你把代码部署到生产环境, 让 `openmeme.art` 显示新站。

---

## 📋 前置条件 (你只需要准备一次)

### 1. GitHub 账号
- 已有: `wudong6120415`
- 新仓库名: `openmeme-rebuild` (我会帮你创建)

### 2. Vercel 账号
1. 打开 https://vercel.com/signup
2. 点击 **"Continue with GitHub"** (用你的 GitHub 登录)
3. 授权 Vercel 访问你的 GitHub
4. 进入 Dashboard 后, 右上角头像 → **Account Settings** → **Tokens**
5. **Create Token**:
   - Name: `openmeme-deploy`
   - Scope: **Full Account**
   - Expiration: 你自己选 (建议 1 年)
6. **复制 Token 发给我** (格式类似 `vercel_xxxxxxxxxx`)

> ⚠️ Token 只显示一次, 请立即复制保存。

---

## 🚀 部署流程 (我执行, 你看着)

### 步骤 1: 在 GitHub 创建仓库
- 仓库名: `openmeme-rebuild`
- 可见性: **Public** (Vercel 免费层需要)
- 我会用你给的 PAT 自动创建并推送代码

### 步骤 2: 我部署到 Vercel
- 我会运行 `vercel deploy --prod`
- 部署完成后会给你一个 `*.vercel.app` 的临时域名

### 步骤 3: 把 openmeme.art 指向 Vercel
在 Vercel 项目设置里加自定义域名:
1. Vercel Dashboard → 选中项目 → **Settings** → **Domains**
2. 输入 `openmeme.art` → 点击 **Add**
3. Vercel 会告诉你 DNS 怎么配
4. 去你的域名服务商 (看 WHOIS 查到) 修改:
   - 如果域名在 Cloudflare: 加一条 CNAME `www` → `cname.vercel-dns.com`, 加一条 A `@` → `76.76.21.21`
   - 如果在阿里云 / 腾讯云 / GoDaddy: 类似操作, 看 Vercel 给的具体记录
5. 等 5-30 分钟, DNS 生效, `openmeme.art` 自动指向新站

### 步骤 4: 我帮你配置 HTTPS
- Vercel 自动签发 Let's Encrypt SSL 证书
- 无需你操作

---

## 🔄 以后更新网站怎么操作?

我帮你改完代码, 你只需要:
1. 我执行 `git push` 到 GitHub
2. Vercel **自动**检测到更新并部署
3. 1-2 分钟后 `openmeme.art` 自动更新

**你完全不需要动手。**

---

## ❓ 常见问题

**Q: 部署需要花钱吗?**
A: Vercel 免费层完全够用 (100GB 流量/月)。后续流量大了再考虑付费。

**Q: 原站 (openmeme.art 现在的内容) 会被覆盖吗?**
A: 是的, 切换 DNS 后就指向新站。建议先用 Vercel 临时域名预览, 满意后再切 DNS。

**Q: 如果我不满意, 能回滚吗?**
A: 可以。Vercel Dashboard → Deployments → 点历史部署 → **Promote to Production**。

**Q: Token 安全吗?**
A: 任何时候你觉得不安全, 都可以去 GitHub/Vercel 后台 Revoke 掉, 然后告诉我生成新的。

---

## 📞 我现在等你做什么?

**唯一需要你做的**: 把 Vercel Token 发给我。

格式: `vercel_xxxxxxxxxxxxxxxxxxxxx`

发完我立刻:
1. git push 到 GitHub
2. vercel deploy
3. 给你 Vercel 临时预览链接
4. 告诉你怎么切 DNS 到 `openmeme.art`
