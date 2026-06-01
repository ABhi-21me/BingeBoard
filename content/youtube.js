BBDetector.start({
  platform: "YouTube",
  getTitle() {
    if (!location.pathname.startsWith("/watch")) return null;
    const t = document.querySelector("h1.ytd-watch-metadata, h1.title");
    const raw = t?.innerText?.trim() || document.title.replace(" - YouTube", "").trim();
    return raw ? { title: raw } : null;
  }
});
