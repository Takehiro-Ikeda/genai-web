import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { getArticlesByGenre, getGenre, type GenreKey, type Article } from './articles';

/**
 * ジャンル一覧ページ（全ジャンル共通）
 * URL: /column/:genre
 *
 * - 総論（isOverview）は最上段に横長の大カードで「筆頭」として別格表示＋「総論」バッジ
 * - それ以外の記事は下に通常カードで並ぶ（今後 A-2, A-3... が増える器）
 * - 回遊導線はこの一覧側で担う（執筆側要望）
 */

/** 総論の筆頭大カード */
function OverviewCard({ article, genreKey }: { article: Article; genreKey: GenreKey }) {
  return (
    <Link
      to={`/column/${genreKey}/${article.slug}`}
      className="block bg-white rounded-2xl border-2 border-teal-600 p-8 md:p-10 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-600 text-white text-xs font-bold">
          総論
        </span>
        <span className="text-xs font-medium text-teal-700 tracking-wide">筆頭記事</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-serif text-gray-900 leading-snug mb-3">
        {article.title}
      </h2>
      {article.subtitle && (
        <p className="text-base text-gray-500 mb-4">{article.subtitle}</p>
      )}
      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">{article.lead}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{article.author}</span>
          <span className="text-gray-300">|</span>
          <time dateTime={article.dateISO}>{article.date}</time>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600">
          記事を読む
          <i className="ri-arrow-right-line"></i>
        </span>
      </div>
    </Link>
  );
}

/** 通常記事カード（A-2以降） */
function ArticleCard({ article, genreKey }: { article: Article; genreKey: GenreKey }) {
  return (
    <Link
      to={`/column/${genreKey}/${article.slug}`}
      className="block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{article.title}</h3>
      {article.subtitle && (
        <p className="text-sm text-gray-500 mb-3">{article.subtitle}</p>
      )}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{article.lead}</p>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <time dateTime={article.dateISO}>{article.date}</time>
      </div>
    </Link>
  );
}

export default function GenreListPage() {
  const { genre } = useParams<{ genre: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [genre]);

  const genreObj = genre ? getGenre(genre as GenreKey) : undefined;

  if (!genreObj) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ページが見つかりませんでした</h1>
          <Link to="/column" className="text-teal-600 hover:text-teal-700 font-medium">
            コラムトップへ戻る
          </Link>
        </main>
      </div>
    );
  }

  const articles = getArticlesByGenre(genreObj.key);
  const overview = articles.find((a) => a.isOverview);
  const others = articles.filter((a) => !a.isOverview);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* ページヘッダー */}
      <header className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="パンくず">
            <Link to="/column" className="hover:text-teal-600 transition-colors">
              コラム
            </Link>
            <span>/</span>
            <span className="text-gray-500">{genreObj.title}</span>
          </nav>
          <p className="text-sm font-medium text-teal-700 tracking-wide mb-3">{genreObj.label}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
            {genreObj.title} × 生成AI
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">{genreObj.lead}</p>
        </div>
      </header>

      {/* 記事一覧 */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">準備中です。近日公開予定です。</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 総論（筆頭・大カード） */}
            {overview && <OverviewCard article={overview} genreKey={genreObj.key} />}

            {/* その他記事（通常カード・2カラム） */}
            {others.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {others.map((a) => (
                  <ArticleCard key={a.slug} article={a} genreKey={genreObj.key} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 他ジャンルへ戻る導線 */}
      <section className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link
            to="/column"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            コラムトップ（四つの切り口）へ
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} closip Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
