const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const SPECS={
1:["equation","a = f × rᵉ",["f：仮数","r：基数","e：指数"],"数の大きさを三つの役割に分解"],
2:["bell","μ","μ−2σ","μ+2σ","中央約95.45%","外側約4.55%"],
3:["funnel","全ての候補","経験則で絞る","実用的な解","最適解の保証ではなく、短時間で良い解を探す"],
4:["interval","0","1","1/2","3/4","根を含む側だけを残す"],
5:["linked","データA","データB","データC","データ部＋次要素へのポインタ"],
6:["sort",["2","7","3","5","6","8","4","1"],["2","3","7","5","6","8","4","1"],"隣同士を比較し、逆なら交換"],
7:["web","ブラウザ","Webサーバ","JSP","HTMLを生成","サーバ側でJavaを実行"],
8:["security","利用者","認証","アクセス制御","許可された操作","本人確認と権限確認を分ける"],
9:["cache","CPU","キャッシュ","主記憶","同時に書込む","ライトスルー：整合性を保ちやすい"],
10:["coupling",["内容","共通","外部","制御","スタンプ","データ"],"強い結合","弱い結合","必要なデータだけを渡す"],
11:["architecture","CPU","CPU","共有主記憶","I/O","複数CPUが同じメモリを利用"],
12:["timeline","要求","処理開始","結果返却","レスポンスタイム","要求から結果まで"],
13:["kernel","アプリ","ファイルサーバ","デバイスサーバ","マイクロカーネル","中核を最小化し周辺機能を分離"],
14:["stages",["単体テスト","結合テスト","システムテスト","運用テスト"],"部品","連携","全体","業務"],
15:["oss","ソース公開","利用・改変","再配布","ライセンス条件","無償かどうかだけでは判断しない"],
16:["flipflop","入力","0 / 1","クロック","状態保持","1ビットを記憶する順序回路"],
17:["render","3Dモデル","ポリゴン","陰影・質感","2D画像","形状から画面表示へ"],
18:["keys","候補キー","代替キー","外部キー","シノニム","名称の別名とキーの役割を区別"],
19:["normalize","受注明細","商品コード","商品名・単価","商品表へ分離","推移的関数従属をなくす"],
20:["sql","元表","WHERE","GROUP / JOIN","SELECT結果","処理順に中間表を書く"],
21:["group","受注行","得意先コード","GROUP BY","グループ数","行数ではなく集約後を数える"],
22:["locks","T₁ ロック","T₁ 処理","T₂ 待機","T₁ 解放","排他区間の重なりを見る"],
23:["formula","画素数 × 色数",["40bit/画素","bit÷8","容量÷速度"],"転送時間","単位をbitとbyteで統一"],
24:["wireless","端末A","送信前に確認","ランダム待機","端末B","CSMA/CAは衝突を回避"],
25:["layers",["アプリケーション","トランスポート TCP/UDP","インターネット IP","リンク"],"役割を層で切り分ける"],
26:["sdn","SDNコントローラ","OpenFlow","スイッチA","スイッチB","制御と転送を分離"],
27:["dns","利用者","偽DNS応答","汚染キャッシュ","偽サイト","DNSSECなどで正当性を検証"],
28:["hybrid","本文","共通鍵で暗号化","共通鍵","公開鍵で暗号化","速度と安全な鍵配送を両立"],
29:["signature","文書","ハッシュ値","秘密鍵で署名","公開鍵で検証","真正性・完全性・否認防止"],
30:["risk",["特定","分析","評価","対応","監視"],"ISMSリスク管理","回避・低減・移転・保有"],
31:["waf","利用者","WAF","Webアプリ","SQL Injection","HTTP内容を検査して防御"],
32:["reliability","故障を予防","フォールトアボイダンス","故障後も継続","フォールトトレランス","目的の違いを比較"],
33:["mail","送信者","署名＋暗号化","S/MIME","受信者","証明書を使うメール保護"],
34:["uml",["関連 ─","集約 ◇","コンポジション ◆","継承 △"],"UMLクラス間関係","ひし形の白黒と三角矢印に注目"],
35:["message","オブジェクトA","メッセージ","オブジェクトB","メソッド実行","データと処理を責務としてまとめる"],
36:["loadbalance","要求","ロードバランサ","サーバ1","サーバ2","処理を分散し性能・可用性を向上"],
37:["state","状態A","イベントx","状態B","イベントy","状態C","状態と遷移を網羅"],
38:["iac","構成コード","レビュー","自動実行","同じ環境を再現","Infrastructure as Code"],
39:["backlog","価値が高い","優先順位","プロダクトバックログ","次スプリント","POが継続的に整備"],
40:["kpi","目標","KPI","実績測定","改善","達成度を定量的に追跡"],
41:["baseline","計画ベースライン","実績","差異","変更管理","承認済み基準と比較"],
42:["critical","開始",["A 10","B 8","C 14"],"合流",["D 18","E 20"],"終了","合計時間が最大の経路"],
43:["sla","利用者と提供者","可用性","応答時間","測定・報告","サービス品質を数値で合意"],
44:["queue","到着率 λ","待ち行列","サービス率 μ","利用率 ρ=λ/μ","ρが1に近いほど待ち時間増大"],
45:["availability","直列：A×B","並列：1−(1−A)(1−B)","構成図","稼働率","直列と並列を分けて計算"],
46:["ethics","法令遵守","公正・透明","社会的責任","企業倫理","短期利益だけで判断しない"],
47:["iprights",["発明→特許","考案→実用新案","デザイン→意匠","標章→商標"],"保護対象と権利を対応"],
48:["lifecycle",["原材料","製造","利用","回収","再資源化"],"LCA","ライフサイクル全体で環境負荷を見る"],
49:["pest",["P 政治","E 経済","S 社会","T 技術"],"外部環境分析","内部の強み・弱みではない"],
50:["position","高品質","低価格","ブランドA","ブランドB","ブランドC","軸と距離から競合を読む"],
51:["bpr","現行業務","抜本的再設計","ERPで統合","全体最適","単なる部分自動化ではない"],
52:["disruption","既存市場","既存顧客を重視","破壊的技術","新市場から成長","優良企業でも対応が遅れる"],
53:["lidar","レーザ発射","対象物","反射光","往復時間","距離＝光速×時間÷2"],
54:["maas",["検索","予約","決済"],["鉄道","バス","タクシー"],"一つのサービスとして統合"],
55:["account",["本人認証","最小権限","不要ID削除","ログ監査"],"アカウントのライフサイクル管理"],
56:["organization",["職能別","事業部制","カンパニー制","マトリックス"],"権限と責任の置き方を比較"],
57:["breakeven","固定費 ÷ 限界利益率",["限界利益率=(売上−変動費)÷売上"],"損益分岐点売上高","利益が0になる売上"],
58:["abc","A：少数・高金額","B：中間","C：多数・低金額","累積金額比率","重要度に応じて管理強度を変える"],
59:["begraph","売上線","費用線A","費用線B","損益分岐点100","交点後の線の開きが利益"],
60:["copyright","保護される","ソースプログラム","保護されない","アイデア・通信規約・アルゴリズム","表現と発想を区別"]
};

// 科目A模試1専用の図解定義。問題ごとに計算・構成・比較・時系列を描き分ける。
const MOCK_SPECS={
1:["truth",["X","Y","X□Y"],["0 0 → 1","0 1 → 1","1 0 → 0","1 1 → 1"],"二つの式を同時に満たす列を作る"],
2:["bayes","原因の事前確率","観測結果","原因の事後確率","P(原因|結果)","結果から原因へ逆算"],
3:["compare","学習データ","正解率が非常に高い","テストデータ","正解率が大きく低下","差が大きい＝過学習"],
4:["precision","大きい数へ指数をそろえる","小さい数の有効桁","7ビットより下位","切捨て","小さい値が消える＝情報落ち"],
5:["tree","a",["b","c"],["d","e","f","g"],"左＜親＜右","d＜b＜e＜a＜f＜c＜g"],
6:["stack",["PUSH A","PUSH B","PUSH C"],["C","B","A"],"最後に入れたものからPOP","Cの下のAを先に取り出せない"],
7:["quadrants",["DOM：文書操作API","JSON：名前と値","SOAP：通信規約","XML：タグ記述"],"JSONを選ぶ","データ表現・API・通信規約を分ける"],
8:["hub","GPU",["多数の演算器","同種計算","大量データ","並列実行"],"CPUは制御・入出力を担当"],
9:["pipeline",["フェッチ","デコード","実行","メモリ","書込み"],"命令1",["命令2","命令3"],"段をずらして同時進行"],
10:["equation","0.7＋(0.7x)/(20－x) ＞ 0.9",["x＞4.44","整数の最小値"],"x＝5台","停止負荷を稼働中の台数で分担"],
11:["iac","構成コード","版管理・レビュー","自動構築","同じ環境を再現","手作業の差異を減らす"],
12:["availability",["A：並列2台","B：直列＋並列","C：直列組を並列"],["0.9900","0.8910","0.9639"],"A ＞ C ＞ B","直列は積、並列は全停止を1から引く"],
13:["ribbon","利用者入力","宿泊施設検索API","空室確認API","結果を一つに統合","入出力を連結するロジックマッシュアップ"],
14:["compare","主記憶が不足","ページフォールト多発","主記憶を増設","ワーキングセット保持","CPU強化では解消しない"],
15:["quadrants",["利用","改変","再配布","著作権表示・条件"],"OSSライセンス","無償＝無条件ではない"],
16:["circuit",["A","B"],"A OR B","NOT","Y",["00→1","01→0","10→0","11→0"],"NANDを段階的に簡約するとNOR"],
17:["compare","PC：複数列","同一HTML＋CSS","スマホ：1列","メディアクエリ","端末別HTMLを作らない"],
18:["quadrants",["原子性：全部かゼロ","一貫性：制約維持","隔離性：相互影響なし","持続性：結果を保持"],"ACID","設問は原子性"],
19:["ribbon","注文コード","顧客コード","顧客住所","X→Y→Z","非キー属性を介する推移的関数従属"],
20:["compare","データウェアハウス","目的別に抽出・加工","データマート","部門・分析向けDB","生データ保存のレイクとは別"],
21:["table",["更新前：A444","対象：2行","更新後：A777","A777が重複"],"PRIMARY KEY違反","更新後の一意性を確認"],
22:["hub","NoSQL",["キー","バリュー","高速参照","柔軟な構造"],"RDBMS以外のDB群"],
23:["ribbon","電波を確認","使用中なら待機","ランダム待機","送信","無線は衝突を検出せず事前回避"],
24:["duplex","端末A","送信 →","← 送信","端末B","双方が同時に送受信"],
25:["network",["送信端末","ルータ1","ルータ2","宛先端末"],"IP：端から端まで維持","MAC：リンクごとに更新","ルータは新しいフレームを作る"],
26:["binary","172.30.123.45","255.255.252.0","AND","172.30.120.0","第3オクテットを2進数で計算"],
27:["security","悪意あるWebサイト","閲覧だけで脆弱性を悪用","利用者端末","マルウェア自動感染","明示的な実行がなくても感染"],
28:["ribbon","HTTPS通信","SSLアクセラレータで復号","WAFでHTTP検査","Webサーバ","暗号化中は内容を検査できない"],
29:["risk",["端末","IP・場所","時刻","試行回数","行動"],"リスク評価","高リスク時だけ追加認証"],
30:["ribbon","通常パターンを学習","外れた通信を検知","人が結果を確認","対応","未知攻撃を狙うが誤検知に注意"],
31:["ribbon","SYN","ESTABLISHED","通信状態を記録","戻りパケット照合","セッション状態で通過・遮断"],
32:["compare","オンライン複製","攻撃から書換え可能","WORMバックアップ","消去・変更不可","復旧用は攻撃経路から隔離"],
33:["attack","少数のパスワード",["ID-001","ID-002","ID-003","多数のID"],"横断的な失敗監視","レート制限＋追加認証"],
34:["hub","API連携",["注文サービス","在庫サービス","決済サービス","配送サービス"],"個別に変更・展開できる"],
35:["compare","障害発生","サービス停止","予備系へ切替え","自動復旧","耐障害性・回復性を高める"],
36:["classes",["18歳未満","18歳以上"],["代表値10歳","代表値25歳"],"同じ結果になる範囲ごとに1件","17・18・19は境界値分析"],
37:["cycle",["計画","開発","レビュー","振返り"],"固定長スプリント","リリース判断可能なインクリメント"],
38:["story","利用者として","目的のために","機能が欲しい","価値に焦点","誰が・何のために・何を"],
39:["hub","旅行情報サービス",["地図API","天気API","経路検索API"],"既存機能を組み合わせ新サービスへ"],
40:["ribbon","スプリントゴール","選択した項目","実現する作業計画","開発者が更新","固定計画ではない"],
41:["critical","開始",["A 3日","E 5日"],"合流",["F 14日","H 15日","I 5日"],"終了 31日","合流点では到着時刻の最大値"],
42:["decision","新規開発",["需要大 0.6 × 30億","需要小 0.4 × −10億"],"18−4","EMV＝14億円","金額×確率を全枝で合計"],
43:["security","外部に接する扉","常時施錠なし","保護領域","未認可アクセスの危険","錠・警報・開閉制御が必要"],
44:["percent",["移行前 98.00%","移行後 99.99%"],"99.99−98.00","1.99ポイント向上","割合差はパーセントポイント"],
45:["ribbon","影響度を判定","報告・対応手順","障害内容を記録","原因究明・再発防止","全障害を同一手順にしない"],
46:["ribbon","業務を可視化","非効率を見直す","定型処理を選ぶ","RPAで自動化","変更・例外が少ない業務から"],
47:["hybridcloud","社内DB","機密データ保持","クラウド","変動負荷を伸縮","段階導入でTCO・SLA・安全性を確認"],
48:["quadrants",["多様性を認知","能力を活用","機会を提供","競争力へつなげる"],"ダイバーシティ管理","違いを価値創造の源泉にする"],
49:["hub","一貫した顧客体験",["実店舗","EC","コールセンタ","共通在庫・顧客情報"],"チャネル間を連携する"],
50:["canvas",["顧客 CS","価値 VP","チャネル CH","関係 CR","収益 R$","資源 KR","活動 KA","協力 KP","コスト C$"],"価値提案 VP","顧客へ何を提供するか"],
51:["equation","(当月末会員−新規会員) ÷ 前月末会員",["B：(800−200)÷1000","×100"],"60%で最大","新規会員を除いて継続者を数える"],
52:["adoption",["イノベータ","アーリーアダプタ","キャズム","アーリーマジョリティ","レイト層"],"初期市場","主流市場","普及の大きな溝"],
53:["hub","口座情報を一括表示",["銀行A","銀行B","証券口座","カード"],"FinTechのアカウントアグリゲーション"],
54:["ribbon","収集","整備・クレンジング","分析・規則発見","戦略へ活用","機械学習・クラスタリングは分析工程"],
55:["ribbon","カメラで撮影","端末近くでAI推論","即時に異常判定","排除装置へ通知","低遅延・外部送信なし"],
56:["scatter","x増加","y減少","右下がり","相関係数＜0","負の相関。因果関係とは別"],
57:["equation","(固定費＋目標利益) ÷ 限界利益率",["限界利益率＝1−変動費率","目標利益を分子へ加える"],"必要売上高","利益0なら損益分岐点"],
58:["abc","A：累計70%まで","B：累計90%まで","C：残り","商品2・5がA","金額の降順で累計する"],
59:["ribbon","専門家へ匿名調査","回答を集計","結果をフィードバック","再回答して収束","反復するため期間が長い"],
60:["compare","著作権","譲渡できる財産権","著作者人格権","著作者専属・譲渡不可","氏名表示権は人格権"],
};

const MEMORY_LINES=[
"中身f・桁ずらしe・ものさしr","2σなら外は約5%","経験で近道、最適保証なし","符号が変わる半分を残す","データ＋次の住所",
"バブルは隣と交換","サーバでJava、返すのはHTML","認証は誰、認可は何をしてよい","スルーは主記憶まで通り抜ける","データ結合が最弱で理想",
"密結合はメモリ共有","要求から返答までが応答時間","マイクロは中核だけ小さく","部品→連携→全体→業務","OSSは無料よりライセンス",
"二つの安定状態で1ビット","形状→光と質感→2D画像","キーは識別、シノニムは別名","商品情報を商品表へ分離","SQLはFROMから中間表",
"GROUP後は行でなく組を数える","取得→処理→解放、他方は待つ","画素×bit、最後に÷8","無線は衝突を検出せず回避","IPは届け先、TCPは確実、UDPは軽い",
"SDNは頭脳と転送を分離","偽住所をDNSキャッシュへ","本文は共通鍵、鍵は公開鍵","秘密で署名、公開で検証","回避・低減・移転・保有",
"WAFはHTTPの門番","避ける設計と耐える設計","証明書付きメール保護","白ひし形は集約、黒は一心同体","依頼を受けてメソッド実行",
"入口で要求を振り分ける","状態と矢印を網羅","インフラをコードで再現","価値順、責任者はPO","KPIは目標への途中メーター",
"承認済み物差しがベースライン","最長経路が納期を決める","品質を数字で約束","ρが1に近いほど待つ","直列は掛算、並列は全滅を引く",
"合法だけでなく公正・透明","発明特許・考案実用・形意匠・印商標","入口から出口まで環境を見る","PESTは外の四風","軸→位置→距離",
"BPRは抜本、ERPは統合","優良企業ほど既存顧客に縛られる","光の往復時間で距離","検索・予約・決済を一つに","作る・絞る・消す・監査",
"職能は専門、事業部は製品、マトリックスは二軸","固定費÷限界利益率","Aは少数・高金額","交点の右側が利益","守るのは表現、守らないのは発想"
];
const node=(text,cls="")=>`<span class="pv-node ${cls}">${esc(text)}</span>`;
const arrow=(label="")=>`<i class="pv-arrow">${label?`<small>${esc(label)}</small>`:""}</i>`;
const chain=(items)=>`<div class="pv-chain">${items.map((x,i)=>`${i?arrow():""}${node(x,i===items.length-1?"accent":"")}`).join("")}</div>`;
const cards=(items)=>`<div class="pv-cards">${items.map((x,i)=>`<span class="${i===items.length-1?"accent":""}">${esc(x)}</span>`).join("")}</div>`;

function renderSpec(q){
 const s=MOCK_SPECS[q.n]||["ribbon",q.title,...q.reasoning,q.caption];
 const t=s[0];
 if(t==="bell")return `<div class="pv-bell"><svg viewBox="0 0 360 170"><path d="M18 145 C90 145 92 20 180 20 S270 145 342 145"/><line x1="72" y1="145" x2="72" y2="76"/><line x1="288" y1="145" x2="288" y2="76"/></svg><b>${esc(s[4])}</b><span>${esc(s[2])}</span><span>${esc(s[3])}</span><em>${esc(s[5])}</em></div>`;
 if(t==="equation"||t==="formula"||t==="breakeven")return `<div class="pv-equation"><strong>${esc(s[1])}</strong>${Array.isArray(s[2])?cards(s[2]):""}<b>${esc(s[3]||"")}</b><p>${esc(s[4]||"")}</p></div>`;
 if(t==="sort")return `<div class="pv-sort"><div>${s[1].map(x=>node(x)).join("")}</div><i>↓ 交換</i><div>${s[2].map((x,i)=>node(x,i===1||i===2?"accent":"")).join("")}</div><p>${esc(s[3])}</p></div>`;
 if(t==="coupling"||t==="risk"||t==="layers"||t==="lifecycle")return `<div class="pv-ladder">${s[1].map((x,i)=>`<span style="--i:${i}" class="${i===s[1].length-1?"accent":""}">${esc(x)}</span>`).join("")}<b>${esc(s[2])}</b><p>${esc(s[3])}</p></div>`;
 if(t==="critical")return `<div class="pv-critical">${node(s[1])}<div>${s[2].map(x=>`<span>${esc(x)}</span>`).join("")}</div>${node(s[3])}<div>${s[4].map(x=>`<span>${esc(x)}</span>`).join("")}</div>${node(s[5],"accent")}<p>${esc(s[6])}</p></div>`;
 if(t==="pest"||t==="iprights"||t==="organization"||t==="account"||t==="uml"||t==="quadrants")return `<div class="pv-quadrants">${s[1].map((x,i)=>`<span class="${i===1?"accent":""}">${esc(x)}</span>`).join("")}<b>${esc(s[2])}</b><p>${esc(s[3]||"")}</p></div>`;
 if(t==="position")return `<div class="pv-position"><i class="x"></i><i class="y"></i><small>${esc(s[1])}</small><small>${esc(s[2])}</small>${node(s[3],"a")}${node(s[4],"b")}${node(s[5],"c")}<p>${esc(s[6])}</p></div>`;
 if(t==="begraph")return `<div class="pv-graph"><svg viewBox="0 0 360 190"><line x1="28" y1="165" x2="340" y2="165"/><line x1="28" y1="165" x2="28" y2="18"/><line class="sales" x1="28" y1="165" x2="320" y2="25"/><line class="cost-a" x1="28" y1="120" x2="320" y2="50"/><line class="cost-b" x1="28" y1="145" x2="320" y2="38"/><circle cx="185" cy="90" r="7"/></svg><b>${esc(s[4])}</b><p>${esc(s[5])}</p></div>`;
 if(t==="abc")return `<div class="pv-abc"><span class="a">${esc(s[1])}</span><span class="b">${esc(s[2])}</span><span class="c">${esc(s[3])}</span><b>${esc(s[4])}</b><p>${esc(s[5])}</p></div>`;
 if(t==="security"||t==="waf"||t==="signature"||t==="mail"||t==="copyright"||t==="reliability"||t==="compare")return `<div class="pv-compare"><section><b>${esc(s[1])}</b><span>${esc(s[2])}</span></section><i>⇄</i><section class="accent"><b>${esc(s[3])}</b><span>${esc(s[4])}</span></section><p>${esc(s[5])}</p></div>`;
 if(t==="interval")return `<div class="pv-interval"><div><b>${esc(s[1])}</b><i></i><b>${esc(s[3])}</b><i class="active"></i><b>${esc(s[4])}</b><i class="active"></i><b>${esc(s[2])}</b></div><p>${esc(s[5])}</p></div>`;
 if(["truth","table","classes","canvas"].includes(t)){const cells=s.slice(1,-2).flat();return `<div class="pv-matrix pv-${t}">${cells.map((x,i)=>`<span class="${i===cells.length-1?"accent":""}">${esc(x)}</span>`).join("")}<b>${esc(s[s.length-2])}</b><p>${esc(s[s.length-1])}</p></div>`}
 if(["tree","network","decision","attack"].includes(t)){const values=s.slice(1,-2).flat();return `<div class="pv-branch pv-${t}"><strong>${esc(values.shift())}</strong><div>${values.map((x,i)=>`<span class="${i===values.length-1?"accent":""}">${esc(x)}</span>`).join("")}</div><b>${esc(s[s.length-2])}</b><p>${esc(s[s.length-1])}</p></div>`}
 if(["pipeline","precision","circuit","binary","duplex","story","adoption","hybridcloud","bayes"].includes(t)){const values=s.slice(1,-2).flat();return `<div class="pv-process pv-${t}">${values.map((x,i)=>`<section class="${i===values.length-1?"accent":""}"><i>${i+1}</i><b>${esc(x)}</b></section>`).join("")}<strong>${esc(s[s.length-2])}</strong><p>${esc(s[s.length-1])}</p></div>`}
 if(t==="stack")return `<div class="pv-stack"><div class="push">${s[1].map(x=>`<span>${esc(x)}</span>`).join("")}</div><i>⇣ PUSH / POP ⇡</i><div class="pile">${s[2].map((x,i)=>`<span class="${i===0?"accent":""}">${esc(x)}</span>`).join("")}</div><b>${esc(s[3])}</b><p>${esc(s[4])}</p></div>`;
 if(t==="availability")return `<div class="pv-meters">${s[1].map((x,i)=>`<section><b>${esc(x)}</b><i><em style="width:${Number(s[2][i])*100}%"></em></i><strong>${esc(s[2][i])}</strong></section>`).join("")}<h4>${esc(s[3])}</h4><p>${esc(s[4])}</p></div>`;
 if(t==="percent")return `<div class="pv-percent">${s[1].map((x,i)=>`<section><b>${esc(x)}</b><i><em style="width:${i?99.99:98}%"></em></i></section>`).join("")}<strong>${esc(s[2])} ＝ ${esc(s[3])}</strong><p>${esc(s[4])}</p></div>`;
 if(t==="scatter")return `<div class="pv-scatter"><svg viewBox="0 0 360 210"><line x1="35" y1="180" x2="335" y2="180"/><line x1="35" y1="180" x2="35" y2="20"/><line class="trend" x1="55" y1="45" x2="315" y2="160"/>${[[70,48],[95,72],[125,69],[150,96],[178,104],[205,126],[235,120],[260,145],[295,151]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6"/>`).join("")}</svg><strong>${esc(s[3])} → ${esc(s[4])}</strong><p>${esc(s[5])}</p></div>`;
 if(t==="cycle")return `<div class="pv-cycle">${s[1].map((x,i)=>`<span style="--r:${i*90}deg">${esc(x)}</span>`).join("")}<b>${esc(s[2])}</b><strong>${esc(s[3])}</strong></div>`;
 if(["web","architecture","kernel","sdn","loadbalance","mail","hub"].includes(t)){const v=s.slice(1,-1).flat().filter(x=>typeof x==="string");return `<div class="pv-hub"><strong>${esc(v.shift())}</strong><div>${v.map((x,i)=>`<span class="${i===v.length-1?"accent":""}">${esc(x)}</span>`).join("")}</div><p>${esc(s[s.length-1])}</p></div>`}
 if(["locks","state","iac","backlog","kpi","baseline","bpr","disruption","lidar","maas","ribbon"].includes(t)){const v=s.slice(1,-1).flat().filter(x=>typeof x==="string");return `<div class="pv-ribbon">${v.map((x,i)=>`<section><i>${i+1}</i><b>${esc(x)}</b></section>`).join("")}<p>${esc(s[s.length-1])}</p></div>`}
 const values=s.slice(1,-1).flat().filter(x=>typeof x==="string");
 return `<div class="pv-topic pv-${esc(t)}">${chain(values)}<p>${esc(s[s.length-1])}</p></div>`;
}

function detailedFrame(q){
 const chipKey=value=>String(value??"").normalize("NFKC").trim().toLowerCase();
 const titleKey=chipKey(q.title);
 const seen=new Set();
 const terms=(q.diagram||[]).filter(value=>{
   const key=chipKey(value);
   if(!key||key===titleKey||/^正答\s*[アイウエ]$/.test(String(value).trim())||seen.has(key))return false;
   seen.add(key);
   return true;
 }).slice(0,3);
 const memory=q.summary||q.title;
 return `<div class="v-detail">
   <div class="v-detail-main">${renderSpec(q)}</div>
   <aside class="v-detail-side">
    <div class="v-detail-title"><span>この問の図</span><strong>${esc(q.title)}</strong></div>
    <div class="memory-card"><small>一言暗記</small><strong>${esc(memory)}</strong><p>図を隠して、この一文から内容を再現できれば定着です。</p></div>
    <ol>${q.reasoning.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
    <div class="v-detail-cue"><b>図の読み方</b><p>${esc(q.caption)}</p></div>
    <div class="v-detail-trap"><b>注意点</b><p>${esc(q.trap)}</p></div>
    ${terms.length?`<div class="v-detail-chips"><b>関連語</b>${terms.map(x=>`<i>${esc(x)}</i>`).join("")}</div>`:""}
   </aside>
  </div>`;
}
window.renderRichVisual=q=>detailedFrame(q);
