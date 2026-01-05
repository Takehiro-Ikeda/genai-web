import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate('/');
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png" alt="Logo" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={handleTopClick} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">TOP</button>
            <button onClick={() => handleNavClick('#products')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">サービス</button>
            <button onClick={() => handleNavClick('#features')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">特徴</button>
            <button onClick={() => handleNavClick('#cases')} className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer">受講事例</button>
            <Link to="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">お問い合わせ</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">お問い合わせ</h1>
          <p className="text-xl text-gray-600">お気軽にご相談ください。</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <form 
              className="space-y-6" 
              data-readdy-form 
              id="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = new URLSearchParams();
                
                formData.forEach((value, key) => {
                  if (key === 'message' && value.toString().length > 500) {
                    alert('メッセージは500文字以内で入力してください。');
                    return;
                  }
                  data.append(key, value.toString());
                });

                try {
                  const response = await fetch('https://readdy.ai/api/form/d501bti1tbght8nfdbpg', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data.toString()
                  });

                  if (response.ok) {
                    alert('送信が完了しました。ありがとうございます。');
                    form.reset();
                  } else {
                    alert('送信に失敗しました。もう一度お試しください。');
                  }
                } catch (error) {
                  alert('送信に失敗しました。もう一度お試しください。');
                }
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">お名前 *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">会社名</label>
                  <input 
                    type="text" 
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="株式会社〇〇"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">メールアドレス *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">電話番号</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">お問い合わせ内容 *</label>
                <textarea 
                  name="message"
                  required
                  maxLength={500}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all resize-none text-sm"
                  placeholder="お問い合わせ内容をご記入ください（500文字以内）"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-teal-600 text-white py-4 rounded-full font-semibold hover:bg-teal-700 transition-all shadow-lg whitespace-nowrap cursor-pointer"
              >
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-end">
            <ul className="flex gap-8">
              <li><button onClick={handleTopClick} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">TOP</button></li>
              <li><button onClick={() => handleNavClick('#products')} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">サービス</button></li>
              <li><button onClick={() => handleNavClick('#features')} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">特徴</button></li>
              <li><button onClick={() => handleNavClick('#cases')} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">受講事例</button></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
