import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Mail, MapPin, Menu, MessageCircle, MoveUpRight, X } from 'lucide-react'

const services = [
  { number: '01', title: 'Musculoskeletal care', description: 'Support for everyday aches, joint concerns, and comfortable movement.' },
  { number: '02', title: 'Sports rehabilitation', description: 'A considered path back to the activities and sports you enjoy.' },
  { number: '03', title: 'Posture & movement', description: 'Explore how you move and build habits that support daily life.' },
  { number: '04', title: 'Injury prevention', description: 'Make space for strength, resilience, and confidence in motion.' },
]

const steps = [
  { number: '01', title: 'Listen first', description: 'Start with your story, your goals, and what movement means to you.' },
  { number: '02', title: 'Understand movement', description: 'Explore the way your body moves and what may be holding you back.' },
  { number: '03', title: 'Move forward', description: 'Build a practical plan that can evolve with your progress.' },
]

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="Pratheesh Physiotherapy, back to top">
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
      <span className="brand-text"><strong>Pratheesh</strong><small>Physiotherapy</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" id="main-nav">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="header-cta" href="#contact">Get in touch <ArrowUpRight size={16} strokeWidth={1.8} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-intro">Care for the way you move</p>
            <h1 id="hero-title">Move with <em>confidence.</em></h1>
            <p className="hero-description">Physiotherapy with room to listen, understand, and help you move toward what matters to you.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#services">Explore services <ArrowUpRight size={18} strokeWidth={1.8} /></a>
              <a className="text-link" href="#contact">Get in touch <ArrowRight size={17} strokeWidth={1.8} /></a>
            </div>
            <div className="hero-footnote"><span className="footnote-line" /> A more thoughtful way forward</div>
          </div>
          <div className="hero-visual" aria-label="Portrait space reserved for Pratheesh's photograph">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="portrait-frame">
              <div className="portrait-placeholder">
                <span className="portrait-symbol" aria-hidden="true"><span /></span>
                <span>Portrait to be added</span>
              </div>
              <span className="portrait-caption">Pratheesh <i /> Physiotherapist</span>
            </div>
            <span className="visual-note">Movement is personal.<br />Your care should be too.</span>
          </div>
          <a className="scroll-cue" href="#services" aria-label="Scroll to services"><ArrowDown size={17} strokeWidth={1.6} /></a>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading services-heading" data-reveal>
              <div><span className="section-index">What I can help with</span><h2 id="services-title">Care that meets you<br /><em>where you are.</em></h2></div>
              <p>Every person and every goal is different. These are areas of care to explore together. Final services will be confirmed by Pratheesh.</p>
            </div>
            <div className="service-list">
              {services.map((service) => <a href="#contact" className="service-row" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.4} /></span>
              </a>)}
            </div>
            <p className="placeholder-note">Service descriptions are illustrative placeholders and will be reviewed before publication.</p>
          </div>
        </section>

        <section className="about-section container" id="about" aria-labelledby="about-title">
          <div className="about-art" aria-hidden="true" data-reveal>
            <div className="about-art-inner"><div className="motion-line motion-line-one" /><div className="motion-line motion-line-two" /><div className="motion-line motion-line-three" /><span className="about-art-word">move</span></div>
            <span className="about-art-caption">A space for movement and possibility</span>
          </div>
          <div className="about-copy" data-reveal>
            <span className="section-index">Meet Pratheesh</span>
            <h2 id="about-title">A human approach to <em>feeling better.</em></h2>
            <p>This is where Pratheesh’s story will live: his experience, qualifications, philosophy of care, and the people he works with.</p>
            <p className="about-muted">Until those details are provided, this space stays intentionally open. The aim is to share a genuine introduction in his own words.</p>
            <a href="#contact" className="text-link">Contact Pratheesh <ArrowRight size={17} strokeWidth={1.8} /></a>
          </div>
        </section>

        <section className="approach-section" id="approach" aria-labelledby="approach-title">
          <div className="container approach-inner">
            <div className="approach-lead" data-reveal>
              <span className="section-index">The approach</span>
              <h2 id="approach-title">Better movement begins with <em>understanding.</em></h2>
              <p>A simple framework for the care journey. Pratheesh’s actual clinical process will replace this illustrative outline.</p>
            </div>
            <div className="approach-steps">
              {steps.map((step) => <div className="approach-step" key={step.number} data-reveal>
                <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><MoveUpRight size={20} strokeWidth={1.4} aria-hidden="true" />
              </div>)}
            </div>
          </div>
          <div className="approach-rings" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <section className="work-section container" id="work" aria-labelledby="work-title">
          <div className="work-heading" data-reveal>
            <span className="section-index">Selected work</span>
            <h2 id="work-title">Stories of progress,<br /><em>when they’re ready.</em></h2>
            <p>This area is reserved for verified case studies, projects, or educational resources that Pratheesh chooses to share.</p>
          </div>
          <div className="work-placeholder" data-reveal>
            <div className="work-placeholder-graphic" aria-hidden="true"><span /><span /><span /></div>
            <div><span className="placeholder-label">Coming later</span><h3>Real work belongs here.</h3><p>Case details and outcomes will only appear with accurate information and appropriate permission.</p></div>
            <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div className="contact-copy" data-reveal>
              <span className="section-index">Take the next step</span>
              <h2 id="contact-title">Let’s start a <em>conversation.</em></h2>
              <p>Have a question or ready to begin? Pratheesh’s booking and contact details will be added here as soon as they are confirmed.</p>
              <a className="button button-dark" href="#contact-options">View contact options <ArrowDown size={17} strokeWidth={1.8} /></a>
            </div>
            <div className="contact-options" id="contact-options" data-reveal>
              <div className="contact-option"><CalendarDays size={22} strokeWidth={1.5} /><div><strong>Book an appointment</strong><span>Booking link to be added</span></div><span className="unavailable">Coming soon</span></div>
              <div className="contact-option"><MessageCircle size={22} strokeWidth={1.5} /><div><strong>WhatsApp</strong><span>Number to be added</span></div><span className="unavailable">Coming soon</span></div>
              <div className="contact-option"><Mail size={22} strokeWidth={1.5} /><div><strong>Email</strong><span>Address to be added</span></div><span className="unavailable">Coming soon</span></div>
            </div>
          </div>
          <div className="container map-wrap" data-reveal>
            <div className="map-placeholder"><div className="map-grid" aria-hidden="true" /><MapPin size={26} strokeWidth={1.3} /><strong>Location to be added</strong><span>A map and clinic address will appear here after confirmation.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><Brand light /><p>Thoughtful care for movement and recovery.</p><a href="#top">Back to top <ArrowUpRight size={15} strokeWidth={1.7} /></a></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Pratheesh Physiotherapy</span><span>Professional details and contact information pending confirmation.</span></div>
      </footer>
    </div>
  )
}

export default App
