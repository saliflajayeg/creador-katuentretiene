(function () {
  const S = window.SITE, INF = window.INFLUENCERS;
  const body = document.body;
  const ROOT = body.dataset.root || '';
  const isFile = location.protocol === 'file:';

  // ---------- utilidades ----------
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const money = n => fmt(n) + ' FCFA';
  const page = path => ROOT + path + (isFile ? 'index.html' : '');
  // Publicado: cada creador vive en su subdominio (<sub>.mercadosemu.com) y la web se genera con data-live
  const LIVE = !!body.dataset.live, HERE = body.dataset.slug;
  const siteOf = p => `https://${p.sub}.${S.domain}/`;
  const profileUrl = p => LIVE ? (p.slug === HERE ? (ROOT || './') : siteOf(p)) : page(p.slug + '/');
  const panelUrl = p => LIVE ? (p.slug === HERE ? ROOT + 'panel/' : siteOf(p) + 'panel/') : page('panel/') + '?u=' + p.slug;
  const infoUrl = () => LIVE ? ROOT + 'como-funciona/' : page('');
  const img = p => ROOT + 'img/' + p;
  const prodImg = pr => img('productos/' + pr.img + '.jpg');
  const first = p => p.short || p.name.split(' ')[0];
  const FLAG = '<svg class="flag" viewBox="0 0 30 20" aria-label="Guinea Ecuatorial"><rect width="30" height="20" fill="#E32118"/><rect width="30" height="13.4" fill="#fff"/><rect width="30" height="6.6" fill="#3E9A00"/><path d="M0 0l9 10-9 10z" fill="#0073CE"/></svg>';
  const rich = s => esc(s).replace(/🇬🇶/g, FLAG);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const discounted = (price, qty) => Math.round(price * qty * (1 - S.discount / 100));
  const earnFor = (pr, total) => pr.own ? Math.round(total * 0.9) : Math.round(total * pr.comm / 100);
  const ICON = {
    instagram: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12l-5.8 3.1z"/></svg>',
    tiktok: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.9 5.9 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z"/></svg>',
    wa: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.2 4.2 0 0 0 1.9.1 3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4 11.8 11.8 0 0 0 8.4-20.1z"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    copy: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    arrow: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }
  function contact(text) {
    if (S.contactWhatsapp) window.open('https://wa.me/' + S.contactWhatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    else toast('Demo: aquí se abriría WhatsApp para registrarte');
  }
  function applyTheme(t) {
    const map = { bg: '--bg', surface: '--surface', ink: '--ink', muted: '--muted', line: '--line', accent: '--accent', accentInk: '--accent-ink', accent2: '--accent2', display: '--display' };
    Object.entries(map).forEach(([k, v]) => t[k] && body.style.setProperty(v, t[k]));
    body.style.setProperty('--page-bg', `color-mix(in srgb, ${t.accent} ${t.dark ? 10 : 18}%, ${t.bg})`);
    if (t.dark) body.classList.add('dark');
    if (t.upper) body.classList.add('upper');
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t.bg;
  }
  // pseudoaleatorio estable por influencer (las cifras del panel no cambian al recargar)
  function rng(seed) { let h = 2166136261; for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // ---------- Página del influencer ----------
  function renderProfile(slug) {
    const p = INF[slug]; if (!p) return;
    applyTheme(p.theme);
    body.classList.add('profile-page');
    document.title = p.name;
    const fav = document.querySelector('link[rel=icon]'); if (fav) fav.href = img(slug + '/avatar.jpg');
    const cats = ['Todo', ...new Set(p.products.map(x => x.cat))];
    const socials = p.socials.map(s => `<a class="social" href="${s.url}" target="_blank" rel="noopener">${ICON[s.type] || ''}${s.label}</a>`).join('');
    const embedded = document.documentElement.classList.contains('embedded');
    const root = document.getElementById('app');
    let hideNote = embedded; try { hideNote = hideNote || localStorage.getItem('nota-' + slug) === '1'; } catch (e) {}
    root.innerHTML = `
    <div class="profile">
      ${hideNote ? '' : `<div class="notice"><span class="wave">👋</span><p><b>${esc(first(p))}, así sería tu página.</b> Es una demostración: los productos son de ejemplo. Toca «Pedir» para probar.</p><button aria-label="Cerrar aviso">×</button></div>`}
      ${embedded ? `<div class="urlbar"><span class="clock">9:41</span><div class="addr"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3z"/></svg>${p.sub}.${S.domain}</div></div>` : ''}
      <header class="mini" aria-hidden="true"><img src="${img(slug + '/avatar.jpg')}" alt=""><span>${esc(p.name)}</span><a href="#productos">Productos</a></header>
      <div class="hero"><img src="${img(slug + '/hero.jpg')}" alt="${esc(p.name)}"><span class="pill-demo">DEMO</span></div>
      <div class="ident">
        <img class="avatar" src="${img(slug + '/avatar.jpg')}" alt="">
        <h1 class="p-name">${esc(p.name)}</h1>
        <div class="p-handle">@${p.handle} · ${p.followers} seguidores</div>
        <div class="p-niche">${esc(p.niche)}</div>
        <p class="p-tagline">${rich(p.tagline)}</p>
        ${p.quote ? `<div class="p-quote">“${esc(p.quote)}”</div>` : ''}
        <div class="socials">${socials}</div>
      </div>
      <div class="coupon">
        <span class="gift">🎁</span>
        <p><strong>Pide con mi código</strong>y llévate un ${S.discount} % de descuento</p>
        <span class="code">${p.code}</span>
      </div>
      <section class="sec" id="productos">
        <div class="sec-head"><h2 class="sec-title">Mis recomendados</h2><span class="sec-sub">${p.products.length} productos</span></div>
        <div class="chips" role="group" aria-label="Filtrar">${cats.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-cat="${c}">${c}</button>`).join('')}</div>
        <div class="grid" id="grid"></div>
      </section>
      <section class="sec">
        <div class="sec-head"><h2 class="sec-title">Mis últimos vídeos</h2><span class="sec-sub">en Instagram</span></div>
        <div class="reels">${p.reels.map(sc => `<a class="reel" href="https://www.instagram.com/p/${sc}/" target="_blank" rel="noopener"><img loading="lazy" src="${img(slug + '/r_' + sc + '.jpg')}" alt="Vídeo de ${esc(p.name)}"><span class="play">${ICON.play} Ver</span></a>`).join('')}</div>
      </section>
      <section class="sec">
        <div class="sec-head"><h2 class="sec-title">Colabora conmigo</h2><span class="sec-sub">para marcas</span></div>
        <div class="collabs">${p.collabs.map(c => `<div class="collab"><div class="ico">${c.icon}</div><div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div></div>`).join('')}</div>
        <button class="btn-outline" id="collab-btn">${ICON.wa} Pedir presupuesto</button>
      </section>
      <div class="p-foot">
        <img class="avatar" src="${img(slug + '/avatar.jpg')}" alt="">
        <h3>${esc(p.name)}</h3>
        <p>${p.sub}.${S.domain}</p>
        <div class="socials">${socials}</div>
      </div>
      <a class="panel-link" href="${panelUrl(p)}">👀 Ver el panel privado de ${esc(first(p))}</a>
      <a class="info-link" href="${infoUrl()}">¿Cómo funciona y cuánto puedes ganar? ${ICON.arrow}</a>
    </div>`;

    const note = root.querySelector('.notice');
    if (note) note.querySelector('button').onclick = () => { note.remove(); try { localStorage.setItem('nota-' + slug, '1'); } catch (e) {} };
    // cabecera pequeña con el nombre al bajar
    const mini = root.querySelector('.mini');
    new IntersectionObserver(([e]) => mini.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0))
      .observe(root.querySelector('.p-name'));

    const grid = root.querySelector('#grid');
    function drawGrid(cat) {
      const list = p.products.filter(x => cat === 'Todo' || x.cat === cat);
      grid.innerHTML = list.map(pr => `
        <article class="card">
          <div class="card-img"><img loading="lazy" src="${prodImg(pr)}" alt="">${pr.own ? '<span class="badge">Mi producto</span>' : ''}</div>
          <div class="card-body">
            <div class="card-shop">${esc(pr.shop)}</div>
            <div class="card-name">${esc(pr.name)}</div>
            <div class="card-price">${fmt(pr.price)} <small>FCFA</small></div>
            <button class="btn-order" data-id="${pr.id}">Pedir</button>
          </div>
        </article>`).join('');
    }
    drawGrid('Todo');
    root.querySelector('.chips').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      root.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === b));
      drawGrid(b.dataset.cat);
    });
    grid.addEventListener('click', e => {
      const b = e.target.closest('.btn-order'); if (!b) return;
      openSheet(p, p.products.find(x => x.id === b.dataset.id));
    });
    root.querySelector('#collab-btn').addEventListener('click', () => toast(`Demo: aquí se abriría WhatsApp con ${first(p)}`));
  }

  // ---------- Hoja de pedido ----------
  const ZONES = ['Malabo · Centro', 'Malabo · Caracolas', 'Malabo · Ela Nguema', 'Malabo · Los Ángeles', 'Malabo · Paraíso', 'Malabo · Sipopo', 'Malabo II', 'Bata', 'Ebebiyín', 'Mongomo', 'Luba', 'Otro'];
  let sheetWrap;
  function openSheet(p, pr) {
    if (!sheetWrap) {
      sheetWrap = document.createElement('div'); sheetWrap.className = 'sheet-wrap';
      sheetWrap.innerHTML = '<div class="sheet-bg"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="Pedido"></div>';
      body.appendChild(sheetWrap);
      sheetWrap.querySelector('.sheet-bg').addEventListener('click', closeSheet);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
    }
    const sheet = sheetWrap.querySelector('.sheet');
    let qty = 1;
    const draw = () => {
      const sub = pr.price * qty, tot = discounted(pr.price, qty);
      sheet.querySelector('#sub').textContent = money(sub);
      sheet.querySelector('#disc').textContent = '−' + money(sub - tot);
      sheet.querySelector('#tot').textContent = money(tot);
      sheet.querySelector('#q').textContent = qty;
    };
    sheet.innerHTML = `
      <div class="grabber"></div>
      <h2>Tu pedido</h2>
      <div class="sum-prod"><img src="${prodImg(pr)}" alt=""><div><div class="n">${esc(pr.name)}</div><div class="s">${esc(pr.shop)} · ${esc(pr.zone)}</div></div></div>
      <p style="margin:12px 0 0;font-size:13.5px;color:var(--muted)">${esc(pr.desc)}</p>
      <div class="row2">
        <div class="field"><label for="nm">Tu nombre</label><input id="nm" autocomplete="given-name" placeholder="Ej.: Juan"></div>
        <div class="field" style="flex:none"><label>Cantidad</label><div class="qty"><button id="minus" aria-label="Menos">−</button><span id="q">1</span><button id="plus" aria-label="Más">+</button></div></div>
      </div>
      <div class="field"><label for="zn">¿Dónde lo quieres?</label><select id="zn">${ZONES.map(z => `<option>${z}</option>`).join('')}</select></div>
      <div class="totals">
        <div><span>Subtotal</span><span id="sub"></span></div>
        <div class="disc"><span>Código ${p.code} (−${S.discount} %)</span><span id="disc"></span></div>
        <div class="tot"><span>Total</span><span id="tot"></span></div>
      </div>
      <button class="btn btn-wa" id="send">${ICON.wa} Pedir por WhatsApp</button>
      <p class="fine">El vendedor te responde por WhatsApp. Pagas al recibir.</p>`;
    draw();
    sheet.querySelector('#minus').onclick = () => { if (qty > 1) { qty--; draw(); } };
    sheet.querySelector('#plus').onclick = () => { if (qty < 20) { qty++; draw(); } };
    sheet.querySelector('#send').onclick = () => {
      const name = sheet.querySelector('#nm').value.trim() || 'Juan';
      const zone = sheet.querySelector('#zn').value;
      const tot = discounted(pr.price, qty), earn = earnFor(pr, tot);
      const id = '#' + p.code[0] + Math.random().toString(36).slice(2, 5).toUpperCase();
      const now = new Date(), hh = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      const msg = `Hola 👋 Quiero hacer un pedido:\n🛍️ ${qty} × ${pr.name}\n💰 Total: ${money(tot)} (código ${p.code}, −${S.discount} %)\n👤 ${name} · 📍 ${zone}\n🔖 Pedido ${id} · vía ${p.sub}.${S.domain}`;
      sheet.innerHTML = `
        <div class="grabber"></div>
        <div class="ok-title"><div class="tick">${ICON.check}</div><h2>¡Pedido enviado!</h2><p>Así le llega al vendedor por WhatsApp:</p></div>
        <div class="wa-chat">
          <div class="wa-head"><div class="av">🏪</div><div>${esc(pr.shop)}<small>Vendedor de Mercado Semu</small></div></div>
          <div class="bubble">${esc(msg)}<div class="t">${hh} ✓✓</div></div>
        </div>
        <div class="earn"><span class="big">💰</span><p><strong>${esc(first(p))} gana ${money(earn)}</strong><br>${pr.own ? 'Es su propio producto: cobra la venta entera (menos un 10 % para la plataforma).' : `Su comisión del ${pr.comm} %, cuando el vendedor marque el pedido como entregado.`}</p></div>
        <button class="btn btn-ghost" id="close">Seguir mirando</button>
        <p class="fine">Demostración: no se ha enviado nada.</p>`;
      sheet.querySelector('#close').onclick = closeSheet;
    };
    sheetWrap.classList.add('open');
    body.style.overflow = 'hidden';
  }
  function closeSheet() { if (sheetWrap) { sheetWrap.classList.remove('open'); body.style.overflow = ''; } }

  // ---------- Panel del influencer ----------
  function renderPanel() {
    const slug = HERE || new URLSearchParams(location.search).get('u') || 'katu';
    const p = INF[slug] || INF.katu;
    document.title = `Panel de ${p.name}`;
    const r = rng(slug);
    const DAYS = 30, today = new Date();
    // pedidos de ejemplo: los productos baratos se piden más
    const weights = p.products.map(x => 1 / Math.pow(x.price, 0.45));
    const wsum = weights.reduce((a, b) => a + b, 0);
    const pick = () => { let t = r() * wsum; for (let i = 0; i < weights.length; i++) { t -= weights[i]; if (t <= 0) return p.products[i]; } return p.products[0]; };
    const perDay = p.demoPerDay || 1.2;
    const names = ['María', 'Juan', 'Fátima', 'Pedro', 'Rosa', 'Santiago', 'Lucía', 'Antonio', 'Carmen', 'Diosdado', 'Elena', 'Bienvenido', 'Esperanza', 'Teodoro', 'Pilar'];
    const orders = [];
    for (let d = DAYS - 1; d >= 0; d--) {
      const n = Math.floor(perDay * (0.4 + r() * 1.3) + (r() < 0.3 ? 1 : 0));
      for (let k = 0; k < n; k++) {
        const pr = pick(), qty = r() < 0.8 ? 1 : 2, tot = discounted(pr.price, qty);
        const st = d === 0 ? (r() < 0.5 ? 'pend' : 'way') : d === 1 ? (r() < 0.5 ? 'way' : 'ok') : 'ok';
        orders.push({ d, pr, qty, tot, earn: earnFor(pr, tot), st, who: names[Math.floor(r() * names.length)], zone: ZONES[Math.floor(r() * 7)], id: '#' + p.code[0] + Math.floor(r() * 46655).toString(36).toUpperCase().padStart(3, '0') });
      }
    }
    const delivered = orders.filter(o => o.st === 'ok');
    const earned = delivered.reduce((a, o) => a + o.earn, 0);
    const pending = orders.filter(o => o.st !== 'ok');
    const visits = Math.round(orders.length * (38 + r() * 14));
    const clicks = Math.round(visits * (0.2 + r() * 0.06));
    const perDayEarn = Array.from({ length: DAYS }, (_, i) => delivered.filter(o => o.d === DAYS - 1 - i).reduce((a, o) => a + o.earn, 0));
    const maxDay = Math.max(...perDayEarn, 1);
    const dayLabel = i => { const dt = new Date(today); dt.setDate(today.getDate() - (DAYS - 1 - i)); return dt.getDate() + '/' + (dt.getMonth() + 1); };
    const byProd = p.products.map(pr => ({ pr, n: delivered.filter(o => o.pr === pr).reduce((a, o) => a + o.qty, 0) })).sort((a, b) => b.n - a.n);
    const maxN = Math.max(byProd[0].n, 1);
    const stLabel = { ok: 'Entregado', way: 'En camino', pend: 'Pendiente' };
    const mine = new Set(p.products.map(x => x.id));
    const catalog = Object.values(INF).flatMap(x => x.products).filter(x => !mine.has(x.id) && !x.own);
    const link = `${p.sub}.${S.domain}`;

    const switcher = Object.values(INF).map(x => `<a href="?u=${x.slug}" ${x.slug === slug ? 'aria-current="page"' : ''}><img src="${img(x.slug + '/avatar.jpg')}" alt="">${esc(x.name)}</a>`).join('');
    document.getElementById('app').innerHTML = `
    <header class="topbar"><a class="brand" href="${infoUrl()}"><img src="${img('logo.png')}" alt="">Panel del creador</a><span class="spacer"></span><span class="pill-demo">DEMO</span></header>
    <main class="panel">
      ${LIVE ? '' : `<nav class="switcher" aria-label="Cambiar de influencer">${switcher}</nav>`}
      <div class="p-top" style="margin-top:18px">
        <img class="av" src="${img(slug + '/avatar.jpg')}" alt="">
        <div><h1>Hola, ${esc(p.realName ? p.realName.split(' ')[0] : first(p))} 👋</h1><div class="sub">Tu panel · últimos 30 días</div></div>
        <div class="acts"><a class="btn btn-navy" href="${profileUrl(p)}">Ver mi página</a></div>
      </div>
      <div class="linkbox"><div class="u"><small>Tu link para la bio de Instagram, TikTok y Facebook</small>${link}</div><button id="copy">${ICON.copy} Copiar</button></div>
      <div class="kpis">
        <div class="kpi"><div class="l">Visitas a tu página</div><div class="v">${fmt(visits)}</div><div class="d">▲ ${12 + Math.floor(r() * 20)} % vs. mes anterior</div></div>
        <div class="kpi"><div class="l">Clics en «Pedir»</div><div class="v">${fmt(clicks)}</div><div class="d">${Math.round(clicks / visits * 100)} % de las visitas</div></div>
        <div class="kpi"><div class="l">Pedidos entregados</div><div class="v">${delivered.length}</div><div class="d">+${pending.length} en curso</div></div>
        <div class="kpi hl"><div class="l">Has ganado</div><div class="v">${fmt(earned)} <small>FCFA</small></div><div class="d">en comisiones</div></div>
      </div>
      <div class="p-cols">
        <section class="box">
          <h2>Ganancias por día</h2><p class="bs">Comisiones de pedidos entregados</p>
          <div class="bars">${perDayEarn.map((v, i) => `<i class="${i === DAYS - 1 ? 'today' : ''}" style="height:${Math.max(2, v / maxDay * 100)}%" title="${dayLabel(i)}: ${money(v)}"></i>`).join('')}</div>
          <div class="bars-x"><span>${dayLabel(0)}</span><span>${dayLabel(10)}</span><span>${dayLabel(20)}</span><span>Hoy</span></div>
        </section>
        <section class="box payout">
          <div><h2>Por cobrar</h2><div class="amt">${fmt(earned)} <small>FCFA</small></div></div>
          <div>
            <div class="row"><span>Próximo pago</span><b>1 de noviembre</b></div>
            <div class="row"><span>Cómo cobras</span><b>Transferencia o efectivo</b></div>
            <div class="row"><span>Pedidos aún en curso</span><b>${pending.length}</b></div>
          </div>
        </section>
      </div>
      <div class="p-cols">
        <section class="box">
          <h2>Últimos pedidos</h2><p class="bs">Cada pedido llega al vendedor con tu código ${p.code}</p>
          <table class="orders"><thead><tr><th>Pedido</th><th class="hide-sm">Cliente</th><th>Estado</th><th>Ganas</th></tr></thead><tbody>
          ${orders.slice(-8).reverse().map(o => `<tr><td><div class="pn">${esc(o.pr.name)}${o.qty > 1 ? ' ×' + o.qty : ''}</div><div class="pz">${o.id} · ${o.d === 0 ? 'hoy' : o.d === 1 ? 'ayer' : 'hace ' + o.d + ' días'}</div></td><td class="hide-sm">${o.who}<div class="pz">${o.zone}</div></td><td><span class="st ${o.st}">${stLabel[o.st]}</span></td><td><b>${money(o.earn)}</b></td></tr>`).join('')}
          </tbody></table>
        </section>
        <section class="box">
          <h2>Lo que más vendes</h2><p class="bs">Unidades entregadas</p>
          <div class="top-list">${byProd.map(x => `<div class="top-item"><img src="${prodImg(x.pr)}" alt=""><div class="tx"><div>${esc(x.pr.name)}</div><div class="meter"><i style="width:${x.n / maxN * 100}%"></i></div></div><span class="n">${x.n}</span></div>`).join('')}</div>
        </section>
      </div>
      <section class="box" style="margin-top:14px">
        <h2>Añade productos a tu página</h2><p class="bs">Catálogo de negocios de Mercado Semu que pagan comisión. Tú eliges qué recomendar.</p>
        <div class="cat-grid">
          <button class="cat add" id="own"><span class="plus">+</span>Subir mi propio producto o servicio</button>
          ${catalog.map(pr => `<div class="cat"><img loading="lazy" src="${prodImg(pr)}" alt=""><div class="cb"><div class="cn">${esc(pr.name)}</div><div class="cs">${esc(pr.shop)} · ${fmt(pr.price)} FCFA</div><div class="ce">Ganas ${money(earnFor(pr, discounted(pr.price, 1)))} por venta</div><button data-add>＋ Añadir</button></div></div>`).join('')}
        </div>
      </section>
      <p class="demo-note">Datos de ejemplo para la demostración.</p>
    </main>`;

    const cur = document.querySelector('.switcher [aria-current]'); if (cur) cur.parentNode.scrollLeft = cur.offsetLeft - 16;
    document.getElementById('copy').onclick = () => {
      const done = () => toast('Link copiado: ' + link);
      if (navigator.clipboard) navigator.clipboard.writeText('https://' + link).then(done, done); else done();
    };
    document.getElementById('own').onclick = () => toast('Demo: aquí subes foto, precio y descripción de tu producto');
    document.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
      const on = b.classList.toggle('on');
      b.textContent = on ? '✓ En tu página' : '＋ Añadir';
      if (on) toast('Añadido a tu página');
    });
  }

  // ---------- Portada ----------
  function renderHome() {
    const list = Object.values(INF).sort((x, y) => (y.slug === HERE) - (x.slug === HERE));
    // tarjetas de ejemplos
    const grid = document.getElementById('inf-grid');
    grid.innerHTML = list.map(p => `
      <article class="inf-card" style="--c:${p.theme.dark ? p.theme.bg : p.theme.accent}">
        <img src="${img(p.slug + '/hero.jpg')}" alt="" loading="lazy">
        <div class="in">
          <img class="av" src="${img(p.slug + '/avatar.jpg')}" alt="">
          <h3>${esc(p.name)}</h3>
          <div class="h">${p.sub}.${S.domain}</div>
          <div class="meta"><span>${p.followers} seguidores</span><span>${esc(p.niche.split(' · ')[0])}</span><span>Código ${p.code}</span></div>
          <div class="go"><a class="a1" href="${profileUrl(p)}">${p.slug === HERE ? 'Ver mi página' : 'Ver su página'}</a><a class="a2" href="${panelUrl(p)}">${p.slug === HERE ? 'Mi panel' : 'Su panel'}</a></div>
        </div>
      </article>`).join('');

    // móvil con la página en vivo
    const frame = document.getElementById('phone-frame');
    const tabs = document.getElementById('phone-tabs');
    tabs.innerHTML = list.map((p, i) => `<button aria-pressed="${i === 0}" data-slug="${p.slug}"><img src="${img(p.slug + '/avatar.jpg')}" alt="">${esc(p.name.split(' ')[0])}</button>`).join('');
    frame.src = profileUrl(list[0]);
    tabs.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      tabs.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      frame.src = profileUrl(INF[b.dataset.slug]);
    });

    // calculadora
    const els = ['seg', 'conv', 'ticket', 'com'].reduce((o, k) => (o[k] = document.getElementById(k), o), {});
    const calc = () => {
      const seg = +els.seg.value, conv = +els.conv.value, ticket = +els.ticket.value, com = +els.com.value;
      const sales = Math.round(seg * conv / 100);
      const month = sales * ticket * com / 100;
      document.getElementById('o-seg').textContent = fmt(seg);
      document.getElementById('o-conv').textContent = String(conv).replace('.', ',') + ' de cada 100';
      document.getElementById('o-ticket').textContent = money(ticket);
      document.getElementById('o-com').textContent = com + ' %';
      document.getElementById('r-money').textContent = money(month);
      document.getElementById('r-detail').textContent = `${fmt(sales)} ventas al mes × ${money(ticket * com / 100)} de comisión`;
      document.getElementById('r-year').textContent = money(month * 12);
    };
    Object.values(els).forEach(e => e.addEventListener('input', calc));
    calc();

    document.querySelectorAll('[data-contact]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); contact(INF[HERE] ? `Hola, soy ${first(INF[HERE])}. He visto mi página ${INF[HERE].sub}.${S.domain} y quiero saber más` : 'Hola, quiero mi página de creador en Mercado Semu'); }));
  }

  if (window.self !== window.top) document.documentElement.classList.add('embedded');
  const kind = body.dataset.page;
  if (kind === 'profile') renderProfile(body.dataset.slug);
  else if (kind === 'panel') renderPanel();
  else if (kind === 'home') renderHome();
})();
