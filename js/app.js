/*
 * Allan'S IT知識測驗 — 單頁式應用（原生 JavaScript，無需建置）
 * 視圖以 location.hash 切換：home / profile / classic / quest / game / library / me / quiz / result
 * 所有學習資料只存在瀏覽器 localStorage（ait.*），不會傳到任何伺服器。
 */
(() => {
  'use strict';

  const D = window.AIT_DATA;
  const M = window.AIT_MAP;
  const PREVIEW = !!window.AIT_PREVIEW;
  const PASS = D.site.passScore;
  const LET = ['A', 'B', 'C', 'D'];
  const GAME_SEC = 45;

  /* ── helpers ───────────────────────────── */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const img = n => `assets/img/${n}.webp`;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pad = n => String(n).padStart(2, '0');
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const roc = d => `中華民國${d.getFullYear() - 1911}年${d.getMonth() + 1}月${d.getDate()}日`;
  const fmtDT = t => { const d = new Date(t); return `${ymd(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const fmtDur = s => (s >= 60 ? `${Math.floor(s / 60)} 分 ${s % 60} 秒` : `${s} 秒`);
  const hash36 = s => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36).toUpperCase().padStart(7, '0').slice(-7); };
  const maskEmail = e => { const [u, d] = String(e || '').split('@'); if (!d) return e || ''; return (u.length <= 2 ? u[0] + '*' : u.slice(0, 2) + '*'.repeat(Math.min(6, u.length - 2))) + '@' + d; };
  const scoreOf = (c, t) => (t ? Math.floor((c * 100) / t) : 0);
  const isPass = (c, t) => t > 0 && c * 100 >= t * PASS;
  const stars = lv => `<span class="stars" aria-label="難度 ${lv} / 3">${'★'.repeat(lv)}<em>${'★'.repeat(3 - lv)}</em></span>`;

  /* ── storage：可能被瀏覽器封鎖，全部包 try/catch ───────────────────────────── */
  const mem = {};
  const store = {
    get(k, f) { try { const v = localStorage.getItem('ait.' + k); if (v != null) return JSON.parse(v); } catch (e) { /* blocked */ } return k in mem ? mem[k] : f; },
    set(k, v) { mem[k] = v; try { localStorage.setItem('ait.' + k, JSON.stringify(v)); } catch (e) { /* blocked */ } },
    del(k) { delete mem[k]; try { localStorage.removeItem('ait.' + k); } catch (e) { /* blocked */ } }
  };

  /* ── indexes ───────────────────────────── */
  const CATS = D.categories;
  const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
  const QS = D.questions;
  const QB = Object.fromEntries(QS.map(q => [q.id, q]));
  const ROUTE = D.route;
  const idsBy = f => QS.filter(f).map(q => q.id);
  const countCat = (id, src) => QS.filter(q => q.cat === id && (!src || q.src === src)).length;
  const N_STD = QS.filter(q => q.src === 'std').length, N_AI = QS.length - N_STD, N_ALL = QS.length, N_ST = ROUTE.length;

  const S = {
    quiz: null, result: null, after: null, modal: null, timer: null, daily: null, certUrl: null, certNo: null,
    setup: { src: 'std', count: 20, cats: [], instant: true, shuffleQ: false, shuffleO: true, practice: false },
    gsetup: { src: 'all', count: 10, cats: [], practice: false },
    lib: { src: 'all', cats: [], q: '', wrong: false, open: {} },
    reviewFilter: 'all'
  };
  const profile = () => store.get('profile', null);
  const goalText = p => (p.goal === 'other' ? p.goalOther : p.goal) || '';
  const questProgress = () => store.get('quest', {});
  const stampCount = () => ROUTE.filter(id => questProgress()[id]?.passed).length;

  /* ── icons（stroke 用 currentColor）───────────────────────────── */
  const I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7M8 14l1.5 1.5L12 13M14 8h3M14 14h3"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6"/></svg>',
    lantern: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M9 4h6"/><ellipse cx="12" cy="12" rx="7" ry="7.5"/><path d="M12 4.5v15M8 6c-2 4-2 8 0 12M16 6c2 4 2 8 0 12M9 20h6M12 20v2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4z"/><path d="M12 5v16"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15A8 8 0 1 1 9 4a7 7 0 0 0 11 11z"/></svg>',
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
    arrow: '<svg viewBox="0 0 46 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h40M34 2l8 7-8 7"/></svg>'
  };
  /* 車站圖示（48×48） */
  const ICON = {
    net: '<path d="M24 3v6M19.5 9h9l-1.2 6h-6.6zM18.5 15h11l-1.2 6h-8.6zM17.5 21h13l-1.2 6H18.7zM16.5 27h15l-1.2 6H17.7zM15.5 33h17v4h-17zM12 37h24v7H12z"/>',
    os: '<rect x="11" y="5" width="26" height="38" rx="3"/><path d="M11 17.5h26M11 30.5h26M23 11h9M23 24h9M23 37h9"/><circle cx="17" cy="11" r="1.6"/><circle cx="17" cy="24" r="1.6"/><circle cx="17" cy="37" r="1.6"/>',
    dev: '<rect x="12" y="12" width="24" height="24" rx="3"/><path d="M18 12V6M24 12V6M30 12V6M18 42v-6M24 42v-6M30 42v-6M12 18H6M12 24H6M12 30H6M42 18h-6M42 24h-6M42 30h-6M21 20l-4 4 4 4M27 20l4 4-4 4"/>',
    db: '<ellipse cx="24" cy="10" rx="14" ry="5"/><path d="M10 10v27c0 2.8 6.3 5 14 5s14-2.2 14-5V10M10 19c0 2.8 6.3 5 14 5s14-2.2 14-5M10 28c0 2.8 6.3 5 14 5s14-2.2 14-5"/>',
    cloud: '<path d="M14 32h21a8 8 0 0 0 1-15.9A11 11 0 0 0 15 14.5 8.8 8.8 0 0 0 14 32z"/><path d="M17 38h14M17 43h14M24 32v11"/>',
    itsm: '<circle cx="16" cy="15" r="7"/><path d="M36 7a8 8 0 1 0 5 13 9 9 0 0 1-5-13z"/><path d="M4 31c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3M4 40c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3"/>',
    devops: '<path d="M5 31h38l-5 10H10z"/><path d="M10 21h9v10h-9zM19 21h9v10h-9zM28 21h9v10h-9zM14.5 11h9v10h-9zM23.5 11h9v10h-9z"/>',
    sec: '<path d="M3 43l13-20 7 9 7-10 15 21z"/><path d="M24 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M21.5 11l2 2 3.5-4"/>',
    ai: '<circle cx="9" cy="15" r="4"/><circle cx="9" cy="33" r="4"/><circle cx="24" cy="8" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="24" cy="40" r="4"/><circle cx="39" cy="24" r="4"/><path d="M12.5 13l8-3.5M13 16.5l7 5.5M12 18l9.5 18.5M12 30l9.5-18.5M13 31.5l7-5.5M12.5 35l8 3.5M27.5 10l8.5 11M28 24h7M27.5 38l8.5-11"/>'
  };
  const catIcon = id => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[id]}</svg>`;
  const trainSVG = '<svg class="train" viewBox="0 0 44 22" aria-hidden="true"><path d="M3 15h31c4.5 0 7-1.8 7-3.8C41 8 34.5 4 24.5 4H8C5 4 3 6 3 8.5z" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><path d="M8 7.5h12v3.5H8z" fill="currentColor"/><path d="M24 7.5c4.5 0 9 1.6 11.5 3.5H24z" fill="var(--teal)"/><path d="M3 18.5h38" stroke="var(--sun)" stroke-width="2.4" stroke-linecap="round"/></svg>';

  /* ── 角色台詞 ───────────────────────────── */
  const LINES = {
    ok: [['allan-laugh', '答對了！觀念很清楚。'], ['arale-thumb', '漂亮！這題稽核時很常遇到喔。'], ['arale-laugh', '太強了吧！繼續保持～'], ['allan-wink', '不錯喔，看得出你有做功課。']],
    bad: [['allan-confused', '沒關係，錯了才記得住。看一下解說吧。'], ['arale-cry', '嗚…差一點！我們一起看解說。'], ['allan-shocked', '這題陷阱不少，想想看為什麼。'], ['arale-confused', '咦？這題卡住了嗎？看看 Allan 顧問怎麼說。']],
    timeout: [['arale-surprised', '時間到！攤位老闆要收攤啦～下一題快一點喔。']],
    over: [['arale-cry', '珍奶喝完了！今天的夜市就逛到這裡，看看戰果吧。']]
  };
  const lineFor = (kind, id) => { const l = LINES[kind]; return l[parseInt(hash36(id), 36) % l.length]; };

  /* ── theme ───────────────────────────── */
  const THEME_NEXT = { system: 'light', light: 'dark', dark: 'system' };
  const THEME_LABEL = { system: '跟隨系統', light: '淺色', dark: '深色' };
  let theme = store.get('theme', 'system');
  function paintThemeBtn(t) {
    const b = $('#theme-btn'); if (!b) return;
    b.innerHTML = t === 'light' ? I.sun : t === 'dark' ? I.moon : I.auto;
    b.title = `配色：${THEME_LABEL[t]}（點擊切換）`; b.setAttribute('aria-label', b.title);
  }
  function applyTheme(t) {
    const r = document.documentElement;
    if (t === 'system') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
    paintThemeBtn(t);
  }
  /* 只有使用者明確選過才改 data-theme；預設尊重系統或宿主的設定 */
  if (theme !== 'system') applyTheme(theme);

  /* ── toast / modal ───────────────────────────── */
  let toastTimer = null;
  function toast(msg) {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2800);
  }
  function openModal(html, { wide = false, onClose = null } = {}) {
    closeModal(true);
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div>`;
    back.addEventListener('click', e => { if (e.target === back) closeModal(); });
    document.body.appendChild(back);
    S.modal = { el: back, onClose, prev: document.activeElement };
    const f = back.querySelector('[autofocus]') || back.querySelector('button, a[href], input');
    if (f) f.focus();
  }
  function closeModal(silent) {
    if (!S.modal) return;
    const { el, onClose, prev } = S.modal;
    S.modal = null; el.remove();
    if (!silent && onClose) onClose();
    if (prev && prev.focus && document.contains(prev)) prev.focus();
  }
  function confirmBox({ title, body, ok = '確定', cancel = '取消' }) {
    return new Promise(resolve => {
      openModal(`<div class="modal-head"><h2>${title}</h2></div><p class="muted">${body}</p>
        <div class="btn-row"><button class="btn btn-ink" data-act="m-ok" autofocus>${ok}</button><button class="btn btn-line" data-act="m-close">${cancel}</button></div>`,
        { onClose: () => resolve(false) });
      S.modal.resolve = resolve;
    });
  }

  /* ── 地圖 ───────────────────────────── */
  const proj = (lon, lat) => [(lon - M.proj.lon0) * M.proj.k * M.proj.s, (M.proj.lat0 - lat) * M.proj.s];
  const LABEL_SIDE = { net: 'r', os: 'l', dev: 'l', db: 'r', cloud: 'l', itsm: 'r', ai: 'r', devops: 'r', sec: 'r' };
  const LABEL_DY = { os: -12 };
  function smoothPath(pts) {
    if (pts.length < 2) return '';
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }
  function mapSVG({ interactive = false } = {}) {
    const qp = questProgress();
    const pts = ROUTE.map(id => proj(CAT[id].station.lon, CAT[id].station.lat));
    const firstOpen = ROUTE.findIndex(id => !qp[id]?.passed);
    const nDone = firstOpen === -1 ? ROUTE.length : firstOpen;
    const route = smoothPath(pts);
    const done = nDone > 1 ? smoothPath(pts.slice(0, nDone)) : '';
    const grid = [];
    for (let lon = 119.5; lon <= 122; lon += 0.5) { const x = proj(lon, 0)[0]; grid.push(`M${x.toFixed(1)},0V${M.h}`); }
    for (let lat = 22; lat <= 25.5; lat += 0.5) { const y = proj(0, lat)[1]; grid.push(`M0,${y.toFixed(1)}H${M.w}`); }
    const stations = ROUTE.map((id, i) => {
      const c = CAT[id], [x, y] = pts[i], side = LABEL_SIDE[id];
      const st = qp[id]?.passed ? 'done' : i === nDone ? 'next' : i > nDone ? 'locked' : '';
      const tx = side === 'r' ? 20 : -20, anchor = side === 'r' ? 'start' : 'end';
      const act = interactive ? `data-act="station" data-id="${id}" role="button" tabindex="0" aria-label="第 ${i + 1} 站 ${c.station.label}：${c.zh}"` : '';
      return `<g class="m-st ${st}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" ${act}>
        ${st === 'next' ? '<circle class="pulse" r="13"/>' : ''}<circle class="ring" r="13"/><text class="n">${i + 1}</text>
        <text class="city" x="${tx}" y="${-1 + (LABEL_DY[id] || 0)}" text-anchor="${anchor}">${c.station.label}</text>
        <text class="sub" x="${tx}" y="${17 + (LABEL_DY[id] || 0)}" text-anchor="${anchor}">${c.short}</text></g>`;
    }).join('');
    const ty = M.tropic;
    return `<svg viewBox="${M.viewBox}" role="${interactive ? 'group' : 'img'}" aria-label="台灣科技環島路線圖：${ROUTE.map(id => CAT[id].station.label).join('、')}">
      <defs><linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--map-land)"/><stop offset="1" stop-color="var(--map-land-2)"/></linearGradient></defs>
      <rect class="m-sea" width="${M.w}" height="${M.h}"/>
      <path class="m-grid" d="${grid.join('')}"/>
      <path class="m-land" d="${M.island}"/>
      <path class="m-isle" d="${M.penghu}"/>
      ${M.islets.map(([x, y, r]) => `<circle class="m-isle" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
      <text class="m-label" x="${(proj(119.72, 0)[0] + 6).toFixed(0)}" y="${(proj(0, 23.6)[1] + 4).toFixed(0)}">澎湖</text>
      <text class="m-label" x="${(proj(121.49, 0)[0] + 9).toFixed(0)}" y="${(proj(0, 22.66)[1] + 5).toFixed(0)}">綠島</text>
      <text class="m-label" x="${(proj(121.55, 0)[0] + 11).toFixed(0)}" y="${(proj(0, 22.05)[1] + 5).toFixed(0)}">蘭嶼</text>
      <path class="m-ridge" d="${M.ridge}"/>
      <text class="m-label" transform="translate(${(proj(121.3, 0)[0]).toFixed(0)} ${(proj(0, 24.62)[1]).toFixed(0)}) rotate(-75)">中央山脈</text>
      <line class="m-tropic" x1="0" x2="${M.w}" y1="${ty}" y2="${ty}"/>
      <text class="m-label" x="12" y="${ty - 8}">北回歸線 23.4°N</text>
      <text class="m-label-en" x="12" y="${ty + 16}">TROPIC OF CANCER</text>
      <path class="m-route" d="${route}"/><path class="m-route-ties" d="${route}"/>
      ${done ? `<path class="m-route-done" d="${done}"/>` : ''}
      ${stations}
    </svg>`;
  }

  /* ── 紀念章 ───────────────────────────── */
  let stampSeq = 0;
  function stampSVG(id, { inked = true, date = '', size = 120, cls = '' } = {}) {
    const c = CAT[id], st = c.station, uid = `sp${++stampSeq}`;
    const ink = inked ? c.ink : 'rgba(29,36,51,.28)';
    const bottom = inked ? (date || 'ALLAN\'S IT') : '尚未蓋章';
    return `<svg class="stamp-svg ${cls}" viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="${esc(st.label)}站紀念章${inked ? '' : '（尚未取得）'}">
      <defs><path id="${uid}" d="M22,62 a38,38 0 1,1 76,0"/></defs>
      <g transform="rotate(-8 60 60)" style="color:${ink}" fill="none" stroke="currentColor"${inked ? '' : ' stroke-dasharray="4 4"'}>
        <circle cx="60" cy="60" r="55" stroke-width="3.2"/>
        <circle cx="60" cy="60" r="47" stroke-width="1.2"${inked ? ' stroke-dasharray="2.5 2.5"' : ''}/>
        <text fill="currentColor" stroke="none" font-size="11" font-weight="700" letter-spacing="1" style="font-family:var(--f-body)"><textPath href="#${uid}" startOffset="50%" text-anchor="middle">${esc(st.label)}站・${esc(c.short)}</textPath></text>
        <g transform="translate(43 42) scale(.72)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${ICON[id]}</g>
        <text x="60" y="93" fill="currentColor" stroke="none" text-anchor="middle" font-size="9.5" font-weight="600" letter-spacing="1" style="font-family:var(--f-tech)">${esc(bottom)}</text>
      </g></svg>`;
  }

  /* ── 夜市燈籠 ───────────────────────────── */
  function lanternsHTML() {
    const chars = ['資', '安', '夜', '市', '開', '張', '囉', '！'];
    const cols = ['#ff5b4d', '#ffcb47', '#ff5b4d', '#ff8a3d'];
    const one = (ch, i) => `<svg viewBox="0 0 30 ${44 + (i % 2) * 12}" width="30" height="${44 + (i % 2) * 12}" aria-hidden="true">
      <path d="M15 0v${8 + (i % 2) * 12}" stroke="#8d7bc4" stroke-width="1.5"/>
      <g transform="translate(0 ${(i % 2) * 12})"><rect x="9" y="7" width="12" height="4" rx="1" fill="#ffcb47"/>
      <ellipse cx="15" cy="23" rx="13" ry="13" fill="${cols[i % 4]}"/><path d="M15 10v26M8 12c-3 7-3 15 0 22M22 12c3 7 3 15 0 22" stroke="rgb(0 0 0 / .18)" fill="none"/>
      <text x="15" y="27.5" text-anchor="middle" font-size="12" font-weight="700" fill="#3a0d08" style="font-family:var(--f-body)">${ch}</text>
      <rect x="9" y="35" width="12" height="3" rx="1" fill="#ffcb47"/></g></svg>`;
    return `<div class="lanterns" aria-hidden="true"><div class="string">${chars.map(one).join('')}</div></div>`;
  }

  /* ── 共用片段 ───────────────────────────── */
  const catChip = id => `<span class="chip chip-cat" style="--cc:var(--c-${id})">${esc(CAT[id].zh)}</span>`;
  const srcChip = q => `<span class="chip">${q.src === 'std' ? `標準 ${N_STD} 題` : 'AI 生成題'}</span>`;
  const isoChip = c => `<span class="chip"><b>A.${c}</b>&nbsp;${esc(D.iso[c][0])}・${esc(D.iso[c][1])}</span>`;
  const initial = name => { const s = String(name || '').trim(); return s ? s[0].toUpperCase() : '?'; };

  function expHTML(q, perm, pick, { showQ = true } = {}) {
    const ci = perm.indexOf(q.a);
    const zhOpts = perm.map((oi, di) => {
      const tag = oi === q.a ? '（正確答案）' : di === pick ? '（你的答案）' : '';
      return `<li class="${oi === q.a ? 'ans' : ''} ${di === pick ? 'mine' : ''}"><b>${LET[di]}</b><span>${esc(q.oz[oi])}${tag}</span></li>`;
    }).join('');
    return `<div class="exp">
      ${showQ ? `<div class="exp-block"><b>題目中文翻譯</b><p>${esc(q.qz)}</p><ul class="exp-zh-opts">${zhOpts}</ul></div>` : ''}
      <div class="exp-block"><b>正確答案 Answer</b><p><strong>${LET[ci]}. ${esc(q.o[q.a])}</strong><br><span class="muted">${esc(q.oz[q.a])}</span></p></div>
      <div class="exp-block"><b>Allan 顧問解說</b><p>${esc(q.ez)}</p></div>
      <div class="exp-block"><b>English Explanation</b><p class="en-text" lang="en">${esc(q.ee)}</p></div>
      ${q.iso.length ? `<div class="exp-block"><b>ISO/IEC 27001:2022 附錄 A 對應</b><div class="iso-list">${q.iso.map(isoChip).join('')}</div></div>` : ''}
      ${q.tip ? `<div class="tip"><img src="${img('allan-point')}" alt=""><div><b>Allan 顧問稽核小叮嚀</b><p>${esc(q.tip)}</p></div></div>` : ''}
    </div>`;
  }

  function ticketHTML(p, live = false) {
    const goal = p ? goalText(p) : '';
    const no = p ? `AIT-${hash36((p.name || '') + (p.email || ''))}` : 'AIT-0000000';
    return `<div class="ticket" ${live ? 'id="ticket-live"' : ''}>
      <div class="main">
        <div class="t-head"><b>環島車票</b><span>IT ISLAND PASS</span></div>
        <div class="route">
          <div><small>From 起站</small><strong>今天的我</strong></div>${I.arrow}
          <div class="to"><small>To 迄站</small><strong>${esc(goal || '我的目標')}</strong></div>
        </div>
        <dl>
          <div><dt>Passenger 乘客</dt><dd>${esc(p?.name || '—')}</dd></div>
          <div><dt>Identity 職稱／身分</dt><dd>${esc(p?.title || '—')}</dd></div>
          <div><dt>Company 公司／學校</dt><dd>${esc(p?.company || '—')}</dd></div>
          <div><dt>Email</dt><dd>${esc(p?.email ? maskEmail(p.email) : '—')}</dd></div>
        </dl>
        <div class="code">${no}・台北101 → 玉山・${N_ST} STOPS</div>
      </div>
      <div class="stub"><b>ADMIT ONE</b><div class="barcode" aria-hidden="true"></div></div>
    </div>`;
  }

  function trackHTML(z) {
    const n = z.items.length, cur = z.idx + 1, pct = n > 1 ? z.idx / (n - 1) : 1;
    let ends = ['南港', '左營'];
    if (z.cfg.station) { const i = ROUTE.indexOf(z.cfg.station); ends = [i > 0 ? CAT[ROUTE[i - 1]].station.label : '出發', CAT[z.cfg.station].station.label]; }
    return `<div class="track" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${cur}" aria-label="作答進度">
      <span class="count">${cur} / ${n}</span><div class="rail"></div>
      <div class="fill" style="width:calc((100% - 44px) * ${pct.toFixed(4)})"></div>
      <div style="position:absolute;inset:0;left:calc(22px + (100% - 44px) * ${pct.toFixed(4)})">${trainSVG}</div>
      <div class="ends"><span>${esc(ends[0])}</span><span>${esc(ends[1])}</span></div></div>`;
  }

  /* ── 視圖 ───────────────────────────── */
  const VIEWS = {};
  const AFTER = {};

  VIEWS.home = () => {
    const p = profile(), n = stampCount();
    return `<div class="wrap page">
      <section class="hero">
        <div class="hero-copy">
          <h1><span class="en">IT Fundamentals Quest for ISMS Professionals</span>Allan'S<br>IT知識測驗</h1>
          <p class="lead">用測驗引導學習。${N_ALL} 題中英雙語題庫、${N_ST} 大 IT 知識領域，從台北101出發，一站一站環島闖關，最後登上玉山。</p>
          <div class="hero-stats">
            <div><b>${N_ALL}</b><span>雙語題庫（標準 ${N_STD}＋AI ${N_AI}）</span></div>
            <div><b>${N_ST}</b><span>知識領域・${N_ST} 個車站</span></div>
            <div><b>≥${PASS}</b><span>分才算通過</span></div>
          </div>
          <div class="btn-row">
            ${p ? '<a class="btn btn-ink" href="#quest">繼續環島旅程</a>' : '<a class="btn btn-ink" href="#profile">領取環島車票</a>'}
            <a class="btn btn-line" href="#practice">免登記練習</a>
          </div>
          <p class="small muted">${p ? `歡迎回來，${esc(p.name)}。目前已蓋 ${n} / ${N_ST} 枚車站紀念章。` : '不想填資料也沒關係：選「免登記練習」，直接作答、看解說，只是不會產生通過證明。'}</p>
        </div>
        <div class="hero-map">${mapSVG()}<img class="allan" src="${img('allan-full')}" alt="Allan顧問">
          <div class="legend"><b>Route 環島路線</b><span>台北101 → 玉山，共 ${N_ST} 站</span></div></div>
      </section>

      <section class="panel daily" id="daily">${dailyHTML()}</section>

      <section class="section" aria-labelledby="h-aud">
        <div class="section-head"><div><p class="eyebrow">Who it's for</p><h2 id="h-aud">適合這些學習者</h2></div></div>
        <div class="aud">${D.audiences.map(a => `<div><span class="en">${esc(a.en)}</span><b>${esc(a.zh)}</b><p>${esc(a.note)}</p></div>`).join('')}</div>
      </section>

      <section aria-labelledby="h-modes">
        <div class="section-head"><div><p class="eyebrow">Choose your way</p><h2 id="h-modes">選一種方式開始</h2></div></div>
        <div class="modes">
          <a class="mode" href="#classic"><span class="tag">Classic</span><div><h3>經典測驗</h3><p>傳統一題一題作答，可選即時解說或交卷後檢討，也能免登記練習。</p></div><span class="go">開始 →</span><img src="${img('allan-point')}" alt=""></a>
          <a class="mode" href="#quest"><span class="tag">Island Quest</span><div><h3>環島闖關</h3><p>${N_ST} 個車站對應 ${N_ST} 大領域，每站 ≥${PASS} 分才能蓋章前進。</p></div><span class="go">出發 →</span><img src="${img('arale-present')}" alt=""></a>
          <a class="mode mode-night" href="#game"><span class="tag">Night Market</span><div><h3>夜市搶答</h3><p>限時搶答、珍奶生命值、連續答對加分，邊玩邊學。</p></div><span class="go">開吃 →</span><img src="${img('arale-cheer')}" alt=""></a>
          <a class="mode" href="#library"><span class="tag">Library</span><div><h3>知識圖書館</h3><p>${N_ALL} 題完整解說與 ISO 27001 對應，還有你的錯題本。</p></div><span class="go">翻閱 →</span><img src="${img('allan-think')}" alt=""></a>
        </div>
      </section>

      <section aria-labelledby="h-cats">
        <div class="section-head"><div><p class="eyebrow">${N_ST} Domains · ${N_ST} Stations</p><h2 id="h-cats">${N_ST} 大知識領域</h2></div><p class="small muted">點選任一領域，直接進行類別測驗。</p></div>
        <div class="cats">${ROUTE.map((id, i) => { const c = CAT[id]; return `<button class="cat" style="--cc:var(--c-${id})" data-act="cat-setup" data-id="${id}"><span class="ico">${catIcon(id)}</span><span><span class="en">${i + 1}. ${esc(c.en)}</span><b>${esc(c.zh)}</b><span>${esc(c.station.label)}站・${countCat(id)} 題（標準 ${countCat(id, 'std')}／AI ${countCat(id, 'ai')}）</span></span></button>`; }).join('')}</div>
      </section>

      <section aria-labelledby="h-crew">
        <div class="section-head"><div><p class="eyebrow">Your guides</p><h2 id="h-crew">講師與 AI 小助理</h2></div></div>
        <div class="crew">
          <article><img src="${img('allan-full')}" alt="Allan顧問"><div class="txt"><span class="role">Instructor 講師</span><h3>Allan顧問</h3><p>ISMS／PIMS 輔導顧問，兼任驗證機構稽核員，專長資訊安全與企業 MIS 管理。每題解說附上 ISO/IEC 27001:2022 對應控制措施與稽核小叮嚀。</p></div></article>
          <article><img src="${img('arale-wave')}" alt="AI 小助理阿拉蕾"><div class="txt"><span class="role">AI Assistant AI 小助理</span><h3>阿拉蕾</h3><p>英文題目看不懂？按下「題目中文說明」，阿拉蕾幫你翻成專業的繁體中文。答對答錯，她都會陪你一起看解說。</p></div></article>
        </div>
      </section>
    </div>`;
  };

  function dailyHTML() {
    const today = ymd(new Date());
    if (!S.daily || S.daily.day !== today) S.daily = { day: today, id: QS[parseInt(hash36('daily' + today), 36) % QS.length].id, pick: null, zh: false };
    const d = S.daily, q = QB[d.id], answered = d.pick !== null;
    const opts = q.o.map((t, i) => {
      const cls = answered ? (i === q.a ? 'is-ok' : i === d.pick ? 'is-bad' : '') : '';
      const mark = answered ? (i === q.a ? '✓ 正確答案' : i === d.pick ? '✗ 你的答案' : '') : '';
      return `<button class="opt ${cls}" data-act="d-pick" data-i="${i}" ${answered ? 'disabled' : ''}><span class="k">${LET[i]}</span><span class="t" lang="en">${esc(t)}${d.zh ? `<small lang="zh-Hant">${esc(q.oz[i])}</small>` : ''}</span><span class="mark">${mark}</span></button>`;
    }).join('');
    return `<img class="arale" src="${img(answered ? (d.pick === q.a ? 'arale-thumb' : 'arale-cry') : 'arale-tablet')}" alt="阿拉蕾">
      <div class="daily-q">
        <div class="qmeta"><span class="eyebrow">Daily Question・今日一題 ${today}</span></div>
        <div class="qmeta"><span class="chip chip-id">${q.id}</span>${catChip(q.cat)}${stars(q.lv)}</div>
        <p class="qtext" lang="en">${esc(q.q)}</p>
        <button class="zh-toggle" data-act="d-zh" aria-pressed="${d.zh}"><img src="${img('arale-explain')}" alt="">題目中文說明</button>
        ${d.zh ? `<p class="qzh">${esc(q.qz)}</p>` : ''}
        <div class="opts">${opts}</div>
        ${answered ? `<div class="exp-block"><b>${d.pick === q.a ? '答對了！' : '再想想看'}・Allan 顧問解說</b><p>${esc(q.ez)}</p></div>
          <div class="btn-row"><button class="btn btn-line btn-sm" data-act="lib-goto" data-id="${q.id}">到知識圖書館看完整解說</button><a class="btn btn-ink btn-sm" href="${profile() ? '#classic' : '#practice'}">${profile() ? '挑戰更多題 →' : '免登記練習更多題 →'}</a></div>` : ''}
      </div>`;
  }

  /* profile / ticket */
  VIEWS.profile = () => {
    const p = profile() || {}, goals = D.goals, g = p.goal || '';
    const titles = ['甲方 ISMS 從業人員', 'ISMS 資安顧問', 'ISMS 稽核員', '資訊人員（MIS／IT）', '資安長／資安主管', '學生', '其他'];
    return `<div class="wrap page">
      <div class="page-head"><p class="eyebrow">Your ticket</p><h1>${profile() ? '修改我的環島車票' : '領取環島車票'}</h1>
        <p class="muted">填寫基本資料後就能開始測驗。通過測驗時，這些資料會印在你的通過證明上。</p></div>
      <div class="ticket-layout">
        <form class="panel" id="pf" novalidate>
          <div class="form-grid">
            <div class="field full"><label for="pf-company">公司／學校名稱</label><input class="input" id="pf-company" name="company" autocomplete="organization" value="${esc(p.company)}" placeholder="例如：台灣科技股份有限公司"><span class="err" id="e-company"></span></div>
            <div class="field"><label for="pf-title">職稱／身分</label><input class="input" id="pf-title" name="title" list="pf-titles" value="${esc(p.title)}" placeholder="可直接輸入或選擇"><datalist id="pf-titles">${titles.map(t => `<option value="${t}">`).join('')}</datalist><span class="err" id="e-title"></span></div>
            <div class="field"><label for="pf-name">姓名</label><input class="input" id="pf-name" name="name" autocomplete="name" value="${esc(p.name)}" placeholder="會顯示在通過證明上"><span class="err" id="e-name"></span></div>
            <div class="field full"><label for="pf-email">Email</label><input class="input" id="pf-email" name="email" type="email" autocomplete="email" inputmode="email" value="${esc(p.email)}" placeholder="name@example.com"><span class="err" id="e-email"></span></div>
            <div class="field full"><span class="label" id="goal-label">我的目標</span>
              <div class="goal-picks" role="group" aria-labelledby="goal-label">
                ${goals.map(x => `<button type="button" class="pick" data-act="goal" data-v="${esc(x)}" aria-pressed="${g === x}">成為${esc(x)}</button>`).join('')}
                <button type="button" class="pick" data-act="goal" data-v="other" aria-pressed="${g === 'other'}">其他（自行輸入）</button>
              </div>
              <input class="input" id="pf-goal-other" name="goalOther" value="${esc(p.goalOther)}" placeholder="例如：通過 ISO 27001 主導稽核員考試" ${g === 'other' ? '' : 'hidden'} aria-label="自行輸入我的目標">
              <span class="err" id="e-goal"></span>
            </div>
            <div class="field full">
              <div class="notice"><b>個人資料蒐集告知</b>
                <span>依《個人資料保護法》第 8 條告知：本網站蒐集您的姓名、Email、公司／學校、職稱／身分與學習目標，目的為產生個人學習紀錄與通過證明（特定目的：一〇九 教育或訓練行政）。資料只儲存在您目前使用的瀏覽器中，不會傳送到任何伺服器；您可隨時在「我的學習」頁面查閱、修改或刪除。若不提供，將無法產生具名的通過證明。</span>
              </div>
              <label class="check"><input type="checkbox" id="pf-consent" ${p.name ? 'checked' : ''}><span>我已閱讀上述告知，同意本網站於本機瀏覽器中保存我的資料。</span></label>
              <span class="err" id="e-consent"></span>
            </div>
          </div>
          <div class="btn-row" style="margin-top:20px"><button class="btn btn-ink" type="submit">${profile() ? '更新車票' : '開立車票，出發！'}</button><a class="btn btn-text" href="#home">先逛逛</a></div>
        </form>
        <div style="display:grid;gap:16px"><div id="ticket-wrap">${ticketHTML(p.name ? p : null, true)}</div>
          <p class="small muted">車票上的 Email 會自動遮蔽部分字元，截圖分享時也不會洩漏完整個資。</p></div>
      </div></div>`;
  };
  AFTER.profile = () => {
    const f = $('#pf');
    const read = () => {
      const goal = $('.goal-picks [aria-pressed="true"]')?.dataset.v || '';
      return { company: f.company.value.trim(), title: f.title.value.trim(), name: f.name.value.trim(), email: f.email.value.trim(), goal, goalOther: f.goalOther.value.trim() };
    };
    const live = () => { const v = read(); $('#ticket-wrap').innerHTML = ticketHTML(v.name || v.company || v.goal ? v : null, true); };
    f.addEventListener('input', live);
    f.addEventListener('click', e => { if (e.target.closest('[data-act="goal"]')) setTimeout(live); });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const v = read(); let bad = null;
      const err = (k, m) => { $('#e-' + k).textContent = m; if (m && !bad) bad = k; };
      err('company', v.company ? '' : '請填寫公司或學校名稱');
      err('title', v.title ? '' : '請填寫職稱或身分');
      err('name', v.name ? '' : '請填寫姓名');
      err('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) ? '' : '請填寫有效的 Email，例如 name@example.com');
      err('goal', !v.goal ? '請選擇一個目標' : v.goal === 'other' && !v.goalOther ? '請輸入你的目標' : '');
      err('consent', $('#pf-consent').checked ? '' : '請勾選同意，才能在本機保存資料');
      ['company', 'title', 'name', 'email'].forEach(k => f[k].setAttribute('aria-invalid', $('#e-' + k).textContent ? 'true' : 'false'));
      if (bad) { const el = bad === 'goal' ? $('.goal-picks .pick') : bad === 'consent' ? $('#pf-consent') : f[bad]; el && el.focus(); return; }
      const old = profile();
      store.set('profile', { ...v, at: old?.at || Date.now(), updated: Date.now() });
      toast(old ? '車票已更新' : `車票開立完成，${v.name}，出發吧！`);
      const next = S.after; S.after = null;
      if (typeof next === 'function') next(); else go(next || 'home');
    });
  };

  function requireProfile(next) {
    if (profile()) return true;
    S.after = next; toast('請先領取環島車票（填寫基本資料）'); go('profile');
    return false;
  }

  /* 練習模式：免車票、不蒐集個人資料、不產生證明 */
  const practiceLabel = l => ({ zh: `練習模式・${l.zh}`, en: `Practice · ${l.en}` });
  const catLabel = id => ({ zh: `類別測驗：${CAT[id].zh}`, en: `Category Test: ${CAT[id].en}` });
  function asPractice(cfg) {
    if (cfg.practice) return cfg;
    const base = cfg.station ? catLabel(cfg.station) : cfg.label;
    return { ...cfg, mode: cfg.mode === 'quest' ? 'classic' : cfg.mode, station: null, practice: true, cert: false, label: practiceLabel(base) };
  }
  function modeSwitch(on, act, night) {
    return `<div class="src-grid" role="group" aria-label="測驗類型">
      <button class="src" data-act="${act}" data-v="0" aria-pressed="${!on}"><span class="k">Certified test</span><b>正式測驗</b><span>需領取環島車票（填寫基本資料），≥${PASS} 分產生通過證明</span></button>
      <button class="src" data-act="${act}" data-v="1" aria-pressed="${on}"><span class="k">Practice only</span><b>練習模式（免登記）</b><span>不需車票、不填任何個人資料，只練習與學習，不產生證明</span></button>
    </div>${on ? `<p class="small ${night ? '' : 'muted'}" style="margin-top:10px">練習模式的成績不會存入學習紀錄；只有答錯的題目會記入這台裝置的錯題本，方便之後複習。</p>` : ''}`;
  }
  function askTicket(cfg) {
    S.pending = cfg;
    const quest = cfg.mode === 'quest';
    openModal(`<div class="modal-head"><h2>要先領取環島車票嗎？</h2><button class="icon-btn x" data-act="m-close" aria-label="關閉">${I.close}</button></div>
      <p class="muted">正式測驗需要填寫基本資料，通過（≥${PASS} 分）後才能產生印有你名字的通過證明${quest ? '，並在車站蓋紀念章' : ''}。如果只想練習，可以改用練習模式，不需填寫任何資料${quest ? '（練習不會蓋章）' : ''}。</p>
      <div class="btn-row"><button class="btn btn-ink" data-act="m-ticket" autofocus>領取車票，正式測驗</button><button class="btn btn-line" data-act="m-practice">改用練習模式（免登記）</button></div>`);
  }

  /* classic setup */
  const SRC_INFO = {
    std: [`Standard ${N_STD}`, `標準 ${N_STD} 題`, '「IS 專業 30 題」英文原題，附專業中文翻譯'],
    ai: [`AI Generated ${N_AI}`, `AI 生成 ${N_AI} 題`, `依 ${N_ST} 大類補足 IT 基本功與 AI 治理的情境題`],
    random: ['Random', '隨機出題', `從 ${N_ALL} 題中隨機抽題，每次都不一樣`],
    cat: ['By Category', '依類別出題', '選擇一個或多個知識領域']
  };
  function setupIds(s) {
    if (s.src === 'std') return idsBy(q => q.src === 'std');
    if (s.src === 'ai') return idsBy(q => q.src === 'ai');
    if (s.src === 'random') return shuffle(QS.map(q => q.id)).slice(0, s.count);
    if (s.src === 'all') return QS.map(q => q.id);
    return idsBy(q => s.cats.includes(q.cat));
  }
  function setupCount(s) {
    if (s.src === 'std') return N_STD;
    if (s.src === 'ai') return N_AI;
    if (s.src === 'random') return s.count;
    return QS.filter(q => s.cats.includes(q.cat)).length;
  }
  function setupLabel(s, n) {
    if (s.src === 'std') return { zh: `標準 ${N_STD} 題測驗`, en: `Standard ${N_STD}-Question Test` };
    if (s.src === 'ai') return { zh: `AI 生成 ${N_AI} 題測驗`, en: `AI-Generated ${N_AI}-Question Test` };
    if (s.src === 'random') return { zh: `隨機 ${n} 題測驗`, en: `Random ${n}-Question Test` };
    const cs = ROUTE.filter(id => s.cats.includes(id));
    return { zh: `類別測驗：${cs.map(id => CAT[id].zh).join('、')}`, en: `Category Test: ${cs.map(id => CAT[id].en).join(', ')}` };
  }
  function catPicks(sel, act) {
    return `<div class="seg" role="group" aria-label="選擇類別">${ROUTE.map(id => `<button type="button" data-act="${act}" data-id="${id}" aria-pressed="${sel.includes(id)}">${esc(CAT[id].zh)}<span class="muted small">&nbsp;${countCat(id)}</span></button>`).join('')}</div>`;
  }
  VIEWS.classic = () => {
    const s = S.setup, n = setupCount(s);
    return `<div class="wrap page">
      <div class="page-head"><p class="eyebrow">Classic Mode</p><h1>經典測驗</h1><p class="muted">一題一題作答。題目以英文呈現，隨時可按「題目中文說明」看專業中文翻譯；解說與檢討都有中英文。不想填資料的話，選「練習模式」就能直接開始。</p></div>
      <div class="setup">
        <div class="panel">
          <h3>測驗類型</h3>
          <div style="margin-top:12px">${modeSwitch(s.practice, 'set-practice')}</div>
          <div class="opt-block"><h3>選擇題庫</h3></div>
          <div class="src-grid" style="margin-top:12px">${Object.entries(SRC_INFO).map(([k, [en, zh, d]]) => `<button class="src" data-act="set-src" data-v="${k}" aria-pressed="${s.src === k}"><span class="k">${en}</span><b>${zh}</b><span>${d}</span></button>`).join('')}</div>
          ${s.src === 'random' ? `<div class="opt-block"><h3>題數</h3><div class="seg">${[10, 20, 30, 50, 100].map(c => `<button data-act="set-count" data-v="${c}" aria-pressed="${s.count === c}">${c} 題</button>`).join('')}</div></div>` : ''}
          ${s.src === 'cat' ? `<div class="opt-block"><h3>選擇類別（可複選）</h3>${catPicks(s.cats, 'set-cat')}</div>` : ''}
          <div class="opt-block"><h3>作答方式</h3>
            <div class="seg"><button data-act="set-instant" data-v="1" aria-pressed="${s.instant}">即時解說（學習模式）</button><button data-act="set-instant" data-v="0" aria-pressed="${!s.instant}">交卷後檢討（考試模式）</button></div>
            <p class="small muted">${s.instant ? '每答一題就立刻看到對錯、中文翻譯與 Allan 顧問的解說。' : '全部作答完再交卷，交卷後逐題檢討；作答中可以前後翻頁、修改答案。'}</p>
          </div>
          <div class="opt-block">
            ${s.src !== 'random' ? `<label class="switch"><input type="checkbox" id="sw-q" data-act="set-shq" ${s.shuffleQ ? 'checked' : ''}>打亂題目順序</label>` : ''}
            <label class="switch"><input type="checkbox" id="sw-o" data-act="set-sho" ${s.shuffleO ? 'checked' : ''}>選項順序隨機排列（避免背答案位置）</label>
          </div>
        </div>
        <aside class="panel summary-card">
          <p class="eyebrow">${s.practice ? 'Practice 本次練習' : 'This test 本次測驗'}</p>
          <div><span class="big">${n}</span> <span class="muted">題</span></div>
          <ul><li>題庫：${esc(SRC_INFO[s.src][1])}${s.src === 'cat' && s.cats.length ? `（${s.cats.map(id => CAT[id].short).join('、')}）` : ''}</li><li>作答方式：${s.instant ? '即時解說' : '交卷後檢討'}</li><li>預估時間：約 ${Math.max(5, Math.round(n * 1.2))} 分鐘</li></ul>
          ${s.practice ? '<div class="rule practice"><b>免登記</b><span>不需車票、不填個人資料，也不產生通過證明。</span></div>' : `<div class="rule"><b>≥${PASS}</b><span>分才通過，通過後產生含測驗日期的通過證明。</span></div>`}
          <button class="btn btn-ink" data-act="start-classic" ${n ? '' : 'disabled'}>${!n ? '請先選擇類別' : s.practice ? '開始練習' : '開始測驗'}</button>
          ${s.practice || profile() ? '' : '<p class="small muted">正式測驗需要先領取環島車票（填寫基本資料），通過證明才印得出你的名字。</p>'}
        </aside>
      </div></div>`;
  };

  /* quest */
  VIEWS.quest = () => {
    const qp = questProgress(), n = stampCount(), first = ROUTE.findIndex(id => !qp[id]?.passed);
    const grand = store.get('grand', null);
    return `<div class="wrap page">
      <div class="page-head"><p class="eyebrow">Island Quest</p><h1>台灣科技環島</h1><p class="muted">${N_ST} 個車站對應 ${N_ST} 大知識領域。每一站都要答對 ${PASS}% 以上（≥${PASS} 分）才能蓋紀念章、解鎖下一站。從台北101出發，最後登上玉山！</p></div>
      <div class="progress-line"><span>已蓋章 <b class="num">${n}</b> / ${N_ST}</span><div class="pl"><i style="width:${(n / N_ST) * 100}%"></i></div><span>${n === N_ST ? '環島完成！' : `下一站：${CAT[ROUTE[first]].station.label}`}</span></div>
      <div class="quest">
        <div class="quest-map">${mapSVG({ interactive: true })}<img class="arale" src="${img('arale-wave')}" alt=""></div>
        <div style="display:grid;gap:16px">
          ${n === N_ST ? `<div class="panel" style="display:grid;gap:10px"><p class="eyebrow">All ${N_ST} stops</p><h2 style="font:400 26px/1.25 var(--f-display)">恭喜完成台灣科技環島！</h2><p class="muted">你已通過全部 ${N_ST} 個車站，從網路、系統一路到資安高峰。</p><div class="btn-row">${grand ? `<button class="btn btn-sun" data-act="cert" data-no="${grand}">查看環島制霸證明</button>` : ''}</div></div>` : ''}
          <div class="stations">${ROUTE.map((id, i) => {
            const c = CAT[id], r = qp[id] || {}, locked = !r.passed && i > (first === -1 ? N_ST : first);
            return `<button class="station" style="--cc:var(--c-${id})" data-act="station" data-id="${id}" ${locked ? 'aria-disabled="true"' : ''}>
              ${stampSVG(id, { inked: !!r.passed, date: r.at ? ymd(new Date(r.at)) : '', size: 76, cls: 'stamp-sm' })}
              <span><b>${i + 1}. ${esc(c.station.label)}</b><span>${esc(c.zh)}・${countCat(id)} 題</span></span>
              <span class="st-score">${r.passed ? `<b>${r.best}</b><br>已蓋章` : locked ? '🔒 未解鎖' : r.best != null ? `最佳 ${r.best}<br>再挑戰` : '可出發'}</span></button>`;
          }).join('')}</div>
        </div>
      </div></div>`;
  };
  function stationModal(id) {
    const qp = questProgress(), i = ROUTE.indexOf(id), first = ROUTE.findIndex(x => !qp[x]?.passed);
    if (!qp[id]?.passed && i > (first === -1 ? N_ST : first)) { toast(`完成上一站「${CAT[ROUTE[i - 1]].station.label}」後，才能解鎖這一站喔！`); return; }
    const c = CAT[id], st = c.station, r = qp[id] || {};
    openModal(`<div class="modal-head"><p class="eyebrow">Stop ${i + 1} / ${N_ST} · ${esc(st.en)}</p><button class="icon-btn x" data-act="m-close" aria-label="關閉">${I.close}</button></div>
      <div class="st-intro" style="--cc:var(--c-${id})">
        ${stampSVG(id, { inked: !!r.passed, date: r.at ? ymd(new Date(r.at)) : '', size: 160, cls: 'stamp-lg' })}
        <div class="txt"><h2>${i + 1}. ${esc(st.label)}</h2><div class="qmeta">${catChip(id)}<span class="chip">${countCat(id)} 題（標準 ${countCat(id, 'std')}／AI ${countCat(id, 'ai')}）</span>${r.best != null ? `<span class="chip">最佳成績 ${r.best}</span>` : ''}</div>
          <p class="story">${esc(st.story)}</p><p class="link">${esc(st.link)}</p>
          <p class="small muted">本站採即時解說模式，答對 ${PASS}% 以上即可蓋章並取得本站通過證明。</p>
          <div class="btn-row"><button class="btn btn-ink" data-act="start-station" data-id="${id}" autofocus>出發！開始本站測驗</button><button class="btn btn-line" data-act="practice-station" data-id="${id}">免登記練習本站（不蓋章）</button><button class="btn btn-text" data-act="lib-cat" data-id="${id}">先到圖書館複習</button></div></div>
      </div>`, { wide: true });
  }

  /* night market game */
  VIEWS.game = () => {
    const s = S.gsetup, best = store.get('gameBest', 0);
    const pool = s.src === 'cat' ? QS.filter(q => s.cats.includes(q.cat)).length : s.src === 'std' ? N_STD : s.src === 'ai' ? N_AI : N_ALL;
    const n = Math.min(s.count, pool);
    const src = { all: [`All ${N_ALL}`, `全部 ${N_ALL} 題`], std: [`Standard ${N_STD}`, `標準 ${N_STD} 題`], ai: [`AI ${N_AI}`, `AI 生成 ${N_AI} 題`], cat: ['By Category', '依類別'] };
    return `<div class="nm">${lanternsHTML()}<div class="wrap"><div class="nm-wrap">
      <div class="nm-intro"><div style="display:grid;gap:12px"><p class="eyebrow">Night Market Challenge</p><h1>資安夜市搶答</h1>
        <p class="muted">每題 ${GAME_SEC} 秒限時作答，你有 3 杯珍奶生命值，答錯或超時就少一杯。答對可以換夜市小吃，連續答對還有加分。正式挑戰的正確率達 ${PASS}% 以上，一樣可以拿到通過證明；只想玩玩看，就選練習模式。</p>
        <p class="small">最高分紀錄：<b class="num" style="color:var(--nm-gold)">${best}</b> 分</p></div>
        <img src="${img('arale-cheer')}" alt="阿拉蕾"></div>
      <div class="panel">
        <h3>挑戰類型</h3>
        <div style="margin-top:12px">${modeSwitch(s.practice, 'g-practice', true)}</div>
        <div class="opt-block"><h3>選擇攤位（題庫）</h3></div>
        <div class="src-grid" style="margin-top:12px">${Object.entries(src).map(([k, [en, zh]]) => `<button class="src" data-act="g-src" data-v="${k}" aria-pressed="${s.src === k}"><span class="k">${en}</span><b>${zh}</b></button>`).join('')}</div>
        ${s.src === 'cat' ? `<div class="opt-block"><h3>選擇類別（可複選）</h3>${catPicks(s.cats, 'g-cat')}</div>` : ''}
        <div class="opt-block"><h3>題數</h3><div class="seg">${[10, 20, 30].map(c => `<button data-act="g-count" data-v="${c}" aria-pressed="${s.count === c}">${c} 題</button>`).join('')}</div>
          ${pool < s.count ? `<p class="small muted">此題庫只有 ${pool} 題，將全部出題。</p>` : ''}</div>
        <div class="btn-row" style="margin-top:20px"><button class="btn btn-sun" data-act="start-game" ${n ? '' : 'disabled'}>${!n ? '請先選擇類別' : s.practice ? `開吃！練習 ${n} 題` : `開吃！挑戰 ${n} 題`}</button></div>
      </div></div></div></div>`;
  };

  /* quiz */
  VIEWS.quiz = () => {
    const z = S.quiz;
    if (z.cfg.mode === 'game') {
      return `<div class="nm">${lanternsHTML()}<div class="wrap"><div class="nm-wrap">
        <div class="quiz-top"><div class="title">${esc(z.cfg.label.zh)}<small>${esc(z.cfg.label.en)}</small></div><span class="spacer"></span>
          <button class="icon-btn" data-act="sound" aria-label="音效開關" style="background:transparent;border-color:var(--nm-line);color:var(--nm-text)">${store.get('sound', true) ? I.sound : I.mute}</button>
          <button class="btn btn-line btn-sm" data-act="quit">離開</button></div>
        <div id="qbody"></div></div></div></div>`;
    }
    return `<div class="wrap"><div class="quiz">
      <div class="quiz-top"><div class="title">${esc(z.cfg.label.zh)}<small>${esc(z.cfg.label.en)}${z.cfg.instant ? '・即時解說' : '・考試模式'}${z.cfg.practice ? '・免登記' : ''}</small></div><span class="spacer"></span><button class="btn btn-line btn-sm" data-act="quit">離開測驗</button></div>
      <div id="qtrack"></div><div id="qbody"></div></div></div>`;
  };
  AFTER.quiz = () => { renderQ(); if (S.quiz.game && S.quiz.items[S.quiz.idx].pick === null) startTimer(); };

  function hudHTML(z) {
    const g = z.game;
    return `<div class="hud">
      <div class="lives" aria-label="剩下 ${g.lives} 杯珍奶">${[0, 1, 2].map(i => `<span class="${i < g.lives ? '' : 'gone'}">🧋</span>`).join('')}</div>
      <div class="mid"><div class="row"><span>第 <b class="num">${z.idx + 1}</b> / ${z.items.length} 攤</span><span id="tleft" class="num">${Math.ceil(g.left)} 秒</span></div>
        <div class="timebar ${g.left <= 10 ? 'low' : ''}" id="tbar"><i style="transform:scaleX(${(g.left / GAME_SEC).toFixed(3)})"></i></div>
        <div class="row"><span class="combo">${g.combo >= 2 ? `${g.combo} 連擊！` : '&nbsp;'}</span><span>小吃 ${g.snacks.length} 份</span></div></div>
      <div class="pts"><b class="num">${g.pts}</b><span>分</span></div></div>
      <div class="tray" aria-label="已換到的小吃">${g.snacks.map(([e, n]) => `<span>${e} ${n}</span>`).join('')}</div>`;
  }
  function renderQ() {
    const z = S.quiz; if (!z) return;
    const it = z.items[z.idx], q = QB[it.id];
    const locked = z.cfg.instant || !!z.game;
    const answered = it.pick !== null;
    const reveal = locked && answered;
    const ci = it.perm.indexOf(q.a);
    const opts = it.perm.map((oi, di) => {
      let cls = '', mark = '';
      if (reveal) { if (di === ci) { cls = 'is-ok'; mark = '✓ 正確答案'; } else if (di === it.pick) { cls = 'is-bad'; mark = '✗ 你的答案'; } }
      return `<button class="opt ${cls}" data-act="pick" data-i="${di}" aria-pressed="${!reveal && it.pick === di}" ${reveal ? 'disabled' : ''}>
        <span class="k">${LET[di]}</span><span class="t" lang="en">${esc(q.o[oi])}${it.zh ? `<small lang="zh-Hant">${esc(q.oz[oi])}</small>` : ''}</span><span class="mark">${mark}</span></button>`;
    }).join('');
    const exam = !locked;
    const last = z.idx === z.items.length - 1;
    const nav = exam ? `<div class="quiz-nav">
        <button class="btn btn-line" data-act="prev" ${z.idx === 0 ? 'disabled' : ''}>← 上一題</button>
        <span class="small muted">已作答 ${z.items.filter(x => x.pick !== null).length} / ${z.items.length}</span>
        ${last ? '<button class="btn btn-ink" data-act="submit">交卷</button>' : '<button class="btn btn-ink" data-act="next">下一題 →</button>'}
      </div>
      <details class="panel" style="padding:14px 18px"><summary style="cursor:pointer;font-weight:700">題號導覽</summary><div class="palette" style="margin-top:12px">${z.items.map((x, i) => `<button data-act="jump" data-i="${i}" class="${x.pick !== null ? 'done' : ''} ${i === z.idx ? 'cur' : ''}" aria-label="第 ${i + 1} 題${x.pick !== null ? '（已作答）' : ''}">${i + 1}</button>`).join('')}</div></details>` : '';
    const hint = `<p class="kbd-hint">鍵盤快捷鍵：<kbd>1</kbd>–<kbd>4</kbd> 或 <kbd>A</kbd>–<kbd>D</kbd> 選答、<kbd>Z</kbd> 中文說明、<kbd>Enter</kbd> ${exam ? '下一題' : '下一題（作答後）'}</p>`;
    $('#qbody').innerHTML = `${z.game ? hudHTML(z) : ''}
      <article class="qcard" aria-labelledby="qtext">
        <div class="qmeta"><span class="chip chip-id">${q.id}</span>${catChip(q.cat)}${srcChip(q)}${stars(q.lv)}</div>
        <p class="qtext" id="qtext" lang="en">${esc(q.q)}</p>
        <button class="zh-toggle" data-act="zh" aria-pressed="${it.zh}"><img src="${img('arale-explain')}" alt="">題目中文說明</button>
        ${it.zh ? `<p class="qzh" lang="zh-Hant">${esc(q.qz)}</p>` : ''}
        <div class="opts" role="group" aria-label="選項">${opts}</div>
        ${hint}
      </article>
      ${reveal ? feedbackHTML(z, it, q) : ''}${nav}`;
    const tr = $('#qtrack'); if (tr) tr.innerHTML = trackHTML(z);
  }
  function feedbackHTML(z, it, q) {
    const over = z.game && z.game.over;
    const kind = over ? 'over' : it.pick === -1 ? 'timeout' : it.ok ? 'ok' : 'bad';
    const [face, line] = lineFor(kind, it.id);
    const title = it.ok ? '答對了！' : it.pick === -1 ? '時間到！' : '可惜，答錯了';
    const last = z.idx === z.items.length - 1 || over;
    const label = z.game ? (last ? '看看戰果' : '下一攤 →') : last ? '看成績' : '下一題 →';
    return `<section class="feedback ${it.ok ? 'ok' : 'bad'}" id="fb" aria-live="polite">
      <div class="fb-head"><img src="${img(face)}" alt=""><div><h3>${title}</h3><p>${line}</p></div></div>
      <div class="fb-body">${expHTML(q, it.perm, it.pick)}<div class="btn-row"><button class="btn ${z.game ? 'btn-sun' : 'btn-ink'}" data-act="next" id="next-btn">${label}</button></div></div></section>`;
  }

  /* result */
  VIEWS.result = () => {
    const r = S.result, total = r.total;
    const byCat = {};
    r.items.forEach(i => { const c = QB[i.id].cat; byCat[c] = byCat[c] || [0, 0]; byCat[c][1]++; if (i.ok) byCat[c][0]++; });
    const C = 2 * Math.PI * 92, off = C * (1 - r.score / 100);
    const pass = r.pass;
    const chars = pass ? `<img src="${img('allan-laugh')}" alt=""><img src="${img('arale-cheer')}" alt="">` : `<img src="${img('allan-think')}" alt=""><img src="${img('arale-confused')}" alt="">`;
    const stamp = r.station && pass ? `<div class="${r.newStamp ? 'stamp-in' : ''}">${stampSVG(r.station, { inked: true, date: ymd(new Date(r.at)), size: 180 })}</div>` : chars;
    const wrong = r.items.filter(i => !i.ok);
    const g = r.game;
    let msg;
    if (pass) msg = r.station ? `恭喜蓋章！「${CAT[r.station].station.label}」站順利通過。` : '恭喜通過！你的 IT 基本功很扎實。';
    else msg = `通過門檻是 ${PASS} 分，還差 ${PASS - r.score} 分。看看下面的檢討，再挑戰一次！`;
    if (g && g.over && !pass) msg = `珍奶喝完了！共完成 ${r.items.filter(i => i.pick !== null).length} 攤。${msg}`;
    const back = r.mode === 'quest' ? '<a class="btn btn-line" href="#quest">回到環島地圖</a>' : r.mode === 'game' ? '<a class="btn btn-line" href="#game">回到夜市</a>' : '<a class="btn btn-line" href="#classic">換一份題目</a>';
    const reviewItems = (S.reviewFilter === 'wrong' ? r.items.filter(i => !i.ok) : r.items);
    return `<div class="wrap page">
      <section class="panel result-hero">
        <div class="score-ring" aria-label="得分 ${r.score} 分"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" fill="none" stroke="var(--line-2)" stroke-width="14"/><circle cx="100" cy="100" r="92" fill="none" stroke="${pass ? 'var(--ok)' : 'var(--bad)'}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
          <div class="v"><b>${r.score}</b><span>/ 100 分</span></div></div>
        <div style="display:grid;gap:14px;min-width:0">
          <p class="eyebrow">${esc(r.label.en)}</p>
          <h1>${esc(r.label.zh)}</h1>
          <div><span class="verdict ${pass ? 'pass' : 'fail'}">${pass ? '✓ 通過' : '✗ 未通過'}（門檻 ≥${PASS} 分）</span></div>
          <p class="muted">${msg}</p>
          <div class="stat-row">
            <div><b>${r.correct} / ${total}</b><span>答對題數</span></div>
            <div><b>${fmtDur(r.dur)}</b><span>作答時間</span></div>
            ${g ? `<div><b>${g.pts}</b><span>夜市積分${g.best ? '（新紀錄！）' : ''}</span></div><div><b>${g.maxCombo}</b><span>最高連擊</span></div>` : ''}
          </div>
          <div class="btn-row">
            ${r.cert ? `<button class="btn btn-sun" data-act="cert" data-no="${r.cert}">查看通過證明</button>` : ''}
            ${r.grand ? `<button class="btn btn-sun" data-act="cert" data-no="${r.grand}">環島制霸證明</button>` : ''}
            ${wrong.length ? `<button class="btn btn-ink" data-act="retry-wrong">錯題重練（${wrong.length} 題）</button>` : ''}
            <button class="btn btn-line" data-act="retry">再挑戰一次</button>${back}
          </div>
          ${g && g.snacks.length ? `<div style="display:grid;gap:6px"><span class="small muted">夜市戰利品</span><div class="tray" style="--nm-bg-2:var(--surface-2);--nm-line:var(--line)">${g.snacks.map(([e, n]) => `<span>${e} ${n}</span>`).join('')}</div></div>` : ''}
          ${r.practice ? `<div class="rule practice"><b>練習</b><span>練習模式不產生通過證明，成績也不會存入學習紀錄。${pass ? '這個成績已經達到門檻，' : ''}想取得證明，${profile() ? '改用正式測驗挑戰即可。' : '領取環島車票後改用正式測驗挑戰。'}</span></div>
            <div class="btn-row">${profile() ? '<button class="btn btn-line btn-sm" data-act="to-formal">改用正式測驗</button>' : '<a class="btn btn-line btn-sm" href="#profile">領取環島車票</a>'}</div>` : ''}
        </div>
        <div class="chars">${stamp}</div>
      </section>

      <section class="panel" aria-labelledby="h-bars"><div class="section-head"><h2 id="h-bars" style="font-size:22px">各領域表現</h2></div>
        <div class="bars" style="margin-top:14px">${ROUTE.filter(id => byCat[id]).map(id => { const [c, t] = byCat[id], p = Math.round((c / t) * 100); return `<div class="bar" style="--cc:var(--c-${id})"><span>${esc(CAT[id].zh)}</span><div class="track2"><i style="width:${p}%"></i></div><span class="pct">${c}/${t}・${p}%</span></div>`; }).join('')}</div>
      </section>

      <section aria-labelledby="h-review" style="display:grid;gap:14px">
        <div class="section-head"><div><p class="eyebrow">Review 檢討</p><h2 id="h-review">逐題檢討</h2></div>
          <div class="seg"><button data-act="rv-filter" data-v="all" aria-pressed="${S.reviewFilter === 'all'}">全部 ${total}</button><button data-act="rv-filter" data-v="wrong" aria-pressed="${S.reviewFilter === 'wrong'}">只看答錯 ${wrong.length}</button></div></div>
        <div class="review">${reviewItems.length ? reviewItems.map(i => reviewItem(i)).join('') : '<div class="empty"><img src="' + img('arale-thumb') + '" alt=""><p>全部答對，沒有需要檢討的題目！</p></div>'}</div>
      </section></div>`;
  };
  function reviewItem(i) {
    const q = QB[i.id], ci = i.perm.indexOf(q.a);
    const mine = i.pick === null ? '未作答' : i.pick === -1 ? '超時未作答' : `${LET[i.pick]}. ${q.o[i.perm[i.pick]]}`;
    return `<details class="${i.ok ? 'r-ok' : 'r-bad'}"><summary><span class="ic" aria-hidden="true">${i.ok ? '✓' : '✗'}</span><span class="q" lang="en">${esc(q.q)}</span><span class="chip chip-id">${q.id}</span></summary>
      <div class="r-body"><div class="qmeta">${catChip(q.cat)}${srcChip(q)}${stars(q.lv)}</div>
        <p class="small">你的答案：<b>${esc(mine)}</b>${i.ok ? '' : `　｜　正確答案：<b>${LET[ci]}. ${esc(q.o[q.a])}</b>`}</p>
        ${expHTML(q, i.perm, i.pick)}</div></details>`;
  }

  /* library */
  function libFiltered() {
    const l = S.lib, wb = store.get('wrong', {}), kw = l.q.trim().toLowerCase();
    return QS.filter(q => (l.src === 'all' || q.src === l.src) && (!l.cats.length || l.cats.includes(q.cat)) && (!l.wrong || wb[q.id]) &&
      (!kw || [q.id, q.q, q.qz, ...q.o, ...q.oz].join(' ').toLowerCase().includes(kw)));
  }
  VIEWS.library = () => {
    const l = S.lib, wbN = Object.keys(store.get('wrong', {})).length;
    return `<div class="wrap page">
      <div class="page-head"><p class="eyebrow">Knowledge Library</p><h1>知識圖書館</h1><p class="muted">${N_ALL} 題完整題庫：英文題目、專業中文翻譯、中英文解說，以及 ISO/IEC 27001:2022 附錄 A 對應控制措施（中文為常用譯名，正式用語請以國家標準 CNS 27001 為準）。</p></div>
      <div class="panel lib-tools">
        <div class="row"><div class="seg">${[['all', `全部 ${N_ALL}`], ['std', `標準 ${N_STD} 題`], ['ai', `AI 生成 ${N_AI} 題`]].map(([k, t]) => `<button data-act="lib-src" data-v="${k}" aria-pressed="${l.src === k}">${t}</button>`).join('')}</div></div>
        <div class="row">${catPicks(l.cats, 'lib-catf')}</div>
        <div class="row"><input class="input" id="lib-q" type="search" placeholder="搜尋題目或選項（中英文皆可），例如：TLS、勒索軟體" value="${esc(l.q)}" style="flex:1 1 280px" aria-label="搜尋題庫">
          <label class="switch"><input type="checkbox" id="lib-wrong" data-act="lib-wrong" ${l.wrong ? 'checked' : ''}>只看錯題本（${wbN}）</label>
          ${wbN ? `<button class="btn btn-ink btn-sm" data-act="wrong-practice">錯題重練</button>` : ''}</div>
      </div>
      <p class="lib-count" id="lib-count"></p>
      <div class="lib-list" id="lib-list"></div></div>`;
  };
  function libCard(q, wb) {
    const o = S.lib.open[q.id] || {};
    return `<article class="lib-card" id="lib-${q.id}">
      <div class="qmeta"><span class="chip chip-id">${q.id}</span>${catChip(q.cat)}${srcChip(q)}${stars(q.lv)}${wb[q.id] ? `<span class="chip" style="color:var(--bad)">錯題本・錯 ${wb[q.id].n} 次</span>` : ''}</div>
      <p class="qtext" lang="en">${esc(q.q)}</p>
      ${o.zh ? `<p class="qzh" lang="zh-Hant">${esc(q.qz)}</p>` : ''}
      ${o.ans ? `<ul class="opts-static">${q.o.map((t, i) => `<li class="${i === q.a ? 'ans' : ''}"><b>${LET[i]}</b><span lang="en">${esc(t)}<small lang="zh-Hant">${esc(q.oz[i])}</small></span></li>`).join('')}</ul>${expHTML(q, [0, 1, 2, 3], null, { showQ: false })}` : ''}
      <div class="btn-row"><button class="zh-toggle" data-act="lib-zh" data-id="${q.id}" aria-pressed="${!!o.zh}"><img src="${img('arale-explain')}" alt="">題目中文說明</button>
        <button class="btn btn-line btn-sm" data-act="lib-ans" data-id="${q.id}" aria-expanded="${!!o.ans}">${o.ans ? '收起解答' : '看答案與解說'}</button></div></article>`;
  }
  function renderLib() {
    const list = libFiltered(), wb = store.get('wrong', {});
    $('#lib-count').textContent = `顯示 ${list.length} 題`;
    $('#lib-list').innerHTML = list.length ? list.map(q => libCard(q, wb)).join('') : `<div class="empty panel"><img src="${img('arale-confused')}" alt=""><p>${S.lib.wrong ? '錯題本是空的，太厲害了！' : '找不到符合條件的題目，換個關鍵字試試。'}</p></div>`;
  }
  AFTER.library = () => {
    renderLib();
    const inp = $('#lib-q'); let t = null;
    inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { S.lib.q = inp.value; renderLib(); }, 160); });
    if (S.libFocus) { const el = $('#lib-' + S.libFocus); S.libFocus = null; if (el) setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }), 60); }
  };

  /* me */
  VIEWS.me = () => {
    const p = profile();
    if (!p) return `<div class="wrap page"><div class="page-head"><p class="eyebrow">My Journey</p><h1>我的學習</h1></div>
      <div class="panel empty"><img src="${img('arale-wave')}" alt=""><p>你還沒有環島車票。領取車票後，這裡會記錄你的測驗成績、紀念章與通過證明。</p><a class="btn btn-ink" href="#profile">領取環島車票</a></div></div>`;
    const h = store.get('history', []), certs = store.get('certs', []), qp = questProgress(), wbN = Object.keys(store.get('wrong', {})).length;
    const best = h.reduce((m, x) => Math.max(m, x.score), 0);
    return `<div class="wrap page">
      <div class="page-head"><p class="eyebrow">My Journey</p><h1>我的學習</h1><p class="muted">所有紀錄只保存在這個瀏覽器中。換電腦或清除瀏覽器資料後，紀錄就不會保留。</p></div>
      <div class="me-grid">
        <div style="display:grid;gap:16px">
          ${ticketHTML(p)}
          <div class="btn-row"><a class="btn btn-line btn-sm" href="#profile">修改資料</a>${PREVIEW ? '' : '<button class="btn btn-text btn-sm" data-act="export">匯出學習紀錄（JSON）</button>'}<button class="btn btn-text btn-sm" data-act="wipe">刪除我的所有資料</button></div>
          <div style="display:grid;gap:10px"><h3>車站紀念章 ${stampCount()} / ${N_ST}</h3>
            <div class="stamp-book">${ROUTE.map(id => `<div class="slot ${qp[id]?.passed ? 'on' : ''}">${stampSVG(id, { inked: !!qp[id]?.passed, date: qp[id]?.at ? ymd(new Date(qp[id].at)) : '', size: 96 })}</div>`).join('')}</div></div>
        </div>
        <div style="display:grid;gap:20px;min-width:0">
          <div class="kpis"><div><b>${h.length}</b><span>測驗次數</span></div><div><b>${best}</b><span>最高分</span></div><div><b>${h.filter(x => x.pass).length}</b><span>通過次數</span></div><div><b>${wbN}</b><span>錯題本題數</span></div></div>
          <div style="display:grid;gap:10px"><h3>我的通過證明</h3>
            ${certs.length ? `<div class="cert-list">${certs.map(c => `<div class="cert-item"><span class="seal">PASS<br>${c.score}</span><div><b>${esc(c.label.zh)}</b><span>${ymd(new Date(c.at))}・${c.score} 分・${c.no}</span></div><button class="btn btn-line btn-sm" data-act="cert" data-no="${c.no}">查看</button></div>`).join('')}</div>` : '<p class="muted small">還沒有通過證明。任何一份測驗達到 ' + PASS + ' 分，就會自動產生。</p>'}</div>
          <div style="display:grid;gap:10px"><h3>學習紀錄</h3>
            ${h.length ? `<div class="table-wrap"><table><thead><tr><th>日期</th><th>測驗</th><th>成績</th><th>結果</th><th>時間</th></tr></thead><tbody>${h.slice(0, 30).map(x => `<tr><td class="num">${fmtDT(x.at)}</td><td class="wrap">${esc(x.label)}</td><td class="num">${x.score}（${x.correct}/${x.total}）</td><td><span class="pill ${x.pass ? 'pass' : 'fail'}">${x.pass ? '通過' : '未通過'}</span></td><td class="num">${fmtDur(x.dur)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">還沒有測驗紀錄，從經典測驗或環島闖關開始吧！</p>'}</div>
        </div>
      </div></div>`;
  };

  /* ── 測驗引擎 ───────────────────────────── */
  function startQuiz(cfg) {
    if (!cfg.practice && !profile()) { askTicket(cfg); return; }
    const list = cfg.shuffleQ ? shuffle(cfg.ids) : cfg.ids.slice();
    S.quiz = {
      cfg, idx: 0, t0: Date.now(), done: false,
      items: list.map(id => ({ id, perm: cfg.shuffleO ? shuffle([0, 1, 2, 3]) : [0, 1, 2, 3], pick: null, ok: null, zh: false })),
      game: cfg.mode === 'game' ? { lives: 3, pts: 0, combo: 0, maxCombo: 0, snacks: [], left: GAME_SEC, over: false } : null
    };
    S.reviewFilter = 'all';
    closeModal(true);
    go('quiz');
  }
  function pick(di) {
    const z = S.quiz; if (!z || z.done) return;
    const it = z.items[z.idx], q = QB[it.id], locked = z.cfg.instant || !!z.game;
    if (locked && it.pick !== null) return;
    if (z.game && z.game.over) return;
    it.pick = di; it.ok = it.perm[di] === q.a;
    if (z.game) gameAnswer(it, di);
    renderQ();
    if (locked) { const fb = $('#fb'); if (fb) setTimeout(() => fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 30); }
  }
  function gameAnswer(it, di) {
    const g = S.quiz.game; stopTimer();
    if (it.ok) {
      g.combo++; g.maxCombo = Math.max(g.maxCombo, g.combo);
      const add = 100 + Math.round(g.left * 5) + (g.combo >= 2 ? Math.min(300, (g.combo - 1) * 50) : 0);
      g.pts += add; g.snacks.push(D.snacks[Math.floor(Math.random() * D.snacks.length)]);
      floatPts(`+${add}`, di); beep(true);
    } else {
      g.combo = 0; g.lives--; beep(false);
      if (g.lives <= 0) g.over = true;
    }
  }
  function floatPts(txt, di) {
    const b = $$('.opt')[di]; if (!b) return;
    const r = b.getBoundingClientRect(), s = document.createElement('span');
    s.className = 'float-pts'; s.textContent = txt; s.style.left = `${r.right - 90}px`; s.style.top = `${r.top}px`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 1000);
  }
  let actx = null;
  function beep(ok) {
    if (!store.get('sound', true)) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), gn = actx.createGain(), t = actx.currentTime;
      o.type = ok ? 'triangle' : 'sawtooth';
      o.frequency.setValueAtTime(ok ? 660 : 220, t); if (ok) o.frequency.setValueAtTime(990, t + 0.09);
      gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(0.12, t + 0.02); gn.gain.exponentialRampToValueAtTime(0.0001, t + (ok ? 0.28 : 0.35));
      o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + 0.4);
    } catch (e) { /* audio unavailable */ }
  }
  function startTimer(resume) {
    stopTimer();
    const z = S.quiz; if (!z || !z.game) return;
    const g = z.game, t0 = performance.now(), from = resume ? g.left : GAME_SEC; g.left = from;
    S.timer = setInterval(() => {
      const left = Math.max(0, from - (performance.now() - t0) / 1000); g.left = left;
      const bar = $('#tbar'), tx = $('#tleft');
      if (bar) { bar.firstElementChild.style.transform = `scaleX(${(left / GAME_SEC).toFixed(3)})`; bar.classList.toggle('low', left <= 10); }
      if (tx) tx.textContent = `${Math.ceil(left)} 秒`;
      if (left <= 0) {
        stopTimer();
        const it = z.items[z.idx];
        if (it.pick === null) { it.pick = -1; it.ok = false; g.combo = 0; g.lives--; if (g.lives <= 0) g.over = true; beep(false); renderQ(); }
      }
    }, 100);
  }
  function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }
  function next() {
    const z = S.quiz; if (!z || z.done) return;
    const it = z.items[z.idx], locked = z.cfg.instant || !!z.game;
    if (locked && it.pick === null) return;
    if (z.game && z.game.over) return finish();
    if (z.idx < z.items.length - 1) {
      z.idx++; renderQ(); window.scrollTo({ top: 0, behavior: 'smooth' });
      if (z.game) startTimer();
    } else if (locked) finish(); else submitExam();
  }
  function prev() { const z = S.quiz; if (z && !z.cfg.instant && !z.game && z.idx > 0) { z.idx--; renderQ(); } }
  async function submitExam() {
    const z = S.quiz, un = z.items.filter(i => i.pick === null).length;
    if (un && !(await confirmBox({ title: '確定要交卷嗎？', body: `還有 ${un} 題尚未作答，未作答的題目會算答錯。`, ok: '交卷', cancel: '繼續作答' }))) return;
    finish();
  }
  function finish() {
    const z = S.quiz; stopTimer(); z.done = true;
    const items = z.items.map(it => ({ id: it.id, perm: it.perm, pick: it.pick, ok: it.pick !== null && it.pick >= 0 && it.perm[it.pick] === QB[it.id].a }));
    const total = items.length, correct = items.filter(i => i.ok).length, score = scoreOf(correct, total), pass = isPass(correct, total);
    const res = { id: 'R' + Date.now().toString(36), at: Date.now(), mode: z.cfg.mode, label: z.cfg.label, total, correct, score, pass, dur: Math.round((Date.now() - z.t0) / 1000), items, station: z.cfg.station || null, cert: null, cfgCert: z.cfg.cert };
    if (z.game) { const best = store.get('gameBest', 0); res.game = { ...z.game, best: z.game.pts > best }; if (z.game.pts > best) store.set('gameBest', z.game.pts); }
    const wb = store.get('wrong', {});
    items.forEach(i => { if (i.pick === null) return; if (i.ok) delete wb[i.id]; else wb[i.id] = { n: (wb[i.id]?.n || 0) + 1, at: Date.now() }; });
    store.set('wrong', wb);
    if (z.cfg.station) {
      const qp = questProgress(), cur = qp[z.cfg.station] || {};
      res.newStamp = pass && !cur.passed;
      qp[z.cfg.station] = { best: Math.max(cur.best || 0, score), passed: !!(cur.passed || pass), at: cur.passed ? cur.at : pass ? Date.now() : null, tries: (cur.tries || 0) + 1 };
      store.set('quest', qp);
      if (ROUTE.every(id => qp[id]?.passed) && !store.get('grand', null)) {
        const avg = Math.round(ROUTE.reduce((s, id) => s + qp[id].best, 0) / ROUTE.length);
        res.grand = issueCert({ kind: 'grand', label: { zh: `台灣科技環島 全制霸（${N_ST} 站全數通過）`, en: `Taiwan Tech Island Quest: all ${N_ST} stops completed` }, score: avg, correct: null, total: null, station: null });
        store.set('grand', res.grand);
      }
    }
    if (pass && z.cfg.cert !== false && !z.cfg.practice) res.cert = issueCert({ kind: z.cfg.mode, label: z.cfg.label, score, correct, total, station: z.cfg.station });
    res.practice = !!z.cfg.practice;
    if (!res.practice) {
      const h = store.get('history', []);
      h.unshift({ id: res.id, at: res.at, mode: res.mode, label: res.label.zh, total, correct, score, pass, dur: res.dur, cert: res.cert });
      store.set('history', h.slice(0, 60));
    }
    S.result = res;
    go('result');
  }
  function issueCert({ kind, label, score, correct, total, station }) {
    const p = profile(), at = Date.now();
    const no = `AIT-${ymd(new Date(at)).replace(/-/g, '')}-${hash36([p.name, p.email, label.zh, score, at].join('|'))}`;
    const rec = { no, at, kind, label, score, correct, total, station: station || null, name: p.name, company: p.company, title: p.title, goal: goalText(p) };
    const certs = store.get('certs', []); certs.unshift(rec); store.set('certs', certs.slice(0, 100));
    return no;
  }

  /* ── 通過證明（canvas 繪製）───────────────────────────── */
  const loadImage = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
  const spacing = (g, px) => { if ('letterSpacing' in g) g.letterSpacing = `${px}px`; };
  function fitFont(g, text, font, size, maxW, min = 28) { let s = size; g.font = font(s); while (s > min && g.measureText(text).width > maxW) { s -= 2; g.font = font(s); } return s; }
  function wrapText(g, text, maxW, words) {
    const parts = words ? text.split(/(\s+)/) : Array.from(text), out = []; let line = '';
    for (const part of parts) { const t = line + part; if (g.measureText(t).width > maxW && line.trim()) { out.push(line.trim()); line = part.trimStart(); } else line = t; }
    if (line.trim()) out.push(line.trim());
    return out;
  }
  function arcText(g, text, cx, cy, r, center) {
    const chars = Array.from(text), widths = chars.map(c => g.measureText(c).width), total = widths.reduce((a, b) => a + b, 0);
    let a = center - total / r / 2;
    chars.forEach((ch, i) => { const w = widths[i]; a += w / 2 / r; g.save(); g.translate(cx + r * Math.cos(a), cy + r * Math.sin(a)); g.rotate(a + Math.PI / 2); g.fillText(ch, 0, 0); g.restore(); a += w / 2 / r; });
  }
  async function certImage(rec) {
    const W = 2000, H = 1414;
    const NAVY = '#15223d', TEAL = '#0c7680', RED = '#c8343f', GRAY = '#5d6577', SUN = '#f2b01e';
    const FD = s => `400 ${s}px Huninn, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`;
    const FB = (w, s) => `${w} ${s}px "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`;
    const FT = (w, s) => `${w} ${s}px "Chakra Petch", "Noto Sans TC", sans-serif`;
    const d = new Date(rec.at);
    const sealMid = rec.kind === 'grand' ? '環島制霸' : rec.station ? CAT[rec.station].station.label : 'PASS';
    const zh = [rec.name, rec.company, rec.title, rec.label.zh, rec.goal, sealMid, "Allan'S IT知識測驗通過證明茲證明已通過成績分標準講師顧問小助理阿拉蕾測驗日期中華民國年月日朝目標邁進成為（）｜、：「」輔導稽核員陪練翻譯提示驗證機構"].join('');
    if (document.fonts && document.fonts.load) {
      await Promise.all([document.fonts.load(FD(100), zh), document.fonts.load(FB(700, 40), zh), document.fonts.load(FB(500, 40), zh), document.fonts.load(FT(600, 30), 'CERTIFICATE OF ACHIEVEMENT 0123456789 ' + rec.label.en + rec.no)].map(p => p.catch(() => null)));
    }
    const [al, ar] = await Promise.all([loadImage(img('allan-smile')), loadImage(img('arale-thumb'))]);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    g.fillStyle = '#fbfcfa'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(12,118,128,.06)'; g.lineWidth = 2;
    for (let x = 100; x < W; x += 100) { g.beginPath(); g.moveTo(x, 64); g.lineTo(x, H - 64); g.stroke(); }
    for (let y = 100; y < H; y += 100) { g.beginPath(); g.moveTo(64, y); g.lineTo(W - 64, y); g.stroke(); }
    g.save(); g.translate(1190, 190); g.scale(1.38, 1.38); g.fillStyle = 'rgba(12,118,128,.08)'; g.fill(new Path2D(M.island)); g.restore();
    g.strokeStyle = NAVY; g.lineWidth = 12; g.strokeRect(36, 36, W - 72, H - 72);
    g.strokeStyle = TEAL; g.lineWidth = 3; g.strokeRect(64, 64, W - 128, H - 128);
    g.fillStyle = NAVY; g.fillRect(64, 64, W - 128, 116);
    g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillStyle = '#ffffff'; g.font = FD(52); g.fillText("Allan'S IT知識測驗", 112, 123);
    g.textAlign = 'right'; g.fillStyle = SUN; g.font = FT(600, 24); spacing(g, 4); g.fillText('IT KNOWLEDGE QUEST · FOR ISMS PROFESSIONALS', W - 112, 123); spacing(g, 0);
    g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.fillStyle = NAVY; g.font = FD(118); g.fillText(rec.kind === 'grand' ? '環島制霸證明' : '通過證明', W / 2, 330);
    g.fillStyle = TEAL; g.font = FT(600, 32); spacing(g, 10); g.fillText('CERTIFICATE OF ACHIEVEMENT', W / 2, 392); spacing(g, 0);
    g.fillStyle = GRAY; g.font = FB(500, 36); g.fillText('茲證明　This is to certify that', W / 2, 478);
    g.fillStyle = NAVY; fitFont(g, rec.name, FD, 112, 1150); g.fillText(rec.name, W / 2, 600);
    g.strokeStyle = SUN; g.lineWidth = 6; g.beginPath(); g.moveTo(W / 2 - 430, 640); g.lineTo(W / 2 + 430, 640); g.stroke();
    g.fillStyle = GRAY; const org = `${rec.company}｜${rec.title}`; fitFont(g, org, s => FB(500, s), 36, 1300); g.fillText(org, W / 2, 698);
    g.fillStyle = NAVY; g.font = FB(700, 44);
    const main = rec.kind === 'grand' ? `已完成「${rec.label.zh}」，各站平均成績 ${rec.score} 分` : `已通過「${rec.label.zh}」，成績 ${rec.score} 分`;
    const mLines = wrapText(g, main, 1320); mLines.forEach((t, i) => g.fillText(t, W / 2, 790 + i * 58));
    let y = 790 + mLines.length * 58 + 6;
    g.fillStyle = GRAY; g.font = FB(500, 28);
    const en = rec.kind === 'grand' ? `has completed the ${rec.label.en}, with an average score of ${rec.score}/100 (pass mark ${PASS}).` : `has passed the ${rec.label.en} with a score of ${rec.score}/100 (${rec.correct}/${rec.total} correct; pass mark ${PASS}).`;
    const eLines = wrapText(g, en, 1320, true); eLines.forEach((t, i) => g.fillText(t, W / 2, y + i * 40));
    y += eLines.length * 40 + 30;
    if (rec.goal) {
      const gt = `朝目標邁進：成為${rec.goal}`; g.font = FB(700, 32); const gw = Math.min(1400, g.measureText(gt).width + 80);
      g.fillStyle = 'rgba(12,118,128,.10)'; g.beginPath(); g.roundRect ? g.roundRect(W / 2 - gw / 2, y - 40, gw, 62, 31) : g.rect(W / 2 - gw / 2, y - 40, gw, 62); g.fill();
      g.fillStyle = TEAL; fitFont(g, gt, s => FB(700, s), 32, 1320, 22); g.fillText(gt, W / 2, y + 2);
    }
    g.fillStyle = NAVY; g.font = FB(700, 32); g.fillText(`測驗日期　${roc(d)}（${ymd(d)}）`, W / 2, 1128);
    g.fillStyle = GRAY; g.font = FT(600, 24); spacing(g, 3); g.fillText(`CERTIFICATE NO. ${rec.no}`, W / 2, 1176); spacing(g, 0);
    const person = (im, cx, title, name, note, ring) => {
      const cy = 1128, r = 74;
      g.save(); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fillStyle = '#e8f2f2'; g.fill(); g.clip();
      if (im) { const s = (2 * r * 1.08) / im.width, w = im.width * s, h = im.height * s; g.drawImage(im, cx - w / 2, cy - r + 4, w, h); }
      g.restore(); g.strokeStyle = ring; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
      g.fillStyle = GRAY; g.font = FB(500, 24); g.fillText(title, cx, 1238);
      g.fillStyle = NAVY; g.font = FD(40); g.fillText(name, cx, 1284);
      g.fillStyle = GRAY; g.font = FB(500, 20); g.fillText(note, cx, 1318);
    };
    person(al, 380, '講師 Instructor', 'Allan顧問', 'ISMS／PIMS 輔導顧問・驗證機構稽核員', NAVY);
    person(ar, W - 380, 'AI 小助理 Assistant', '阿拉蕾', '陪練・中英翻譯・解題提示', TEAL);
    g.save(); g.translate(W - 330, 380); g.rotate(-0.16);
    g.strokeStyle = RED; g.fillStyle = RED; g.lineWidth = 7; g.beginPath(); g.arc(0, 0, 118, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 2.5; g.setLineDash([8, 7]); g.beginPath(); g.arc(0, 0, 100, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
    g.font = FT(700, 19); spacing(g, 2); arcText(g, "ALLAN'S IT · PASSED", 0, 0, 82, -Math.PI / 2); spacing(g, 0);
    g.textBaseline = 'middle'; fitFont(g, sealMid, s => (sealMid === 'PASS' ? FT(700, s) : FD(s)), sealMid === 'PASS' ? 54 : 44, 118, 24); g.fillText(sealMid, 0, 6);
    g.font = FT(700, 22); g.fillText(`${rec.score} / 100`, 0, 50); g.textBaseline = 'alphabetic';
    g.restore();
    return cv.toDataURL('image/png');
  }
  async function openCert(no) {
    const rec = store.get('certs', []).find(c => c.no === no);
    if (!rec) { toast('找不到這張通過證明'); return; }
    openModal(`<div class="modal-head"><div><p class="eyebrow">Certificate</p><h2>${rec.kind === 'grand' ? '環島制霸證明' : '通過證明'}</h2></div><button class="icon-btn x" data-act="m-close" aria-label="關閉">${I.close}</button></div><div id="cert-box"><p class="muted">證明產生中…</p></div>`, { wide: true });
    let url;
    try { url = await certImage(rec); } catch (e) { const b = $('#cert-box'); if (b) b.innerHTML = '<p class="err">證明產生失敗，請重新整理頁面後再試一次。</p>'; return; }
    const box = $('#cert-box'); if (!box) return;
    S.certUrl = url; S.certNo = rec.no;
    box.innerHTML = `<div style="display:grid;gap:14px"><img class="cert-img" src="${url}" alt="通過證明：${esc(rec.name)}，${esc(rec.label.zh)}，${rec.score} 分，${ymd(new Date(rec.at))}">
      ${PREVIEW ? '<p class="small muted">預覽環境無法直接下載或列印，請在圖片上按右鍵（手機長按）另存。部署到正式網站後即可下載 PNG 與列印。</p>' : '<div class="btn-row"><button class="btn btn-ink" data-act="cert-dl">下載證明（PNG）</button><button class="btn btn-line" data-act="cert-print">列印／另存 PDF</button></div>'}
      <p class="small muted">證書編號 ${esc(rec.no)}。本證明為 Allan'S IT知識測驗的學習成果紀錄，由學員瀏覽器產生。</p></div>`;
  }

  /* ── 路由 ───────────────────────────── */
  const ROUTES = ['home', 'profile', 'classic', 'practice', 'quest', 'game', 'library', 'me', 'quiz', 'result'];
  const viewName = () => { const h = location.hash.slice(1); return ROUTES.includes(h) ? h : 'home'; };
  function go(v) { if (viewName() === v && location.hash) render(); else location.hash = v; }
  function navKey(v) {
    if (v === 'quiz' || v === 'result') { const m = (S.quiz && S.quiz.cfg.mode) || (S.result && S.result.mode); return m === 'quest' ? 'quest' : m === 'game' ? 'game' : 'classic'; }
    return v === 'profile' ? 'me' : v;
  }
  function rerender() { const y = window.scrollY; render(); window.scrollTo(0, y); }
  function render() {
    stopTimer();
    let v = viewName();
    if (v === 'practice') { if (S.lastHash !== 'practice') S.setup.practice = true; v = 'classic'; try { history.replaceState(null, '', '#classic'); } catch (e) { /* sandboxed */ } }
    if (v === 'quiz' && S.quiz && S.quiz.done) v = S.result ? 'result' : 'home';
    if (v === 'quiz' && !S.quiz) v = 'home';
    if (v === 'result' && !S.result) v = 'home';
    if (v !== 'quiz' && S.quiz && !S.quiz.done) { S.quiz = null; toast('已離開測驗，本次作答不會保存。'); }
    closeModal(true);
    $('#app').innerHTML = VIEWS[v]();
    document.body.dataset.view = v;
    const k = navKey(v);
    $$('[data-nav]').forEach(a => { if (a.dataset.nav === k) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    updateWho();
    if (AFTER[v]) AFTER[v]();
    S.lastHash = viewName();
    window.scrollTo(0, 0);
  }
  function updateWho() {
    const w = $('#who'); if (!w) return;
    const p = profile();
    w.href = p ? '#me' : '#profile';
    w.innerHTML = p ? `<i>${esc(initial(p.name))}</i><span>${esc(p.name)}</span>` : `<i>${I.user.replace('<svg', '<svg width="16" height="16"')}</i><span>領取車票</span>`;
    w.setAttribute('aria-label', p ? `我的學習：${p.name}` : '領取環島車票');
  }

  /* ── 事件 ───────────────────────────── */
  const ACT = {
    'm-close': () => closeModal(),
    'm-ok': () => { const r = S.modal && S.modal.resolve; closeModal(true); if (r) r(true); },
    'm-ticket': () => { const cfg = S.pending; S.pending = null; closeModal(true); requireProfile(() => startQuiz(cfg)); },
    'm-practice': () => { const cfg = S.pending; S.pending = null; closeModal(true); startQuiz(asPractice(cfg)); },
    'set-practice': el => { S.setup.practice = el.dataset.v === '1'; rerender(); },
    'g-practice': el => { S.gsetup.practice = el.dataset.v === '1'; rerender(); },
    'to-formal': () => { const m = S.result && S.result.mode; if (m === 'game') { S.gsetup.practice = false; go('game'); } else { S.setup.practice = false; go('classic'); } },
    'practice-station': el => { const id = el.dataset.id; startQuiz({ mode: 'classic', practice: true, cert: false, label: practiceLabel(catLabel(id)), ids: idsBy(q => q.cat === id), instant: true, shuffleQ: true, shuffleO: true }); },
    theme: () => { theme = THEME_NEXT[theme]; store.set('theme', theme); applyTheme(theme); toast(`配色：${THEME_LABEL[theme]}`); },
    quit: () => { const m = S.quiz && S.quiz.cfg.mode; confirmLeave(m === 'quest' ? 'quest' : m === 'game' ? 'game' : 'classic'); },
    pick: el => pick(+el.dataset.i),
    zh: () => { const it = S.quiz.items[S.quiz.idx]; it.zh = !it.zh; renderQ(); },
    next: () => next(),
    prev: () => prev(),
    submit: () => submitExam(),
    jump: el => { S.quiz.idx = +el.dataset.i; renderQ(); },
    sound: el => { const v = !store.get('sound', true); store.set('sound', v); el.innerHTML = v ? I.sound : I.mute; toast(v ? '音效已開啟' : '音效已關閉'); },
    'd-pick': el => { if (S.daily.pick !== null) return; S.daily.pick = +el.dataset.i; $('#daily').innerHTML = dailyHTML(); },
    'd-zh': () => { S.daily.zh = !S.daily.zh; $('#daily').innerHTML = dailyHTML(); },
    'cat-setup': el => { S.setup.src = 'cat'; S.setup.cats = [el.dataset.id]; go('classic'); },
    goal: el => { $$('.goal-picks .pick').forEach(b => b.setAttribute('aria-pressed', b === el ? 'true' : 'false')); const o = $('#pf-goal-other'); o.hidden = el.dataset.v !== 'other'; if (!o.hidden) o.focus(); },
    'set-src': el => { S.setup.src = el.dataset.v; rerender(); },
    'set-count': el => { S.setup.count = +el.dataset.v; rerender(); },
    'set-cat': el => { const c = S.setup.cats, id = el.dataset.id; S.setup.cats = c.includes(id) ? c.filter(x => x !== id) : [...c, id]; rerender(); },
    'set-instant': el => { S.setup.instant = el.dataset.v === '1'; rerender(); },
    'set-shq': el => { S.setup.shuffleQ = el.checked; },
    'set-sho': el => { S.setup.shuffleO = el.checked; },
    'start-classic': () => {
      const s = S.setup, ids = setupIds(s);
      if (!ids.length) return;
      const label = setupLabel(s, ids.length);
      startQuiz({ mode: 'classic', label: s.practice ? practiceLabel(label) : label, practice: s.practice, ids, instant: s.instant, shuffleQ: s.src === 'random' ? false : s.shuffleQ, shuffleO: s.shuffleO, cert: !s.practice, draw: s.src === 'random' ? { src: 'random', count: s.count } : null });
    },
    station: el => stationModal(el.dataset.id),
    'start-station': el => {
      const id = el.dataset.id, i = ROUTE.indexOf(id), c = CAT[id];
      startQuiz({ mode: 'quest', station: id, label: { zh: `環島闖關・第 ${i + 1} 站 ${c.station.label}：${c.zh}`, en: `Island Quest Stop ${i + 1}, ${c.station.en}: ${c.en}` }, ids: idsBy(q => q.cat === id), instant: true, shuffleQ: true, shuffleO: true, cert: true });
    },
    'g-src': el => { S.gsetup.src = el.dataset.v; rerender(); },
    'g-cat': el => { const c = S.gsetup.cats, id = el.dataset.id; S.gsetup.cats = c.includes(id) ? c.filter(x => x !== id) : [...c, id]; rerender(); },
    'g-count': el => { S.gsetup.count = +el.dataset.v; rerender(); },
    'start-game': () => {
      const s = S.gsetup, pool = setupIds({ src: s.src, cats: s.cats }), ids = shuffle(pool).slice(0, s.count);
      if (!ids.length) return;
      const nm = { all: '全部題庫', std: `標準 ${N_STD} 題`, ai: 'AI 生成題', cat: ROUTE.filter(id => s.cats.includes(id)).map(id => CAT[id].short).join('、') }[s.src];
      const label = { zh: `夜市搶答挑戰（${nm}・${ids.length} 題）`, en: `Night Market Challenge (${ids.length} questions)` };
      startQuiz({ mode: 'game', label: s.practice ? practiceLabel(label) : label, practice: s.practice, ids, instant: true, shuffleQ: false, shuffleO: true, cert: !s.practice, draw: { src: s.src, cats: s.cats.slice(), count: s.count } });
    },
    retry: () => { const z = S.quiz; if (!z) return; const cfg = { ...z.cfg }; if (cfg.draw) cfg.ids = shuffle(setupIds(cfg.draw)).slice(0, cfg.draw.count); startQuiz(cfg); },
    'retry-wrong': () => { const ids = S.result.items.filter(i => !i.ok).map(i => i.id); startQuiz({ mode: 'classic', label: { zh: '錯題重練', en: 'Review Practice' }, ids, instant: true, shuffleQ: true, shuffleO: true, cert: false, practice: true }); },
    'wrong-practice': () => { const ids = Object.keys(store.get('wrong', {})).filter(id => QB[id]); if (!ids.length) return; startQuiz({ mode: 'classic', label: { zh: '錯題本重練', en: 'Review Practice' }, ids, instant: true, shuffleQ: true, shuffleO: true, cert: false, practice: true }); },
    'rv-filter': el => { S.reviewFilter = el.dataset.v; rerender(); },
    cert: el => openCert(el.dataset.no),
    'cert-dl': () => { if (!S.certUrl) return; const a = document.createElement('a'); a.href = S.certUrl; a.download = `${S.certNo}.png`; document.body.appendChild(a); a.click(); a.remove(); },
    'cert-print': () => {
      if (!S.certUrl) return;
      let pa = $('#print-area'); if (!pa) { pa = document.createElement('div'); pa.id = 'print-area'; document.body.appendChild(pa); }
      pa.innerHTML = `<img src="${S.certUrl}" alt="">`;
      const im = pa.querySelector('img'); const doPrint = () => window.print();
      if (im.complete) doPrint(); else im.onload = doPrint;
    },
    'lib-src': el => { S.lib.src = el.dataset.v; $$('[data-act="lib-src"]').forEach(b => b.setAttribute('aria-pressed', b === el ? 'true' : 'false')); renderLib(); },
    'lib-catf': el => { const c = S.lib.cats, id = el.dataset.id; S.lib.cats = c.includes(id) ? c.filter(x => x !== id) : [...c, id]; el.setAttribute('aria-pressed', S.lib.cats.includes(id)); renderLib(); },
    'lib-wrong': el => { S.lib.wrong = el.checked; renderLib(); },
    'lib-zh': el => { const o = S.lib.open[el.dataset.id] = S.lib.open[el.dataset.id] || {}; o.zh = !o.zh; rerenderCard(el.dataset.id, 'lib-zh'); },
    'lib-ans': el => { const o = S.lib.open[el.dataset.id] = S.lib.open[el.dataset.id] || {}; o.ans = !o.ans; rerenderCard(el.dataset.id, 'lib-ans'); },
    'lib-goto': el => { const id = el.dataset.id; S.lib = { src: 'all', cats: [], q: '', wrong: false, open: { [id]: { zh: true, ans: true } } }; S.libFocus = id; go('library'); },
    'lib-cat': el => { S.lib = { src: 'all', cats: [el.dataset.id], q: '', wrong: false, open: {} }; go('library'); },
    export: () => {
      const data = { exportedAt: new Date().toISOString(), profile: profile(), history: store.get('history', []), certs: store.get('certs', []), quest: questProgress(), wrong: store.get('wrong', {}) };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = `allans-it-quiz-${ymd(new Date())}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    wipe: async () => {
      if (!(await confirmBox({ title: '刪除我的所有資料？', body: '車票、學習紀錄、紀念章、錯題本與通過證明都會從這個瀏覽器刪除，且無法復原。', ok: '全部刪除', cancel: '取消' }))) return;
      ['profile', 'history', 'certs', 'quest', 'wrong', 'grand', 'gameBest'].forEach(k => store.del(k));
      S.result = null; S.quiz = null; toast('已刪除所有資料'); go('home');
    }
  };
  function rerenderCard(id, act) { const el = $('#lib-' + id); if (!el) return; el.outerHTML = libCard(QB[id], store.get('wrong', {})); $(`#lib-${id} [data-act="${act}"]`)?.focus(); }

  async function confirmLeave(dest) {
    const z = S.quiz, ticking = !!(z && z.game && S.timer);
    stopTimer();
    const ok = await confirmBox({ title: '要離開測驗嗎？', body: '目前的作答進度不會保存。', ok: '離開', cancel: '繼續作答' });
    if (ok) { S.quiz = null; go(dest || 'home'); } else if (ticking && S.quiz === z) startTimer(true);
  }
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (link && S.quiz && !S.quiz.done && viewName() === 'quiz') { e.preventDefault(); confirmLeave(link.getAttribute('href').slice(1)); return; }
    const el = e.target.closest('[data-act]');
    if (!el || (el.getAttribute('aria-disabled') === 'true' && el.dataset.act !== 'station')) return;
    const fn = ACT[el.dataset.act];
    if (!fn) return;
    if (el.tagName === 'A') e.preventDefault();
    fn(el, e);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && S.modal) { closeModal(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('g[data-act]')) { e.preventDefault(); ACT[e.target.dataset.act](e.target, e); return; }
    if (S.modal || viewName() !== 'quiz' || !S.quiz || S.quiz.done) return;
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase(), map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
    if (k in map) { e.preventDefault(); pick(map[k]); }
    else if (k === 'z') { e.preventDefault(); ACT.zh(); }
    else if (k === 'enter') { if (e.target.closest && e.target.closest('button, a, summary')) return; e.preventDefault(); next(); }
    else if (k === 'arrowright' && !S.quiz.cfg.instant && !S.quiz.game) next();
    else if (k === 'arrowleft') prev();
  });
  window.addEventListener('hashchange', render);

  /* ── boot ───────────────────────────── */
  paintThemeBtn(theme);
  render();
})();
