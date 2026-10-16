import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-bg-border bg-bg-base">
      <div className="container-narrow py-10">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 mb-8 text-sm text-zinc-300 leading-relaxed">
          <div className="font-bold text-amber-400 mb-2">⚠ 免责声明</div>
          本网站所有内容仅供<span className="font-semibold">信息聚合与研究参考</span>,
          <span className="font-semibold text-rose-400">不构成任何投资建议</span>。
          <ul className="mt-3 space-y-1 text-xs text-zinc-400 list-disc list-inside">
            <li>加密资产价格波动剧烈, 可能损失全部本金</li>
            <li>Meme 币 / 空投 / 撸毛项目风险极高, 多数最终归零</li>
            <li>请 DYOR (Do Your Own Research), 自行评估风险</li>
            <li>数据来自第三方公开 API + 推特大V, 不保证 100% 准确</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
          <div>
            <div className="font-bold">{SITE.name}</div>
            <div className="text-xs text-zinc-500 mt-1">
              © {new Date().getFullYear()} · 由 @ruoxi01 维护
            </div>
          </div>
          <div className="flex gap-4 text-zinc-400">
            <a href={SITE.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88]">
              𝕏 @ruoxi01
            </a>
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88]">
              GitHub
            </a>
            <a href="#early" className="hover:text-[#00ff88]">回到顶部 ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
