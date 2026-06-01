BBDetector.start({
  platform: "JioCinema",
  getTitle() {
    const t = document.querySelector("h1, .player-title");
    const raw = t?.innerText?.trim() || document.title.replace(/ \| JioCinema.*/, "").trim();
    return raw && location.href.includes("watch") ? { title: raw } : null;
  }
});
