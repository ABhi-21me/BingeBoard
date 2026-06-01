// Shared detector. Each platform script defines window.__BB_PLATFORM_CONFIG and calls BBDetector.start()
(function () {
  if (window.__BBDetectorLoaded) return;
  window.__BBDetectorLoaded = true;

  let lastTitle = null;
  let lastTime = 0;

  function send(payload) {
    try {
      chrome.runtime.sendMessage({ type: "BB_LOG_WATCH", payload });
    } catch (e) {}
  }

  window.BBDetector = {
    start(config) {
      const tick = () => {
        try {
          const detected = config.getTitle();
          if (!detected || !detected.title) return;
          const key = `${detected.title}::${detected.episode || ""}`;
          const now = Date.now();
          if (key !== lastTitle || now - lastTime > 10 * 60 * 1000) {
            lastTitle = key;
            lastTime = now;
            send({
              title: detected.title,
              platform: config.platform,
              episode: detected.episode || null,
              duration: detected.duration || 0
            });
          }
        } catch (e) {}
      };
      setInterval(tick, 15000);
      setTimeout(tick, 4000);
    }
  };
})();
