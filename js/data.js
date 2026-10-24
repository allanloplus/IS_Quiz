/*
 * Allan'S IT知識測驗 — 題庫以外的設定資料
 * categories：8 大知識領域，每一類對應一個「台灣科技環島」車站
 * route：環島闖關的站序（台北 → 桃園 → 新竹 → 台中 → 彰化 → 日月潭 → 高雄 → 玉山）
 * iso：ISO/IEC 27001:2022 附錄 A 控制措施（英文為標準原文，中文為常用譯名）
 * 題目本身在 questions-standard.js 與 questions-ai.js
 */
window.AIT_DATA = {
  site: {
    name: "Allan'S IT知識測驗",
    en: "Allan'S IT Knowledge Quest",
    passScore: 90,
    instructor: "Allan顧問",
    assistant: "阿拉蕾"
  },

  categories: [
    {
      id: "net", zh: "網路與基礎架構", en: "Network & Infrastructure", short: "網路", ink: "#2b59c3",
      station: {
        label: "台北101", city: "台北", spot: "台北101", en: "Taipei 101", lon: 121.564, lat: 25.034, guide: "allan",
        story: "台北101高508公尺，2004年落成時是世界第一高樓。大樓內懸掛一顆重達660公噸的風阻尼球，颱風與地震來襲時能抵銷搖晃。",
        link: "網路基礎架構就像101的結構工程：分段、備援、防火牆與監控層層設計，讓企業網路在衝擊下依然屹立不搖。"
      }
    },
    {
      id: "os", zh: "作業系統與伺服器", en: "Operating Systems & Server", short: "系統", ink: "#6b4bb8",
      station: {
        label: "桃園", city: "桃園", spot: "伺服器重鎮", en: "Taoyuan", lon: 121.25, lat: 24.99, guide: "arale",
        story: "桃園是台灣的國門，擁有桃園國際機場，也是電子資訊大廠的生產重鎮。全球大多數的伺服器出自台灣ODM廠商之手，從雲端資料中心到AI伺服器，背後都有台灣製造的身影。",
        link: "伺服器是硬體的身體，作業系統是讓它運轉的靈魂。帳號權限、修補、強化與日誌，是每位ISMS人員都要懂的基本功。"
      }
    },
    {
      id: "cloud", zh: "虛擬化與雲端運算", en: "Virtualization & Cloud Computing", short: "雲端", ink: "#1b84b0",
      station: {
        label: "彰化", city: "彰化", spot: "彰濱資料中心", en: "Changhua Coastal Industrial Park", lon: 120.42, lat: 24.12, guide: "arale",
        story: "Google在彰化彰濱工業區設有大型資料中心，是其在亞洲的重要據點。彰化也有八卦山大佛與鹿港老街，是古蹟與科技並存的城市。",
        link: "「雲端」看似在天上，其實就落地在像彰濱這樣的資料中心裡。理解虛擬化與責任共擔，才知道上雲之後哪些安全責任仍在自己身上。"
      }
    },
    {
      id: "devops", zh: "容器化與DevOps", en: "Containerization & DevOps", short: "DevOps", ink: "#25618f",
      station: {
        label: "高雄港", city: "高雄", spot: "高雄港", en: "Port of Kaohsiung", lon: 120.28, lat: 22.60, guide: "arale",
        story: "高雄港是台灣最大的國際商港，每年有大量貨櫃在此進出。港邊的舊倉庫改造成駁二藝術特區，見證港都從重工業走向文創與科技。",
        link: "標準化的貨櫃讓貨物能在船、火車、卡車之間無縫轉運；軟體世界的Container也是如此，把應用程式與相依套件打包，在任何環境都能一致地執行。"
      }
    },
    {
      id: "dev", zh: "軟體開發與程式設計", en: "Software Development & Programming", short: "開發", ink: "#0d8466",
      station: {
        label: "新竹", city: "新竹", spot: "新竹科學園區", en: "Hsinchu Science Park", lon: 121.00, lat: 24.78, guide: "allan",
        story: "1980年成立的新竹科學園區是台灣第一座科學園區，台積電、聯發科等大廠聚集於此。新竹風大，素有「風城」之稱。",
        link: "每顆晶片都需要韌體與軟體才能發揮作用。安全的程式設計與開發流程，是讓矽晶片「活起來」又不被攻破的關鍵。"
      }
    },
    {
      id: "sec", zh: "資訊安全", en: "Information Security (InfoSec)", short: "資安", ink: "#c8343f",
      station: {
        label: "玉山", city: "玉山", spot: "玉山主峰", en: "Yushan (Jade Mountain)", lon: 120.957, lat: 23.47, guide: "allan",
        story: "玉山主峰海拔3,952公尺，是台灣第一高峰，也是東北亞最高峰，北回歸線就從玉山附近穿過。",
        link: "資訊安全是環島旅程的最後一座高峰。攻頂需要前面七站累積的所有知識：網路、系統、開發、資料、雲端、維運與DevOps，缺一不可。"
      }
    },
    {
      id: "db", zh: "資料庫與大數據", en: "Database & Big Data", short: "資料", ink: "#b25a24",
      station: {
        label: "台中", city: "台中", spot: "中部科學園區", en: "Central Taiwan Science Park", lon: 120.62, lat: 24.21, guide: "arale",
        story: "台中是台灣精密機械與智慧製造的重鎮，中部科學園區也聚集了半導體與光電產業。台中還是珍珠奶茶的發源地之一。",
        link: "智慧工廠的機台每秒都在產生感測資料。如何儲存、治理、分析與保護這些資料，就是資料庫與大數據的課題。"
      }
    },
    {
      id: "itsm", zh: "IT服務管理與維運", en: "ITSM / Helpdesk", short: "維運", ink: "#b8336a",
      station: {
        label: "日月潭", city: "南投", spot: "日月潭", en: "Sun Moon Lake", lon: 120.91, lat: 23.86, guide: "allan",
        story: "日月潭以拉魯島為界，北半湖形如日輪、南半湖形如月鉤，因而得名。周邊的抽蓄水力電廠在離峰時抽水、尖峰時發電，日夜調節電網。",
        link: "IT服務管理就像日月潭的電廠：7×24日夜不停地維持服務穩定，做好事件、問題、變更與容量管理。"
      }
    }
  ],

  route: ["net", "os", "dev", "db", "cloud", "itsm", "devops", "sec"],

  goals: ["很厲害的資安人員", "很厲害的資安顧問", "很厲害的資安稽核員"],

  audiences: [
    { zh: "甲方 ISMS 從業人員", en: "In-house ISMS practitioners", note: "企業內部負責推動、維運 ISMS 的資安與 IT 同仁" },
    { zh: "ISMS 資安顧問", en: "ISMS consultants", note: "輔導客戶建置制度，需要聽得懂 IT 人員的語言" },
    { zh: "ISMS 稽核員", en: "ISMS auditors", note: "內稽、外稽或驗證稽核，需要判斷技術證據是否到位" },
    { zh: "想學資安 IT 基本功的你", en: "Curious learners", note: "學生、轉職者，或任何對資安有興趣的人" }
  ],

  snacks: [
    ["🧋", "珍珠奶茶"], ["🍗", "雞排"], ["🍳", "蚵仔煎"], ["🌭", "大腸包小腸"], ["🍠", "地瓜球"],
    ["🍢", "鹹酥雞"], ["🥟", "水煎包"], ["🫓", "蔥抓餅"], ["🍧", "芒果冰"], ["🍮", "豆花"],
    ["🥙", "刈包"], ["🍚", "滷肉飯"], ["🌽", "烤玉米"], ["🥞", "車輪餅"], ["🍡", "糖葫蘆"]
  ],

  iso: {
    "5.3": ["Segregation of duties", "職務區隔"],
    "5.7": ["Threat intelligence", "威脅情資"],
    "5.8": ["Information security in project management", "專案管理之資訊安全"],
    "5.9": ["Inventory of information and other associated assets", "資訊及其他相關聯資產之清冊"],
    "5.12": ["Classification of information", "資訊之分類分級"],
    "5.14": ["Information transfer", "資訊傳送"],
    "5.15": ["Access control", "存取控制"],
    "5.16": ["Identity management", "身分管理"],
    "5.17": ["Authentication information", "鑑別資訊"],
    "5.18": ["Access rights", "存取權限"],
    "5.19": ["Information security in supplier relationships", "供應者關係中之資訊安全"],
    "5.20": ["Addressing information security within supplier agreements", "於供應者協議中闡明資訊安全"],
    "5.21": ["Managing information security in the ICT supply chain", "管理ICT供應鏈中之資訊安全"],
    "5.22": ["Monitoring, review and change management of supplier services", "供應者服務之監視、審查及變更管理"],
    "5.23": ["Information security for use of cloud services", "使用雲端服務之資訊安全"],
    "5.24": ["Information security incident management planning and preparation", "資訊安全事故管理規劃及準備"],
    "5.26": ["Response to information security incidents", "資訊安全事故之回應"],
    "5.27": ["Learning from information security incidents", "由資訊安全事故中學習"],
    "5.29": ["Information security during disruption", "中斷期間之資訊安全"],
    "5.30": ["ICT readiness for business continuity", "營運持續之ICT備妥性"],
    "5.31": ["Legal, statutory, regulatory and contractual requirements", "法律、法令、法規及契約要求事項"],
    "5.34": ["Privacy and protection of PII", "隱私及個人可識別資訊保護"],
    "6.1": ["Screening", "篩選"],
    "6.3": ["Information security awareness, education and training", "資訊安全認知、教育及訓練"],
    "6.7": ["Remote working", "遠端工作"],
    "7.8": ["Equipment siting and protection", "設備安置及保護"],
    "7.14": ["Secure disposal or re-use of equipment", "設備之安全汰除或重新使用"],
    "8.1": ["User endpoint devices", "使用者端點裝置"],
    "8.2": ["Privileged access rights", "特殊存取權限"],
    "8.3": ["Information access restriction", "資訊存取限制"],
    "8.4": ["Access to source code", "對原始碼之存取"],
    "8.5": ["Secure authentication", "安全鑑別"],
    "8.6": ["Capacity management", "容量管理"],
    "8.7": ["Protection against malware", "防範惡意軟體"],
    "8.8": ["Management of technical vulnerabilities", "技術脆弱性管理"],
    "8.9": ["Configuration management", "組態管理"],
    "8.10": ["Information deletion", "資訊刪除"],
    "8.11": ["Data masking", "資料遮蔽"],
    "8.12": ["Data leakage prevention", "資料洩露預防"],
    "8.13": ["Information backup", "資訊備份"],
    "8.14": ["Redundancy of information processing facilities", "資訊處理設施之備援"],
    "8.15": ["Logging", "存錄"],
    "8.16": ["Monitoring activities", "監視活動"],
    "8.17": ["Clock synchronization", "鐘訊同步"],
    "8.18": ["Use of privileged utility programs", "具特殊權限公用程式之使用"],
    "8.19": ["Installation of software on operational systems", "運作中系統之軟體安裝"],
    "8.20": ["Networks security", "網路安全"],
    "8.21": ["Security of network services", "網路服務之安全"],
    "8.22": ["Segregation of networks", "網路區隔"],
    "8.23": ["Web filtering", "網頁過濾"],
    "8.24": ["Use of cryptography", "密碼技術之使用"],
    "8.25": ["Secure development life cycle", "安全開發生命週期"],
    "8.26": ["Application security requirements", "應用程式安全要求事項"],
    "8.28": ["Secure coding", "安全程式設計"],
    "8.29": ["Security testing in development and acceptance", "開發及驗收中之安全測試"],
    "8.31": ["Separation of development, test and production environments", "開發、測試及生產環境之區隔"],
    "8.32": ["Change management", "變更管理"],
    "8.33": ["Test information", "測試資訊"]
  },

  questions: []
};
