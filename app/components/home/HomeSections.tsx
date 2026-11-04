import Image from "next/image";
import type { ReactNode } from "react";
import { faqs, navigation, projects } from "./home-content";
import styles from "./home.module.css";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Label({ children }: { children: ReactNode }) {
  return (
    <p className={styles.label}>
      <span aria-hidden="true">//</span> {children}
    </p>
  );
}

export default function HomeSections() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBadge}>
          <span /> YOUR AMBITION. OUR NEXT BUILD.
        </div>
        <h1 id="hero-title">
          The tech partner for
          <br />
          your <span>next chapter.</span>
          <svg
            className={styles.spark}
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 1v46M1 24h46M8 8l32 32M8 40 40 8"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </h1>
        <p>
          Big ideas deserve more than a backlog. We bring strategy,
          <br className={styles.desktopBreak} /> design, and engineering
          together to move your business forward.
        </p>
        <a className={styles.button} href="#contact">
          Let’s build what’s next <Arrow />
        </a>
        <div className={styles.heroNote}>
          <span className={styles.availability} /> A small team. A shared
          ambition. Something better.
        </div>
        <div className={styles.partnerStrip}>
          <p>FOR THE PEOPLE MOVING BUSINESS FORWARD</p>
          <div>
            <span className={styles.partnerSerif}>Founders.</span>
            <span>↗ operators</span>
            <span className={styles.partnerMono}>[ builders ]</span>
            <span className={styles.partnerSerif}>visionaries</span>
            <span>✳ changemakers</span>
          </div>
        </div>
      </section>

      <section
        id="work"
        className={styles.section}
        aria-labelledby="work-title"
      >
        <Label>Ideas into impact</Label>
        <div className={styles.sectionHeading}>
          <h2 id="work-title">
            Good technology.
            <br />
            <span>Real possibilities.</span>
          </h2>
          <p>
            A glimpse of what we can build together.
            <br />
            Three concepts. Countless ways forward.
          </p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <article key={project.name} className={styles.project}>
              <div
                className={`${styles.projectVisual} ${styles[project.color]}`}
              >
                <span className={styles.projectNumber}>
                  0{index + 1} / CONCEPT
                </span>
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={720}
                  height={540}
                  className={styles.projectImage}
                />
                <span className={styles.projectTag}>{project.type}</span>
              </div>
              <p className={styles.projectCategory}>{project.category}</p>
              <h3>{project.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.problem} aria-labelledby="problem-title">
        <div className={styles.container}>
          <Label>A familiar problem</Label>
          <h2 id="problem-title">
            Your business doesn’t fit in a box.
            <br />
            <span>Your software shouldn’t either.</span>
          </h2>
          <p>
            Too many tools. Too many workarounds. Too much time spent joining
            the dots.
            <br className={styles.desktopBreak} /> There’s a better way to work.
            Let’s build it around you.
          </p>
          <span className={styles.problemAsterisk} aria-hidden="true">
            ✳
          </span>
        </div>
      </section>

      <section
        id="services"
        className={styles.section}
        aria-labelledby="services-title"
      >
        <Label>What we do</Label>
        <div className={styles.sectionHeading}>
          <h2 id="services-title">
            Built for your business.
            <br />
            <span>Ready for what’s next.</span>
          </h2>
          <p>
            From the first “what if” to the next release.
            <br />
            One partner to connect it all.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.service}>
            <div className={styles.serviceTop}>
              <span>01</span>
              <Arrow />
            </div>
            <h3>Digital products</h3>
            <div className={styles.productDemo} aria-hidden="true">
              <div>
                <span className={styles.appIcon}>f</span>
                <span>
                  Your next big thing<small>Made for real people.</small>
                </span>
                <b>LIVE</b>
              </div>
              <div className={styles.metric}>
                <span>
                  Active users
                  <strong>
                    2,400 <em>↗ 24%</em>
                  </strong>
                </span>
                <span className={styles.bars}>
                  {[25, 38, 31, 52, 42, 66, 80, 92].map((height, i) => (
                    <i key={i} style={{ height }} />
                  ))}
                </span>
              </div>
            </div>
            <h4>From idea to everyday essential.</h4>
            <p>
              Customer experiences, SaaS platforms, and apps that make something
              complicated feel effortless.
            </p>
            <div className={styles.tags}>
              <span>Web & mobile</span>
              <span>MVPs</span>
              <span>SaaS</span>
            </div>
          </article>
          <article className={styles.service}>
            <div className={styles.serviceTop}>
              <span>02</span>
              <Arrow />
            </div>
            <h3>Internal platforms</h3>
            <div className={styles.workflowDemo} aria-hidden="true">
              <span>Scattered tools</span>
              <div className={styles.workflowLine}>
                ▦ <i /> ☷ <i /> ⌘
              </div>
              <span className={styles.workflowResult}>
                ✳ One connected workspace <b>✓</b>
              </span>
            </div>
            <h4>Less busywork. More momentum.</h4>
            <p>
              Connect your processes, data, and people with software shaped
              around the way your team actually works.
            </p>
            <div className={styles.tags}>
              <span>Operations</span>
              <span>Workflows</span>
              <span>Dashboards</span>
            </div>
          </article>
          <article className={styles.service}>
            <div className={styles.serviceTop}>
              <span>03</span>
              <Arrow />
            </div>
            <h3>AI engineering</h3>
            <div className={styles.aiDemo} aria-hidden="true">
              <span className={styles.aiOrbit}>✳</span>
              <span className={styles.aiChip}>Your data</span>
              <span className={styles.aiChip}>Your tools</span>
              <span className={styles.aiCaption}>
                A little intelligence. A lot of possibility.
              </span>
            </div>
            <h4>Make AI useful. Make it yours.</h4>
            <p>
              Practical AI that works with your systems, handles repetitive
              tasks, and gives your people room to think bigger.
            </p>
            <div className={styles.tags}>
              <span>AI agents</span>
              <span>Automation</span>
              <span>Integrations</span>
            </div>
          </article>
        </div>
      </section>

      <section
        id="approach"
        className={styles.approach}
        aria-labelledby="approach-title"
      >
        <div className={styles.container}>
          <div className={styles.approachIntro}>
            <Label>The way we work</Label>
            <h2 id="approach-title">
              Think it through.
              <br />
              Then make it happen.
            </h2>
            <p>
              Great software starts with the right questions. We get close to
              your business, find the opportunity, and build with purpose.
              You’re part of the team from day one.
            </p>
            <a className={styles.textLink} href="#contact">
              Meet your next chapter <Arrow />
            </a>
          </div>
          <ol className={styles.steps}>
            {[
              {
                title: "Understand the ambition",
                text: "Start with your goals, your people, and the problem worth solving.",
              },
              {
                title: "Make the path clear",
                text: "Turn the big picture into a focused plan and a tangible prototype.",
              },
              {
                title: "Build. Learn. Keep moving.",
                text: "Ship in useful steps, learn from real feedback, and make each release count.",
              },
            ].map((step, i) => (
              <li key={step.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="principles-title">
        <Label>A better kind of partnership</Label>
        <div className={styles.sectionHeading}>
          <h2 id="principles-title">
            Your goals.
            <br />
            <span>Our common ground.</span>
          </h2>
          <p>
            Good work starts with a good relationship.
            <br />
            Here’s what you can expect from ours.
          </p>
        </div>
        <div className={styles.principles}>
          <article>
            <span aria-hidden="true">↔</span>
            <h3>Close collaboration</h3>
            <p>
              Direct conversations, shared decisions, and a team that cares
              about the whole picture.
            </p>
          </article>
          <article>
            <span aria-hidden="true">◎</span>
            <h3>Clarity at every step</h3>
            <p>
              Know what we’re building, why it matters, and what comes next. No
              black boxes.
            </p>
          </article>
          <article>
            <span aria-hidden="true">↗</span>
            <h3>Built to keep growing</h3>
            <p>
              Thoughtful foundations and a clear handover, so your next chapter
              is always yours.
            </p>
          </article>
        </div>
      </section>

      <section
        id="faq"
        className={`${styles.section} ${styles.faqSection}`}
        aria-labelledby="faq-title"
      >
        <div>
          <Label>A little more clarity</Label>
          <h2 id="faq-title">
            Good questions.
            <br />
            <span>Straight answers.</span>
          </h2>
          <p className={styles.faqIntro}>
            Every great partnership starts
            <br />
            with a conversation.
          </p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <Label>Let’s make progress</Label>
        <h2 id="contact-title">
          Big ambition?
          <br />
          You’re in good company<span>.</span>
        </h2>
        <p>
          Bring your ideas, your challenges, your “there must be a better way.”
          <br className={styles.desktopBreak} /> We’ll help you see what’s
          possible.
        </p>
        <a className={styles.button} href="#services">
          Find your starting point <Arrow />
        </a>
        <p className={styles.contactNote}>
          You’re exploring a concept site. Live bookings are coming later.
        </p>
        <span className={styles.contactFlower} aria-hidden="true">
          ✳
        </span>
      </section>

      <section
        id="community"
        className={`${styles.section} ${styles.community}`}
        aria-labelledby="community-title"
      >
        <div>
          <Label>Better together</Label>
          <h2 id="community-title">
            Ideas grow
            <br />
            <span>in good company.</span>
          </h2>
          <p>
            Curious about what’s next in AI and technology? Find fresh
            perspectives and practical conversations with the wider builder
            community.
          </p>
          <a
            className={styles.textLink}
            href="https://buildersklub.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore community events <Arrow />
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </div>
        <div className={styles.communityArt} aria-hidden="true">
          <div className={styles.eventSticker}>
            GREAT MINDS.
            <br />
            REAL CONVERSATIONS.
            <span>
              Let’s talk
              <br />
              <i>what’s next.</i>
            </span>
            <div>
              BUILD · SHARE · CONNECT <b>↗</b>
            </div>
          </div>
          <span className={styles.eventSpark}>✳</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a href="#" className={styles.logo} aria-label="Factory home">
            <span className={styles.logoMark} aria-hidden="true">
              f
            </span>
            factory.
          </a>
          <p>
            Good people. Thoughtful technology.
            <br />A better way forward.
          </p>
          <nav aria-label="Footer navigation">
            {navigation.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>
            © {new Date().getFullYear()} Factory. A demonstration of what’s
            possible.
          </span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
