import type { ArticleBlock, InlineNode } from './articles';

/** インラインノード（文字列 or 強調）をレンダリング */
function renderInline(nodes: InlineNode[]) {
  return nodes.map((node, i) => {
    if (typeof node === 'string') return <span key={i}>{node}</span>;
    if (node.strong) return <strong key={i}>{node.text}</strong>;
    return <span key={i}>{node.text}</span>;
  });
}

/**
 * 記事本文レンダラ
 * articles.ts の body（ArticleBlock[]）を prose-column 組版で描画する。
 * TOP論説と同じスタイル（行間広め・見出しに区切り線・strongはteal）。
 */
export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-column">
      {blocks.map((block, i) => {
        if (block.type === 'h') {
          return <h3 key={i}>{block.text}</h3>;
        }
        return <p key={i}>{renderInline(block.nodes)}</p>;
      })}
    </div>
  );
}
