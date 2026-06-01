BBDetector.start({
  platform: "Netflix",
  getTitle() {
    if (!location.pathname.includes("/watch/")) return null;
    const t = document.querySelector('[data-uia="video-title"]');
    if (t) {
      const main = t.querySelector("h4")?.innerText || t.innerText.split("\n")[0];
      const ep = t.querySelector("span")?.innerText || "";
      return { title: main?.trim(), episode: ep?.trim() || null };
    }
    const raw = document.title.replace(" - Netflix", "").trim();
    return raw ? { title: raw } : null;
  }
});
