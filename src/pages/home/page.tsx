import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = [
    {
      name: 'オンプレミス生成AIサーバー',
      type: 'AIインフラ構築',
      description: '自社環境で安全に運用できる生成AIシステムを構築。データの機密性を保ちながら、最先端のAI技術を活用できます。',
      image: 'https://drive.google.com/file/d/1iKSgg6qYGgsCOlnC0lKHyahKVIBPkRzg/view',
      price: '製品概要',
      link: '/product-overview'
    },
    {
      name: '実践的生成AI活用セミナー',
      type: '教育・トレーニング',
      description: 'ビジネスで即活用できる生成AIの実践的なノウハウを習得。経験豊富な講師陣が、生成AIの原理を丁寧に解説し、生成AI導入から運用まで徹底サポートします。',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20seminar%20training%20session%20with%20people%20learning%20about%20AI%20technology%20in%20modern%20conference%20room%20with%20presentation%20screens%20and%20collaborative%20atmosphere%20in%20clean%20minimalist%20design%20with%20soft%20gradient%20background&width=400&height=400&seq=102&orientation=squarish',
      price: 'セミナー概要',
      link: '/seminar-overview'
    }
  ];

  const features = [
    {
      title: '検討段階から相談できる',
      description: '導入前の疑問も丁寧にサポート',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20consultation%20scene%20with%20advisor%20and%20client%20discussing%20AI%20solutions%20in%20modern%20office%20setting%20with%20collaborative%20atmosphere%20in%20minimalist%20beige%20and%20white%20design%20showing%20trust%20and%20approachability&width=500&height=500&seq=301&orientation=squarish',
      icon: 'ri-discuss-line'
    },
    {
      title: '安心して業務に使える',
      description: 'セキュアな環境で安全に運用',
      image: 'https://readdy.ai/api/search-image?query=Secure%20business%20environment%20with%20digital%20shield%20protection%20and%20safe%20data%20management%20in%20professional%20minimalist%20beige%20and%20white%20design%20showing%20trust%20and%20reliability%20with%20clean%20modern%20aesthetic&width=500&height=500&seq=302&orientation=squarish',
      icon: 'ri-shield-check-line'
    },
    {
      title: '状況に応じて選べる',
      description: 'セミナーから導入まで、柔軟な進め方',
      image: 'https://readdy.ai/api/search-image?query=Flexible%20business%20options%20visualization%20with%20multiple%20pathways%20and%20customization%20choices%20in%20clean%20minimalist%20beige%20and%20white%20design%20showing%20adaptability%20and%20choice%20with%20modern%20aesthetic&width=500&height=500&seq=303&orientation=squarish',
      icon: 'ri-settings-3-line'
    },
    {
      title: '現場で使われ続ける',
      description: '導入して終わらせない、実務重視の支援',
      image: 'https://readdy.ai/api/search-image?query=Active%20workplace%20with%20people%20using%20AI%20technology%20in%20daily%20operations%20showing%20continuous%20usage%20and%20practical%20application%20in%20modern%20office%20with%20minimalist%20beige%20and%20white%20design%20emphasizing%20ongoing%20support&width=500&height=500&seq=304&orientation=squarish',
      icon: 'ri-team-line'
    }
  ];

  const caseStudies = [
    {
      company: '某税理士法人',
      industry: '士業・専門サービス',
      result: '一人あたり月30時間超の業務時間削減を実現',
      description: `税務相談資料や社内資料作成などの実務に生成AIを導入。

業務内容に即した活用方法を学んだことで、受講後1か月の活用において、一人あたり月30時間を超える業務時間削減につながりました。

あわせて、「まずAIに相談する」という意識が社内に浸透し、生成AIを業務改善のパートナーとして活用する体制が整っています。`,
      image: 'https://readdy.ai/api/search-image?query=Professional%20tax%20accounting%20firm%20office%20with%20accountants%20and%20consultants%20working%20on%20documents%20and%20laptops%20in%20modern%20bright%20workspace%20showing%20expertise%20and%20professionalism%20with%20clean%20minimalist%20design%20and%20natural%20lighting%20emphasizing%20trust%20and%20reliability&width=800&height=1000&seq=411&orientation=portrait'
    },
    {
      company: '某不動産企業',
      industry: '不動産業',
      result: '資料作成の効率が3倍に向上',
      description: `物件紹介資料や市場分析資料の作成業務に生成AIを導入。
資料構成や文章作成を効率化できるようになり、顧客ニーズに合わせた提案資料を、これまでより短時間で作成できるようになりました。
提案準備にかかる負担が軽減され、営業活動に注力できる環境が整っています。`,
      image: 'https://readdy.ai/api/search-image?query=Modern%20real%20estate%20company%20office%20with%20professional%20agents%20working%20on%20property%20presentations%20and%20market%20analysis%20in%20contemporary%20workspace%20with%20city%20view%20showing%20business%20success%20and%20efficiency%20with%20clean%20minimalist%20design%20emphasizing%20professionalism&width=800&height=1000&seq=412&orientation=portrait'
    }
  ];

  const testimonials = [
    {
      text: '生成AIは難しいと思っていましたが、業務に直結する使い方を具体的に教えてもらえました。翌日からすぐ活用でき、仕事のスピードが明らかに変わりました。',
      rating: 5
    },
    {
      text: 'ツールの説明だけでなく、「どう考えて使うか」を学べたのが大きな収穫です。AIを一時的な流行ではなく、仕事の相棒として使える感覚が身につきました。',
      rating: 5
    },
    {
      text: '不安だったセキュリティ面も丁寧に説明してもらえ、安心して社内展開できました。継続的に成果が出る設計で、投資以上の価値を感じています。',
      rating: 5
    }
  ];

  const [currentCase, setCurrentCase] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-10" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={handleTopClick} className={`text-sm font-medium transition-colors hover:text-teal-600 cursor-pointer whitespace-nowrap ${isScrolled ? 'text-gray-800' : 'text-white'}`}>TOP</button>
            <a href="#products" className={`text-sm font-medium transition-colors hover:text-teal-600 whitespace-nowrap ${isScrolled ? 'text-gray-800' : 'text-white'}`}>サービス</a>
            <a href="#features" className={`text-sm font-medium transition-colors hover:text-teal-600 whitespace-nowrap ${isScrolled ? 'text-gray-800' : 'text-white'}`}>なぜ私たちか</a>
            <a href="#cases" className={`text-sm font-medium transition-colors hover:text-teal-600 whitespace-nowrap ${isScrolled ? 'text-gray-800' : 'text-white'}`}>AIセミナー受講事例</a>
            <Link to="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">お問い合わせ</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Overview */}
      <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/87640f82ce1d8a8ce9a77a14defcf876.png" 
            alt="AI Background" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide">
            生成AIで未来を創造する
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 font-light max-w-4xl mx-auto leading-relaxed">
            最先端の生成AI技術で、ビジネスの可能性を無限に広げます
          </p>
          <a href="#products" className="inline-block bg-white text-gray-900 px-10 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap cursor-pointer">
            サービスを見る
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                <span className="text-teal-600 whitespace-nowrap">サービス紹介</span>
              </h2>
              <p className="text-gray-600 text-base whitespace-nowrap">ビジネスを加速させる生成AI</p>
            </div>
            <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap">2つのサービス</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-full h-80">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top rounded-t-2xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-1 whitespace-nowrap">{product.type}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <Link 
                      to={product.link}
                      className="bg-teal-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
                    >
                      {product.price}
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-16">
            <span className="border border-white/30 text-white px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap">特徴・メリット</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl text-right">
              なぜ私たちが選ばれるのか
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-amber-50 rounded-2xl overflow-hidden mb-4 aspect-square">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 whitespace-nowrap">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 whitespace-nowrap">セミナー受講事例</h2>
            <p className="text-gray-600 text-base md:text-lg whitespace-nowrap">受講者の成果をご覧ください</p>
          </div>
          <div className="grid md:grid-cols-2 gap-0 bg-gray-50 rounded-3xl overflow-hidden shadow-xl">
            <div className="relative min-h-[600px]">
              <img 
                src={caseStudies[currentCase].image} 
                alt={caseStudies[currentCase].company} 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-8 left-8">
                <span className="text-sm text-gray-700 font-medium bg-white/90 px-4 py-2 rounded-full whitespace-nowrap">{caseStudies[currentCase].industry}</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  {caseStudies[currentCase].result}
                </h3>
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center whitespace-nowrap">
                {caseStudies[currentCase].company}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 text-center whitespace-pre-line">
                {caseStudies[currentCase].description}
              </p>
              <div className="flex gap-3 justify-center">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCase(index)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                      currentCase === index 
                        ? 'bg-gray-900 border-gray-900' 
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <i className={`ri-arrow-${index === 0 ? 'left' : 'right'}-line text-xl ${currentCase === index ? 'text-white' : 'text-gray-600'}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-16 whitespace-nowrap">お客様の声</h2>
          <div className="relative">
            <div className="mb-6">
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap">
                <i className="ri-star-fill text-amber-400"></i>
                {testimonials[activeTestimonial].rating}.0
              </span>
            </div>
            <blockquote className="text-lg md:text-xl text-gray-800 font-serif leading-relaxed mb-8">
              "{testimonials[activeTestimonial].text}"
            </blockquote>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl text-gray-600"></i>
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-right-line text-xl text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            お問い合わせは<br className="md:hidden" />こちらから
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-10 whitespace-nowrap">お気軽にご相談ください。</p>
          <Link 
            to="/contact"
            className="inline-block bg-teal-600 text-white px-12 py-4 rounded-full text-base font-semibold hover:bg-teal-700 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            お問い合わせページへ
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-end">
            <ul className="flex gap-8">
              <li><button onClick={handleTopClick} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer whitespace-nowrap">TOP</button></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer whitespace-nowrap">サービス</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer whitespace-nowrap">特徴</a></li>
              <li><a href="#cases" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer whitespace-nowrap">受講事例</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}