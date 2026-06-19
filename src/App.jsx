import { useEffect, useState, Component } from "react";
import { TABS, loadTechnology } from "./data";

// ── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("App render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 40px", maxWidth: 480, textAlign: "center", border: "1px solid rgba(248,113,113,0.3)" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>Something went wrong</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>
              {this.state.error?.message || "An unexpected error occurred."}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ background: "linear-gradient(90deg,#7c3aed,#2563eb)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Color palette — topics get colors by their index position ─────────────────
const COLOR_PALETTE = [
  { active: "#22d3ee", bg: "rgba(34,211,238,0.08)" },   // cyan
  { active: "#fb923c", bg: "rgba(251,146,60,0.08)" },   // orange
  { active: "#a78bfa", bg: "rgba(167,139,250,0.08)" },  // purple
  { active: "#f87171", bg: "rgba(248,113,113,0.08)" },  // red
  { active: "#818cf8", bg: "rgba(99,102,241,0.08)" },   // indigo
  { active: "#34d399", bg: "rgba(52,211,153,0.08)" },   // green
  { active: "#fbbf24", bg: "rgba(251,191,36,0.08)" },   // yellow
];

// Returns color for the active topic based on its index in the topics list
function getColor(topics, activeTopic) {
  const idx = topics.indexOf(activeTopic);
  return COLOR_PALETTE[(idx >= 0 ? idx : 0) % COLOR_PALETTE.length];
}

// ── Main component ────────────────────────────────────────────────────────────
function InterviewPrep() {
  const firstTab   = TABS[0];

  const [tab,      setTab]      = useState(firstTab);
  const [topic,    setTopic]    = useState("");
  const [openIdx,  setOpenIdx]  = useState(null);
  const [revealed, setRevealed] = useState({});
  const [search,   setSearch]   = useState("");
  const [dataByTab, setDataByTab] = useState({});
  const [loadingTab, setLoadingTab] = useState(firstTab);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadTabData() {
      if (dataByTab[tab]) {
        setLoadingTab((current) => (current === tab ? null : current));
        return;
      }

      setLoadingTab(tab);
      setLoadError(null);

      try {
        const loaded = await loadTechnology(tab);
        if (!active) return;

        setDataByTab((current) => ({ ...current, [tab]: loaded }));
        setLoadingTab((current) => (current === tab ? null : current));
      } catch (error) {
        if (!active) return;

        setLoadError(error);
        setLoadingTab((current) => (current === tab ? null : current));
      }
    }

    loadTabData();

    return () => {
      active = false;
    };
  }, [tab, dataByTab]);

  // Topics for the selected technology are loaded on demand with the tab data
  const currentData = dataByTab[tab] || {};
  const topics    = Object.keys(currentData);
  const safeTopic = topics.includes(topic) ? topic : topics[0];
  const lc        = getColor(topics, safeTopic);

  const allQuestions = currentData[safeTopic] || [];

  const query     = search.trim().toLowerCase();
  const questions = query
    ? allQuestions.filter((q) =>
        q.q?.toLowerCase().includes(query) ||
        q.a?.toLowerCase().includes(query) ||
        q.whyUse?.toLowerCase().includes(query) ||
        q.example?.toLowerCase().includes(query)
      )
    : allQuestions;

  const totalAll = Object.values(currentData || {}).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );
  const isLoadingCurrentTab = loadingTab === tab && topics.length === 0;

  const rkey        = (idx) => `${tab}-${safeTopic}-${idx}`;
  const toggle      = (idx) => setOpenIdx(openIdx === idx ? null : idx);
  const revealAnswer= (idx) => setRevealed((p) => ({ ...p, [rkey(idx)]: true }));

  const switchTab = (t) => {
    setTab(t);
    setTopic("");
    setOpenIdx(null);
    setSearch("");
  };

  const switchTopic = (tp) => {
    setTopic(tp);
    setOpenIdx(null);
    setSearch("");
  };

  useEffect(() => {
    if (topics.length === 0) {
      return;
    }

    if (!topic || !topics.includes(topic)) {
      setTopic(topics[0]);
    }
  }, [topic, topics]);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", padding: "28px 16px", color: "#e8e8f0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-block", background: "linear-gradient(90deg,#a78bfa,#60a5fa,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>
            Interview Prep
          </div>
          <div style={{ color: "#6b7280", fontSize: 13 }}>
            {TABS.join(" · ")} · Q&amp;A
          </div>
          <div style={{ marginTop: 6, color: "#4b5563", fontSize: 12 }}>
            {tab}: <span style={{ color: lc.active }}>{totalAll} questions</span>
          </div>
        </div>

        {/* Technology Tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{ padding: "8px 32px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s", background: tab === t ? "linear-gradient(90deg,#7c3aed,#2563eb)" : "rgba(255,255,255,0.06)", color: tab === t ? "#fff" : "#6b7280", boxShadow: tab === t ? "0 0 18px rgba(124,58,237,0.35)" : "none" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Topic Tabs */}
        <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {topics.length === 0 && loadingTab === tab ? (
            <div style={{ color: "#6b7280", fontSize: 12, padding: "6px 12px" }}>
              Loading topics...
            </div>
          ) : (
            topics.map((tp, i) => {
              const c      = COLOR_PALETTE[i % COLOR_PALETTE.length];
              const active = safeTopic === tp;
              const count  = currentData[tp]?.length || 0;
              return (
                <button
                  key={tp}
                  onClick={() => switchTopic(tp)}
                  style={{ padding: "6px 16px", borderRadius: 50, border: `1.5px solid ${active ? c.active : "rgba(255,255,255,0.1)"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, transition: "all 0.2s", background: active ? c.bg : "transparent", color: active ? c.active : "#6b7280", whiteSpace: "nowrap" }}
                >
                  {tp} <span style={{ opacity: 0.6 }}>({count})</span>
                </button>
              );
            })
          )}
        </div>

        {/* Search */}
        <div style={{ marginBottom: 18 }}>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
            placeholder="🔍  Search questions or answers..."
            style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "3px 14px", fontSize: 12, color: "#6b7280" }}>
            {questions.length} {search ? "results" : "questions"}
          </span>
        </div>

        {loadError && (
          <div style={{ textAlign: "center", color: "#fca5a5", marginBottom: 18, fontSize: 13 }}>
            Failed to load {tab}: {loadError.message}
          </div>
        )}

        {isLoadingCurrentTab ? (
          <div style={{ textAlign: "center", color: "#6b7280", padding: 40 }}>
            Loading {tab} questions...
          </div>
        ) : null}

        {/* Q&A List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {questions.length === 0 && !isLoadingCurrentTab && (
            <div style={{ textAlign: "center", color: "#4b5563", padding: 40 }}>
              No questions match your search.
            </div>
          )}
          {questions.map((item, idx) => {
            const isOpen      = openIdx === idx;
            const globalIdx   = allQuestions.indexOf(item);
            const displayIdx  = globalIdx >= 0 ? globalIdx : idx;
            const isRevealed  = revealed[rkey(displayIdx)];

            return (
              <div
                key={idx}
                style={{ background: "rgba(255,255,255,0.035)", borderRadius: 13, border: isOpen ? `1.5px solid ${lc.active}55` : "1.5px solid rgba(255,255,255,0.07)", overflow: "hidden", transition: "border 0.2s" }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(idx)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "15px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 11, flex: 1 }}>
                    <span style={{ minWidth: 24, height: 24, background: `linear-gradient(135deg,${lc.active}99,${lc.active}44)`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: lc.active, marginTop: 2, flexShrink: 0 }}>
                      {displayIdx + 1}
                    </span>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.5 }}>
                      {item.q}
                    </div>
                  </div>
                  <span style={{ color: lc.active, fontSize: 18, transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginTop: 3 }}>
                    +
                  </span>
                </button>

                {/* Answer panel */}
                {isOpen && (
                  <div style={{ padding: "0 18px 18px 53px" }}>
                    {!isRevealed ? (
                      <button
                        onClick={() => revealAnswer(displayIdx)}
                        style={{ background: `linear-gradient(90deg,${lc.active}cc,${lc.active}77)`, color: "#fff", border: "none", borderRadius: 7, padding: "7px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
                      >
                        Reveal Answer
                      </button>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                        {/* Answer */}
                        <div style={{ background: `${lc.active}0d`, borderLeft: `3px solid ${lc.active}88`, borderRadius: "0 9px 9px 0", padding: "13px 15px", fontSize: 13.5, lineHeight: 1.85, color: "#cbd5e1", whiteSpace: "pre-line" }}>
                          {item.a}
                        </div>

                        {/* Why Use It */}
                        {item.whyUse && (
                          <div style={{ background: "rgba(167,139,250,0.07)", borderLeft: "3px solid #a78bfa", borderRadius: "0 9px 9px 0", padding: "11px 14px" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.8px", marginBottom: 6, textTransform: "uppercase" }}>
                              💡 Why Use It
                            </div>
                            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#ddd6fe", whiteSpace: "pre-line" }}>
                              {item.whyUse}
                            </div>
                          </div>
                        )}

                        {/* Example */}
                        {item.example && (
                          <div style={{ background: "rgba(34,211,238,0.07)", borderLeft: "3px solid #22d3ee", borderRadius: "0 9px 9px 0", padding: "12px 14px" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#22d3ee", letterSpacing: "0.8px", marginBottom: 8, textTransform: "uppercase" }}>
                              Example
                            </div>
                            <pre style={{ margin: 0, color: "#dbeafe", fontSize: 12.5, lineHeight: 1.75, fontFamily: "'Fira Code', 'Consolas', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                              {item.example.trim()}
                            </pre>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 32, color: "#374151", fontSize: 11 }}>
          Click to expand · Reveal answer when ready · Search works across questions and answers
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <InterviewPrep />
    </ErrorBoundary>
  );
}
