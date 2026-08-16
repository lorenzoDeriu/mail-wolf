import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="landing-shell">
      <header className="site-header content-width">
        <Link className="brand-link" href="/" aria-label="Mail Wolf home">
          <BrandMark />
          <span>Mail Wolf</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety</a>
          <ThemeToggle />
          <Link className="nav-cta" href="/dashboard">Open demo</Link>
        </nav>
      </header>

      <section className="hero content-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Inbox decisions, made defensible</p>
          <h1 id="hero-title">
            Clear the clutter.<br />
            <em>Keep the story.</em>
          </h1>
          <p className="hero-lede">
            Mail Wolf sorts years of email into what is safe to clean, what
            deserves a second look, and what should stay—then shows its work
            before anything moves.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/dashboard">
              Try the review workspace <ArrowIcon />
            </Link>
            <a className="text-link" href="#how-it-works">See the method</a>
          </div>
          <p className="trust-line">
            <ShieldIcon /> No permanent deletes. Every batch can be undone.
          </p>
        </div>

        <div className="hero-ledger" aria-label="Example email classification">
          <div className="ledger-header">
            <div>
              <span className="ledger-kicker">Review 03</span>
              <h2>Old promotions</h2>
            </div>
            <span className="confidence">98% match</span>
          </div>
          <div className="ledger-rule" />
          <dl className="ledger-summary">
            <div><dt>Candidate emails</dt><dd>5,942</dd></div>
            <div><dt>Oldest</dt><dd>Mar 2017</dd></div>
            <div><dt>Protected</dt><dd>184</dd></div>
          </dl>
          <div className="mail-samples" aria-label="Representative examples">
            <article className="mail-sample">
              <span className="mail-sender">AIRLINE DEALS</span>
              <p>48 hours left: autumn fares</p>
              <time>Sep 2019</time>
            </article>
            <article className="mail-sample">
              <span className="mail-sender">DINING CLUB</span>
              <p>Your table is waiting — 20% off</p>
              <time>Nov 2021</time>
            </article>
            <article className="mail-sample protected-sample">
              <span className="mail-sender">AIRLINE RECEIPTS</span>
              <p>Booking confirmation · FCO–LHR</p>
              <span className="protected-note">Excluded · receipt</span>
            </article>
          </div>
          <div className="ledger-decision">
            <span className="decision-mark" aria-hidden="true">✓</span>
            <div>
              <strong>Suggested: move to Trash</strong>
              <p>Receipts, bookings, and attachments stay protected.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="method-section" id="how-it-works" aria-labelledby="method-title">
        <div className="content-width">
          <div className="section-intro">
            <p className="eyebrow">A careful kind of automation</p>
            <h2 id="method-title">Three passes. One decision at a time.</h2>
            <p>
              The algorithm handles volume. You keep the final say, with enough
              evidence to make it confidently.
            </p>
          </div>
          <ol className="method-list">
            <li>
              <span className="method-number">01</span>
              <div><h3>Understand</h3><p>Mail Wolf maps senders, dates, intent, attachments, and account signals without changing your mailbox.</p></div>
              <span className="method-output">Read-only scan</span>
            </li>
            <li>
              <span className="method-number">02</span>
              <div><h3>Explain</h3><p>Every group includes examples, confidence, and the rules that keep receipts or security messages out.</p></div>
              <span className="method-output">Human review</span>
            </li>
            <li>
              <span className="method-number">03</span>
              <div><h3>Act gently</h3><p>Approve in batches. Messages go to Trash first, and an audit record makes each action reversible.</p></div>
              <span className="method-output">Undo built in</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="safety-section content-width" id="safety" aria-labelledby="safety-title">
        <div className="safety-statement">
          <p className="eyebrow">The Mail Wolf promise</p>
          <h2 id="safety-title">Your inbox is not a black box.</h2>
        </div>
        <div className="safety-copy">
          <p>
            We designed the product around the uncomfortable truth of email
            cleanup: a false positive matters more than a thousand correct
            deletions. Ambiguity is surfaced, not hidden.
          </p>
          <ul>
            <li>Read-only until you approve a batch</li>
            <li>Specific exclusions shown before action</li>
            <li>Trash first, with a clear undo window</li>
          </ul>
        </div>
      </section>

      <section className="closing-section">
        <div className="content-width closing-inner">
          <div>
            <p className="eyebrow">The first pass takes minutes</p>
            <h2>Make room without losing history.</h2>
          </div>
          <Link className="button button-light" href="/dashboard">
            Explore with demo data <ArrowIcon />
          </Link>
        </div>
      </section>

      <footer className="site-footer content-width">
        <Link className="brand-link" href="/"><BrandMark /><span>Mail Wolf</span></Link>
        <p>Designed for careful people with crowded inboxes.</p>
        <p>© 2026 Mail Wolf</p>
      </footer>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M10 2.5 16 5v4.7c0 3.8-2.4 6.3-6 7.8-3.6-1.5-6-4-6-7.8V5l6-2.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="m7.2 9.8 1.8 1.8 3.8-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
