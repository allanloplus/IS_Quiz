/*
 * 標準 30 題（STD-01 ～ STD-30）
 * 來源：「IS專業30題」PDF。原題為英文、PDF 為機器翻譯；此處還原英文題目，並重新撰寫專業繁體中文。
 * PDF 未附解答，正確答案與解說由題意與業界通行觀念判定。
 * 欄位：q/o 英文題目與選項；qz/oz 繁體中文；a 正確選項索引（0 起算）；
 *       ez/ee 中英文解說；iso ISO/IEC 27001:2022 附錄 A 對應；tip Allan 顧問稽核小叮嚀；lv 難度 1–3
 */
window.AIT_DATA.questions.push(
  {
    id: "STD-01", src: "std", cat: "db", lv: 2,
    q: "An IT services company is implementing new database management technologies. What would most likely be their primary choice?",
    qz: "一家 IT 服務公司正在導入新的資料庫管理技術，下列何者最可能是他們的首選？",
    o: [
      "Kubernetes for orchestrating containerized database applications",
      "MongoDB as a scalable NoSQL database for handling diverse datasets",
      "SQL Server Integration Services (SSIS) for comprehensive data integration and transformation",
      "Apache Cassandra for high availability and scalability in large-scale database environments"
    ],
    oz: [
      "Kubernetes：用於編排（調度）容器化的資料庫應用程式",
      "MongoDB：具延展性的 NoSQL 資料庫，可處理多樣化的資料集",
      "SQL Server Integration Services（SSIS）：用於全面的資料整合與轉換",
      "Apache Cassandra：在大規模資料庫環境中提供高可用性與延展性"
    ],
    a: 1,
    ez: "題目問的是「資料庫管理技術」本身，關鍵在分辨各選項的技術屬性。Kubernetes 是容器編排平台，負責部署與調度容器，本身不是資料庫；SSIS 是 ETL（擷取、轉換、載入）工具，處理資料整合，也不是資料庫；Apache Cassandra 雖然是資料庫，但屬於寬欄式（wide-column）NoSQL，主要用在超大規模、寫入密集、跨資料中心的特殊情境。MongoDB 是通用型的文件導向 NoSQL 資料庫，結構彈性、可水平擴充，最符合 IT 服務公司面對各類客戶與多樣化資料的一般需求，因此是最可能的首選。",
    ee: "The question is about a database management technology itself. Kubernetes is a container orchestration platform, not a database. SSIS is an ETL tool for data integration. Cassandra is a database, but a wide-column store aimed at massive, write-heavy, multi-datacenter workloads, which makes it a specialized choice. MongoDB is a general-purpose document database with a flexible schema and horizontal scalability, so it is the most likely primary choice for an IT services company handling diverse client data.",
    iso: ["8.9", "8.13"],
    tip: "看到客戶導入 NoSQL，別忘了確認：預設帳密是否已修改、是否直接暴露在網際網路上（2017 年曾有大量對外開放的 MongoDB 遭清空勒索）、存取控制與備份機制是否到位。"
  },
  {
    id: "STD-02", src: "std", cat: "sec", lv: 1,
    q: "When developing a cybersecurity strategy, which emerging concept emphasizes continuous authentication and real-time monitoring of user and device behavior?",
    qz: "在制定資安策略時，哪一個新興概念強調對使用者與裝置行為進行「持續驗證」與「即時監控」？",
    o: ["Cyber resilience", "Deception technology", "Continuous authentication", "Threat hunting"],
    oz: ["網路韌性（Cyber Resilience）", "欺敵技術（Deception Technology）", "持續性身分驗證（Continuous Authentication）", "威脅獵捕（Threat Hunting）"],
    a: 2,
    ez: "持續性身分驗證是零信任（Zero Trust）架構「永不信任、持續驗證」的核心：不只在登入時驗證一次，而是在整個連線期間持續依據行為特徵（打字節奏、滑鼠軌跡）、裝置狀態、地理位置與存取情境評估風險，異常時要求重新驗證或中斷連線。網路韌性是指組織承受攻擊並快速復原的能力；欺敵技術是佈署誘餌（如蜜罐、假帳號）引誘攻擊者現形；威脅獵捕是由分析人員主動搜尋已潛伏的威脅。三者都重要，但都不是「持續驗證使用者與裝置」的概念。",
    ee: "Continuous authentication is a core idea of Zero Trust (never trust, always verify). Identity is re-evaluated throughout the session using behavioral signals, device posture, location and context, not only at login. Cyber resilience is the ability to withstand and recover from attacks. Deception technology uses decoys such as honeypots to expose attackers. Threat hunting is analysts proactively searching for hidden threats.",
    iso: ["8.5", "8.16"],
    tip: "可參考 NIST SP 800-207 零信任架構。稽核時可詢問：高風險系統是否依情境（裝置、地點、時間）進行條件式存取與重新驗證？"
  },
  {
    id: "STD-03", src: "std", cat: "net", lv: 2,
    q: "A data processing company is evaluating options for secure data transmission. Which protocol provides end-to-end encryption and Perfect Forward Secrecy (PFS) for secure communications?",
    qz: "一家資料處理公司正在評估安全的資料傳輸方案。哪一種通訊協定可提供端對端加密與完全前向保密（PFS），以確保通訊安全？",
    o: ["IPsec (Internet Protocol Security)", "SSH (Secure Shell)", "TLS (Transport Layer Security)", "SNMPv3 (Simple Network Management Protocol version 3)"],
    oz: ["IPsec（網際網路安全協定）", "SSH（安全殼層協定）", "TLS（傳輸層安全協定）", "SNMPv3（簡易網路管理協定第 3 版）"],
    a: 2,
    ez: "TLS 是應用程式之間安全通訊的標準協定，HTTPS、API、郵件傳輸都靠它。TLS 1.3 強制使用暫時性金鑰交換（ECDHE），每次連線都產生新的工作階段金鑰；即使伺服器私鑰日後外洩，過去被側錄的流量也無法解密，這就是完全前向保密（PFS）。IPsec 主要用於網路對網路的 VPN 通道，PFS 是 IKE 的選配設定；SSH 雖然也以 Diffie-Hellman 交換金鑰，但用途是遠端管理與檔案傳輸；SNMPv3 提供網管訊息的鑑別與加密，不是一般的資料傳輸協定。綜合「一般安全資料傳輸＋PFS」，TLS 是最佳答案。",
    ee: "TLS is the standard protocol for securing application communications such as HTTPS, APIs and email transport. TLS 1.3 requires ephemeral (EC)DHE key exchange, so every session gets fresh keys and traffic recorded earlier stays safe even if the server's private key leaks later. That property is PFS. IPsec mainly builds network-to-network VPN tunnels and treats PFS as an optional IKE setting. SSH uses Diffie-Hellman too, but it is built for remote administration and file transfer. SNMPv3 secures network management messages and is not a general data transport.",
    iso: ["8.24", "5.14"],
    tip: "稽核重點：對外服務是否僅允許 TLS 1.2 以上，並停用 SSL 3.0、TLS 1.0／1.1 與弱加密套件？可用 SSL Labs 等工具的檢測結果作為佐證。"
  },
  {
    id: "STD-04", src: "std", cat: "devops", lv: 1,
    q: "In software development, what is the primary focus of the term 'DevOps'?",
    qz: "在軟體開發領域中，「DevOps」一詞主要關注的是什麼？",
    o: [
      "Implementing robust software testing protocols to ensure code quality and reliability",
      "Integrating development and operations teams to improve collaboration and productivity",
      "Enhancing the security of software applications through continuous monitoring",
      "Streamlining the user interface design process for a better customer experience"
    ],
    oz: [
      "實施嚴謹的軟體測試規範，以確保程式碼品質與可靠性",
      "整合開發（Dev）與維運（Ops）團隊，以提升協作效率與生產力",
      "透過持續監控來強化軟體應用程式的安全性",
      "簡化使用者介面設計流程，以提供更好的客戶體驗"
    ],
    a: 1,
    ez: "DevOps 是 Development（開發）與 Operations（維運）的組合，是一種結合文化、實務與工具的方法：打破開發與維運之間的部門牆，透過持續整合／持續交付（CI/CD）、自動化、基礎架構即程式碼（IaC）與快速回饋，讓軟體能更快、更穩定地交付。嚴謹測試屬於品質保證（QA），是 DevOps 流程的一環而非核心；以持續監控強化安全比較接近 DevSecOps 的延伸；UI 設計則屬於使用者體驗（UX）領域。",
    ee: "DevOps combines Development and Operations. It is a culture and a set of practices and tools that breaks down silos between the two teams, using CI/CD, automation, Infrastructure as Code and fast feedback to deliver software quickly and reliably. Testing is part of the pipeline but not its core idea. Security monitoring leans toward DevSecOps. UI design belongs to UX.",
    iso: ["8.25", "8.32"],
    tip: "DevOps 追求快速部署，稽核時要確認「快」不等於「跳過變更管理」：自動化管線中是否仍保有審查、測試與核准紀錄？"
  },
  {
    id: "STD-05", src: "std", cat: "sec", lv: 3,
    q: "When implementing a Security Orchestration, Automation and Response (SOAR) platform in a large IT consulting environment, what is the most significant challenge, and how can it be addressed?",
    qz: "在大型 IT 顧問公司的環境中導入資安協同作業、自動化與回應（SOAR）平台時，最主要的挑戰是什麼？又該如何解決？",
    o: [
      "Integration complexity with existing tools; addressed by using APIs and custom scripts",
      "High operational costs; mitigated through phased deployment",
      "User resistance; overcome through extensive training and change management",
      "Data overload; managed by adopting advanced machine learning algorithms"
    ],
    oz: [
      "與現有工具整合的複雜度；透過 API 與自訂腳本解決",
      "營運成本高；透過分階段部署來降低",
      "使用者抗拒；透過大量訓練與變革管理來克服",
      "資料過載；採用先進的機器學習演算法來管理"
    ],
    a: 0,
    ez: "SOAR 的價值在於把 SIEM、EDR、防火牆、威脅情資平台、工單系統等工具串接起來，以劇本（Playbook）自動執行調查與回應。大型環境中工具種類多、廠牌各異、版本不一，「整合」因此成為最大挑戰；解法是善用各工具的 API 與廠商提供的連接器（Connector），不足之處再以自訂腳本補強。成本、使用者抗拒與資料量雖然也是導入時會遇到的問題，但都不是 SOAR 特有的核心挑戰。",
    ee: "SOAR delivers value by connecting SIEM, EDR, firewalls, threat intelligence and ticketing systems, then running playbooks to automate investigation and response. Large environments have many heterogeneous tools, so integration is the main hurdle. It is solved with APIs, vendor connectors and custom scripts. Cost, user resistance and data volume are common project issues, but they are not the defining challenge of SOAR.",
    iso: ["5.24", "5.26", "8.16"],
    tip: "導入 SOAR 前，先確認事故應變程序已文件化且成熟。把混亂的流程自動化，只會更快地產生混亂。"
  },
  {
    id: "STD-06", src: "std", cat: "cloud", lv: 2,
    q: "An organization is considering adopting a cloud-based email service. Which security control is most important to ensure the confidentiality and integrity of email communications?",
    qz: "某組織正考慮採用雲端電子郵件服務。為確保電子郵件通訊的機密性與完整性，下列哪一項安全控制措施最為重要？",
    o: ["Email filtering and anti-spam measures", "Strong encryption for emails at rest and in transit", "Multi-factor authentication (MFA) for email access", "Regular backups of email data"],
    oz: ["郵件過濾與反垃圾郵件機制", "對靜態儲存與傳輸中的郵件進行高強度加密", "郵件存取採用多因子驗證（MFA）", "定期備份郵件資料"],
    a: 1,
    ez: "題目的關鍵字是「通訊內容」的機密性（Confidentiality）與完整性（Integrity）。對傳輸中（如 TLS）與靜態儲存的郵件加密，搭配 S/MIME 或 PGP 的數位簽章，才能直接確保內容不被窺看、不被竄改。MFA 保護的是「帳號存取」，對雲端郵件同樣非常重要，但它不直接保護郵件內容；郵件過濾處理垃圾信與惡意郵件；備份確保的是可用性（Availability）。",
    ee: "The keywords are confidentiality and integrity of the communications. Encrypting email in transit (TLS) and at rest, plus S/MIME or PGP signing, directly protects content from disclosure and tampering. MFA protects account access and is very important for cloud mail, but it does not protect the message content itself. Filtering handles spam and malicious mail. Backups address availability.",
    iso: ["8.24", "5.14", "5.23"],
    tip: "實務上 MFA 與加密都要做。稽核時也可檢查郵件網域是否設定 SPF、DKIM、DMARC，以降低寄件者遭偽冒的風險。"
  },
  {
    id: "STD-07", src: "std", cat: "net", lv: 1,
    q: "A network administrator at a data processing company detects an unusual spike in outbound traffic. What type of attack might this indicate?",
    qz: "一家資料處理公司的網路管理員偵測到「對外（outbound）流量」異常暴增，這可能代表哪一種攻擊？",
    o: ["DDoS attack", "Phishing", "Data exfiltration", "Malware infection"],
    oz: ["分散式阻斷服務（DDoS）攻擊", "網路釣魚", "資料外洩（資料遭竊取外傳）", "惡意軟體感染"],
    a: 2,
    ez: "「對外」流量異常暴增，代表大量資料正從內部往外送，是資料外洩（Data Exfiltration）的典型徵兆：攻擊者入侵後，把資料打包傳送到外部的 C2 伺服器或雲端空間。若公司遭受 DDoS，看到的應是「對內（inbound）」流量暴增；網路釣魚是以郵件或訊息進行的社交工程手法，不會直接表現為流量型態；惡意軟體感染可能是根本原因，但「對外流量暴增」這個現象最直接指向資料外洩。補充：若內部主機被當成殭屍網路的一員對外發動攻擊，也會出現對外流量，因此仍須分析目的地、協定與時間點。",
    ee: "A spike in outbound traffic means large volumes of data are leaving the network, a classic sign of exfiltration to an attacker's C2 server or cloud storage. A DDoS against the company would show up as an inbound spike. Phishing is a social engineering vector, not a traffic pattern. Malware may be the root cause, but the observed symptom points most directly to exfiltration. Hosts recruited into a botnet can also generate outbound traffic, so analysts should check destinations, protocols and timing.",
    iso: ["8.16", "8.12", "8.20"],
    tip: "建立網路流量基準線（Baseline）是偵測異常的前提。稽核時可詢問：監控機制是否會針對非上班時段、大量上傳至陌生目的地的流量發出告警？"
  },
  {
    id: "STD-08", src: "std", cat: "db", lv: 1,
    q: "In IT consulting, what is the primary role of artificial intelligence (AI) and machine learning (ML) technologies?",
    qz: "在 IT 顧問服務中，人工智慧（AI）與機器學習（ML）技術的主要角色是什麼？",
    o: [
      "Enhancing security protocols through AI-driven data encryption and threat detection",
      "Streamlining financial operations through AI-based auditing and anomaly detection",
      "Conducting automated data analysis and developing intelligent systems for advanced problem-solving",
      "Optimizing customer engagement strategies using ML algorithms in targeted email marketing campaigns"
    ],
    oz: [
      "透過 AI 驅動的資料加密與威脅偵測，強化安全機制",
      "透過以 AI 為基礎的稽核與異常偵測，簡化財務作業",
      "進行自動化資料分析，並開發智慧系統以解決進階問題",
      "在精準電子郵件行銷活動中運用 ML 演算法，最佳化客戶互動策略"
    ],
    a: 2,
    ez: "AI／ML 的本質是「從資料中學習模式」，因此其核心角色是自動化資料分析，並據以建構能預測、分類、推薦與決策的智慧系統。其他選項都只是 AI 在單一領域（資安、財務、行銷）的應用案例，範圍過窄。另外要注意：「AI 驅動的資料加密」並不是正確概念。加密靠的是數學演算法（如 AES），AI 可以協助威脅偵測，但不負責加密。",
    ee: "AI and ML learn patterns from data, so their core role is automated data analysis and building intelligent systems that predict, classify, recommend and decide. The other options are narrow applications in a single domain (security, finance, marketing). Note that 'AI-driven encryption' is not a real concept: encryption relies on mathematical algorithms such as AES.",
    iso: [],
    tip: "組織若導入 AI，可參考 ISO/IEC 42001:2023（AI 管理系統）。稽核時留意：餵給 AI 的資料是否含個資或機密？有沒有資料使用與輸出審查的規範？"
  },
  {
    id: "STD-09", src: "std", cat: "dev", lv: 1,
    q: "A software development company is enhancing its SDLC. Which methodology would they most likely focus on to achieve flexibility and iterative development?",
    qz: "一家軟體開發公司正在強化其軟體開發生命週期（SDLC）。若要達到彈性與迭代式開發，他們最可能採用哪一種方法論？",
    o: ["Waterfall", "Six Sigma", "Agile", "Lean"],
    oz: ["瀑布式開發（Waterfall）", "六標準差（Six Sigma）", "敏捷開發（Agile）", "精實（Lean）"],
    a: 2,
    ez: "敏捷開發（Agile）以短週期的迭代（Sprint）持續交付可用的軟體，擁抱需求變更、重視團隊協作與客戶回饋，代表框架有 Scrum、Kanban。瀑布式開發依需求、設計、實作、測試、部署循序進行，前一階段完成才進入下一階段，彈性較低；六標準差是以 DMAIC 降低缺陷的品質管理方法；精實源自豐田生產系統，重點在消除浪費，雖然影響了敏捷思維，但本身不是迭代式的軟體開發方法論。（原 PDF 的機器翻譯把 Lean 譯成「瘦」，正確術語應為「精實」。）",
    ee: "Agile delivers working software in short iterations (sprints), welcomes changing requirements and values collaboration and customer feedback. Scrum and Kanban are common frameworks. Waterfall runs phases sequentially and is less flexible. Six Sigma is a quality method (DMAIC) for reducing defects. Lean comes from the Toyota Production System and focuses on eliminating waste. It influenced Agile but is not an iterative SDLC methodology itself.",
    iso: ["8.25", "5.8"],
    tip: "敏捷不代表不用文件。稽核時可確認：每個 Sprint 是否納入資安需求（如安全使用者故事），完成定義（Definition of Done）中是否包含安全檢查？"
  },
  {
    id: "STD-10", src: "std", cat: "sec", lv: 2,
    q: "Which cryptographic technique, often used in blockchain, allows parties to prove the authenticity and integrity of data without revealing the data itself?",
    qz: "區塊鏈中常用的哪一種密碼技術，能讓參與方在「不揭露資料本身」的情況下，證明資料的真實性與完整性？",
    o: ["Zero-knowledge proofs (ZKP)", "Quantum key distribution (QKD)", "Post-quantum cryptography (PQC)", "Lattice-based cryptography"],
    oz: ["零知識證明（ZKP）", "量子金鑰分發（QKD）", "後量子密碼學（PQC）", "晶格密碼學（Lattice-based Cryptography）"],
    a: 0,
    ez: "零知識證明讓「證明者」向「驗證者」證明某件事為真，卻不透露任何額外資訊，例如證明「我的年齡大於 18 歲」而不必揭露生日。區塊鏈上的 zk-SNARKs（如 Zcash 的隱私交易）、以太坊的 zk-Rollup 都是應用實例。量子金鑰分發是利用量子物理特性安全地傳遞金鑰；後量子密碼學是能抵抗量子電腦攻擊的演算法家族；晶格密碼學則是後量子密碼學中的一大類。它們都不是「不揭露資料而能證明真實性」的技術。",
    ee: "A zero-knowledge proof lets a prover convince a verifier that a statement is true without revealing anything else, for example proving age over 18 without disclosing a birth date. zk-SNARKs (Zcash) and zk-rollups (Ethereum) are blockchain examples. QKD uses quantum physics to distribute keys. PQC is the family of algorithms resistant to quantum attacks, and lattice-based cryptography is one branch of PQC.",
    iso: ["8.24", "5.34"],
    tip: "零知識證明屬於隱私強化技術（PETs），呼應個資保護的「資料最小化」原則，輔導 PIMS 時可作為延伸案例。"
  },
  {
    id: "STD-11", src: "std", cat: "net", lv: 2,
    q: "An IT services company is implementing an intrusion detection system (IDS). Given the complexity of its network architecture, which IDS deployment strategy would provide the best balance of security and performance?",
    qz: "一家 IT 服務公司正在建置入侵偵測系統（IDS）。考量其網路架構的複雜度，哪一種 IDS 部署策略能在安全性與效能之間取得最佳平衡？",
    o: ["Host-based IDS on critical endpoints", "Network-based IDS at the perimeter", "A hybrid IDS combining host-based and network-based systems", "Application-based IDS on business-critical applications"],
    oz: ["僅在關鍵端點部署主機型 IDS（HIDS）", "僅在網路邊界部署網路型 IDS（NIDS）", "結合主機型與網路型的混合式 IDS", "僅在業務關鍵應用程式上部署應用程式型 IDS"],
    a: 2,
    ez: "主機型 IDS（HIDS）能看見主機內部的檔案完整性、日誌與程序行為，但只保護有安裝的主機，且會消耗主機資源；網路型 IDS（NIDS）能監看網段流量，但對加密流量與主機內部行為是盲點，只放在邊界還會漏掉內部的橫向移動；應用程式型 IDS 的範圍更窄。面對複雜架構，混合式部署在關鍵網段放 NIDS、在重要伺服器放 HIDS，兼顧可視性與效能，是縱深防禦的典型做法。",
    ee: "A HIDS sees file integrity, logs and process activity on the host, but only on hosts where it is installed, and it consumes host resources. A NIDS watches network traffic but is blind to encrypted payloads and host internals, and a perimeter-only NIDS misses lateral movement. Application-based IDS is narrower still. In a complex network, a hybrid deployment (NIDS on key segments, HIDS on critical servers) balances visibility and performance.",
    iso: ["8.16", "8.20"],
    tip: "IDS 只負責「偵測」，誰在看告警、多久內處理才是重點。稽核時請索取告警處理紀錄，確認真的有人回應，而不是裝了就算。"
  },
  {
    id: "STD-12", src: "std", cat: "sec", lv: 3,
    q: "In IT services, particularly in cloud computing environments, which advanced authentication mechanism would provide the strongest defense against credential stuffing and phishing attacks, considering both compatibility and applicability?",
    qz: "在 IT 服務（特別是雲端運算環境）中，同時考量相容性與適用性，哪一種進階身分驗證機制最能有效抵禦撞庫攻擊（Credential Stuffing）與網路釣魚？",
    o: ["Two-factor authentication using biometrics", "Single sign-on (SSO) using OAuth", "Multi-factor authentication including time-based one-time passwords (TOTP)", "Passwordless authentication using WebAuthn"],
    oz: ["使用生物辨識的雙因子驗證", "使用 OAuth 的單一登入（SSO）", "包含時間型一次性密碼（TOTP）的多因子驗證", "使用 WebAuthn 的無密碼驗證"],
    a: 3,
    ez: "WebAuthn（FIDO2 的核心標準）以公開金鑰密碼學取代密碼：私鑰保存在使用者的裝置或安全金鑰中，並與網站網域綁定。沒有密碼可供竊取，撞庫攻擊自然失效；釣魚網站的網域不同，裝置不會替它簽章，因此能抵抗釣魚，屬於「抗釣魚 MFA」。TOTP 驗證碼仍可能在即時中間人（AiTM）釣魚中被騙走；OAuth 本質上是授權框架，若 SSO 背後仍靠密碼登入，依然有撞庫與釣魚風險；生物辨識的效果取決於實作方式，跨平台相容性也較受限。WebAuthn 是 W3C 標準，主流瀏覽器與作業系統（例如 Passkey）皆支援，相容性與適用性俱佳。",
    ee: "WebAuthn, the core of FIDO2, replaces passwords with public-key cryptography. The private key stays on the user's device or security key and is bound to the website's origin. With no password to steal, credential stuffing fails, and a phishing site on a different domain cannot get a valid signature, so it is phishing-resistant. TOTP codes can still be stolen by real-time adversary-in-the-middle phishing. OAuth is an authorization framework, and password-based SSO remains exposed. Biometrics depend on implementation and have weaker cross-platform compatibility. WebAuthn is a W3C standard supported by all major browsers and platforms (passkeys).",
    iso: ["8.5", "5.17"],
    tip: "美國 CISA 與 NIST SP 800-63B 都建議高權限帳號採用「抗釣魚 MFA」。稽核時可確認管理者帳號是否已從簡訊或 TOTP 升級為 FIDO2／Passkey。"
  },
  {
    id: "STD-13", src: "std", cat: "dev", lv: 3,
    q: "In secure software development, which technique is crucial for identifying vulnerabilities related to race conditions and memory leaks?",
    qz: "在安全軟體開發中，哪一種技術對於找出與「競爭條件（Race Condition）」和「記憶體洩漏（Memory Leak）」相關的漏洞最為關鍵？",
    o: ["Static Application Security Testing (SAST)", "Dynamic Application Security Testing (DAST)", "Interactive Application Security Testing (IAST)", "Software Composition Analysis (SCA)"],
    oz: ["靜態應用程式安全測試（SAST）", "動態應用程式安全測試（DAST）", "互動式應用程式安全測試（IAST）", "軟體組成分析（SCA）"],
    a: 2,
    ez: "競爭條件與記憶體洩漏都和「執行期間」的時序、併發與實際記憶體配置有關，往往只有在程式真正執行時才會顯現。IAST 在執行中的應用程式內部植入代理程式（Agent）或插樁（Instrumentation），一邊執行測試，一邊觀察程式碼路徑、資料流、執行緒與記憶體使用，還能直接指出有問題的程式碼行數。SAST 不執行程式、只分析原始碼，能抓到部分模式，但對時序相依的問題容易漏報或誤報；DAST 從外部以黑箱方式測試，看不到程式內部的記憶體狀態；SCA 則是檢查第三方元件的已知漏洞（CVE）與授權條款。實務上會多種工具併用，C/C++ 專案也常搭配 AddressSanitizer、ThreadSanitizer 等動態分析工具。",
    ee: "Race conditions and memory leaks depend on runtime timing, concurrency and real memory allocation, so they usually appear only while the program runs. IAST instruments the running application from inside and observes code paths, data flow, threads and memory during testing, pointing to the exact line of code. SAST analyzes source code without running it and struggles with timing-dependent issues. DAST tests from the outside as a black box and cannot see internal memory. SCA checks third-party components for known CVEs and licenses. In practice teams combine tools, and C/C++ projects add sanitizers such as AddressSanitizer and ThreadSanitizer.",
    iso: ["8.29", "8.28"],
    tip: "稽核 A.8.29 時，可請開發單位說明：哪些測試在 CI 管線中自動執行？上線前的安全測試報告與缺失追蹤紀錄放在哪裡？"
  },
  {
    id: "STD-14", src: "std", cat: "sec", lv: 3,
    q: "When implementing an enterprise-level Security Information and Event Management (SIEM) system, what is the primary challenge in correlating events from diverse sources in real time, and how can it be effectively addressed?",
    qz: "在建置企業級資安資訊與事件管理（SIEM）系統時，即時關聯分析來自不同來源的事件，最主要的挑戰是什麼？又該如何有效解決？",
    o: [
      "Data volume; addressed through big data analytics platforms",
      "Event normalization; addressed using advanced machine learning algorithms for data parsing",
      "Network latency; mitigated by distributed SIEM collectors",
      "Alert fatigue; managed by implementing AI-based prioritization algorithms"
    ],
    oz: [
      "資料量龐大；透過大數據分析平台解決",
      "事件正規化；運用先進的機器學習演算法進行資料解析",
      "網路延遲；透過分散式 SIEM 收集器緩解",
      "告警疲勞；導入以 AI 為基礎的優先排序演算法來管理"
    ],
    a: 1,
    ez: "關聯分析（Correlation）的前提，是資料「說同一種語言」。防火牆、AD、Linux syslog、雲端服務、應用程式日誌的格式、欄位名稱與時間格式各不相同，必須先解析（Parsing）並正規化（Normalization）成共同結構（如 CEF、Elastic Common Schema、OCSF），才能跨來源比對同一個 IP、帳號或事件；機器學習可協助解析未知或多變的格式。資料量是規模與成本問題；告警疲勞是關聯之後的下游問題；網路延遲的影響相對較小。另外別忘了，各來源的時間必須一致（NTP 校時），否則關聯結果會錯亂。",
    ee: "Correlation requires all data to speak the same language. Firewalls, Active Directory, Linux syslog, cloud services and applications use different formats, field names and timestamps. Logs must be parsed and normalized into a common schema (CEF, Elastic Common Schema, OCSF) before events about the same IP or account can be linked, and ML can help parse unknown or changing formats. Volume is a scale and cost issue, alert fatigue is downstream of correlation, and latency matters less. Clock synchronization (NTP) is also essential.",
    iso: ["8.15", "8.16", "8.17"],
    tip: "稽核 SIEM 時，可抽查一筆告警，往回追溯原始日誌，驗證時間戳記是否一致、欄位是否正確解析，並確認日誌保存期限符合法規要求。"
  },
  {
    id: "STD-15", src: "std", cat: "sec", lv: 2,
    q: "Considering advances in quantum computing, which post-quantum cryptography approach should an IT consulting firm consider adopting for future-proof encryption of sensitive data?",
    qz: "考量量子運算的發展，IT 顧問公司應考慮採用哪一種後量子密碼學方法，讓敏感資料的加密經得起未來的考驗？",
    o: ["Elliptic Curve Cryptography (ECC)", "Lattice-based cryptography", "RSA-4096 encryption", "Symmetric-key algorithms with increased key sizes"],
    oz: ["橢圓曲線密碼學（ECC）", "晶格密碼學（Lattice-based Cryptography）", "RSA-4096 位元加密", "加大金鑰長度的對稱式金鑰演算法"],
    a: 1,
    ez: "量子電腦上的 Shor 演算法能有效破解 RSA 與 ECC 所依賴的數學難題（質因數分解、離散對數），金鑰再長也只是延緩，因此 RSA-4096 與 ECC 都不具抗量子能力。晶格密碼學是後量子密碼學的主流：NIST 於 2024 年 8 月發布的 FIPS 203（ML-KEM，源自 CRYSTALS-Kyber）與 FIPS 204（ML-DSA，源自 CRYSTALS-Dilithium）都以晶格為基礎。加大金鑰的對稱式演算法（如 AES-256）面對 Grover 演算法仍相當安全，也值得採用，但它無法取代公開金鑰的金鑰交換與數位簽章，因此不算是後量子密碼學的「方法」。",
    ee: "Shor's algorithm on a quantum computer breaks the math behind RSA and ECC (factoring and discrete logarithms), and longer keys only delay that. Lattice-based cryptography is the leading PQC approach: NIST's FIPS 203 (ML-KEM, from CRYSTALS-Kyber) and FIPS 204 (ML-DSA, from CRYSTALS-Dilithium), published in August 2024, are both lattice-based. Larger symmetric keys such as AES-256 remain strong against Grover's algorithm and are still recommended, but they cannot replace public-key key exchange and signatures, so they are not a PQC approach.",
    iso: ["8.24"],
    tip: "「先竊取、後解密（Harvest Now, Decrypt Later）」是現在就存在的威脅。可建議客戶先建立密碼資產清冊（Crypto Inventory），並規劃密碼敏捷性（Crypto Agility）。"
  },
  {
    id: "STD-16", src: "std", cat: "sec", lv: 2,
    q: "A software development company is addressing advanced persistent threats (APTs). Which combination of strategies should be prioritized to effectively identify and mitigate these threats?",
    qz: "一家軟體開發公司正在因應進階持續性威脅（APT）。應優先採取哪一組策略，才能有效識別並降低這類威脅？",
    o: [
      "Implementing stateful firewalls and regular antivirus scans",
      "Deploying honeypots and conducting periodic penetration tests",
      "Leveraging threat intelligence feeds and employing behavior-based anomaly detection",
      "Increasing network segmentation and enhancing physical security controls"
    ],
    oz: [
      "建置狀態式防火牆並定期執行防毒掃描",
      "部署蜜罐（誘捕系統）並定期進行滲透測試",
      "運用威脅情資來源並採用行為式異常偵測",
      "增加網路區隔並強化實體安全控制"
    ],
    a: 2,
    ez: "APT 的特性是隱匿、長期潛伏，常使用客製化惡意程式、零時差漏洞與「就地取材（Living off the Land）」手法，以特徵碼為主的防毒與防火牆很難察覺。威脅情資提供最新的入侵指標（IoC）與攻擊手法（TTPs，可對照 MITRE ATT&CK），行為式異常偵測（如 EDR、UEBA、NDR）則能發現不符合正常模式的活動，兩者結合最能「識別」APT。蜜罐與滲透測試有幫助，但屬於週期性作業；網路區隔能限制擴散，但無法發現已潛伏的攻擊者。",
    ee: "APTs are stealthy and long-lived, using custom malware, zero-days and living-off-the-land techniques that signature-based antivirus and firewalls miss. Threat intelligence supplies current IoCs and TTPs (mapped to MITRE ATT&CK), and behavior-based detection (EDR, UEBA, NDR) spots activity that deviates from normal. Together they identify APTs best. Honeypots and pentests help but are periodic, and segmentation limits spread without detecting attackers already inside.",
    iso: ["5.7", "8.16"],
    tip: "A.5.7「威脅情資」是 ISO 27001:2022 新增的控制措施。稽核時可問：情資來源是什麼（例如 TWCERT/CC、產業 ISAC）？收到後如何評估，並轉成實際的防護動作？"
  },
  {
    id: "STD-17", src: "std", cat: "sec", lv: 2,
    q: "In the context of hardware consulting, which advanced technique involves analyzing the electromagnetic emanations of electronic devices to extract sensitive information?",
    qz: "在硬體顧問的情境中，哪一種進階技術是透過分析電子設備的電磁輻射來竊取敏感資訊？",
    o: ["Microarchitectural attacks", "Rowhammer attacks", "Electromagnetic side-channel attacks", "Hardware-based rootkits"],
    oz: ["微架構攻擊", "Rowhammer 攻擊（記憶體位元翻轉攻擊）", "電磁側通道攻擊", "硬體型 Rootkit"],
    a: 2,
    ez: "電磁側通道攻擊（俗稱 TEMPEST、Van Eck phreaking）是擷取設備運作時洩漏的電磁波，還原螢幕畫面、鍵盤輸入，甚至推算出加密金鑰。微架構攻擊（如 Spectre、Meltdown）利用 CPU 的推測執行與快取時序；Rowhammer 是反覆存取 DRAM 的某一列，使相鄰列的位元翻轉；硬體型 Rootkit 是把惡意程式植入韌體或硬體中。對策包括電磁屏蔽（法拉第籠）、使用符合 TEMPEST 規範的設備，以及保持足夠的實體距離。",
    ee: "Electromagnetic side-channel attacks (TEMPEST, Van Eck phreaking) capture electromagnetic emissions from operating devices to reconstruct screen contents, keystrokes or even cryptographic keys. Microarchitectural attacks such as Spectre and Meltdown abuse speculative execution and cache timing. Rowhammer repeatedly accesses DRAM rows to flip bits in neighboring rows. Hardware rootkits implant malicious code in firmware or hardware. Countermeasures include shielding (Faraday cages), TEMPEST-rated equipment and physical distance.",
    iso: ["7.8"],
    tip: "ISO/IEC 27002 的設備安置與保護指引有提到電磁洩漏風險。處理高機敏資訊的場所（如國防、金融機房）可評估電磁屏蔽的需求。"
  },
  {
    id: "STD-18", src: "std", cat: "sec", lv: 2,
    q: "An IT hardware manufacturer is facing a significant increase in counterfeit products entering the market. From an information security perspective, which of the following poses the greatest risk to the company's reputation and customer trust?",
    qz: "一家 IT 硬體製造商發現市場上的仿冒產品大幅增加。從資訊安全的角度來看，下列何者對公司聲譽與客戶信任構成最大風險？",
    o: [
      "Revenue loss due to counterfeit sales",
      "Potential legal liabilities arising from product failures",
      "Damage to brand image and customer loyalty",
      "Introduction of vulnerabilities into the supply chain through counterfeit hardware"
    ],
    oz: [
      "仿冒品銷售造成的營收損失",
      "產品故障可能衍生的法律責任",
      "品牌形象與客戶忠誠度受損",
      "仿冒硬體將漏洞帶入供應鏈"
    ],
    a: 3,
    ez: "題目要求「從資訊安全的角度」思考。仿冒硬體可能內含後門、被竄改的韌體或劣質元件，也收不到原廠的安全更新；一旦流入客戶環境，就可能造成資料外洩或系統遭入侵，這才是侵蝕客戶信任的根本資安風險。營收損失、法律責任屬於商業與法務面的後果；品牌形象受損則是「結果」，而不是資安風險本身。",
    ee: "The question asks for the information security perspective. Counterfeit hardware may contain backdoors, tampered firmware or substandard components, and it receives no vendor security updates. Once it reaches customers, it can lead to breaches, and that is the root security risk that erodes trust. Revenue loss and legal liability are business and legal consequences, and brand damage is the outcome rather than the security risk itself.",
    iso: ["5.19", "5.21"],
    tip: "供應鏈安全是近年稽核熱點。可確認客戶是否只向授權通路採購、驗收時是否檢查序號與韌體簽章，並要求供應商提供 SBOM／HBOM。"
  },
  {
    id: "STD-19", src: "std", cat: "sec", lv: 1,
    q: "An IT consulting firm faces a sophisticated cyberattack aimed at stealing intellectual property. Which type of attack most likely represents this situation?",
    qz: "一家 IT 顧問公司遭遇以竊取智慧財產為目的的複雜網路攻擊。下列哪一種攻擊類型最可能符合此情境？",
    o: [
      "Advanced Persistent Threat (APT), characterized by prolonged and stealthy operations to steal sensitive data",
      "Spear phishing aimed at gaining privileged access through targeted social engineering",
      "Cryptojacking that covertly uses the firm's computing resources for cryptocurrency mining",
      "A zero-day exploit leveraging unknown vulnerabilities to infiltrate IT infrastructure"
    ],
    oz: [
      "進階持續性威脅（APT）：以長期、隱匿的行動竊取敏感資料",
      "魚叉式網路釣魚：透過鎖定目標的社交工程取得特權存取",
      "加密貨幣挖礦劫持（Cryptojacking）：暗中占用公司運算資源挖礦",
      "零時差漏洞攻擊：利用未知漏洞滲透 IT 基礎設施"
    ],
    a: 0,
    ez: "攻擊目的是「竊取智慧財產」且手法「複雜」，最符合 APT 的特徵：攻擊者（常為國家級或組織化團體）長期潛伏、低調橫向移動，持續竊取機密。魚叉式釣魚與零時差漏洞都是 APT 常用的「入侵手段（初始存取）」，而不是整體的攻擊類型；加密貨幣挖礦劫持的目標是運算資源，而不是智慧財產。",
    ee: "The goal is stealing intellectual property through a sophisticated campaign, which matches an APT: often state-backed or organized groups that persist quietly, move laterally and exfiltrate secrets over time. Spear phishing and zero-day exploits are initial access techniques an APT may use, not the overall attack type. Cryptojacking targets computing resources, not intellectual property.",
    iso: ["5.7", "8.16", "5.12"],
    tip: "保護智慧財產，要先知道「寶藏在哪裡」。稽核時可確認資訊分類分級是否落實，最高機密資料是否有額外的存取監控。"
  },
  {
    id: "STD-20", src: "std", cat: "sec", lv: 3,
    q: "In data processing, which cryptographic technique aims to provide both confidentiality and authentication by ensuring that data can only be decrypted by the intended recipient?",
    qz: "在資料處理中，哪一種密碼技術能同時提供機密性與鑑別性，確保資料只能由預期的接收者解密？",
    o: ["Digital signatures", "Hash functions", "Public Key Infrastructure (PKI)", "Authenticated Encryption with Associated Data (AEAD)"],
    oz: ["數位簽章", "雜湊函數", "公開金鑰基礎建設（PKI）", "鑑別加密（AEAD，含關聯資料的鑑別加密）"],
    a: 3,
    ez: "AEAD 是「一次同時完成加密與鑑別」的密碼技術，代表演算法有 AES-GCM 與 ChaCha20-Poly1305。只有持有正確金鑰的接收者能解密，而且解密時會同時驗證鑑別標籤（Tag）；資料只要被竄改一個位元，解密就會失敗，因此兼顧機密性、完整性與來源鑑別。數位簽章提供鑑別與不可否認性，但不提供機密性；雜湊函數只能驗證完整性；PKI 是管理公開金鑰與憑證的「基礎建設」（CA、憑證政策、註冊機構等），讓加密與簽章得以運作，但它本身不是一種加密技術。實務上，TLS 1.3 就是用 PKI 驗證伺服器身分，再用 AEAD 保護傳輸的每一筆資料。",
    ee: "AEAD performs encryption and authentication in one operation; AES-GCM and ChaCha20-Poly1305 are common examples. Only a recipient with the correct key can decrypt, and decryption also verifies an authentication tag, so any tampering makes decryption fail. That gives confidentiality, integrity and authenticity together. Digital signatures provide authenticity and non-repudiation but no confidentiality. Hash functions only check integrity. PKI is the infrastructure (CAs, certificate policies, registration) that manages keys and certificates; it enables encryption but is not an encryption technique itself. TLS 1.3 uses PKI to authenticate the server and AEAD to protect every record.",
    iso: ["8.24"],
    tip: "審閱加密政策時，可確認是否明訂允許使用的演算法與模式（例如 AES-GCM），並禁止 ECB 等不安全的模式。"
  },
  {
    id: "STD-21", src: "std", cat: "cloud", lv: 1,
    q: "In IT consulting, ISO/IEC 27017 provides guidelines for which area?",
    qz: "在 IT 顧問領域中，ISO/IEC 27017 提供的是哪一方面的指引？",
    o: ["Data protection", "Cloud services", "Software development", "Quality management"],
    oz: ["資料保護", "雲端服務", "軟體開發", "品質管理"],
    a: 1,
    ez: "ISO/IEC 27017:2015 是「以 ISO/IEC 27002 為基礎之雲端服務資訊安全控制措施作業規範」，同時針對雲端服務提供者（CSP）與雲端服務客戶（CSC）提供實作指引，並額外增加 7 項雲端專屬控制措施（CLD 系列），例如共同責任的角色與權責、虛擬機器強化、雲端服務客戶資產的移除等。相關標準：ISO/IEC 27018 是公有雲擔任個資處理者時的個資保護作業規範；ISO/IEC 27701 是隱私資訊管理系統（PIMS）；品質管理則是 ISO 9001。",
    ee: "ISO/IEC 27017:2015 is the code of practice for information security controls for cloud services, based on ISO/IEC 27002. It gives guidance to both cloud service providers and cloud service customers and adds seven cloud-specific controls (the CLD series), such as shared roles and responsibilities, virtual machine hardening and removal of customer assets. Related standards: ISO/IEC 27018 covers PII protection in public clouds acting as processors, ISO/IEC 27701 covers privacy information management (PIMS), and ISO 9001 covers quality management.",
    iso: ["5.23"],
    tip: "常見的驗證組合：ISO 27001 + 27017 + 27018（再加上 27701）。輔導雲端服務商時，可協助對照 CSP 與 CSC 雙方的責任分工表。"
  },
  {
    id: "STD-22", src: "std", cat: "sec", lv: 1,
    q: "In the field of hardware manufacturing, which advanced threat actor specializes in creating malicious hardware implants that could compromise hardware security?",
    qz: "在硬體製造領域中，哪一類進階威脅行為者專門製作可能危及硬體安全的惡意硬體植入物？",
    o: ["Nation-state actors", "Insider threats", "Script kiddies", "Denial-of-service (DoS) attackers"],
    oz: ["國家級威脅行為者（國家支持的駭客組織）", "內部人員威脅", "腳本小子（Script Kiddies）", "阻斷服務（DoS）攻擊者"],
    a: 0,
    ez: "製作惡意硬體植入物需要龐大資源、先進的工程能力，以及介入供應鏈的管道，通常只有國家級威脅行為者具備。2013 年 Snowden 文件揭露的 NSA ANT 目錄中，就包含多種硬體植入工具。內部人員可能協助植入，但並非「專門製作」；腳本小子只會使用現成工具；DoS 攻擊者的目標是破壞可用性。",
    ee: "Building malicious hardware implants requires large budgets, advanced engineering and access to the supply chain, which typically only nation-state actors have. The NSA ANT catalog revealed in the 2013 Snowden documents included several hardware implants. Insiders may help plant devices but do not specialize in building them, script kiddies use ready-made tools, and DoS attackers target availability.",
    iso: ["5.21", "5.7"],
    tip: "台灣是全球電子供應鏈重鎮，硬體供應鏈安全格外重要。可參考 NIST SP 800-161 的網路安全供應鏈風險管理（C-SCRM）。"
  },
  {
    id: "STD-23", src: "std", cat: "cloud", lv: 2,
    q: "A company is transitioning to cloud-based infrastructure. Which cloud service model is best suited to ensuring shared responsibility for security between the company and the cloud provider?",
    qz: "一家公司正在轉移到雲端基礎架構。哪一種雲端服務模式最適合確保公司與雲端供應商之間「共同承擔」資安責任？",
    o: ["Infrastructure as a Service (IaaS)", "Platform as a Service (PaaS)", "Software as a Service (SaaS)", "Function as a Service (FaaS)"],
    oz: ["基礎設施即服務（IaaS）", "平台即服務（PaaS）", "軟體即服務（SaaS）", "函式即服務（FaaS）"],
    a: 0,
    ez: "在 IaaS 模式中，雲端供應商負責實體機房、硬體、網路與虛擬化層（Hypervisor）的安全；客戶則負責作業系統、中介軟體、應用程式、資料、身分與存取管理、防火牆規則等。雙方都承擔大量且分工明確的責任，是「責任共擔模型（Shared Responsibility Model）」最典型的情境。愈往 PaaS、FaaS、SaaS 移動，供應商承擔的部分愈多；但無論哪一種模式，資料、帳號與存取權限永遠是客戶的責任。",
    ee: "In IaaS, the provider secures the physical data center, hardware, network and hypervisor, while the customer secures the OS, middleware, applications, data, identity and access management and firewall rules. Both parties hold large, clearly divided responsibilities, the textbook case of the shared responsibility model. Moving toward PaaS, FaaS and SaaS shifts more to the provider, but data, accounts and access rights always stay with the customer.",
    iso: ["5.23"],
    tip: "稽核雲端時最常見的落差：客戶以為「上雲了，安全就是雲端廠商的事」。請客戶拿出責任分工表（RACI），逐項說明由誰負責。"
  },
  {
    id: "STD-24", src: "std", cat: "itsm", lv: 1,
    q: "In an IT consulting company, what is the primary reason for implementing a robust Mobile Device Management (MDM) strategy?",
    qz: "在 IT 顧問公司中，建立完善的行動裝置管理（MDM）策略，最主要的原因是什麼？",
    o: [
      "To ensure the secure integration of mobile devices into the corporate network to prevent data breaches",
      "To facilitate efficient allocation and management of mobile devices to optimize operational workflows",
      "To enhance the collaborative work environment by ensuring consistency and compatibility across mobile devices",
      "To establish a professional corporate image by standardizing mobile device usage and security practices"
    ],
    oz: [
      "確保行動裝置安全地接入公司網路，以防止資料外洩",
      "促進行動裝置的分配與管理效率，以最佳化營運流程",
      "確保行動裝置間的一致性與相容性，以強化協作環境",
      "透過標準化行動裝置的使用與安全實務，建立專業的企業形象"
    ],
    a: 0,
    ez: "MDM 的首要目的是「安全」：強制螢幕鎖定與密碼、裝置加密、遺失時遠端鎖定或抹除、控管可安裝的 App、將公務資料與個人資料隔離（BYOD 的工作設定檔），並且只有在裝置符合政策時才允許存取公司資源，以防止資料外洩。資產分配效率、協作一致性、企業形象都只是附帶效益。",
    ee: "The primary purpose of MDM is security: enforcing screen locks and passcodes, device encryption, remote lock or wipe, app control, separating work and personal data (BYOD work profiles) and allowing access only from compliant devices, all to prevent data breaches. Allocation efficiency, consistency and corporate image are secondary benefits.",
    iso: ["8.1", "6.7"],
    tip: "若員工使用個人手機（BYOD）處理公務，要特別注意遠端抹除的範圍與事前告知，避免侵害員工的個人資料與隱私。"
  },
  {
    id: "STD-25", src: "std", cat: "net", lv: 1,
    q: "In an IT services environment, why is network segmentation a critical security control?",
    qz: "在 IT 服務環境中，為什麼網路區隔（Network Segmentation）是一項關鍵的安全控制措施？",
    o: [
      "It improves overall network performance and reduces latency, enhancing user experience",
      "Network segmentation limits the spread of cyber threats and isolates security breaches",
      "It simplifies network management and maintenance tasks for IT staff",
      "Segmentation helps allocate bandwidth more effectively for critical applications"
    ],
    oz: [
      "它能提升整體網路效能並降低延遲，改善使用者體驗",
      "網路區隔能限制網路威脅的擴散，並隔離資安事件的影響範圍",
      "它能簡化 IT 人員的網路管理與維護工作",
      "區隔有助於更有效地為關鍵應用程式分配頻寬"
    ],
    a: 1,
    ez: "網路區隔的核心價值是「圍堵」：把網路切成不同區域（如使用者區、伺服器區、DMZ、OT 區），區域之間以防火牆或存取控制清單（ACL）限制流量。一旦某區遭入侵，攻擊者難以橫向移動（例如勒索軟體在內網擴散），損害被限縮在局部。效能、管理便利、頻寬分配只是可能的附帶效果；事實上，區隔往往會增加管理複雜度。",
    ee: "The core value of segmentation is containment. The network is divided into zones (users, servers, DMZ, OT) with firewalls or ACLs between them, so an intruder in one zone struggles to move laterally, as ransomware does, and damage stays local. Performance, easier management and bandwidth allocation are side effects at most, and segmentation often adds management complexity.",
    iso: ["8.22"],
    tip: "看網路架構圖時，問一句：「如果這台使用者電腦中毒，它連得到核心資料庫嗎？」答案若是肯定的，就是區隔不足。"
  },
  {
    id: "STD-26", src: "std", cat: "sec", lv: 2,
    q: "A cybersecurity consulting firm has been hired to assess the security posture of a large e-commerce platform. During the assessment, the consultants discover that the platform uses outdated encryption algorithms to protect customer payment data. What is the most critical risk associated with this finding?",
    qz: "一家資安顧問公司受託評估大型電商平台的安全狀態。評估過程中，顧問發現該平台使用過時的加密演算法來保護客戶支付資料。與此發現相關的最關鍵風險是什麼？",
    o: ["Increased computational overhead on the platform's servers", "Potential non-compliance with industry security standards", "Vulnerability to brute-force attacks due to weaker encryption", "Limited compatibility with modern web browsers"],
    oz: ["平台伺服器的運算負擔增加", "可能不符合產業安全標準", "加密強度不足，容易遭受暴力破解攻擊", "與新版網頁瀏覽器的相容性受限"],
    a: 2,
    ez: "過時的演算法（如 DES、3DES、RC4，或以 MD5、SHA-1 做完整性驗證）金鑰太短或存在已知弱點，攻擊者可透過暴力破解或密碼分析取回明文，導致信用卡等支付資料直接外洩，這是最直接、最嚴重的風險。不符合 PCI DSS 等產業標準確實是問題，但它是「後果」而非最根本的風險；運算負擔與瀏覽器相容性則與資料遭竊的風險關係較小。",
    ee: "Outdated algorithms such as DES, 3DES, RC4, or MD5/SHA-1 for integrity have short keys or known weaknesses. Attackers can brute-force or cryptanalyze them to recover payment data in plaintext, which is the most direct and severe risk. Non-compliance with PCI DSS is real, but it is a consequence rather than the root risk. Server overhead and browser compatibility matter far less.",
    iso: ["8.24"],
    tip: "撰寫顧問報告的風險排序原則：先寫「資料可能被竊取」的實質衝擊，再寫「不符合法規標準」的合規衝擊，管理階層比較容易理解優先順序。"
  },
  {
    id: "STD-27", src: "std", cat: "sec", lv: 1,
    q: "A software consulting firm is contracted to develop an application that processes the personal data of EU citizens. Which regulation must they comply with?",
    qz: "一家軟體顧問公司受託開發一套處理歐盟公民個人資料的應用程式，他們必須遵循哪一項法規？",
    o: ["CCPA", "HIPAA", "GDPR", "CISA"],
    oz: ["CCPA（美國加州消費者隱私法）", "HIPAA（美國健康保險可攜與責任法）", "GDPR（歐盟一般資料保護規則）", "CISA（美國網路安全暨基礎設施安全局；亦為 ISACA 資訊系統稽核師證照）"],
    a: 2,
    ez: "GDPR（Regulation (EU) 2016/679）自 2018 年 5 月 25 日起施行，具域外效力（第 3 條）：只要對位於歐盟境內的個人提供商品或服務，或監控其行為，即使公司不在歐盟也須遵循。精確來說，GDPR 保護的是「位於歐盟境內的資料主體」，不限於歐盟公民。受託開發者通常是「處理者（Processor）」，須依第 28 條簽訂資料處理協議，並落實第 25 條「設計及預設之資料保護（Privacy by Design and by Default）」。CCPA 適用於加州居民；HIPAA 規範美國的健康資訊；CISA 是美國的資安機構，也是 ISACA 資訊系統稽核師證照的名稱，都不是本題所需的隱私法規。台灣對應的法規則是《個人資料保護法》。（原 PDF 把 HIPAA 譯成「HIPAA 協定」並不精確，它是一部法案。）",
    ee: "GDPR (Regulation (EU) 2016/679) has applied since 25 May 2018 and has extraterritorial reach under Article 3: offering goods or services to, or monitoring, people in the EU triggers it even for non-EU companies. Strictly, it protects data subjects in the EU, not only EU citizens. A contracted developer usually acts as a processor, needs an Article 28 data processing agreement and must apply privacy by design and by default (Article 25). CCPA covers California residents, HIPAA covers US health information, and CISA is a US agency and an ISACA audit certification, not the privacy law this case needs.",
    iso: ["5.31", "5.34"],
    tip: "輔導 PIMS（ISO/IEC 27701）時，可用 GDPR 的控制者／處理者角色，協助客戶釐清自己在每個處理活動中的責任。"
  },
  {
    id: "STD-28", src: "std", cat: "sec", lv: 2,
    q: "An IT infrastructure provider is implementing a defense-in-depth strategy to protect against cyber threats. Which of the following security controls would be considered a preventive measure in this approach?",
    qz: "一家 IT 基礎設施供應商正在實施縱深防禦策略以抵禦網路威脅。下列哪一項安全控制措施屬於「預防性」措施？",
    o: ["Intrusion Detection System (IDS)", "Security Information and Event Management (SIEM)", "Incident Response Plan (IRP)", "Web Application Firewall (WAF)"],
    oz: ["入侵偵測系統（IDS）", "資安資訊與事件管理（SIEM）", "資安事件應變計畫（IRP）", "網站應用程式防火牆（WAF）"],
    a: 3,
    ez: "控制措施依功能可分為預防性（Preventive）、偵測性（Detective）與矯正性（Corrective）。WAF 會在惡意 HTTP 請求（如 SQL 隱碼攻擊、XSS）抵達應用程式之前就加以阻擋，屬於預防性控制。IDS 與 SIEM 負責發現與告警，屬於偵測性控制；事件應變計畫是在事件發生後進行處置與復原，屬於矯正性控制。ISO/IEC 27002:2022 為每項控制措施加上「控制類型」屬性，正是以這三類來標示。",
    ee: "Controls are classified as preventive, detective or corrective. A WAF blocks malicious HTTP requests such as SQL injection and XSS before they reach the application, so it is preventive. IDS and SIEM discover and alert, which makes them detective. An incident response plan handles and recovers from incidents after they happen, so it is corrective. ISO/IEC 27002:2022 tags every control with a control type attribute using exactly these three categories.",
    iso: ["8.20", "8.26"],
    tip: "常見陷阱：IPS（入侵防禦系統）會主動阻擋，屬於預防性；IDS 只偵測不阻擋，屬於偵測性。"
  },
  {
    id: "STD-29", src: "std", cat: "sec", lv: 2,
    q: "An IT consulting firm is advising clients on data leakage prevention strategies. In the context of Data Loss Prevention (DLP), which technology most effectively prevents sensitive data from leaking through endpoints?",
    qz: "一家 IT 顧問公司正在為客戶提供資料外洩防護策略建議。就資料外洩防護（DLP）而言，哪一種技術最能有效防止敏感資料經由端點外洩？",
    o: ["Network traffic analysis and anomaly detection", "Encryption of data at rest and in transit", "Content-aware DLP with contextual analysis", "Strong access controls and authentication"],
    oz: ["網路流量分析與異常偵測", "對靜態與傳輸中的資料加密", "具備情境分析能力的內容感知型 DLP", "嚴格的存取控制與身分驗證"],
    a: 2,
    ez: "端點 DLP 代理程式能辨識「內容」（關鍵字、正規表示式比對，例如信用卡號、身分證字號、文件指紋、機器學習分類），並結合「情境」（誰、用哪個程式、要傳到哪裡：USB、雲端硬碟、列印、剪貼簿、即時通訊）即時判斷，進行阻擋、警示或記錄。加密防的是未授權者，但「有權限的人」仍可能把資料帶走；網路流量分析看不到 USB 等離線管道；存取控制同樣擋不住合法使用者的不當外傳。",
    ee: "An endpoint DLP agent recognizes content (keywords, regex patterns such as card or national ID numbers, document fingerprints, ML classifiers) and combines it with context (who, which app, which destination: USB, cloud drive, printing, clipboard, messaging) to block, warn or log in real time. Encryption stops unauthorized parties, but authorized users can still walk off with data. Network analysis misses offline channels such as USB, and access controls do not stop legitimate users from misusing data.",
    iso: ["8.12", "5.12"],
    tip: "DLP 規則要建立在「資訊分類分級」之上。若客戶連機密資料的定義都沒有，先回頭補分類分級，再談 DLP。"
  },
  {
    id: "STD-30", src: "std", cat: "sec", lv: 1,
    q: "Which strategy is crucial for mitigating insider threats in an IT consulting firm?",
    qz: "對 IT 顧問公司而言，哪一種策略是降低內部人員威脅的關鍵？",
    o: [
      "Implementing strict physical security controls across all company facilities",
      "Regularly updating and patching all software and network systems",
      "Establishing comprehensive user behavior analytics and monitoring systems",
      "Enhancing client-side data encryption protocols across the IT infrastructure"
    ],
    oz: [
      "在公司所有場所實施嚴格的實體安全控制",
      "定期更新並修補所有軟體與網路系統",
      "建立完善的使用者行為分析（UEBA）與監控機制",
      "強化整個 IT 基礎架構的用戶端資料加密機制"
    ],
    a: 2,
    ez: "內部人員本來就擁有合法的帳號與權限，實體門禁、系統修補、加密這些主要針對外部攻擊者的防線，對他們的效果有限。使用者與實體行為分析（UEBA）會建立每個人的正常行為基準並偵測異常，例如離職前大量下載、非上班時間存取、突然存取與職務無關的資料。實務上還要搭配最小權限、職務區隔、人員背景查核、資安認知教育，以及離職時即時收回權限。",
    ee: "Insiders already hold legitimate accounts and permissions, so physical security, patching and encryption, which mainly target outsiders, help little. UEBA builds a baseline of each person's normal behavior and flags anomalies such as mass downloads before resignation, off-hours access or touching data unrelated to the job. Combine it with least privilege, segregation of duties, screening, awareness training and prompt removal of access at termination.",
    iso: ["8.16", "6.1", "5.3", "8.2"],
    tip: "監控員工行為涉及個資，應事先在工作規則或政策中告知員工，符合《個人資料保護法》的告知義務與比例原則。"
  }
);
