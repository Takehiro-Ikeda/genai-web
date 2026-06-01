import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ArticleBody from './ArticleBody';
import { getArticle, getGenre, type GenreKey } from './articles';

/**
 * 記事詳細ページ（全ジャンル共通）
 * URL: /column/:genre/:slug
 *
 * - 記事ヘッダー（総論バッジ／タイトル／サブタイトル／著者｜日付）
 * - 本文（prose-column 組版）
 * - 本文末尾に次回予告・他記事リンクは置かない（余韻優先・執筆側要望）
 * - 最下部に「ジャンル一覧へ戻る」の控えめナビのみ
 */
export default function ArticleDetailPage() {
  const { genre, slug } = useParams<{ genre: string; slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [genre, slug]);

  const genreObj = genre ? getGenre(genre as GenreKey) : undefined;
  const article = genre && slug ? getArticle(genre as GenreKey, slug) : undefined;

  // 該当記事が無い場合
  if (!genreObj || !article) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりませんでした</h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は移動または削除された可能性があります。
          </p>
          <Link to="/column" className="text-teal-600 hover:text-teal-700 font-medium">
            コラムトップへ戻る
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="パンくず">
          <Link to="/column" className="hover:text-teal-600 transition-colors">
            コラム
          </Link>
          <span>/</span>
          <Link to={`/column/${genreObj.key}`} className="hover:text-teal-600 transition-colors">
            {genreObj.title}
          </Link>
        </nav>

        {/* 記事ヘッダー */}
        <header className="mb-12 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            {article.isOverview && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-600 text-white text-xs font-bold">
                総論
              </span>
            )}
            <span className="text-xs font-medium text-teal-700 tracking-wide">
              {genreObj.label}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-snug mb-4">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-5">
              {article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{article.author}</span>
            <span className="text-gray-300">|</span>
            <time dateTime={article.dateISO}>{article.date}</time>
          </div>
        </header>

        {/* 本文 */}
        <ArticleBody blocks={article.body} />

        {/* シリーズ共通の結び（執筆側の定型フッター文） */}
        <p className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-400 leading-relaxed italic">
          このコラムでは「生成AI×〇〇」をテーマに、セキュリティ・ビジネス・ヘルスケア・暗黙知の四つの切り口から、生成AIとの向き合い方を綴っていきます。
        </p>
      </article>

      {/* 回遊ナビ（控えめ） */}
      <section className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to={`/column/${genreObj.key}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            {genreObj.title}の記事一覧へ
          </Link>
          <Link
            to="/contact"
            className="inline-block bg-teal-600 text-white text-center px-6 py-2.5 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            無料相談はこちら
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
