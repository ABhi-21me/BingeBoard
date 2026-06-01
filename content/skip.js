// Skip Intro/Recap floating button
(function () {
  if (window.__BBSkipLoaded) return;
  window.__BBSkipLoaded = true;

  let btn = null;
  let accentColor = "#e8a020";
  let enabled = true;

  chrome.storage.local.get(["theme", "settings"], (data) => {
    if (data.theme?.accentColor) accentColor = data.theme.accentColor;
    if (data.settings && data.settings.skipIntroEnabled === false) enabled = false;
  });

  function ensureBtn() {
    if (btn) return btn;
    btn = document.createElement("button");
    btn.id = "bb-skip-btn";
    btn.textContent = "Skip ›";
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "90px",
      right: "40px",
      zIndex: 2147483647,
      padding: "12px 22px",
      borderRadius: "999px",
      border: "none",
      background: accentColor,
      color: "#000",
      fontFamily: "system-ui, sans-serif",
      fontWeight: "700",
      fontSize: "14px",
      letterSpacing: "0.05em",
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      display: "none",
      transition: "transform 0.2s, opacity 0.2s",
      opacity: "0"
    });
    document.body.appendChild(btn);
    return btn;
  }

  function findSkip() {
    const sel = [
      '[data-uia="player-skip-intro"]',
      '[data-uia="player-skip-recap"]',
      '[data-uia="player-skip-preview"]',
      "button.skip-intro",
      ".atvwebplayersdk-skipelement-button",
      ".ytp-ad-skip-button",
      ".ytp-skip-ad-button",
      'button[aria-label*="Skip"]',
      'button[title*="Skip"]'
    ];
    for (const s of sel) {
      const el = document.querySelector(s);
      if (el && el.offsetParent !== null) return el;
    }
    return null;
  }

  setInterval(() => {
    if (!enabled) return;
    const target = findSkip();
    const b = ensureBtn();
    if (target) {
      b.style.display = "block";
      requestAnimationFrame(() => { b.style.opacity = "1"; });
      b.onclick = () => {
        target.click();
        b.style.opacity = "0";
        setTimeout(() => (b.style.display = "none"), 200);
      };
    } else if (b) {
      b.style.opacity = "0";
      setTimeout(() => { if (!findSkip()) b.style.display = "none"; }, 300);
    }
  }, 1500);
})();
