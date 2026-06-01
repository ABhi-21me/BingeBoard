BBDetector.start({
  platform: "Prime Video",
  getTitle() {
    if (!/\/(detail|gp\/video\/detail|video\/detail|gp\/video\/storefront)/.test(location.pathname) &&
        !location.pathname.includes("/detail/") && !location.search.includes("autoplay")) {
      // still try title fallback while watching
    }
    const t = document.querySelector("h1.atvwebplayersdk-title-text, .atvwebplayersdk-title-text");
    const sub = document.querySelector(".atvwebplayersdk-subtitle-text");
    if (t) return { title: t.innerText.trim(), episode: sub?.innerText?.trim() || null };
    const raw = document.title.replace(/ \| Prime Video.*/, "").trim();
    return raw && location.href.includes("video") ? { title: raw } : null;
  }
});
