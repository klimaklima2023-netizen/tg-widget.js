(function() {
    if (window.__tg_init__) return;
    window.__tg_init__ = true;

    const initWidget = () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const tgLink = "https://t.me";

        const style = document.createElement('style');
        style.innerHTML = `
            #tg-widget { position: fixed; right: 14px; bottom: 14px; z-index: 2147483647; font-family: Arial, sans-serif; opacity: 0; transform: translateY(20px); transition: .4s ease; display: none; }
            #tg-widget.show { display: block; opacity: 1; transform: translateY(0); }
            #tg-bubble { width: 72px; height: 72px; position: relative; cursor: pointer; }
            #tg-v { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; position: absolute; z-index: 2; background: #229ED9; }
            #ring { position: absolute; width: 80px; height: 80px; top:-4px; left:-4px; transform:rotate(-90deg); z-index: 3; pointer-events: none; }
            #tg-progress { stroke: #fff; stroke-dasharray: 289; stroke-dashoffset: 289; fill: none; stroke-width: 3; }
            #online { position: absolute; bottom: 4px; right: 4px; width: 10px; height: 10px; background:#00c853; border-radius: 50%; box-shadow: 0 0 0 2px #fff; z-index: 5; }
            #panel { position: absolute; right: 86px; top: 8px; width: 260px; height: 60px; background: #fff; border-radius: 12px; padding: 10px 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); display: flex; align-items: center; }
            #text-field { font-size: 14px; line-height: 1.3; color: #333; }
            #close-btn { position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; background: #000; color: #fff; border-radius: 50%; text-align: center; line-height: 20px; cursor: pointer; z-index: 100; font-size: 14px; }
            #tg-fb { position: fixed; right: 16px; bottom: 16px; background: #229ED9; color: #fff; text-decoration: none; font-size: 13px; font-weight: 500; box-shadow: 0 6px 18px rgba(0,0,0,0.18); z-index: 2147483646; display: none; align-items: center; justify-content: center; overflow: hidden; white-space: nowrap; height: 48px; min-width: 48px; padding: 0 12px; border-radius: 24px; transition: all 0.5s ease; opacity: 0; }
            #tg-fb.show { display: flex; opacity: 1; }
            #tg-fb.circle { width: 48px; padding: 0 !important; }
            #tg-fb img { width: 24px; min-width: 24px; filter: brightness(0) invert(1); }
            #tg-fb.circle img { margin: 0 !important; }
            #tg-fb.circle span { display: none; }
            @media (hover: hover) { #tg-fb.circle:hover { width: 185px; padding: 0 12px !important; } #tg-fb.circle:hover img { margin-right: 8px !important; } #tg-fb.circle:hover span { display: inline; margin-left: 8px; } }
        `;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = `
            <div id="tg-widget">
                <div id="tg-bubble">
                    ${!isMobile ? '<video id="tg-v" muted autoplay loop playsinline preload="auto"><source src="https://videotourl.com"></video>' : '<div style="width:72px;height:72px;border-radius:50%;background:#229ED9;display:flex;align-items:center;justify-content:center;position:absolute;z-index:2;"><img src="https://wikimedia.org" style="width:32px;filter:invert(1)"></div>'}
                    <svg id="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3"></circle><circle id="tg-progress" cx="50" cy="50" r="46" fill="none"></circle></svg>
                    <div id="online"></div>
                    <div id="panel"><div id="text-field"></div></div>
                    <div id="close-btn">×</div>
                </div>
            </div>
            <a id="tg-fb" href="${tgLink}" target="_blank"><img src="https://wikimedia.org"><span>Написать в Telegram</span></a>
        `;
        document.body.appendChild(container);

        const w = document.getElementById('tg-widget');
        const fb = document.getElementById('tg-fb');

        const showWidget = () => {
            if (localStorage.getItem('tg_closed')) return;
            w.style.display = 'block';
            setTimeout(() => {
                w.classList.add('show');
                const v = document.getElementById('tg-v');
                if (v) v.play().catch(() => {});
                typeText();
            }, 100);
        };

        const typeText = () => {
            const msgs = ["Подскажем материал","Выберем затирку","⚡ Пишите нам в TG"];
            let idx = 0;
            const field = document.getElementById('text-field');
            const run = () => {
                if (idx >= msgs.length || localStorage.getItem('tg_closed')) return;
                let i = 0;
                const timer = setInterval(() => {
                    field.textContent = msgs[idx].slice(0, i); i++;
                    if (i > msgs[idx].length) { clearInterval(timer); idx++; setTimeout(run, 2000); }
                }, 50);
            };
            run();
        };

        const close = () => {
            localStorage.setItem('tg_closed', '1');
            w.classList.remove('show');
            setTimeout(() => { w.style.display = 'none'; fb.classList.add('show'); setTimeout(() => fb.classList.add('circle'), 100); }, 500);
        };

        if (localStorage.getItem('tg_closed')) {
            fb.classList.add('show', 'circle');
        } else {
            window.addEventListener('scroll', () => { if (window.scrollY > 300) showWidget(); }, {once: true, passive: true});
            setTimeout(showWidget, 10000); // 10 секунд задержки для Chrome
        }

        document.getElementById('tg-bubble').onclick = (e) => { if(e.target.id !== 'close-btn') window.open(tgLink,"_blank"); };
        document.getElementById('close-btn').onclick = (e) => { e.stopPropagation(); close(); };
    };

    // ЗАПУСК ТОЛЬКО ПОСЛЕ ЗАГРУЗКИ ВСЕЙ СТРАНИЦЫ
    if (document.readyState === 'complete') {
        initWidget();
    } else {
        window.addEventListener('load', initWidget);
    }
})();
