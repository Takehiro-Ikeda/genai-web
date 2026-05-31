import { useEffect } from 'react';
import Header from '../../components/Header';

/**
 * 会社概要ページ
 * 登記情報をテーブル形式で掲載。
 */

type Row = { label: string; value: React.ReactNode };

const COMPANY_INFO: Row[] = [
  { label: '社名', value: '株式会社 closip' },
  { label: '代表取締役', value: '池田 武弘' },
  {
    label: '本社所在地',
    value: (
      <>
        〒105-0004
        <br />
        東京都港区新橋1-12-9 新橋プレイス7F
      </>
    ),
  },
  { label: '設立', value: '2016年9月20日' },
  {
    label: '資本金',
    value: (
      <>
        92,004千円
        <span className="block text-sm text-gray-500 mt-1">（総調達額：1,784,008千円）</span>
      </>
    ),
  },
  {
    label: '事業内容',
    value: (
      <>
        <p className="mb-3">
          <span className="font-medium text-gray-900">closipSIM事業</span>
          <br />
          仮想閉域化技術を用いたセキュリティ関連事業
        </p>
        <p>
          <span className="font-medium text-gray-900">生成AI関連事業</span>
          <br />
          AI特化コンサルティング事業、AI人材育成事業、セキュアエージェント事業
        </p>
      </>
    ),
  },
];

export default function CompanyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* ページヘッダー */}
      <header className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-medium text-teal-700 tracking-wide mb-4">COMPANY</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">会社概要</h1>
        </div>
      </header>

      {/* 会社情報テーブル */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <dl className="divide-y divide-gray-200 border-t border-gray-200">
          {COMPANY_INFO.map((row) => (
            <div
              key={row.label}
              className="flex flex-col md:flex-row py-6 gap-2 md:gap-8"
            >
              <dt className="md:w-48 shrink-0 text-sm font-bold text-gray-900 md:pt-0.5">
                {row.label}
              </dt>
              <dd className="text-base text-gray-700 leading-relaxed">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            お問い合わせはこちらから
          </h2>
          <a
            href="/contact"
            className="inline-block bg-teal-600 text-white px-10 py-3.5 rounded-full text-base font-semibold hover:bg-teal-700 transition-colors shadow-lg whitespace-nowrap"
          >
            お問い合わせページへ
          </a>
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
