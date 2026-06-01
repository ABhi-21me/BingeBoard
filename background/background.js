// BingeBoard background service worker
const DEFAULT_DATA = {
  watches: [],
  watchlist: [],
  streaks: { current: 0, longest: 0, lastWatchDate: null },
  badges: [],
  theme: { preset: "cinema", accentColor: "" },
  pinnedPlatforms: [
    { name: "Netflix", url: "https://netflix.com", color: "#e50914" },
    { name: "Prime Video", url: "https://primevideo.com", color: "#00a8e1" },
    { name: "Hotstar", url: "https://hotstar.com", color: "#1f80e0" },
    { name: "YouTube", url: "https://youtube.com", color: "#ff0000" },
    { name: "JioCinema", url: "https://jiocinema.com", color: "#ff2d6f" }
  ],
  dailyPick: { title: null, date: null },
  settings: {
    dockEnabled: true,
    skipIntroEnabled: true,
    enabledPlatforms: ["netflix", "prime", "hotstar", "youtube", "jiocinema"],
    tmdbKey: ""
  }
};

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.local.get(null);
  const merged = { ...DEFAULT_DATA, ...stored };
  await chrome.storage.local.set(merged);

  chrome.contextMenus.create({
    id: "bb-add-watchlist",
    title: "Add to BingeBoard Watchlist",
    contexts: ["page", "selection", "link"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "bb-add-watchlist") return;
  const title = info.selectionText || tab?.title || "Untitled";
  const clean = title.replace(/ - (Netflix|Prime Video|Hotstar|YouTube|JioCinema).*/i, "").trim();
  const platform = detectPlatformFromUrl(tab?.url || "");
  const { watchlist = [] } = await chrome.storage.local.get("watchlist");
  if (!watchlist.find(w => w.title.toLowerCase() === clean.toLowerCase())) {
    watchlist.unshift({
      title: clean,
      status: "want",
      notes: "",
      genre: "",
      platform,
      addedDate: new Date().toISOString(),
      poster: ""
    });
    await chrome.storage.local.set({ watchlist });
  }
});

function detectPlatformFromUrl(url) {
  if (url.includes("netflix")) return "Netflix";
  if (url.includes("primevideo") || url.includes("amazon")) return "Prime Video";
  if (url.includes("hotstar")) return "Hotstar";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("jiocinema")) return "JioCinema";
  return "Other";
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "BB_LOG_WATCH") {
    logWatch(msg.payload).then(() => sendResponse({ ok: true }));
    return true;
  }
});

async function logWatch(payload) {
  const { watches = [], streaks = { current: 0, longest: 0, lastWatchDate: null } } =
    await chrome.storage.local.get(["watches", "streaks"]);

  const today = new Date().toISOString().slice(0, 10);
  const last = watches[0];
  if (last && last.title === payload.title && last.platform === payload.platform &&
      last.date.slice(0, 10) === today && last.episode === payload.episode) {
    return;
  }
  watches.unshift({
    title: payload.title,
    platform: payload.platform,
    date: new Date().toISOString(),
    episode: payload.episode || null,
    duration: payload.duration || 0
  });
  // update streak
  const lastDate = streaks.lastWatchDate ? streaks.lastWatchDate.slice(0, 10) : null;
  if (lastDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (lastDate === yesterday) streaks.current += 1;
    else streaks.current = 1;
    streaks.lastWatchDate = new Date().toISOString();
    if (streaks.current > streaks.longest) streaks.longest = streaks.current;
  }

  await chrome.storage.local.set({ watches: watches.slice(0, 500), streaks });
  await evaluateBadges();
}

async function evaluateBadges() {
  const { watches = [], watchlist = [], badges = [], streaks = {} } =
    await chrome.storage.local.get(["watches", "watchlist", "badges", "streaks"]);

  const unlocked = new Set(badges.map(b => b.id));
  const add = (id) => {
    if (!unlocked.has(id)) badges.push({ id, unlockedDate: new Date().toISOString() });
  };

  // Night owl
  if (watches.some(w => { const h = new Date(w.date).getHours(); return h >= 0 && h < 5; })) add("night-owl");

  // Marathon: 4+ hours single day
  const dayMap = {};
  watches.forEach(w => {
    const d = w.date.slice(0, 10);
    dayMap[d] = (dayMap[d] || 0) + (w.duration || 45);
  });
  if (Object.values(dayMap).some(m => m >= 240)) add("marathon");

  // Binge beast
  if ((streaks.longest || 0) >= 7) add("binge-beast");

  // Ghost watcher
  if (watchlist.length >= 10 && watches.length === 0) add("ghost-watcher");

  // Genre badges (count completed by genre)
  const genreCount = {};
  watchlist.filter(w => w.status === "completed").forEach(w => {
    const g = (w.genre || "").toLowerCase();
    if (!g) return;
    genreCount[g] = (genreCount[g] || 0) + 1;
  });
  if ((genreCount["horror"] || 0) >= 3) add("horror-addict");
  if ((genreCount["romance"] || 0) >= 3 || (genreCount["romcom"] || 0) >= 3) add("romcom-veteran");
  if ((genreCount["documentary"] || 0) >= 3) add("doc-lover");
  if ((genreCount["thriller"] || 0) >= 3) add("thriller-junkie");
  if ((genreCount["anime"] || 0) >= 3) add("anime-head");

  await chrome.storage.local.set({ badges });
}
