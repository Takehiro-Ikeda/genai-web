import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LOGO_URL =
  'https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png';

type NavItem = { label: string; to: string };

const NAV_ITEMS: NavItem[] = [
  { label: 'TOP', to: '/' },
  { label: 'サービス', to: '/product-overview' },
  { label: 'セミナー', to: '/seminar-overview' },
  { label: 'コラム', to: '/column' },
  { label: '会社概要', to: '/company' },
];

/**
 * サイト共通ヘッダー
 * - 全ページで同一のナビゲーションを提供（旧構成では各 page.tsx に nav が個別実装されていた）
 * - 方式①：すべてページ遷移ベース（同一ページ内アンカーは廃止）
 * - スクロール量に応じて透過⇔白背景を切り替え
 * - モバイル（md未満）はハンバーガーメニューで展開
 *
 * transparentTop:
 *   true  … ページ最上部でヘッダーを透過（ダーク系ヒーローを持つTOP等で使用）
 *   false … 常時白背景（白系ヒーローのページで使用）
 */
export default function Header({ transparentTop = false }: { transparentTop?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ページ遷移時はモバイルメニューを閉じ、先頭へスクロール
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  // 透過状態か（最上部 かつ transparentTop かつ メニュー閉）
  const isTransparent = transparentTop && !isScrolled && !isMenuOpen;

  const linkColor = isTransparent ? 'text-white' : 'text-gray-800';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ロゴ */}
        <Link to="/" className="flex items-center" aria-label="closip トップへ">
          <img src={LOGO_URL} alt="closip" className="h-10" />
        </Link>

        {/* PCメニュー */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-teal-600 whitespace-nowrap cursor-pointer ${linkColor} ${
                  active ? 'text-teal-600' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            お問い合わせ
          </Link>
        </div>

        {/* モバイル：ハンバーガー */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className={`md:hidden w-10 h-10 flex items-center justify-center text-2xl ${linkColor}`}
          aria-label="メニューを開閉"
          aria-expanded={isMenuOpen}
        >
          <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </button>
      </div>

      {/* モバイルメニュー本体 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`py-3 text-base font-medium transition-colors hover:text-teal-600 ${
                    active ? 'text-teal-600' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="mt-2 bg-teal-600 text-white text-center px-6 py-3 rounded-full text-base font-medium hover:bg-teal-700 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
