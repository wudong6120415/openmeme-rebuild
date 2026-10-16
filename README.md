# OpenMeme.art · 撸毛向实时信号站

> AI 扫全网 + 𝕏 @ruoxi01 真人筛选 · 把 1-2 周内有动作的撸毛机会, 大白话翻译给你看。

## 🎯 目标

**短期**: 服务撸毛社区, 引流到 𝕏 @ruoxi01
**长期**: 涨粉 → 个人 IP → 变现 (广告 / 付费数据 / 项目方合作)

## 🧱 技术栈

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** 自定义主题 (深色 + neon 绿)
- **DexScreener 公开 API** (无需 Key)
- **Vercel** 自动部署 (推 GitHub 即部署)

## 📁 目录结构

```
openmeme-rebuild/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 全局 layout + meta
│   ├── page.tsx             # 首页 (3 大板块)
│   ├── about/page.tsx       # 关于页
│   ├── api/
│   │   ├── signals/route.ts # 内部信号 JSON 接口
│   │   └── trending/route.ts# DexScreener trending
│   └── globals.css          # Tailwind 入口
├── components/               # React 组件 (Server Components 优先)
│   ├── Header.tsx
│   ├── TwitterBanner.tsx    # 顶部跑马灯
│   ├── Hero.tsx
│   ├── EarlyProjects.tsx    # 早期项目板块
│   ├── Airdrops.tsx         # 空投板块
│   ├── ScamAlerts.tsx       # 防骗预警板块
│   ├── WhyFollow.tsx
│   ├── FooterCTA.tsx
│   ├── Footer.tsx
│   └── TwitterButton.tsx    # 复用的 𝕏 跳转按钮
├── data/                     # 静态信号数据 (撸毛人手动更新)
│   ├── signals.ts
│   ├── airdrops.ts
│   └── scams.ts
├── lib/
│   └── site.ts              # 全局常量 (推特 handle 等)
├── public/
│   ├── logo.svg
│   └── og.svg
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## 🚀 本地开发

```bash
pnpm install
pnpm dev
# 打开 http://localhost:3000
```

## 📦 部署到生产

参见 [DEPLOY.md](./DEPLOY.md)。

## 📝 更新内容

撸毛信号是手工编辑的, 流程:

1. 编辑 `data/signals.ts` / `data/airdrops.ts` / `data/scams.ts`
2. `git add . && git commit -m "update signals"`
3. `git push` → Vercel 自动部署

## ⚖️ 免责声明

本网站所有内容仅供信息聚合与研究参考, **不构成任何投资建议**。
撸毛 / Meme 币风险极高, 多数最终归零。请 DYOR。
