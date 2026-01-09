import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SeminarOverviewPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ページ読み込み時に最上部にスクロール
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const reasons = [
    {
      icon: 'ri-shield-check-line',
      title: 'セキュリティ専門家による指導',
      description: '安全な活用方法を専門家が監修・指導します'
    },
    {
      icon: 'ri-briefcase-line',
      title: '業務プロセスに即した実践カリキュラム',
      description: '明日から使える実務直結の内容です'
    },
    {
      icon: 'ri-team-line',
      title: '幅広い職種・部門に対応',
      description: '税理士、医療、不動産など多様な業界で実績'
    },
    {
      icon: 'ri-discuss-line',
      title: '双方向・対面形式で定着度が高い',
      description: '質問しやすく、理解が深まる環境'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: '助成金対象',
      description: '条件により大幅なコスト削減が可能'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: '伴走型AIパートナーによる継続支援',
      description: 'セミナー後も継続的にサポート'
    }
  ];

  const steps = [
    {
      step: 'Step 1',
      title: '生成AIの基礎と実践事例',
      duration: '2時間',
      description: 'AIの基本概念から実際のビジネス活用事例まで、全体像を理解します。'
    },
    {
      step: 'Step 2',
      title: 'AIを使いこなす準備',
      duration: '2時間',
      description: 'AIパートナー設定を通じて、効果的な活用の土台を作ります。'
    },
    {
      step: 'Step 3',
      title: '業務活用・基礎編',
      duration: '2時間',
      description: '日常業務での基本的な活用方法を実践的に学びます。'
    },
    {
      step: 'Step 4',
      title: '業務活用・応用編',
      duration: '2時間',
      description: 'より高度な業務シーンでの活用テクニックを習得します。'
    },
    {
      step: 'Step 5',
      title: '業務活用・発展編',
      duration: '2時間',
      description: '複雑な業務プロセスへの統合方法を学びます。'
    },
    {
      step: 'Step 6',
      title: '目的別・発展的活用法',
      duration: '2時間',
      description: '自社の課題に合わせた応用力を身につけます。'
    }
  ];

  const problems = [
    {
      icon: 'ri-question-line',
      text: '何から始めればいいかわからない'
    },
    {
      icon: 'ri-shield-cross-line',
      text: 'セキュリティやリスクが不安'
    },
    {
      icon: 'ri-lightbulb-line',
      text: '業務にどう使えばいいかイメージできない'
    }
  ];

  const results = [
    {
      number: '30〜50',
      unit: '時間/月',
      description: '業務時間削減',
      detail: '情報収集・要約・資料作成・分析などが大幅効率化'
    },
    {
      number: '99.2',
      unit: '%',
      description: '満足度',
      detail: '受講者から高い評価をいただいています'
    },
    {
      number: '数ヶ月',
      unit: '以内',
      description: '投資回収',
      detail: '多くの企業で早期に効果を実感'
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
            <button onClick={() => handleNavClick('#concept')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">コンセプト</button>
            <button onClick={() => handleNavClick('#program')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">プログラム</button>
            <button onClick={() => handleNavClick('#results')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">導入効果</button>
            <Link to="/contact?type=seminar" className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">体験セミナーについて相談する</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/seminar_scene.jpg" 
            alt="Seminar" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">満足度99.2%</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            生成AIを<br />「仕事の相棒」にする
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto">
            実践的生成AI活用セミナー<br />
            生成AIの動作原理、生成AIを効果的に活用する思考法、具体的な生成AIテクニック、業務への落とし込みまで体系的に学ぶことができます。
          </p>
          <div className="flex justify-center">
            <a href="#free-seminar" className="inline-block bg-teal-600 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-teal-700 transition-all shadow-lg whitespace-nowrap cursor-pointer">
              体験セミナーについて相談する
            </a>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">セミナーのコンセプト</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              生成AIは一部の人の武器ではなく、<br />
              使うか使わないかで「仕事のスピード・質」に決定的な差が出る時代。<br />
              <strong className="text-teal-600">生成AIを「仕事の相棒」にすることがゴール</strong>です。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-lightbulb-flash-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">考え方</h3>
              <p className="text-gray-600 text-sm">AIを活用するための思考法を習得</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-tools-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">使い方</h3>
              <p className="text-gray-600 text-sm">実践的なスキルとテクニック</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-rocket-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">業務への落とし込み</h3>
              <p className="text-gray-600 text-sm">明日から使える実務直結の内容</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">なぜ多くの人がAI活用につまずくのか</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              原因は「AIが難しいから」ではありません。<br />
              <strong className="text-teal-600">正しい考え方と使い方を教わる機会がなかっただけ</strong>です。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${problem.icon} text-3xl text-red-600`}></i>
                </div>
                <p className="text-lg font-semibold text-gray-900">{problem.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="inline-block bg-teal-600 text-white px-8 py-4 rounded-2xl">
              <p className="text-lg font-semibold">👉 このセミナーで全て解決します</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">このセミナーが提供する約束</h2>
            <p className="text-xl text-gray-600">AIを「仕事で使える力」に変えるために</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-briefcase-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">実務直結</h3>
              <p className="text-gray-600 leading-relaxed">明日から業務で使える具体スキルを習得</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">セキュリティ重視</h3>
              <p className="text-gray-600 leading-relaxed">専門家監修のもと、安全な活用方法を指導</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-refresh-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">再現性のある方法論</h3>
              <p className="text-gray-600 leading-relaxed">一度きりで終わらず、継続的に成果が出る思考とスキルが身につく</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">プログラム構成</h2>
            <p className="text-xl text-gray-600">全6ステップ・12時間で基礎から応用・自走まで完全ナビゲート</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold">{step.step}</span>
                  <span className="text-sm text-gray-600 font-medium">{step.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">導入効果</h2>
            <p className="text-xl text-gray-600">数値で見える成果</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {results.map((result, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 text-center">
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-teal-600">{result.number}</span>
                  <span className="text-2xl font-semibold text-gray-700 ml-2">{result.unit}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{result.description}</h3>
                <p className="text-sm text-gray-600">{result.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">選ばれる6つの理由</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${reason.icon} text-3xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Seminar Section */}
      <section id="free-seminar" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-12 text-center">
            <div className="mb-6">
              <span className="bg-amber-500 text-white px-6 py-3 rounded-full text-base font-bold">無料セミナーも開催中</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">まずは無料セミナーで体験</h2>
            <div className="max-w-2xl mx-auto mb-8">
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-xl text-amber-500 flex-shrink-0 mt-1"></i>
                  <span className="text-gray-700">有料セミナーの全体像を短時間で体験</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-xl text-amber-500 flex-shrink-0 mt-1"></i>
                  <span className="text-gray-700">AI活用の最新動向・業務イメージが明確になる</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-xl text-amber-500 flex-shrink-0 mt-1"></i>
                  <span className="text-gray-700">「自社に必要かどうか」を判断できる入口</span>
                </li>
              </ul>
            </div>
            <Link 
              to="/contact?type=seminar"
              className="inline-block bg-amber-500 text-white px-12 py-4 rounded-full text-base font-semibold hover:bg-amber-600 transition-all shadow-lg whitespace-nowrap cursor-pointer"
            >
              オンライン無料セミナーの申し込み
            </Link>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            生成AIは、特別な人のものではありません。<br />
            正しく学べば、誰でも「仕事の相棒」として使いこなせます。
          </h2>
          <p className="text-2xl font-semibold text-teal-400 mb-12">
            次に変わるのは、あなたのチーム。
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
                生成AIを仕事の相棒にする実践的セミナー。<br />
                考え方・使い方・業務への落とし込みまで体系的に学べます。
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
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">お問い合わせフォーム</Link></li>
                <li><button onClick={handleTopClick} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">TOP</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
