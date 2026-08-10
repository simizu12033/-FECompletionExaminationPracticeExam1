const TERM_STORAGE_KEY="fe-kamoku-a-moshi-1-term-progress";
const termState={
  filter:"すべて",
  query:"",
  active:0,
  flipped:false,
  progress:JSON.parse(localStorage.getItem(TERM_STORAGE_KEY)||"{}")
};
const termFields=["すべて",...new Set(TERMS.map(t=>t.field))];
const termStatusLabel={known:"説明できた",shaky:"少し不安",weak:"説明できない"};
const termStatusClass={known:"known",shaky:"shaky",weak:"weak"};
const termStatusRank={weak:0,shaky:1,known:2};
const termEsc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const TERM_DEFINITIONS=[
"仮数と指数を使って、非常に大きい数や小さい数を表す方式。","平均を中心に左右対称の釣鐘形になる確率分布。","経験則を使い、短時間で実用的な解を探す方法。","根を含む区間を半分ずつ狭める数値計算法。","データを用途に合った規則で格納・接続する仕組み。",
"隣り合う要素を比較・交換して整列する方法。","サーバ上でJavaを実行し、動的なWebページを生成する技術。","利用者が本人であることを確認する仕組み。","CPUと主記憶の速度差を埋める高速な一時記憶。","モジュール同士がどれだけ強く依存しているかを示す度合い。",
"複数のCPUで処理を分担するコンピュータ構成。","要求を送ってから結果が返るまでの時間。","OSの中核機能だけを最小限にしたカーネル方式。","ソフトウェアの品質を段階的に確認する作業の流れ。","ソースコードを一定のライセンス条件で公開するソフトウェア。",
"0と1のいずれかの状態を保持する順序回路。","3次元モデルに光・陰影・質感を与えて画像化する処理。","同じデータベース対象に付けられた別名。","推移的な関数従属を取り除いた表の形。","データベースの検索や更新を指示するための言語。",
"同じ値をもつ行をグループ単位で集約するSQL句。","複数の処理を一つの作業単位として管理する仕組み。","画素数と1画素当たりのビット数から求める画像の容量。","無線LANで送信前の確認と待機によって衝突を避ける方式。","インターネット通信を層ごとの役割に分けたプロトコル群。",
"ネットワークの制御機能と転送機能を分離する考え方。","DNSキャッシュへ偽の名前解決情報を登録させる攻撃。","共通鍵暗号と公開鍵暗号を組み合わせる暗号方式。","文書の作成者と改ざんの有無を確認する仕組み。","情報セキュリティ上のリスクを管理するための対応。",
"Webアプリへの通信内容を検査する防御装置。","一部が故障してもシステム全体を継続できるようにする設計。","電子メールの暗号化とディジタル署名を行う規格。","UMLでクラス同士のつながりを表す記法。","オブジェクトに処理を依頼するために送る情報。",
"複数のサーバへ要求を振り分ける仕組み。","状態とイベントによる遷移を基に確認するテスト。","サーバやネットワーク構成をコードで定義・管理する手法。","製品に必要な作業を優先順位付きで並べた一覧。","目標の達成度を途中で測るための重要な指標。",
"実績と比較するために承認された計画上の基準。","遅れるとプロジェクト全体の完了も遅れる最長経路。","サービス品質の目標値を利用者と提供者が合意したもの。","到着する要求と処理能力の関係を扱う待ちモデル。","システムが正常に利用できる時間の割合。",
"企業が公正さや社会的責任を重視して行動する考え方。","発明・デザイン・著作物などの知的成果を守る権利。","製品の全期間を通して環境負荷を減らす設計。","政治・経済・社会・技術から外部環境を分析する手法。","顧客の認識上で製品やブランドの位置を明確にすること。",
"業務を抜本的に再設計し、経営資源を統合する取組み。","優良企業が破壊的技術への対応に遅れる現象。","レーザー光の反射から対象物の距離や形状を測る技術。","複数の交通手段を検索・予約・決済まで統合するサービス。","利用者IDの作成から削除までを適切に管理すること。",
"事業単位を独立会社のように運営し、権限と責任を持たせる組織形態。","利益がちょうど0になる売上高。","項目を重要度に応じてA・B・Cへ分類する分析手法。","売上線と費用線の交点で損益分岐点を読む図。","創作された表現を保護する権利。"
];
const TERM_CLUES=[
"式a=f×rᵉでは、fが仮数、rが基数、eが指数。","範囲外5%未満なら、中央約95.45%を含む±2σ。","「経験則」「実用的な解」「短時間」が目印。","区間の両端で符号が異なる側だけを残す。","データ部と次要素へのポインタがあれば線形リスト。",
"「隣接要素を比較し、逆なら交換」がバブルソート。","Javaをサーバ側で実行しHTMLを生成するならJSP。","「本人か」を確かめるのが認証、「許可範囲」は認可。","主記憶にも同時に書くならライトスルー。","必要なデータだけを引数で渡すデータ結合が最も弱い。",
"複数CPUが一つの主記憶を使えば密結合。","要求送信から結果受信までならレスポンスタイム。","中核を最小化し、周辺機能をサーバ化する方式。","部品は単体、接続は結合、全体はシステム、業務は運用。","無償ではなく、ソース公開とライセンス条件で判断。",
"「二つの安定状態」「1ビット記憶」が目印。","モデルに陰影や質感を付けて画面化する処理。","同じ対象の別名を扱う説明ならシノニム。","非キー属性が別の非キー属性に従属していなければ第3正規形。","SQLはFROM→WHERE→GROUP BY→HAVING→SELECTの順に追う。",
"集約後の件数は、元の行数ではなくグループ数。","ロック取得から解放まで、他処理が待つ区間を見る。","画素数×色深度でbit、byteへ直すときだけ÷8。","CSMA/CAは無線で衝突回避、CSMA/CDは有線で衝突検出。","IPは配送、TCPは信頼性、UDPは軽量さで判別。",
"コントローラがOpenFlowでスイッチへ指示する構成。","DNSキャッシュに偽IPアドレスを残す攻撃。","データは共通鍵、共通鍵の配送は公開鍵で暗号化。","秘密鍵で署名し、対応する公開鍵で検証。","対応は回避・低減・移転・保有、実施後は残留リスク確認。",
"HTTP内容を見てWebアプリ攻撃を防ぐならWAF。","故障後も機能を続けるならトレランス、故障を避けるならアボイダンス。","証明書を使うメールの署名・暗号化ならS/MIME。","白ひし形は集約、黒ひし形はコンポジション、三角は継承。","メッセージ受信後に対応するメソッドを実行。",
"要求を複数サーバへ振り分ける装置がロードバランサ。","状態とイベントの組合せ、遷移経路を漏れなく追う。","構成をコード化し、同じ環境を自動再現するならIaC。","価値順の一覧を管理する責任者はプロダクトオーナ。","最終目標ではなく、途中の達成度を数値で追う指標。",
"承認済み計画と実績の差を測る基準がベースライン。","開始から終了までの所要時間が最大の経路。","可用性や応答時間を数値で合意していればSLA。","利用率ρ=λ÷μ。ρが1に近いほど待ち時間が急増。","直列は各稼働率の積、並列は1−全系統停止確率。",
"法令遵守だけでなく、公正・透明・社会的責任を含む。","発明=特許、考案=実用新案、デザイン=意匠、標章=商標。","原材料から廃棄・再資源化まで全期間を見るならLCA。","政治・経済・社会・技術というマクロ外部環境。","二つの軸の意味を確認し、点の位置と距離を読む。",
"業務の抜本的再設計がBPR、全社資源の統合がERP。","既存の優良顧客を重視して新市場への対応が遅れる現象。","レーザー光の往復時間で距離・方向・形状を測る。","複数交通手段を検索・予約・決済まで一体化。","入社時作成、最小権限、異動時変更、退職時削除。",
"事業単位へ大きな権限と責任を与えるならカンパニー制。","損益分岐点売上高=固定費÷限界利益率。","累積金額比率が高い少数項目をAとして重点管理。","売上線と費用線の交点が損益分岐点。","保護対象は具体的な表現。アイデアやアルゴリズム自体は対象外。"
];
const termGuide=term=>({
  cue:term.cue,
  definition:term.meaning,
  clue:term.clue||term.cue
});

function saveTermProgress(){
  localStorage.setItem(TERM_STORAGE_KEY,JSON.stringify(termState.progress));
}
function termStatus(term){
  return termState.progress[term.id]?.status||"";
}
function termAnswered(term){
  return !!termStatus(term);
}
function filteredTerms(){
  return TERMS.slice().sort((a,b)=>{
    const as=termStatus(a),bs=termStatus(b);
    if(as!==bs)return (termStatusRank[as]??-1)-(termStatusRank[bs]??-1);
    return a.q-b.q;
  });
}
function weakTermsFromAnswers(){
  const answers=JSON.parse(localStorage.getItem("fe-kamoku-a-moshi-1-answers")||"{}");
  if(typeof QUESTIONS==="undefined")return [];
  return TERMS.filter(t=>{
    const q=QUESTIONS.find(x=>x.n===t.q);
    return q&&answers[t.q]&&answers[t.q]!==q.answer;
  });
}
function setActiveTerm(index){
  const list=filteredTerms();
  termState.active=Math.max(0,Math.min(index,list.length-1));
  termState.flipped=false;
  renderTerms();
}
function jumpToTerm(termId){
  const target=TERMS.find(t=>t.id===termId);
  if(!target)return;
  const index=filteredTerms().findIndex(t=>t.id===termId);
  setActiveTerm(index<0?0:index);
}
function markTerm(status){
  const list=filteredTerms();
  const term=list[termState.active];
  if(!term)return;
  termState.progress[term.id]={status,updatedAt:new Date().toISOString()};
  saveTermProgress();
  const next=Math.min(termState.active+1,Math.max(0,list.length-1));
  termState.active=next;
  termState.flipped=false;
  renderTerms();
}
function renderTerms(){
  const section=document.querySelector("#termLearning");
  if(!section)return;
  const list=filteredTerms();
  if(termState.active>=list.length)termState.active=0;
  const active=list[termState.active];
  const known=TERMS.filter(t=>termStatus(t)==="known").length;
  const shaky=TERMS.filter(t=>termStatus(t)==="shaky").length;
  const weak=TERMS.filter(t=>termStatus(t)==="weak").length;
  const wrongWeak=weakTermsFromAnswers();
  document.querySelector("#termStats").innerHTML=[
    ["全用語",TERMS.length],
    ["説明できた",known],
    ["少し不安",shaky],
    ["説明できない",weak]
  ].map(([label,value])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join("");
  const filters=document.querySelector("#termFilters");
  if(filters)filters.innerHTML="";
  const card=document.querySelector("#termCard");
  if(!active){
    card.innerHTML=`<p class="term-empty">条件に一致する用語がありません。</p>`;
  }else{
    const status=termStatus(active);
    const guide=termGuide(active);
    card.className=`term-card ${termState.flipped?"flipped":""} ${termStatusClass[status]||""}`;
    card.innerHTML=`
      <div class="term-card-top">
        <span>${termEsc(active.field)}</span>
        <a href="#q${active.q}">問${active.q}</a>
      </div>
      <button class="term-flip" type="button" aria-expanded="${termState.flipped}">
        <span class="term-face front">
          <small>重要用語</small>
          <strong>${termEsc(active.term)}</strong>
          <em>この言葉の意味を説明してから、カードを開いて確認</em>
        </span>
        <span class="term-face back">
          <span class="term-answer-title"><small>重要用語</small><strong>${termEsc(active.term)}</strong></span>
          <span class="term-answer-block cue"><small>覚え方・関連付け</small><b>${termEsc(guide.cue)}</b></span>
          <span class="term-answer-block meaning"><small>意味・定義</small><p>${termEsc(guide.definition)}</p></span>
          <span class="term-answer-block clue"><small>試験での見分け方</small><u>${termEsc(guide.clue)}</u></span>
          <span class="term-answer-block trap"><small>間違えやすいポイント</small><i>${termEsc(active.trap)}</i></span>
        </span>
      </button>
      <div class="term-tags"><b>関連キーワード</b>${active.tags.map(tag=>`<span>${termEsc(tag)}</span>`).join("")}</div>
      <div class="term-grade-guide"><b>自己評価</b><span>カードを開く前の状態で選んでください</span></div>
      <div class="term-grade">
        <button type="button" data-term-status="known"><strong>説明できた</strong><small>定義と見分け方を言えた</small></button>
        <button type="button" data-term-status="shaky"><strong>少し不安</strong><small>意味は分かるが区別に迷う</small></button>
        <button type="button" data-term-status="weak"><strong>説明できない</strong><small>定義を思い出せなかった</small></button>
      </div>
      ${status?`<p class="term-current">現在：${termStatusLabel[status]}</p>`:""}
    `;
  }
  const termList=document.querySelector("#termList");
  if(termList)termList.innerHTML=list.map((t,i)=>{
    const status=termStatus(t);
    return `<button type="button" class="${i===termState.active?"active":""} ${termStatusClass[status]||""}" data-term-index="${i}">
      <b>${termEsc(t.term)}</b><span>問${t.q}</span>
    </button>`;
  }).join("");
  document.querySelector("#termWeakLinks").innerHTML=wrongWeak.length
    ?wrongWeak.map(t=>`<a href="#termLearning" data-term-jump="${t.id}">${termEsc(t.term)}<span>問${t.q}</span></a>`).join("")
    :`<span>採点後に間違えた問題の用語がここに出ます。</span>`;
  document.querySelector("#termPosition").textContent=list.length?`${termState.active+1} / ${list.length}`:"0 / 0";
}
function initTerms(){
  const section=document.querySelector("#termLearning");
  if(!section)return;
  document.querySelector("#termCard").onclick=e=>{
    if(e.target.closest("[data-term-status]")){
      markTerm(e.target.closest("[data-term-status]").dataset.termStatus);
      return;
    }
    if(e.target.closest(".term-flip")){
      termState.flipped=!termState.flipped;
      renderTerms();
    }
  };
  const termList=document.querySelector("#termList");
  if(termList)termList.onclick=e=>{
    const button=e.target.closest("[data-term-index]");
    if(button)setActiveTerm(Number(button.dataset.termIndex));
  };
  document.querySelector("#termWeakLinks").onclick=e=>{
    const link=e.target.closest("[data-term-jump]");
    if(!link)return;
    jumpToTerm(link.dataset.termJump);
  };
  document.addEventListener("click",e=>{
    const link=e.target.closest("[data-term-ref]");
    if(!link)return;
    jumpToTerm(link.dataset.termRef);
  });
  document.querySelector("#termPrev").onclick=()=>setActiveTerm(termState.active-1);
  document.querySelector("#termNext").onclick=()=>setActiveTerm(termState.active+1);
  document.querySelector("#termReset").onclick=()=>{
    if(confirm("用語カードの覚えた/あやしい/覚えていないの記録を消しますか？")){
      termState.progress={};
      saveTermProgress();
      renderTerms();
    }
  };
  renderTerms();
}
initTerms();
