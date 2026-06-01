BBDetector.start({
  platform: "Hotstar",
  getTitle() {
    const t = document.querySelector('[data-testid="title"]') || document.querySelector(".player-title");
    if (t) return { title: t.innerText.trim() };
    const raw = document.title.replace(/ - Hotstar.*/, "").replace(/Watch /, "").trim();
    return raw ? { title: raw } : null;
  }
});
