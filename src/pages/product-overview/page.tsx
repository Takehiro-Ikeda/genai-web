import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductOverviewPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleTopClick = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavClick = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // ページ読み込み時に最上部にスクロール
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problems = [
    {
      icon: 'ri-shield-cross-line',
      title: 'セキュリティ制約',
      description: '機密データをクラウドに預けられない。厳しい情報管理ルールが導入の壁になっている。'
    },
    {
      icon: 'ri-time-line',
      title: '生成AIを学ぶ時間が無い',
      description: '日々の業務に追われ、新しいツールの検証や生成AIの導入・定着にまで手が回らない。'
    }
  ];

  const features = [
    {
      icon: 'ri-shield-check-line',
      title: '安全',
      description: '生成AIを自社内環境で運用するため、機密データを社外に出すことなく活用できます。セキュリティ要件が厳しい組織でも安心して導入可能です。',
      image: '/images/secure.jpg'
    },
    {
      icon: 'ri-server-line',
      title: '簡単',
      description: 'AIに実行させたい業務は closip社が事前に開発し、すぐに使える状態でお届け。生成AIを「学ぶ」負担を最小限に抑え、日常業務ですぐに活用できます',
      image: 'https://readdy.ai/api/search-image?query=Compact%20high-performance%20AI%20server%20unit%20in%20modern%20office%20environment%20showing%20sleek%20design%20and%20easy%20installation%20with%20plug-and-play%20setup%20in%20professional%20minimalist%20beige%20aesthetic%20emphasizing%20convenience%20and%20powerful%20computing%20capability%20in%20small%20form%20factor&width=600&height=400&seq=602&orientation=landscape'
    },
    {
      icon: 'ri-brain-line',
      title: '高い費用対効果',
      description: '一度導入すれば、利用人数が増えてもコストは固定。クラウド型の従量課金と違い、組織全体で生成AIを安心して使い続けられます。',
      image: 'https://readdy.ai/api/search-image?query=AI%20learning%20from%20company%20documents%20and%20manuals%20showing%20customization%20and%20adaptation%20to%20organization-specific%20rules%20in%20professional%20workspace%20with%20neural%20network%20visualization%20in%20minimalist%20beige%20design%20emphasizing%20personalized%20AI%20employee%20training%20and%20business%20optimization&width=600&height=400&seq=603&orientation=landscape'
    }
  ];

  const models = [
    {
      type: '定常業務モデル',
      subtitle: '反復作業を自動化する「AI社員」',
      description: '審査・査定・分類など、毎日発生する事務処理を担当。人がやらなくていい業務をAIに任せ、業務効率化。',
      icon: 'ri-repeat-line',
      useCases: [
        '契約書審査・チェック',
        '申請書類の分類・振り分け',
        'データ入力・転記作業',
        '定型文書の作成'
      ]
    },
    {
      type: 'スポット業務モデル',
      subtitle: '繁忙期だけ使える「AI応援部隊」',
      description: '入試・確定申告など、年数回の業務ピークに対応。必要な期間だけレンタル可能。',
      icon: 'ri-calendar-check-line',
      useCases: [
        '確定申告シーズンの書類処理',
        '入試・採用シーズンの審査業務',
        '決算期の資料作成',
        '年度末の集計・分析業務'
      ]
    }
  ];

  const targetIndustries = [
    { name: '医療機関', icon: 'ri-hospital-line' },
    { name: '金融機関', icon: 'ri-bank-line' },
    { name: '行政機関', icon: 'ri-government-line' },
    { name: '士業', icon: 'ri-briefcase-line' },
    { name: '大企業', icon: 'ri-building-line' },
    { name: '研究機関', icon: 'ri-flask-line' }
  ];

  const pocSteps = [
    {
      step: 'Step 1',
      title: 'ヒアリング',
      description: '業務課題と要件を詳しくお伺いします'
    },
    {
      step: 'Step 2',
      title: '検証設計',
      description: '実際の業務データで検証プランを設計'
    },
    {
      step: 'Step 3',
      title: '無料PoC実施',
      description: '効果を実際に確認いただけます'
    },
    {
      step: 'Step 4',
      title: '導入判断',
      description: '効果を確認してから本導入を決定'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={handleTopClick} className="flex items-center cursor-pointer">
            <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-10" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={handleTopClick} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">TOP</button>
            <button onClick={() => handleNavClick('#problems')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">課題</button>
            <button onClick={() => handleNavClick('#features')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">特徴</button>
            <button onClick={() => handleNavClick('#models')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">活用モデル</button>
            <button onClick={() => handleNavClick('#poc')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">導入の流れ</button>
            <Link to="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">お問い合わせ</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/SapiaBox_in_office3.png" 
            alt="AI Infrastructure" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">データを外部に出せない組織のための</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            オフィスに置ける<br />「AI社員」
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto">
            完全オンプレミス型生成AIサーバー<br />
            <strong className="font-bold">SapiaBox</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?type=poc" className="inline-block bg-teal-600 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-teal-700 transition-all shadow-lg whitespace-nowrap cursor-pointer">
              オンプレ生成AIサーバについて問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {/* Target Industries Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600">情報管理やセキュリティを重視しながら、生成AIを安心して業務に活用したい組織に最適です。</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {targetIndustries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${industry.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-base font-bold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">多くの組織が抱える課題</h2>
            <p className="text-xl text-gray-600">AIを使いたくても使えない理由</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 shadow-sm">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${problem.icon} text-4xl text-red-600`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="inline-block bg-teal-600 text-white px-10 py-5 rounded-2xl">
              <p className="text-xl font-semibold">👉 オンプレミス生成AIが全て解決します</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">3つの特徴</h2>
            <p className="text-xl text-gray-600">安全・簡単・高い費用対効果</p>
          </div>
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                    <i className={`${feature.icon} text-4xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">選べる2つの活用モデル</h2>
            <p className="text-xl text-gray-600">業務スタイルに合わせて選択可能</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {models.map((model, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${model.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.type}</h3>
                <p className="text-base text-teal-600 font-semibold mb-4">{model.subtitle}</p>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">{model.description}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">活用例</h4>
                  <ul className="space-y-3">
                    {model.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="ri-check-line text-lg text-teal-600 flex-shrink-0 mt-1"></i>
                        <span className="text-sm text-gray-700">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PoC Section */}
      <section id="poc" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">導入前に試せる仕組み</h2>
            <p className="text-xl text-gray-600">無料PoC（概念実証）で効果を確認</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl p-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                {pocSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {index + 1}
                    </div>
                    <div className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-bold mb-3 inline-block">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">実際の業務データで効果を検証</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              導入前に「使えないリスク」をゼロにできる。<br />
              効果を確認してから本導入を判断可能。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-block bg-white text-gray-900 px-12 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap cursor-pointer"
              >
                無料PoCを申し込む
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            クラウドに出せないデータを扱う組織でも、<br />
            安全に・現実的に・業務で使える生成AI
          </h2>
          <p className="text-2xl font-semibold text-teal-400 mb-12">
            オフィス常駐型「AI社員」が、あなたの組織の業務を変えます。
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white text-gray-900 px-12 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            お問い合わせ
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-10 mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm leading-relaxed">
                完全オンプレミス型生成AIサーバー。<br />
                機密データを守りながら、業務を劇的に効率化。
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">サービス</h4>
              <ul className="space-y-3">
                <li><Link to="/product-overview" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">オンプレミス生成AIサーバー</Link></li>
                <li><Link to="/seminar-overview" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">実践的生成AI活用セミナー</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">お問い合わせ</h4>
              <ul className="space-y-3">
                <li><Link to="/contact?type=poc" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">お問い合わせフォーム</Link></li>
                <li><button onClick={handleTopClick} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">TOP</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
