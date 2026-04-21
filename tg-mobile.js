(function() {
    if (window.__tg_mob_init) return;
    window.__tg_mob_init = true;

    const style = document.createElement('style');
    style.innerHTML = `
        #tg-m-btn {
            position: fixed; right: 16px; bottom: 16px; background: #229ED9;
            color: #fff; text-decoration: none; font-size: 13px; font-weight: 500;
            box-shadow: 0 6px 18px rgba(0,0,0,0.2); z-index: 2147483647;
            display: flex; align-items: center; justify-content: center;
            height: 48px; min-width: 48px; border-radius: 24px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0; transform: translateY(20px); padding: 0 14px;
            overflow: hidden; white-space: nowrap; font-family: Arial, sans-serif;
        }
        #tg-m-btn.show { opacity: 1; transform: translateY(0); }
        #tg-m-btn img { width: 24px; min-width: 24px; filter: brightness(0) invert(1); }
        #tg-m-btn span { margin-left: 8px; transition: opacity 0.3s; }
        #tg-m-btn.circle { width: 48px; padding: 0 !important; }
        #tg-m-btn.circle img { margin-right: 0 !important; }
        #tg-m-btn.circle span { display: none; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('a');
    btn.id = 'tg-m-btn';
    btn.href = 'https://t.me';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.innerHTML = '<img src="https://wikimedia.org"><span>Написать в Telegram</span>';
    document.body.appendChild(btn);

    const showBtn = () => {
        btn.classList.add('show');
        setTimeout(() => btn.classList.add('circle'), 7000);
    };

    if (document.readyState === 'complete') {
        setTimeout(showBtn, 3000);
    } else {
        window.addEventListener('load', () => setTimeout(showBtn, 3000));
    }
})();
