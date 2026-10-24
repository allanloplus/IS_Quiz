/*
 * AI 生成 70 題（AI-01 ～ AI-70）
 * 參考標準 30 題的情境式題型，依 8 大類補足 IT 基本功；以 ISMS 從業人員、顧問與稽核員的實務情境出題。
 * 分布：網路 8、系統 11、雲端 9、DevOps 10、開發 9、資料 9、維運 10、資安 4（加上標準 30 題後每類 11–21 題）
 */
window.AIT_DATA.questions.push(
  /* ── 網路與基礎架構 ───────────────────────────── */
  {
    id: "AI-01", src: "ai", cat: "net", lv: 1,
    q: "At which layer of the OSI model does a router primarily operate when it forwards packets based on IP addresses?",
    qz: "路由器依據 IP 位址轉送封包時，主要運作在 OSI 模型的哪一層？",
    o: ["Layer 2 – Data Link", "Layer 3 – Network", "Layer 4 – Transport", "Layer 7 – Application"],
    oz: ["第 2 層：資料鏈結層", "第 3 層：網路層", "第 4 層：傳輸層", "第 7 層：應用層"],
    a: 1,
    ez: "OSI 七層由下而上為：實體層、資料鏈結層、網路層、傳輸層、會議層、表現層、應用層。路由器依據 IP 位址決定封包要往哪個網路送，屬於第 3 層網路層設備。第 2 層的交換器依據 MAC 位址轉送；第 4 層處理 TCP／UDP 與連接埠；第 7 層則是 HTTP、DNS、SMTP 等應用協定。了解分層，才能判斷防火牆、WAF、IPS 各自看得到哪些資訊。",
    ee: "The OSI layers from bottom to top are Physical, Data Link, Network, Transport, Session, Presentation and Application. A router chooses where to send packets based on IP addresses, which is Layer 3. Layer 2 switches forward by MAC address, Layer 4 handles TCP/UDP and ports, and Layer 7 covers protocols such as HTTP, DNS and SMTP. Knowing the layers tells you what a firewall, WAF or IPS can see.",
    iso: ["8.20"],
    tip: "口訣（由上而下）：「應表會傳網鏈實」。稽核時聽到「L7 防火牆」，就知道它能檢查應用層內容，不只看 IP 與連接埠。"
  },
  {
    id: "AI-02", src: "ai", cat: "net", lv: 1,
    q: "An employee cannot open the company intranet portal by its domain name, but the portal loads normally when accessed by its IP address. Which service is most likely failing?",
    qz: "員工以網域名稱無法開啟公司內部入口網站，但直接輸入 IP 位址卻可以正常連線。最可能是哪一項服務出了問題？",
    o: ["DHCP", "NTP", "DNS", "SMTP"],
    oz: ["DHCP（動態主機設定協定）", "NTP（網路時間協定）", "DNS（網域名稱系統）", "SMTP（簡易郵件傳輸協定）"],
    a: 2,
    ez: "DNS 負責把網域名稱（如 portal.company.com）解析成 IP 位址，相當於網路世界的電話簿。用 IP 能連、用名稱不能連，代表網路本身是通的，問題出在名稱解析。DHCP 負責自動配發 IP 位址；NTP 負責校時；SMTP 負責寄送郵件。DNS 也是資安重點：DNS 過濾可阻擋惡意網域，但攻擊者也可能利用 DNS 通道（DNS Tunneling）偷傳資料。",
    ee: "DNS translates domain names such as portal.company.com into IP addresses, like a phone book for the network. If the IP works but the name does not, the network path is fine and name resolution is failing. DHCP assigns IP addresses automatically, NTP synchronizes time and SMTP sends email. DNS also matters for security: DNS filtering blocks malicious domains, while attackers may abuse DNS tunneling to exfiltrate data.",
    iso: ["8.21", "8.23"],
    tip: "疑難排解小技巧：Windows 可用 nslookup、Linux 可用 dig，直接檢查名稱解析的結果。"
  },
  {
    id: "AI-03", src: "ai", cat: "net", lv: 2,
    q: "During a firewall rule review, an auditor finds an inbound rule allowing TCP port 3389 from any source on the internet. Which service does this expose, and why is it a concern?",
    qz: "稽核員在審查防火牆規則時，發現一條允許網際網路任意來源連入 TCP 3389 埠的規則。這會暴露哪一項服務？為什麼令人擔憂？",
    o: [
      "SSH; it exposes Linux servers to remote command execution",
      "SMB; it allows file-sharing worms to spread",
      "HTTPS; it exposes internal web applications",
      "RDP; it is a frequent target of brute-force attacks and a common initial access path for ransomware"
    ],
    oz: [
      "SSH；讓 Linux 伺服器暴露於遠端指令執行的風險",
      "SMB；讓檔案分享蠕蟲得以擴散",
      "HTTPS；暴露內部的網頁應用程式",
      "RDP（遠端桌面協定）；它是暴力破解的熱門目標，也是勒索軟體常見的初始入侵途徑"
    ],
    a: 3,
    ez: "TCP 3389 是 Windows 遠端桌面（RDP）的預設連接埠。RDP 直接暴露在網際網路上，會持續遭受密碼暴力破解與撞庫，過去也有 BlueKeep（CVE-2019-0708）等嚴重漏洞，是勒索軟體最常見的入侵途徑之一。常見連接埠：SSH 為 22、SMB 為 445、HTTPS 為 443、Telnet 為 23、FTP 為 21、DNS 為 53。正確做法是關閉對外的 3389，改經 VPN 或零信任存取閘道並搭配 MFA，同時限制來源 IP。",
    ee: "TCP 3389 is the default port for Windows Remote Desktop (RDP). RDP exposed to the internet faces constant brute-force and credential-stuffing attempts, has had critical flaws such as BlueKeep (CVE-2019-0708) and is one of the most common ransomware entry points. Common ports: SSH 22, SMB 445, HTTPS 443, Telnet 23, FTP 21, DNS 53. Close 3389 to the internet and use a VPN or zero-trust access gateway with MFA and source IP restrictions.",
    iso: ["8.20", "8.5"],
    tip: "防火牆規則審查三問：來源是不是 Any？有沒有業務需求與核准紀錄？最後一次檢視規則是什麼時候？"
  },
  {
    id: "AI-04", src: "ai", cat: "net", lv: 2,
    q: "Which of the following IP addresses belongs to a private address range defined in RFC 1918 and is not routable on the public internet?",
    qz: "下列哪一個 IP 位址屬於 RFC 1918 定義的私有位址範圍，無法在公眾網際網路上路由？",
    o: ["172.20.10.5", "8.8.8.8", "172.32.1.1", "192.169.1.1"],
    oz: ["172.20.10.5", "8.8.8.8", "172.32.1.1", "192.169.1.1"],
    a: 0,
    ez: "RFC 1918 定義三段私有位址：10.0.0.0/8（10.x.x.x）、172.16.0.0/12（172.16.0.0～172.31.255.255）、192.168.0.0/16（192.168.x.x）。172.20.10.5 落在 172.16～172.31 之間，屬於私有位址。172.32.1.1 剛好超出範圍；192.169.1.1 不是 192.168；8.8.8.8 是 Google 的公共 DNS。私有位址要上網，必須透過 NAT 轉換成公有位址。",
    ee: "RFC 1918 defines three private ranges: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. 172.20.10.5 falls inside 172.16–172.31, so it is private. 172.32.1.1 is just outside the range, 192.169.1.1 is not 192.168, and 8.8.8.8 is Google's public DNS. Private hosts reach the internet through NAT.",
    iso: ["8.20"],
    tip: "看網路架構圖時，若伺服器標示的是公有 IP，記得追問它是否直接暴露在網際網路上。"
  },
  {
    id: "AI-05", src: "ai", cat: "net", lv: 1,
    q: "A company wants remote employees to access internal systems securely over the internet. Which technology creates an encrypted tunnel between the remote device and the corporate network?",
    qz: "公司希望遠端員工能透過網際網路安全地存取內部系統。哪一種技術能在遠端裝置與公司網路之間建立加密通道？",
    o: ["Virtual Private Network (VPN)", "Virtual LAN (VLAN)", "Network Address Translation (NAT)", "Content Delivery Network (CDN)"],
    oz: ["虛擬私人網路（VPN）", "虛擬區域網路（VLAN）", "網路位址轉換（NAT）", "內容傳遞網路（CDN）"],
    a: 0,
    ez: "VPN 透過 IPsec 或 SSL/TLS 在公眾網路上建立加密通道，讓遠端裝置如同身處公司內網。VLAN 是在交換器上切分邏輯網段，不提供加密；NAT 負責私有與公有位址的轉換；CDN 是把網站內容快取到各地節點以加速存取。近年趨勢是以零信任網路存取（ZTNA）補強或取代傳統 VPN：只開放「特定應用」而非整個內網，並持續驗證使用者與裝置。",
    ee: "A VPN uses IPsec or SSL/TLS to build an encrypted tunnel over a public network, so a remote device behaves as if it were on the internal network. A VLAN logically splits switch ports and provides no encryption, NAT translates private and public addresses, and a CDN caches content at edge locations. Zero Trust Network Access (ZTNA) increasingly supplements or replaces VPNs by exposing specific applications rather than the whole network.",
    iso: ["6.7", "8.20"],
    tip: "VPN 帳號務必啟用 MFA，VPN 設備本身也要即時修補；近年多起重大入侵事件都是從 VPN 設備的漏洞開始。"
  },
  {
    id: "AI-06", src: "ai", cat: "net", lv: 2,
    q: "Where should an organization place its public-facing web server to allow internet access while protecting the internal network?",
    qz: "組織的對外網站伺服器應放在哪裡，才能既開放網際網路存取、又保護內部網路？",
    o: [
      "Inside the internal LAN together with the database servers",
      "In a demilitarized zone (DMZ) separated from the internal network by firewalls",
      "Directly on the internet with no firewall, to maximize performance",
      "On an employee's workstation, to reduce hardware costs"
    ],
    oz: [
      "放在內部區域網路中，與資料庫伺服器放在一起",
      "放在非軍事區（DMZ），以防火牆與內部網路隔開",
      "直接放在網際網路上、不經防火牆，以追求最佳效能",
      "放在員工的工作站上，以節省硬體成本"
    ],
    a: 1,
    ez: "DMZ（非軍事區）是介於網際網路與內部網路之間的緩衝網段。對外服務（網站、郵件閘道、DNS）放在 DMZ，網際網路只能連到 DMZ；DMZ 到內網的流量則由防火牆嚴格限制，例如只允許網站伺服器連到特定資料庫的連接埠。即使網站伺服器被攻破，攻擊者也無法直接進入內部網路。把對外主機放在內網，等於替攻擊者打開大門。",
    ee: "A DMZ is a buffer segment between the internet and the internal network. Public services such as web servers, mail gateways and DNS sit in the DMZ, the internet can reach only the DMZ, and firewalls tightly limit DMZ-to-internal traffic (for example, only the web server to one database port). If the web server is compromised, the attacker still cannot reach the internal network directly.",
    iso: ["8.22", "8.20"],
    tip: "審查架構時可請對方畫出「從網際網路到資料庫」的每一跳，確認中間至少經過兩道不同的存取控制。"
  },
  {
    id: "AI-07", src: "ai", cat: "net", lv: 2,
    q: "Which wireless security standard is currently recommended for enterprise Wi-Fi, providing individual user authentication through 802.1X/RADIUS and stronger encryption?",
    qz: "目前企業無線網路建議採用哪一種安全標準，可透過 802.1X／RADIUS 進行個別使用者驗證，並提供更強的加密？",
    o: ["WEP", "WPA with TKIP", "WPA2-Personal (pre-shared key)", "WPA3-Enterprise"],
    oz: ["WEP", "WPA（TKIP 加密）", "WPA2-Personal（預先共用金鑰）", "WPA3-Enterprise（企業版）"],
    a: 3,
    ez: "WPA3-Enterprise 結合 802.1X／RADIUS，每位使用者以自己的帳號或憑證登入，員工離職時只要停用該帳號即可，並提供更高的加密強度（含 192 位元安全模式）與受保護的管理訊框。WEP 早已可在數分鐘內破解；WPA-TKIP 也已被淘汰；WPA2-Personal 使用全公司共用的一組密碼，一旦外流就必須全面更換，也無法追蹤是誰連線。",
    ee: "WPA3-Enterprise uses 802.1X/RADIUS, so each user signs in with their own account or certificate, and a departing employee is removed by disabling one account. It adds stronger encryption, including a 192-bit security mode, and protected management frames. WEP can be cracked in minutes, WPA-TKIP is deprecated, and WPA2-Personal relies on one shared password that must be changed everywhere when it leaks and cannot show who connected.",
    iso: ["8.20", "8.5"],
    tip: "訪客 Wi-Fi 應與公司內網完全隔離。稽核時可實地連上訪客網路，測試是否能連到內部系統。"
  },
  {
    id: "AI-08", src: "ai", cat: "net", lv: 2,
    q: "An organization wants only company-managed, fully patched devices to connect to its internal network, while noncompliant devices are moved to a quarantine VLAN. Which solution best achieves this?",
    qz: "某組織希望只有公司列管、且已完成修補的裝置才能連上內部網路，不合規的裝置則被移到隔離 VLAN。哪一種解決方案最能達成此目標？",
    o: ["Content Delivery Network (CDN)", "Load balancer", "Network Access Control (NAC)", "Data Loss Prevention (DLP)"],
    oz: ["內容傳遞網路（CDN）", "負載平衡器", "網路存取控制（NAC）", "資料外洩防護（DLP）"],
    a: 2,
    ez: "NAC 會在裝置接入網路時檢查身分與健康狀態（是否為公司資產、作業系統是否已修補、防毒是否啟用），合規才放行，不合規則導向隔離網段進行修補，未知裝置則拒絕連線。CDN 用於加速內容傳遞；負載平衡器分散伺服器流量；DLP 防止敏感資料外洩，三者都無法在接入時檢查裝置是否合規。",
    ee: "NAC checks identity and device health (company asset, OS patches, antivirus status) when a device joins the network. Compliant devices are admitted, noncompliant ones are sent to a quarantine segment for remediation and unknown devices are rejected. A CDN speeds content delivery, a load balancer spreads server traffic and DLP prevents data leakage; none checks device compliance at connection time.",
    iso: ["8.1", "8.20"],
    tip: "NAC 也能協助盤點資產：從 NAC 的連線紀錄，常能發現資產清冊上沒有登錄的裝置。"
  },

  /* ── 作業系統與伺服器 ───────────────────────────── */
  {
    id: "AI-09", src: "ai", cat: "os", lv: 2,
    q: "On a Linux server, which octal permission setting gives the file owner read and write access while denying all access to the group and others, which is appropriate for an SSH private key?",
    qz: "在 Linux 伺服器上，哪一個八進位權限設定能讓檔案擁有者可讀寫、群組與其他人完全無權限，適合用於 SSH 私鑰檔？",
    o: ["777", "755", "600", "644"],
    oz: ["777", "755", "600", "644"],
    a: 2,
    ez: "Linux 權限以三組數字分別代表擁有者（owner）、群組（group）、其他人（others），讀 r=4、寫 w=2、執行 x=1。600 代表擁有者 rw-（4+2）、群組與其他人 ---，正是私鑰檔該有的權限；SSH 甚至會拒絕使用權限過寬的私鑰。777 代表所有人都可讀寫執行，非常危險；755 常用於程式與目錄；644 常用於一般設定檔，其他人仍可讀取。",
    ee: "Linux permissions use three digits for owner, group and others, where read is 4, write 2 and execute 1. 600 means rw- for the owner and nothing for group and others, which is exactly right for a private key; SSH even refuses keys with looser permissions. 777 lets everyone read, write and execute, which is dangerous. 755 is typical for programs and directories, and 644 for ordinary config files that others may read.",
    iso: ["8.3", "8.24"],
    tip: "稽核 Linux 主機時，可抽查 /etc/shadow（應僅 root 可讀）與重要設定檔的權限，並搜尋權限為 777 的檔案。"
  },
  {
    id: "AI-10", src: "ai", cat: "os", lv: 1,
    q: "In a Windows enterprise environment, which service centrally manages user accounts, computer objects and Group Policy for authentication and authorization?",
    qz: "在 Windows 企業環境中，哪一項服務能集中管理使用者帳號、電腦物件與群組原則（GPO），提供身分驗證與授權？",
    o: ["Internet Information Services (IIS)", "Active Directory Domain Services (AD DS)", "Hyper-V", "Windows Server Update Services (WSUS)"],
    oz: ["網際網路資訊服務（IIS）", "Active Directory 網域服務（AD DS）", "Hyper-V", "Windows Server Update Services（WSUS）"],
    a: 1,
    ez: "AD DS 是 Windows 網域的核心，由網域控制站（DC）集中管理帳號、群組、電腦與群組原則，並以 Kerberos 進行身分驗證。透過 GPO 可以統一推送密碼原則、螢幕鎖定、軟體限制等安全設定。IIS 是網頁伺服器；Hyper-V 是虛擬化平台；WSUS 用於派送 Windows 更新。也因為 AD 掌管整個網域，它是攻擊者的首要目標，網域管理員（Domain Admins）帳號必須嚴格控管。",
    ee: "AD DS is the core of a Windows domain. Domain controllers centrally manage accounts, groups, computers and Group Policy and authenticate users with Kerberos. GPOs push security settings such as password policy, screen lock and software restrictions. IIS is a web server, Hyper-V is a virtualization platform and WSUS distributes Windows updates. Because AD controls the whole domain, it is a prime target and Domain Admins membership must be tightly controlled.",
    iso: ["5.16", "5.18", "8.2"],
    tip: "稽核 AD 時可索取 Domain Admins 群組成員清單，確認人數最少化，且每個帳號都對應到具名的人員。"
  },
  {
    id: "AI-11", src: "ai", cat: "os", lv: 2,
    q: "Microsoft releases security updates on 'Patch Tuesday' each month. What is the best practice before deploying critical patches to production servers?",
    qz: "Microsoft 每月在「Patch Tuesday」發布安全性更新。將重大修補程式部署到正式環境伺服器之前，最佳做法是什麼？",
    o: [
      "Deploy immediately to all production servers without testing",
      "Wait at least one year until the patches are proven stable",
      "Test the patches in a staging environment, then deploy through change management with a rollback plan",
      "Patch only after a security incident occurs"
    ],
    oz: [
      "不經測試，立即部署到所有正式環境伺服器",
      "至少等待一年，確認修補程式穩定後再安裝",
      "先在測試（預備）環境驗證，再依變更管理程序部署，並準備回復計畫",
      "等發生資安事件之後再修補"
    ],
    a: 2,
    ez: "Patch Tuesday 是每月第二個星期二。修補要在「速度」與「穩定」之間取得平衡：先在與正式環境相近的測試環境驗證相容性，再依變更管理程序核准、排程部署，並備妥回復（Rollback）計畫。若漏洞已遭大量利用（例如列入美國 CISA 的 KEV 清單），則應啟動緊急變更流程加速處理。不測試就上線可能造成服務中斷；拖延一年或等事件發生再修補，則讓漏洞長期暴露。",
    ee: "Patch Tuesday is the second Tuesday of each month. Patching balances speed and stability: validate compatibility in a staging environment that mirrors production, then deploy through approved change management with a rollback plan. Vulnerabilities under active exploitation (for example, listed in CISA KEV) warrant an emergency change. Deploying untested can cause outages, and waiting a year or until an incident leaves the vulnerability exposed.",
    iso: ["8.8", "8.32", "8.19"],
    tip: "稽核修補管理時，可抽一個重大漏洞，追蹤從公告、評估、測試到全面完成修補花了幾天，並對照內部規定的修補時限。"
  },
  {
    id: "AI-12", src: "ai", cat: "os", lv: 1,
    q: "A file server is configured with RAID 1. What does this configuration provide?",
    qz: "一台檔案伺服器設定為 RAID 1，這種配置能提供什麼？",
    o: [
      "Striping across disks for performance, with no redundancy",
      "Mirroring of data across two disks, so the server keeps running if one disk fails",
      "Encryption of all data stored on the disks",
      "A complete replacement for off-site backups"
    ],
    oz: [
      "將資料分散寫入多顆硬碟以提升效能，但沒有備援",
      "將資料鏡像到兩顆硬碟，其中一顆故障時伺服器仍可運作",
      "對硬碟上的所有資料進行加密",
      "可以完全取代異地備份"
    ],
    a: 1,
    ez: "RAID 1 是鏡像（Mirroring），同一份資料同時寫入兩顆硬碟，一顆壞掉另一顆仍可運作，提升可用性。RAID 0 是分散寫入（Striping），效能好但沒有備援，任一顆壞掉資料就全毀；RAID 5 以分散式同位元檢查（Parity）容許一顆硬碟故障。重要觀念：RAID 不是備份！誤刪檔案、勒索軟體加密、檔案毀損都會同步寫到兩顆硬碟上，仍然必須另外做備份。",
    ee: "RAID 1 mirrors the same data onto two disks, so the server survives a single disk failure and availability improves. RAID 0 stripes data for speed with no redundancy, and RAID 5 uses distributed parity to tolerate one failed disk. Key point: RAID is not a backup. Accidental deletion, ransomware encryption and corruption are copied to both disks immediately, so separate backups are still required.",
    iso: ["8.14", "8.13"],
    tip: "若受稽方說「我們有 RAID，所以有備份」，這就是一個值得記錄的觀察事項。"
  },
  {
    id: "AI-13", src: "ai", cat: "os", lv: 3,
    q: "In the Windows Security event log, which Event ID records a failed logon attempt?",
    qz: "在 Windows 安全性事件記錄中，哪一個事件識別碼（Event ID）代表「登入失敗」？",
    o: ["4624", "4720", "1102", "4625"],
    oz: ["4624", "4720", "1102", "4625"],
    a: 3,
    ez: "常見的 Windows 安全性事件識別碼：4624 為登入成功、4625 為登入失敗、4720 為建立使用者帳號、4732 為成員加入具安全性的本機群組、1102 為稽核記錄被清除。短時間內大量出現 4625，可能代表暴力破解或密碼噴灑（Password Spraying）；出現 1102 則要特別警覺，攻擊者常在得手後清除記錄以湮滅證據。",
    ee: "Common Windows Security event IDs: 4624 successful logon, 4625 failed logon, 4720 user account created, 4732 member added to a security-enabled local group, and 1102 audit log cleared. Bursts of 4625 may indicate brute force or password spraying, and a 1102 deserves immediate attention because attackers often clear logs to cover their tracks.",
    iso: ["8.15", "8.16"],
    tip: "稽核日誌管理時，可請管理者現場查詢近期的 4625 事件，確認有沒有告警規則，以及由誰負責處理。"
  },
  {
    id: "AI-14", src: "ai", cat: "os", lv: 2,
    q: "Why should Linux administrators log in with individual accounts and use sudo instead of logging in directly as root?",
    qz: "為什麼 Linux 系統管理者應以個人帳號登入再使用 sudo，而不是直接以 root 登入？",
    o: [
      "sudo makes commands run faster than root",
      "Direct root login is required for remote access",
      "sudo encrypts every command sent to the server",
      "It provides individual accountability and logs privileged commands, supporting least privilege"
    ],
    oz: [
      "sudo 執行指令的速度比 root 快",
      "遠端存取必須直接以 root 登入",
      "sudo 會加密所有送到伺服器的指令",
      "它能提供個人可歸責性並記錄特權指令，落實最小權限原則"
    ],
    a: 3,
    ez: "多人共用 root 時，日誌只會顯示「root 做了某件事」，無法追溯是誰。以個人帳號登入、需要時再以 sudo 提權，每一筆特權指令都會記錄執行者，達到可歸責性（Accountability）；sudoers 設定也能限制每個人可執行的指令，落實最小權限。實務上會在 SSH 設定 PermitRootLogin no，禁止 root 直接遠端登入。sudo 不會讓指令變快，也不負責加密。",
    ee: "When several people share root, logs only show that root did something, not who. Logging in with personal accounts and elevating with sudo records the person behind every privileged command, providing accountability, and sudoers can restrict which commands each person may run. In practice, set PermitRootLogin no in the SSH configuration. sudo does not speed up commands or encrypt anything.",
    iso: ["8.2", "8.18", "8.15"],
    tip: "共用帳號是常見的稽核缺失。若因系統限制必須共用，應有密碼保管、借用登記與事後審查等補償性控制。"
  },
  {
    id: "AI-15", src: "ai", cat: "os", lv: 1,
    q: "Which practice best describes server hardening?",
    qz: "下列哪一項最能說明「伺服器強化（Hardening）」？",
    o: [
      "Disabling unnecessary services and ports, removing default accounts, and applying a secure configuration baseline such as the CIS Benchmarks",
      "Installing as many services as possible to increase flexibility",
      "Upgrading the server's CPU and memory to improve performance",
      "Moving the server to a room with better air conditioning"
    ],
    oz: [
      "停用不必要的服務與連接埠、移除預設帳號，並套用安全組態基準（如 CIS Benchmarks）",
      "盡可能安裝更多服務，以增加彈性",
      "升級伺服器的 CPU 與記憶體以提升效能",
      "把伺服器搬到空調更好的機房"
    ],
    a: 0,
    ez: "強化（Hardening）的目的是縮小攻擊面（Attack Surface）：關閉用不到的服務與連接埠、移除或更名預設帳號、修改預設密碼、套用最新修補、啟用日誌與稽核，並以 CIS Benchmarks、台灣的政府組態基準（GCB）等安全組態基準作為依據。安裝更多服務反而會擴大攻擊面；升級硬體與改善空調屬於效能與環境議題。",
    ee: "Hardening shrinks the attack surface: disable unused services and ports, remove or rename default accounts, change default passwords, apply current patches, enable logging, and follow a secure configuration baseline such as the CIS Benchmarks or a government baseline (Taiwan's GCB). Installing more services enlarges the attack surface, and hardware upgrades or air conditioning are performance and environmental topics.",
    iso: ["8.9"],
    tip: "台灣政府機關常參考「政府組態基準（GCB）」。稽核組態管理時，可抽查實際主機設定是否與核定的基準一致。"
  },
  {
    id: "AI-16", src: "ai", cat: "os", lv: 1,
    q: "Why is it important to synchronize all servers' clocks with a reliable NTP time source?",
    qz: "為什麼所有伺服器的時間都必須與可靠的 NTP 時間來源同步？",
    o: [
      "It increases network throughput",
      "It ensures consistent timestamps for log correlation and forensic investigations",
      "It is required for disk encryption to work",
      "It prevents malware from being installed"
    ],
    oz: [
      "可提升網路傳輸量",
      "確保日誌時間戳記一致，以利關聯分析與數位鑑識",
      "磁碟加密必須靠它才能運作",
      "可防止惡意軟體被安裝"
    ],
    a: 1,
    ez: "調查資安事件時，需要把防火牆、AD、伺服器、應用程式的日誌依時間串起來，還原攻擊時間軸。只要各設備時間差了幾分鐘，事件順序就可能完全錯亂，甚至影響證據的可信度。Kerberos 驗證也要求時間誤差在一定範圍內（預設 5 分鐘）。在台灣，可使用國家時間與頻率標準實驗室提供的 time.stdtime.gov.tw 作為校時來源。",
    ee: "Incident investigations stitch logs from firewalls, Active Directory, servers and applications into one timeline. Clocks that drift by even a few minutes can scramble the order of events and weaken evidence. Kerberos authentication also requires clocks to be within a tolerance (five minutes by default). In Taiwan, time.stdtime.gov.tw from the National Time and Frequency Standard Laboratory is a common source.",
    iso: ["8.17", "8.15"],
    tip: "A.8.17 鐘訊同步看似簡單，稽核時現場比對兩台設備的系統時間，常會發現落差。"
  },
  {
    id: "AI-17", src: "ai", cat: "os", lv: 1,
    q: "What is the primary function of an operating system's kernel?",
    qz: "作業系統核心（Kernel）的主要功能是什麼？",
    o: [
      "Providing desktop themes and wallpapers",
      "Compiling source code into executable programs",
      "Managing hardware resources such as CPU, memory and devices, and providing core services to programs",
      "Browsing websites on behalf of the user"
    ],
    oz: [
      "提供桌面佈景主題與桌布",
      "將原始碼編譯成可執行程式",
      "管理 CPU、記憶體與周邊裝置等硬體資源，並為程式提供核心服務",
      "代替使用者瀏覽網站"
    ],
    a: 2,
    ez: "核心是作業系統最底層、權限最高的部分，負責程序排程、記憶體管理、裝置驅動程式、檔案系統與系統呼叫，是應用程式與硬體之間的橋梁。核心執行在特權模式（Kernel Mode），一般程式執行在使用者模式（User Mode），兩者隔離可避免單一程式破壞整個系統；也因此，核心層級的漏洞或 Rootkit 危害極大。桌面主題、編譯器、瀏覽器都是在核心之上運作的應用程式。",
    ee: "The kernel is the lowest and most privileged part of the OS. It handles process scheduling, memory management, device drivers, file systems and system calls, bridging applications and hardware. It runs in kernel mode while normal programs run in user mode, and that isolation keeps one program from breaking the whole system. Kernel vulnerabilities and rootkits are therefore especially dangerous. Themes, compilers and browsers are applications running on top of the kernel.",
    iso: [],
    tip: ""
  },
  {
    id: "AI-18", src: "ai", cat: "os", lv: 1,
    q: "During an ISMS audit, an auditor finds several production servers still running Windows Server 2012 R2. What is the primary security concern?",
    qz: "在 ISMS 稽核中，稽核員發現數台正式環境伺服器仍在執行 Windows Server 2012 R2。主要的資安疑慮是什麼？",
    o: [
      "The servers use too much memory",
      "The operating system has reached end of support and no longer receives regular security updates",
      "The license fee is too expensive",
      "The servers cannot connect to the internet"
    ],
    oz: [
      "伺服器占用太多記憶體",
      "該作業系統已終止支援，不再提供常規的安全性更新",
      "授權費用太高",
      "伺服器無法連上網際網路"
    ],
    a: 1,
    ez: "Windows Server 2012／2012 R2 的延伸支援已於 2023 年 10 月 10 日結束。終止支援後，新發現的漏洞將不再有常規修補（除非付費購買延伸安全性更新 ESU），系統會持續暴露在風險中。處理方式：規劃升級或汰換；短期內無法升級時，須進行風險評鑑並採取補償性控制，例如網路隔離、限制存取、加強監控，並由管理階層正式接受殘餘風險。",
    ee: "Extended support for Windows Server 2012 and 2012 R2 ended on 10 October 2023. After end of support, newly found vulnerabilities receive no regular patches unless Extended Security Updates are purchased, leaving the systems exposed. Plan an upgrade or replacement. If that cannot happen soon, perform a risk assessment, apply compensating controls such as isolation, restricted access and closer monitoring, and have management formally accept the residual risk.",
    iso: ["8.8", "5.9"],
    tip: "資產清冊若有記錄作業系統版本與支援到期日，就能提早規劃汰換，這是制度成熟度高的表現。"
  },
  {
    id: "AI-19", src: "ai", cat: "os", lv: 2,
    q: "Which UEFI firmware feature helps prevent bootkits by allowing only digitally signed bootloaders and operating system kernels to load during startup?",
    qz: "UEFI 韌體的哪一項功能，只允許經數位簽章的開機載入程式與作業系統核心在開機時載入，以防範 Bootkit？",
    o: ["Wake-on-LAN", "Hyper-Threading", "Fast Startup", "Secure Boot"],
    oz: ["網路喚醒（Wake-on-LAN）", "超執行緒（Hyper-Threading）", "快速啟動（Fast Startup）", "安全開機（Secure Boot）"],
    a: 3,
    ez: "Secure Boot（安全開機）會在開機過程中驗證每一段載入程式的數位簽章，簽章不符就拒絕執行，防止 Bootkit 在作業系統啟動前就取得控制權；一旦惡意程式搶在作業系統之前執行，防毒軟體就很難察覺。Wake-on-LAN 是遠端喚醒；Hyper-Threading 是 CPU 多執行緒技術；Fast Startup 是 Windows 的快速開機功能，都與開機完整性無關。Secure Boot 常與 TPM 搭配，作為 BitLocker 與量測開機（Measured Boot）的基礎。",
    ee: "Secure Boot verifies the digital signature of each boot component during startup and refuses to run anything unsigned, which stops bootkits from taking control before the OS loads. Code that runs before the OS is very hard for antivirus to detect. Wake-on-LAN, Hyper-Threading and Fast Startup have nothing to do with boot integrity. Secure Boot often works with a TPM as the foundation for BitLocker and measured boot.",
    iso: ["8.7", "8.9"],
    tip: ""
  },

  /* ── 虛擬化與雲端運算 ───────────────────────────── */
  {
    id: "AI-20", src: "ai", cat: "cloud", lv: 2,
    q: "Which statement correctly describes a Type 1 hypervisor?",
    qz: "下列哪一項敘述正確描述了第一型（Type 1）虛擬機器管理程式（Hypervisor）？",
    o: [
      "It runs as an application on top of a host operating system, such as VirtualBox on a Windows laptop",
      "It is a container runtime that shares the host kernel",
      "It runs directly on the physical hardware (bare metal), such as VMware ESXi or Microsoft Hyper-V",
      "It can only emulate mobile applications"
    ],
    oz: [
      "它以應用程式的形式在主機作業系統上執行，例如在 Windows 筆電上執行 VirtualBox",
      "它是共用主機核心的容器執行環境",
      "它直接在實體硬體上執行（裸機），例如 VMware ESXi 或 Microsoft Hyper-V",
      "它只能模擬行動裝置的應用程式"
    ],
    a: 2,
    ez: "第一型 Hypervisor（裸機型）直接安裝在實體伺服器上，負責把硬體資源分配給多台虛擬機器，效能好、攻擊面小，是資料中心與雲端的主流，例如 VMware ESXi、Microsoft Hyper-V、KVM、Xen。第二型 Hypervisor（寄居型）安裝在一般作業系統上，例如 VirtualBox、VMware Workstation，適合個人測試。容器則是共用主機核心的另一種虛擬化技術，不是 Hypervisor。",
    ee: "A Type 1 (bare-metal) hypervisor installs directly on physical servers and allocates hardware to virtual machines. It performs well with a small attack surface and dominates data centers and clouds: VMware ESXi, Microsoft Hyper-V, KVM and Xen. A Type 2 (hosted) hypervisor runs on a normal OS, such as VirtualBox or VMware Workstation, and suits personal testing. Containers share the host kernel and are not hypervisors.",
    iso: ["8.9"],
    tip: "Hypervisor 的管理介面（如 vCenter）權限極高，一旦失守，所有虛擬機器都會受影響，應放在獨立的管理網段並啟用 MFA。"
  },
  {
    id: "AI-21", src: "ai", cat: "cloud", lv: 1,
    q: "A company uses Microsoft 365 for email and documents without managing any servers or application code. Which cloud service model is this?",
    qz: "一家公司使用 Microsoft 365 處理郵件與文件，完全不需要管理伺服器或應用程式程式碼。這屬於哪一種雲端服務模式？",
    o: ["Software as a Service (SaaS)", "Platform as a Service (PaaS)", "Infrastructure as a Service (IaaS)", "On-premises deployment"],
    oz: ["軟體即服務（SaaS）", "平台即服務（PaaS）", "基礎設施即服務（IaaS）", "地端（自建機房）部署"],
    a: 0,
    ez: "SaaS 是直接使用供應商提供的完整應用程式，例如 Microsoft 365、Google Workspace、Salesforce，使用者只需管理帳號、權限、設定與資料。PaaS 提供開發與執行平台（例如 Azure App Service、Google App Engine），客戶負責自己的程式碼；IaaS 提供虛擬機器、網路與儲存（例如 AWS EC2），客戶負責作業系統以上的所有東西；地端部署則是全部自行管理。",
    ee: "SaaS means using a complete application run by the provider, such as Microsoft 365, Google Workspace or Salesforce; the customer manages accounts, permissions, settings and data. PaaS supplies a development and runtime platform (Azure App Service, Google App Engine) where the customer owns the code. IaaS supplies VMs, networks and storage (AWS EC2) and the customer manages everything from the OS up. On-premises means managing everything yourself.",
    iso: ["5.23"],
    tip: "SaaS 不代表沒有責任：帳號 MFA、外部分享設定、稽核日誌保存、離職帳號停用，都還是客戶要做的事。"
  },
  {
    id: "AI-22", src: "ai", cat: "cloud", lv: 1,
    q: "An organization runs sensitive workloads in its own private cloud and bursts to a public cloud during peak demand. Which deployment model is this?",
    qz: "某組織在自建的私有雲上執行敏感工作負載，並在需求尖峰時延伸使用公有雲資源。這屬於哪一種部署模式？",
    o: ["Community cloud", "Public cloud only", "Hybrid cloud", "Multi-tenant SaaS"],
    oz: ["社群雲", "僅使用公有雲", "混合雲", "多租戶 SaaS"],
    a: 2,
    ez: "依 NIST SP 800-145 的定義，雲端部署模式有四種：私有雲、社群雲、公有雲、混合雲。混合雲結合兩種以上的雲端環境並讓它們能互通，常見用法就是敏感資料留在私有雲，運算需求暴增時再「雲爆發（Cloud Bursting）」到公有雲。社群雲由具有共同需求的組織共享（例如多個政府機關共用的雲）；多租戶 SaaS 是服務模式，而不是部署模式。",
    ee: "NIST SP 800-145 defines four deployment models: private, community, public and hybrid. A hybrid cloud connects two or more environments so they interoperate. A typical pattern keeps sensitive data in a private cloud and bursts to the public cloud at peak demand. A community cloud is shared by organizations with common needs, and multi-tenant SaaS is a service model, not a deployment model.",
    iso: ["5.23"],
    tip: ""
  },
  {
    id: "AI-23", src: "ai", cat: "cloud", lv: 1,
    q: "What is the most common cause of data breaches involving cloud storage services such as Amazon S3 buckets?",
    qz: "涉及雲端儲存服務（例如 Amazon S3 儲存貯體）的資料外洩事件，最常見的原因是什麼？",
    o: [
      "Physical theft of disks from the cloud data center",
      "Misconfiguration, such as storage buckets left publicly accessible",
      "Zero-day vulnerabilities in the cloud provider's hypervisor",
      "Quantum computers breaking the encryption"
    ],
    oz: [
      "雲端資料中心的硬碟遭實體竊取",
      "組態設定錯誤，例如儲存貯體被設定為公開存取",
      "雲端供應商 Hypervisor 的零時差漏洞",
      "量子電腦破解了加密"
    ],
    a: 1,
    ez: "絕大多數雲端資料外洩源自客戶自己的組態錯誤：儲存貯體設為公開、存取金鑰外流、安全群組對外全開、未啟用日誌等，這些都屬於責任共擔模型中「客戶的責任」。雲端業者的實體機房安全與 Hypervisor 防護通常非常嚴密，量子破解目前也不是現實威脅。對策包括雲端資安態勢管理（CSPM）工具、組態基準、基礎架構即程式碼（IaC）審查，以及 AWS「封鎖公開存取」之類的防呆設定。",
    ee: "Most cloud data breaches come from customer misconfiguration: public buckets, leaked access keys, security groups open to the world or disabled logging, all on the customer's side of the shared responsibility model. Provider data centers and hypervisors are heavily protected, and quantum attacks are not a current threat. Countermeasures include CSPM tools, configuration baselines, IaC review and guardrails such as AWS Block Public Access.",
    iso: ["8.9", "5.23"],
    tip: "稽核雲端環境時，可請客戶展示 CSPM 或雲端原生工具（如 AWS Security Hub、Microsoft Defender for Cloud）的最新評分與待改善項目。"
  },
  {
    id: "AI-24", src: "ai", cat: "cloud", lv: 2,
    q: "An administrator relies solely on virtual machine snapshots stored on the same storage array as the VMs for data protection. Why is this insufficient?",
    qz: "某管理者僅依賴存放在「與虛擬機器同一套儲存設備」上的快照來保護資料。為什麼這樣還不夠？",
    o: [
      "Snapshots are always encrypted and cannot be restored",
      "Snapshots violate virtualization licensing terms",
      "Snapshots slow down the network",
      "Snapshots depend on the same underlying storage and are not independent copies, so a storage failure or ransomware can destroy both"
    ],
    oz: [
      "快照一律加密，因此無法還原",
      "快照違反虛擬化軟體的授權條款",
      "快照會拖慢網路速度",
      "快照依賴同一套底層儲存設備，並非獨立副本；儲存設備故障或勒索軟體可能同時摧毀兩者"
    ],
    a: 3,
    ez: "快照（Snapshot）記錄的是某個時間點的狀態，且通常依賴原始磁碟、存在同一套儲存設備上。一旦儲存設備故障、遭勒索軟體加密，或攻擊者取得虛擬化平台的管理權限，快照會與虛擬機器一起消失。快照適合在更新前作為短期還原點，但不能取代備份。正確做法是遵循 3-2-1 原則：3 份資料、2 種不同媒體、1 份存放異地，最好再加上 1 份離線或不可變（Immutable）的備份。",
    ee: "A snapshot captures a point in time and usually depends on the original disks on the same storage system. If that storage fails, is encrypted by ransomware or the attacker gains control of the virtualization platform, the snapshots disappear with the VMs. Snapshots are good short-term restore points before changes, but they do not replace backups. Follow the 3-2-1 rule (three copies, two media, one off-site), ideally plus an offline or immutable copy.",
    iso: ["8.13"],
    tip: "稽核備份時，「有備份」還不夠，要看「有沒有做過還原測試」，以及還原所需時間是否符合 RTO。"
  },
  {
    id: "AI-25", src: "ai", cat: "cloud", lv: 2,
    q: "In a multi-tenant virtualized environment, which attack allows a malicious tenant to break out of a virtual machine and interact with the hypervisor or other tenants' VMs?",
    qz: "在多租戶的虛擬化環境中，哪一種攻擊能讓惡意租戶跳脫虛擬機器，進而接觸 Hypervisor 或其他租戶的虛擬機器？",
    o: ["VM escape", "VM sprawl", "Live migration", "Thin provisioning"],
    oz: ["虛擬機器逃逸（VM Escape）", "虛擬機器蔓延（VM Sprawl）", "即時遷移（Live Migration）", "精簡佈建（Thin Provisioning）"],
    a: 0,
    ez: "VM Escape 是利用 Hypervisor 或虛擬硬體的漏洞，從虛擬機器內部突破隔離，進而控制宿主機或存取其他虛擬機器，是多租戶雲端最嚴重的威脅之一。VM Sprawl 是虛擬機器數量失控、缺乏管理，屬於管理問題；即時遷移是在不停機的情況下把虛擬機器移到另一台主機；精簡佈建是依實際用量配置儲存空間。ISO/IEC 27017 的 CLD.9.5.1「虛擬運算環境中之區隔」正是要求雲端業者確保租戶之間的隔離。",
    ee: "A VM escape exploits flaws in the hypervisor or virtual hardware to break isolation from inside a VM and reach the host or other VMs, one of the most serious multi-tenant risks. VM sprawl is uncontrolled growth of VMs, a management problem. Live migration moves a running VM to another host, and thin provisioning allocates storage on demand. ISO/IEC 27017 control CLD.9.5.1 (segregation in virtual computing environments) requires providers to keep tenants isolated.",
    iso: ["5.23", "8.22"],
    tip: "VM Sprawl 雖然不是攻擊，卻是常見的稽核問題：沒人認領、沒人修補的「殭屍虛擬機器」就是潛在破口。"
  },
  {
    id: "AI-26", src: "ai", cat: "cloud", lv: 2,
    q: "Which essential characteristic of cloud computing allows resources to be scaled out and in automatically according to demand?",
    qz: "雲端運算的哪一項基本特徵，能依需求自動擴增或縮減資源？",
    o: ["Rapid elasticity", "Broad network access", "Resource pooling", "Measured service"],
    oz: ["快速彈性（Rapid Elasticity）", "廣泛的網路存取（Broad Network Access）", "資源共享池（Resource Pooling）", "可計量的服務（Measured Service）"],
    a: 0,
    ez: "NIST SP 800-145 定義雲端運算的五大基本特徵：隨需自助服務、廣泛的網路存取、資源共享池、快速彈性、可計量的服務。快速彈性是指資源能隨負載自動擴充或縮減，例如電商在雙 11 期間自動增加伺服器，活動結束後再縮回。廣泛的網路存取指可透過網路以各種裝置存取；資源共享池指供應商以多租戶方式集中提供資源；可計量的服務指依實際用量監控與計費。",
    ee: "NIST SP 800-145 lists five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service. Rapid elasticity means capacity grows and shrinks automatically with load, such as an e-commerce site adding servers for a big sale and scaling back afterwards. Broad network access means reachable from many devices, resource pooling means multi-tenant shared resources, and measured service means usage is metered and billed.",
    iso: ["8.6"],
    tip: ""
  },
  {
    id: "AI-27", src: "ai", cat: "cloud", lv: 2,
    q: "When selecting a cloud service provider to store personal data, which contractual consideration is most important from a privacy and compliance perspective?",
    qz: "選擇雲端服務供應商來存放個人資料時，從隱私與法遵的角度來看，哪一項契約考量最重要？",
    o: [
      "The guaranteed CPU clock speed of the provider's servers",
      "The availability of a free trial period",
      "Data residency, transparency about sub-processors, and data return and deletion when the contract ends",
      "The number of interface languages the provider supports"
    ],
    oz: [
      "供應商伺服器保證的 CPU 時脈",
      "是否提供免費試用期",
      "資料存放地點、次處理者（複委託）的透明度，以及契約終止時的資料返還與刪除",
      "供應商支援的介面語言數量"
    ],
    a: 2,
    ez: "委託雲端業者處理個資時，契約必須明確約定：資料存放在哪些國家或地區（涉及跨境傳輸限制）、是否複委託給其他次處理者（Sub-processor）且須事先告知、安全控制措施與稽核權、事故通報時限，以及契約終止時如何返還與刪除資料並提供證明。這些對應 GDPR 第 28 條、台灣《個人資料保護法施行細則》第 8 條委託機關對受託者的監督事項，以及 ISO/IEC 27017 的 CLD.8.1.5「雲端服務客戶資產之移除」。其他選項都與隱私法遵無關。",
    ee: "When a cloud provider processes personal data, the contract should state where data is stored (cross-border transfer rules), whether sub-processors are used and notified, security controls and audit rights, breach notification deadlines, and how data is returned and deleted with proof at termination. These map to GDPR Article 28, the supervision duties for commissioned processing under Taiwan's Personal Data Protection Act Enforcement Rules (Article 8), and ISO/IEC 27017 CLD.8.1.5 (removal of cloud service customer assets). The other options are irrelevant to privacy compliance.",
    iso: ["5.20", "5.23", "5.34"],
    tip: "PIMS 輔導重點：委外契約的個資條款常常只寫一句「乙方應遵守個資法」，這是不夠的，應具體列出監督事項。"
  },
  {
    id: "AI-28", src: "ai", cat: "cloud", lv: 2,
    q: "Under the shared responsibility model for a SaaS application, which responsibility always remains with the customer?",
    qz: "在 SaaS 應用程式的責任共擔模型中，哪一項責任永遠屬於客戶？",
    o: [
      "Patching the underlying physical servers",
      "Managing user identities and access rights, and classifying their own data",
      "Maintaining the data center's power and cooling",
      "Updating the hypervisor"
    ],
    oz: [
      "修補底層的實體伺服器",
      "管理使用者身分與存取權限，並對自己的資料進行分類分級",
      "維護資料中心的電力與空調",
      "更新 Hypervisor"
    ],
    a: 1,
    ez: "無論 IaaS、PaaS 或 SaaS，「資料」與「帳號存取」永遠是客戶的責任：誰可以登入、擁有什麼權限、資料分享給誰、哪些資料屬於機密、何時刪除。實體伺服器修補、機房電力空調、Hypervisor 更新，在 SaaS 模式下都由供應商負責。許多 SaaS 外洩事件（例如文件被設定為「知道連結的人都能檢視」）都是客戶端的權限設定不當造成的。",
    ee: "In IaaS, PaaS and SaaS alike, data and access stay with the customer: who can sign in, what permissions they hold, what data is shared with whom, what is confidential and when it is deleted. Patching physical servers, data center power and cooling and hypervisor updates are the provider's job in SaaS. Many SaaS leaks, such as documents shared with 'anyone with the link', come from customer-side permission mistakes.",
    iso: ["5.23", "5.15", "5.12"],
    tip: ""
  },

  /* ── 容器化與 DevOps ───────────────────────────── */
  {
    id: "AI-29", src: "ai", cat: "devops", lv: 1,
    q: "What is the key architectural difference between containers and virtual machines?",
    qz: "容器（Container）與虛擬機器（VM）在架構上最關鍵的差異是什麼？",
    o: [
      "Containers include a full guest operating system, while VMs do not",
      "Containers can only run on Windows",
      "Containers share the host operating system kernel and isolate processes, so they are lighter than VMs, each of which runs a full guest OS",
      "Virtual machines start faster than containers"
    ],
    oz: [
      "容器包含完整的客體作業系統，虛擬機器則沒有",
      "容器只能在 Windows 上執行",
      "容器共用主機作業系統的核心、以程序層級隔離，比各自執行完整客體作業系統的虛擬機器更輕量",
      "虛擬機器的啟動速度比容器快"
    ],
    a: 2,
    ez: "虛擬機器透過 Hypervisor 模擬整台電腦，每台都有自己的客體作業系統，隔離性強但較笨重（GB 等級、開機需數十秒）。容器則共用宿主機的核心，利用 Linux 的 namespaces 與 cgroups 隔離程序與資源，映像檔小（MB 等級）、秒級啟動，非常適合微服務與 CI/CD。代價是隔離強度較弱：核心一旦有漏洞，可能影響同一主機上的所有容器。",
    ee: "A VM emulates a whole computer through a hypervisor, each with its own guest OS: strong isolation but heavy (gigabytes, tens of seconds to boot). Containers share the host kernel and use Linux namespaces and cgroups to isolate processes and resources, so images are small (megabytes) and start in seconds, ideal for microservices and CI/CD. The trade-off is weaker isolation: a kernel vulnerability can affect every container on the host.",
    iso: [],
    tip: "用高雄港來想：貨櫃（容器）共用同一艘船的引擎（核心），而每艘船（虛擬機器）都有自己的引擎與船員（作業系統）。"
  },
  {
    id: "AI-30", src: "ai", cat: "devops", lv: 1,
    q: "In Docker, what is the relationship between an image and a container?",
    qz: "在 Docker 中，映像檔（Image）與容器（Container）的關係是什麼？",
    o: [
      "An image is a read-only template, and a container is a running instance created from that image",
      "They are two names for exactly the same thing",
      "A container is stored in a registry, while an image runs in memory",
      "An image is a virtual machine disk that includes a hypervisor"
    ],
    oz: [
      "映像檔是唯讀的範本，容器則是由該映像檔建立、正在執行的實例",
      "兩者只是同一件事的不同名稱",
      "容器存放在映像檔倉庫（Registry）中，映像檔則在記憶體中執行",
      "映像檔是包含 Hypervisor 的虛擬機器磁碟"
    ],
    a: 0,
    ez: "映像檔像是「食譜」，或物件導向中的「類別（Class）」：由 Dockerfile 建置、分層儲存且唯讀，存放在 Docker Hub、Harbor 等映像檔倉庫。容器則像是照食譜做出來的「料理」，或物件的「實例（Instance）」：在映像檔之上加一層可寫入層後執行。同一個映像檔可以同時啟動許多個容器。也因為映像檔是所有容器的來源，映像檔本身的安全（來源可信、無已知漏洞）格外重要。",
    ee: "An image is like a recipe, or a class in object-oriented programming: built from a Dockerfile, layered, read-only and stored in a registry such as Docker Hub or Harbor. A container is the dish, or an instance: the image plus a writable layer, running. One image can start many containers, which is why image security (trusted source, no known vulnerabilities) matters so much.",
    iso: [],
    tip: ""
  },
  {
    id: "AI-31", src: "ai", cat: "devops", lv: 2,
    q: "In Kubernetes, what is the smallest deployable unit, which can contain one or more containers that share network and storage?",
    qz: "在 Kubernetes 中，最小的部署單位是什麼？它可包含一個或多個共用網路與儲存空間的容器。",
    o: ["Node", "Cluster", "Namespace", "Pod"],
    oz: ["節點（Node）", "叢集（Cluster）", "命名空間（Namespace）", "Pod"],
    a: 3,
    ez: "Pod 是 Kubernetes 調度與部署的最小單位，同一個 Pod 內的容器共用 IP 位址與儲存卷（Volume）；通常一個 Pod 放一個主要容器，必要時搭配輔助的 Sidecar 容器（例如日誌收集）。Node 是執行 Pod 的工作主機（實體機或虛擬機）；Cluster 是由控制平面與多個 Node 組成的整體；Namespace 用於在叢集內做邏輯區隔，常搭配 RBAC 與資源配額，實現多團隊之間的隔離。",
    ee: "A Pod is the smallest unit Kubernetes schedules and deploys. Containers in a Pod share an IP address and volumes; usually there is one main container, sometimes with a sidecar such as a log collector. A Node is a worker machine (physical or virtual) that runs Pods, a Cluster is the control plane plus its Nodes, and a Namespace logically partitions the cluster, often combined with RBAC and resource quotas to separate teams.",
    iso: [],
    tip: "Kubernetes 的 Secret 預設只是 Base64 編碼、並非加密，應啟用 etcd 靜態加密，或改用外部的金鑰管理服務。"
  },
  {
    id: "AI-32", src: "ai", cat: "devops", lv: 2,
    q: "A developer accidentally commits a cloud API key to a public Git repository. What is the most appropriate immediate response?",
    qz: "一位開發人員不小心把雲端 API 金鑰提交（commit）到公開的 Git 儲存庫。最適當的立即處置是什麼？",
    o: [
      "Delete the file in a new commit and carry on",
      "Make the repository private and take no further action",
      "Rename the variable that holds the key",
      "Revoke and rotate the exposed key immediately, check for misuse, and move secrets into a secrets manager"
    ],
    oz: [
      "用一個新的 commit 刪除該檔案，然後繼續工作",
      "把儲存庫改為私有，其他什麼都不做",
      "把存放金鑰的變數改名",
      "立即撤銷並更換外洩的金鑰、檢查是否遭濫用，並將機敏資訊改存於密鑰管理服務"
    ],
    a: 3,
    ez: "Git 會保留完整歷史，刪除檔案後，舊的 commit 仍看得到金鑰；公開儲存庫更會被自動化機器人在幾分鐘內掃描到並盜用（例如拿去挖礦）。因此第一步一定是「撤銷並更換金鑰」，讓外洩的金鑰失效，接著檢查雲端帳單與存取日誌是否有異常使用。長期改善：把金鑰放進 HashiCorp Vault、AWS Secrets Manager 等密鑰管理服務，並在 CI 中加入秘密掃描（Secret Scanning）與 pre-commit 檢查。",
    ee: "Git keeps full history, so the key remains visible in old commits after the file is deleted, and bots scan public repositories within minutes to abuse leaked keys (for example, for crypto mining). The first step is always to revoke and rotate the key so it stops working, then review billing and access logs for misuse. Longer term, store secrets in a manager such as HashiCorp Vault or AWS Secrets Manager and add secret scanning and pre-commit checks to CI.",
    iso: ["5.17", "8.4", "8.28"],
    tip: "這也是一起資安事件，應依事件管理程序記錄、通報與檢討，而不只是技術上把金鑰換掉。"
  },
  {
    id: "AI-33", src: "ai", cat: "devops", lv: 1,
    q: "In a CI/CD pipeline, what does 'Continuous Integration' primarily mean?",
    qz: "在 CI/CD 管線中，「持續整合（Continuous Integration）」主要是指什麼？",
    o: [
      "Developers frequently merge code into a shared repository, where each change is automatically built and tested",
      "Every change is deployed directly to production without any testing",
      "Integrating with customers' systems once a month",
      "Merging all code only once, right before a major release"
    ],
    oz: [
      "開發人員頻繁地把程式碼合併到共用儲存庫，每次變更都會自動建置與測試",
      "每次變更都直接部署到正式環境，完全不做測試",
      "每個月與客戶系統整合一次",
      "只在重大版本發布前，一次合併所有程式碼"
    ],
    a: 0,
    ez: "持續整合（CI）要求開發人員每天多次把程式碼合併到主線，每次合併都自動觸發建置、單元測試與靜態掃描，及早發現衝突與缺陷，避免在版本發布前才陷入「整合地獄」。持續交付（Continuous Delivery）是讓程式隨時處於可部署狀態，上線前仍保留人工核准；持續部署（Continuous Deployment）則是通過所有自動化測試後自動上線。不做測試就直接上線，並不是 CI/CD。",
    ee: "Continuous Integration means developers merge to the main line several times a day, and every merge automatically triggers builds, unit tests and static scans, catching conflicts and defects early instead of in a painful integration phase before release. Continuous Delivery keeps the code always deployable with a manual approval before production, and Continuous Deployment releases automatically once all automated tests pass. Deploying without tests is not CI/CD.",
    iso: ["8.25", "8.29", "8.32"],
    tip: ""
  },
  {
    id: "AI-34", src: "ai", cat: "devops", lv: 1,
    q: "What does the term 'shift left' mean in DevSecOps?",
    qz: "在 DevSecOps 中，「左移（Shift Left）」一詞是什麼意思？",
    o: [
      "Moving servers to the left side of the rack",
      "Delaying security reviews until after the software is released",
      "Integrating security testing and practices earlier in the development lifecycle",
      "Moving operations staff to a different time zone"
    ],
    oz: [
      "把伺服器移到機櫃的左側",
      "把安全審查延後到軟體上線之後",
      "把安全測試與實務提前整合到開發生命週期的早期階段",
      "把維運人員調到不同時區"
    ],
    a: 2,
    ez: "把開發流程畫成一條由左（需求、設計）到右（測試、上線、維運）的時間軸，「左移」就是把安全工作往前移：需求階段定義安全需求、設計階段做威脅建模、開發階段以 IDE 外掛與 SAST 即時檢查、提交時自動掃描相依套件。缺陷愈早發現，修正成本愈低；等上線後才發現漏洞，修補代價可能是設計階段的數十倍。",
    ee: "Picture the lifecycle as a timeline from left (requirements, design) to right (testing, release, operations). Shifting left moves security work earlier: security requirements at the start, threat modeling during design, IDE plugins and SAST while coding, and dependency scans on every commit. The earlier a defect is found, the cheaper it is to fix; flaws found after release can cost many times more.",
    iso: ["8.25", "8.26", "8.29"],
    tip: ""
  },
  {
    id: "AI-35", src: "ai", cat: "devops", lv: 1,
    q: "Which practice involves defining and provisioning infrastructure through machine-readable configuration files, such as Terraform or Ansible, that can be version-controlled?",
    qz: "哪一種做法是透過機器可讀的設定檔（例如 Terraform、Ansible）來定義與建置基礎架構，且這些檔案可以納入版本控管？",
    o: ["Shadow IT", "Infrastructure as Code (IaC)", "Manual provisioning", "Bare-metal imaging"],
    oz: ["影子 IT（Shadow IT）", "基礎架構即程式碼（IaC）", "手動建置", "裸機映像部署"],
    a: 1,
    ez: "IaC 把伺服器、網路、防火牆規則等基礎架構寫成程式碼，帶來三大好處：可重複（每次建置結果一致，避免組態漂移）、可追溯（透過 Git 知道誰在何時改了什麼）、可審查（上線前能用工具掃描錯誤組態）。對稽核而言，IaC 讓組態管理與變更管理都有清楚的證據。影子 IT 是指未經 IT 部門核准、私自使用的系統或服務，是一種風險；手動建置則容易出錯且難以追蹤。",
    ee: "IaC writes servers, networks and firewall rules as code. It is repeatable (consistent builds, no configuration drift), traceable (Git shows who changed what and when) and reviewable (tools can scan for misconfigurations before deployment). For auditors, IaC produces clear evidence for configuration and change management. Shadow IT is unapproved systems or services and is a risk, and manual provisioning is error-prone and hard to trace.",
    iso: ["8.9", "8.32"],
    tip: ""
  },
  {
    id: "AI-36", src: "ai", cat: "devops", lv: 2,
    q: "To reduce software supply chain risk, a DevOps team wants to ensure that container images deployed to production have no known critical vulnerabilities and come from trusted sources. Which combination is most effective?",
    qz: "為降低軟體供應鏈風險，DevOps 團隊希望確保部署到正式環境的容器映像檔沒有已知重大漏洞，且來自可信任的來源。哪一組做法最有效？",
    o: [
      "Always pull the 'latest' tag from any public registry",
      "Scan images for vulnerabilities in the pipeline, use minimal base images from trusted registries, and sign and verify images before deployment",
      "Run every container as root to avoid compatibility problems",
      "Disable logging to improve container performance"
    ],
    oz: [
      "一律從任何公開倉庫拉取「latest」標籤的映像檔",
      "在管線中掃描映像檔漏洞、使用來自可信任倉庫的精簡基礎映像檔，並在部署前對映像檔簽章與驗證",
      "所有容器都以 root 執行，以避免相容性問題",
      "停用日誌以提升容器效能"
    ],
    a: 1,
    ez: "容器供應鏈安全有三個重點。一、掃描：在 CI 管線中使用 Trivy、Grype 等工具掃描映像檔，發現重大漏洞就阻擋部署。二、來源：使用官方或企業內部審核過的精簡基礎映像檔（如 distroless、Alpine），減少不必要的套件與攻擊面。三、完整性：以 Sigstore／cosign 等工具簽章，部署時驗證簽章，確保映像檔未遭竄改。「latest」標籤的內容會變動、無法追溯；以 root 執行與停用日誌都會增加風險。",
    ee: "Container supply chain security has three parts. Scan images in CI with tools such as Trivy or Grype and block deployment on critical findings. Use official or internally approved minimal base images (distroless, Alpine) to cut unneeded packages. Sign images with Sigstore/cosign and verify signatures at deployment so tampering is caught. The 'latest' tag changes over time and is not traceable, while running as root or disabling logs adds risk.",
    iso: ["8.8", "5.21", "8.25"],
    tip: "可請團隊提供 SBOM 與最近一次的映像檔掃描報告，作為供應鏈管理的佐證。"
  },
  {
    id: "AI-37", src: "ai", cat: "devops", lv: 2,
    q: "Why is running containers as the root user considered a security risk?",
    qz: "為什麼以 root 使用者執行容器被視為一項安全風險？",
    o: [
      "Containers running as root cannot access the network",
      "If an attacker compromises the container and escapes its isolation, they may gain root privileges on the host",
      "Kubernetes does not allow root containers at all",
      "Root containers always use more memory"
    ],
    oz: [
      "以 root 執行的容器無法存取網路",
      "若攻擊者攻陷容器並突破隔離，可能取得宿主機的 root 權限",
      "Kubernetes 完全不允許 root 容器",
      "root 容器一定會占用更多記憶體"
    ],
    a: 1,
    ez: "容器與宿主機共用核心，容器內的 root 在預設情況下對應的就是宿主機上的 UID 0。一旦應用程式被攻破，再配合核心或容器執行環境的漏洞（例如 runc 漏洞 CVE-2019-5736），攻擊者就可能逃逸並取得整台主機的最高權限。最佳做法是在 Dockerfile 以 USER 指定非 root 使用者、移除不需要的 Linux capabilities、使用唯讀檔案系統，並以 Kubernetes 的 Pod Security Standards 強制限制。",
    ee: "Containers share the host kernel, and root inside a container maps to UID 0 on the host by default. If the application is compromised and combined with a kernel or runtime flaw (such as runc CVE-2019-5736), the attacker may escape and own the host. Specify a non-root USER in the Dockerfile, drop unneeded Linux capabilities, use a read-only filesystem and enforce Kubernetes Pod Security Standards.",
    iso: ["8.2", "8.9"],
    tip: ""
  },
  {
    id: "AI-38", src: "ai", cat: "devops", lv: 2,
    q: "A team maintains two identical production environments. Traffic is switched from the current version to the new version all at once, and the team can roll back quickly by switching back. What is this deployment strategy called?",
    qz: "某團隊維護兩套完全相同的正式環境，上線時一次把流量從舊版本切換到新版本，若有問題只要切回去就能快速回復。這種部署策略稱為什麼？",
    o: ["Canary release", "Rolling update", "Big-bang migration", "Blue-green deployment"],
    oz: ["金絲雀發布（Canary Release）", "滾動更新（Rolling Update）", "大爆炸式移轉（Big-bang Migration）", "藍綠部署（Blue-Green Deployment）"],
    a: 3,
    ez: "藍綠部署準備「藍」（現行版本）與「綠」（新版本）兩套環境，新版本在綠環境驗證完成後一次切換流量，出問題再切回藍環境，停機時間極短、回復迅速。金絲雀發布是先讓一小部分使用者（如 5%）使用新版本，觀察正常後再逐步擴大；滾動更新是逐台替換伺服器；大爆炸式移轉是一次全面切換、且沒有並行的舊環境可退回，風險最高。從變更管理的角度來看，藍綠部署讓「回復計畫」變得具體可行。",
    ee: "Blue-green deployment keeps a blue (current) and a green (new) environment. Once green is verified, traffic switches over at once, and switching back is the rollback, so downtime is minimal and recovery fast. A canary release sends a small share of users (say 5%) to the new version first and expands gradually. A rolling update replaces servers one by one. A big-bang migration switches everything with no parallel environment to return to, the riskiest option. For change management, blue-green makes the rollback plan concrete.",
    iso: ["8.32", "8.31"],
    tip: ""
  },

  /* ── 軟體開發與程式設計 ───────────────────────────── */
  {
    id: "AI-39", src: "ai", cat: "dev", lv: 1,
    q: "Which coding practice is the most effective defense against SQL injection?",
    qz: "下列哪一種程式撰寫做法，是防禦 SQL 隱碼攻擊（SQL Injection）最有效的方法？",
    o: ["Hiding database error messages from users", "Using parameterized queries (prepared statements)", "Requiring users to choose longer passwords", "Encoding all output as HTML"],
    oz: ["對使用者隱藏資料庫錯誤訊息", "使用參數化查詢（預備陳述式）", "要求使用者設定更長的密碼", "把所有輸出內容做 HTML 編碼"],
    a: 1,
    ez: "SQL 隱碼攻擊的成因，是把使用者輸入直接串接進 SQL 字串，例如輸入 ' OR '1'='1 讓查詢條件永遠成立。參數化查詢讓 SQL 結構與資料分開傳送，資料庫會把輸入一律當成「值」而非「指令」，從根本上杜絕注入。隱藏錯誤訊息只能增加攻擊難度（盲注仍可能成功）；HTML 編碼是防 XSS 的方法；密碼長度與 SQL 注入無關。再搭配最小權限的資料庫帳號與輸入驗證，就能形成縱深防禦。",
    ee: "SQL injection happens when user input is concatenated into SQL strings, for example ' OR '1'='1 making a condition always true. Parameterized queries send the SQL structure and the data separately, so the database treats input as values, never as commands, which removes the root cause. Hiding errors only slows attackers (blind injection still works), HTML encoding defends against XSS, and password length is unrelated. Least-privilege database accounts and input validation add defense in depth.",
    iso: ["8.28"],
    tip: ""
  },
  {
    id: "AI-40", src: "ai", cat: "dev", lv: 1,
    q: "An attacker posts malicious JavaScript in a website's comment field, and the script then runs in the browsers of other users who view the comments. What vulnerability is this?",
    qz: "攻擊者在網站留言欄位張貼惡意 JavaScript，其他使用者瀏覽留言時，這段腳本就在他們的瀏覽器中執行。這是什麼漏洞？",
    o: ["Cross-site request forgery (CSRF)", "SQL injection", "Stored cross-site scripting (XSS)", "Directory traversal"],
    oz: ["跨站請求偽造（CSRF）", "SQL 隱碼攻擊", "儲存型跨站腳本攻擊（Stored XSS）", "目錄遍歷（Directory Traversal）"],
    a: 2,
    ez: "惡意腳本被「儲存」在網站資料庫中，再被送到其他使用者的瀏覽器執行，就是儲存型 XSS，可用來竊取 Session Cookie、冒用身分操作或植入釣魚內容。防禦方式：依輸出位置做適當編碼（Output Encoding）、輸入驗證、設定內容安全政策（CSP），並將 Cookie 設為 HttpOnly。CSRF 是誘使已登入的使用者送出非本意的請求；SQL 注入攻擊的是資料庫；目錄遍歷是利用 ../ 讀取伺服器上不該存取的檔案。",
    ee: "A malicious script stored in the site's database and then served to other users' browsers is stored XSS. It can steal session cookies, perform actions as the victim or inject phishing content. Defenses: context-aware output encoding, input validation, a Content Security Policy and HttpOnly cookies. CSRF tricks a logged-in user into sending unintended requests, SQL injection targets the database, and directory traversal uses ../ to read files outside the web root.",
    iso: ["8.28", "8.26"],
    tip: ""
  },
  {
    id: "AI-41", src: "ai", cat: "dev", lv: 2,
    q: "In the OWASP Top 10 (2021 edition), which category is ranked first as the most serious web application security risk?",
    qz: "在 OWASP Top 10（2021 年版）中，排名第一、被視為最嚴重的網站應用程式安全風險是哪一類？",
    o: ["Injection", "Cryptographic Failures", "Security Misconfiguration", "Broken Access Control"],
    oz: ["注入攻擊（Injection）", "加密機制失效（Cryptographic Failures）", "安全設定缺陷（Security Misconfiguration）", "存取控制失效（Broken Access Control）"],
    a: 3,
    ez: "OWASP Top 10 2021 年版的前三名依序為：A01 存取控制失效、A02 加密機制失效、A03 注入攻擊（2017 年版第一名的注入攻擊下降到第三）。存取控制失效是指使用者能做超出權限的事，例如修改網址中的訂單編號就能看到別人的訂單（IDOR）、一般使用者能呼叫管理者 API。防禦重點是在伺服器端對每一個請求檢查授權，並採「預設拒絕」。",
    ee: "The top three in the OWASP Top 10 2021 are A01 Broken Access Control, A02 Cryptographic Failures and A03 Injection; Injection fell from first place in 2017. Broken access control lets users act beyond their permissions, such as changing an order ID in the URL to see someone else's order (IDOR) or calling admin APIs as a normal user. Check authorization on the server for every request and deny by default.",
    iso: ["8.3", "8.26", "8.28"],
    tip: "OWASP Top 10 常被用作委外開發契約與驗收的安全要求依據，例如明訂「上線前須通過 OWASP Top 10 檢測」。"
  },
  {
    id: "AI-42", src: "ai", cat: "dev", lv: 2,
    q: "How should an application store user passwords?",
    qz: "應用程式應該如何儲存使用者密碼？",
    o: [
      "Encrypted with AES using a key hard-coded in the source code",
      "Hashed with a slow, salted algorithm designed for passwords, such as bcrypt, scrypt or Argon2",
      "In plain text in a table that only administrators can read",
      "Hashed with MD5 because it is fast"
    ],
    oz: [
      "以 AES 加密，金鑰直接寫在原始碼中",
      "使用專為密碼設計、加鹽且運算緩慢的雜湊演算法，例如 bcrypt、scrypt 或 Argon2",
      "以明文存放在只有管理者能讀取的資料表中",
      "使用 MD5 雜湊，因為速度快"
    ],
    a: 1,
    ez: "密碼應該「雜湊」而不是「加密」：系統不需要知道原始密碼，只需要比對雜湊值。加鹽（Salt）讓相同的密碼產生不同的雜湊，可抵禦彩虹表；刻意放慢運算的演算法（bcrypt、scrypt、Argon2、PBKDF2）讓攻擊者暴力破解的成本大增。MD5、SHA-1 速度太快，一張顯示卡每秒可嘗試數十億次；AES 加密若金鑰外洩就能還原全部密碼；明文儲存更是絕對禁止。",
    ee: "Passwords should be hashed, not encrypted: the system only needs to compare hashes, never the original. A salt makes identical passwords hash differently and defeats rainbow tables, and deliberately slow algorithms (bcrypt, scrypt, Argon2, PBKDF2) make brute force expensive. MD5 and SHA-1 are so fast that one GPU can try billions of guesses per second, AES with a leaked key reveals every password, and plain text is never acceptable.",
    iso: ["5.17", "8.24"],
    tip: ""
  },
  {
    id: "AI-43", src: "ai", cat: "dev", lv: 1,
    q: "Why is a version control system such as Git important for change management and auditability in software development?",
    qz: "為什麼像 Git 這樣的版本控制系統，對軟體開發的變更管理與可稽核性很重要？",
    o: [
      "It compresses source code to save disk space",
      "It encrypts the source code automatically",
      "It records who changed what, when and why, enabling traceability, peer review and rollback",
      "It removes the need for software testing"
    ],
    oz: [
      "它能壓縮原始碼以節省磁碟空間",
      "它會自動加密原始碼",
      "它記錄誰在何時、為何修改了什麼，支援追溯、同儕審查與版本回復",
      "它讓軟體測試變得不再需要"
    ],
    a: 2,
    ez: "版本控制系統完整記錄每一次變更的作者、時間、內容與說明（commit message）；搭配合併請求（Pull Request），可要求同儕審查後才能併入主線，並可隨時回復到先前的版本。對 ISMS 而言，這同時提供原始碼存取控制、變更管理與職務區隔的佐證，例如設定分支保護（Branch Protection），讓開發者無法自行核准自己的程式碼。版本控制不會自動加密，也不能取代測試。",
    ee: "Version control records the author, time, content and reason (commit message) for every change. Pull requests can require peer review before merging, and any earlier version can be restored. For an ISMS this provides evidence for source code access control, change management and segregation of duties, for example branch protection that stops developers approving their own code. Version control does not encrypt code or replace testing.",
    iso: ["8.4", "8.32", "5.3"],
    tip: "稽核開發流程時，可隨機抽一筆正式環境的變更，往回追到對應的 commit、Pull Request 的審查者與測試紀錄。"
  },
  {
    id: "AI-44", src: "ai", cat: "dev", lv: 2,
    q: "Which framework is commonly used to let a third-party application access a user's resources through an API without the user sharing their password with that application?",
    qz: "哪一種框架常用於讓第三方應用程式透過 API 存取使用者的資源，而使用者不需要把密碼交給該應用程式？",
    o: ["OAuth 2.0", "FTP", "Telnet", "HTTP Basic Authentication"],
    oz: ["OAuth 2.0", "FTP（檔案傳輸協定）", "Telnet", "HTTP 基本驗證（Basic Authentication）"],
    a: 0,
    ez: "OAuth 2.0 是「授權」框架：使用者在授權伺服器（如 Google）登入並同意授權範圍（Scope）後，第三方應用程式取得的是有時效、可撤銷的存取權杖（Access Token），而不是使用者的密碼，例如「允許某 App 讀取你的 Google 行事曆」。若還需要確認「使用者是誰」（身分驗證），則使用建立在 OAuth 2.0 之上的 OpenID Connect（OIDC）。HTTP 基本驗證每次都要傳送帳號密碼；FTP 與 Telnet 更是以明文傳輸。",
    ee: "OAuth 2.0 is an authorization framework. The user signs in at the authorization server (such as Google) and approves a scope, and the third-party app receives a time-limited, revocable access token instead of the password, as in 'allow this app to read your Google Calendar'. To establish who the user is (authentication), use OpenID Connect, built on OAuth 2.0. HTTP Basic sends the credentials with every request, and FTP and Telnet transmit in clear text.",
    iso: ["5.15", "8.5"],
    tip: ""
  },
  {
    id: "AI-45", src: "ai", cat: "dev", lv: 1,
    q: "Why should development, testing and production environments be separated?",
    qz: "為什麼開發、測試與正式（生產）環境必須區隔？",
    o: [
      "To reduce software license costs",
      "To prevent untested changes and test activities from affecting production systems, and to protect production data",
      "Because cloud providers require it by law",
      "So that developers can deploy directly to production more quickly"
    ],
    oz: [
      "為了降低軟體授權費用",
      "避免未經測試的變更與測試活動影響正式系統，並保護正式環境的資料",
      "因為雲端供應商在法律上強制要求",
      "讓開發人員可以更快速地直接部署到正式環境"
    ],
    a: 1,
    ez: "環境區隔的目的，是避免開發中的程式、測試操作或錯誤設定影響正在服務客戶的正式系統，並防止開發人員未經授權接觸正式資料。常見做法包括：使用不同的網段或帳號、開發人員對正式環境沒有寫入權限、程式只能經由核准的部署流程上線、正式環境不安裝開發工具。這也是職務區隔的具體展現。",
    ee: "Separating environments keeps code under development, test activity and misconfigurations from disrupting the systems serving customers, and keeps developers from reaching production data without authorization. Typical measures: separate networks or accounts, no write access to production for developers, deployment only through an approved pipeline, and no development tools on production systems. It is also an application of segregation of duties.",
    iso: ["8.31", "5.3"],
    tip: "小型組織人力有限，若開發與維運由同一人負責，應以日誌審查、主管核准等補償性控制降低風險。"
  },
  {
    id: "AI-46", src: "ai", cat: "dev", lv: 2,
    q: "A developer wants to copy production customer data into the test environment to make testing more realistic. What is the best practice?",
    qz: "開發人員想把正式環境的客戶資料複製到測試環境，讓測試更貼近真實。最佳做法是什麼？",
    o: [
      "Copy the data as-is, since the test environment is internal",
      "Email the data to the testers so they can load it themselves",
      "Use masked, anonymized or synthetic data, and if real data is unavoidable, obtain approval and apply production-equivalent controls",
      "Store the data in a public repository so everyone on the team can access it"
    ],
    oz: [
      "直接原樣複製，反正測試環境是內部的",
      "把資料用電子郵件寄給測試人員，讓他們自行匯入",
      "使用遮罩、匿名化或合成資料；若不得不使用真實資料，須經核准並套用與正式環境同等的控制",
      "把資料放在公開儲存庫，方便團隊所有人存取"
    ],
    a: 2,
    ez: "測試環境的防護通常比正式環境弱，存取的人也比較多；直接複製正式資料等於擴大個資外洩的風險，也可能違反個資「特定目的外利用」的限制。最佳做法是使用資料遮罩（如姓名「王○明」、身分證「A12345****」）、去識別化或以程式產生的合成資料。若確有必要使用真實資料，應經權責主管核准、留下紀錄、限制存取，並在測試完畢後確實刪除。",
    ee: "Test environments are usually less protected and accessed by more people, so copying production data widens exposure and may breach purpose limitation under privacy law. Use data masking, de-identification or synthetic data instead. If real data is truly necessary, get management approval, log it, restrict access to production-equivalent levels and delete it after testing.",
    iso: ["8.33", "8.11", "5.34"],
    tip: "A.8.11 資料遮蔽是 ISO 27001:2022 新增的控制措施，可以和 A.8.33 測試資訊一併檢視。"
  },
  {
    id: "AI-47", src: "ai", cat: "dev", lv: 2,
    q: "What is a Software Bill of Materials (SBOM) primarily used for?",
    qz: "軟體物料清單（SBOM）的主要用途是什麼？",
    o: [
      "A formal inventory of the components and dependencies in a piece of software, used to manage supply chain vulnerabilities and licenses",
      "A billing statement listing software license fees",
      "A user manual describing how to install the software",
      "A list of the developers who worked on the project"
    ],
    oz: [
      "正式列出軟體所包含的元件與相依套件的清單，用於管理供應鏈漏洞與授權",
      "列出軟體授權費用的帳單",
      "說明如何安裝軟體的使用手冊",
      "參與專案的開發人員名單"
    ],
    a: 0,
    ez: "SBOM 就像食品的成分標示，列出軟體用了哪些開源與商業元件、版本與授權。當 Log4Shell（CVE-2021-44228）這類重大漏洞爆發時，有 SBOM 的組織可以在幾分鐘內查出哪些系統受影響，沒有的組織往往要花上數週盤點。常見格式有 SPDX 與 CycloneDX；美國第 14028 號行政命令也推動供應聯邦政府的軟體提供 SBOM。",
    ee: "An SBOM is like an ingredients label: it lists the open-source and commercial components, versions and licenses inside software. When a critical flaw such as Log4Shell (CVE-2021-44228) appears, organizations with SBOMs can find affected systems in minutes while others spend weeks taking inventory. Common formats are SPDX and CycloneDX, and US Executive Order 14028 pushed for SBOMs in software sold to the federal government.",
    iso: ["5.21", "8.8", "5.9"],
    tip: ""
  },

  /* ── 資料庫與大數據 ───────────────────────────── */
  {
    id: "AI-48", src: "ai", cat: "db", lv: 1,
    q: "In relational databases, what does the 'A' in ACID stand for, ensuring that a transaction is either completed entirely or not executed at all?",
    qz: "在關聯式資料庫中，ACID 的「A」代表什麼？它確保一筆交易要嘛全部完成，要嘛完全不執行。",
    o: ["Availability", "Authorization", "Atomicity", "Accuracy"],
    oz: ["可用性（Availability）", "授權（Authorization）", "原子性（Atomicity）", "準確性（Accuracy）"],
    a: 2,
    ez: "ACID 是交易（Transaction）可靠性的四大特性：原子性（Atomicity，全有或全無）、一致性（Consistency，交易前後都符合規則）、隔離性（Isolation，同時進行的交易互不干擾）、持久性（Durability，提交後即使當機也不遺失）。以銀行轉帳為例：A 帳戶扣款與 B 帳戶入帳必須同時成功，若中途失敗就整筆回滾（Rollback），不能只扣不入。",
    ee: "ACID describes reliable transactions: Atomicity (all or nothing), Consistency (rules hold before and after), Isolation (concurrent transactions do not interfere) and Durability (committed data survives crashes). In a bank transfer, debiting A and crediting B must both succeed; if anything fails midway, the whole transaction rolls back.",
    iso: [],
    tip: "ACID 的一致性與資訊安全 CIA 的完整性（Integrity）觀念相通，都是確保資料正確、不被不當改變。"
  },
  {
    id: "AI-49", src: "ai", cat: "db", lv: 2,
    q: "According to the CAP theorem, when a network partition occurs, a distributed database must choose between which two properties?",
    qz: "根據 CAP 定理，當分散式資料庫發生網路分割（Partition）時，必須在哪兩項特性之間做取捨？",
    o: ["Confidentiality and Authentication", "Consistency and Availability", "Capacity and Performance", "Compression and Archiving"],
    oz: ["機密性與鑑別性", "一致性與可用性", "容量與效能", "壓縮與歸檔"],
    a: 1,
    ez: "CAP 定理指出，分散式系統無法同時完全滿足一致性（Consistency，所有節點看到相同資料）、可用性（Availability，每個請求都能得到回應）與分割容忍（Partition tolerance，網路中斷時系統仍能運作）。由於網路分割在分散式環境中無法避免，實務上就是在 C 與 A 之間取捨：銀行帳務系統偏向一致性（寧可暫停服務也不能算錯），社群網站的按讚數則偏向可用性（短暫不一致可以接受）。注意：CAP 的 C 與資訊安全 CIA 的 C（機密性）是不同的概念。",
    ee: "The CAP theorem says a distributed system cannot fully guarantee Consistency (every node sees the same data), Availability (every request gets a response) and Partition tolerance (keeps working when the network splits) at once. Partitions are unavoidable, so the real choice is between C and A: banking ledgers favor consistency, while social media like counts favor availability. The C in CAP is not the confidentiality in the CIA triad.",
    iso: [],
    tip: ""
  },
  {
    id: "AI-50", src: "ai", cat: "db", lv: 1,
    q: "What is the main purpose of database normalization?",
    qz: "資料庫正規化（Normalization）的主要目的是什麼？",
    o: [
      "To encrypt sensitive columns in the database",
      "To deliberately duplicate data for faster reporting",
      "To create daily backups of the database",
      "To reduce data redundancy and improve data integrity by organizing data into well-structured tables"
    ],
    oz: [
      "對資料庫中的敏感欄位加密",
      "刻意複製資料以加快報表產出",
      "每天建立資料庫備份",
      "透過將資料組織成結構良好的資料表，減少資料重複並提升資料完整性"
    ],
    a: 3,
    ez: "正規化把資料拆成多個結構清楚的資料表，以主鍵與外鍵建立關聯，讓每項事實只存在一個地方。例如客戶地址只存在客戶表，訂單表只存客戶編號；地址變更時只需修改一處，避免同一位客戶在不同表中出現不同地址（更新異常）。刻意複製資料以加速查詢是「反正規化」，常用於資料倉儲；加密與備份則是安全與可用性措施，與正規化無關。",
    ee: "Normalization splits data into well-structured tables linked by primary and foreign keys so each fact is stored once. A customer's address lives only in the customer table and orders store just the customer ID, so a change happens in one place and update anomalies disappear. Deliberate duplication for faster queries is denormalization, common in data warehouses. Encryption and backups are security and availability measures unrelated to normalization.",
    iso: [],
    tip: ""
  },
  {
    id: "AI-51", src: "ai", cat: "db", lv: 2,
    q: "Transparent Data Encryption (TDE) in a database primarily protects against which threat?",
    qz: "資料庫的透明資料加密（TDE）主要用來防範哪一種威脅？",
    o: [
      "SQL injection through the application",
      "Theft of database files or backup media (data at rest)",
      "Malicious queries run by an authorized DBA",
      "Eavesdropping on traffic between the application and the database"
    ],
    oz: [
      "透過應用程式發動的 SQL 隱碼攻擊",
      "資料庫檔案或備份媒體遭竊（靜態資料）",
      "具合法權限的 DBA 執行惡意查詢",
      "竊聽應用程式與資料庫之間的傳輸流量"
    ],
    a: 1,
    ez: "TDE 在資料寫入磁碟時自動加密、讀取時自動解密，對應用程式而言是「透明」的。它保護的是靜態資料：即使有人偷走硬碟、資料庫檔案或備份磁帶，沒有金鑰也讀不到內容。但對已通過驗證的連線，資料會自動解密，所以 TDE 擋不住 SQL 注入，也擋不住有權限的 DBA；傳輸中的資料則要靠 TLS 保護。常見的誤解是：「資料庫有加密」就代表所有威脅都處理了。",
    ee: "TDE encrypts data as it is written to disk and decrypts it on read, transparently to the application. It protects data at rest: stolen disks, database files or backup tapes are unreadable without the key. Authenticated connections see decrypted data, so TDE does not stop SQL injection or a privileged DBA, and data in transit needs TLS. 'The database is encrypted' does not mean every threat is covered.",
    iso: ["8.24"],
    tip: "稽核時若聽到「資料庫已加密」，請追問：加密的是哪一層？金鑰存放在哪裡、誰能存取？"
  },
  {
    id: "AI-52", src: "ai", cat: "db", lv: 1,
    q: "Big data is commonly characterized by the '3Vs'. Which set correctly identifies them?",
    qz: "大數據常以「3V」來描述其特性。下列哪一組正確？",
    o: ["Volume, Velocity, Variety", "Value, Vision, Validation", "Virtualization, VPN, VLAN", "Version, Vendor, Visibility"],
    oz: ["資料量（Volume）、速度（Velocity）、多樣性（Variety）", "價值、願景、驗證", "虛擬化、VPN、VLAN", "版本、供應商、可視性"],
    a: 0,
    ez: "大數據的 3V：Volume（資料量龐大，TB、PB 等級）、Velocity（產生與處理速度快，如即時感測資料、交易串流）、Variety（格式多樣，包含結構化表格、半結構化的 JSON、非結構化的影像與文字）。後來常再加上 Veracity（真實性，資料品質）與 Value（價值），合稱 5V。以台中的智慧工廠為例，每台機台每秒都在產生大量且多樣的感測資料，就是典型的大數據情境。",
    ee: "The 3Vs of big data are Volume (terabytes to petabytes), Velocity (data generated and processed fast, such as sensor or transaction streams) and Variety (structured tables, semi-structured JSON, unstructured images and text). Veracity (data quality) and Value are often added to make 5Vs. A smart factory where every machine emits varied sensor data every second is a typical big data scenario.",
    iso: [],
    tip: ""
  },
  {
    id: "AI-53", src: "ai", cat: "db", lv: 2,
    q: "What is the key difference between a data lake and a data warehouse?",
    qz: "資料湖（Data Lake）與資料倉儲（Data Warehouse）最主要的差異是什麼？",
    o: [
      "A data lake stores only structured data, while a data warehouse stores only video files",
      "A data lake stores raw data in its native format (structured, semi-structured or unstructured), while a data warehouse stores processed, structured data optimized for analysis and reporting",
      "They are identical terms used by different vendors",
      "A data lake is used only for backups, while a data warehouse is used only for transactions"
    ],
    oz: [
      "資料湖只存結構化資料，資料倉儲只存影片檔",
      "資料湖以原始格式存放各類資料（結構化、半結構化或非結構化），資料倉儲則存放經處理、結構化且為分析與報表最佳化的資料",
      "兩者是不同廠商對同一件事的稱呼",
      "資料湖只用於備份，資料倉儲只用於交易處理"
    ],
    a: 1,
    ez: "資料倉儲採「先定義結構再寫入（Schema-on-write）」，資料經 ETL 清理整合後才存入，適合商業智慧（BI）報表與固定分析；資料湖採「讀取時再定義結構（Schema-on-read）」，先把原始資料大量存進來，適合資料科學與機器學習探索。結合兩者優點的架構稱為 Lakehouse。從資安角度要注意：資料湖容易變成什麼都往裡丟的「資料沼澤」，個資混在其中卻沒人知道，因此資料盤點與分類分級格外重要。",
    ee: "A data warehouse is schema-on-write: data is cleaned and integrated through ETL before loading, suiting BI reports and fixed analysis. A data lake is schema-on-read: raw data lands first, suiting data science and ML exploration. A lakehouse combines both. From a security view, a lake can turn into a 'data swamp' where personal data hides unnoticed, so data inventory and classification are essential.",
    iso: ["5.12", "5.9"],
    tip: ""
  },
  {
    id: "AI-54", src: "ai", cat: "db", lv: 1,
    q: "In data integration, what does ETL stand for?",
    qz: "在資料整合領域中，ETL 代表什麼？",
    o: ["Encrypt, Transfer, Log", "Evaluate, Test, Launch", "Export, Translate, Link", "Extract, Transform, Load"],
    oz: ["加密、傳輸、記錄", "評估、測試、上線", "匯出、翻譯、連結", "擷取（Extract）、轉換（Transform）、載入（Load）"],
    a: 3,
    ez: "ETL 是資料整合的三個步驟：從來源系統擷取資料、依規則清洗與轉換格式（例如統一日期格式、去除重複、計算彙總），再載入目標系統（通常是資料倉儲）。標準題 STD-01 提到的 SSIS，就是微軟的 ETL 工具。雲端時代也常見 ELT：先載入資料湖或雲端資料倉儲，再利用其強大的運算能力進行轉換。ETL 過程中經常搬移大量個資，傳輸加密、存取控制與作業日誌都不能少。",
    ee: "ETL is three steps: extract data from source systems, transform it by rules (standardize dates, remove duplicates, compute aggregates) and load it into a target, usually a data warehouse. SSIS from question STD-01 is Microsoft's ETL tool. In the cloud, ELT is common: load into a lake or cloud warehouse first, then transform with its compute. ETL jobs move large amounts of personal data, so encryption in transit, access control and job logs are essential.",
    iso: ["5.14"],
    tip: ""
  },
  {
    id: "AI-55", src: "ai", cat: "db", lv: 2,
    q: "Which tool continuously monitors and audits database activity, including privileged user access, to detect suspicious queries in real time?",
    qz: "哪一種工具能持續監控與稽核資料庫活動（包括特權使用者的存取），即時偵測可疑的查詢？",
    o: ["Database Activity Monitoring (DAM)", "Content Delivery Network (CDN)", "Dynamic Host Configuration Protocol (DHCP)", "Redundant Array of Independent Disks (RAID)"],
    oz: ["資料庫活動監控（DAM）", "內容傳遞網路（CDN）", "動態主機設定協定（DHCP）", "磁碟陣列（RAID）"],
    a: 0,
    ez: "DAM 以網路側錄或資料庫主機代理程式的方式，記錄並分析每一筆 SQL 活動：誰、何時、從哪裡、執行了什麼查詢、存取了多少筆資料。它能偵測異常，例如 DBA 在半夜匯出整張客戶資料表、應用程式帳號突然從陌生 IP 連入，並產生 DBA 難以自行竄改的稽核軌跡，有助於落實職務區隔。CDN、DHCP、RAID 都與資料庫活動監控無關。",
    ee: "DAM records and analyzes every SQL activity through network sniffing or host agents: who, when, from where, which query and how many rows. It flags anomalies such as a DBA exporting the entire customer table at midnight or an application account connecting from an unfamiliar IP, and it keeps an audit trail the DBA cannot easily alter, supporting segregation of duties. CDN, DHCP and RAID are unrelated.",
    iso: ["8.15", "8.16"],
    tip: "存放大量個資的資料庫，稽核時可詢問：DBA 的操作由誰審查？審查頻率多久一次？紀錄在哪裡？"
  },
  {
    id: "AI-56", src: "ai", cat: "db", lv: 3,
    q: "Under the GDPR, how does pseudonymized data differ from anonymized data?",
    qz: "依據 GDPR，假名化資料與匿名化資料有何不同？",
    o: [
      "Pseudonymized data can still be re-identified with additional information kept separately, so it remains personal data; truly anonymized data cannot be re-identified and falls outside the GDPR's scope",
      "There is no difference; both terms mean the data is encrypted",
      "Anonymized data can be re-identified, while pseudonymized data never can",
      "Pseudonymization means encrypting data with a public key"
    ],
    oz: [
      "假名化資料搭配另外保存的額外資訊仍可重新識別，因此仍屬個人資料；真正匿名化的資料無法再識別，不在 GDPR 規範範圍內",
      "兩者沒有差別，都是指資料已經加密",
      "匿名化資料可以重新識別，假名化資料則永遠不能",
      "假名化是指以公開金鑰加密資料"
    ],
    a: 0,
    ez: "假名化（GDPR 第 4 條第 5 款）是以代號取代可直接識別的欄位（例如把姓名換成「客戶 A001」），但只要拿到另外保存的對照表就能還原，所以仍屬個人資料，只是降低了風險，是 GDPR 鼓勵的安全措施。匿名化（GDPR 前言第 26 點）則是以任何合理可能的方法都無法再識別個人，這時才不受 GDPR 規範。實務上真正的匿名化很難達成，多個欄位組合（郵遞區號＋生日＋性別）就可能識別出特定個人。台灣的個資法則使用「去識別化」的概念。",
    ee: "Pseudonymization (GDPR Article 4(5)) replaces direct identifiers with codes, such as a name becoming 'Customer A001', but anyone holding the separately stored mapping can reverse it, so the data stays personal data with reduced risk. Anonymization (Recital 26) means no one can re-identify the person by any means reasonably likely to be used, and only then does GDPR stop applying. True anonymization is hard: combining a postal code, birth date and gender can single someone out. Taiwan's PDPA uses the concept of de-identification.",
    iso: ["8.11", "5.34"],
    tip: "PIMS 輔導時常見的誤區：客戶以為資料「遮罩過」就不算個資了。請提醒：只要還能還原，就仍須依個資規範管理。"
  },

  /* ── IT 服務管理與維運 ───────────────────────────── */
  {
    id: "AI-57", src: "ai", cat: "itsm", lv: 1,
    q: "In ITIL, what is the main difference between incident management and problem management?",
    qz: "在 ITIL 中，事件管理（Incident Management）與問題管理（Problem Management）的主要差異是什麼？",
    o: [
      "Incident management restores normal service as quickly as possible, while problem management identifies and addresses the root cause of one or more incidents",
      "They are the same process with different names",
      "Problem management only handles password resets",
      "Incident management applies only to security breaches"
    ],
    oz: [
      "事件管理是盡快恢復正常服務，問題管理則是找出並處理一個或多個事件的根本原因",
      "兩者是名稱不同的同一個流程",
      "問題管理只處理密碼重設",
      "事件管理只適用於資安入侵事件"
    ],
    a: 0,
    ez: "事件管理的目標是「止血」：使用者無法列印、系統當機時，以最快速度恢復服務，即使只是暫時性的解決方法（Workaround），例如重新開機。問題管理的目標是「根治」：分析同類事件反覆發生的根本原因（例如某個驅動程式有缺陷），提出永久解決方案並透過變更管理實施，避免再次發生。已知原因但尚未根治的問題，會記錄為「已知錯誤（Known Error）」。在 ITIL 中，Incident 泛指所有非計畫性的服務中斷，不限於資安事件。",
    ee: "Incident management stops the bleeding: when a printer or system fails, restore service as fast as possible, even with a temporary workaround such as a reboot. Problem management finds the cure: analyze why similar incidents recur (for example, a faulty driver), design a permanent fix and implement it through change management. A problem with a known cause but no permanent fix yet is recorded as a known error. In ITIL, an incident is any unplanned service interruption, not only a security event.",
    iso: ["5.24", "5.27"],
    tip: "ISO 27001 也有「由資訊安全事故中學習（A.5.27）」，精神和問題管理的根本原因分析相同。"
  },
  {
    id: "AI-58", src: "ai", cat: "itsm", lv: 1,
    q: "Which document defines the agreed service levels, such as 99.9% availability and response times, between an IT service provider and its customer?",
    qz: "哪一份文件定義了 IT 服務提供者與客戶之間約定的服務水準，例如 99.9% 可用率與回應時間？",
    o: ["Service Level Agreement (SLA)", "Non-Disclosure Agreement (NDA)", "Memorandum of Understanding (MOU)", "Request for Comments (RFC)"],
    oz: ["服務水準協議（SLA）", "保密協議（NDA）", "合作備忘錄（MOU）", "網際網路技術文件（RFC）"],
    a: 0,
    ez: "SLA 是服務提供者與客戶之間的協議，明定可用率、事件回應與解決時間、支援時段、量測方式，以及未達標時的罰則或補償。內部單位之間的協議稱為 OLA（營運水準協議）；與外部供應商簽訂、用來支撐 SLA 的合約稱為 UC（支援合約）。NDA 規範保密義務；MOU 是合作意向；RFC 是網際網路技術標準文件（早期 ITIL 也以 RFC 代表變更請求）。",
    ee: "An SLA between a provider and its customer specifies availability, incident response and resolution times, support hours, how they are measured and the penalties or credits for missing them. An agreement between internal teams is an OLA, and a contract with an external supplier that underpins the SLA is an underpinning contract (UC). An NDA covers confidentiality, an MOU states intent to cooperate, and an RFC is an internet standards document (older ITIL also used RFC for a request for change).",
    iso: ["5.20", "5.22"],
    tip: "稽核委外服務時，除了看 SLA 內容，更要看「SLA 達成報告」，以及未達標時是否有檢討與追蹤。"
  },
  {
    id: "AI-59", src: "ai", cat: "itsm", lv: 2,
    q: "A service has an SLA of 99.9% monthly availability. Approximately how much downtime is allowed in a 30-day month?",
    qz: "某服務的 SLA 為每月 99.9% 可用率。以 30 天的月份計算，大約允許多少停機時間？",
    o: ["About 4.3 minutes", "About 43 minutes", "About 7.2 hours", "About 3 days"],
    oz: ["約 4.3 分鐘", "約 43 分鐘", "約 7.2 小時", "約 3 天"],
    a: 1,
    ez: "30 天 × 24 小時 × 60 分鐘 = 43,200 分鐘；不可用比例 0.1% × 43,200 = 43.2 分鐘。常見對照：99%（兩個 9）約 7.2 小時／月；99.9%（三個 9）約 43 分鐘／月；99.99%（四個 9）約 4.3 分鐘／月；99.999%（五個 9）每月不到 30 秒。每多一個 9，所需的備援架構與成本都會大幅增加，因此可用率目標應依營運衝擊分析（BIA）的結果來訂定。",
    ee: "30 days × 24 hours × 60 minutes = 43,200 minutes, and 0.1% of that is 43.2 minutes. Reference points: 99% is about 7.2 hours a month, 99.9% about 43 minutes, 99.99% about 4.3 minutes and 99.999% under 30 seconds. Each extra nine sharply raises the redundancy and cost required, so availability targets should come from a business impact analysis.",
    iso: ["8.14", "5.30"],
    tip: "稽核時可留意：SLA 的可用率是否排除了計畫性停機？量測點在伺服器端還是使用者端？定義不同，數字的意義就不同。"
  },
  {
    id: "AI-60", src: "ai", cat: "itsm", lv: 2,
    q: "In business continuity planning, what does the Recovery Point Objective (RPO) define?",
    qz: "在營運持續規劃中，復原點目標（RPO）定義的是什麼？",
    o: [
      "The maximum time allowed to restore a service after a disruption",
      "The number of backup copies that must be kept",
      "The maximum acceptable amount of data loss, measured as a period of time",
      "The physical location of the disaster recovery site"
    ],
    oz: [
      "中斷後恢復服務所允許的最長時間",
      "必須保留的備份份數",
      "可接受的最大資料遺失量，以時間長度表示",
      "災難復原站點的實體位置"
    ],
    a: 2,
    ez: "RPO 回答的是「最多能接受遺失多久的資料」：若 RPO 為 4 小時，備份或複寫至少每 4 小時要做一次，因為災難發生時，最多會遺失最後一次備份之後的資料。RTO（復原時間目標）回答的則是「多久內要恢復服務」。兩者都應由營運衝擊分析（BIA）決定，再據以設計備份頻率、異地備援與復原程序。RPO 愈小（例如即時同步複寫），成本愈高。",
    ee: "RPO answers how much data loss, measured in time, is acceptable. With a 4-hour RPO, backups or replication must run at least every 4 hours, because a disaster loses everything since the last copy. RTO answers how quickly service must be restored. Both should come from a business impact analysis and drive backup frequency, DR design and recovery procedures. A smaller RPO, such as synchronous replication, costs more.",
    iso: ["5.30", "8.13"],
    tip: "記憶法：RPO 看「過去」（資料回到哪個時間點），RTO 看「未來」（多久之後恢復運作）。"
  },
  {
    id: "AI-61", src: "ai", cat: "itsm", lv: 2,
    q: "Which backup strategy best protects an organization against ransomware?",
    qz: "下列哪一種備份策略，最能保護組織免於勒索軟體的威脅？",
    o: [
      "A single backup copy on a network share mapped to every user's computer",
      "Relying only on RAID for data protection",
      "Storing backups on the same server as the original data",
      "Following the 3-2-1 rule with at least one offline or immutable copy, and regularly testing restores"
    ],
    oz: [
      "在每位使用者電腦都有掛載的網路磁碟上保存一份備份",
      "只依賴 RAID 保護資料",
      "把備份放在與原始資料同一台伺服器上",
      "遵循 3-2-1 原則並保留至少一份離線或不可變更的備份，且定期進行還原測試"
    ],
    a: 3,
    ez: "勒索軟體會主動尋找並加密所有連得到的備份：掛載在使用者電腦上的網路磁碟、同一台伺服器上的備份都會一起被加密；RAID 只是即時鏡像，被加密的檔案也會同步寫入。3-2-1 原則是 3 份資料、2 種不同媒體、1 份存放異地；現在更建議 3-2-1-1-0：再加 1 份離線（Air-gapped）或不可變（Immutable）備份，並做到還原測試 0 錯誤。沒測試過還原的備份，不能算是可靠的備份。",
    ee: "Ransomware hunts for and encrypts every backup it can reach, including network shares mapped on user PCs and backups on the same server, and RAID mirrors encrypted files instantly. The 3-2-1 rule means three copies, two different media and one off-site. The modern 3-2-1-1-0 version adds one offline (air-gapped) or immutable copy and zero errors in restore tests. A backup that has never been test-restored cannot be trusted.",
    iso: ["8.13", "5.30"],
    tip: ""
  },
  {
    id: "AI-62", src: "ai", cat: "itsm", lv: 2,
    q: "A system administrator must apply a fix outside the normal change window to resolve a critical production outage. Under ITIL change management, what type of change is this?",
    qz: "系統管理者必須在正常變更時段之外套用修正，以解決正式環境的重大中斷。依 ITIL 變更管理，這屬於哪一種變更？",
    o: ["Standard change", "Normal change", "Emergency change", "Unauthorized change"],
    oz: ["標準變更（Standard Change）", "一般變更（Normal Change）", "緊急變更（Emergency Change）", "未經授權的變更"],
    a: 2,
    ez: "ITIL 將變更分為三類：標準變更是低風險、預先核准、有固定程序的例行變更（例如新增使用者帳號）；一般變更需經評估與變更諮詢委員會（CAB）核准後排程實施；緊急變更是為解決重大事件或迫切風險而必須立即實施的變更，由緊急變更諮詢委員會（ECAB）或授權人員快速核准。重點是：緊急不等於免流程，事後仍須補齊文件並進行實施後審查（PIR），否則就會變成未經授權的變更。",
    ee: "ITIL has three change types. Standard changes are low-risk, pre-approved routine tasks with a fixed procedure, such as creating a user account. Normal changes are assessed and approved by the Change Advisory Board (CAB) before scheduling. Emergency changes must be implemented immediately to resolve a major incident or urgent risk and are approved quickly by an emergency CAB (ECAB) or authorized person. Emergency does not mean no process: documentation and a post-implementation review are still required, or it becomes an unauthorized change.",
    iso: ["8.32"],
    tip: "若發現緊急變更的比例偏高，往往代表規劃不足或流程遭濫用，值得深入了解原因。"
  },
  {
    id: "AI-63", src: "ai", cat: "itsm", lv: 1,
    q: "A help desk analyst receives a call from someone claiming to be a senior executive who urgently needs a password reset while traveling. What should the analyst do?",
    qz: "服務台人員接到一通電話，對方自稱是出差中的高階主管，急著要求重設密碼。服務台人員應該怎麼做？",
    o: [
      "Reset the password immediately because the caller is a senior executive",
      "Read the new password aloud over the phone so the caller can log in quickly",
      "Send the new password to the personal email address the caller provides",
      "Verify the caller's identity through the established procedure, such as calling back a registered number or using MFA-verified self-service, before resetting"
    ],
    oz: [
      "對方是高階主管，所以立即重設密碼",
      "在電話中直接唸出新密碼，讓對方能快速登入",
      "把新密碼寄到對方提供的私人電子郵件信箱",
      "依既定程序驗證來電者身分（例如回撥公司登記的號碼，或使用經 MFA 驗證的自助服務），確認後才重設"
    ],
    a: 3,
    ez: "這是典型的語音釣魚（Vishing）社交工程：利用「高階主管」「緊急」「出差」製造權威感與時間壓力，迫使服務台跳過驗證。2023 年美國 MGM 度假村遭攻擊，就是駭客打電話給服務台冒充員工，騙取帳號存取權，造成大規模的營運中斷。正確做法是不論對方職位多高，一律依身分驗證程序處理；把密碼寄到私人信箱或在電話中告知，都可能直接把帳號交給攻擊者。",
    ee: "This is classic vishing: 'senior executive', 'urgent' and 'traveling' create authority and time pressure to make the help desk skip verification. In the 2023 MGM Resorts attack, criminals phoned the help desk posing as an employee to obtain account access, causing major disruption. Follow the identity verification procedure regardless of the caller's rank; sending a password to a personal mailbox or reading it out may hand the account to an attacker.",
    iso: ["5.17", "6.3"],
    tip: "可檢查服務台是否有書面的身分驗證程序，並以社交工程演練（例如模擬來電）驗證執行成效。"
  },
  {
    id: "AI-64", src: "ai", cat: "itsm", lv: 2,
    q: "Which ITSM component stores information about configuration items (CIs) and their relationships, supporting impact analysis for changes and incidents?",
    qz: "哪一個 ITSM 元件存放組態項目（CI）及其相互關係的資訊，以支援變更與事件的影響分析？",
    o: ["Customer Relationship Management (CRM) system", "Configuration Management Database (CMDB)", "Security Information and Event Management (SIEM)", "Enterprise Resource Planning (ERP) system"],
    oz: ["客戶關係管理（CRM）系統", "組態管理資料庫（CMDB）", "資安資訊與事件管理（SIEM）", "企業資源規劃（ERP）系統"],
    a: 1,
    ez: "CMDB 記錄伺服器、網路設備、應用系統、授權、文件等組態項目，以及它們之間的相依關係（例如「訂單系統」依賴「資料庫 A」，「資料庫 A」執行在「虛擬主機 B」上）。當要重新啟動虛擬主機 B 時，就能立刻知道會影響訂單系統與哪些使用者。CMDB 也是 ISMS 資產清冊的重要來源；但前提是資料正確且持續更新，過時的 CMDB 反而會誤導判斷。",
    ee: "A CMDB records configuration items such as servers, network devices, applications, licenses and documents, plus their dependencies (the order system depends on database A, which runs on virtual host B). Before rebooting host B, you immediately know the order system and its users are affected. The CMDB is also a key source for the ISMS asset inventory, but only if it is accurate and kept current; a stale CMDB misleads.",
    iso: ["5.9", "8.9"],
    tip: "稽核資產清冊時，可從現場隨機挑一台設備反查：它是否在清冊中？擁有者是否正確？"
  },
  {
    id: "AI-65", src: "ai", cat: "itsm", lv: 1,
    q: "Disk usage on a database server has grown steadily by about 5% per month and has now reached 85%. Which ITSM practice should proactively address this?",
    qz: "某資料庫伺服器的磁碟使用率每月穩定成長約 5%，目前已達 85%。應由哪一項 ITSM 實務主動處理此情況？",
    o: ["Capacity management", "Waiting for incident management once the disk is full", "Release management", "Service request management"],
    oz: ["容量管理", "等磁碟滿了再交給事件管理處理", "發布管理", "服務請求管理"],
    a: 0,
    ez: "容量管理負責監控資源使用趨勢並預測未來需求，在資源耗盡前就採取行動（擴充、清理、歸檔）。以每月成長 5% 推算，大約 3 個月後就會滿載，現在就應規劃擴充。如果等到磁碟滿了才處理，就會變成資料庫停擺的重大事件，影響可用性。ISO 27001:2022 的 A.8.6「容量管理」正是要求依需求監控並調整資源的使用。",
    ee: "Capacity management monitors usage trends and forecasts demand so action (expansion, cleanup, archiving) happens before resources run out. At 5% growth a month, the disk fills in about three months, so expansion should be planned now. Waiting until it is full turns this into a major outage. ISO 27001:2022 control A.8.6 Capacity management requires exactly this monitoring and adjustment.",
    iso: ["8.6"],
    tip: "日月潭的抽蓄發電就是一種容量管理：離峰時把水抽上去儲存，尖峰時放水發電，維持供電穩定。"
  },
  {
    id: "AI-66", src: "ai", cat: "itsm", lv: 1,
    q: "An organization is retiring old laptops that once stored confidential data. What is the most appropriate way to handle their storage drives?",
    qz: "某組織要淘汰曾存放機密資料的舊筆電，其儲存裝置最適當的處理方式是什麼？",
    o: [
      "Delete the files and empty the recycle bin",
      "Perform a quick format of the drive",
      "Sanitize the drives using an approved method such as NIST SP 800-88 (clear, purge or destroy) and keep disposal records",
      "Donate the laptops as they are to save time"
    ],
    oz: [
      "刪除檔案並清空資源回收筒",
      "對硬碟進行快速格式化",
      "依核定方法（如 NIST SP 800-88 的清除、清洗或銷毀）進行資料清除，並保留處理紀錄",
      "為了節省時間，原封不動地捐贈"
    ],
    a: 2,
    ez: "刪除檔案與快速格式化只是移除檔案索引，資料本身仍留在磁碟上，用免費的復原工具就能救回。NIST SP 800-88 定義三個層級：Clear（以覆寫等方式清除，可防一般復原工具）、Purge（以加密抹除、消磁或安全抹除指令處理，可防實驗室等級的復原）、Destroy（實體破壞，如粉碎、焚化）。SSD 因為有損耗平均機制，單純覆寫可能不完全，建議使用加密抹除或實體破壞。無論採用哪種方式，都要保留紀錄（資產編號、方式、日期、執行人與證明）。",
    ee: "Deleting files or quick formatting only removes the file index; the data remains and free tools can recover it. NIST SP 800-88 defines Clear (overwriting, defeats ordinary recovery tools), Purge (cryptographic erase, degaussing or secure erase commands, defeats lab recovery) and Destroy (shredding, incineration). SSD wear leveling makes simple overwriting unreliable, so prefer cryptographic erase or physical destruction. Whatever the method, keep records: asset ID, method, date, operator and certificate.",
    iso: ["7.14", "8.10"],
    tip: "委外銷毀時，應要求廠商提供銷毀證明，必要時派員到場見證。"
  },

  /* ── 資訊安全 ───────────────────────────── */
  {
    id: "AI-67", src: "ai", cat: "sec", lv: 1,
    q: "A ransomware attack encrypts a hospital's patient records and makes them unusable. Which principle of the CIA triad is most directly affected?",
    qz: "勒索軟體加密了醫院的病歷資料，導致無法使用。這最直接影響 CIA 三要素中的哪一項？",
    o: ["Confidentiality", "Availability", "Integrity", "Non-repudiation"],
    oz: ["機密性（Confidentiality）", "可用性（Availability）", "完整性（Integrity）", "不可否認性（Non-repudiation）"],
    a: 1,
    ez: "CIA 三要素：機密性（只有授權者能存取）、完整性（資料正確、未被不當竄改）、可用性（授權者需要時能及時使用）。病歷被加密而無法使用，最直接受損的是可用性；對醫院而言，這可能直接影響病人安全。補充：現代勒索軟體多採「雙重勒索」，加密前先竊取資料並威脅公開，因此機密性往往也同時受損。不可否認性則是確保行為者無法否認其行為，通常靠數位簽章達成。",
    ee: "The CIA triad: confidentiality (only authorized access), integrity (accurate, untampered data) and availability (usable when needed). Encrypted, unusable patient records hit availability most directly, and for a hospital that can affect patient safety. Modern ransomware often uses double extortion, stealing data before encrypting it, so confidentiality is frequently harmed too. Non-repudiation, usually achieved with digital signatures, ensures actors cannot deny their actions.",
    iso: ["5.29", "8.13"],
    tip: ""
  },
  {
    id: "AI-68", src: "ai", cat: "sec", lv: 1,
    q: "In ISO/IEC 27001 risk management, buying cyber insurance to cover potential losses from a data breach is an example of which risk treatment option?",
    qz: "在 ISO/IEC 27001 的風險管理中，購買資安保險以承擔資料外洩可能造成的損失，屬於哪一種風險處理方式？",
    o: ["Risk avoidance", "Risk modification (mitigation)", "Risk retention (acceptance)", "Risk sharing (transfer)"],
    oz: ["風險避免", "風險修改（降低）", "風險保留（接受）", "風險分擔（轉移）"],
    a: 3,
    ez: "ISO/IEC 27005 的四種風險處理選項：風險修改（以控制措施降低可能性或衝擊）、風險保留（在可接受範圍內決定承擔）、風險避免（停止或不進行會產生風險的活動）、風險分擔（將部分風險轉由第三方承擔，例如保險、委外）。購買保險屬於風險分擔，但要注意：保險轉移的是財務損失，「當責」與聲譽損害無法轉移，組織仍須對個資外洩負起法律責任。",
    ee: "ISO/IEC 27005 lists four treatment options: modification (controls that reduce likelihood or impact), retention (knowingly accepting a risk within tolerance), avoidance (stopping the risky activity) and sharing (passing part of the risk to a third party through insurance or outsourcing). Insurance is risk sharing, but it transfers financial loss only; accountability and reputational damage stay with the organization, which remains legally responsible for a breach.",
    iso: [],
    tip: "ISO 27001 條文 6.1.3 要求風險處理計畫須經風險擁有者核准並接受殘餘風險，稽核時記得確認核准紀錄。"
  },
  {
    id: "AI-69", src: "ai", cat: "sec", lv: 2,
    q: "An attacker who has stolen a user's password repeatedly triggers MFA push notifications until the frustrated user finally approves one. What is this attack called, and which countermeasure is most effective?",
    qz: "攻擊者取得使用者密碼後，不斷觸發 MFA 推播通知，直到不堪其擾的使用者按下核准。這種攻擊稱為什麼？最有效的對策是什麼？",
    o: [
      "Credential stuffing; add a CAPTCHA to the login page",
      "MFA fatigue (push bombing); use number matching or phishing-resistant MFA",
      "Pass-the-hash; disable NTLM authentication",
      "Brute force; require longer passwords"
    ],
    oz: [
      "撞庫攻擊；在登入頁面加上 CAPTCHA",
      "MFA 疲勞攻擊（推播轟炸）；採用數字比對或抗釣魚 MFA",
      "傳遞雜湊攻擊（Pass-the-Hash）；停用 NTLM 驗證",
      "暴力破解；要求更長的密碼"
    ],
    a: 1,
    ez: "MFA 疲勞攻擊（MFA Fatigue／Push Bombing）利用使用者的厭煩或誤觸，只要按一次「核准」，攻擊者就能登入。2022 年 Uber 遭入侵即使用此手法，攻擊者還透過通訊軟體冒充 IT 人員，要求受害者按下核准。對策：啟用數字比對（Number Matching，使用者必須輸入登入畫面上顯示的數字）、顯示登入地點等額外資訊、限制推播頻率，或直接改用 FIDO2／Passkey 等抗釣魚 MFA；並教育使用者：沒有自己登入卻收到通知時，應拒絕並立即通報。",
    ee: "MFA fatigue (push bombing) relies on annoyance or a mistaken tap: one approval lets the attacker in. The 2022 Uber breach used this technique, with the attacker also posing as IT support over a messaging app to urge approval. Countermeasures: number matching (the user types the number shown on the login screen), showing sign-in location and context, rate-limiting prompts, or moving to phishing-resistant MFA such as FIDO2/passkeys. Teach users to deny and report any prompt they did not trigger.",
    iso: ["8.5", "6.3"],
    tip: ""
  },
  {
    id: "AI-70", src: "ai", cat: "sec", lv: 1,
    q: "A newly published vulnerability has a CVSS v3 base score of 9.8. How should this generally be interpreted?",
    qz: "一個新公布的漏洞，其 CVSS v3 基本分數為 9.8。一般應如何解讀？",
    o: [
      "Low severity; it can wait for the next annual maintenance",
      "Medium severity; patch within the normal quarterly cycle",
      "High severity, but only relevant to cloud systems",
      "Critical severity; prioritize remediation, especially if the system is exposed or the flaw is being actively exploited"
    ],
    oz: [
      "低風險，可以等到下次年度維護再處理",
      "中度風險，依一般每季的週期修補即可",
      "高風險，但只與雲端系統有關",
      "重大（Critical）風險；應優先處理，特別是系統對外暴露或漏洞已遭實際利用時"
    ],
    a: 3,
    ez: "CVSS v3 分級：0.1–3.9 為低、4.0–6.9 為中、7.0–8.9 為高、9.0–10.0 為重大。9.8 通常代表可遠端利用、不需權限、不需使用者互動，且對機密性、完整性、可用性的衝擊都很高。但修補的優先順序不能只看分數，還應考量資產重要性、是否對外暴露，以及是否已遭實際利用（可參考美國 CISA 的 KEV 已知遭利用漏洞清單）。台灣的 TWCERT/CC 也會發布漏洞通報，可作為情資來源。",
    ee: "CVSS v3 ratings: 0.1–3.9 low, 4.0–6.9 medium, 7.0–8.9 high and 9.0–10.0 critical. A 9.8 usually means remotely exploitable with no privileges or user interaction and high impact on confidentiality, integrity and availability. Prioritization should also weigh asset criticality, exposure and active exploitation (see CISA's Known Exploited Vulnerabilities catalog). Taiwan's TWCERT/CC also publishes vulnerability advisories.",
    iso: ["8.8", "5.7"],
    tip: "建議在弱點管理程序中，依 CVSS 等級訂定修補時限（例如重大 7 天、高風險 30 天），並追蹤逾期項目。"
  }
);
