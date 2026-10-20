"use client";

import { useEffect, useState } from "react";
import { getComments, addComment, deleteComment, fmtRelative, type Comment } from "@/lib/community";
import { SITE } from "@/lib/site";

export function Comments({ section, title }: { section: Comment["section"]; title: string }) {
  const [list, setList] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setList(getComments(section));
  }, [section]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text, section, author || "匿名撸毛人");
    setText("");
    setList(getComments(section));
  }

  function remove(id: string) {
    deleteComment(id);
    setList(getComments(section));
  }

  return (
    <div className="mt-8 rounded-xl border border-bg-border bg-bg-card/40 overflow-hidden">
      {/* header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3 flex items-center justify-between hover:bg-zinc-900/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <span className="font-semibold text-zinc-100 text-sm">{title}</span>
          <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs">{list.length}</span>
        </div>
        <span className="text-zinc-500 text-xs">{open ? "收起 ↑" : "展开 ↓"}</span>
      </button>

      {open && (
        <div className="border-t border-bg-border">
          {/* list */}
          <div className="max-h-96 overflow-y-auto">
            {list.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <div className="text-3xl mb-2">💭</div>
                <div className="text-sm text-zinc-400 mb-1">还没有留言</div>
                <div className="text-xs text-zinc-600">来说两句 · 分享你最近看到的撸毛机会</div>
              </div>
            ) : (
              list.map((c) => (
                <div key={c.id} className="px-5 py-3 border-b border-bg-border/50 last:border-b-0 group">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00ff88]/30 to-emerald-600/20 flex items-center justify-center text-xs font-bold text-[#00ff88] shrink-0">
                      {c.author.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-zinc-200">{c.author}</span>
                        <span className="text-zinc-600">{fmtRelative(c.createdAt)}</span>
                        <button
                          onClick={() => remove(c.id)}
                          className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-400 transition-all"
                          title="删除（仅本机）"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-sm text-zinc-300 mt-1 leading-relaxed whitespace-pre-wrap break-words">
                        {c.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* form */}
          <form onSubmit={submit} className="p-4 border-t border-bg-border bg-zinc-900/30 space-y-2">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="你的昵称（可选）"
              maxLength={20}
              className="w-full bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#00ff88] transition-colors"
            />
            <div className="flex gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="分享你的撸毛心得 / 看到的早期项目…"
                maxLength={300}
                rows={2}
                className="flex-1 bg-bg-card border border-bg-border rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#00ff88] transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="px-4 rounded-lg bg-[#00ff88] text-black font-bold text-sm hover:bg-[#00cc6e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors self-start"
              >
                发送
              </button>
            </div>
            <div className="text-[10px] text-zinc-600">
              留言仅保存在你自己的浏览器（localStorage），用于演示交互效果
            </div>
          </form>
        </div>
      )}
    </div>
  );
}