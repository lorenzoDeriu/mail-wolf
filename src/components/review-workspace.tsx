"use client";

import { useMemo, useState, type ReactNode } from "react";

type Decision = "trash" | "review" | "protect";
type EmailSample = { sender: string; subject: string; date: string; excluded?: string };
type ReviewGroup = {
  id: string;
  label: string;
  description: string;
  count: number;
  confidence: number;
  suggested: Decision;
  basis: string[];
  exclusions: string[];
  samples: EmailSample[];
};

const groups: ReviewGroup[] = [
  {
    id: "promotions",
    label: "Expired promotions",
    description: "Old offers, newsletters, and recommendations",
    count: 5942,
    confidence: 98,
    suggested: "trash",
    basis: ["Marketing intent", "Offer is expired", "No reply or star"],
    exclusions: ["Purchase receipts", "Travel bookings", "Messages with attachments"],
    samples: [
      { sender: "Airline Deals", subject: "48 hours left: autumn fares", date: "Sep 19, 2019" },
      { sender: "Dining Club", subject: "Your table is waiting — 20% off", date: "Nov 08, 2021" },
      { sender: "Airline Receipts", subject: "Booking confirmation · FCO–LHR", date: "Jan 14, 2020", excluded: "Receipt" },
    ],
  },
  {
    id: "social",
    label: "Social activity",
    description: "Recommendations, profile views, and routine alerts",
    count: 1307,
    confidence: 97,
    suggested: "trash",
    basis: ["Automated notification", "No direct message", "Older than 12 months"],
    exclusions: ["Direct messages", "Account recovery", "Messages you replied to"],
    samples: [
      { sender: "Professional Network", subject: "12 people viewed your profile", date: "Apr 02, 2022" },
      { sender: "Video Updates", subject: "A channel you follow posted", date: "Feb 11, 2023" },
      { sender: "Professional Network", subject: "Elena sent you a message", date: "Oct 04, 2021", excluded: "Direct message" },
    ],
  },
  {
    id: "orders",
    label: "Old orders",
    description: "Receipts, shipping notices, and completed purchases",
    count: 1419,
    confidence: 89,
    suggested: "review",
    basis: ["Completed transaction", "Older than 24 months", "No open delivery issue"],
    exclusions: ["High-value purchases", "Active warranties", "Tax-relevant receipts"],
    samples: [
      { sender: "Online Store", subject: "Your order has been delivered", date: "Jun 18, 2020" },
      { sender: "Print Marketplace", subject: "Receipt for order #1842", date: "Aug 07, 2021" },
      { sender: "Laptop Shop", subject: "Your 3-year protection plan", date: "Mar 12, 2024", excluded: "Active warranty" },
    ],
  },
  {
    id: "finance",
    label: "Financial records",
    description: "Statements, payment records, and bank messages",
    count: 2774,
    confidence: 96,
    suggested: "protect",
    basis: ["Financial sender", "Transaction language", "Possible audit value"],
    exclusions: ["Bank promotions", "Expired product offers", "Routine feature announcements"],
    samples: [
      { sender: "Payment Service", subject: "Receipt for your payment", date: "Dec 21, 2022" },
      { sender: "Your Bank", subject: "Your monthly statement is ready", date: "Jan 05, 2024" },
      { sender: "Your Bank", subject: "A new card with travel rewards", date: "May 18, 2021", excluded: "Promotion" },
    ],
  },
  {
    id: "security",
    label: "Security events",
    description: "Password changes, recovery, and routine logins",
    count: 537,
    confidence: 94,
    suggested: "review",
    basis: ["Security language", "Known account sender", "Mixed long-term value"],
    exclusions: ["Password changes", "Recovery events", "Suspicious activity alerts"],
    samples: [
      { sender: "Identity Service", subject: "New login from Safari on macOS", date: "Jul 12, 2020" },
      { sender: "Your Account", subject: "Your verification code is 842193", date: "Sep 01, 2021" },
      { sender: "Your Account", subject: "Your password was changed", date: "Feb 28, 2023", excluded: "Security history" },
    ],
  },
  {
    id: "attachments",
    label: "Meaningful attachments",
    description: "Documents, photos, tickets, and signed files",
    count: 991,
    confidence: 99,
    suggested: "protect",
    basis: ["Contains attachment", "Personal correspondence", "Hard to recreate"],
    exclusions: ["Calendar invites", "Tiny tracking images", "Duplicate automated PDFs"],
    samples: [
      { sender: "Marco R.", subject: "Photos from Sardinia", date: "Aug 23, 2018" },
      { sender: "Rental Agency", subject: "Signed lease agreement", date: "Mar 04, 2020" },
      { sender: "Event Platform", subject: "Calendar invitation", date: "Jan 09, 2019", excluded: "Expired invite" },
    ],
  },
];

const initialDecisions = Object.fromEntries(
  groups.map((group) => [group.id, group.suggested]),
) as Record<string, Decision>;
const numberFormatter = new Intl.NumberFormat("en-US");

export function ReviewWorkspace() {
  const [selectedId, setSelectedId] = useState(groups[0].id);
  const [decisions, setDecisions] = useState(initialDecisions);
  const [batchQueued, setBatchQueued] = useState(false);
  const selected = groups.find((group) => group.id === selectedId) ?? groups[0];
  const trashCount = useMemo(
    () => groups.reduce((total, group) => total + (decisions[group.id] === "trash" ? group.count : 0), 0),
    [decisions],
  );

  function updateDecision(id: string, decision: Decision) {
    setDecisions((current) => ({ ...current, [id]: decision }));
    setBatchQueued(false);
  }

  return (
    <div className="workspace-layout">
      <aside className="workspace-sidebar" aria-label="Mailbox navigation">
        <div className="account-block">
          <span className="account-mark">G</span>
          <div><strong>demo@gmail.com</strong><span>Last scan: just now</span></div>
        </div>
        <nav className="workspace-nav">
          <a className="active" href="#review"><ReviewIcon /> Review <span>6</span></a>
          <a href="#protected"><ShieldIcon /> Protected <span>3,765</span></a>
          <a href="#history"><HistoryIcon /> History</a>
        </nav>
        <div className="sidebar-note">
          <LockIcon />
          <p><strong>Demo mode</strong>No Gmail data is connected or changed.</p>
        </div>
      </aside>

      <section className="workspace-main" id="review" aria-labelledby="review-title">
        <div className="workspace-heading">
          <div>
            <p className="eyebrow">Classification review</p>
            <h1 id="review-title">Your first pass is ready.</h1>
            <p>Decide by group, inspect the evidence, then approve one reversible batch.</p>
          </div>
          <button className="button button-secondary rescan-button" type="button" onClick={() => setBatchQueued(false)}>
            <RefreshIcon /> Rescan demo
          </button>
        </div>

        <div className="scan-summary" aria-label="Scan summary">
          <div><span>Messages scanned</span><strong>21,378</strong></div>
          <div><span>Safe to clean</span><strong>{numberFormatter.format(trashCount)}</strong></div>
          <div><span>Needs a look</span><strong>1,956</strong></div>
          <div><span>Protected</span><strong>3,765</strong></div>
        </div>

        <div className="review-grid">
          <div className="group-panel">
            <div className="panel-heading">
              <div><span className="panel-index">01</span><h2>Review groups</h2></div>
              <span className="column-label">Decision</span>
            </div>
            <div className="group-list">
              {groups.map((group) => {
                const decision = decisions[group.id];
                return (
                  <button
                    className={`group-row ${selectedId === group.id ? "selected" : ""}`}
                    type="button"
                    key={group.id}
                    onClick={() => setSelectedId(group.id)}
                    aria-pressed={selectedId === group.id}
                  >
                    <span className={`decision-dot ${decision}`} aria-hidden="true" />
                    <span className="group-info"><strong>{group.label}</strong><span>{group.description}</span></span>
                    <span className="group-count">{numberFormatter.format(group.count)}</span>
                    <DecisionLabel decision={decision} />
                    <ChevronIcon />
                  </button>
                );
              })}
            </div>
            <p className="overlap-note">Counts are illustrative demo data. Groups do not overlap.</p>
          </div>

          <aside className="evidence-panel" aria-labelledby="evidence-title">
            <div className="evidence-topline">
              <span className="panel-index">02</span>
              <span className="confidence">{selected.confidence}% match</span>
            </div>
            <h2 id="evidence-title">{selected.label}</h2>
            <p className="evidence-description">{selected.description}</p>

            <div className="decision-control" aria-label={`Decision for ${selected.label}`}>
              <button className={decisions[selected.id] === "trash" ? "active trash" : ""} type="button" onClick={() => updateDecision(selected.id, "trash")}><TrashIcon /> Trash</button>
              <button className={decisions[selected.id] === "review" ? "active review" : ""} type="button" onClick={() => updateDecision(selected.id, "review")}><EyeIcon /> Review</button>
              <button className={decisions[selected.id] === "protect" ? "active protect" : ""} type="button" onClick={() => updateDecision(selected.id, "protect")}><ShieldIcon /> Keep</button>
            </div>

            <section className="evidence-section">
              <h3>Representative examples</h3>
              <div className="example-list">
                {selected.samples.map((sample) => (
                  <article className={sample.excluded ? "excluded" : ""} key={`${sample.sender}-${sample.subject}`}>
                    <span className="sender-initial">{sample.sender.charAt(0)}</span>
                    <div><strong>{sample.sender}</strong><p>{sample.subject}</p></div>
                    {sample.excluded ? <span className="excluded-label">Keep · {sample.excluded}</span> : <time>{sample.date}</time>}
                  </article>
                ))}
              </div>
            </section>

            <div className="reason-grid">
              <section><h3>Why it matched</h3><ul>{selected.basis.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h3>Always excluded</h3><ul>{selected.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></section>
            </div>
          </aside>
        </div>

        <div className={`approval-bar ${batchQueued ? "queued" : ""}`} aria-live="polite">
          {batchQueued ? (
            <>
              <span className="approval-icon"><CheckIcon /></span>
              <div><strong>{numberFormatter.format(trashCount)} demo messages queued for Trash</strong><p>No real mailbox was changed. In the live product, this stays undoable.</p></div>
              <button className="button button-undo" type="button" onClick={() => setBatchQueued(false)}>Undo</button>
            </>
          ) : (
            <>
              <span className="approval-icon"><TrashIcon /></span>
              <div><strong>{numberFormatter.format(trashCount)} messages staged</strong><p>Only groups marked “Trash” are included. Protected examples stay out.</p></div>
              <button className="button button-primary" type="button" onClick={() => trashCount > 0 && setBatchQueued(true)} disabled={trashCount === 0}>
                Approve demo batch <ArrowIcon />
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function DecisionLabel({ decision }: { decision: Decision }) {
  return <span className={`decision-label ${decision}`}>{decision === "protect" ? "Keep" : decision.charAt(0).toUpperCase() + decision.slice(1)}</span>;
}

type IconProps = { className?: string };
function Icon({ children, className = "" }: IconProps & { children: ReactNode }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}
function ReviewIcon(props: IconProps) { return <Icon {...props}><path d="M4 5h16M4 12h10M4 19h7" /><path d="m17 15 3 3-3 3" /></Icon>; }
function ShieldIcon(props: IconProps) { return <Icon {...props}><path d="M12 3 19 6v5.5c0 4.4-2.8 7.3-7 9-4.2-1.7-7-4.6-7-9V6l7-3Z" /><path d="m9 11.5 2 2 4-4" /></Icon>; }
function HistoryIcon(props: IconProps) { return <Icon {...props}><path d="M4.5 9A8 8 0 1 1 4 14" /><path d="M4.5 4v5h5M12 7v5l3 2" /></Icon>; }
function LockIcon(props: IconProps) { return <Icon {...props}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>; }
function RefreshIcon(props: IconProps) { return <Icon {...props}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M18.5 9a7 7 0 0 0-12-2M5.5 15a7 7 0 0 0 12 2" /></Icon>; }
function ChevronIcon(props: IconProps) { return <Icon {...props}><path d="m9 6 6 6-6 6" /></Icon>; }
function TrashIcon(props: IconProps) { return <Icon {...props}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></Icon>; }
function EyeIcon(props: IconProps) { return <Icon {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></Icon>; }
function CheckIcon(props: IconProps) { return <Icon {...props}><path d="m5 12 4.5 4.5L19 7" /></Icon>; }
function ArrowIcon(props: IconProps) { return <Icon {...props}><path d="M4 12h15M14 7l5 5-5 5" /></Icon>; }
