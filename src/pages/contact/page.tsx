import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type ContactType = 'general' | 'poc' | 'seminar';

function getContactTypeFromUrl(): ContactType {
  const params = new URLSearchParams(window.location.search);
  const t = params.get('type');
  if (t === 'poc') return 'poc';
  if (t === 'seminar') return 'seminar';
  return 'general';
}

function isWeekday(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0 Sun ... 6 Sat
  return day >= 1 && day <= 5;
}

async function submitContact(payload: any) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = '';
    try {
      const j = await res.json();
      detail = j?.error ? ` (${j.error})` : '';
    } catch {
      // ignore
    }
    throw new Error(`送信に失敗しました${detail}`);
  }

  return res.json();
}

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // フォームUI状態
  const [type, setType] = useState<ContactType>(() => getContactTypeFromUrl());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // B: PoC
  const [pocIssues, setPocIssues] = useState<string[]>([]);
  const [pocIssuesOther, setPocIssuesOther] = useState('');
  const [pocDataTypes, setPocDataTypes] = useState<string[]>([]);
  const [pocDepartments, setPocDepartments] = useState('');
  const [pocTiming, setPocTiming] = useState('');

  // C: Seminar
  const [aiUsageStatus, setAiUsageStatus] = useState('');
  const [seminarHeadcount, setSeminarHeadcount] = useState('');
  const [subsidyPreference, setSubsidyPreference] = useState('');
  const [seminarDt1, setSeminarDt1] = useState('');
  const [seminarDt2, setSeminarDt2] = useState('');
  const [seminarDt3, setSeminarDt3] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // URLクエリ変更時にも追従（同一ページ内遷移用）
  useEffect(() => {
    const t = getContactTypeFromUrl();
    setType(t);
    setDone(false);
    setErrorMsg('');
  }, [window.location.search]);

  const handleTopClick = () => {
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleNavClick = (hash: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const titleMap: Record<ContactType, { title: string; desc: string }> = {
    general: {
      title: 'お問い合わせ',
      desc: 'お気軽にご相談ください。',
    },
    poc: {
      title: 'オンプレミス環境での生成AI活用・PoCのご相談',
      desc: '機密データを扱う環境でも安心して使える生成AI活用をご提案します。',
    },
    seminar: {
      title: '法人向け｜オンライン無料生成AIセミナー（60分）お申し込み',
      desc: 'Google Meet開催（closipが発行）。Meetが利用できない場合は備考にご記入ください。平日限定です。',
    },
  };

  const toggleArrayValue = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const resetTypeSpecificState = () => {
    setPocIssues([]);
    setPocIssuesOther('');
    setPocDataTypes([]);
    setPocDepartments('');
    setPocTiming('');

    setAiUsageStatus('');
    setSeminarHeadcount('');
    setSubsidyPreference('');
    setSeminarDt1('');
    setSeminarDt2('');
    setSeminarDt3('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setDone(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 共通
    const name = (formData.get('name') ?? '').toString().trim();
    const company = (formData.get('company') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim();
    const message = (formData.get('message') ?? '').toString();

    // 共通バリデーション（会社名は必須運用）
    if (!name) return setErrorMsg('お名前を入力してください。');
    if (!company) return setErrorMsg('会社名を入力してください。（個人の方は「個人」「フリーランス」など）');
    if (!email || !email.includes('@')) return setErrorMsg('正しいメールアドレスを入力してください。');

    // Aはメッセージ必須、B/Cは任意（仕様通り）
    if (type === 'general' && !message.trim()) return setErrorMsg('お問い合わせ内容を入力してください。');

    if (message.length > 2000) return setErrorMsg('お問い合わせ内容は2000文字以内で入力してください。');

    // B: PoC必須チェック
    if (type === 'poc') {
      if (pocIssues.length === 0) return setErrorMsg('「解決したい業務課題」を1つ以上選択してください。');
      if (pocIssues.includes('other') && !pocIssuesOther.trim()) {
        return setErrorMsg('「その他」を選んだ場合は内容を入力してください。');
      }
    }

    // C: Seminar必須チェック（平日限定）
    if (type === 'seminar') {
      if (!aiUsageStatus) return setErrorMsg('「現在の生成AI活用状況」を選択してください。');
      if (!seminarDt1) return setErrorMsg('「第1希望日時（平日）」を入力してください。');

      const dts = [seminarDt1, seminarDt2, seminarDt3].filter(Boolean);
      for (const dt of dts) {
        if (!isWeekday(dt)) return setErrorMsg('希望日時は平日（月〜金）から選択してください。');
      }
    }

    const payload: any = {
      type,
      name,
      company,
      email,
      message: message.trim() ? message : undefined,
      page_url: window.location.href,
    };

    if (type === 'poc') {
      payload.poc_issues = pocIssues;
      payload.poc_issues_other = pocIssues.includes('other') ? pocIssuesOther.trim() : undefined;
      payload.poc_data_types = pocDataTypes;
      payload.poc_departments = pocDepartments.trim() ? pocDepartments.trim() : undefined;
      payload.poc_timing = pocTiming || undefined;
    }

    if (type === 'seminar') {
      payload.ai_usage_status = aiUsageStatus;
      payload.seminar_headcount = seminarHeadcount || undefined;
      payload.subsidy_preference = subsidyPreference || undefined;
      payload.seminar_dt1 = seminarDt1;
      payload.seminar_dt2 = seminarDt2 || undefined;
      payload.seminar_dt3 = seminarDt3 || undefined;
    }

    try {
      setIsSubmitting(true);
      await submitContact(payload);
      setDone(true);
      form.reset();
      resetTypeSpecificState();
    } catch (err: any) {
      setErrorMsg(err?.message ?? '送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const header = titleMap[type];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png"
              alt="Logo"
              className="h-10"
            />
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{header.title}</h1>
          <p className="text-lg md:text-xl text-gray-600">{header.desc}</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            {done && (
              <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
                送信が完了しました。ありがとうございます。担当者よりご連絡します。
              </div>
            )}
            {errorMsg && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {errorMsg}
              </div>
            )}

            <form className="space-y-6" id="contact-form" onSubmit={handleSubmit}>
              {/* 共通 */}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">会社名 *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="株式会社〇〇（個人の方は「個人」「フリーランス」など）"
                  />
                </div>
              </div>

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

              {/* B: PoC追加 */}
              {type === 'poc' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">解決したい業務課題 *</label>
                    <div className="space-y-2 text-sm text-gray-700">
                      {[
                        { v: 'doc_search', label: '社内文書検索/要約/FAQ' },
                        { v: 'sensitive_data', label: '機密情報を扱うAI活用' },
                        { v: 'cs_support', label: '顧客/社内問い合わせ対応' },
                        { v: 'dev_support', label: '開発支援' },
                        { v: 'other', label: 'その他' },
                      ].map((o) => (
                        <label key={o.v} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={pocIssues.includes(o.v)}
                            onChange={() => setPocIssues((prev) => toggleArrayValue(prev, o.v))}
                          />
                          <span>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {pocIssues.includes('other') && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">その他（業務課題の詳細） *</label>
                      <textarea
                        value={pocIssuesOther}
                        onChange={(e) => setPocIssuesOther(e.target.value)}
                        rows={3}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all resize-none text-sm"
                        placeholder="例：社内規程の参照を自動化したい、など"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">扱うデータ種別（任意）</label>
                    <div className="space-y-2 text-sm text-gray-700">
                      {[
                        { v: 'internal_docs', label: '社内文書' },
                        { v: 'personal_info', label: '個人情報' },
                        { v: 'confidential', label: '機密情報' },
                        { v: 'source_code', label: 'ソースコード' },
                        { v: 'unstructured', label: '非構造データ（PDF/画像など）' },
                        { v: 'unknown', label: '未定' },
                      ].map((o) => (
                        <label key={o.v} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={pocDataTypes.includes(o.v)}
                            onChange={() => setPocDataTypes((prev) => toggleArrayValue(prev, o.v))}
                          />
                          <span>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">想定利用部門（任意）</label>
                      <input
                        type="text"
                        value={pocDepartments}
                        onChange={(e) => setPocDepartments(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="例：情報システム部、営業部 など"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">想定時期（任意）</label>
                      <select
                        value={pocTiming}
                        onChange={(e) => setPocTiming(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">選択してください</option>
                        <option value="asap">すぐに</option>
                        <option value="1_3m">1〜3ヶ月</option>
                        <option value="within_6m">半年以内</option>
                        <option value="researching">情報収集中</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* C: Seminar追加 */}
              {type === 'seminar' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">現在の生成AI活用状況 *</label>
                    <div className="space-y-2 text-sm text-gray-700">
                      {[
                        { v: 'not_started', label: '未導入' },
                        { v: 'personal', label: '個人利用' },
                        { v: 'pilot', label: '社内検証中' },
                        { v: 'partial', label: '一部業務で利用中' },
                        { v: 'companywide', label: '全社導入済' },
                      ].map((o) => (
                        <label key={o.v} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="ai_usage_status"
                            value={o.v}
                            checked={aiUsageStatus === o.v}
                            onChange={(e) => setAiUsageStatus(e.target.value)}
                          />
                          <span>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">想定参加人数（任意）</label>
                      <select
                        value={seminarHeadcount}
                        onChange={(e) => setSeminarHeadcount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">選択してください</option>
                        <option value="10_20">10〜20名</option>
                        <option value="21_50">21〜50名</option>
                        <option value="51_100">51〜100名</option>
                        <option value="100_plus">100名以上</option>
                        <option value="unknown">未定</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">助成金活用希望（任意）</label>
                      <div className="space-y-2 text-sm text-gray-700">
                        {[
                          { v: 'want', label: '活用したい' },
                          { v: 'dont_want', label: '活用したくない' },
                          { v: 'undecided', label: '未定' },
                          { v: 'want_details', label: '助成金について詳しく知りたい' },
                        ].map((o) => (
                          <label key={o.v} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="subsidy_preference"
                              value={o.v}
                              checked={subsidyPreference === o.v}
                              onChange={(e) => setSubsidyPreference(e.target.value)}
                            />
                            <span>{o.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    ※ 希望日時は平日（月〜金）から選択してください。第1希望は必須です。
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">第1希望（平日） *</label>
                      <input
                        type="datetime-local"
                        value={seminarDt1}
                        onChange={(e) => setSeminarDt1(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">第2希望（平日）</label>
                      <input
                        type="datetime-local"
                        value={seminarDt2}
                        onChange={(e) => setSeminarDt2(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">第3希望（平日）</label>
                      <input
                        type="datetime-local"
                        value={seminarDt3}
                        onChange={(e) => setSeminarDt3(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* メッセージ（A必須 / B,C任意） */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  お問い合わせ内容 {type === 'general' ? '*' : '（任意）'}
                </label>
                <textarea
                  name="message"
                  required={type === 'general'}
                  maxLength={2000}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all resize-none text-sm"
                  placeholder={
                    type === 'seminar'
                      ? 'Google Meetが利用できない場合など、補足があればご記入ください（2000文字以内）'
                      : 'お問い合わせ内容をご記入ください（2000文字以内）'
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full font-semibold transition-all shadow-lg whitespace-nowrap cursor-pointer ${
                  isSubmitting ? 'bg-teal-300 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {isSubmitting ? '送信中...' : type === 'seminar' ? '無料セミナーを申し込む' : '送信する'}
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
