const ZONE_CATALOG = [
  {
    label: "Ireland",
    country: "Ireland",
    standardName: "Irish Standard Time",
    abbreviation: "GMT/IST",
    zone: "Europe/Dublin",
    aliases: ["Dublin", "Irish Standard Time", "GMT/IST", "IST Ireland", "Ireland IST"]
  },
  {
    label: "India",
    country: "India",
    standardName: "India Standard Time",
    abbreviation: "IST",
    zone: "Asia/Kolkata",
    aliases: ["Kolkata", "Mumbai", "Delhi", "India Standard Time", "IST India"]
  },
  {
    label: "Pakistan",
    country: "Pakistan",
    standardName: "Pakistan Standard Time",
    abbreviation: "PKT",
    zone: "Asia/Karachi",
    aliases: ["Karachi", "Lahore", "Pakistan Standard Time", "PKT"]
  },
  {
    label: "Australia Western",
    country: "Australia",
    standardName: "Australian Western Standard Time",
    abbreviation: "AWST",
    zone: "Australia/Perth",
    aliases: ["Perth", "Western Australia", "Australian Western Standard Time", "AWST"]
  },
  {
    label: "Australia Eastern",
    country: "Australia",
    standardName: "Australian Eastern Standard Time",
    abbreviation: "AEST/AEDT",
    zone: "Australia/Sydney",
    aliases: ["Sydney", "Melbourne", "Australian Eastern Standard Time", "AEST", "AEDT"]
  },
  {
    label: "Australia Central",
    country: "Australia",
    standardName: "Australian Central Time",
    abbreviation: "ACST/ACDT",
    zone: "Australia/Adelaide",
    aliases: ["Adelaide", "Darwin", "Australian Central Time", "ACST", "ACDT"]
  },
  {
    label: "United States Central",
    country: "United States",
    standardName: "Central Time (US)",
    abbreviation: "CST/CDT",
    zone: "America/Chicago",
    aliases: ["Chicago", "Central Standard Time (US)", "Central Time (US)", "CST", "CDT", "Central Daylight Time (US)"]
  },
  {
    label: "United States Eastern",
    country: "United States",
    standardName: "Eastern Standard Time (US)",
    abbreviation: "EST/EDT",
    zone: "America/New_York",
    aliases: ["New York", "Columbia", "Eastern Standard Time (US)", "Eastern Time (US)", "EST", "EDT"]
  },
  {
    label: "Central Europe",
    country: "Central Europe",
    standardName: "Central European Time",
    abbreviation: "CET/CEST",
    zone: "Europe/Copenhagen",
    aliases: ["Copenhagen", "Berlin", "Paris", "Zurich", "Central European Time", "Central European Summer Time", "CET", "CEST", "CET/CEST"]
  },
  { label: "Singapore", country: "Singapore", standardName: "Singapore Standard Time", abbreviation: "SGT", zone: "Asia/Singapore", aliases: ["Singapore Standard Time", "SGT"] },
  { label: "Philippines", country: "Philippines", standardName: "Philippine Standard Time", abbreviation: "PHT", zone: "Asia/Manila", aliases: ["Manila", "Philippine Standard Time", "PHT"] },
  { label: "United Kingdom", country: "United Kingdom", standardName: "Greenwich Mean Time / British Summer Time", abbreviation: "GMT/BST", zone: "Europe/London", aliases: ["London", "GMT", "BST", "Greenwich Mean Time", "British Summer Time"] },
  { label: "Argentina", country: "Argentina", standardName: "Argentina Time", abbreviation: "ART", zone: "America/Argentina/Buenos_Aires", aliases: ["Buenos Aires", "Argentina Time", "ART"] },
  { label: "New Zealand", country: "New Zealand", standardName: "New Zealand Time", abbreviation: "NZST/NZDT", zone: "Pacific/Auckland", aliases: ["Auckland", "New Zealand Standard Time", "New Zealand Daylight Time", "NZST", "NZDT"] },
  { label: "Japan", country: "Japan", standardName: "Japan Standard Time", abbreviation: "JST", zone: "Asia/Tokyo", aliases: ["Tokyo", "Japan Standard Time", "JST"] },
  { label: "Hong Kong", country: "Hong Kong", standardName: "Hong Kong Time", abbreviation: "HKT", zone: "Asia/Hong_Kong", aliases: ["Hong Kong Time", "HKT"] },
  { label: "United Arab Emirates", country: "United Arab Emirates", standardName: "Gulf Standard Time", abbreviation: "GST", zone: "Asia/Dubai", aliases: ["Dubai", "Gulf Standard Time", "GST"] },
  { label: "United States Pacific", country: "United States", standardName: "Pacific Time (US)", abbreviation: "PST/PDT", zone: "America/Los_Angeles", aliases: ["Los Angeles", "Pacific Standard Time", "Pacific Daylight Time", "PST", "PDT"] },
  { label: "Canada Eastern", country: "Canada", standardName: "Eastern Time (Canada)", abbreviation: "EST/EDT", zone: "America/Toronto", aliases: ["Toronto", "Eastern Standard Time Canada", "Eastern Daylight Time Canada"] },
  { label: "Brazil", country: "Brazil", standardName: "Brasilia Time", abbreviation: "BRT", zone: "America/Sao_Paulo", aliases: ["Sao Paulo", "Sao Paolo", "Brasilia Time", "BRT"] },
  { label: "Mexico Central", country: "Mexico", standardName: "Central Standard Time (Mexico)", abbreviation: "CST", zone: "America/Mexico_City", aliases: ["Mexico City", "Central Standard Time Mexico"] },
  { label: "South Africa", country: "South Africa", standardName: "South Africa Standard Time", abbreviation: "SAST", zone: "Africa/Johannesburg", aliases: ["Johannesburg", "South Africa Standard Time", "SAST"] },
  { label: "Egypt", country: "Egypt", standardName: "Eastern European Time", abbreviation: "EET/EEST", zone: "Africa/Cairo", aliases: ["Cairo", "Eastern European Time", "EET", "EEST"] },
  { label: "Israel", country: "Israel", standardName: "Israel Time", abbreviation: "IST/IDT", zone: "Asia/Jerusalem", aliases: ["Tel Aviv", "Jerusalem", "Israel Standard Time", "Israel Daylight Time", "IST Israel", "IDT"] },
  { label: "South Korea", country: "South Korea", standardName: "Korea Standard Time", abbreviation: "KST", zone: "Asia/Seoul", aliases: ["Seoul", "Korea Standard Time", "KST"] },
  { label: "China", country: "China", standardName: "China Standard Time", abbreviation: "CST", zone: "Asia/Shanghai", aliases: ["Shanghai", "Beijing", "China Standard Time", "CST China"] },
  { label: "Thailand", country: "Thailand", standardName: "Indochina Time", abbreviation: "ICT", zone: "Asia/Bangkok", aliases: ["Bangkok", "Indochina Time", "ICT"] },
  { label: "Indonesia Western", country: "Indonesia", standardName: "Western Indonesia Time", abbreviation: "WIB", zone: "Asia/Jakarta", aliases: ["Jakarta", "Western Indonesia Time", "WIB"] }
];

const DEFAULT_STATE = {
  zones: ["Asia/Singapore", "Asia/Manila", "Europe/Copenhagen", "Australia/Sydney", "Asia/Kolkata", "Pacific/Auckland"],
  homeZone: "Asia/Singapore",
  hour24: false,
  theme: "light",
  selectedIndex: null
};

const STORAGE_KEY = "dms-world-clock-state";
const SLOT_COUNT = 48;
const SLOT_BACKTRACK = 8;
let state = loadState();
let hoverIndex = null;
let timer = null;
let searchIsActive = false;

const elements = {
  zoneSearch: document.querySelector("#zoneSearch"),
  zoneOptions: document.querySelector("#zoneOptions"),
  addZoneForm: document.querySelector("#addZoneForm"),
  themeToggle: document.querySelector("#themeToggle"),
  formatToggle: document.querySelector("#formatToggle"),
  sortEarly: document.querySelector("#sortEarly"),
  sortLate: document.querySelector("#sortLate"),
  copyLink: document.querySelector("#copyLink"),
  cetChangeNote: document.querySelector("#cetChangeNote"),
  selectedSummary: document.querySelector("#selectedSummary"),
  dateHeader: document.querySelector("#dateHeader"),
  clockRows: document.querySelector("#clockRows"),
  rowTemplate: document.querySelector("#rowTemplate")
};

function loadState() {
  const hashState = readHashState();
  if (hashState) {
    return hashState;
  }

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && Array.isArray(stored.zones)) {
      return normalizeState(stored);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { ...DEFAULT_STATE };
}

function normalizeState(input) {
  const knownZones = new Set(ZONE_CATALOG.map((item) => item.zone));
  const zones = [...new Set((input.zones || DEFAULT_STATE.zones).map(normalizeZoneName).filter((zone) => knownZones.has(zone)))];
  const nextZones = zones.length ? zones : [...DEFAULT_STATE.zones];
  const normalizedHomeZone = normalizeZoneName(input.homeZone);
  const homeZone = knownZones.has(normalizedHomeZone) ? normalizedHomeZone : nextZones[0];

  return {
    zones: nextZones,
    homeZone,
    hour24: Boolean(input.hour24),
    theme: input.theme === "dark" ? "dark" : "light",
    selectedIndex: Number.isInteger(input.selectedIndex) ? input.selectedIndex : null
  };
}

function normalizeZoneName(zoneName) {
  const legacyZoneMap = {
    "Europe/Berlin": "Europe/Copenhagen",
    "Europe/Paris": "Europe/Copenhagen",
    "Europe/Zurich": "Europe/Copenhagen",
    "Australia/Melbourne": "Australia/Sydney"
  };
  const zone = String(zoneName || "");
  if (zone.startsWith("Fixed/GMT") || zone.startsWith("Fixed/CET") || zone.startsWith("Etc/GMT")) {
    return DEFAULT_STATE.homeZone;
  }

  return legacyZoneMap[zone] || zoneName;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function readHashState() {
  if (!location.hash.startsWith("#view=")) {
    return null;
  }

  try {
    const decoded = JSON.parse(atob(decodeURIComponent(location.hash.slice(6))));
    return normalizeState(decoded);
  } catch {
    return null;
  }
}

function getZone(zoneName) {
  const normalizedZoneName = normalizeZoneName(zoneName);
  return ZONE_CATALOG.find((item) => item.zone === normalizedZoneName) || ZONE_CATALOG[0];
}

function formatDate(date, zone, options) {
  return new Intl.DateTimeFormat("en-US", { timeZone: zone, ...options }).format(date);
}

function getZoneParts(date, zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

function getOffsetMinutes(date, zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "shortOffset",
    hour: "2-digit"
  }).formatToParts(date);
  const offset = parts.find((part) => part.type === "timeZoneName")?.value || "GMT";
  const match = offset.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

  if (!match) {
    return 0;
  }

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
}

function getCurrentAbbreviation(date, zone) {
  const offsetMinutes = getOffsetMinutes(date, zone);
  const abbreviationByZone = {
    "Europe/Copenhagen": offsetMinutes === 120 ? "CEST" : "CET",
    "Europe/Dublin": offsetMinutes === 60 ? "IST" : "GMT",
    "Europe/London": offsetMinutes === 60 ? "BST" : "GMT",
    "America/Chicago": offsetMinutes === -300 ? "CDT" : "CST",
    "America/New_York": offsetMinutes === -240 ? "EDT" : "EST",
    "America/Los_Angeles": offsetMinutes === -420 ? "PDT" : "PST",
    "America/Toronto": offsetMinutes === -240 ? "EDT" : "EST",
    "Australia/Sydney": offsetMinutes === 660 ? "AEDT" : "AEST",
    "Australia/Adelaide": offsetMinutes === 630 ? "ACDT" : "ACST",
    "Africa/Cairo": offsetMinutes === 180 ? "EEST" : "EET",
    "Asia/Jerusalem": offsetMinutes === 180 ? "IDT" : "IST",
    "Pacific/Auckland": offsetMinutes === 780 ? "NZDT" : "NZST"
  };

  if (abbreviationByZone[zone]) {
    return abbreviationByZone[zone];
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "short",
    hour: "2-digit"
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value || getZone(zone).abbreviation || "";
}

function formatOffset(minutes, homeMinutes) {
  const delta = minutes - homeMinutes;
  const absolute = Math.abs(delta);
  const hours = Math.floor(absolute / 60);
  const mins = absolute % 60;
  const sign = delta === 0 ? "+0" : `${delta > 0 ? "+" : "-"}${hours}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
  const gmtSign = minutes >= 0 ? "+" : "-";
  const gmtHours = Math.floor(Math.abs(minutes) / 60);
  const gmtMinutes = Math.abs(minutes) % 60;
  const gmt = `GMT${gmtSign}${gmtHours}${gmtMinutes ? `:${String(gmtMinutes).padStart(2, "0")}` : ""}`;
  return `${sign} from home / ${gmt}`;
}

function buildSlots(now) {
  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() - SLOT_BACKTRACK);

  return Array.from({ length: SLOT_COUNT }, (_, index) => new Date(start.getTime() + index * 60 * 60 * 1000));
}

function formatHour(date, zone) {
  return formatDate(date, zone, {
    hour: "numeric",
    hour12: !state.hour24
  }).replace(/\s/g, "");
}

function getHourNumber(date, zone) {
  return Number(getZoneParts(date, zone).hour);
}

function classifyHour(hour) {
  if (hour < 6 || hour >= 22) {
    return "night";
  }
  if (hour >= 9 && hour < 18) {
    return "workday";
  }
  if (hour >= 18 && hour < 22) {
    return "late";
  }
  return "daytime";
}

function render({ force = false } = {}) {
  if (!force && searchIsActive) {
    return;
  }

  const now = new Date();
  const slots = buildSlots(now);
  const selectedIndex = hoverIndex ?? state.selectedIndex;

  renderControls();
  renderCetChangeNote(now);
  renderDateHeader(slots);
  renderRows(now, slots, selectedIndex);
  renderSelectedSummary(slots, selectedIndex);
}

function renderCetChangeNote(now) {
  if (!elements.cetChangeNote) {
    return;
  }

  const year = now.getFullYear();
  const startDate = getLastSundayOfMonth(year, 2);
  const endDate = getLastSundayOfMonth(year, 9);
  const nextChangeDate = now < startDate ? startDate : now < endDate ? endDate : getLastSundayOfMonth(year + 1, 2);
  const nextChangeLabel = nextChangeDate.getFullYear() === year ? "Next change this year" : "Next change";

  elements.cetChangeNote.innerHTML = `
    <strong>CET/CEST change dates for ${year}</strong>
    <span>
      <span class="cet-change-line">CEST starts on ${formatTransitionDate(startDate)} at 01:00 UTC (02:00 CET becomes 03:00 CEST).</span>
      <span class="cet-change-line">CET resumes on ${formatTransitionDate(endDate)} at 01:00 UTC (03:00 CEST becomes 02:00 CET).</span>
      <span class="cet-change-line">${nextChangeLabel}: ${formatTransitionDate(nextChangeDate)} at 01:00 UTC.</span>
    </span>
  `;
}

function getLastSundayOfMonth(year, monthIndex) {
  const date = new Date(Date.UTC(year, monthIndex + 1, 0, 1, 0, 0));
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date;
}

function formatTransitionDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function renderZoneOptions() {
  elements.zoneOptions.innerHTML = "";
  for (const zone of ZONE_CATALOG) {
    const option = document.createElement("option");
    option.value = getZoneOptionValue(zone);
    option.label = `${zone.country} - ${zone.standardName} (${zone.abbreviation})`;
    elements.zoneOptions.append(option);
  }
}

function getZoneOptionValue(zone) {
  const aliases = zone.aliases?.length ? ` / ${zone.aliases.join(" / ")}` : "";
  return `${zone.country} - ${zone.standardName} (${zone.abbreviation}) - ${zone.zone}${aliases}`;
}

function getExactSelectedZone(value) {
  return ZONE_CATALOG.find((zone) => getZoneOptionValue(zone) === value) || null;
}

function renderControls() {
  applyTheme();
  elements.themeToggle.textContent = state.theme === "dark" ? "Light" : "Dark";
  elements.themeToggle.setAttribute("aria-pressed", String(state.theme === "dark"));
  elements.formatToggle.textContent = state.hour24 ? "12" : "24";
  elements.formatToggle.setAttribute("aria-pressed", String(state.hour24));
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
}

function renderDateHeader(slots) {
  elements.dateHeader.innerHTML = "";
  for (const slot of slots) {
    const cell = document.createElement("div");
    cell.className = "date-cell";
    cell.textContent = formatDate(slot, state.homeZone, { weekday: "short", month: "short", day: "numeric" });
    elements.dateHeader.append(cell);
  }
}

function renderRows(now, slots, selectedIndex) {
  elements.clockRows.innerHTML = "";
  const homeOffset = getOffsetMinutes(now, state.homeZone);
  const currentSlotTime = new Date(now);
  currentSlotTime.setMinutes(0, 0, 0);

  for (const zoneName of state.zones) {
    const zone = getZone(zoneName);
    const row = elements.rowTemplate.content.firstElementChild.cloneNode(true);
    const locationCard = row.querySelector(".location-card");
    const hourGrid = row.querySelector(".hour-grid");
    const offset = getOffsetMinutes(now, zone.zone);

    locationCard.classList.toggle("is-home", zone.zone === state.homeZone);
    row.querySelector(".offset").textContent = formatOffset(offset, homeOffset);
    row.querySelector("h2").textContent = zone.label;
    row.querySelector(".zone-name").textContent = `${zone.standardName} / ${getCurrentAbbreviation(now, zone.zone)} / ${zone.zone}`;
    row.querySelector(".current-time").textContent = formatDate(now, zone.zone, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: !state.hour24
    });
    row.querySelector(".current-date").textContent = formatDate(now, zone.zone, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    row.querySelector(".home-action").addEventListener("click", () => setHome(zone.zone));
    row.querySelector(".up-action").addEventListener("click", () => moveZone(zone.zone, -1));
    row.querySelector(".down-action").addEventListener("click", () => moveZone(zone.zone, 1));
    row.querySelector(".remove-action").addEventListener("click", () => removeZone(zone.zone));

    slots.forEach((slot, index) => {
      const hour = getHourNumber(slot, zone.zone);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `hour-cell ${classifyHour(hour)}`;
      button.classList.toggle("is-now", slot.getTime() === currentSlotTime.getTime());
      button.classList.toggle("is-hovered", index === hoverIndex);
      button.classList.toggle("is-selected", index === state.selectedIndex && hoverIndex === null);
      button.innerHTML = `<span class="hour">${formatHour(slot, zone.zone)}</span><span class="day-label">${formatDate(slot, zone.zone, { weekday: "short" })}</span>`;
      button.addEventListener("mouseenter", () => {
        hoverIndex = index;
        renderSelectedSummary(slots, index);
        highlightIndex(index);
      });
      button.addEventListener("mouseleave", () => {
        hoverIndex = null;
        render();
      });
      button.addEventListener("click", () => {
        state.selectedIndex = index;
        persist();
        render();
      });
      hourGrid.append(button);
    });

    elements.clockRows.append(row);
  }
}

function renderSelectedSummary(slots, selectedIndex) {
  if (selectedIndex === null || !slots[selectedIndex]) {
    elements.selectedSummary.textContent = "Move over an hour tile";
    return;
  }

  const slot = slots[selectedIndex];
  const details = state.zones.map((zoneName) => {
    const zone = getZone(zoneName);
    const time = formatDate(slot, zone.zone, {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: !state.hour24
    });
    return `${zone.label}: ${time}`;
  });

  elements.selectedSummary.textContent = details.join(" | ");
}

function highlightIndex(index) {
  document.querySelectorAll(".hour-cell").forEach((cell, cellIndex) => {
    cell.classList.toggle("is-hovered", cellIndex % SLOT_COUNT === index);
  });
}

function addZone(value) {
  const normalized = value.trim().toLowerCase();
  const zone = findZone(normalized, value);

  if (!zone) {
    showToast("Choose a location from the list.");
    return;
  }

  if (!state.zones.includes(zone.zone)) {
    state.zones.push(zone.zone);
    persist();
  } else {
    showToast(`${zone.label} is already in the clock.`);
  }

  elements.zoneSearch.value = "";
  searchIsActive = false;
  render({ force: true });
}

function findZone(normalized, rawValue) {
  if (!normalized) {
    return null;
  }

  const exactSelectedZone = getExactSelectedZone(rawValue);
  if (exactSelectedZone) {
    return exactSelectedZone;
  }

  const exactAliasMatch = ZONE_CATALOG.find((item) =>
    item.aliases?.some((alias) => alias.toLowerCase() === normalized)
  );

  if (exactAliasMatch) {
    return exactAliasMatch;
  }

  return ZONE_CATALOG.find((item) => {
    const aliases = item.aliases?.join(" ") || "";
    const combined = `${item.label} ${item.country} ${item.zone} ${aliases}`.toLowerCase();
    return combined.includes(normalized) || rawValue.includes(item.zone);
  });
}

function removeZone(zone) {
  if (state.zones.length === 1) {
    showToast("Keep at least one location in the clock.");
    return;
  }

  state.zones = state.zones.filter((item) => item !== zone);
  if (state.homeZone === zone) {
    state.homeZone = state.zones[0];
  }
  persist();
  render();
}

function setHome(zone) {
  state.homeZone = zone;
  persist();
  render();
}

function moveZone(zone, direction) {
  const index = state.zones.indexOf(zone);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state.zones.length) {
    return;
  }

  const zones = [...state.zones];
  zones.splice(index, 1);
  zones.splice(nextIndex, 0, zone);
  state.zones = zones;
  persist();
  render();
}

function sortZones(direction) {
  const now = new Date();
  state.zones = [...state.zones].sort((a, b) => direction * (getOffsetMinutes(now, a) - getOffsetMinutes(now, b)));
  persist();
  render();
}

function copyViewLink() {
  const payload = btoa(JSON.stringify(state));
  const url = `${location.href.split("#")[0]}#view=${encodeURIComponent(payload)}`;

  if (navigator.clipboard && location.protocol !== "file:") {
    navigator.clipboard.writeText(url).then(() => showToast("Setup link copied."));
    return;
  }

  window.prompt("Copy this setup link", url);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "status-toast";
  toast.textContent = message;
  document.body.append(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

function bindEvents() {
  elements.addZoneForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addZone(elements.zoneSearch.value);
  });

  elements.zoneSearch.addEventListener("focus", () => {
    searchIsActive = true;
  });

  elements.zoneSearch.addEventListener("blur", () => {
    window.setTimeout(() => {
      searchIsActive = false;
      render({ force: true });
    }, 150);
  });

  elements.zoneSearch.addEventListener("change", () => {
    if (getExactSelectedZone(elements.zoneSearch.value)) {
      addZone(elements.zoneSearch.value);
    }
  });

  elements.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    persist();
    render();
  });

  elements.formatToggle.addEventListener("click", () => {
    state.hour24 = !state.hour24;
    persist();
    render();
  });

  elements.sortEarly.addEventListener("click", () => sortZones(1));
  elements.sortLate.addEventListener("click", () => sortZones(-1));
  elements.copyLink.addEventListener("click", copyViewLink);
}

function startClock() {
  window.clearInterval(timer);
  timer = window.setInterval(render, 1000);
  renderZoneOptions();
  render();
}

bindEvents();
startClock();
