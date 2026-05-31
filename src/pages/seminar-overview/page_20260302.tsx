import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Users, 
  MessageSquare, 
  CircleDollarSign, 
  Headphones, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb, 
  Rocket, 
  ArrowRight, 
  Clock, 
  Star,
  MapPin,
  Train
} from 'lucide-react';

/**
 * 実践的生成AI活用セミナー紹介ページ
 * * アップデート内容:
 * 1. ナビゲーションの「TOP」を「HOME」に変更し、リンク先を https://closip.ai に設定
 */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 初回レンダリング時にトップへ
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      const offset = 80; // ヘッダーの高さ分をオフセット
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const homeLink = "https://closip.ai";
  const ctaLink = "https://closip.ai/contact?type=seminar";

  const reasons = [
    {
      icon: ShieldCheck,
      title: 'セキュリティ専門家による指導',
      description: '機密情報漏洩などのリスクを回避し、安全な活用方法を専門家が監修・指導します。'
    },
    {
      icon: Briefcase,
      title: '業務プロセスに即したカリキュラム',
      description: '単なるツールの紹介ではなく、実際の業務フローにどう組み込むかを具体的に学びます。'
    },
    {
      icon: Users,
      title: '幅広い職種・部門に対応',
      description: '士業、医療、不動産、製造など、多様な業界に特化したプロンプト例を提供。'
    },
    {
      icon: MessageSquare,
      title: '双方向・対面形式で定着',
      description: '一方的な講義ではなく、その場で疑問を解消できるインタラクティブな環境。'
    },
    {
      icon: CircleDollarSign,
      title: '助成金対象の可能性',
      description: '教育訓練給付金や人材開発支援助成金などの対象となる場合があります。'
    },
    {
      icon: Headphones,
      title: '伴走型AIパートナーの継続支援',
      description: 'セミナー受講後も、実務での活用状況に合わせて継続的にアドバイス。'
    }
  ];

  const steps = [
    { step: '01', title: '生成AIの基礎と実践事例', duration: '2h', desc: 'AIの基本概念から、国内外の驚くべきビジネス活用事例まで、全体像を把握します。' },
    { step: '02', title: 'AIを使いこなす準備', duration: '2h', desc: 'AIへの命令（プロンプト）の基本構造と、独自の「AIパートナー」設定を構築します。' },
    { step: '03', title: '業務活用・基礎編', duration: '2h', desc: 'メール作成、ドキュメント要約、議事録作成など、日常業務の効率化を実践。' },
    { step: '04', title: '業務活用・応用編', duration: '2h', desc: 'データ分析、企画構成、リサーチなど、より思考を必要とする業務への適用法。' },
    { step: '05', title: '業務活用・発展編', duration: '2h', desc: '複雑なワークフローの自動化や、チームでのプロンプト共有・標準化を学びます。' },
    { step: '06', title: '目的別・自走への道', duration: '2h', desc: '自社の具体的な課題解決に向けたカスタムプランを作成し、自律的な活用を実現。' }
  ];

  const results = [
    { number: '30〜50', unit: '時間/月', label: '業務時間削減', detail: '平均して月に数営業日分の時間を創出。' },
    { number: '99.2', unit: '%', label: '受講者満足度', detail: '「すぐに実践できる」との声を多数いただいています。' },
    { number: '3', unit: 'ヶ月以内', label: '投資回収期間', detail: '高い生産性向上により、早期にコスト回収が可能。' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={homeLink} className="flex items-center group transition-transform hover:scale-105 active:scale-95">
            <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-8" />
          </a>
          <div className="hidden md:flex items-center gap-10">
            {/* 修正箇所: TOP -> HOME、リンク先を closip.ai に変更 */}
            <a href={homeLink} className="text-sm font-semibold hover:text-teal-600 transition-colors">HOME</a>
            <button onClick={() => handleNavClick('#concept')} className="text-sm font-semibold hover:text-teal-600 transition-colors">コンセプト</button>
            <button onClick={() => handleNavClick('#program')} className="text-sm font-semibold hover:text-teal-600 transition-colors">プログラム</button>
            <button onClick={() => handleNavClick('#results')} className="text-sm font-semibold hover:text-teal-600 transition-colors">導入効果</button>
            <a 
              href={ctaLink}
              className="bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-teal-700 hover:shadow-lg transition-all active:scale-95"
            >
              無料体験を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 animate-subtle-zoom"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>満足度99.2%の実践的カリキュラム</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.15] animate-fade-in-up delay-100">
            生成AIを、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">「仕事の相棒」</span>に変える
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            原理の理解から具体的なプロンプト技術、業務への組み込みまでを12時間で習得。<br />
            あなたのチームをAIを使いこなす次世代組織へとアップデートします。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up delay-300">
            <button 
              onClick={() => handleNavClick('#free-seminar')}
              className="group bg-teal-500 hover:bg-teal-400 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-teal-500/25 flex items-center gap-2"
            >
              まずは無料体験セミナーへ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => handleNavClick('#program')} className="text-white hover:text-teal-300 px-6 py-4 font-semibold transition-colors">
              プログラム詳細を見る
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Our Concept</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">セミナーのコンセプト</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-xl">
              生成AIを使いこなせるかどうかは、知識量ではなく「適切な対話法」と「業務への適用イメージ」にあります。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Lightbulb, title: '思考の転換', desc: 'AIに「何をさせるか」ではなく「どう対話するか」の思考法を習得。' },
              { icon: Briefcase, title: '実務への定着', desc: '個人の作業効率だけでなく、チームのワークフロー自体を最適化します。' },
              { icon: Rocket, title: '自走する組織', desc: 'セミナー後、受講生が自ら新しい活用法を開発できる状態を目指します。' }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why People Fail Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 blur-3xl rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">なぜ多くの人がAI活用につまずくのか</h2>
            <p className="text-slate-400 text-lg">原因はスキル不足ではなく、「適切な導き」の欠如です</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              '何から始めればいいかわからない',
              'セキュリティや情報漏洩のリスクが不安',
              '業務にどう使うかイメージが持てない'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <span className="font-medium text-lg">{text}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-teal-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <p className="text-2xl md:text-3xl font-bold relative z-10">
              このセミナーが、それらすべての障壁を解消します。
            </p>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Curriculum</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">プログラム構成</h2>
            <p className="mt-4 text-slate-600 text-lg">全6ステップ・12時間で「AIを使いこなすプロ」を養成</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group overflow-hidden">
                <div className="absolute -top-4 -right-4 text-8xl font-black text-slate-50 group-hover:text-teal-50 transition-colors z-0">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Step {step.step}</span>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 min-h-[3rem] flex items-center">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Impact</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8 leading-tight">数値で実証された<br />圧倒的な導入効果</h2>
              <p className="text-slate-600 text-lg mb-10">
                私たちは単なる研修の提供ではなく、確実な「成果」を約束します。多くの企業で、導入後すぐに目に見える生産性の向上が確認されています。
              </p>
              <div className="space-y-4">
                {['即時性のある効率化', '全社的なスキルの底上げ', '創造的業務へのシフト'].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    <span className="font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-1 gap-6">
              {results.map((result, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-all">
                  <div>
                    <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">{result.label}</h3>
                    <p className="text-slate-600 text-sm">{result.detail}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl md:text-5xl font-black text-teal-600 block">{result.number}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{result.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">選ばれる6つの理由</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {reasons.map((reason, index) => (
              <div key={index} className="group">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <reason.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 transition-colors">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Access Section */}
      <section id="free-seminar" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-8 md:p-16 text-center overflow-hidden mb-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10">
              <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block">Free Trial</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">無料体験セミナー開催中</h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                まずは1時間で、有料セミナーのエッセンスを体験してください。<br />
                実際の活用イメージが湧き、「自社に必要か」を判断できる材料が手に入ります。
              </p>
              
              <a 
                href={ctaLink}
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-lg font-bold hover:bg-teal-50 transition-all shadow-2xl active:scale-95 mb-8"
              >
                無料体験セミナーを予約する
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Access Details */}
          <div className="grid lg:grid-cols-2 gap-12 items-start bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-teal-600 font-bold mb-6">
                <MapPin className="w-5 h-5" />
                <span className="tracking-widest uppercase text-sm">Access & Location</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">弊社セミナールームのご案内</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">住所</h4>
                  <p className="text-slate-900 font-bold text-lg leading-relaxed">
                    〒105-0004<br />
                    東京都港区新橋1-12-9<br />
                    新橋プレイス 7F
                  </p>
                </div>

                <div>
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">交通アクセス</h4>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Train className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">新橋駅 徒歩1分</p>
                      <p className="text-slate-500 text-sm">JR山手線・銀座線・浅草線・ゆりかもめ</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-teal-500 pl-4">
                  ※有料セミナーは原則対面形式（貴社オフィス）で行います。<br />
                  ※無料体験セミナーも貴社オフィスでの開催を前提としておりますが、弊社セミナールームやオンラインでの開催をご希望の場合は、お申し込み時にその旨をお伝えください。
                </p>
              </div>
            </div>

            <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.391626084474!2d139.75624787672164!3d35.66674757259114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188be9648939c3%3A0x280e816a1b9c9f2b!2z44CSMTA1LTAwMDQg5p2x5Lqs6YO95riv5Yy65paw5qmL77yR5LiB55uu77yR77yS4oiS77yZ!5e0!3m2!1sja!2sjp!4v1711200000000!5m2!1sja!2sjp" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="セミナールーム地図"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 bg-teal-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-9xl font-black">AI</div>
          <div className="absolute bottom-10 right-10 text-9xl font-black">NEXT</div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            生成AIは、特別な人のものではありません。<br />
            次に変わるのは、あなたのチームです。
          </h2>
          <p className="text-xl opacity-90 font-medium">
            AIを「仕事の相棒」にする、その第一歩をここから。
          </p>
        </div>
      </section>

      {/* Real Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-8 mb-6 brightness-0 invert" />
              <p className="text-sm leading-relaxed">
                次世代のビジネススタンダードを創る、実践的生成AI研修プログラム。
                企業の競争力をAIと共に最大化します。
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.1); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}