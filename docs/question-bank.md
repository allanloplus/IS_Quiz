# Allan'S IT知識測驗：題庫總覽

共 100 題（標準 30 題＋AI 生成 70 題）。本檔由 `node tools/export-questions.js` 產生，請勿手動編輯；修改題目請改 `js/questions-*.js`。

| 類別 | 標準 | AI | 合計 |
|---|---:|---:|---:|
| 網路與基礎架構 | 4 | 8 | 12 |
| 作業系統與伺服器 | 0 | 11 | 11 |
| 軟體開發與程式設計 | 2 | 9 | 11 |
| 資料庫與大數據 | 2 | 9 | 11 |
| 虛擬化與雲端運算 | 3 | 9 | 12 |
| IT服務管理與維運 | 1 | 10 | 11 |
| 容器化與DevOps | 1 | 10 | 11 |
| 資訊安全 | 17 | 4 | 21 |

## 標準 30 題

### STD-01｜資料庫與大數據｜難度 ★★

**An IT services company is implementing new database management technologies. What would most likely be their primary choice?**

一家 IT 服務公司正在導入新的資料庫管理技術，下列何者最可能是他們的首選？

- A. Kubernetes for orchestrating containerized database applications　／　Kubernetes：用於編排（調度）容器化的資料庫應用程式
- B. MongoDB as a scalable NoSQL database for handling diverse datasets　／　MongoDB：具延展性的 NoSQL 資料庫，可處理多樣化的資料集　**← 正確答案**
- C. SQL Server Integration Services (SSIS) for comprehensive data integration and transformation　／　SQL Server Integration Services（SSIS）：用於全面的資料整合與轉換
- D. Apache Cassandra for high availability and scalability in large-scale database environments　／　Apache Cassandra：在大規模資料庫環境中提供高可用性與延展性

**解說：** 題目問的是「資料庫管理技術」本身，關鍵在分辨各選項的技術屬性。Kubernetes 是容器編排平台，負責部署與調度容器，本身不是資料庫；SSIS 是 ETL（擷取、轉換、載入）工具，處理資料整合，也不是資料庫；Apache Cassandra 雖然是資料庫，但屬於寬欄式（wide-column）NoSQL，主要用在超大規模、寫入密集、跨資料中心的特殊情境。MongoDB 是通用型的文件導向 NoSQL 資料庫，結構彈性、可水平擴充，最符合 IT 服務公司面對各類客戶與多樣化資料的一般需求，因此是最可能的首選。

*Explanation:* The question is about a database management technology itself. Kubernetes is a container orchestration platform, not a database. SSIS is an ETL tool for data integration. Cassandra is a database, but a wide-column store aimed at massive, write-heavy, multi-datacenter workloads, which makes it a specialized choice. MongoDB is a general-purpose document database with a flexible schema and horizontal scalability, so it is the most likely primary choice for an IT services company handling diverse client data.

**ISO/IEC 27001:2022 附錄 A：** A.8.9 Configuration management（組態管理）；A.8.13 Information backup（資訊備份）

**稽核小叮嚀：** 看到客戶導入 NoSQL，別忘了確認：預設帳密是否已修改、是否直接暴露在網際網路上（2017 年曾有大量對外開放的 MongoDB 遭清空勒索）、存取控制與備份機制是否到位。

### STD-02｜資訊安全｜難度 ★

**When developing a cybersecurity strategy, which emerging concept emphasizes continuous authentication and real-time monitoring of user and device behavior?**

在制定資安策略時，哪一個新興概念強調對使用者與裝置行為進行「持續驗證」與「即時監控」？

- A. Cyber resilience　／　網路韌性（Cyber Resilience）
- B. Deception technology　／　欺敵技術（Deception Technology）
- C. Continuous authentication　／　持續性身分驗證（Continuous Authentication）　**← 正確答案**
- D. Threat hunting　／　威脅獵捕（Threat Hunting）

**解說：** 持續性身分驗證是零信任（Zero Trust）架構「永不信任、持續驗證」的核心：不只在登入時驗證一次，而是在整個連線期間持續依據行為特徵（打字節奏、滑鼠軌跡）、裝置狀態、地理位置與存取情境評估風險，異常時要求重新驗證或中斷連線。網路韌性是指組織承受攻擊並快速復原的能力；欺敵技術是佈署誘餌（如蜜罐、假帳號）引誘攻擊者現形；威脅獵捕是由分析人員主動搜尋已潛伏的威脅。三者都重要，但都不是「持續驗證使用者與裝置」的概念。

*Explanation:* Continuous authentication is a core idea of Zero Trust (never trust, always verify). Identity is re-evaluated throughout the session using behavioral signals, device posture, location and context, not only at login. Cyber resilience is the ability to withstand and recover from attacks. Deception technology uses decoys such as honeypots to expose attackers. Threat hunting is analysts proactively searching for hidden threats.

**ISO/IEC 27001:2022 附錄 A：** A.8.5 Secure authentication（安全鑑別）；A.8.16 Monitoring activities（監視活動）

**稽核小叮嚀：** 可參考 NIST SP 800-207 零信任架構。稽核時可詢問：高風險系統是否依情境（裝置、地點、時間）進行條件式存取與重新驗證？

### STD-03｜網路與基礎架構｜難度 ★★

**A data processing company is evaluating options for secure data transmission. Which protocol provides end-to-end encryption and Perfect Forward Secrecy (PFS) for secure communications?**

一家資料處理公司正在評估安全的資料傳輸方案。哪一種通訊協定可提供端對端加密與完全前向保密（PFS），以確保通訊安全？

- A. IPsec (Internet Protocol Security)　／　IPsec（網際網路安全協定）
- B. SSH (Secure Shell)　／　SSH（安全殼層協定）
- C. TLS (Transport Layer Security)　／　TLS（傳輸層安全協定）　**← 正確答案**
- D. SNMPv3 (Simple Network Management Protocol version 3)　／　SNMPv3（簡易網路管理協定第 3 版）

**解說：** TLS 是應用程式之間安全通訊的標準協定，HTTPS、API、郵件傳輸都靠它。TLS 1.3 強制使用暫時性金鑰交換（ECDHE），每次連線都產生新的工作階段金鑰；即使伺服器私鑰日後外洩，過去被側錄的流量也無法解密，這就是完全前向保密（PFS）。IPsec 主要用於網路對網路的 VPN 通道，PFS 是 IKE 的選配設定；SSH 雖然也以 Diffie-Hellman 交換金鑰，但用途是遠端管理與檔案傳輸；SNMPv3 提供網管訊息的鑑別與加密，不是一般的資料傳輸協定。綜合「一般安全資料傳輸＋PFS」，TLS 是最佳答案。

*Explanation:* TLS is the standard protocol for securing application communications such as HTTPS, APIs and email transport. TLS 1.3 requires ephemeral (EC)DHE key exchange, so every session gets fresh keys and traffic recorded earlier stays safe even if the server's private key leaks later. That property is PFS. IPsec mainly builds network-to-network VPN tunnels and treats PFS as an optional IKE setting. SSH uses Diffie-Hellman too, but it is built for remote administration and file transfer. SNMPv3 secures network management messages and is not a general data transport.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）；A.5.14 Information transfer（資訊傳送）

**稽核小叮嚀：** 稽核重點：對外服務是否僅允許 TLS 1.2 以上，並停用 SSL 3.0、TLS 1.0／1.1 與弱加密套件？可用 SSL Labs 等工具的檢測結果作為佐證。

### STD-04｜容器化與DevOps｜難度 ★

**In software development, what is the primary focus of the term 'DevOps'?**

在軟體開發領域中，「DevOps」一詞主要關注的是什麼？

- A. Implementing robust software testing protocols to ensure code quality and reliability　／　實施嚴謹的軟體測試規範，以確保程式碼品質與可靠性
- B. Integrating development and operations teams to improve collaboration and productivity　／　整合開發（Dev）與維運（Ops）團隊，以提升協作效率與生產力　**← 正確答案**
- C. Enhancing the security of software applications through continuous monitoring　／　透過持續監控來強化軟體應用程式的安全性
- D. Streamlining the user interface design process for a better customer experience　／　簡化使用者介面設計流程，以提供更好的客戶體驗

**解說：** DevOps 是 Development（開發）與 Operations（維運）的組合，是一種結合文化、實務與工具的方法：打破開發與維運之間的部門牆，透過持續整合／持續交付（CI/CD）、自動化、基礎架構即程式碼（IaC）與快速回饋，讓軟體能更快、更穩定地交付。嚴謹測試屬於品質保證（QA），是 DevOps 流程的一環而非核心；以持續監控強化安全比較接近 DevSecOps 的延伸；UI 設計則屬於使用者體驗（UX）領域。

*Explanation:* DevOps combines Development and Operations. It is a culture and a set of practices and tools that breaks down silos between the two teams, using CI/CD, automation, Infrastructure as Code and fast feedback to deliver software quickly and reliably. Testing is part of the pipeline but not its core idea. Security monitoring leans toward DevSecOps. UI design belongs to UX.

**ISO/IEC 27001:2022 附錄 A：** A.8.25 Secure development life cycle（安全開發生命週期）；A.8.32 Change management（變更管理）

**稽核小叮嚀：** DevOps 追求快速部署，稽核時要確認「快」不等於「跳過變更管理」：自動化管線中是否仍保有審查、測試與核准紀錄？

### STD-05｜資訊安全｜難度 ★★★

**When implementing a Security Orchestration, Automation and Response (SOAR) platform in a large IT consulting environment, what is the most significant challenge, and how can it be addressed?**

在大型 IT 顧問公司的環境中導入資安協同作業、自動化與回應（SOAR）平台時，最主要的挑戰是什麼？又該如何解決？

- A. Integration complexity with existing tools; addressed by using APIs and custom scripts　／　與現有工具整合的複雜度；透過 API 與自訂腳本解決　**← 正確答案**
- B. High operational costs; mitigated through phased deployment　／　營運成本高；透過分階段部署來降低
- C. User resistance; overcome through extensive training and change management　／　使用者抗拒；透過大量訓練與變革管理來克服
- D. Data overload; managed by adopting advanced machine learning algorithms　／　資料過載；採用先進的機器學習演算法來管理

**解說：** SOAR 的價值在於把 SIEM、EDR、防火牆、威脅情資平台、工單系統等工具串接起來，以劇本（Playbook）自動執行調查與回應。大型環境中工具種類多、廠牌各異、版本不一，「整合」因此成為最大挑戰；解法是善用各工具的 API 與廠商提供的連接器（Connector），不足之處再以自訂腳本補強。成本、使用者抗拒與資料量雖然也是導入時會遇到的問題，但都不是 SOAR 特有的核心挑戰。

*Explanation:* SOAR delivers value by connecting SIEM, EDR, firewalls, threat intelligence and ticketing systems, then running playbooks to automate investigation and response. Large environments have many heterogeneous tools, so integration is the main hurdle. It is solved with APIs, vendor connectors and custom scripts. Cost, user resistance and data volume are common project issues, but they are not the defining challenge of SOAR.

**ISO/IEC 27001:2022 附錄 A：** A.5.24 Information security incident management planning and preparation（資訊安全事故管理規劃及準備）；A.5.26 Response to information security incidents（資訊安全事故之回應）；A.8.16 Monitoring activities（監視活動）

**稽核小叮嚀：** 導入 SOAR 前，先確認事故應變程序已文件化且成熟。把混亂的流程自動化，只會更快地產生混亂。

### STD-06｜虛擬化與雲端運算｜難度 ★★

**An organization is considering adopting a cloud-based email service. Which security control is most important to ensure the confidentiality and integrity of email communications?**

某組織正考慮採用雲端電子郵件服務。為確保電子郵件通訊的機密性與完整性，下列哪一項安全控制措施最為重要？

- A. Email filtering and anti-spam measures　／　郵件過濾與反垃圾郵件機制
- B. Strong encryption for emails at rest and in transit　／　對靜態儲存與傳輸中的郵件進行高強度加密　**← 正確答案**
- C. Multi-factor authentication (MFA) for email access　／　郵件存取採用多因子驗證（MFA）
- D. Regular backups of email data　／　定期備份郵件資料

**解說：** 題目的關鍵字是「通訊內容」的機密性（Confidentiality）與完整性（Integrity）。對傳輸中（如 TLS）與靜態儲存的郵件加密，搭配 S/MIME 或 PGP 的數位簽章，才能直接確保內容不被窺看、不被竄改。MFA 保護的是「帳號存取」，對雲端郵件同樣非常重要，但它不直接保護郵件內容；郵件過濾處理垃圾信與惡意郵件；備份確保的是可用性（Availability）。

*Explanation:* The keywords are confidentiality and integrity of the communications. Encrypting email in transit (TLS) and at rest, plus S/MIME or PGP signing, directly protects content from disclosure and tampering. MFA protects account access and is very important for cloud mail, but it does not protect the message content itself. Filtering handles spam and malicious mail. Backups address availability.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）；A.5.14 Information transfer（資訊傳送）；A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

**稽核小叮嚀：** 實務上 MFA 與加密都要做。稽核時也可檢查郵件網域是否設定 SPF、DKIM、DMARC，以降低寄件者遭偽冒的風險。

### STD-07｜網路與基礎架構｜難度 ★

**A network administrator at a data processing company detects an unusual spike in outbound traffic. What type of attack might this indicate?**

一家資料處理公司的網路管理員偵測到「對外（outbound）流量」異常暴增，這可能代表哪一種攻擊？

- A. DDoS attack　／　分散式阻斷服務（DDoS）攻擊
- B. Phishing　／　網路釣魚
- C. Data exfiltration　／　資料外洩（資料遭竊取外傳）　**← 正確答案**
- D. Malware infection　／　惡意軟體感染

**解說：** 「對外」流量異常暴增，代表大量資料正從內部往外送，是資料外洩（Data Exfiltration）的典型徵兆：攻擊者入侵後，把資料打包傳送到外部的 C2 伺服器或雲端空間。若公司遭受 DDoS，看到的應是「對內（inbound）」流量暴增；網路釣魚是以郵件或訊息進行的社交工程手法，不會直接表現為流量型態；惡意軟體感染可能是根本原因，但「對外流量暴增」這個現象最直接指向資料外洩。補充：若內部主機被當成殭屍網路的一員對外發動攻擊，也會出現對外流量，因此仍須分析目的地、協定與時間點。

*Explanation:* A spike in outbound traffic means large volumes of data are leaving the network, a classic sign of exfiltration to an attacker's C2 server or cloud storage. A DDoS against the company would show up as an inbound spike. Phishing is a social engineering vector, not a traffic pattern. Malware may be the root cause, but the observed symptom points most directly to exfiltration. Hosts recruited into a botnet can also generate outbound traffic, so analysts should check destinations, protocols and timing.

**ISO/IEC 27001:2022 附錄 A：** A.8.16 Monitoring activities（監視活動）；A.8.12 Data leakage prevention（資料洩露預防）；A.8.20 Networks security（網路安全）

**稽核小叮嚀：** 建立網路流量基準線（Baseline）是偵測異常的前提。稽核時可詢問：監控機制是否會針對非上班時段、大量上傳至陌生目的地的流量發出告警？

### STD-08｜資料庫與大數據｜難度 ★

**In IT consulting, what is the primary role of artificial intelligence (AI) and machine learning (ML) technologies?**

在 IT 顧問服務中，人工智慧（AI）與機器學習（ML）技術的主要角色是什麼？

- A. Enhancing security protocols through AI-driven data encryption and threat detection　／　透過 AI 驅動的資料加密與威脅偵測，強化安全機制
- B. Streamlining financial operations through AI-based auditing and anomaly detection　／　透過以 AI 為基礎的稽核與異常偵測，簡化財務作業
- C. Conducting automated data analysis and developing intelligent systems for advanced problem-solving　／　進行自動化資料分析，並開發智慧系統以解決進階問題　**← 正確答案**
- D. Optimizing customer engagement strategies using ML algorithms in targeted email marketing campaigns　／　在精準電子郵件行銷活動中運用 ML 演算法，最佳化客戶互動策略

**解說：** AI／ML 的本質是「從資料中學習模式」，因此其核心角色是自動化資料分析，並據以建構能預測、分類、推薦與決策的智慧系統。其他選項都只是 AI 在單一領域（資安、財務、行銷）的應用案例，範圍過窄。另外要注意：「AI 驅動的資料加密」並不是正確概念。加密靠的是數學演算法（如 AES），AI 可以協助威脅偵測，但不負責加密。

*Explanation:* AI and ML learn patterns from data, so their core role is automated data analysis and building intelligent systems that predict, classify, recommend and decide. The other options are narrow applications in a single domain (security, finance, marketing). Note that 'AI-driven encryption' is not a real concept: encryption relies on mathematical algorithms such as AES.

**稽核小叮嚀：** 組織若導入 AI，可參考 ISO/IEC 42001:2023（AI 管理系統）。稽核時留意：餵給 AI 的資料是否含個資或機密？有沒有資料使用與輸出審查的規範？

### STD-09｜軟體開發與程式設計｜難度 ★

**A software development company is enhancing its SDLC. Which methodology would they most likely focus on to achieve flexibility and iterative development?**

一家軟體開發公司正在強化其軟體開發生命週期（SDLC）。若要達到彈性與迭代式開發，他們最可能採用哪一種方法論？

- A. Waterfall　／　瀑布式開發（Waterfall）
- B. Six Sigma　／　六標準差（Six Sigma）
- C. Agile　／　敏捷開發（Agile）　**← 正確答案**
- D. Lean　／　精實（Lean）

**解說：** 敏捷開發（Agile）以短週期的迭代（Sprint）持續交付可用的軟體，擁抱需求變更、重視團隊協作與客戶回饋，代表框架有 Scrum、Kanban。瀑布式開發依需求、設計、實作、測試、部署循序進行，前一階段完成才進入下一階段，彈性較低；六標準差是以 DMAIC 降低缺陷的品質管理方法；精實源自豐田生產系統，重點在消除浪費，雖然影響了敏捷思維，但本身不是迭代式的軟體開發方法論。（原 PDF 的機器翻譯把 Lean 譯成「瘦」，正確術語應為「精實」。）

*Explanation:* Agile delivers working software in short iterations (sprints), welcomes changing requirements and values collaboration and customer feedback. Scrum and Kanban are common frameworks. Waterfall runs phases sequentially and is less flexible. Six Sigma is a quality method (DMAIC) for reducing defects. Lean comes from the Toyota Production System and focuses on eliminating waste. It influenced Agile but is not an iterative SDLC methodology itself.

**ISO/IEC 27001:2022 附錄 A：** A.8.25 Secure development life cycle（安全開發生命週期）；A.5.8 Information security in project management（專案管理之資訊安全）

**稽核小叮嚀：** 敏捷不代表不用文件。稽核時可確認：每個 Sprint 是否納入資安需求（如安全使用者故事），完成定義（Definition of Done）中是否包含安全檢查？

### STD-10｜資訊安全｜難度 ★★

**Which cryptographic technique, often used in blockchain, allows parties to prove the authenticity and integrity of data without revealing the data itself?**

區塊鏈中常用的哪一種密碼技術，能讓參與方在「不揭露資料本身」的情況下，證明資料的真實性與完整性？

- A. Zero-knowledge proofs (ZKP)　／　零知識證明（ZKP）　**← 正確答案**
- B. Quantum key distribution (QKD)　／　量子金鑰分發（QKD）
- C. Post-quantum cryptography (PQC)　／　後量子密碼學（PQC）
- D. Lattice-based cryptography　／　晶格密碼學（Lattice-based Cryptography）

**解說：** 零知識證明讓「證明者」向「驗證者」證明某件事為真，卻不透露任何額外資訊，例如證明「我的年齡大於 18 歲」而不必揭露生日。區塊鏈上的 zk-SNARKs（如 Zcash 的隱私交易）、以太坊的 zk-Rollup 都是應用實例。量子金鑰分發是利用量子物理特性安全地傳遞金鑰；後量子密碼學是能抵抗量子電腦攻擊的演算法家族；晶格密碼學則是後量子密碼學中的一大類。它們都不是「不揭露資料而能證明真實性」的技術。

*Explanation:* A zero-knowledge proof lets a prover convince a verifier that a statement is true without revealing anything else, for example proving age over 18 without disclosing a birth date. zk-SNARKs (Zcash) and zk-rollups (Ethereum) are blockchain examples. QKD uses quantum physics to distribute keys. PQC is the family of algorithms resistant to quantum attacks, and lattice-based cryptography is one branch of PQC.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）；A.5.34 Privacy and protection of PII（隱私及個人可識別資訊保護）

**稽核小叮嚀：** 零知識證明屬於隱私強化技術（PETs），呼應個資保護的「資料最小化」原則，輔導 PIMS 時可作為延伸案例。

### STD-11｜網路與基礎架構｜難度 ★★

**An IT services company is implementing an intrusion detection system (IDS). Given the complexity of its network architecture, which IDS deployment strategy would provide the best balance of security and performance?**

一家 IT 服務公司正在建置入侵偵測系統（IDS）。考量其網路架構的複雜度，哪一種 IDS 部署策略能在安全性與效能之間取得最佳平衡？

- A. Host-based IDS on critical endpoints　／　僅在關鍵端點部署主機型 IDS（HIDS）
- B. Network-based IDS at the perimeter　／　僅在網路邊界部署網路型 IDS（NIDS）
- C. A hybrid IDS combining host-based and network-based systems　／　結合主機型與網路型的混合式 IDS　**← 正確答案**
- D. Application-based IDS on business-critical applications　／　僅在業務關鍵應用程式上部署應用程式型 IDS

**解說：** 主機型 IDS（HIDS）能看見主機內部的檔案完整性、日誌與程序行為，但只保護有安裝的主機，且會消耗主機資源；網路型 IDS（NIDS）能監看網段流量，但對加密流量與主機內部行為是盲點，只放在邊界還會漏掉內部的橫向移動；應用程式型 IDS 的範圍更窄。面對複雜架構，混合式部署在關鍵網段放 NIDS、在重要伺服器放 HIDS，兼顧可視性與效能，是縱深防禦的典型做法。

*Explanation:* A HIDS sees file integrity, logs and process activity on the host, but only on hosts where it is installed, and it consumes host resources. A NIDS watches network traffic but is blind to encrypted payloads and host internals, and a perimeter-only NIDS misses lateral movement. Application-based IDS is narrower still. In a complex network, a hybrid deployment (NIDS on key segments, HIDS on critical servers) balances visibility and performance.

**ISO/IEC 27001:2022 附錄 A：** A.8.16 Monitoring activities（監視活動）；A.8.20 Networks security（網路安全）

**稽核小叮嚀：** IDS 只負責「偵測」，誰在看告警、多久內處理才是重點。稽核時請索取告警處理紀錄，確認真的有人回應，而不是裝了就算。

### STD-12｜資訊安全｜難度 ★★★

**In IT services, particularly in cloud computing environments, which advanced authentication mechanism would provide the strongest defense against credential stuffing and phishing attacks, considering both compatibility and applicability?**

在 IT 服務（特別是雲端運算環境）中，同時考量相容性與適用性，哪一種進階身分驗證機制最能有效抵禦撞庫攻擊（Credential Stuffing）與網路釣魚？

- A. Two-factor authentication using biometrics　／　使用生物辨識的雙因子驗證
- B. Single sign-on (SSO) using OAuth　／　使用 OAuth 的單一登入（SSO）
- C. Multi-factor authentication including time-based one-time passwords (TOTP)　／　包含時間型一次性密碼（TOTP）的多因子驗證
- D. Passwordless authentication using WebAuthn　／　使用 WebAuthn 的無密碼驗證　**← 正確答案**

**解說：** WebAuthn（FIDO2 的核心標準）以公開金鑰密碼學取代密碼：私鑰保存在使用者的裝置或安全金鑰中，並與網站網域綁定。沒有密碼可供竊取，撞庫攻擊自然失效；釣魚網站的網域不同，裝置不會替它簽章，因此能抵抗釣魚，屬於「抗釣魚 MFA」。TOTP 驗證碼仍可能在即時中間人（AiTM）釣魚中被騙走；OAuth 本質上是授權框架，若 SSO 背後仍靠密碼登入，依然有撞庫與釣魚風險；生物辨識的效果取決於實作方式，跨平台相容性也較受限。WebAuthn 是 W3C 標準，主流瀏覽器與作業系統（例如 Passkey）皆支援，相容性與適用性俱佳。

*Explanation:* WebAuthn, the core of FIDO2, replaces passwords with public-key cryptography. The private key stays on the user's device or security key and is bound to the website's origin. With no password to steal, credential stuffing fails, and a phishing site on a different domain cannot get a valid signature, so it is phishing-resistant. TOTP codes can still be stolen by real-time adversary-in-the-middle phishing. OAuth is an authorization framework, and password-based SSO remains exposed. Biometrics depend on implementation and have weaker cross-platform compatibility. WebAuthn is a W3C standard supported by all major browsers and platforms (passkeys).

**ISO/IEC 27001:2022 附錄 A：** A.8.5 Secure authentication（安全鑑別）；A.5.17 Authentication information（鑑別資訊）

**稽核小叮嚀：** 美國 CISA 與 NIST SP 800-63B 都建議高權限帳號採用「抗釣魚 MFA」。稽核時可確認管理者帳號是否已從簡訊或 TOTP 升級為 FIDO2／Passkey。

### STD-13｜軟體開發與程式設計｜難度 ★★★

**In secure software development, which technique is crucial for identifying vulnerabilities related to race conditions and memory leaks?**

在安全軟體開發中，哪一種技術對於找出與「競爭條件（Race Condition）」和「記憶體洩漏（Memory Leak）」相關的漏洞最為關鍵？

- A. Static Application Security Testing (SAST)　／　靜態應用程式安全測試（SAST）
- B. Dynamic Application Security Testing (DAST)　／　動態應用程式安全測試（DAST）
- C. Interactive Application Security Testing (IAST)　／　互動式應用程式安全測試（IAST）　**← 正確答案**
- D. Software Composition Analysis (SCA)　／　軟體組成分析（SCA）

**解說：** 競爭條件與記憶體洩漏都和「執行期間」的時序、併發與實際記憶體配置有關，往往只有在程式真正執行時才會顯現。IAST 在執行中的應用程式內部植入代理程式（Agent）或插樁（Instrumentation），一邊執行測試，一邊觀察程式碼路徑、資料流、執行緒與記憶體使用，還能直接指出有問題的程式碼行數。SAST 不執行程式、只分析原始碼，能抓到部分模式，但對時序相依的問題容易漏報或誤報；DAST 從外部以黑箱方式測試，看不到程式內部的記憶體狀態；SCA 則是檢查第三方元件的已知漏洞（CVE）與授權條款。實務上會多種工具併用，C/C++ 專案也常搭配 AddressSanitizer、ThreadSanitizer 等動態分析工具。

*Explanation:* Race conditions and memory leaks depend on runtime timing, concurrency and real memory allocation, so they usually appear only while the program runs. IAST instruments the running application from inside and observes code paths, data flow, threads and memory during testing, pointing to the exact line of code. SAST analyzes source code without running it and struggles with timing-dependent issues. DAST tests from the outside as a black box and cannot see internal memory. SCA checks third-party components for known CVEs and licenses. In practice teams combine tools, and C/C++ projects add sanitizers such as AddressSanitizer and ThreadSanitizer.

**ISO/IEC 27001:2022 附錄 A：** A.8.29 Security testing in development and acceptance（開發及驗收中之安全測試）；A.8.28 Secure coding（安全程式設計）

**稽核小叮嚀：** 稽核 A.8.29 時，可請開發單位說明：哪些測試在 CI 管線中自動執行？上線前的安全測試報告與缺失追蹤紀錄放在哪裡？

### STD-14｜資訊安全｜難度 ★★★

**When implementing an enterprise-level Security Information and Event Management (SIEM) system, what is the primary challenge in correlating events from diverse sources in real time, and how can it be effectively addressed?**

在建置企業級資安資訊與事件管理（SIEM）系統時，即時關聯分析來自不同來源的事件，最主要的挑戰是什麼？又該如何有效解決？

- A. Data volume; addressed through big data analytics platforms　／　資料量龐大；透過大數據分析平台解決
- B. Event normalization; addressed using advanced machine learning algorithms for data parsing　／　事件正規化；運用先進的機器學習演算法進行資料解析　**← 正確答案**
- C. Network latency; mitigated by distributed SIEM collectors　／　網路延遲；透過分散式 SIEM 收集器緩解
- D. Alert fatigue; managed by implementing AI-based prioritization algorithms　／　告警疲勞；導入以 AI 為基礎的優先排序演算法來管理

**解說：** 關聯分析（Correlation）的前提，是資料「說同一種語言」。防火牆、AD、Linux syslog、雲端服務、應用程式日誌的格式、欄位名稱與時間格式各不相同，必須先解析（Parsing）並正規化（Normalization）成共同結構（如 CEF、Elastic Common Schema、OCSF），才能跨來源比對同一個 IP、帳號或事件；機器學習可協助解析未知或多變的格式。資料量是規模與成本問題；告警疲勞是關聯之後的下游問題；網路延遲的影響相對較小。另外別忘了，各來源的時間必須一致（NTP 校時），否則關聯結果會錯亂。

*Explanation:* Correlation requires all data to speak the same language. Firewalls, Active Directory, Linux syslog, cloud services and applications use different formats, field names and timestamps. Logs must be parsed and normalized into a common schema (CEF, Elastic Common Schema, OCSF) before events about the same IP or account can be linked, and ML can help parse unknown or changing formats. Volume is a scale and cost issue, alert fatigue is downstream of correlation, and latency matters less. Clock synchronization (NTP) is also essential.

**ISO/IEC 27001:2022 附錄 A：** A.8.15 Logging（存錄）；A.8.16 Monitoring activities（監視活動）；A.8.17 Clock synchronization（鐘訊同步）

**稽核小叮嚀：** 稽核 SIEM 時，可抽查一筆告警，往回追溯原始日誌，驗證時間戳記是否一致、欄位是否正確解析，並確認日誌保存期限符合法規要求。

### STD-15｜資訊安全｜難度 ★★

**Considering advances in quantum computing, which post-quantum cryptography approach should an IT consulting firm consider adopting for future-proof encryption of sensitive data?**

考量量子運算的發展，IT 顧問公司應考慮採用哪一種後量子密碼學方法，讓敏感資料的加密經得起未來的考驗？

- A. Elliptic Curve Cryptography (ECC)　／　橢圓曲線密碼學（ECC）
- B. Lattice-based cryptography　／　晶格密碼學（Lattice-based Cryptography）　**← 正確答案**
- C. RSA-4096 encryption　／　RSA-4096 位元加密
- D. Symmetric-key algorithms with increased key sizes　／　加大金鑰長度的對稱式金鑰演算法

**解說：** 量子電腦上的 Shor 演算法能有效破解 RSA 與 ECC 所依賴的數學難題（質因數分解、離散對數），金鑰再長也只是延緩，因此 RSA-4096 與 ECC 都不具抗量子能力。晶格密碼學是後量子密碼學的主流：NIST 於 2024 年 8 月發布的 FIPS 203（ML-KEM，源自 CRYSTALS-Kyber）與 FIPS 204（ML-DSA，源自 CRYSTALS-Dilithium）都以晶格為基礎。加大金鑰的對稱式演算法（如 AES-256）面對 Grover 演算法仍相當安全，也值得採用，但它無法取代公開金鑰的金鑰交換與數位簽章，因此不算是後量子密碼學的「方法」。

*Explanation:* Shor's algorithm on a quantum computer breaks the math behind RSA and ECC (factoring and discrete logarithms), and longer keys only delay that. Lattice-based cryptography is the leading PQC approach: NIST's FIPS 203 (ML-KEM, from CRYSTALS-Kyber) and FIPS 204 (ML-DSA, from CRYSTALS-Dilithium), published in August 2024, are both lattice-based. Larger symmetric keys such as AES-256 remain strong against Grover's algorithm and are still recommended, but they cannot replace public-key key exchange and signatures, so they are not a PQC approach.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）

**稽核小叮嚀：** 「先竊取、後解密（Harvest Now, Decrypt Later）」是現在就存在的威脅。可建議客戶先建立密碼資產清冊（Crypto Inventory），並規劃密碼敏捷性（Crypto Agility）。

### STD-16｜資訊安全｜難度 ★★

**A software development company is addressing advanced persistent threats (APTs). Which combination of strategies should be prioritized to effectively identify and mitigate these threats?**

一家軟體開發公司正在因應進階持續性威脅（APT）。應優先採取哪一組策略，才能有效識別並降低這類威脅？

- A. Implementing stateful firewalls and regular antivirus scans　／　建置狀態式防火牆並定期執行防毒掃描
- B. Deploying honeypots and conducting periodic penetration tests　／　部署蜜罐（誘捕系統）並定期進行滲透測試
- C. Leveraging threat intelligence feeds and employing behavior-based anomaly detection　／　運用威脅情資來源並採用行為式異常偵測　**← 正確答案**
- D. Increasing network segmentation and enhancing physical security controls　／　增加網路區隔並強化實體安全控制

**解說：** APT 的特性是隱匿、長期潛伏，常使用客製化惡意程式、零時差漏洞與「就地取材（Living off the Land）」手法，以特徵碼為主的防毒與防火牆很難察覺。威脅情資提供最新的入侵指標（IoC）與攻擊手法（TTPs，可對照 MITRE ATT&CK），行為式異常偵測（如 EDR、UEBA、NDR）則能發現不符合正常模式的活動，兩者結合最能「識別」APT。蜜罐與滲透測試有幫助，但屬於週期性作業；網路區隔能限制擴散，但無法發現已潛伏的攻擊者。

*Explanation:* APTs are stealthy and long-lived, using custom malware, zero-days and living-off-the-land techniques that signature-based antivirus and firewalls miss. Threat intelligence supplies current IoCs and TTPs (mapped to MITRE ATT&CK), and behavior-based detection (EDR, UEBA, NDR) spots activity that deviates from normal. Together they identify APTs best. Honeypots and pentests help but are periodic, and segmentation limits spread without detecting attackers already inside.

**ISO/IEC 27001:2022 附錄 A：** A.5.7 Threat intelligence（威脅情資）；A.8.16 Monitoring activities（監視活動）

**稽核小叮嚀：** A.5.7「威脅情資」是 ISO 27001:2022 新增的控制措施。稽核時可問：情資來源是什麼（例如 TWCERT/CC、產業 ISAC）？收到後如何評估，並轉成實際的防護動作？

### STD-17｜資訊安全｜難度 ★★

**In the context of hardware consulting, which advanced technique involves analyzing the electromagnetic emanations of electronic devices to extract sensitive information?**

在硬體顧問的情境中，哪一種進階技術是透過分析電子設備的電磁輻射來竊取敏感資訊？

- A. Microarchitectural attacks　／　微架構攻擊
- B. Rowhammer attacks　／　Rowhammer 攻擊（記憶體位元翻轉攻擊）
- C. Electromagnetic side-channel attacks　／　電磁側通道攻擊　**← 正確答案**
- D. Hardware-based rootkits　／　硬體型 Rootkit

**解說：** 電磁側通道攻擊（俗稱 TEMPEST、Van Eck phreaking）是擷取設備運作時洩漏的電磁波，還原螢幕畫面、鍵盤輸入，甚至推算出加密金鑰。微架構攻擊（如 Spectre、Meltdown）利用 CPU 的推測執行與快取時序；Rowhammer 是反覆存取 DRAM 的某一列，使相鄰列的位元翻轉；硬體型 Rootkit 是把惡意程式植入韌體或硬體中。對策包括電磁屏蔽（法拉第籠）、使用符合 TEMPEST 規範的設備，以及保持足夠的實體距離。

*Explanation:* Electromagnetic side-channel attacks (TEMPEST, Van Eck phreaking) capture electromagnetic emissions from operating devices to reconstruct screen contents, keystrokes or even cryptographic keys. Microarchitectural attacks such as Spectre and Meltdown abuse speculative execution and cache timing. Rowhammer repeatedly accesses DRAM rows to flip bits in neighboring rows. Hardware rootkits implant malicious code in firmware or hardware. Countermeasures include shielding (Faraday cages), TEMPEST-rated equipment and physical distance.

**ISO/IEC 27001:2022 附錄 A：** A.7.8 Equipment siting and protection（設備安置及保護）

**稽核小叮嚀：** ISO/IEC 27002 的設備安置與保護指引有提到電磁洩漏風險。處理高機敏資訊的場所（如國防、金融機房）可評估電磁屏蔽的需求。

### STD-18｜資訊安全｜難度 ★★

**An IT hardware manufacturer is facing a significant increase in counterfeit products entering the market. From an information security perspective, which of the following poses the greatest risk to the company's reputation and customer trust?**

一家 IT 硬體製造商發現市場上的仿冒產品大幅增加。從資訊安全的角度來看，下列何者對公司聲譽與客戶信任構成最大風險？

- A. Revenue loss due to counterfeit sales　／　仿冒品銷售造成的營收損失
- B. Potential legal liabilities arising from product failures　／　產品故障可能衍生的法律責任
- C. Damage to brand image and customer loyalty　／　品牌形象與客戶忠誠度受損
- D. Introduction of vulnerabilities into the supply chain through counterfeit hardware　／　仿冒硬體將漏洞帶入供應鏈　**← 正確答案**

**解說：** 題目要求「從資訊安全的角度」思考。仿冒硬體可能內含後門、被竄改的韌體或劣質元件，也收不到原廠的安全更新；一旦流入客戶環境，就可能造成資料外洩或系統遭入侵，這才是侵蝕客戶信任的根本資安風險。營收損失、法律責任屬於商業與法務面的後果；品牌形象受損則是「結果」，而不是資安風險本身。

*Explanation:* The question asks for the information security perspective. Counterfeit hardware may contain backdoors, tampered firmware or substandard components, and it receives no vendor security updates. Once it reaches customers, it can lead to breaches, and that is the root security risk that erodes trust. Revenue loss and legal liability are business and legal consequences, and brand damage is the outcome rather than the security risk itself.

**ISO/IEC 27001:2022 附錄 A：** A.5.19 Information security in supplier relationships（供應者關係中之資訊安全）；A.5.21 Managing information security in the ICT supply chain（管理ICT供應鏈中之資訊安全）

**稽核小叮嚀：** 供應鏈安全是近年稽核熱點。可確認客戶是否只向授權通路採購、驗收時是否檢查序號與韌體簽章，並要求供應商提供 SBOM／HBOM。

### STD-19｜資訊安全｜難度 ★

**An IT consulting firm faces a sophisticated cyberattack aimed at stealing intellectual property. Which type of attack most likely represents this situation?**

一家 IT 顧問公司遭遇以竊取智慧財產為目的的複雜網路攻擊。下列哪一種攻擊類型最可能符合此情境？

- A. Advanced Persistent Threat (APT), characterized by prolonged and stealthy operations to steal sensitive data　／　進階持續性威脅（APT）：以長期、隱匿的行動竊取敏感資料　**← 正確答案**
- B. Spear phishing aimed at gaining privileged access through targeted social engineering　／　魚叉式網路釣魚：透過鎖定目標的社交工程取得特權存取
- C. Cryptojacking that covertly uses the firm's computing resources for cryptocurrency mining　／　加密貨幣挖礦劫持（Cryptojacking）：暗中占用公司運算資源挖礦
- D. A zero-day exploit leveraging unknown vulnerabilities to infiltrate IT infrastructure　／　零時差漏洞攻擊：利用未知漏洞滲透 IT 基礎設施

**解說：** 攻擊目的是「竊取智慧財產」且手法「複雜」，最符合 APT 的特徵：攻擊者（常為國家級或組織化團體）長期潛伏、低調橫向移動，持續竊取機密。魚叉式釣魚與零時差漏洞都是 APT 常用的「入侵手段（初始存取）」，而不是整體的攻擊類型；加密貨幣挖礦劫持的目標是運算資源，而不是智慧財產。

*Explanation:* The goal is stealing intellectual property through a sophisticated campaign, which matches an APT: often state-backed or organized groups that persist quietly, move laterally and exfiltrate secrets over time. Spear phishing and zero-day exploits are initial access techniques an APT may use, not the overall attack type. Cryptojacking targets computing resources, not intellectual property.

**ISO/IEC 27001:2022 附錄 A：** A.5.7 Threat intelligence（威脅情資）；A.8.16 Monitoring activities（監視活動）；A.5.12 Classification of information（資訊之分類分級）

**稽核小叮嚀：** 保護智慧財產，要先知道「寶藏在哪裡」。稽核時可確認資訊分類分級是否落實，最高機密資料是否有額外的存取監控。

### STD-20｜資訊安全｜難度 ★★★

**In data processing, which cryptographic technique aims to provide both confidentiality and authentication by ensuring that data can only be decrypted by the intended recipient?**

在資料處理中，哪一種密碼技術能同時提供機密性與鑑別性，確保資料只能由預期的接收者解密？

- A. Digital signatures　／　數位簽章
- B. Hash functions　／　雜湊函數
- C. Public Key Infrastructure (PKI)　／　公開金鑰基礎建設（PKI）
- D. Authenticated Encryption with Associated Data (AEAD)　／　鑑別加密（AEAD，含關聯資料的鑑別加密）　**← 正確答案**

**解說：** AEAD 是「一次同時完成加密與鑑別」的密碼技術，代表演算法有 AES-GCM 與 ChaCha20-Poly1305。只有持有正確金鑰的接收者能解密，而且解密時會同時驗證鑑別標籤（Tag）；資料只要被竄改一個位元，解密就會失敗，因此兼顧機密性、完整性與來源鑑別。數位簽章提供鑑別與不可否認性，但不提供機密性；雜湊函數只能驗證完整性；PKI 是管理公開金鑰與憑證的「基礎建設」（CA、憑證政策、註冊機構等），讓加密與簽章得以運作，但它本身不是一種加密技術。實務上，TLS 1.3 就是用 PKI 驗證伺服器身分，再用 AEAD 保護傳輸的每一筆資料。

*Explanation:* AEAD performs encryption and authentication in one operation; AES-GCM and ChaCha20-Poly1305 are common examples. Only a recipient with the correct key can decrypt, and decryption also verifies an authentication tag, so any tampering makes decryption fail. That gives confidentiality, integrity and authenticity together. Digital signatures provide authenticity and non-repudiation but no confidentiality. Hash functions only check integrity. PKI is the infrastructure (CAs, certificate policies, registration) that manages keys and certificates; it enables encryption but is not an encryption technique itself. TLS 1.3 uses PKI to authenticate the server and AEAD to protect every record.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）

**稽核小叮嚀：** 審閱加密政策時，可確認是否明訂允許使用的演算法與模式（例如 AES-GCM），並禁止 ECB 等不安全的模式。

### STD-21｜虛擬化與雲端運算｜難度 ★

**In IT consulting, ISO/IEC 27017 provides guidelines for which area?**

在 IT 顧問領域中，ISO/IEC 27017 提供的是哪一方面的指引？

- A. Data protection　／　資料保護
- B. Cloud services　／　雲端服務　**← 正確答案**
- C. Software development　／　軟體開發
- D. Quality management　／　品質管理

**解說：** ISO/IEC 27017:2015 是「以 ISO/IEC 27002 為基礎之雲端服務資訊安全控制措施作業規範」，同時針對雲端服務提供者（CSP）與雲端服務客戶（CSC）提供實作指引，並額外增加 7 項雲端專屬控制措施（CLD 系列），例如共同責任的角色與權責、虛擬機器強化、雲端服務客戶資產的移除等。相關標準：ISO/IEC 27018 是公有雲擔任個資處理者時的個資保護作業規範；ISO/IEC 27701 是隱私資訊管理系統（PIMS）；品質管理則是 ISO 9001。

*Explanation:* ISO/IEC 27017:2015 is the code of practice for information security controls for cloud services, based on ISO/IEC 27002. It gives guidance to both cloud service providers and cloud service customers and adds seven cloud-specific controls (the CLD series), such as shared roles and responsibilities, virtual machine hardening and removal of customer assets. Related standards: ISO/IEC 27018 covers PII protection in public clouds acting as processors, ISO/IEC 27701 covers privacy information management (PIMS), and ISO 9001 covers quality management.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

**稽核小叮嚀：** 常見的驗證組合：ISO 27001 + 27017 + 27018（再加上 27701）。輔導雲端服務商時，可協助對照 CSP 與 CSC 雙方的責任分工表。

### STD-22｜資訊安全｜難度 ★

**In the field of hardware manufacturing, which advanced threat actor specializes in creating malicious hardware implants that could compromise hardware security?**

在硬體製造領域中，哪一類進階威脅行為者專門製作可能危及硬體安全的惡意硬體植入物？

- A. Nation-state actors　／　國家級威脅行為者（國家支持的駭客組織）　**← 正確答案**
- B. Insider threats　／　內部人員威脅
- C. Script kiddies　／　腳本小子（Script Kiddies）
- D. Denial-of-service (DoS) attackers　／　阻斷服務（DoS）攻擊者

**解說：** 製作惡意硬體植入物需要龐大資源、先進的工程能力，以及介入供應鏈的管道，通常只有國家級威脅行為者具備。2013 年 Snowden 文件揭露的 NSA ANT 目錄中，就包含多種硬體植入工具。內部人員可能協助植入，但並非「專門製作」；腳本小子只會使用現成工具；DoS 攻擊者的目標是破壞可用性。

*Explanation:* Building malicious hardware implants requires large budgets, advanced engineering and access to the supply chain, which typically only nation-state actors have. The NSA ANT catalog revealed in the 2013 Snowden documents included several hardware implants. Insiders may help plant devices but do not specialize in building them, script kiddies use ready-made tools, and DoS attackers target availability.

**ISO/IEC 27001:2022 附錄 A：** A.5.21 Managing information security in the ICT supply chain（管理ICT供應鏈中之資訊安全）；A.5.7 Threat intelligence（威脅情資）

**稽核小叮嚀：** 台灣是全球電子供應鏈重鎮，硬體供應鏈安全格外重要。可參考 NIST SP 800-161 的網路安全供應鏈風險管理（C-SCRM）。

### STD-23｜虛擬化與雲端運算｜難度 ★★

**A company is transitioning to cloud-based infrastructure. Which cloud service model is best suited to ensuring shared responsibility for security between the company and the cloud provider?**

一家公司正在轉移到雲端基礎架構。哪一種雲端服務模式最適合確保公司與雲端供應商之間「共同承擔」資安責任？

- A. Infrastructure as a Service (IaaS)　／　基礎設施即服務（IaaS）　**← 正確答案**
- B. Platform as a Service (PaaS)　／　平台即服務（PaaS）
- C. Software as a Service (SaaS)　／　軟體即服務（SaaS）
- D. Function as a Service (FaaS)　／　函式即服務（FaaS）

**解說：** 在 IaaS 模式中，雲端供應商負責實體機房、硬體、網路與虛擬化層（Hypervisor）的安全；客戶則負責作業系統、中介軟體、應用程式、資料、身分與存取管理、防火牆規則等。雙方都承擔大量且分工明確的責任，是「責任共擔模型（Shared Responsibility Model）」最典型的情境。愈往 PaaS、FaaS、SaaS 移動，供應商承擔的部分愈多；但無論哪一種模式，資料、帳號與存取權限永遠是客戶的責任。

*Explanation:* In IaaS, the provider secures the physical data center, hardware, network and hypervisor, while the customer secures the OS, middleware, applications, data, identity and access management and firewall rules. Both parties hold large, clearly divided responsibilities, the textbook case of the shared responsibility model. Moving toward PaaS, FaaS and SaaS shifts more to the provider, but data, accounts and access rights always stay with the customer.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

**稽核小叮嚀：** 稽核雲端時最常見的落差：客戶以為「上雲了，安全就是雲端廠商的事」。請客戶拿出責任分工表（RACI），逐項說明由誰負責。

### STD-24｜IT服務管理與維運｜難度 ★

**In an IT consulting company, what is the primary reason for implementing a robust Mobile Device Management (MDM) strategy?**

在 IT 顧問公司中，建立完善的行動裝置管理（MDM）策略，最主要的原因是什麼？

- A. To ensure the secure integration of mobile devices into the corporate network to prevent data breaches　／　確保行動裝置安全地接入公司網路，以防止資料外洩　**← 正確答案**
- B. To facilitate efficient allocation and management of mobile devices to optimize operational workflows　／　促進行動裝置的分配與管理效率，以最佳化營運流程
- C. To enhance the collaborative work environment by ensuring consistency and compatibility across mobile devices　／　確保行動裝置間的一致性與相容性，以強化協作環境
- D. To establish a professional corporate image by standardizing mobile device usage and security practices　／　透過標準化行動裝置的使用與安全實務，建立專業的企業形象

**解說：** MDM 的首要目的是「安全」：強制螢幕鎖定與密碼、裝置加密、遺失時遠端鎖定或抹除、控管可安裝的 App、將公務資料與個人資料隔離（BYOD 的工作設定檔），並且只有在裝置符合政策時才允許存取公司資源，以防止資料外洩。資產分配效率、協作一致性、企業形象都只是附帶效益。

*Explanation:* The primary purpose of MDM is security: enforcing screen locks and passcodes, device encryption, remote lock or wipe, app control, separating work and personal data (BYOD work profiles) and allowing access only from compliant devices, all to prevent data breaches. Allocation efficiency, consistency and corporate image are secondary benefits.

**ISO/IEC 27001:2022 附錄 A：** A.8.1 User endpoint devices（使用者端點裝置）；A.6.7 Remote working（遠端工作）

**稽核小叮嚀：** 若員工使用個人手機（BYOD）處理公務，要特別注意遠端抹除的範圍與事前告知，避免侵害員工的個人資料與隱私。

### STD-25｜網路與基礎架構｜難度 ★

**In an IT services environment, why is network segmentation a critical security control?**

在 IT 服務環境中，為什麼網路區隔（Network Segmentation）是一項關鍵的安全控制措施？

- A. It improves overall network performance and reduces latency, enhancing user experience　／　它能提升整體網路效能並降低延遲，改善使用者體驗
- B. Network segmentation limits the spread of cyber threats and isolates security breaches　／　網路區隔能限制網路威脅的擴散，並隔離資安事件的影響範圍　**← 正確答案**
- C. It simplifies network management and maintenance tasks for IT staff　／　它能簡化 IT 人員的網路管理與維護工作
- D. Segmentation helps allocate bandwidth more effectively for critical applications　／　區隔有助於更有效地為關鍵應用程式分配頻寬

**解說：** 網路區隔的核心價值是「圍堵」：把網路切成不同區域（如使用者區、伺服器區、DMZ、OT 區），區域之間以防火牆或存取控制清單（ACL）限制流量。一旦某區遭入侵，攻擊者難以橫向移動（例如勒索軟體在內網擴散），損害被限縮在局部。效能、管理便利、頻寬分配只是可能的附帶效果；事實上，區隔往往會增加管理複雜度。

*Explanation:* The core value of segmentation is containment. The network is divided into zones (users, servers, DMZ, OT) with firewalls or ACLs between them, so an intruder in one zone struggles to move laterally, as ransomware does, and damage stays local. Performance, easier management and bandwidth allocation are side effects at most, and segmentation often adds management complexity.

**ISO/IEC 27001:2022 附錄 A：** A.8.22 Segregation of networks（網路區隔）

**稽核小叮嚀：** 看網路架構圖時，問一句：「如果這台使用者電腦中毒，它連得到核心資料庫嗎？」答案若是肯定的，就是區隔不足。

### STD-26｜資訊安全｜難度 ★★

**A cybersecurity consulting firm has been hired to assess the security posture of a large e-commerce platform. During the assessment, the consultants discover that the platform uses outdated encryption algorithms to protect customer payment data. What is the most critical risk associated with this finding?**

一家資安顧問公司受託評估大型電商平台的安全狀態。評估過程中，顧問發現該平台使用過時的加密演算法來保護客戶支付資料。與此發現相關的最關鍵風險是什麼？

- A. Increased computational overhead on the platform's servers　／　平台伺服器的運算負擔增加
- B. Potential non-compliance with industry security standards　／　可能不符合產業安全標準
- C. Vulnerability to brute-force attacks due to weaker encryption　／　加密強度不足，容易遭受暴力破解攻擊　**← 正確答案**
- D. Limited compatibility with modern web browsers　／　與新版網頁瀏覽器的相容性受限

**解說：** 過時的演算法（如 DES、3DES、RC4，或以 MD5、SHA-1 做完整性驗證）金鑰太短或存在已知弱點，攻擊者可透過暴力破解或密碼分析取回明文，導致信用卡等支付資料直接外洩，這是最直接、最嚴重的風險。不符合 PCI DSS 等產業標準確實是問題，但它是「後果」而非最根本的風險；運算負擔與瀏覽器相容性則與資料遭竊的風險關係較小。

*Explanation:* Outdated algorithms such as DES, 3DES, RC4, or MD5/SHA-1 for integrity have short keys or known weaknesses. Attackers can brute-force or cryptanalyze them to recover payment data in plaintext, which is the most direct and severe risk. Non-compliance with PCI DSS is real, but it is a consequence rather than the root risk. Server overhead and browser compatibility matter far less.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）

**稽核小叮嚀：** 撰寫顧問報告的風險排序原則：先寫「資料可能被竊取」的實質衝擊，再寫「不符合法規標準」的合規衝擊，管理階層比較容易理解優先順序。

### STD-27｜資訊安全｜難度 ★

**A software consulting firm is contracted to develop an application that processes the personal data of EU citizens. Which regulation must they comply with?**

一家軟體顧問公司受託開發一套處理歐盟公民個人資料的應用程式，他們必須遵循哪一項法規？

- A. CCPA　／　CCPA（美國加州消費者隱私法）
- B. HIPAA　／　HIPAA（美國健康保險可攜與責任法）
- C. GDPR　／　GDPR（歐盟一般資料保護規則）　**← 正確答案**
- D. CISA　／　CISA（美國網路安全暨基礎設施安全局；亦為 ISACA 資訊系統稽核師證照）

**解說：** GDPR（Regulation (EU) 2016/679）自 2018 年 5 月 25 日起施行，具域外效力（第 3 條）：只要對位於歐盟境內的個人提供商品或服務，或監控其行為，即使公司不在歐盟也須遵循。精確來說，GDPR 保護的是「位於歐盟境內的資料主體」，不限於歐盟公民。受託開發者通常是「處理者（Processor）」，須依第 28 條簽訂資料處理協議，並落實第 25 條「設計及預設之資料保護（Privacy by Design and by Default）」。CCPA 適用於加州居民；HIPAA 規範美國的健康資訊；CISA 是美國的資安機構，也是 ISACA 資訊系統稽核師證照的名稱，都不是本題所需的隱私法規。台灣對應的法規則是《個人資料保護法》。（原 PDF 把 HIPAA 譯成「HIPAA 協定」並不精確，它是一部法案。）

*Explanation:* GDPR (Regulation (EU) 2016/679) has applied since 25 May 2018 and has extraterritorial reach under Article 3: offering goods or services to, or monitoring, people in the EU triggers it even for non-EU companies. Strictly, it protects data subjects in the EU, not only EU citizens. A contracted developer usually acts as a processor, needs an Article 28 data processing agreement and must apply privacy by design and by default (Article 25). CCPA covers California residents, HIPAA covers US health information, and CISA is a US agency and an ISACA audit certification, not the privacy law this case needs.

**ISO/IEC 27001:2022 附錄 A：** A.5.31 Legal, statutory, regulatory and contractual requirements（法律、法令、法規及契約要求事項）；A.5.34 Privacy and protection of PII（隱私及個人可識別資訊保護）

**稽核小叮嚀：** 輔導 PIMS（ISO/IEC 27701）時，可用 GDPR 的控制者／處理者角色，協助客戶釐清自己在每個處理活動中的責任。

### STD-28｜資訊安全｜難度 ★★

**An IT infrastructure provider is implementing a defense-in-depth strategy to protect against cyber threats. Which of the following security controls would be considered a preventive measure in this approach?**

一家 IT 基礎設施供應商正在實施縱深防禦策略以抵禦網路威脅。下列哪一項安全控制措施屬於「預防性」措施？

- A. Intrusion Detection System (IDS)　／　入侵偵測系統（IDS）
- B. Security Information and Event Management (SIEM)　／　資安資訊與事件管理（SIEM）
- C. Incident Response Plan (IRP)　／　資安事件應變計畫（IRP）
- D. Web Application Firewall (WAF)　／　網站應用程式防火牆（WAF）　**← 正確答案**

**解說：** 控制措施依功能可分為預防性（Preventive）、偵測性（Detective）與矯正性（Corrective）。WAF 會在惡意 HTTP 請求（如 SQL 隱碼攻擊、XSS）抵達應用程式之前就加以阻擋，屬於預防性控制。IDS 與 SIEM 負責發現與告警，屬於偵測性控制；事件應變計畫是在事件發生後進行處置與復原，屬於矯正性控制。ISO/IEC 27002:2022 為每項控制措施加上「控制類型」屬性，正是以這三類來標示。

*Explanation:* Controls are classified as preventive, detective or corrective. A WAF blocks malicious HTTP requests such as SQL injection and XSS before they reach the application, so it is preventive. IDS and SIEM discover and alert, which makes them detective. An incident response plan handles and recovers from incidents after they happen, so it is corrective. ISO/IEC 27002:2022 tags every control with a control type attribute using exactly these three categories.

**ISO/IEC 27001:2022 附錄 A：** A.8.20 Networks security（網路安全）；A.8.26 Application security requirements（應用程式安全要求事項）

**稽核小叮嚀：** 常見陷阱：IPS（入侵防禦系統）會主動阻擋，屬於預防性；IDS 只偵測不阻擋，屬於偵測性。

### STD-29｜資訊安全｜難度 ★★

**An IT consulting firm is advising clients on data leakage prevention strategies. In the context of Data Loss Prevention (DLP), which technology most effectively prevents sensitive data from leaking through endpoints?**

一家 IT 顧問公司正在為客戶提供資料外洩防護策略建議。就資料外洩防護（DLP）而言，哪一種技術最能有效防止敏感資料經由端點外洩？

- A. Network traffic analysis and anomaly detection　／　網路流量分析與異常偵測
- B. Encryption of data at rest and in transit　／　對靜態與傳輸中的資料加密
- C. Content-aware DLP with contextual analysis　／　具備情境分析能力的內容感知型 DLP　**← 正確答案**
- D. Strong access controls and authentication　／　嚴格的存取控制與身分驗證

**解說：** 端點 DLP 代理程式能辨識「內容」（關鍵字、正規表示式比對，例如信用卡號、身分證字號、文件指紋、機器學習分類），並結合「情境」（誰、用哪個程式、要傳到哪裡：USB、雲端硬碟、列印、剪貼簿、即時通訊）即時判斷，進行阻擋、警示或記錄。加密防的是未授權者，但「有權限的人」仍可能把資料帶走；網路流量分析看不到 USB 等離線管道；存取控制同樣擋不住合法使用者的不當外傳。

*Explanation:* An endpoint DLP agent recognizes content (keywords, regex patterns such as card or national ID numbers, document fingerprints, ML classifiers) and combines it with context (who, which app, which destination: USB, cloud drive, printing, clipboard, messaging) to block, warn or log in real time. Encryption stops unauthorized parties, but authorized users can still walk off with data. Network analysis misses offline channels such as USB, and access controls do not stop legitimate users from misusing data.

**ISO/IEC 27001:2022 附錄 A：** A.8.12 Data leakage prevention（資料洩露預防）；A.5.12 Classification of information（資訊之分類分級）

**稽核小叮嚀：** DLP 規則要建立在「資訊分類分級」之上。若客戶連機密資料的定義都沒有，先回頭補分類分級，再談 DLP。

### STD-30｜資訊安全｜難度 ★

**Which strategy is crucial for mitigating insider threats in an IT consulting firm?**

對 IT 顧問公司而言，哪一種策略是降低內部人員威脅的關鍵？

- A. Implementing strict physical security controls across all company facilities　／　在公司所有場所實施嚴格的實體安全控制
- B. Regularly updating and patching all software and network systems　／　定期更新並修補所有軟體與網路系統
- C. Establishing comprehensive user behavior analytics and monitoring systems　／　建立完善的使用者行為分析（UEBA）與監控機制　**← 正確答案**
- D. Enhancing client-side data encryption protocols across the IT infrastructure　／　強化整個 IT 基礎架構的用戶端資料加密機制

**解說：** 內部人員本來就擁有合法的帳號與權限，實體門禁、系統修補、加密這些主要針對外部攻擊者的防線，對他們的效果有限。使用者與實體行為分析（UEBA）會建立每個人的正常行為基準並偵測異常，例如離職前大量下載、非上班時間存取、突然存取與職務無關的資料。實務上還要搭配最小權限、職務區隔、人員背景查核、資安認知教育，以及離職時即時收回權限。

*Explanation:* Insiders already hold legitimate accounts and permissions, so physical security, patching and encryption, which mainly target outsiders, help little. UEBA builds a baseline of each person's normal behavior and flags anomalies such as mass downloads before resignation, off-hours access or touching data unrelated to the job. Combine it with least privilege, segregation of duties, screening, awareness training and prompt removal of access at termination.

**ISO/IEC 27001:2022 附錄 A：** A.8.16 Monitoring activities（監視活動）；A.6.1 Screening（篩選）；A.5.3 Segregation of duties（職務區隔）；A.8.2 Privileged access rights（特殊存取權限）

**稽核小叮嚀：** 監控員工行為涉及個資，應事先在工作規則或政策中告知員工，符合《個人資料保護法》的告知義務與比例原則。


## AI 生成 70 題

### AI-01｜網路與基礎架構｜難度 ★

**At which layer of the OSI model does a router primarily operate when it forwards packets based on IP addresses?**

路由器依據 IP 位址轉送封包時，主要運作在 OSI 模型的哪一層？

- A. Layer 2 – Data Link　／　第 2 層：資料鏈結層
- B. Layer 3 – Network　／　第 3 層：網路層　**← 正確答案**
- C. Layer 4 – Transport　／　第 4 層：傳輸層
- D. Layer 7 – Application　／　第 7 層：應用層

**解說：** OSI 七層由下而上為：實體層、資料鏈結層、網路層、傳輸層、會議層、表現層、應用層。路由器依據 IP 位址決定封包要往哪個網路送，屬於第 3 層網路層設備。第 2 層的交換器依據 MAC 位址轉送；第 4 層處理 TCP／UDP 與連接埠；第 7 層則是 HTTP、DNS、SMTP 等應用協定。了解分層，才能判斷防火牆、WAF、IPS 各自看得到哪些資訊。

*Explanation:* The OSI layers from bottom to top are Physical, Data Link, Network, Transport, Session, Presentation and Application. A router chooses where to send packets based on IP addresses, which is Layer 3. Layer 2 switches forward by MAC address, Layer 4 handles TCP/UDP and ports, and Layer 7 covers protocols such as HTTP, DNS and SMTP. Knowing the layers tells you what a firewall, WAF or IPS can see.

**ISO/IEC 27001:2022 附錄 A：** A.8.20 Networks security（網路安全）

**稽核小叮嚀：** 口訣（由上而下）：「應表會傳網鏈實」。稽核時聽到「L7 防火牆」，就知道它能檢查應用層內容，不只看 IP 與連接埠。

### AI-02｜網路與基礎架構｜難度 ★

**An employee cannot open the company intranet portal by its domain name, but the portal loads normally when accessed by its IP address. Which service is most likely failing?**

員工以網域名稱無法開啟公司內部入口網站，但直接輸入 IP 位址卻可以正常連線。最可能是哪一項服務出了問題？

- A. DHCP　／　DHCP（動態主機設定協定）
- B. NTP　／　NTP（網路時間協定）
- C. DNS　／　DNS（網域名稱系統）　**← 正確答案**
- D. SMTP　／　SMTP（簡易郵件傳輸協定）

**解說：** DNS 負責把網域名稱（如 portal.company.com）解析成 IP 位址，相當於網路世界的電話簿。用 IP 能連、用名稱不能連，代表網路本身是通的，問題出在名稱解析。DHCP 負責自動配發 IP 位址；NTP 負責校時；SMTP 負責寄送郵件。DNS 也是資安重點：DNS 過濾可阻擋惡意網域，但攻擊者也可能利用 DNS 通道（DNS Tunneling）偷傳資料。

*Explanation:* DNS translates domain names such as portal.company.com into IP addresses, like a phone book for the network. If the IP works but the name does not, the network path is fine and name resolution is failing. DHCP assigns IP addresses automatically, NTP synchronizes time and SMTP sends email. DNS also matters for security: DNS filtering blocks malicious domains, while attackers may abuse DNS tunneling to exfiltrate data.

**ISO/IEC 27001:2022 附錄 A：** A.8.21 Security of network services（網路服務之安全）；A.8.23 Web filtering（網頁過濾）

**稽核小叮嚀：** 疑難排解小技巧：Windows 可用 nslookup、Linux 可用 dig，直接檢查名稱解析的結果。

### AI-03｜網路與基礎架構｜難度 ★★

**During a firewall rule review, an auditor finds an inbound rule allowing TCP port 3389 from any source on the internet. Which service does this expose, and why is it a concern?**

稽核員在審查防火牆規則時，發現一條允許網際網路任意來源連入 TCP 3389 埠的規則。這會暴露哪一項服務？為什麼令人擔憂？

- A. SSH; it exposes Linux servers to remote command execution　／　SSH；讓 Linux 伺服器暴露於遠端指令執行的風險
- B. SMB; it allows file-sharing worms to spread　／　SMB；讓檔案分享蠕蟲得以擴散
- C. HTTPS; it exposes internal web applications　／　HTTPS；暴露內部的網頁應用程式
- D. RDP; it is a frequent target of brute-force attacks and a common initial access path for ransomware　／　RDP（遠端桌面協定）；它是暴力破解的熱門目標，也是勒索軟體常見的初始入侵途徑　**← 正確答案**

**解說：** TCP 3389 是 Windows 遠端桌面（RDP）的預設連接埠。RDP 直接暴露在網際網路上，會持續遭受密碼暴力破解與撞庫，過去也有 BlueKeep（CVE-2019-0708）等嚴重漏洞，是勒索軟體最常見的入侵途徑之一。常見連接埠：SSH 為 22、SMB 為 445、HTTPS 為 443、Telnet 為 23、FTP 為 21、DNS 為 53。正確做法是關閉對外的 3389，改經 VPN 或零信任存取閘道並搭配 MFA，同時限制來源 IP。

*Explanation:* TCP 3389 is the default port for Windows Remote Desktop (RDP). RDP exposed to the internet faces constant brute-force and credential-stuffing attempts, has had critical flaws such as BlueKeep (CVE-2019-0708) and is one of the most common ransomware entry points. Common ports: SSH 22, SMB 445, HTTPS 443, Telnet 23, FTP 21, DNS 53. Close 3389 to the internet and use a VPN or zero-trust access gateway with MFA and source IP restrictions.

**ISO/IEC 27001:2022 附錄 A：** A.8.20 Networks security（網路安全）；A.8.5 Secure authentication（安全鑑別）

**稽核小叮嚀：** 防火牆規則審查三問：來源是不是 Any？有沒有業務需求與核准紀錄？最後一次檢視規則是什麼時候？

### AI-04｜網路與基礎架構｜難度 ★★

**Which of the following IP addresses belongs to a private address range defined in RFC 1918 and is not routable on the public internet?**

下列哪一個 IP 位址屬於 RFC 1918 定義的私有位址範圍，無法在公眾網際網路上路由？

- A. 172.20.10.5　／　172.20.10.5　**← 正確答案**
- B. 8.8.8.8　／　8.8.8.8
- C. 172.32.1.1　／　172.32.1.1
- D. 192.169.1.1　／　192.169.1.1

**解說：** RFC 1918 定義三段私有位址：10.0.0.0/8（10.x.x.x）、172.16.0.0/12（172.16.0.0～172.31.255.255）、192.168.0.0/16（192.168.x.x）。172.20.10.5 落在 172.16～172.31 之間，屬於私有位址。172.32.1.1 剛好超出範圍；192.169.1.1 不是 192.168；8.8.8.8 是 Google 的公共 DNS。私有位址要上網，必須透過 NAT 轉換成公有位址。

*Explanation:* RFC 1918 defines three private ranges: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. 172.20.10.5 falls inside 172.16–172.31, so it is private. 172.32.1.1 is just outside the range, 192.169.1.1 is not 192.168, and 8.8.8.8 is Google's public DNS. Private hosts reach the internet through NAT.

**ISO/IEC 27001:2022 附錄 A：** A.8.20 Networks security（網路安全）

**稽核小叮嚀：** 看網路架構圖時，若伺服器標示的是公有 IP，記得追問它是否直接暴露在網際網路上。

### AI-05｜網路與基礎架構｜難度 ★

**A company wants remote employees to access internal systems securely over the internet. Which technology creates an encrypted tunnel between the remote device and the corporate network?**

公司希望遠端員工能透過網際網路安全地存取內部系統。哪一種技術能在遠端裝置與公司網路之間建立加密通道？

- A. Virtual Private Network (VPN)　／　虛擬私人網路（VPN）　**← 正確答案**
- B. Virtual LAN (VLAN)　／　虛擬區域網路（VLAN）
- C. Network Address Translation (NAT)　／　網路位址轉換（NAT）
- D. Content Delivery Network (CDN)　／　內容傳遞網路（CDN）

**解說：** VPN 透過 IPsec 或 SSL/TLS 在公眾網路上建立加密通道，讓遠端裝置如同身處公司內網。VLAN 是在交換器上切分邏輯網段，不提供加密；NAT 負責私有與公有位址的轉換；CDN 是把網站內容快取到各地節點以加速存取。近年趨勢是以零信任網路存取（ZTNA）補強或取代傳統 VPN：只開放「特定應用」而非整個內網，並持續驗證使用者與裝置。

*Explanation:* A VPN uses IPsec or SSL/TLS to build an encrypted tunnel over a public network, so a remote device behaves as if it were on the internal network. A VLAN logically splits switch ports and provides no encryption, NAT translates private and public addresses, and a CDN caches content at edge locations. Zero Trust Network Access (ZTNA) increasingly supplements or replaces VPNs by exposing specific applications rather than the whole network.

**ISO/IEC 27001:2022 附錄 A：** A.6.7 Remote working（遠端工作）；A.8.20 Networks security（網路安全）

**稽核小叮嚀：** VPN 帳號務必啟用 MFA，VPN 設備本身也要即時修補；近年多起重大入侵事件都是從 VPN 設備的漏洞開始。

### AI-06｜網路與基礎架構｜難度 ★★

**Where should an organization place its public-facing web server to allow internet access while protecting the internal network?**

組織的對外網站伺服器應放在哪裡，才能既開放網際網路存取、又保護內部網路？

- A. Inside the internal LAN together with the database servers　／　放在內部區域網路中，與資料庫伺服器放在一起
- B. In a demilitarized zone (DMZ) separated from the internal network by firewalls　／　放在非軍事區（DMZ），以防火牆與內部網路隔開　**← 正確答案**
- C. Directly on the internet with no firewall, to maximize performance　／　直接放在網際網路上、不經防火牆，以追求最佳效能
- D. On an employee's workstation, to reduce hardware costs　／　放在員工的工作站上，以節省硬體成本

**解說：** DMZ（非軍事區）是介於網際網路與內部網路之間的緩衝網段。對外服務（網站、郵件閘道、DNS）放在 DMZ，網際網路只能連到 DMZ；DMZ 到內網的流量則由防火牆嚴格限制，例如只允許網站伺服器連到特定資料庫的連接埠。即使網站伺服器被攻破，攻擊者也無法直接進入內部網路。把對外主機放在內網，等於替攻擊者打開大門。

*Explanation:* A DMZ is a buffer segment between the internet and the internal network. Public services such as web servers, mail gateways and DNS sit in the DMZ, the internet can reach only the DMZ, and firewalls tightly limit DMZ-to-internal traffic (for example, only the web server to one database port). If the web server is compromised, the attacker still cannot reach the internal network directly.

**ISO/IEC 27001:2022 附錄 A：** A.8.22 Segregation of networks（網路區隔）；A.8.20 Networks security（網路安全）

**稽核小叮嚀：** 審查架構時可請對方畫出「從網際網路到資料庫」的每一跳，確認中間至少經過兩道不同的存取控制。

### AI-07｜網路與基礎架構｜難度 ★★

**Which wireless security standard is currently recommended for enterprise Wi-Fi, providing individual user authentication through 802.1X/RADIUS and stronger encryption?**

目前企業無線網路建議採用哪一種安全標準，可透過 802.1X／RADIUS 進行個別使用者驗證，並提供更強的加密？

- A. WEP　／　WEP
- B. WPA with TKIP　／　WPA（TKIP 加密）
- C. WPA2-Personal (pre-shared key)　／　WPA2-Personal（預先共用金鑰）
- D. WPA3-Enterprise　／　WPA3-Enterprise（企業版）　**← 正確答案**

**解說：** WPA3-Enterprise 結合 802.1X／RADIUS，每位使用者以自己的帳號或憑證登入，員工離職時只要停用該帳號即可，並提供更高的加密強度（含 192 位元安全模式）與受保護的管理訊框。WEP 早已可在數分鐘內破解；WPA-TKIP 也已被淘汰；WPA2-Personal 使用全公司共用的一組密碼，一旦外流就必須全面更換，也無法追蹤是誰連線。

*Explanation:* WPA3-Enterprise uses 802.1X/RADIUS, so each user signs in with their own account or certificate, and a departing employee is removed by disabling one account. It adds stronger encryption, including a 192-bit security mode, and protected management frames. WEP can be cracked in minutes, WPA-TKIP is deprecated, and WPA2-Personal relies on one shared password that must be changed everywhere when it leaks and cannot show who connected.

**ISO/IEC 27001:2022 附錄 A：** A.8.20 Networks security（網路安全）；A.8.5 Secure authentication（安全鑑別）

**稽核小叮嚀：** 訪客 Wi-Fi 應與公司內網完全隔離。稽核時可實地連上訪客網路，測試是否能連到內部系統。

### AI-08｜網路與基礎架構｜難度 ★★

**An organization wants only company-managed, fully patched devices to connect to its internal network, while noncompliant devices are moved to a quarantine VLAN. Which solution best achieves this?**

某組織希望只有公司列管、且已完成修補的裝置才能連上內部網路，不合規的裝置則被移到隔離 VLAN。哪一種解決方案最能達成此目標？

- A. Content Delivery Network (CDN)　／　內容傳遞網路（CDN）
- B. Load balancer　／　負載平衡器
- C. Network Access Control (NAC)　／　網路存取控制（NAC）　**← 正確答案**
- D. Data Loss Prevention (DLP)　／　資料外洩防護（DLP）

**解說：** NAC 會在裝置接入網路時檢查身分與健康狀態（是否為公司資產、作業系統是否已修補、防毒是否啟用），合規才放行，不合規則導向隔離網段進行修補，未知裝置則拒絕連線。CDN 用於加速內容傳遞；負載平衡器分散伺服器流量；DLP 防止敏感資料外洩，三者都無法在接入時檢查裝置是否合規。

*Explanation:* NAC checks identity and device health (company asset, OS patches, antivirus status) when a device joins the network. Compliant devices are admitted, noncompliant ones are sent to a quarantine segment for remediation and unknown devices are rejected. A CDN speeds content delivery, a load balancer spreads server traffic and DLP prevents data leakage; none checks device compliance at connection time.

**ISO/IEC 27001:2022 附錄 A：** A.8.1 User endpoint devices（使用者端點裝置）；A.8.20 Networks security（網路安全）

**稽核小叮嚀：** NAC 也能協助盤點資產：從 NAC 的連線紀錄，常能發現資產清冊上沒有登錄的裝置。

### AI-09｜作業系統與伺服器｜難度 ★★

**On a Linux server, which octal permission setting gives the file owner read and write access while denying all access to the group and others, which is appropriate for an SSH private key?**

在 Linux 伺服器上，哪一個八進位權限設定能讓檔案擁有者可讀寫、群組與其他人完全無權限，適合用於 SSH 私鑰檔？

- A. 777　／　777
- B. 755　／　755
- C. 600　／　600　**← 正確答案**
- D. 644　／　644

**解說：** Linux 權限以三組數字分別代表擁有者（owner）、群組（group）、其他人（others），讀 r=4、寫 w=2、執行 x=1。600 代表擁有者 rw-（4+2）、群組與其他人 ---，正是私鑰檔該有的權限；SSH 甚至會拒絕使用權限過寬的私鑰。777 代表所有人都可讀寫執行，非常危險；755 常用於程式與目錄；644 常用於一般設定檔，其他人仍可讀取。

*Explanation:* Linux permissions use three digits for owner, group and others, where read is 4, write 2 and execute 1. 600 means rw- for the owner and nothing for group and others, which is exactly right for a private key; SSH even refuses keys with looser permissions. 777 lets everyone read, write and execute, which is dangerous. 755 is typical for programs and directories, and 644 for ordinary config files that others may read.

**ISO/IEC 27001:2022 附錄 A：** A.8.3 Information access restriction（資訊存取限制）；A.8.24 Use of cryptography（密碼技術之使用）

**稽核小叮嚀：** 稽核 Linux 主機時，可抽查 /etc/shadow（應僅 root 可讀）與重要設定檔的權限，並搜尋權限為 777 的檔案。

### AI-10｜作業系統與伺服器｜難度 ★

**In a Windows enterprise environment, which service centrally manages user accounts, computer objects and Group Policy for authentication and authorization?**

在 Windows 企業環境中，哪一項服務能集中管理使用者帳號、電腦物件與群組原則（GPO），提供身分驗證與授權？

- A. Internet Information Services (IIS)　／　網際網路資訊服務（IIS）
- B. Active Directory Domain Services (AD DS)　／　Active Directory 網域服務（AD DS）　**← 正確答案**
- C. Hyper-V　／　Hyper-V
- D. Windows Server Update Services (WSUS)　／　Windows Server Update Services（WSUS）

**解說：** AD DS 是 Windows 網域的核心，由網域控制站（DC）集中管理帳號、群組、電腦與群組原則，並以 Kerberos 進行身分驗證。透過 GPO 可以統一推送密碼原則、螢幕鎖定、軟體限制等安全設定。IIS 是網頁伺服器；Hyper-V 是虛擬化平台；WSUS 用於派送 Windows 更新。也因為 AD 掌管整個網域，它是攻擊者的首要目標，網域管理員（Domain Admins）帳號必須嚴格控管。

*Explanation:* AD DS is the core of a Windows domain. Domain controllers centrally manage accounts, groups, computers and Group Policy and authenticate users with Kerberos. GPOs push security settings such as password policy, screen lock and software restrictions. IIS is a web server, Hyper-V is a virtualization platform and WSUS distributes Windows updates. Because AD controls the whole domain, it is a prime target and Domain Admins membership must be tightly controlled.

**ISO/IEC 27001:2022 附錄 A：** A.5.16 Identity management（身分管理）；A.5.18 Access rights（存取權限）；A.8.2 Privileged access rights（特殊存取權限）

**稽核小叮嚀：** 稽核 AD 時可索取 Domain Admins 群組成員清單，確認人數最少化，且每個帳號都對應到具名的人員。

### AI-11｜作業系統與伺服器｜難度 ★★

**Microsoft releases security updates on 'Patch Tuesday' each month. What is the best practice before deploying critical patches to production servers?**

Microsoft 每月在「Patch Tuesday」發布安全性更新。將重大修補程式部署到正式環境伺服器之前，最佳做法是什麼？

- A. Deploy immediately to all production servers without testing　／　不經測試，立即部署到所有正式環境伺服器
- B. Wait at least one year until the patches are proven stable　／　至少等待一年，確認修補程式穩定後再安裝
- C. Test the patches in a staging environment, then deploy through change management with a rollback plan　／　先在測試（預備）環境驗證，再依變更管理程序部署，並準備回復計畫　**← 正確答案**
- D. Patch only after a security incident occurs　／　等發生資安事件之後再修補

**解說：** Patch Tuesday 是每月第二個星期二。修補要在「速度」與「穩定」之間取得平衡：先在與正式環境相近的測試環境驗證相容性，再依變更管理程序核准、排程部署，並備妥回復（Rollback）計畫。若漏洞已遭大量利用（例如列入美國 CISA 的 KEV 清單），則應啟動緊急變更流程加速處理。不測試就上線可能造成服務中斷；拖延一年或等事件發生再修補，則讓漏洞長期暴露。

*Explanation:* Patch Tuesday is the second Tuesday of each month. Patching balances speed and stability: validate compatibility in a staging environment that mirrors production, then deploy through approved change management with a rollback plan. Vulnerabilities under active exploitation (for example, listed in CISA KEV) warrant an emergency change. Deploying untested can cause outages, and waiting a year or until an incident leaves the vulnerability exposed.

**ISO/IEC 27001:2022 附錄 A：** A.8.8 Management of technical vulnerabilities（技術脆弱性管理）；A.8.32 Change management（變更管理）；A.8.19 Installation of software on operational systems（運作中系統之軟體安裝）

**稽核小叮嚀：** 稽核修補管理時，可抽一個重大漏洞，追蹤從公告、評估、測試到全面完成修補花了幾天，並對照內部規定的修補時限。

### AI-12｜作業系統與伺服器｜難度 ★

**A file server is configured with RAID 1. What does this configuration provide?**

一台檔案伺服器設定為 RAID 1，這種配置能提供什麼？

- A. Striping across disks for performance, with no redundancy　／　將資料分散寫入多顆硬碟以提升效能，但沒有備援
- B. Mirroring of data across two disks, so the server keeps running if one disk fails　／　將資料鏡像到兩顆硬碟，其中一顆故障時伺服器仍可運作　**← 正確答案**
- C. Encryption of all data stored on the disks　／　對硬碟上的所有資料進行加密
- D. A complete replacement for off-site backups　／　可以完全取代異地備份

**解說：** RAID 1 是鏡像（Mirroring），同一份資料同時寫入兩顆硬碟，一顆壞掉另一顆仍可運作，提升可用性。RAID 0 是分散寫入（Striping），效能好但沒有備援，任一顆壞掉資料就全毀；RAID 5 以分散式同位元檢查（Parity）容許一顆硬碟故障。重要觀念：RAID 不是備份！誤刪檔案、勒索軟體加密、檔案毀損都會同步寫到兩顆硬碟上，仍然必須另外做備份。

*Explanation:* RAID 1 mirrors the same data onto two disks, so the server survives a single disk failure and availability improves. RAID 0 stripes data for speed with no redundancy, and RAID 5 uses distributed parity to tolerate one failed disk. Key point: RAID is not a backup. Accidental deletion, ransomware encryption and corruption are copied to both disks immediately, so separate backups are still required.

**ISO/IEC 27001:2022 附錄 A：** A.8.14 Redundancy of information processing facilities（資訊處理設施之備援）；A.8.13 Information backup（資訊備份）

**稽核小叮嚀：** 若受稽方說「我們有 RAID，所以有備份」，這就是一個值得記錄的觀察事項。

### AI-13｜作業系統與伺服器｜難度 ★★★

**In the Windows Security event log, which Event ID records a failed logon attempt?**

在 Windows 安全性事件記錄中，哪一個事件識別碼（Event ID）代表「登入失敗」？

- A. 4624　／　4624
- B. 4720　／　4720
- C. 1102　／　1102
- D. 4625　／　4625　**← 正確答案**

**解說：** 常見的 Windows 安全性事件識別碼：4624 為登入成功、4625 為登入失敗、4720 為建立使用者帳號、4732 為成員加入具安全性的本機群組、1102 為稽核記錄被清除。短時間內大量出現 4625，可能代表暴力破解或密碼噴灑（Password Spraying）；出現 1102 則要特別警覺，攻擊者常在得手後清除記錄以湮滅證據。

*Explanation:* Common Windows Security event IDs: 4624 successful logon, 4625 failed logon, 4720 user account created, 4732 member added to a security-enabled local group, and 1102 audit log cleared. Bursts of 4625 may indicate brute force or password spraying, and a 1102 deserves immediate attention because attackers often clear logs to cover their tracks.

**ISO/IEC 27001:2022 附錄 A：** A.8.15 Logging（存錄）；A.8.16 Monitoring activities（監視活動）

**稽核小叮嚀：** 稽核日誌管理時，可請管理者現場查詢近期的 4625 事件，確認有沒有告警規則，以及由誰負責處理。

### AI-14｜作業系統與伺服器｜難度 ★★

**Why should Linux administrators log in with individual accounts and use sudo instead of logging in directly as root?**

為什麼 Linux 系統管理者應以個人帳號登入再使用 sudo，而不是直接以 root 登入？

- A. sudo makes commands run faster than root　／　sudo 執行指令的速度比 root 快
- B. Direct root login is required for remote access　／　遠端存取必須直接以 root 登入
- C. sudo encrypts every command sent to the server　／　sudo 會加密所有送到伺服器的指令
- D. It provides individual accountability and logs privileged commands, supporting least privilege　／　它能提供個人可歸責性並記錄特權指令，落實最小權限原則　**← 正確答案**

**解說：** 多人共用 root 時，日誌只會顯示「root 做了某件事」，無法追溯是誰。以個人帳號登入、需要時再以 sudo 提權，每一筆特權指令都會記錄執行者，達到可歸責性（Accountability）；sudoers 設定也能限制每個人可執行的指令，落實最小權限。實務上會在 SSH 設定 PermitRootLogin no，禁止 root 直接遠端登入。sudo 不會讓指令變快，也不負責加密。

*Explanation:* When several people share root, logs only show that root did something, not who. Logging in with personal accounts and elevating with sudo records the person behind every privileged command, providing accountability, and sudoers can restrict which commands each person may run. In practice, set PermitRootLogin no in the SSH configuration. sudo does not speed up commands or encrypt anything.

**ISO/IEC 27001:2022 附錄 A：** A.8.2 Privileged access rights（特殊存取權限）；A.8.18 Use of privileged utility programs（具特殊權限公用程式之使用）；A.8.15 Logging（存錄）

**稽核小叮嚀：** 共用帳號是常見的稽核缺失。若因系統限制必須共用，應有密碼保管、借用登記與事後審查等補償性控制。

### AI-15｜作業系統與伺服器｜難度 ★

**Which practice best describes server hardening?**

下列哪一項最能說明「伺服器強化（Hardening）」？

- A. Disabling unnecessary services and ports, removing default accounts, and applying a secure configuration baseline such as the CIS Benchmarks　／　停用不必要的服務與連接埠、移除預設帳號，並套用安全組態基準（如 CIS Benchmarks）　**← 正確答案**
- B. Installing as many services as possible to increase flexibility　／　盡可能安裝更多服務，以增加彈性
- C. Upgrading the server's CPU and memory to improve performance　／　升級伺服器的 CPU 與記憶體以提升效能
- D. Moving the server to a room with better air conditioning　／　把伺服器搬到空調更好的機房

**解說：** 強化（Hardening）的目的是縮小攻擊面（Attack Surface）：關閉用不到的服務與連接埠、移除或更名預設帳號、修改預設密碼、套用最新修補、啟用日誌與稽核，並以 CIS Benchmarks、台灣的政府組態基準（GCB）等安全組態基準作為依據。安裝更多服務反而會擴大攻擊面；升級硬體與改善空調屬於效能與環境議題。

*Explanation:* Hardening shrinks the attack surface: disable unused services and ports, remove or rename default accounts, change default passwords, apply current patches, enable logging, and follow a secure configuration baseline such as the CIS Benchmarks or a government baseline (Taiwan's GCB). Installing more services enlarges the attack surface, and hardware upgrades or air conditioning are performance and environmental topics.

**ISO/IEC 27001:2022 附錄 A：** A.8.9 Configuration management（組態管理）

**稽核小叮嚀：** 台灣政府機關常參考「政府組態基準（GCB）」。稽核組態管理時，可抽查實際主機設定是否與核定的基準一致。

### AI-16｜作業系統與伺服器｜難度 ★

**Why is it important to synchronize all servers' clocks with a reliable NTP time source?**

為什麼所有伺服器的時間都必須與可靠的 NTP 時間來源同步？

- A. It increases network throughput　／　可提升網路傳輸量
- B. It ensures consistent timestamps for log correlation and forensic investigations　／　確保日誌時間戳記一致，以利關聯分析與數位鑑識　**← 正確答案**
- C. It is required for disk encryption to work　／　磁碟加密必須靠它才能運作
- D. It prevents malware from being installed　／　可防止惡意軟體被安裝

**解說：** 調查資安事件時，需要把防火牆、AD、伺服器、應用程式的日誌依時間串起來，還原攻擊時間軸。只要各設備時間差了幾分鐘，事件順序就可能完全錯亂，甚至影響證據的可信度。Kerberos 驗證也要求時間誤差在一定範圍內（預設 5 分鐘）。在台灣，可使用國家時間與頻率標準實驗室提供的 time.stdtime.gov.tw 作為校時來源。

*Explanation:* Incident investigations stitch logs from firewalls, Active Directory, servers and applications into one timeline. Clocks that drift by even a few minutes can scramble the order of events and weaken evidence. Kerberos authentication also requires clocks to be within a tolerance (five minutes by default). In Taiwan, time.stdtime.gov.tw from the National Time and Frequency Standard Laboratory is a common source.

**ISO/IEC 27001:2022 附錄 A：** A.8.17 Clock synchronization（鐘訊同步）；A.8.15 Logging（存錄）

**稽核小叮嚀：** A.8.17 鐘訊同步看似簡單，稽核時現場比對兩台設備的系統時間，常會發現落差。

### AI-17｜作業系統與伺服器｜難度 ★

**What is the primary function of an operating system's kernel?**

作業系統核心（Kernel）的主要功能是什麼？

- A. Providing desktop themes and wallpapers　／　提供桌面佈景主題與桌布
- B. Compiling source code into executable programs　／　將原始碼編譯成可執行程式
- C. Managing hardware resources such as CPU, memory and devices, and providing core services to programs　／　管理 CPU、記憶體與周邊裝置等硬體資源，並為程式提供核心服務　**← 正確答案**
- D. Browsing websites on behalf of the user　／　代替使用者瀏覽網站

**解說：** 核心是作業系統最底層、權限最高的部分，負責程序排程、記憶體管理、裝置驅動程式、檔案系統與系統呼叫，是應用程式與硬體之間的橋梁。核心執行在特權模式（Kernel Mode），一般程式執行在使用者模式（User Mode），兩者隔離可避免單一程式破壞整個系統；也因此，核心層級的漏洞或 Rootkit 危害極大。桌面主題、編譯器、瀏覽器都是在核心之上運作的應用程式。

*Explanation:* The kernel is the lowest and most privileged part of the OS. It handles process scheduling, memory management, device drivers, file systems and system calls, bridging applications and hardware. It runs in kernel mode while normal programs run in user mode, and that isolation keeps one program from breaking the whole system. Kernel vulnerabilities and rootkits are therefore especially dangerous. Themes, compilers and browsers are applications running on top of the kernel.

### AI-18｜作業系統與伺服器｜難度 ★

**During an ISMS audit, an auditor finds several production servers still running Windows Server 2012 R2. What is the primary security concern?**

在 ISMS 稽核中，稽核員發現數台正式環境伺服器仍在執行 Windows Server 2012 R2。主要的資安疑慮是什麼？

- A. The servers use too much memory　／　伺服器占用太多記憶體
- B. The operating system has reached end of support and no longer receives regular security updates　／　該作業系統已終止支援，不再提供常規的安全性更新　**← 正確答案**
- C. The license fee is too expensive　／　授權費用太高
- D. The servers cannot connect to the internet　／　伺服器無法連上網際網路

**解說：** Windows Server 2012／2012 R2 的延伸支援已於 2023 年 10 月 10 日結束。終止支援後，新發現的漏洞將不再有常規修補（除非付費購買延伸安全性更新 ESU），系統會持續暴露在風險中。處理方式：規劃升級或汰換；短期內無法升級時，須進行風險評鑑並採取補償性控制，例如網路隔離、限制存取、加強監控，並由管理階層正式接受殘餘風險。

*Explanation:* Extended support for Windows Server 2012 and 2012 R2 ended on 10 October 2023. After end of support, newly found vulnerabilities receive no regular patches unless Extended Security Updates are purchased, leaving the systems exposed. Plan an upgrade or replacement. If that cannot happen soon, perform a risk assessment, apply compensating controls such as isolation, restricted access and closer monitoring, and have management formally accept the residual risk.

**ISO/IEC 27001:2022 附錄 A：** A.8.8 Management of technical vulnerabilities（技術脆弱性管理）；A.5.9 Inventory of information and other associated assets（資訊及其他相關聯資產之清冊）

**稽核小叮嚀：** 資產清冊若有記錄作業系統版本與支援到期日，就能提早規劃汰換，這是制度成熟度高的表現。

### AI-19｜作業系統與伺服器｜難度 ★★

**Which UEFI firmware feature helps prevent bootkits by allowing only digitally signed bootloaders and operating system kernels to load during startup?**

UEFI 韌體的哪一項功能，只允許經數位簽章的開機載入程式與作業系統核心在開機時載入，以防範 Bootkit？

- A. Wake-on-LAN　／　網路喚醒（Wake-on-LAN）
- B. Hyper-Threading　／　超執行緒（Hyper-Threading）
- C. Fast Startup　／　快速啟動（Fast Startup）
- D. Secure Boot　／　安全開機（Secure Boot）　**← 正確答案**

**解說：** Secure Boot（安全開機）會在開機過程中驗證每一段載入程式的數位簽章，簽章不符就拒絕執行，防止 Bootkit 在作業系統啟動前就取得控制權；一旦惡意程式搶在作業系統之前執行，防毒軟體就很難察覺。Wake-on-LAN 是遠端喚醒；Hyper-Threading 是 CPU 多執行緒技術；Fast Startup 是 Windows 的快速開機功能，都與開機完整性無關。Secure Boot 常與 TPM 搭配，作為 BitLocker 與量測開機（Measured Boot）的基礎。

*Explanation:* Secure Boot verifies the digital signature of each boot component during startup and refuses to run anything unsigned, which stops bootkits from taking control before the OS loads. Code that runs before the OS is very hard for antivirus to detect. Wake-on-LAN, Hyper-Threading and Fast Startup have nothing to do with boot integrity. Secure Boot often works with a TPM as the foundation for BitLocker and measured boot.

**ISO/IEC 27001:2022 附錄 A：** A.8.7 Protection against malware（防範惡意軟體）；A.8.9 Configuration management（組態管理）

### AI-20｜虛擬化與雲端運算｜難度 ★★

**Which statement correctly describes a Type 1 hypervisor?**

下列哪一項敘述正確描述了第一型（Type 1）虛擬機器管理程式（Hypervisor）？

- A. It runs as an application on top of a host operating system, such as VirtualBox on a Windows laptop　／　它以應用程式的形式在主機作業系統上執行，例如在 Windows 筆電上執行 VirtualBox
- B. It is a container runtime that shares the host kernel　／　它是共用主機核心的容器執行環境
- C. It runs directly on the physical hardware (bare metal), such as VMware ESXi or Microsoft Hyper-V　／　它直接在實體硬體上執行（裸機），例如 VMware ESXi 或 Microsoft Hyper-V　**← 正確答案**
- D. It can only emulate mobile applications　／　它只能模擬行動裝置的應用程式

**解說：** 第一型 Hypervisor（裸機型）直接安裝在實體伺服器上，負責把硬體資源分配給多台虛擬機器，效能好、攻擊面小，是資料中心與雲端的主流，例如 VMware ESXi、Microsoft Hyper-V、KVM、Xen。第二型 Hypervisor（寄居型）安裝在一般作業系統上，例如 VirtualBox、VMware Workstation，適合個人測試。容器則是共用主機核心的另一種虛擬化技術，不是 Hypervisor。

*Explanation:* A Type 1 (bare-metal) hypervisor installs directly on physical servers and allocates hardware to virtual machines. It performs well with a small attack surface and dominates data centers and clouds: VMware ESXi, Microsoft Hyper-V, KVM and Xen. A Type 2 (hosted) hypervisor runs on a normal OS, such as VirtualBox or VMware Workstation, and suits personal testing. Containers share the host kernel and are not hypervisors.

**ISO/IEC 27001:2022 附錄 A：** A.8.9 Configuration management（組態管理）

**稽核小叮嚀：** Hypervisor 的管理介面（如 vCenter）權限極高，一旦失守，所有虛擬機器都會受影響，應放在獨立的管理網段並啟用 MFA。

### AI-21｜虛擬化與雲端運算｜難度 ★

**A company uses Microsoft 365 for email and documents without managing any servers or application code. Which cloud service model is this?**

一家公司使用 Microsoft 365 處理郵件與文件，完全不需要管理伺服器或應用程式程式碼。這屬於哪一種雲端服務模式？

- A. Software as a Service (SaaS)　／　軟體即服務（SaaS）　**← 正確答案**
- B. Platform as a Service (PaaS)　／　平台即服務（PaaS）
- C. Infrastructure as a Service (IaaS)　／　基礎設施即服務（IaaS）
- D. On-premises deployment　／　地端（自建機房）部署

**解說：** SaaS 是直接使用供應商提供的完整應用程式，例如 Microsoft 365、Google Workspace、Salesforce，使用者只需管理帳號、權限、設定與資料。PaaS 提供開發與執行平台（例如 Azure App Service、Google App Engine），客戶負責自己的程式碼；IaaS 提供虛擬機器、網路與儲存（例如 AWS EC2），客戶負責作業系統以上的所有東西；地端部署則是全部自行管理。

*Explanation:* SaaS means using a complete application run by the provider, such as Microsoft 365, Google Workspace or Salesforce; the customer manages accounts, permissions, settings and data. PaaS supplies a development and runtime platform (Azure App Service, Google App Engine) where the customer owns the code. IaaS supplies VMs, networks and storage (AWS EC2) and the customer manages everything from the OS up. On-premises means managing everything yourself.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

**稽核小叮嚀：** SaaS 不代表沒有責任：帳號 MFA、外部分享設定、稽核日誌保存、離職帳號停用，都還是客戶要做的事。

### AI-22｜虛擬化與雲端運算｜難度 ★

**An organization runs sensitive workloads in its own private cloud and bursts to a public cloud during peak demand. Which deployment model is this?**

某組織在自建的私有雲上執行敏感工作負載，並在需求尖峰時延伸使用公有雲資源。這屬於哪一種部署模式？

- A. Community cloud　／　社群雲
- B. Public cloud only　／　僅使用公有雲
- C. Hybrid cloud　／　混合雲　**← 正確答案**
- D. Multi-tenant SaaS　／　多租戶 SaaS

**解說：** 依 NIST SP 800-145 的定義，雲端部署模式有四種：私有雲、社群雲、公有雲、混合雲。混合雲結合兩種以上的雲端環境並讓它們能互通，常見用法就是敏感資料留在私有雲，運算需求暴增時再「雲爆發（Cloud Bursting）」到公有雲。社群雲由具有共同需求的組織共享（例如多個政府機關共用的雲）；多租戶 SaaS 是服務模式，而不是部署模式。

*Explanation:* NIST SP 800-145 defines four deployment models: private, community, public and hybrid. A hybrid cloud connects two or more environments so they interoperate. A typical pattern keeps sensitive data in a private cloud and bursts to the public cloud at peak demand. A community cloud is shared by organizations with common needs, and multi-tenant SaaS is a service model, not a deployment model.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

### AI-23｜虛擬化與雲端運算｜難度 ★

**What is the most common cause of data breaches involving cloud storage services such as Amazon S3 buckets?**

涉及雲端儲存服務（例如 Amazon S3 儲存貯體）的資料外洩事件，最常見的原因是什麼？

- A. Physical theft of disks from the cloud data center　／　雲端資料中心的硬碟遭實體竊取
- B. Misconfiguration, such as storage buckets left publicly accessible　／　組態設定錯誤，例如儲存貯體被設定為公開存取　**← 正確答案**
- C. Zero-day vulnerabilities in the cloud provider's hypervisor　／　雲端供應商 Hypervisor 的零時差漏洞
- D. Quantum computers breaking the encryption　／　量子電腦破解了加密

**解說：** 絕大多數雲端資料外洩源自客戶自己的組態錯誤：儲存貯體設為公開、存取金鑰外流、安全群組對外全開、未啟用日誌等，這些都屬於責任共擔模型中「客戶的責任」。雲端業者的實體機房安全與 Hypervisor 防護通常非常嚴密，量子破解目前也不是現實威脅。對策包括雲端資安態勢管理（CSPM）工具、組態基準、基礎架構即程式碼（IaC）審查，以及 AWS「封鎖公開存取」之類的防呆設定。

*Explanation:* Most cloud data breaches come from customer misconfiguration: public buckets, leaked access keys, security groups open to the world or disabled logging, all on the customer's side of the shared responsibility model. Provider data centers and hypervisors are heavily protected, and quantum attacks are not a current threat. Countermeasures include CSPM tools, configuration baselines, IaC review and guardrails such as AWS Block Public Access.

**ISO/IEC 27001:2022 附錄 A：** A.8.9 Configuration management（組態管理）；A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）

**稽核小叮嚀：** 稽核雲端環境時，可請客戶展示 CSPM 或雲端原生工具（如 AWS Security Hub、Microsoft Defender for Cloud）的最新評分與待改善項目。

### AI-24｜虛擬化與雲端運算｜難度 ★★

**An administrator relies solely on virtual machine snapshots stored on the same storage array as the VMs for data protection. Why is this insufficient?**

某管理者僅依賴存放在「與虛擬機器同一套儲存設備」上的快照來保護資料。為什麼這樣還不夠？

- A. Snapshots are always encrypted and cannot be restored　／　快照一律加密，因此無法還原
- B. Snapshots violate virtualization licensing terms　／　快照違反虛擬化軟體的授權條款
- C. Snapshots slow down the network　／　快照會拖慢網路速度
- D. Snapshots depend on the same underlying storage and are not independent copies, so a storage failure or ransomware can destroy both　／　快照依賴同一套底層儲存設備，並非獨立副本；儲存設備故障或勒索軟體可能同時摧毀兩者　**← 正確答案**

**解說：** 快照（Snapshot）記錄的是某個時間點的狀態，且通常依賴原始磁碟、存在同一套儲存設備上。一旦儲存設備故障、遭勒索軟體加密，或攻擊者取得虛擬化平台的管理權限，快照會與虛擬機器一起消失。快照適合在更新前作為短期還原點，但不能取代備份。正確做法是遵循 3-2-1 原則：3 份資料、2 種不同媒體、1 份存放異地，最好再加上 1 份離線或不可變（Immutable）的備份。

*Explanation:* A snapshot captures a point in time and usually depends on the original disks on the same storage system. If that storage fails, is encrypted by ransomware or the attacker gains control of the virtualization platform, the snapshots disappear with the VMs. Snapshots are good short-term restore points before changes, but they do not replace backups. Follow the 3-2-1 rule (three copies, two media, one off-site), ideally plus an offline or immutable copy.

**ISO/IEC 27001:2022 附錄 A：** A.8.13 Information backup（資訊備份）

**稽核小叮嚀：** 稽核備份時，「有備份」還不夠，要看「有沒有做過還原測試」，以及還原所需時間是否符合 RTO。

### AI-25｜虛擬化與雲端運算｜難度 ★★

**In a multi-tenant virtualized environment, which attack allows a malicious tenant to break out of a virtual machine and interact with the hypervisor or other tenants' VMs?**

在多租戶的虛擬化環境中，哪一種攻擊能讓惡意租戶跳脫虛擬機器，進而接觸 Hypervisor 或其他租戶的虛擬機器？

- A. VM escape　／　虛擬機器逃逸（VM Escape）　**← 正確答案**
- B. VM sprawl　／　虛擬機器蔓延（VM Sprawl）
- C. Live migration　／　即時遷移（Live Migration）
- D. Thin provisioning　／　精簡佈建（Thin Provisioning）

**解說：** VM Escape 是利用 Hypervisor 或虛擬硬體的漏洞，從虛擬機器內部突破隔離，進而控制宿主機或存取其他虛擬機器，是多租戶雲端最嚴重的威脅之一。VM Sprawl 是虛擬機器數量失控、缺乏管理，屬於管理問題；即時遷移是在不停機的情況下把虛擬機器移到另一台主機；精簡佈建是依實際用量配置儲存空間。ISO/IEC 27017 的 CLD.9.5.1「虛擬運算環境中之區隔」正是要求雲端業者確保租戶之間的隔離。

*Explanation:* A VM escape exploits flaws in the hypervisor or virtual hardware to break isolation from inside a VM and reach the host or other VMs, one of the most serious multi-tenant risks. VM sprawl is uncontrolled growth of VMs, a management problem. Live migration moves a running VM to another host, and thin provisioning allocates storage on demand. ISO/IEC 27017 control CLD.9.5.1 (segregation in virtual computing environments) requires providers to keep tenants isolated.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）；A.8.22 Segregation of networks（網路區隔）

**稽核小叮嚀：** VM Sprawl 雖然不是攻擊，卻是常見的稽核問題：沒人認領、沒人修補的「殭屍虛擬機器」就是潛在破口。

### AI-26｜虛擬化與雲端運算｜難度 ★★

**Which essential characteristic of cloud computing allows resources to be scaled out and in automatically according to demand?**

雲端運算的哪一項基本特徵，能依需求自動擴增或縮減資源？

- A. Rapid elasticity　／　快速彈性（Rapid Elasticity）　**← 正確答案**
- B. Broad network access　／　廣泛的網路存取（Broad Network Access）
- C. Resource pooling　／　資源共享池（Resource Pooling）
- D. Measured service　／　可計量的服務（Measured Service）

**解說：** NIST SP 800-145 定義雲端運算的五大基本特徵：隨需自助服務、廣泛的網路存取、資源共享池、快速彈性、可計量的服務。快速彈性是指資源能隨負載自動擴充或縮減，例如電商在雙 11 期間自動增加伺服器，活動結束後再縮回。廣泛的網路存取指可透過網路以各種裝置存取；資源共享池指供應商以多租戶方式集中提供資源；可計量的服務指依實際用量監控與計費。

*Explanation:* NIST SP 800-145 lists five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service. Rapid elasticity means capacity grows and shrinks automatically with load, such as an e-commerce site adding servers for a big sale and scaling back afterwards. Broad network access means reachable from many devices, resource pooling means multi-tenant shared resources, and measured service means usage is metered and billed.

**ISO/IEC 27001:2022 附錄 A：** A.8.6 Capacity management（容量管理）

### AI-27｜虛擬化與雲端運算｜難度 ★★

**When selecting a cloud service provider to store personal data, which contractual consideration is most important from a privacy and compliance perspective?**

選擇雲端服務供應商來存放個人資料時，從隱私與法遵的角度來看，哪一項契約考量最重要？

- A. The guaranteed CPU clock speed of the provider's servers　／　供應商伺服器保證的 CPU 時脈
- B. The availability of a free trial period　／　是否提供免費試用期
- C. Data residency, transparency about sub-processors, and data return and deletion when the contract ends　／　資料存放地點、次處理者（複委託）的透明度，以及契約終止時的資料返還與刪除　**← 正確答案**
- D. The number of interface languages the provider supports　／　供應商支援的介面語言數量

**解說：** 委託雲端業者處理個資時，契約必須明確約定：資料存放在哪些國家或地區（涉及跨境傳輸限制）、是否複委託給其他次處理者（Sub-processor）且須事先告知、安全控制措施與稽核權、事故通報時限，以及契約終止時如何返還與刪除資料並提供證明。這些對應 GDPR 第 28 條、台灣《個人資料保護法施行細則》第 8 條委託機關對受託者的監督事項，以及 ISO/IEC 27017 的 CLD.8.1.5「雲端服務客戶資產之移除」。其他選項都與隱私法遵無關。

*Explanation:* When a cloud provider processes personal data, the contract should state where data is stored (cross-border transfer rules), whether sub-processors are used and notified, security controls and audit rights, breach notification deadlines, and how data is returned and deleted with proof at termination. These map to GDPR Article 28, the supervision duties for commissioned processing under Taiwan's Personal Data Protection Act Enforcement Rules (Article 8), and ISO/IEC 27017 CLD.8.1.5 (removal of cloud service customer assets). The other options are irrelevant to privacy compliance.

**ISO/IEC 27001:2022 附錄 A：** A.5.20 Addressing information security within supplier agreements（於供應者協議中闡明資訊安全）；A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）；A.5.34 Privacy and protection of PII（隱私及個人可識別資訊保護）

**稽核小叮嚀：** PIMS 輔導重點：委外契約的個資條款常常只寫一句「乙方應遵守個資法」，這是不夠的，應具體列出監督事項。

### AI-28｜虛擬化與雲端運算｜難度 ★★

**Under the shared responsibility model for a SaaS application, which responsibility always remains with the customer?**

在 SaaS 應用程式的責任共擔模型中，哪一項責任永遠屬於客戶？

- A. Patching the underlying physical servers　／　修補底層的實體伺服器
- B. Managing user identities and access rights, and classifying their own data　／　管理使用者身分與存取權限，並對自己的資料進行分類分級　**← 正確答案**
- C. Maintaining the data center's power and cooling　／　維護資料中心的電力與空調
- D. Updating the hypervisor　／　更新 Hypervisor

**解說：** 無論 IaaS、PaaS 或 SaaS，「資料」與「帳號存取」永遠是客戶的責任：誰可以登入、擁有什麼權限、資料分享給誰、哪些資料屬於機密、何時刪除。實體伺服器修補、機房電力空調、Hypervisor 更新，在 SaaS 模式下都由供應商負責。許多 SaaS 外洩事件（例如文件被設定為「知道連結的人都能檢視」）都是客戶端的權限設定不當造成的。

*Explanation:* In IaaS, PaaS and SaaS alike, data and access stay with the customer: who can sign in, what permissions they hold, what data is shared with whom, what is confidential and when it is deleted. Patching physical servers, data center power and cooling and hypervisor updates are the provider's job in SaaS. Many SaaS leaks, such as documents shared with 'anyone with the link', come from customer-side permission mistakes.

**ISO/IEC 27001:2022 附錄 A：** A.5.23 Information security for use of cloud services（使用雲端服務之資訊安全）；A.5.15 Access control（存取控制）；A.5.12 Classification of information（資訊之分類分級）

### AI-29｜容器化與DevOps｜難度 ★

**What is the key architectural difference between containers and virtual machines?**

容器（Container）與虛擬機器（VM）在架構上最關鍵的差異是什麼？

- A. Containers include a full guest operating system, while VMs do not　／　容器包含完整的客體作業系統，虛擬機器則沒有
- B. Containers can only run on Windows　／　容器只能在 Windows 上執行
- C. Containers share the host operating system kernel and isolate processes, so they are lighter than VMs, each of which runs a full guest OS　／　容器共用主機作業系統的核心、以程序層級隔離，比各自執行完整客體作業系統的虛擬機器更輕量　**← 正確答案**
- D. Virtual machines start faster than containers　／　虛擬機器的啟動速度比容器快

**解說：** 虛擬機器透過 Hypervisor 模擬整台電腦，每台都有自己的客體作業系統，隔離性強但較笨重（GB 等級、開機需數十秒）。容器則共用宿主機的核心，利用 Linux 的 namespaces 與 cgroups 隔離程序與資源，映像檔小（MB 等級）、秒級啟動，非常適合微服務與 CI/CD。代價是隔離強度較弱：核心一旦有漏洞，可能影響同一主機上的所有容器。

*Explanation:* A VM emulates a whole computer through a hypervisor, each with its own guest OS: strong isolation but heavy (gigabytes, tens of seconds to boot). Containers share the host kernel and use Linux namespaces and cgroups to isolate processes and resources, so images are small (megabytes) and start in seconds, ideal for microservices and CI/CD. The trade-off is weaker isolation: a kernel vulnerability can affect every container on the host.

**稽核小叮嚀：** 用高雄港來想：貨櫃（容器）共用同一艘船的引擎（核心），而每艘船（虛擬機器）都有自己的引擎與船員（作業系統）。

### AI-30｜容器化與DevOps｜難度 ★

**In Docker, what is the relationship between an image and a container?**

在 Docker 中，映像檔（Image）與容器（Container）的關係是什麼？

- A. An image is a read-only template, and a container is a running instance created from that image　／　映像檔是唯讀的範本，容器則是由該映像檔建立、正在執行的實例　**← 正確答案**
- B. They are two names for exactly the same thing　／　兩者只是同一件事的不同名稱
- C. A container is stored in a registry, while an image runs in memory　／　容器存放在映像檔倉庫（Registry）中，映像檔則在記憶體中執行
- D. An image is a virtual machine disk that includes a hypervisor　／　映像檔是包含 Hypervisor 的虛擬機器磁碟

**解說：** 映像檔像是「食譜」，或物件導向中的「類別（Class）」：由 Dockerfile 建置、分層儲存且唯讀，存放在 Docker Hub、Harbor 等映像檔倉庫。容器則像是照食譜做出來的「料理」，或物件的「實例（Instance）」：在映像檔之上加一層可寫入層後執行。同一個映像檔可以同時啟動許多個容器。也因為映像檔是所有容器的來源，映像檔本身的安全（來源可信、無已知漏洞）格外重要。

*Explanation:* An image is like a recipe, or a class in object-oriented programming: built from a Dockerfile, layered, read-only and stored in a registry such as Docker Hub or Harbor. A container is the dish, or an instance: the image plus a writable layer, running. One image can start many containers, which is why image security (trusted source, no known vulnerabilities) matters so much.

### AI-31｜容器化與DevOps｜難度 ★★

**In Kubernetes, what is the smallest deployable unit, which can contain one or more containers that share network and storage?**

在 Kubernetes 中，最小的部署單位是什麼？它可包含一個或多個共用網路與儲存空間的容器。

- A. Node　／　節點（Node）
- B. Cluster　／　叢集（Cluster）
- C. Namespace　／　命名空間（Namespace）
- D. Pod　／　Pod　**← 正確答案**

**解說：** Pod 是 Kubernetes 調度與部署的最小單位，同一個 Pod 內的容器共用 IP 位址與儲存卷（Volume）；通常一個 Pod 放一個主要容器，必要時搭配輔助的 Sidecar 容器（例如日誌收集）。Node 是執行 Pod 的工作主機（實體機或虛擬機）；Cluster 是由控制平面與多個 Node 組成的整體；Namespace 用於在叢集內做邏輯區隔，常搭配 RBAC 與資源配額，實現多團隊之間的隔離。

*Explanation:* A Pod is the smallest unit Kubernetes schedules and deploys. Containers in a Pod share an IP address and volumes; usually there is one main container, sometimes with a sidecar such as a log collector. A Node is a worker machine (physical or virtual) that runs Pods, a Cluster is the control plane plus its Nodes, and a Namespace logically partitions the cluster, often combined with RBAC and resource quotas to separate teams.

**稽核小叮嚀：** Kubernetes 的 Secret 預設只是 Base64 編碼、並非加密，應啟用 etcd 靜態加密，或改用外部的金鑰管理服務。

### AI-32｜容器化與DevOps｜難度 ★★

**A developer accidentally commits a cloud API key to a public Git repository. What is the most appropriate immediate response?**

一位開發人員不小心把雲端 API 金鑰提交（commit）到公開的 Git 儲存庫。最適當的立即處置是什麼？

- A. Delete the file in a new commit and carry on　／　用一個新的 commit 刪除該檔案，然後繼續工作
- B. Make the repository private and take no further action　／　把儲存庫改為私有，其他什麼都不做
- C. Rename the variable that holds the key　／　把存放金鑰的變數改名
- D. Revoke and rotate the exposed key immediately, check for misuse, and move secrets into a secrets manager　／　立即撤銷並更換外洩的金鑰、檢查是否遭濫用，並將機敏資訊改存於密鑰管理服務　**← 正確答案**

**解說：** Git 會保留完整歷史，刪除檔案後，舊的 commit 仍看得到金鑰；公開儲存庫更會被自動化機器人在幾分鐘內掃描到並盜用（例如拿去挖礦）。因此第一步一定是「撤銷並更換金鑰」，讓外洩的金鑰失效，接著檢查雲端帳單與存取日誌是否有異常使用。長期改善：把金鑰放進 HashiCorp Vault、AWS Secrets Manager 等密鑰管理服務，並在 CI 中加入秘密掃描（Secret Scanning）與 pre-commit 檢查。

*Explanation:* Git keeps full history, so the key remains visible in old commits after the file is deleted, and bots scan public repositories within minutes to abuse leaked keys (for example, for crypto mining). The first step is always to revoke and rotate the key so it stops working, then review billing and access logs for misuse. Longer term, store secrets in a manager such as HashiCorp Vault or AWS Secrets Manager and add secret scanning and pre-commit checks to CI.

**ISO/IEC 27001:2022 附錄 A：** A.5.17 Authentication information（鑑別資訊）；A.8.4 Access to source code（對原始碼之存取）；A.8.28 Secure coding（安全程式設計）

**稽核小叮嚀：** 這也是一起資安事件，應依事件管理程序記錄、通報與檢討，而不只是技術上把金鑰換掉。

### AI-33｜容器化與DevOps｜難度 ★

**In a CI/CD pipeline, what does 'Continuous Integration' primarily mean?**

在 CI/CD 管線中，「持續整合（Continuous Integration）」主要是指什麼？

- A. Developers frequently merge code into a shared repository, where each change is automatically built and tested　／　開發人員頻繁地把程式碼合併到共用儲存庫，每次變更都會自動建置與測試　**← 正確答案**
- B. Every change is deployed directly to production without any testing　／　每次變更都直接部署到正式環境，完全不做測試
- C. Integrating with customers' systems once a month　／　每個月與客戶系統整合一次
- D. Merging all code only once, right before a major release　／　只在重大版本發布前，一次合併所有程式碼

**解說：** 持續整合（CI）要求開發人員每天多次把程式碼合併到主線，每次合併都自動觸發建置、單元測試與靜態掃描，及早發現衝突與缺陷，避免在版本發布前才陷入「整合地獄」。持續交付（Continuous Delivery）是讓程式隨時處於可部署狀態，上線前仍保留人工核准；持續部署（Continuous Deployment）則是通過所有自動化測試後自動上線。不做測試就直接上線，並不是 CI/CD。

*Explanation:* Continuous Integration means developers merge to the main line several times a day, and every merge automatically triggers builds, unit tests and static scans, catching conflicts and defects early instead of in a painful integration phase before release. Continuous Delivery keeps the code always deployable with a manual approval before production, and Continuous Deployment releases automatically once all automated tests pass. Deploying without tests is not CI/CD.

**ISO/IEC 27001:2022 附錄 A：** A.8.25 Secure development life cycle（安全開發生命週期）；A.8.29 Security testing in development and acceptance（開發及驗收中之安全測試）；A.8.32 Change management（變更管理）

### AI-34｜容器化與DevOps｜難度 ★

**What does the term 'shift left' mean in DevSecOps?**

在 DevSecOps 中，「左移（Shift Left）」一詞是什麼意思？

- A. Moving servers to the left side of the rack　／　把伺服器移到機櫃的左側
- B. Delaying security reviews until after the software is released　／　把安全審查延後到軟體上線之後
- C. Integrating security testing and practices earlier in the development lifecycle　／　把安全測試與實務提前整合到開發生命週期的早期階段　**← 正確答案**
- D. Moving operations staff to a different time zone　／　把維運人員調到不同時區

**解說：** 把開發流程畫成一條由左（需求、設計）到右（測試、上線、維運）的時間軸，「左移」就是把安全工作往前移：需求階段定義安全需求、設計階段做威脅建模、開發階段以 IDE 外掛與 SAST 即時檢查、提交時自動掃描相依套件。缺陷愈早發現，修正成本愈低；等上線後才發現漏洞，修補代價可能是設計階段的數十倍。

*Explanation:* Picture the lifecycle as a timeline from left (requirements, design) to right (testing, release, operations). Shifting left moves security work earlier: security requirements at the start, threat modeling during design, IDE plugins and SAST while coding, and dependency scans on every commit. The earlier a defect is found, the cheaper it is to fix; flaws found after release can cost many times more.

**ISO/IEC 27001:2022 附錄 A：** A.8.25 Secure development life cycle（安全開發生命週期）；A.8.26 Application security requirements（應用程式安全要求事項）；A.8.29 Security testing in development and acceptance（開發及驗收中之安全測試）

### AI-35｜容器化與DevOps｜難度 ★

**Which practice involves defining and provisioning infrastructure through machine-readable configuration files, such as Terraform or Ansible, that can be version-controlled?**

哪一種做法是透過機器可讀的設定檔（例如 Terraform、Ansible）來定義與建置基礎架構，且這些檔案可以納入版本控管？

- A. Shadow IT　／　影子 IT（Shadow IT）
- B. Infrastructure as Code (IaC)　／　基礎架構即程式碼（IaC）　**← 正確答案**
- C. Manual provisioning　／　手動建置
- D. Bare-metal imaging　／　裸機映像部署

**解說：** IaC 把伺服器、網路、防火牆規則等基礎架構寫成程式碼，帶來三大好處：可重複（每次建置結果一致，避免組態漂移）、可追溯（透過 Git 知道誰在何時改了什麼）、可審查（上線前能用工具掃描錯誤組態）。對稽核而言，IaC 讓組態管理與變更管理都有清楚的證據。影子 IT 是指未經 IT 部門核准、私自使用的系統或服務，是一種風險；手動建置則容易出錯且難以追蹤。

*Explanation:* IaC writes servers, networks and firewall rules as code. It is repeatable (consistent builds, no configuration drift), traceable (Git shows who changed what and when) and reviewable (tools can scan for misconfigurations before deployment). For auditors, IaC produces clear evidence for configuration and change management. Shadow IT is unapproved systems or services and is a risk, and manual provisioning is error-prone and hard to trace.

**ISO/IEC 27001:2022 附錄 A：** A.8.9 Configuration management（組態管理）；A.8.32 Change management（變更管理）

### AI-36｜容器化與DevOps｜難度 ★★

**To reduce software supply chain risk, a DevOps team wants to ensure that container images deployed to production have no known critical vulnerabilities and come from trusted sources. Which combination is most effective?**

為降低軟體供應鏈風險，DevOps 團隊希望確保部署到正式環境的容器映像檔沒有已知重大漏洞，且來自可信任的來源。哪一組做法最有效？

- A. Always pull the 'latest' tag from any public registry　／　一律從任何公開倉庫拉取「latest」標籤的映像檔
- B. Scan images for vulnerabilities in the pipeline, use minimal base images from trusted registries, and sign and verify images before deployment　／　在管線中掃描映像檔漏洞、使用來自可信任倉庫的精簡基礎映像檔，並在部署前對映像檔簽章與驗證　**← 正確答案**
- C. Run every container as root to avoid compatibility problems　／　所有容器都以 root 執行，以避免相容性問題
- D. Disable logging to improve container performance　／　停用日誌以提升容器效能

**解說：** 容器供應鏈安全有三個重點。一、掃描：在 CI 管線中使用 Trivy、Grype 等工具掃描映像檔，發現重大漏洞就阻擋部署。二、來源：使用官方或企業內部審核過的精簡基礎映像檔（如 distroless、Alpine），減少不必要的套件與攻擊面。三、完整性：以 Sigstore／cosign 等工具簽章，部署時驗證簽章，確保映像檔未遭竄改。「latest」標籤的內容會變動、無法追溯；以 root 執行與停用日誌都會增加風險。

*Explanation:* Container supply chain security has three parts. Scan images in CI with tools such as Trivy or Grype and block deployment on critical findings. Use official or internally approved minimal base images (distroless, Alpine) to cut unneeded packages. Sign images with Sigstore/cosign and verify signatures at deployment so tampering is caught. The 'latest' tag changes over time and is not traceable, while running as root or disabling logs adds risk.

**ISO/IEC 27001:2022 附錄 A：** A.8.8 Management of technical vulnerabilities（技術脆弱性管理）；A.5.21 Managing information security in the ICT supply chain（管理ICT供應鏈中之資訊安全）；A.8.25 Secure development life cycle（安全開發生命週期）

**稽核小叮嚀：** 可請團隊提供 SBOM 與最近一次的映像檔掃描報告，作為供應鏈管理的佐證。

### AI-37｜容器化與DevOps｜難度 ★★

**Why is running containers as the root user considered a security risk?**

為什麼以 root 使用者執行容器被視為一項安全風險？

- A. Containers running as root cannot access the network　／　以 root 執行的容器無法存取網路
- B. If an attacker compromises the container and escapes its isolation, they may gain root privileges on the host　／　若攻擊者攻陷容器並突破隔離，可能取得宿主機的 root 權限　**← 正確答案**
- C. Kubernetes does not allow root containers at all　／　Kubernetes 完全不允許 root 容器
- D. Root containers always use more memory　／　root 容器一定會占用更多記憶體

**解說：** 容器與宿主機共用核心，容器內的 root 在預設情況下對應的就是宿主機上的 UID 0。一旦應用程式被攻破，再配合核心或容器執行環境的漏洞（例如 runc 漏洞 CVE-2019-5736），攻擊者就可能逃逸並取得整台主機的最高權限。最佳做法是在 Dockerfile 以 USER 指定非 root 使用者、移除不需要的 Linux capabilities、使用唯讀檔案系統，並以 Kubernetes 的 Pod Security Standards 強制限制。

*Explanation:* Containers share the host kernel, and root inside a container maps to UID 0 on the host by default. If the application is compromised and combined with a kernel or runtime flaw (such as runc CVE-2019-5736), the attacker may escape and own the host. Specify a non-root USER in the Dockerfile, drop unneeded Linux capabilities, use a read-only filesystem and enforce Kubernetes Pod Security Standards.

**ISO/IEC 27001:2022 附錄 A：** A.8.2 Privileged access rights（特殊存取權限）；A.8.9 Configuration management（組態管理）

### AI-38｜容器化與DevOps｜難度 ★★

**A team maintains two identical production environments. Traffic is switched from the current version to the new version all at once, and the team can roll back quickly by switching back. What is this deployment strategy called?**

某團隊維護兩套完全相同的正式環境，上線時一次把流量從舊版本切換到新版本，若有問題只要切回去就能快速回復。這種部署策略稱為什麼？

- A. Canary release　／　金絲雀發布（Canary Release）
- B. Rolling update　／　滾動更新（Rolling Update）
- C. Big-bang migration　／　大爆炸式移轉（Big-bang Migration）
- D. Blue-green deployment　／　藍綠部署（Blue-Green Deployment）　**← 正確答案**

**解說：** 藍綠部署準備「藍」（現行版本）與「綠」（新版本）兩套環境，新版本在綠環境驗證完成後一次切換流量，出問題再切回藍環境，停機時間極短、回復迅速。金絲雀發布是先讓一小部分使用者（如 5%）使用新版本，觀察正常後再逐步擴大；滾動更新是逐台替換伺服器；大爆炸式移轉是一次全面切換、且沒有並行的舊環境可退回，風險最高。從變更管理的角度來看，藍綠部署讓「回復計畫」變得具體可行。

*Explanation:* Blue-green deployment keeps a blue (current) and a green (new) environment. Once green is verified, traffic switches over at once, and switching back is the rollback, so downtime is minimal and recovery fast. A canary release sends a small share of users (say 5%) to the new version first and expands gradually. A rolling update replaces servers one by one. A big-bang migration switches everything with no parallel environment to return to, the riskiest option. For change management, blue-green makes the rollback plan concrete.

**ISO/IEC 27001:2022 附錄 A：** A.8.32 Change management（變更管理）；A.8.31 Separation of development, test and production environments（開發、測試及生產環境之區隔）

### AI-39｜軟體開發與程式設計｜難度 ★

**Which coding practice is the most effective defense against SQL injection?**

下列哪一種程式撰寫做法，是防禦 SQL 隱碼攻擊（SQL Injection）最有效的方法？

- A. Hiding database error messages from users　／　對使用者隱藏資料庫錯誤訊息
- B. Using parameterized queries (prepared statements)　／　使用參數化查詢（預備陳述式）　**← 正確答案**
- C. Requiring users to choose longer passwords　／　要求使用者設定更長的密碼
- D. Encoding all output as HTML　／　把所有輸出內容做 HTML 編碼

**解說：** SQL 隱碼攻擊的成因，是把使用者輸入直接串接進 SQL 字串，例如輸入 ' OR '1'='1 讓查詢條件永遠成立。參數化查詢讓 SQL 結構與資料分開傳送，資料庫會把輸入一律當成「值」而非「指令」，從根本上杜絕注入。隱藏錯誤訊息只能增加攻擊難度（盲注仍可能成功）；HTML 編碼是防 XSS 的方法；密碼長度與 SQL 注入無關。再搭配最小權限的資料庫帳號與輸入驗證，就能形成縱深防禦。

*Explanation:* SQL injection happens when user input is concatenated into SQL strings, for example ' OR '1'='1 making a condition always true. Parameterized queries send the SQL structure and the data separately, so the database treats input as values, never as commands, which removes the root cause. Hiding errors only slows attackers (blind injection still works), HTML encoding defends against XSS, and password length is unrelated. Least-privilege database accounts and input validation add defense in depth.

**ISO/IEC 27001:2022 附錄 A：** A.8.28 Secure coding（安全程式設計）

### AI-40｜軟體開發與程式設計｜難度 ★

**An attacker posts malicious JavaScript in a website's comment field, and the script then runs in the browsers of other users who view the comments. What vulnerability is this?**

攻擊者在網站留言欄位張貼惡意 JavaScript，其他使用者瀏覽留言時，這段腳本就在他們的瀏覽器中執行。這是什麼漏洞？

- A. Cross-site request forgery (CSRF)　／　跨站請求偽造（CSRF）
- B. SQL injection　／　SQL 隱碼攻擊
- C. Stored cross-site scripting (XSS)　／　儲存型跨站腳本攻擊（Stored XSS）　**← 正確答案**
- D. Directory traversal　／　目錄遍歷（Directory Traversal）

**解說：** 惡意腳本被「儲存」在網站資料庫中，再被送到其他使用者的瀏覽器執行，就是儲存型 XSS，可用來竊取 Session Cookie、冒用身分操作或植入釣魚內容。防禦方式：依輸出位置做適當編碼（Output Encoding）、輸入驗證、設定內容安全政策（CSP），並將 Cookie 設為 HttpOnly。CSRF 是誘使已登入的使用者送出非本意的請求；SQL 注入攻擊的是資料庫；目錄遍歷是利用 ../ 讀取伺服器上不該存取的檔案。

*Explanation:* A malicious script stored in the site's database and then served to other users' browsers is stored XSS. It can steal session cookies, perform actions as the victim or inject phishing content. Defenses: context-aware output encoding, input validation, a Content Security Policy and HttpOnly cookies. CSRF tricks a logged-in user into sending unintended requests, SQL injection targets the database, and directory traversal uses ../ to read files outside the web root.

**ISO/IEC 27001:2022 附錄 A：** A.8.28 Secure coding（安全程式設計）；A.8.26 Application security requirements（應用程式安全要求事項）

### AI-41｜軟體開發與程式設計｜難度 ★★

**In the OWASP Top 10 (2021 edition), which category is ranked first as the most serious web application security risk?**

在 OWASP Top 10（2021 年版）中，排名第一、被視為最嚴重的網站應用程式安全風險是哪一類？

- A. Injection　／　注入攻擊（Injection）
- B. Cryptographic Failures　／　加密機制失效（Cryptographic Failures）
- C. Security Misconfiguration　／　安全設定缺陷（Security Misconfiguration）
- D. Broken Access Control　／　存取控制失效（Broken Access Control）　**← 正確答案**

**解說：** OWASP Top 10 2021 年版的前三名依序為：A01 存取控制失效、A02 加密機制失效、A03 注入攻擊（2017 年版第一名的注入攻擊下降到第三）。存取控制失效是指使用者能做超出權限的事，例如修改網址中的訂單編號就能看到別人的訂單（IDOR）、一般使用者能呼叫管理者 API。防禦重點是在伺服器端對每一個請求檢查授權，並採「預設拒絕」。

*Explanation:* The top three in the OWASP Top 10 2021 are A01 Broken Access Control, A02 Cryptographic Failures and A03 Injection; Injection fell from first place in 2017. Broken access control lets users act beyond their permissions, such as changing an order ID in the URL to see someone else's order (IDOR) or calling admin APIs as a normal user. Check authorization on the server for every request and deny by default.

**ISO/IEC 27001:2022 附錄 A：** A.8.3 Information access restriction（資訊存取限制）；A.8.26 Application security requirements（應用程式安全要求事項）；A.8.28 Secure coding（安全程式設計）

**稽核小叮嚀：** OWASP Top 10 常被用作委外開發契約與驗收的安全要求依據，例如明訂「上線前須通過 OWASP Top 10 檢測」。

### AI-42｜軟體開發與程式設計｜難度 ★★

**How should an application store user passwords?**

應用程式應該如何儲存使用者密碼？

- A. Encrypted with AES using a key hard-coded in the source code　／　以 AES 加密，金鑰直接寫在原始碼中
- B. Hashed with a slow, salted algorithm designed for passwords, such as bcrypt, scrypt or Argon2　／　使用專為密碼設計、加鹽且運算緩慢的雜湊演算法，例如 bcrypt、scrypt 或 Argon2　**← 正確答案**
- C. In plain text in a table that only administrators can read　／　以明文存放在只有管理者能讀取的資料表中
- D. Hashed with MD5 because it is fast　／　使用 MD5 雜湊，因為速度快

**解說：** 密碼應該「雜湊」而不是「加密」：系統不需要知道原始密碼，只需要比對雜湊值。加鹽（Salt）讓相同的密碼產生不同的雜湊，可抵禦彩虹表；刻意放慢運算的演算法（bcrypt、scrypt、Argon2、PBKDF2）讓攻擊者暴力破解的成本大增。MD5、SHA-1 速度太快，一張顯示卡每秒可嘗試數十億次；AES 加密若金鑰外洩就能還原全部密碼；明文儲存更是絕對禁止。

*Explanation:* Passwords should be hashed, not encrypted: the system only needs to compare hashes, never the original. A salt makes identical passwords hash differently and defeats rainbow tables, and deliberately slow algorithms (bcrypt, scrypt, Argon2, PBKDF2) make brute force expensive. MD5 and SHA-1 are so fast that one GPU can try billions of guesses per second, AES with a leaked key reveals every password, and plain text is never acceptable.

**ISO/IEC 27001:2022 附錄 A：** A.5.17 Authentication information（鑑別資訊）；A.8.24 Use of cryptography（密碼技術之使用）

### AI-43｜軟體開發與程式設計｜難度 ★

**Why is a version control system such as Git important for change management and auditability in software development?**

為什麼像 Git 這樣的版本控制系統，對軟體開發的變更管理與可稽核性很重要？

- A. It compresses source code to save disk space　／　它能壓縮原始碼以節省磁碟空間
- B. It encrypts the source code automatically　／　它會自動加密原始碼
- C. It records who changed what, when and why, enabling traceability, peer review and rollback　／　它記錄誰在何時、為何修改了什麼，支援追溯、同儕審查與版本回復　**← 正確答案**
- D. It removes the need for software testing　／　它讓軟體測試變得不再需要

**解說：** 版本控制系統完整記錄每一次變更的作者、時間、內容與說明（commit message）；搭配合併請求（Pull Request），可要求同儕審查後才能併入主線，並可隨時回復到先前的版本。對 ISMS 而言，這同時提供原始碼存取控制、變更管理與職務區隔的佐證，例如設定分支保護（Branch Protection），讓開發者無法自行核准自己的程式碼。版本控制不會自動加密，也不能取代測試。

*Explanation:* Version control records the author, time, content and reason (commit message) for every change. Pull requests can require peer review before merging, and any earlier version can be restored. For an ISMS this provides evidence for source code access control, change management and segregation of duties, for example branch protection that stops developers approving their own code. Version control does not encrypt code or replace testing.

**ISO/IEC 27001:2022 附錄 A：** A.8.4 Access to source code（對原始碼之存取）；A.8.32 Change management（變更管理）；A.5.3 Segregation of duties（職務區隔）

**稽核小叮嚀：** 稽核開發流程時，可隨機抽一筆正式環境的變更，往回追到對應的 commit、Pull Request 的審查者與測試紀錄。

### AI-44｜軟體開發與程式設計｜難度 ★★

**Which framework is commonly used to let a third-party application access a user's resources through an API without the user sharing their password with that application?**

哪一種框架常用於讓第三方應用程式透過 API 存取使用者的資源，而使用者不需要把密碼交給該應用程式？

- A. OAuth 2.0　／　OAuth 2.0　**← 正確答案**
- B. FTP　／　FTP（檔案傳輸協定）
- C. Telnet　／　Telnet
- D. HTTP Basic Authentication　／　HTTP 基本驗證（Basic Authentication）

**解說：** OAuth 2.0 是「授權」框架：使用者在授權伺服器（如 Google）登入並同意授權範圍（Scope）後，第三方應用程式取得的是有時效、可撤銷的存取權杖（Access Token），而不是使用者的密碼，例如「允許某 App 讀取你的 Google 行事曆」。若還需要確認「使用者是誰」（身分驗證），則使用建立在 OAuth 2.0 之上的 OpenID Connect（OIDC）。HTTP 基本驗證每次都要傳送帳號密碼；FTP 與 Telnet 更是以明文傳輸。

*Explanation:* OAuth 2.0 is an authorization framework. The user signs in at the authorization server (such as Google) and approves a scope, and the third-party app receives a time-limited, revocable access token instead of the password, as in 'allow this app to read your Google Calendar'. To establish who the user is (authentication), use OpenID Connect, built on OAuth 2.0. HTTP Basic sends the credentials with every request, and FTP and Telnet transmit in clear text.

**ISO/IEC 27001:2022 附錄 A：** A.5.15 Access control（存取控制）；A.8.5 Secure authentication（安全鑑別）

### AI-45｜軟體開發與程式設計｜難度 ★

**Why should development, testing and production environments be separated?**

為什麼開發、測試與正式（生產）環境必須區隔？

- A. To reduce software license costs　／　為了降低軟體授權費用
- B. To prevent untested changes and test activities from affecting production systems, and to protect production data　／　避免未經測試的變更與測試活動影響正式系統，並保護正式環境的資料　**← 正確答案**
- C. Because cloud providers require it by law　／　因為雲端供應商在法律上強制要求
- D. So that developers can deploy directly to production more quickly　／　讓開發人員可以更快速地直接部署到正式環境

**解說：** 環境區隔的目的，是避免開發中的程式、測試操作或錯誤設定影響正在服務客戶的正式系統，並防止開發人員未經授權接觸正式資料。常見做法包括：使用不同的網段或帳號、開發人員對正式環境沒有寫入權限、程式只能經由核准的部署流程上線、正式環境不安裝開發工具。這也是職務區隔的具體展現。

*Explanation:* Separating environments keeps code under development, test activity and misconfigurations from disrupting the systems serving customers, and keeps developers from reaching production data without authorization. Typical measures: separate networks or accounts, no write access to production for developers, deployment only through an approved pipeline, and no development tools on production systems. It is also an application of segregation of duties.

**ISO/IEC 27001:2022 附錄 A：** A.8.31 Separation of development, test and production environments（開發、測試及生產環境之區隔）；A.5.3 Segregation of duties（職務區隔）

**稽核小叮嚀：** 小型組織人力有限，若開發與維運由同一人負責，應以日誌審查、主管核准等補償性控制降低風險。

### AI-46｜軟體開發與程式設計｜難度 ★★

**A developer wants to copy production customer data into the test environment to make testing more realistic. What is the best practice?**

開發人員想把正式環境的客戶資料複製到測試環境，讓測試更貼近真實。最佳做法是什麼？

- A. Copy the data as-is, since the test environment is internal　／　直接原樣複製，反正測試環境是內部的
- B. Email the data to the testers so they can load it themselves　／　把資料用電子郵件寄給測試人員，讓他們自行匯入
- C. Use masked, anonymized or synthetic data, and if real data is unavoidable, obtain approval and apply production-equivalent controls　／　使用遮罩、匿名化或合成資料；若不得不使用真實資料，須經核准並套用與正式環境同等的控制　**← 正確答案**
- D. Store the data in a public repository so everyone on the team can access it　／　把資料放在公開儲存庫，方便團隊所有人存取

**解說：** 測試環境的防護通常比正式環境弱，存取的人也比較多；直接複製正式資料等於擴大個資外洩的風險，也可能違反個資「特定目的外利用」的限制。最佳做法是使用資料遮罩（如姓名「王○明」、身分證「A12345****」）、去識別化或以程式產生的合成資料。若確有必要使用真實資料，應經權責主管核准、留下紀錄、限制存取，並在測試完畢後確實刪除。

*Explanation:* Test environments are usually less protected and accessed by more people, so copying production data widens exposure and may breach purpose limitation under privacy law. Use data masking, de-identification or synthetic data instead. If real data is truly necessary, get management approval, log it, restrict access to production-equivalent levels and delete it after testing.

**ISO/IEC 27001:2022 附錄 A：** A.8.33 Test information（測試資訊）；A.8.11 Data masking（資料遮蔽）；A.5.34 Privacy and protection of PII（隱私及個人可識別資訊保護）

**稽核小叮嚀：** A.8.11 資料遮蔽是 ISO 27001:2022 新增的控制措施，可以和 A.8.33 測試資訊一併檢視。

### AI-47｜軟體開發與程式設計｜難度 ★★

**What is a Software Bill of Materials (SBOM) primarily used for?**

軟體物料清單（SBOM）的主要用途是什麼？

- A. A formal inventory of the components and dependencies in a piece of software, used to manage supply chain vulnerabilities and licenses　／　正式列出軟體所包含的元件與相依套件的清單，用於管理供應鏈漏洞與授權　**← 正確答案**
- B. A billing statement listing software license fees　／　列出軟體授權費用的帳單
- C. A user manual describing how to install the software　／　說明如何安裝軟體的使用手冊
- D. A list of the developers who worked on the project　／　參與專案的開發人員名單

**解說：** SBOM 就像食品的成分標示，列出軟體用了哪些開源與商業元件、版本與授權。當 Log4Shell（CVE-2021-44228）這類重大漏洞爆發時，有 SBOM 的組織可以在幾分鐘內查出哪些系統受影響，沒有的組織往往要花上數週盤點。常見格式有 SPDX 與 CycloneDX；美國第 14028 號行政命令也推動供應聯邦政府的軟體提供 SBOM。

*Explanation:* An SBOM is like an ingredients label: it lists the open-source and commercial components, versions and licenses inside software. When a critical flaw such as Log4Shell (CVE-2021-44228) appears, organizations with SBOMs can find affected systems in minutes while others spend weeks taking inventory. Common formats are SPDX and CycloneDX, and US Executive Order 14028 pushed for SBOMs in software sold to the federal government.

**ISO/IEC 27001:2022 附錄 A：** A.5.21 Managing information security in the ICT supply chain（管理ICT供應鏈中之資訊安全）；A.8.8 Management of technical vulnerabilities（技術脆弱性管理）；A.5.9 Inventory of information and other associated assets（資訊及其他相關聯資產之清冊）

### AI-48｜資料庫與大數據｜難度 ★

**In relational databases, what does the 'A' in ACID stand for, ensuring that a transaction is either completed entirely or not executed at all?**

在關聯式資料庫中，ACID 的「A」代表什麼？它確保一筆交易要嘛全部完成，要嘛完全不執行。

- A. Availability　／　可用性（Availability）
- B. Authorization　／　授權（Authorization）
- C. Atomicity　／　原子性（Atomicity）　**← 正確答案**
- D. Accuracy　／　準確性（Accuracy）

**解說：** ACID 是交易（Transaction）可靠性的四大特性：原子性（Atomicity，全有或全無）、一致性（Consistency，交易前後都符合規則）、隔離性（Isolation，同時進行的交易互不干擾）、持久性（Durability，提交後即使當機也不遺失）。以銀行轉帳為例：A 帳戶扣款與 B 帳戶入帳必須同時成功，若中途失敗就整筆回滾（Rollback），不能只扣不入。

*Explanation:* ACID describes reliable transactions: Atomicity (all or nothing), Consistency (rules hold before and after), Isolation (concurrent transactions do not interfere) and Durability (committed data survives crashes). In a bank transfer, debiting A and crediting B must both succeed; if anything fails midway, the whole transaction rolls back.

**稽核小叮嚀：** ACID 的一致性與資訊安全 CIA 的完整性（Integrity）觀念相通，都是確保資料正確、不被不當改變。

### AI-49｜資料庫與大數據｜難度 ★★

**According to the CAP theorem, when a network partition occurs, a distributed database must choose between which two properties?**

根據 CAP 定理，當分散式資料庫發生網路分割（Partition）時，必須在哪兩項特性之間做取捨？

- A. Confidentiality and Authentication　／　機密性與鑑別性
- B. Consistency and Availability　／　一致性與可用性　**← 正確答案**
- C. Capacity and Performance　／　容量與效能
- D. Compression and Archiving　／　壓縮與歸檔

**解說：** CAP 定理指出，分散式系統無法同時完全滿足一致性（Consistency，所有節點看到相同資料）、可用性（Availability，每個請求都能得到回應）與分割容忍（Partition tolerance，網路中斷時系統仍能運作）。由於網路分割在分散式環境中無法避免，實務上就是在 C 與 A 之間取捨：銀行帳務系統偏向一致性（寧可暫停服務也不能算錯），社群網站的按讚數則偏向可用性（短暫不一致可以接受）。注意：CAP 的 C 與資訊安全 CIA 的 C（機密性）是不同的概念。

*Explanation:* The CAP theorem says a distributed system cannot fully guarantee Consistency (every node sees the same data), Availability (every request gets a response) and Partition tolerance (keeps working when the network splits) at once. Partitions are unavoidable, so the real choice is between C and A: banking ledgers favor consistency, while social media like counts favor availability. The C in CAP is not the confidentiality in the CIA triad.

### AI-50｜資料庫與大數據｜難度 ★

**What is the main purpose of database normalization?**

資料庫正規化（Normalization）的主要目的是什麼？

- A. To encrypt sensitive columns in the database　／　對資料庫中的敏感欄位加密
- B. To deliberately duplicate data for faster reporting　／　刻意複製資料以加快報表產出
- C. To create daily backups of the database　／　每天建立資料庫備份
- D. To reduce data redundancy and improve data integrity by organizing data into well-structured tables　／　透過將資料組織成結構良好的資料表，減少資料重複並提升資料完整性　**← 正確答案**

**解說：** 正規化把資料拆成多個結構清楚的資料表，以主鍵與外鍵建立關聯，讓每項事實只存在一個地方。例如客戶地址只存在客戶表，訂單表只存客戶編號；地址變更時只需修改一處，避免同一位客戶在不同表中出現不同地址（更新異常）。刻意複製資料以加速查詢是「反正規化」，常用於資料倉儲；加密與備份則是安全與可用性措施，與正規化無關。

*Explanation:* Normalization splits data into well-structured tables linked by primary and foreign keys so each fact is stored once. A customer's address lives only in the customer table and orders store just the customer ID, so a change happens in one place and update anomalies disappear. Deliberate duplication for faster queries is denormalization, common in data warehouses. Encryption and backups are security and availability measures unrelated to normalization.

### AI-51｜資料庫與大數據｜難度 ★★

**Transparent Data Encryption (TDE) in a database primarily protects against which threat?**

資料庫的透明資料加密（TDE）主要用來防範哪一種威脅？

- A. SQL injection through the application　／　透過應用程式發動的 SQL 隱碼攻擊
- B. Theft of database files or backup media (data at rest)　／　資料庫檔案或備份媒體遭竊（靜態資料）　**← 正確答案**
- C. Malicious queries run by an authorized DBA　／　具合法權限的 DBA 執行惡意查詢
- D. Eavesdropping on traffic between the application and the database　／　竊聽應用程式與資料庫之間的傳輸流量

**解說：** TDE 在資料寫入磁碟時自動加密、讀取時自動解密，對應用程式而言是「透明」的。它保護的是靜態資料：即使有人偷走硬碟、資料庫檔案或備份磁帶，沒有金鑰也讀不到內容。但對已通過驗證的連線，資料會自動解密，所以 TDE 擋不住 SQL 注入，也擋不住有權限的 DBA；傳輸中的資料則要靠 TLS 保護。常見的誤解是：「資料庫有加密」就代表所有威脅都處理了。

*Explanation:* TDE encrypts data as it is written to disk and decrypts it on read, transparently to the application. It protects data at rest: stolen disks, database files or backup tapes are unreadable without the key. Authenticated connections see decrypted data, so TDE does not stop SQL injection or a privileged DBA, and data in transit needs TLS. 'The database is encrypted' does not mean every threat is covered.

**ISO/IEC 27001:2022 附錄 A：** A.8.24 Use of cryptography（密碼技術之使用）

**稽核小叮嚀：** 稽核時若聽到「資料庫已加密」，請追問：加密的是哪一層？金鑰存放在哪裡、誰能存取？

### AI-52｜資料庫與大數據｜難度 ★

**Big data is commonly characterized by the '3Vs'. Which set correctly identifies them?**

大數據常以「3V」來描述其特性。下列哪一組正確？

- A. Volume, Velocity, Variety　／　資料量（Volume）、速度（Velocity）、多樣性（Variety）　**← 正確答案**
- B. Value, Vision, Validation　／　價值、願景、驗證
- C. Virtualization, VPN, VLAN　／　虛擬化、VPN、VLAN
- D. Version, Vendor, Visibility　／　版本、供應商、可視性

**解說：** 大數據的 3V：Volume（資料量龐大，TB、PB 等級）、Velocity（產生與處理速度快，如即時感測資料、交易串流）、Variety（格式多樣，包含結構化表格、半結構化的 JSON、非結構化的影像與文字）。後來常再加上 Veracity（真實性，資料品質）與 Value（價值），合稱 5V。以台中的智慧工廠為例，每台機台每秒都在產生大量且多樣的感測資料，就是典型的大數據情境。

*Explanation:* The 3Vs of big data are Volume (terabytes to petabytes), Velocity (data generated and processed fast, such as sensor or transaction streams) and Variety (structured tables, semi-structured JSON, unstructured images and text). Veracity (data quality) and Value are often added to make 5Vs. A smart factory where every machine emits varied sensor data every second is a typical big data scenario.

### AI-53｜資料庫與大數據｜難度 ★★

**What is the key difference between a data lake and a data warehouse?**

資料湖（Data Lake）與資料倉儲（Data Warehouse）最主要的差異是什麼？

- A. A data lake stores only structured data, while a data warehouse stores only video files　／　資料湖只存結構化資料，資料倉儲只存影片檔
- B. A data lake stores raw data in its native format (structured, semi-structured or unstructured), while a data warehouse stores processed, structured data optimized for analysis and reporting　／　資料湖以原始格式存放各類資料（結構化、半結構化或非結構化），資料倉儲則存放經處理、結構化且為分析與報表最佳化的資料　**← 正確答案**
- C. They are identical terms used by different vendors　／　兩者是不同廠商對同一件事的稱呼
- D. A data lake is used only for backups, while a data warehouse is used only for transactions　／　資料湖只用於備份，資料倉儲只用於交易處理

**解說：** 資料倉儲採「先定義結構再寫入（Schema-on-write）」，資料經 ETL 清理整合後才存入，適合商業智慧（BI）報表與固定分析；資料湖採「讀取時再定義結構（Schema-on-read）」，先把原始資料大量存進來，適合資料科學與機器學習探索。結合兩者優點的架構稱為 Lakehouse。從資安角度要注意：資料湖容易變成什麼都往裡丟的「資料沼澤」，個資混在其中卻沒人知道，因此資料盤點與分類分級格外重要。

*Explanation:* A data warehouse is schema-on-write: data is cleaned and integrated through ETL before loading, suiting BI reports and fixed analysis. A data lake is schema-on-read: raw data lands first, suiting data science and ML exploration. A lakehouse combines both. From a security view, a lake can turn into a 'data swamp' where personal data hides unnoticed, so data inventory and classification are essential.

**ISO/IEC 27001:2022 附錄 A：** A.5.12 Classification of information（資訊之分類分級）；A.5.9 Inventory of information and other associated assets（資訊及其他相關聯資產之清冊）

### AI-54｜資料庫與大數據｜難度 ★

**In data integration, what does ETL stand for?**

在資料整合領域中，ETL 代表什麼？

- A. Encrypt, Transfer, Log　／　加密、傳輸、記錄
- B. Evaluate, Test, Launch　／　評估、測試、上線
- C. Export, Translate, Link　／　匯出、翻譯、連結
- D. Extract, Transform, Load　／　擷取（Extract）、轉換（Transform）、載入（Load）　**← 正確答案**

**解說：** ETL 是資料整合的三個步驟：從來源系統擷取資料、依規則清洗與轉換格式（例如統一日期格式、去除重複、計算彙總），再載入目標系統（通常是資料倉儲）。標準題 STD-01 提到的 SSIS，就是微軟的 ETL 工具。雲端時代也常見 ELT：先載入資料湖或雲端資料倉儲，再利用其強大的運算能力進行轉換。ETL 過程中經常搬移大量個資，傳輸加密、存取控制與作業日誌都不能少。

*Explanation:* ETL is three steps: extract data from source systems, transform it by rules (standardize dates, remove duplicates, compute aggregates) and load it into a target, usually a data warehouse. SSIS from question STD-01 is Microsoft's ETL tool. In the cloud, ELT is common: load into a lake or cloud warehouse first, then transform with its compute. ETL jobs move large amounts of personal data, so encryption in transit, access control and job logs are essential.

**ISO/IEC 27001:2022 附錄 A：** A.5.14 Information transfer（資訊傳送）

### AI-55｜資料庫與大數據｜難度 ★★

**Which tool continuously monitors and audits database activity, including privileged user access, to detect suspicious queries in real time?**

哪一種工具能持續監控與稽核資料庫活動（包括特權使用者的存取），即時偵測可疑的查詢？

- A. Database Activity Monitoring (DAM)　／　資料庫活動監控（DAM）　**← 正確答案**
- B. Content Delivery Network (CDN)　／　內容傳遞網路（CDN）
- C. Dynamic Host Configuration Protocol (DHCP)　／　動態主機設定協定（DHCP）
- D. Redundant Array of Independent Disks (RAID)　／　磁碟陣列（RAID）

**解說：** DAM 以網路側錄或資料庫主機代理程式的方式，記錄並分析每一筆 SQL 活動：誰、何時、從哪裡、執行了什麼查詢、存取了多少筆資料。它能偵測異常，例如 DBA 在半夜匯出整張客戶資料表、應用程式帳號突然從陌生 IP 連入，並產生 DBA 難以自行竄改的稽核軌跡，有助於落實職務區隔。CDN、DHCP、RAID 都與資料庫活動監控無關。

*Explanation:* DAM records and analyzes every SQL activity through network sniffing or host agents: who, when, from where, which query and how many rows. It flags anomalies such as a DBA exporting the entire customer table at midnight or an application account connecting from an unfamiliar IP, and it keeps an audit trail the DBA cannot easily alter, supporting segregation of duties. CDN, DHCP and RAID are unrelated.

**ISO/IEC 27001:2022 附錄 A：** A.8.15 Logging（存錄）；A.8.16 Monitoring activities（監視活動）

**稽核小叮嚀：** 存放大量個資的資料庫，稽核時可詢問：DBA 的操作由誰審查？審查頻率多久一次？紀錄在哪裡？

### AI-56｜資料庫與大數據｜難度 ★★★

**Under the GDPR, how does pseudonymized data differ from anonymized data?**

依據 GDPR，假名化資料與匿名化資料有何不同？

- A. Pseudonymized data can still be re-identified with additional information kept separately, so it remains personal data; truly anonymized data cannot be re-identified and falls outside the GDPR's scope　／　假名化資料搭配另外保存的額外資訊仍可重新識別，因此仍屬個人資料；真正匿名化的資料無法再識別，不在 GDPR 規範範圍內　**← 正確答案**
- B. There is no difference; both terms mean the data is encrypted　／　兩者沒有差別，都是指資料已經加密
- C. Anonymized data can be re-identified, while pseudonymized data never can　／　匿名化資料可以重新識別，假名化資料則永遠不能
- D. Pseudonymization means encrypting data with a public key　／　假名化是指以公開金鑰加密資料

**解說：** 假名化（GDPR 第 4 條第 5 款）是以代號取代可直接識別的欄位（例如把姓名換成「客戶 A001」），但只要拿到另外保存的對照表就能還原，所以仍屬個人資料，只是降低了風險，是 GDPR 鼓勵的安全措施。匿名化（GDPR 前言第 26 點）則是以任何合理可能的方法都無法再識別個人，這時才不受 GDPR 規範。實務上真正的匿名化很難達成，多個欄位組合（郵遞區號＋生日＋性別）就可能識別出特定個人。台灣的個資法則使用「去識別化」的概念。

*Explanation:* Pseudonymization (GDPR Article 4(5)) replaces direct identifiers with codes, such as a name becoming 'Customer A001', but anyone holding the separately stored mapping can reverse it, so the data stays personal data with reduced risk. Anonymization (Recital 26) means no one can re-identify the person by any means reasonably likely to be used, and only then does GDPR stop applying. True anonymization is hard: combining a postal code, birth date and gender can single someone out. Taiwan's PDPA uses the concept of de-identification.

**ISO/IEC 27001:2022 附錄 A：** A.8.11 Data masking（資料遮蔽）；A.5.34 Privacy and protection of PII（隱私及個人可識別資訊保護）

**稽核小叮嚀：** PIMS 輔導時常見的誤區：客戶以為資料「遮罩過」就不算個資了。請提醒：只要還能還原，就仍須依個資規範管理。

### AI-57｜IT服務管理與維運｜難度 ★

**In ITIL, what is the main difference between incident management and problem management?**

在 ITIL 中，事件管理（Incident Management）與問題管理（Problem Management）的主要差異是什麼？

- A. Incident management restores normal service as quickly as possible, while problem management identifies and addresses the root cause of one or more incidents　／　事件管理是盡快恢復正常服務，問題管理則是找出並處理一個或多個事件的根本原因　**← 正確答案**
- B. They are the same process with different names　／　兩者是名稱不同的同一個流程
- C. Problem management only handles password resets　／　問題管理只處理密碼重設
- D. Incident management applies only to security breaches　／　事件管理只適用於資安入侵事件

**解說：** 事件管理的目標是「止血」：使用者無法列印、系統當機時，以最快速度恢復服務，即使只是暫時性的解決方法（Workaround），例如重新開機。問題管理的目標是「根治」：分析同類事件反覆發生的根本原因（例如某個驅動程式有缺陷），提出永久解決方案並透過變更管理實施，避免再次發生。已知原因但尚未根治的問題，會記錄為「已知錯誤（Known Error）」。在 ITIL 中，Incident 泛指所有非計畫性的服務中斷，不限於資安事件。

*Explanation:* Incident management stops the bleeding: when a printer or system fails, restore service as fast as possible, even with a temporary workaround such as a reboot. Problem management finds the cure: analyze why similar incidents recur (for example, a faulty driver), design a permanent fix and implement it through change management. A problem with a known cause but no permanent fix yet is recorded as a known error. In ITIL, an incident is any unplanned service interruption, not only a security event.

**ISO/IEC 27001:2022 附錄 A：** A.5.24 Information security incident management planning and preparation（資訊安全事故管理規劃及準備）；A.5.27 Learning from information security incidents（由資訊安全事故中學習）

**稽核小叮嚀：** ISO 27001 也有「由資訊安全事故中學習（A.5.27）」，精神和問題管理的根本原因分析相同。

### AI-58｜IT服務管理與維運｜難度 ★

**Which document defines the agreed service levels, such as 99.9% availability and response times, between an IT service provider and its customer?**

哪一份文件定義了 IT 服務提供者與客戶之間約定的服務水準，例如 99.9% 可用率與回應時間？

- A. Service Level Agreement (SLA)　／　服務水準協議（SLA）　**← 正確答案**
- B. Non-Disclosure Agreement (NDA)　／　保密協議（NDA）
- C. Memorandum of Understanding (MOU)　／　合作備忘錄（MOU）
- D. Request for Comments (RFC)　／　網際網路技術文件（RFC）

**解說：** SLA 是服務提供者與客戶之間的協議，明定可用率、事件回應與解決時間、支援時段、量測方式，以及未達標時的罰則或補償。內部單位之間的協議稱為 OLA（營運水準協議）；與外部供應商簽訂、用來支撐 SLA 的合約稱為 UC（支援合約）。NDA 規範保密義務；MOU 是合作意向；RFC 是網際網路技術標準文件（早期 ITIL 也以 RFC 代表變更請求）。

*Explanation:* An SLA between a provider and its customer specifies availability, incident response and resolution times, support hours, how they are measured and the penalties or credits for missing them. An agreement between internal teams is an OLA, and a contract with an external supplier that underpins the SLA is an underpinning contract (UC). An NDA covers confidentiality, an MOU states intent to cooperate, and an RFC is an internet standards document (older ITIL also used RFC for a request for change).

**ISO/IEC 27001:2022 附錄 A：** A.5.20 Addressing information security within supplier agreements（於供應者協議中闡明資訊安全）；A.5.22 Monitoring, review and change management of supplier services（供應者服務之監視、審查及變更管理）

**稽核小叮嚀：** 稽核委外服務時，除了看 SLA 內容，更要看「SLA 達成報告」，以及未達標時是否有檢討與追蹤。

### AI-59｜IT服務管理與維運｜難度 ★★

**A service has an SLA of 99.9% monthly availability. Approximately how much downtime is allowed in a 30-day month?**

某服務的 SLA 為每月 99.9% 可用率。以 30 天的月份計算，大約允許多少停機時間？

- A. About 4.3 minutes　／　約 4.3 分鐘
- B. About 43 minutes　／　約 43 分鐘　**← 正確答案**
- C. About 7.2 hours　／　約 7.2 小時
- D. About 3 days　／　約 3 天

**解說：** 30 天 × 24 小時 × 60 分鐘 = 43,200 分鐘；不可用比例 0.1% × 43,200 = 43.2 分鐘。常見對照：99%（兩個 9）約 7.2 小時／月；99.9%（三個 9）約 43 分鐘／月；99.99%（四個 9）約 4.3 分鐘／月；99.999%（五個 9）每月不到 30 秒。每多一個 9，所需的備援架構與成本都會大幅增加，因此可用率目標應依營運衝擊分析（BIA）的結果來訂定。

*Explanation:* 30 days × 24 hours × 60 minutes = 43,200 minutes, and 0.1% of that is 43.2 minutes. Reference points: 99% is about 7.2 hours a month, 99.9% about 43 minutes, 99.99% about 4.3 minutes and 99.999% under 30 seconds. Each extra nine sharply raises the redundancy and cost required, so availability targets should come from a business impact analysis.

**ISO/IEC 27001:2022 附錄 A：** A.8.14 Redundancy of information processing facilities（資訊處理設施之備援）；A.5.30 ICT readiness for business continuity（營運持續之ICT備妥性）

**稽核小叮嚀：** 稽核時可留意：SLA 的可用率是否排除了計畫性停機？量測點在伺服器端還是使用者端？定義不同，數字的意義就不同。

### AI-60｜IT服務管理與維運｜難度 ★★

**In business continuity planning, what does the Recovery Point Objective (RPO) define?**

在營運持續規劃中，復原點目標（RPO）定義的是什麼？

- A. The maximum time allowed to restore a service after a disruption　／　中斷後恢復服務所允許的最長時間
- B. The number of backup copies that must be kept　／　必須保留的備份份數
- C. The maximum acceptable amount of data loss, measured as a period of time　／　可接受的最大資料遺失量，以時間長度表示　**← 正確答案**
- D. The physical location of the disaster recovery site　／　災難復原站點的實體位置

**解說：** RPO 回答的是「最多能接受遺失多久的資料」：若 RPO 為 4 小時，備份或複寫至少每 4 小時要做一次，因為災難發生時，最多會遺失最後一次備份之後的資料。RTO（復原時間目標）回答的則是「多久內要恢復服務」。兩者都應由營運衝擊分析（BIA）決定，再據以設計備份頻率、異地備援與復原程序。RPO 愈小（例如即時同步複寫），成本愈高。

*Explanation:* RPO answers how much data loss, measured in time, is acceptable. With a 4-hour RPO, backups or replication must run at least every 4 hours, because a disaster loses everything since the last copy. RTO answers how quickly service must be restored. Both should come from a business impact analysis and drive backup frequency, DR design and recovery procedures. A smaller RPO, such as synchronous replication, costs more.

**ISO/IEC 27001:2022 附錄 A：** A.5.30 ICT readiness for business continuity（營運持續之ICT備妥性）；A.8.13 Information backup（資訊備份）

**稽核小叮嚀：** 記憶法：RPO 看「過去」（資料回到哪個時間點），RTO 看「未來」（多久之後恢復運作）。

### AI-61｜IT服務管理與維運｜難度 ★★

**Which backup strategy best protects an organization against ransomware?**

下列哪一種備份策略，最能保護組織免於勒索軟體的威脅？

- A. A single backup copy on a network share mapped to every user's computer　／　在每位使用者電腦都有掛載的網路磁碟上保存一份備份
- B. Relying only on RAID for data protection　／　只依賴 RAID 保護資料
- C. Storing backups on the same server as the original data　／　把備份放在與原始資料同一台伺服器上
- D. Following the 3-2-1 rule with at least one offline or immutable copy, and regularly testing restores　／　遵循 3-2-1 原則並保留至少一份離線或不可變更的備份，且定期進行還原測試　**← 正確答案**

**解說：** 勒索軟體會主動尋找並加密所有連得到的備份：掛載在使用者電腦上的網路磁碟、同一台伺服器上的備份都會一起被加密；RAID 只是即時鏡像，被加密的檔案也會同步寫入。3-2-1 原則是 3 份資料、2 種不同媒體、1 份存放異地；現在更建議 3-2-1-1-0：再加 1 份離線（Air-gapped）或不可變（Immutable）備份，並做到還原測試 0 錯誤。沒測試過還原的備份，不能算是可靠的備份。

*Explanation:* Ransomware hunts for and encrypts every backup it can reach, including network shares mapped on user PCs and backups on the same server, and RAID mirrors encrypted files instantly. The 3-2-1 rule means three copies, two different media and one off-site. The modern 3-2-1-1-0 version adds one offline (air-gapped) or immutable copy and zero errors in restore tests. A backup that has never been test-restored cannot be trusted.

**ISO/IEC 27001:2022 附錄 A：** A.8.13 Information backup（資訊備份）；A.5.30 ICT readiness for business continuity（營運持續之ICT備妥性）

### AI-62｜IT服務管理與維運｜難度 ★★

**A system administrator must apply a fix outside the normal change window to resolve a critical production outage. Under ITIL change management, what type of change is this?**

系統管理者必須在正常變更時段之外套用修正，以解決正式環境的重大中斷。依 ITIL 變更管理，這屬於哪一種變更？

- A. Standard change　／　標準變更（Standard Change）
- B. Normal change　／　一般變更（Normal Change）
- C. Emergency change　／　緊急變更（Emergency Change）　**← 正確答案**
- D. Unauthorized change　／　未經授權的變更

**解說：** ITIL 將變更分為三類：標準變更是低風險、預先核准、有固定程序的例行變更（例如新增使用者帳號）；一般變更需經評估與變更諮詢委員會（CAB）核准後排程實施；緊急變更是為解決重大事件或迫切風險而必須立即實施的變更，由緊急變更諮詢委員會（ECAB）或授權人員快速核准。重點是：緊急不等於免流程，事後仍須補齊文件並進行實施後審查（PIR），否則就會變成未經授權的變更。

*Explanation:* ITIL has three change types. Standard changes are low-risk, pre-approved routine tasks with a fixed procedure, such as creating a user account. Normal changes are assessed and approved by the Change Advisory Board (CAB) before scheduling. Emergency changes must be implemented immediately to resolve a major incident or urgent risk and are approved quickly by an emergency CAB (ECAB) or authorized person. Emergency does not mean no process: documentation and a post-implementation review are still required, or it becomes an unauthorized change.

**ISO/IEC 27001:2022 附錄 A：** A.8.32 Change management（變更管理）

**稽核小叮嚀：** 若發現緊急變更的比例偏高，往往代表規劃不足或流程遭濫用，值得深入了解原因。

### AI-63｜IT服務管理與維運｜難度 ★

**A help desk analyst receives a call from someone claiming to be a senior executive who urgently needs a password reset while traveling. What should the analyst do?**

服務台人員接到一通電話，對方自稱是出差中的高階主管，急著要求重設密碼。服務台人員應該怎麼做？

- A. Reset the password immediately because the caller is a senior executive　／　對方是高階主管，所以立即重設密碼
- B. Read the new password aloud over the phone so the caller can log in quickly　／　在電話中直接唸出新密碼，讓對方能快速登入
- C. Send the new password to the personal email address the caller provides　／　把新密碼寄到對方提供的私人電子郵件信箱
- D. Verify the caller's identity through the established procedure, such as calling back a registered number or using MFA-verified self-service, before resetting　／　依既定程序驗證來電者身分（例如回撥公司登記的號碼，或使用經 MFA 驗證的自助服務），確認後才重設　**← 正確答案**

**解說：** 這是典型的語音釣魚（Vishing）社交工程：利用「高階主管」「緊急」「出差」製造權威感與時間壓力，迫使服務台跳過驗證。2023 年美國 MGM 度假村遭攻擊，就是駭客打電話給服務台冒充員工，騙取帳號存取權，造成大規模的營運中斷。正確做法是不論對方職位多高，一律依身分驗證程序處理；把密碼寄到私人信箱或在電話中告知，都可能直接把帳號交給攻擊者。

*Explanation:* This is classic vishing: 'senior executive', 'urgent' and 'traveling' create authority and time pressure to make the help desk skip verification. In the 2023 MGM Resorts attack, criminals phoned the help desk posing as an employee to obtain account access, causing major disruption. Follow the identity verification procedure regardless of the caller's rank; sending a password to a personal mailbox or reading it out may hand the account to an attacker.

**ISO/IEC 27001:2022 附錄 A：** A.5.17 Authentication information（鑑別資訊）；A.6.3 Information security awareness, education and training（資訊安全認知、教育及訓練）

**稽核小叮嚀：** 可檢查服務台是否有書面的身分驗證程序，並以社交工程演練（例如模擬來電）驗證執行成效。

### AI-64｜IT服務管理與維運｜難度 ★★

**Which ITSM component stores information about configuration items (CIs) and their relationships, supporting impact analysis for changes and incidents?**

哪一個 ITSM 元件存放組態項目（CI）及其相互關係的資訊，以支援變更與事件的影響分析？

- A. Customer Relationship Management (CRM) system　／　客戶關係管理（CRM）系統
- B. Configuration Management Database (CMDB)　／　組態管理資料庫（CMDB）　**← 正確答案**
- C. Security Information and Event Management (SIEM)　／　資安資訊與事件管理（SIEM）
- D. Enterprise Resource Planning (ERP) system　／　企業資源規劃（ERP）系統

**解說：** CMDB 記錄伺服器、網路設備、應用系統、授權、文件等組態項目，以及它們之間的相依關係（例如「訂單系統」依賴「資料庫 A」，「資料庫 A」執行在「虛擬主機 B」上）。當要重新啟動虛擬主機 B 時，就能立刻知道會影響訂單系統與哪些使用者。CMDB 也是 ISMS 資產清冊的重要來源；但前提是資料正確且持續更新，過時的 CMDB 反而會誤導判斷。

*Explanation:* A CMDB records configuration items such as servers, network devices, applications, licenses and documents, plus their dependencies (the order system depends on database A, which runs on virtual host B). Before rebooting host B, you immediately know the order system and its users are affected. The CMDB is also a key source for the ISMS asset inventory, but only if it is accurate and kept current; a stale CMDB misleads.

**ISO/IEC 27001:2022 附錄 A：** A.5.9 Inventory of information and other associated assets（資訊及其他相關聯資產之清冊）；A.8.9 Configuration management（組態管理）

**稽核小叮嚀：** 稽核資產清冊時，可從現場隨機挑一台設備反查：它是否在清冊中？擁有者是否正確？

### AI-65｜IT服務管理與維運｜難度 ★

**Disk usage on a database server has grown steadily by about 5% per month and has now reached 85%. Which ITSM practice should proactively address this?**

某資料庫伺服器的磁碟使用率每月穩定成長約 5%，目前已達 85%。應由哪一項 ITSM 實務主動處理此情況？

- A. Capacity management　／　容量管理　**← 正確答案**
- B. Waiting for incident management once the disk is full　／　等磁碟滿了再交給事件管理處理
- C. Release management　／　發布管理
- D. Service request management　／　服務請求管理

**解說：** 容量管理負責監控資源使用趨勢並預測未來需求，在資源耗盡前就採取行動（擴充、清理、歸檔）。以每月成長 5% 推算，大約 3 個月後就會滿載，現在就應規劃擴充。如果等到磁碟滿了才處理，就會變成資料庫停擺的重大事件，影響可用性。ISO 27001:2022 的 A.8.6「容量管理」正是要求依需求監控並調整資源的使用。

*Explanation:* Capacity management monitors usage trends and forecasts demand so action (expansion, cleanup, archiving) happens before resources run out. At 5% growth a month, the disk fills in about three months, so expansion should be planned now. Waiting until it is full turns this into a major outage. ISO 27001:2022 control A.8.6 Capacity management requires exactly this monitoring and adjustment.

**ISO/IEC 27001:2022 附錄 A：** A.8.6 Capacity management（容量管理）

**稽核小叮嚀：** 日月潭的抽蓄發電就是一種容量管理：離峰時把水抽上去儲存，尖峰時放水發電，維持供電穩定。

### AI-66｜IT服務管理與維運｜難度 ★

**An organization is retiring old laptops that once stored confidential data. What is the most appropriate way to handle their storage drives?**

某組織要淘汰曾存放機密資料的舊筆電，其儲存裝置最適當的處理方式是什麼？

- A. Delete the files and empty the recycle bin　／　刪除檔案並清空資源回收筒
- B. Perform a quick format of the drive　／　對硬碟進行快速格式化
- C. Sanitize the drives using an approved method such as NIST SP 800-88 (clear, purge or destroy) and keep disposal records　／　依核定方法（如 NIST SP 800-88 的清除、清洗或銷毀）進行資料清除，並保留處理紀錄　**← 正確答案**
- D. Donate the laptops as they are to save time　／　為了節省時間，原封不動地捐贈

**解說：** 刪除檔案與快速格式化只是移除檔案索引，資料本身仍留在磁碟上，用免費的復原工具就能救回。NIST SP 800-88 定義三個層級：Clear（以覆寫等方式清除，可防一般復原工具）、Purge（以加密抹除、消磁或安全抹除指令處理，可防實驗室等級的復原）、Destroy（實體破壞，如粉碎、焚化）。SSD 因為有損耗平均機制，單純覆寫可能不完全，建議使用加密抹除或實體破壞。無論採用哪種方式，都要保留紀錄（資產編號、方式、日期、執行人與證明）。

*Explanation:* Deleting files or quick formatting only removes the file index; the data remains and free tools can recover it. NIST SP 800-88 defines Clear (overwriting, defeats ordinary recovery tools), Purge (cryptographic erase, degaussing or secure erase commands, defeats lab recovery) and Destroy (shredding, incineration). SSD wear leveling makes simple overwriting unreliable, so prefer cryptographic erase or physical destruction. Whatever the method, keep records: asset ID, method, date, operator and certificate.

**ISO/IEC 27001:2022 附錄 A：** A.7.14 Secure disposal or re-use of equipment（設備之安全汰除或重新使用）；A.8.10 Information deletion（資訊刪除）

**稽核小叮嚀：** 委外銷毀時，應要求廠商提供銷毀證明，必要時派員到場見證。

### AI-67｜資訊安全｜難度 ★

**A ransomware attack encrypts a hospital's patient records and makes them unusable. Which principle of the CIA triad is most directly affected?**

勒索軟體加密了醫院的病歷資料，導致無法使用。這最直接影響 CIA 三要素中的哪一項？

- A. Confidentiality　／　機密性（Confidentiality）
- B. Availability　／　可用性（Availability）　**← 正確答案**
- C. Integrity　／　完整性（Integrity）
- D. Non-repudiation　／　不可否認性（Non-repudiation）

**解說：** CIA 三要素：機密性（只有授權者能存取）、完整性（資料正確、未被不當竄改）、可用性（授權者需要時能及時使用）。病歷被加密而無法使用，最直接受損的是可用性；對醫院而言，這可能直接影響病人安全。補充：現代勒索軟體多採「雙重勒索」，加密前先竊取資料並威脅公開，因此機密性往往也同時受損。不可否認性則是確保行為者無法否認其行為，通常靠數位簽章達成。

*Explanation:* The CIA triad: confidentiality (only authorized access), integrity (accurate, untampered data) and availability (usable when needed). Encrypted, unusable patient records hit availability most directly, and for a hospital that can affect patient safety. Modern ransomware often uses double extortion, stealing data before encrypting it, so confidentiality is frequently harmed too. Non-repudiation, usually achieved with digital signatures, ensures actors cannot deny their actions.

**ISO/IEC 27001:2022 附錄 A：** A.5.29 Information security during disruption（中斷期間之資訊安全）；A.8.13 Information backup（資訊備份）

### AI-68｜資訊安全｜難度 ★

**In ISO/IEC 27001 risk management, buying cyber insurance to cover potential losses from a data breach is an example of which risk treatment option?**

在 ISO/IEC 27001 的風險管理中，購買資安保險以承擔資料外洩可能造成的損失，屬於哪一種風險處理方式？

- A. Risk avoidance　／　風險避免
- B. Risk modification (mitigation)　／　風險修改（降低）
- C. Risk retention (acceptance)　／　風險保留（接受）
- D. Risk sharing (transfer)　／　風險分擔（轉移）　**← 正確答案**

**解說：** ISO/IEC 27005 的四種風險處理選項：風險修改（以控制措施降低可能性或衝擊）、風險保留（在可接受範圍內決定承擔）、風險避免（停止或不進行會產生風險的活動）、風險分擔（將部分風險轉由第三方承擔，例如保險、委外）。購買保險屬於風險分擔，但要注意：保險轉移的是財務損失，「當責」與聲譽損害無法轉移，組織仍須對個資外洩負起法律責任。

*Explanation:* ISO/IEC 27005 lists four treatment options: modification (controls that reduce likelihood or impact), retention (knowingly accepting a risk within tolerance), avoidance (stopping the risky activity) and sharing (passing part of the risk to a third party through insurance or outsourcing). Insurance is risk sharing, but it transfers financial loss only; accountability and reputational damage stay with the organization, which remains legally responsible for a breach.

**稽核小叮嚀：** ISO 27001 條文 6.1.3 要求風險處理計畫須經風險擁有者核准並接受殘餘風險，稽核時記得確認核准紀錄。

### AI-69｜資訊安全｜難度 ★★

**An attacker who has stolen a user's password repeatedly triggers MFA push notifications until the frustrated user finally approves one. What is this attack called, and which countermeasure is most effective?**

攻擊者取得使用者密碼後，不斷觸發 MFA 推播通知，直到不堪其擾的使用者按下核准。這種攻擊稱為什麼？最有效的對策是什麼？

- A. Credential stuffing; add a CAPTCHA to the login page　／　撞庫攻擊；在登入頁面加上 CAPTCHA
- B. MFA fatigue (push bombing); use number matching or phishing-resistant MFA　／　MFA 疲勞攻擊（推播轟炸）；採用數字比對或抗釣魚 MFA　**← 正確答案**
- C. Pass-the-hash; disable NTLM authentication　／　傳遞雜湊攻擊（Pass-the-Hash）；停用 NTLM 驗證
- D. Brute force; require longer passwords　／　暴力破解；要求更長的密碼

**解說：** MFA 疲勞攻擊（MFA Fatigue／Push Bombing）利用使用者的厭煩或誤觸，只要按一次「核准」，攻擊者就能登入。2022 年 Uber 遭入侵即使用此手法，攻擊者還透過通訊軟體冒充 IT 人員，要求受害者按下核准。對策：啟用數字比對（Number Matching，使用者必須輸入登入畫面上顯示的數字）、顯示登入地點等額外資訊、限制推播頻率，或直接改用 FIDO2／Passkey 等抗釣魚 MFA；並教育使用者：沒有自己登入卻收到通知時，應拒絕並立即通報。

*Explanation:* MFA fatigue (push bombing) relies on annoyance or a mistaken tap: one approval lets the attacker in. The 2022 Uber breach used this technique, with the attacker also posing as IT support over a messaging app to urge approval. Countermeasures: number matching (the user types the number shown on the login screen), showing sign-in location and context, rate-limiting prompts, or moving to phishing-resistant MFA such as FIDO2/passkeys. Teach users to deny and report any prompt they did not trigger.

**ISO/IEC 27001:2022 附錄 A：** A.8.5 Secure authentication（安全鑑別）；A.6.3 Information security awareness, education and training（資訊安全認知、教育及訓練）

### AI-70｜資訊安全｜難度 ★

**A newly published vulnerability has a CVSS v3 base score of 9.8. How should this generally be interpreted?**

一個新公布的漏洞，其 CVSS v3 基本分數為 9.8。一般應如何解讀？

- A. Low severity; it can wait for the next annual maintenance　／　低風險，可以等到下次年度維護再處理
- B. Medium severity; patch within the normal quarterly cycle　／　中度風險，依一般每季的週期修補即可
- C. High severity, but only relevant to cloud systems　／　高風險，但只與雲端系統有關
- D. Critical severity; prioritize remediation, especially if the system is exposed or the flaw is being actively exploited　／　重大（Critical）風險；應優先處理，特別是系統對外暴露或漏洞已遭實際利用時　**← 正確答案**

**解說：** CVSS v3 分級：0.1–3.9 為低、4.0–6.9 為中、7.0–8.9 為高、9.0–10.0 為重大。9.8 通常代表可遠端利用、不需權限、不需使用者互動，且對機密性、完整性、可用性的衝擊都很高。但修補的優先順序不能只看分數，還應考量資產重要性、是否對外暴露，以及是否已遭實際利用（可參考美國 CISA 的 KEV 已知遭利用漏洞清單）。台灣的 TWCERT/CC 也會發布漏洞通報，可作為情資來源。

*Explanation:* CVSS v3 ratings: 0.1–3.9 low, 4.0–6.9 medium, 7.0–8.9 high and 9.0–10.0 critical. A 9.8 usually means remotely exploitable with no privileges or user interaction and high impact on confidentiality, integrity and availability. Prioritization should also weigh asset criticality, exposure and active exploitation (see CISA's Known Exploited Vulnerabilities catalog). Taiwan's TWCERT/CC also publishes vulnerability advisories.

**ISO/IEC 27001:2022 附錄 A：** A.8.8 Management of technical vulnerabilities（技術脆弱性管理）；A.5.7 Threat intelligence（威脅情資）

**稽核小叮嚀：** 建議在弱點管理程序中，依 CVSS 等級訂定修補時限（例如重大 7 天、高風險 30 天），並追蹤逾期項目。

