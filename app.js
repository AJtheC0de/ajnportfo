import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import firebaseConfig from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const leadsRef = ref(db, "leads");

// ─── DATA ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = "leadflow_v1";
let leads = [];
let activeFilter = "all";
let deleteTargetId = null;

const STATUS_CONFIG = {
  Neu: { cls: "s-neu", label: "Neu", icon: "fa-circle" },
  "In Bearbeitung": {
    cls: "s-progress",
    label: "In Bearbeitung",
    icon: "fa-circle",
  },
  Kontaktiert: {
    cls: "s-contacted",
    label: "Kontaktiert",
    icon: "fa-circle",
  },
  "Warten auf Antwort": {
    cls: "s-waiting",
    label: "Warten",
    icon: "fa-circle",
  },
  Gewonnen: { cls: "s-won", label: "Gewonnen ✓", icon: "fa-circle" },
  Abgelehnt: { cls: "s-rejected", label: "Abgelehnt", icon: "fa-circle" },
};

const WS_CONFIG = {
  none: { cls: "ws-none", label: "—", icon: "fa-minus" },
  old: {
    cls: "ws-old",
    label: "Veraltete Website",
    icon: "fa-exclamation",
  },
  none2: { cls: "ws-none2", label: "Keine Website", icon: "fa-times" },
  modern: {
    cls: "ws-modern",
    label: "Moderne Website",
    icon: "fa-check",
  },
  build: { cls: "ws-build", label: "In Aufbau", icon: "fa-tools" },
};

// ─── SAVE / LOAD ─────────────────────────────────────────────────────────────
function updateLeadsFromSnapshot(data) {
  if (data && typeof data === "object") {
    leads = Array.isArray(data)
      ? data.filter(Boolean).map((item, idx) => ({ id: item.id || String(idx), ...item }))
      : Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
  } else {
    leads = [];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  render();
}

function loadLeads() {
  onValue(
    leadsRef,
    (snapshot) => {
      updateLeadsFromSnapshot(snapshot.val());
    },
    (error) => {
      console.warn("Firebase RTDB realtime listener failed", error);
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      leads = Array.isArray(stored) ? stored : [];
      render();
    },
  );
}

async function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  try {
    const payload = {};
    leads.forEach((lead) => {
      payload[lead.id] = lead;
    });
    await set(leadsRef, payload);
  } catch (err) {
    console.warn("Firebase RTDB save failed", err);
  }
}

// ─── RENDER ─────────────────────────────────────────────────────────────────
function render() {
  const filtered =
    activeFilter === "all"
      ? leads
      : leads.filter((l) => l.status === activeFilter);
  const grid = document.getElementById("leads-grid");
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<div id="empty-state"><i class="fa fa-inbox"></i><p>${activeFilter === "all" ? "Noch keine Leads. Füge deinen ersten hinzu!" : "Keine Leads in diesem Status."}</p></div>`;
  } else {
    filtered.forEach((lead, i) => {
      const card = buildCard(lead, i);
      grid.appendChild(card);
    });
  }

  updateStats();
  updateFilters();
  document.getElementById("subtitle").textContent =
    `${filtered.length} ${filtered.length === 1 ? "Eintrag" : "Einträge"}`;
}

function buildCard(lead, idx) {
  const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG["Neu"];
  const ws = WS_CONFIG[lead.website] || WS_CONFIG["none"];
  const date = lead.date
    ? new Date(lead.date).toLocaleDateString("de-CH")
    : "—";

  const card = document.createElement("div");
  card.className = "lead-card";
  card.style.animationDelay = `${idx * 0.04}s`;

  const noteHtml = lead.note
    ? `<div class="lead-note"><i class="fa fa-sticky-note" style="margin-right:5px;opacity:.4;font-size:.7rem"></i>${escHtml(lead.note)}</div>`
    : "";

  const mapsHtml = lead.maps
    ? `<a href="${escHtml(lead.maps)}" target="_blank" rel="noopener" title="In Google Maps öffnen"><i class="fa fa-map-marker-alt"></i> Maps</a>`
    : `<span>—</span>`;

  card.innerHTML = `
<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
  <span class="status-badge ${sc.cls}">${sc.label}</span>
  <span class="ws-badge ${ws.cls}"><i class="fa ${ws.icon}" style="font-size:.6rem"></i>${ws.label}</span>
</div>
<div class="lead-company" title="${escHtml(lead.company)}">${escHtml(lead.company)}</div>
<div class="lead-meta">${mapsHtml}</div>
<div class="lead-meta"><i class="fa fa-calendar-alt" style="width:12px;opacity:.4"></i>${date}</div>
${noteHtml}
<div class="card-actions">
  <button class="action-btn" onclick="editLead('${lead.id}')" data-tip="Bearbeiten"><i class="fa fa-pen"></i></button>
  <button class="action-btn del" onclick="confirmDelete('${lead.id}')" data-tip="Löschen"><i class="fa fa-trash"></i></button>
  <select class="status-select" onchange="quickStatus('${lead.id}', this.value)">
    ${Object.entries(STATUS_CONFIG)
      .map(
        ([k, v]) =>
          `<option value="${k}" ${k === lead.status ? "selected" : ""}>${v.label}</option>`,
      )
      .join("")}
  </select>
</div>
`;
  return card;
}

function escHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function updateStats() {
  const total = leads.length;
  const won = leads.filter((l) => l.status === "Gewonnen").length;
  const active = leads.filter(
    (l) => !["Gewonnen", "Abgelehnt"].includes(l.status),
  ).length;
  const conv = total > 0 ? Math.round((won / total) * 100) : 0;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-conversion").textContent = conv + "%";
  document.getElementById("stat-active").textContent = active;
}

function updateFilters() {
  const counts = { all: leads.length };
  Object.keys(STATUS_CONFIG).forEach(
    (s) => (counts[s] = leads.filter((l) => l.status === s).length),
  );

  document.getElementById("fc-all").textContent = counts.all;
  Object.keys(STATUS_CONFIG).forEach((s) => {
    const el = document.getElementById("fc-" + s);
    if (el) el.textContent = counts[s] || 0;
  });

  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById("filter-" + activeFilter);
  if (activeBtn) activeBtn.classList.add("active");
}

// ─── FILTER ──────────────────────────────────────────────────────────────────
function setFilter(f) {
  activeFilter = f;
  render();
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
function openModal(lead = null) {
  document.getElementById("modal-title").textContent = lead
    ? "Lead bearbeiten"
    : "Neuer Lead";
  document.getElementById("f-company").value = lead?.company || "";
  document.getElementById("f-maps").value = lead?.maps || "";
  document.getElementById("f-website").value = lead?.website || "none";
  document.getElementById("f-status").value = lead?.status || "Neu";
  document.getElementById("f-note").value = lead?.note || "";
  document.getElementById("f-id").value = lead?.id || "";
  document.getElementById("f-date").value =
    lead?.date || new Date().toISOString();

  document.getElementById("modal-overlay").classList.add("open");
  setTimeout(() => document.getElementById("f-company").focus(), 100);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

function overlayClick(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}

function editLead(id) {
  const lead = leads.find((l) => l.id === id);
  if (lead) openModal(lead);
}

async function saveLead() {
  const company = document.getElementById("f-company").value.trim();
  if (!company) {
    document.getElementById("f-company").style.borderColor = "var(--red)";
    document.getElementById("f-company").focus();
    setTimeout(
      () => (document.getElementById("f-company").style.borderColor = ""),
      1500,
    );
    return;
  }

  const id = document.getElementById("f-id").value || crypto.randomUUID();
  const existing = leads.findIndex((l) => l.id === id);

  const lead = {
    id,
    company,
    maps: document.getElementById("f-maps").value.trim(),
    website: document.getElementById("f-website").value,
    status: document.getElementById("f-status").value,
    note: document.getElementById("f-note").value.trim(),
    date:
      document.getElementById("f-date").value || new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  if (existing >= 0) leads[existing] = lead;
  else leads.unshift(lead);

  await persist();
  closeModal();
  render();
}

// ─── DELETE ──────────────────────────────────────────────────────────────────
function confirmDelete(id) {
  deleteTargetId = id;
  document.getElementById("delete-confirm").classList.add("open");
}

function closeDelete() {
  deleteTargetId = null;
  document.getElementById("delete-confirm").classList.remove("open");
}

document.getElementById("btn-del-yes").onclick = async () => {
  if (deleteTargetId) {
    leads = leads.filter((l) => l.id !== deleteTargetId);
    await persist();
    render();
  }
  closeDelete();
};

// ─── QUICK STATUS ────────────────────────────────────────────────────────────
async function quickStatus(id, status) {
  const lead = leads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    await persist();
    render();
  }
}

// ─── CSV EXPORT ──────────────────────────────────────────────────────────────
function exportCSV() {
  if (leads.length === 0) return;
  const header = [
    "Firmenname",
    "Status",
    "Website-Status",
    "Maps-Link",
    "Vorschau/Notiz",
    "Erstellt",
  ];
  const rows = leads.map((l) =>
    [
      l.company,
      l.status,
      WS_CONFIG[l.website]?.label || "—",
      l.maps || "",
      (l.note || "").replace(/\n/g, " "),
      l.date ? new Date(l.date).toLocaleDateString("de-CH") : "",
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [header.join(","), ...rows].join("\n");
  const a = document.createElement("a");
  a.href =
    "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csv);
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

// ─── KEYBOARD ────────────────────────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeDelete();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
    if (document.getElementById("modal-overlay").classList.contains("open"))
      saveLead();
  }
});
// ─── HOOKS FÜR HTML INLINE-EVENTS ─────────────────────────────────────────────
window.openModal = openModal;
window.overlayClick = overlayClick;
window.saveLead = saveLead;
window.setFilter = setFilter;
window.confirmDelete = confirmDelete;
window.closeDelete = closeDelete;
window.quickStatus = quickStatus;
window.exportCSV = exportCSV;
window.editLead = editLead;
// ─── INIT ────────────────────────────────────────────────────────────────────
loadLeads();
