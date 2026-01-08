import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type ContactType = 'general' | 'poc' | 'seminar';

function getContactTypeFromSearch(search: string): ContactType {
  const params = new URLSearchParams(search);
  const t = params.get('type');
  if (t === 'poc') return 'poc';
  if (t === 'seminar') return 'seminar';
  return 'general';
}

const timeSlots = [
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
];

function isWeekendDate(dateStr: string) {
  // dateStr: YYYY-MM-DD
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  return day === 0 || day === 6;
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
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  // URLクエリからフォーム種別を決定
  const typeFromUrl = useMemo(() => getContactTypeFromSearch(location.search), [location.search]);
  const [type, setType] = useState<ContactType>(typeFromUrl);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  const [seminarDate1, setSeminarDate1] = useState('');
  const [seminarSlot1, setSeminarSlot1] = useState('');
  const [seminarDate2, setSeminarDate2] = useState('');
  const [seminarSlot2, setSeminarSlot2] = useState('');
  const [seminarDate3, setSeminarDate3] = useState('');
  const [seminarSlot3, setSeminarSlot3] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // クエリ変更時：種別更新 + 先頭へスクロール（“上が出ない問題”対策）
  useEffect(() => {
    setType(typeFromUrl);
    setDone(false);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [typeFromUrl]);

  const handleTopClick = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavClick = (hash: string) => {
    navigate('/');
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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

  const toggleArrayValue = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const resetTypeSpecificState = () => {
    setPocIssues([]);
    setPocIssuesOther('');
    setPocDataTypes([]);
    setPocDepartments('');
    setPocTiming('');

    setAiUsageStatus('');
    setSeminarHeadcount('');
    setSubsidyPreference('');
    setSeminarDate1('');
    setSeminarSlot1('');
    setSeminarDate2('');
    setSeminarSlot2('');
    setSeminarDate3('');
    setSeminarSlot3('');
  };

  const header = titleMap[type];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setDone(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 共通（A/B/C）
    const name = (formData.get('name') ?? '').toString().trim();
    const company = (formData.get('company') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim();
    const message = (formData.get('message') ?? '').toString().trim();

    if (!name) return setErrorMsg('お名前を入力してください。');
    if (!company) return setErrorMsg('会社名を入力してください。（個人の方は「個人」「フリーランス」など）');
    if (!email || !email.includes('@')) return setErrorMsg('正しいメールアドレスを入力してください。');

    // Aは必須、B/Cは任意
    if (type === 'general' && !message) return setErrorMsg('お問い合わせ内容を入力してください。');
    if (message.length > 2000) return setErrorMsg('お問い合わせ内容は2000文字以内で入力してください。');

    // B: PoC
    if (type === 'poc') {
      if (pocIssues.length === 0) return setErrorMsg('「解決したい業務課題」を1つ以上選択してください。');
      if (pocIssues.includes('other') && !pocIssuesOther.trim()) {
        return setErrorMsg('「その他」を選んだ場合は内容を入力してください。');
      }
    }

    // C: Seminar
    if (type === 'seminar') {
      if (!aiUsageStatus) return setErrorMsg('「現在の生成AI活用状況」を選択してください。');
      if (!seminarDate1 || !seminarSlot1) return setErrorMsg('第1希望（平日）の日付と時間帯を選択してください。');

      const pairs = [
        { d: seminarDate1, s: seminarSlot1 },
        { d: seminarDate2, s: seminarSlot2 },
        { d: seminarDate3, s: seminarSlot3 },
      ];

      for (const p of pairs) {
        // 片方だけ入力はNG
        if ((p.d && !p.s) || (!p.d && p.s)) {
          return setErrorMsg('希望日時は「日付」と「時間帯」をセットで選択してください。');
        }
        // 土日NG
        if (p.d && isWeekendDate(p.d)) {
          return setErrorMsg('希望日は平日（月〜金）を選択してください。');
        }
      }
    }

    const payload: any = {
      type,
      name,
      company,
      email,
      message: message ? message : undefined,
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
      payload.seminar_dt1 = `${seminarDate1} ${seminarSlot1}`;
      payload.seminar_dt2 = seminarDate2 && seminarSlot2 ? `${seminarDate2} ${seminarSlot2}` : undefined;
      payload.seminar_dt3 = seminarDate3 && seminarSlot3 ? `${seminarDate3} ${seminarSlot3}` : undefined;
    }

    try {
      setIsSubmitting(true);
      await submitContact(payload);
      setDone(true);
      form.reset();
      resetTypeSpecificState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err?.message ?? '送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ 送信後はこのメッセージだけ表示（ナビ/フォーム/フッター/エラー表示も出さない）
  if (done) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <div className="rounded-2xl border border-teal-200 bg-teal-50 px-6 py-6 text-center">
              <div className="text-sm md:text-base font-semibold text-teal-900">
                送信が完了しました。3営業日以内に、担当者よりご連絡いたします。
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleTopClick}
                className="bg-teal-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg whitespace-nowrap cursor-pointer"
              >
                TOPへ戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://static.readdy.ai/image/f4a766a06f5c0ff04be2eaff427d3d8f/9581adfe46f6ae6c8a22bdfb808cc576.png"
              alt="Logo"
              className="h-10"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={handleTopClick}
              className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer"
            >
              TOP
            </button>
            <button
              onClick={() => handleNavClick('#products')}
              className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer"
            >
              サービス
            </button>
            <button
              onClick={() => handleNavClick('#features')}
              className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer"
            >
              特徴
            </button>
            <button
              onClick={() => handleNavClick('#cases')}
              className="text-sm font-medium text-gray-800 transition-colors hover:text-teal-600 cursor-pointer"
            >
              受講事例
            </button>
            <Link
              to="/contact"
              className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              お問い合わせ
            </Link>
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
                    ※ 希望日時は平日（月〜金）から選択してください。第1希望は必須です。<br />
                    ※ 時間帯は、10:00〜17:00（1時間枠）から選択できます。
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: '第1希望（平日） *',
                        d: seminarDate1,
                        setD: setSeminarDate1,
                        s: seminarSlot1,
                        setS: setSeminarSlot1,
                        required: true,
                      },
                      {
                        label: '第2希望（平日）',
                        d: seminarDate2,
                        setD: setSeminarDate2,
                        s: seminarSlot2,
                        setS: setSeminarSlot2,
                        required: false,
                      },
                      {
                        label: '第3希望（平日）',
                        d: seminarDate3,
                        setD: setSeminarDate3,
                        s: seminarSlot3,
                        setS: setSeminarSlot3,
                        required: false,
                      },
                    ].map((x) => (
                      <div key={x.label} className="grid md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">{x.label}</label>
                          <input
                            type="date"
                            value={x.d}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (v && isWeekendDate(v)) {
                                alert('土日は選択できません。平日（月〜金）を選択してください。');
                                x.setD('');
                                x.setS('');
                                return;
                              }
                              x.setD(v);
                              if (!v) x.setS('');
                            }}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                            required={x.required}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">時間帯</label>
                          <select
                            value={x.s}
                            onChange={(e) => x.setS(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
                            required={x.required}
                            disabled={!x.d}
                          >
                            <option value="">選択してください</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
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
                />
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
              <li>
                <button onClick={handleTopClick} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                  TOP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#products')}
                  className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  サービス
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#features')}
                  className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  特徴
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#cases')} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                  受講事例
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
