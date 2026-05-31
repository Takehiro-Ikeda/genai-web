import { useEffect } from 'react';
import Header from '../../components/Header';

/**
 * コラム TOPページ
 * 構成：
 *   1. ページヘッダー（タイトル＋リード）
 *   2. TOP論説「借りる時代の終わり」本文（5ブロック）
 *   3. 4ジャンルへの入口（A〜D／7/1まではリンク非活性）
 *
 * 4ジャンルのリンク先（/column/security 等）は 2026/7/1 に追加予定。
 * それまでは comingSoon: true でグレーアウト表示。
 */

type Genre = {
  key: string;
  label: string;
  title: string;
  lead: string;
  to: string;
  comingSoon: boolean;
};

const GENRES: Genre[] = [
  {
    key: 'A',
    label: 'セキュリティ × 生成AI',
    title: 'セキュリティ',
    lead: '安全と利便は、本当に二者択一なのか。',
    to: '/column/security',
    comingSoon: true,
  },
  {
    key: 'B',
    label: 'ビジネス × 生成AI',
    title: 'ビジネス',
    lead: '事例の奥にある、構造の変化を読む。',
    to: '/column/business',
    comingSoon: true,
  },
  {
    key: 'C',
    label: 'ヘルスケア × 生成AI',
    title: 'ヘルスケア',
    lead: 'AI時代に、心と身体をどう守り休ませるか。',
    to: '/column/healthcare',
    comingSoon: true,
  },
  {
    key: 'D',
    label: '暗黙知 × 生成AI',
    title: '暗黙知',
    lead: '言葉にならないものを、どこまで引き継げるか。',
    to: '/column/tacit-knowledge',
    comingSoon: true,
  },
];

export default function ColumnPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* ページヘッダー */}
      <header className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-medium text-teal-700 tracking-wide mb-4">COLUMN</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            生成AI×〇〇で、<br className="md:hidden" />考えたいこと
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            セキュリティ・ビジネス・ヘルスケア・暗黙知。四つの切り口から、生成AIとの向き合い方を綴っていきます。
          </p>
        </div>
      </header>

      {/* TOP論説本文 */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 pb-8 border-b border-gray-200">
          <p className="text-sm font-medium text-teal-700 mb-3">TOP論説</p>
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 leading-snug mb-4">
            借りる時代の終わり
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-2">
            なぜ私たちは、生成AIをあらゆる領域に掛け算するのか
          </p>
          <p className="text-sm text-gray-400">池田 武弘（closip）</p>
        </div>

        <div className="prose-column">
          {/* 1. 借りる時代の終わり */}
          <p>
            2024年の暮れ、米Microsoftのサティア・ナデラCEOが、あるポッドキャスト番組で語った言葉が、世界に波紋を広げました。AIが自ら業務を実行する時代になれば、これまでの業務アプリケーション——いわゆるSaaS——は、その役割を終えていく。そうした見立ては〈SaaS is dead〉という言葉とともに語られるようになりました。
          </p>
          <p>
            そして、それは思想だけにとどまりませんでした。わずか1年あまりのちの2026年2月、ある新しいAIツールの登場をきっかけに、世界のソフトウェア銘柄からは、たった1週間で1兆ドルを超える価値が消えました。一人の経営者の見立ては、驚くほど短い時間で、市場が織り込む「現実」へと変わったのです。
          </p>
          <p>
            私は、この出来事を一企業の盛衰の物語だとは捉えていません。もっと根の深い、ひとつの前提の崩壊だと考えています。すなわち——「既製の機能を、月額で借りる」という、私たちがすっかり当たり前にしてきた前提の終わり。言い換えれば、<strong>「借りる時代」の終わり</strong>です。
          </p>
          <p>
            考えてみれば、SaaSとは「誰もが同じ既製の型に、自社の業務のほうを合わせていく」仕組みでもありました。本来であれば、道具のほうが自社にフィットすべきなのに、私たちは長らく、その逆を受け入れてきたのです。
          </p>
          <p>
            その不自然さを、生成AIが解きほぐし始めました。自社に必要なものを「その場で生成する」コストが、劇的に下がったからです。既製品を探して借りるよりも、自分たちの手で——AIとともに——つくるほうが、速く、安く、そして驚くほど自社にフィットする。そんな時代が、もう始まっています。
          </p>
          <p>
            だとすれば、これからの企業に問われるのは「優れたSaaSを選ぶ力」ではありません。<strong>AIとともに、自社に必要なものを生成し続ける力</strong>です。
          </p>

          {/* 2. 私たちは、道具を売りません */}
          <h3>私たちは、道具を売りません</h3>
          <p>
            では、その「生成し続ける力」は、どうすれば手に入るのでしょうか。
          </p>
          <p>
            ソフトウェアを一つ買い替えれば済む、という話ではありません。新しいツールを導入しても、それを「借りるもの」として扱っているかぎり、私たちは結局、また別の既製の型に自社を合わせ続けることになります。本当に必要なのは、ツールの乗り換えではなく、<strong>つくる側に回るという発想の転換</strong>です。
          </p>
          <p>
            ですから、私たちclosipは、できあいの道具を売る会社ではありません。
          </p>
          <p>
            私たちが提供したいのは、お客様自身が「AIとともに生成できる」状態そのものです。お客様の業務の隣に立ち、何をどうつくればいいのかを一緒に考え、ときに仕組みを設計し、ときに人を育てる。そうして、お客様の組織のなかに「生成し続ける力」が根づくまで伴走する——それが、私たちの仕事だと考えています。
          </p>
          <p>
            道具は、渡して終わりです。けれど力は、育てば、その組織のなかで生き続けます。私たちが「売る」のではなく「伴走する」ことにこだわるのは、この違いが、これからの時代の企業の命運を分けると信じているからです。
          </p>

          {/* 3. なぜ、私がこれを語るのか */}
          <h3>なぜ、私がこれを語るのか</h3>
          <p>
            少しだけ、私自身の話をさせてください。
          </p>
          <p>
            私はもともと、技術の人間です。大学で工学の博士号を取り、無線通信とインターネットセキュリティを専門に、スタンフォード大学でも研究の時間を過ごしました。技術が「何をできて、何をできないのか」を、私は内側から知っているつもりです。だからこそ、生成AIをめぐる過熱した期待にも、過剰な不安にも、できるだけ静かに向き合いたいと考えています。
          </p>
          <p>
            同時に私は、事業をつくってきた人間でもあります。かつて一つの会社を起こし、株式の上場、そして市場の一部指定替えまでを実現しました。加えて、年間200件を超える投資家とのIRミーティングを通じて、企業経営というものを、あらゆる角度から見つめてきたつもりです。だからこそ、生成AIが企業経営やビジネスの全体に与える影響を、流行りの言葉としてではなく、肌身の手触りとして受け止めることができる——そう考えています。
          </p>
          <p>
            そしていま私は、教える側にも立っています。東京都立大学で、生成AIをテーマに教鞭をとる機会をいただいています。人がAIとどう出会い、どう怖がり、どう使いこなしていくのか——その変化のただなかに身を置くなかで、私はある考えを持つようになりました。これからの時代に本当に価値があるのは、生成AIを活用するスキルやそこから派生する技術そのものよりも、その背景となる人間とAIの違いの理解、役割分担、そして、AIとさまざまな切り口から向き合う多様な思考を持てることなのだと。
          </p>
          <p>
            このコラムは、「生成AI×〇〇」というテーマで、私自身が日々感じている生成AIとの向き合い方や、多様な思考を自由に書き留める場所にしたいと思います。
          </p>

          {/* 4. このコラムで、私が考えたいこと */}
          <h3>このコラムで、私が考えたいこと</h3>
          <p>
            「生成AI×〇〇」。この〇〇に、私はさしあたり四つの言葉を入れたいと思っています。
          </p>
          <p>
            <strong>ひとつめは、セキュリティです。</strong> 生成AIを使いたい。けれど、大切な情報を外に出すわけにはいかない。とりわけ医療や行政、金融といった現場では、この矛盾が導入の最大の壁になっています。安全と利便は、本当に二者択一なのでしょうか。技術を内側から知る者として、この問いに向き合いたいと思います。
          </p>
          <p>
            <strong>ふたつめは、ビジネスです。</strong> 生成AIは、業務の効率化という言葉だけでは捉えきれないほど、経営や仕事のかたちそのものを変えていきます。どの業界の、どんな現場で、何が起き始めているのか。流行の事例紹介ではなく、その奥にある構造の変化を、経営を見てきた者の目で読み解いていきたいと思います。
          </p>
          <p>
            <strong>みっつめは、ヘルスケアです。</strong> 生成AIと健康——一見、遠いテーマに思えるかもしれません。けれど、AIが私たちの働き方を変えるほどに、人間の心と身体をどう守り、どう休ませるかという問いは、むしろ重みを増していきます。技術の話だけでは語りきれない、人間の側の話を、ここでしてみたいと思います。
          </p>
          <p>
            <strong>よっつめは、暗黙知です。</strong> 人や組織のなかには、言葉にならないまま受け継がれてきた知恵が、数えきれないほど眠っています。生成AIは、その「言葉にならないもの」を、どこまで掬い上げ、引き継いでいけるのか。これは私にとって、もっとも面白く、もっとも奥の深い問いです。
          </p>

          {/* 5. 手放さずにいるために */}
          <h3>手放さずにいるために</h3>
          <p>
            四つの切り口は、ばらばらに見えて、根のところでひとつにつながっています。セキュリティも、ビジネスも、ヘルスケアも、暗黙知も、突き詰めれば同じひとつの問いに行き着くからです。すなわち——<strong>この新しい道具を前に、私たち人間は何を手放し、何を手放さずにいるべきか</strong>。
          </p>
          <p>
            生成AIは、私たちから多くの手間を引き受けてくれます。けれど、引き受けてもらえるからといって、すべてを明け渡していいわけではありません。何を任せ、何を自分の手に残すのか。その線を引くのは、最後はいつも人間の側の仕事です。
          </p>
          <p>
            私は、生成AIを礼賛する側にも、危険視する側にも与しません。ただ、この道具とうまく付き合いながら、人間が人間らしくあり続けるための知恵を——技術の現場から、経営の現場から、そして人と組織の現場から——少しずつ、書き留めていきたいと思っています。
          </p>
          <p>
            このコラムが、生成AIという大きな変化の前で立ち止まっている誰かにとって、次の一歩を考えるためのささやかな手がかりになれたなら、これにまさる喜びはありません。
          </p>
          <p>それでは、はじめましょう。</p>
        </div>
      </article>

      {/* 4ジャンルへの入口 */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">四つの切り口</h2>
            <p className="text-sm md:text-base text-gray-600">
              「生成AI×〇〇」の四つのテーマで、順次お届けします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GENRES.map((g) => (
              <div
                key={g.key}
                className="relative bg-white rounded-2xl border border-gray-200 p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                    {g.key}
                  </span>
                  <p className="text-xs font-medium text-teal-700 tracking-wide">{g.label}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{g.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{g.lead}</p>
                {g.comingSoon ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 cursor-not-allowed">
                    <i className="ri-time-line"></i>
                    2026年7月 公開予定
                  </span>
                ) : (
                  <a
                    href={g.to}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    記事を読む
                    <i className="ri-arrow-right-line"></i>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm text-gray-400">
              生成AIとの向き合い方を、四つの切り口から。
            </p>
            <a
              href="/contact"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap self-start md:self-auto"
            >
              無料相談はこちら
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
