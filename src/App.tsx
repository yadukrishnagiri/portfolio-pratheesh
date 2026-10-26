import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Check, ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react'
import ServiceAreaMap from './ServiceAreaMap'

const services = [
  ['Musculoskeletal physiotherapy', 'Assessment and treatment for muscle, joint and soft-tissue problems, including pain, stiffness and difficulties with movement.'],
  ['Older adult & frailty care', 'Individual support to improve strength, balance, mobility and confidence, helping older and frail adults maintain function and independence.'],
  ['Post-operative rehabilitation', 'Personalised rehabilitation after surgery to restore movement, rebuild strength and support a safe return to everyday activities.'],
  ['Community physiotherapy', 'Assessment and rehabilitation in your own home, focused on mobility difficulties, functional limitations and the activities that matter to you.'],
]

const steps = [
  ['Listen and understand', 'Your medical history, current symptoms, concerns and expectations are discussed in confidence.'],
  ['Assess your movement', 'Movement, mobility, strength, joint function, balance and physical performance are assessed as appropriate.'],
  ['Agree meaningful goals', 'Together, you set realistic short- and long-term goals based on your needs and everyday life.'],
  ['Begin your plan', 'You receive an individual treatment plan, with treatment, practical advice or exercises where appropriate.'],
]

const faqs = [
  ['Do I need to travel to a clinic?', 'No. Johnson provides physiotherapy in your own home across Herefordshire and Worcestershire, subject to location and availability.'],
  ['What happens at the first appointment?', 'The first visit includes a comprehensive consultation and clinical assessment, followed by agreed goals and a personalised treatment plan. Treatment or exercises may begin where appropriate.'],
  ['How many appointments will I need?', 'This depends on your condition, goals and progress. Johnson will discuss a suitable plan after your individual assessment and review it as treatment continues.'],
  ['What should I prepare?', 'If available, please have relevant medical or hospital information, operation instructions, a medication list and any mobility aids ready. Wear comfortable clothing that allows you to move.'],
  ['Are all physiotherapy services available?', 'Johnson currently provides musculoskeletal, older adult and frailty, post-operative and community physiotherapy. Paediatric and neurological physiotherapy are not currently offered.'],
]

const heroImage = '/images/johnson-home-physiotherapy.png'

function Monogram() {
  return <svg viewBox="0 0 52 52" aria-hidden="true"><path className="monogram-j" d="M8 10h18v25c0 6-4 10-10 10-4 0-7-2-9-5"/><path className="monogram-g" d="M43 17c-3-5-7-7-12-7-8 0-14 7-14 16s6 16 15 16c5 0 9-2 12-5V27H32"/></svg>
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Johnson George Physiotherapy, back to top"><span className="brand-icon" aria-hidden="true"><Monogram /></span><span className="brand-name">Johnson George <small>Physiotherapy at home</small></span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaderStage, setLoaderStage] = useState<'loading' | 'leaving' | 'done'>('loading')
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    let cancelled = false
    let imageReady = false
    let minimumElapsed = false
    let leaving = false
    const finish = () => {
      if (cancelled || leaving || !imageReady || !minimumElapsed) return
      leaving = true
      setLoaderStage('leaving')
    }
    const minimumTimer = window.setTimeout(() => { minimumElapsed = true; finish() }, 650)
    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled && !leaving) { leaving = true; setLoaderStage('leaving') }
    }, 2200)
    const image = new Image()
    image.onload = image.onerror = () => { imageReady = true; finish() }
    image.src = heroImage
    if (image.complete) { imageReady = true; finish() }
    return () => {
      cancelled = true
      image.onload = image.onerror = null
      window.clearTimeout(minimumTimer)
      window.clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (loaderStage !== 'leaving') return
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 480
    const timer = window.setTimeout(() => setLoaderStage('done'), duration)
    return () => window.clearTimeout(timer)
  }, [loaderStage])

  return <div id="top" className="site-shell">
    {loaderStage !== 'done' && <div className={`page-loader${loaderStage === 'leaving' ? ' is-leaving' : ''}`} role="status" aria-label="Loading Johnson George Physiotherapy"><div className="loader-content"><span className="loader-mark"><Monogram /></span><span className="loader-name">Johnson George</span><span className="loader-subtitle">Physiotherapy at home</span><span className="loader-track" aria-hidden="true"><span /></span></div></div>}
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <Brand />
      <nav id="main-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation"><a href="#services" onClick={closeMenu}>Services</a><a href="#how-it-works" onClick={closeMenu}>First visit</a><a href="#areas" onClick={closeMenu}>Areas</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
      <a className="header-action" href="tel:+447342941712">Call 07342 941712 <ArrowUpRight size={16} aria-hidden="true" /></a>
      <button className="menu-toggle" type="button" aria-controls="main-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
    </div></header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><p className="hero-credential">Senior physiotherapist · 26 years’ clinical experience</p><h1 id="hero-title">Expert physiotherapy, in the comfort of <span>your home.</span></h1><p>Personalised physiotherapy and rehabilitation across Herefordshire and Worcestershire, helping you improve mobility, regain function and maintain independence.</p><div className="hero-actions"><a className="button button-primary" href="tel:+447342941712">Call to discuss a visit <Phone size={18} aria-hidden="true" /></a><a className="quiet-link" href="#services">Explore services <ArrowDown size={17} aria-hidden="true" /></a></div></div><div className="hero-image-wrap"><img src={heroImage} alt="An experienced physiotherapist guiding an older adult through a sit-to-stand exercise at home" width="1536" height="912" fetchPriority="high" /><span className="image-note">Home-based assessment & rehabilitation</span></div></section>

      <section className="value-section" aria-labelledby="value-title"><div className="container value-layout"><div className="value-heading"><h2 id="value-title">Experience you can trust.</h2><p>Patient-centred, evidence-informed care shaped around your abilities and goals.</p></div><div className="value-points"><div><Award size={21} aria-hidden="true" /><span><strong>26 years’ experience</strong>Across national and international healthcare settings.</span></div><div><ShieldCheck size={21} aria-hidden="true" /><span><strong>Professionally registered</strong>HCPC registered and a CSP member.</span></div><div><Check size={21} aria-hidden="true" /><span><strong>Personal to you</strong>A practical plan for meaningful everyday progress.</span></div></div></div></section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title"><div className="container"><div className="section-intro"><div><h2 id="services-title">Physiotherapy for better movement and independence</h2><p>Professional home-based support for adults and older people, tailored after an individual assessment.</p></div></div><div className="service-groups"><div className="service-group service-group-full"><div className="group-head"><h3>Services</h3><p>Choose a service to learn more about how Johnson may be able to help.</p></div><div className="group-items">{services.map(([title, detail]) => <details className="service-detail" key={title}><summary><span>{title}</span><ChevronDown size={20} aria-hidden="true" /></summary><div className="detail-body"><p>{detail}</p></div></details>)}</div></div></div><p className="scope-note"><strong>Please note:</strong> paediatric and neurological physiotherapy are not currently provided.</p></div></section>

      <section className="process-section section-pad" id="how-it-works" aria-labelledby="process-title"><div className="container process-layout"><div className="process-lead"><h2 id="process-title">Your first appointment, clearly explained.</h2><p>Care begins with a comprehensive assessment. Johnson takes time to understand what is affecting your comfort, movement and independence before agreeing the way forward with you.</p><a className="quiet-link" href="#contact">Arrange a conversation <ArrowRight size={17} aria-hidden="true" /></a></div><ol className="steps">{steps.map(([title, text], i) => <li key={title}><span className="step-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

      <ServiceAreaMap />

      <section className="about-section section-pad" id="about" aria-labelledby="about-title"><div className="container about-layout"><div><h2 id="about-title">Meet Johnson George.</h2><p className="about-lead">A senior physiotherapist bringing 26 years of clinical experience to personalised care at home.</p></div><div className="about-detail"><p>Johnson has worked in national and international healthcare settings, including 12 years as a Senior Physiotherapist at the Bahrain Defence Force and four years as a Senior Community Physiotherapist within the NHS. His experience spans musculoskeletal physiotherapy, older adult care, rehabilitation and community services.</p><div className="credential-grid"><span><strong>Bachelor’s & Master’s</strong>Degrees in Physiotherapy</span><span><strong>HCPC registered</strong>Health and Care Professions Council</span><span><strong>CSP member</strong>Chartered Society of Physiotherapy</span><span><strong>Patient-centred care</strong>Dignity, consent and confidentiality</span></div></div></div></section>

      <section className="faq-section section-pad" id="faqs" aria-labelledby="faq-title"><div className="container faq-layout"><div><h2 id="faq-title">Common questions</h2><p>Helpful information before arranging a home visit.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}<div className="faq-pending"><strong>Appointment details</strong><p>Session length, fees, payment methods, referral requirements, appointment hours and the cancellation policy are being finalised. Please contact Johnson for the latest information.</p></div></div></div></section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div><h2 id="contact-title">Take the first step towards better mobility.</h2><p>Get in touch to discuss your physiotherapy needs, check home-visit availability and arrange an appointment.</p><div className="contact-actions"><a className="button button-light" href="tel:+447342941712">Call Johnson <Phone size={17} aria-hidden="true" /></a><a className="button button-outline-light" href="https://wa.me/447342941712" target="_blank" rel="noreferrer">Message on WhatsApp <MessageCircle size={17} aria-hidden="true" /></a></div></div><div className="contact-panel" id="contact-details"><h3>Contact & booking</h3><a className="contact-line" href="tel:+447342941712"><Phone size={19} aria-hidden="true" /><span><strong>Telephone</strong>07342 941712</span><em>Call</em></a><a className="contact-line" href="https://wa.me/447342941712" target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" /><span><strong>WhatsApp</strong>07342 941712</span><em>Message</em></a><a className="contact-line" href="mailto:johnskgpt@gmail.com"><Mail size={19} aria-hidden="true" /><span><strong>Email</strong>johnskgpt@gmail.com</span><em>Email</em></a><div className="contact-line"><MapPin size={19} aria-hidden="true" /><span><strong>Home visits</strong>Herefordshire & Worcestershire</span></div><p className="contact-footnote">This physiotherapy service is not an emergency service. In a medical emergency, call 999. Please avoid sending sensitive medical information by WhatsApp or email before speaking with Johnson.</p></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><Brand /><p>Professional home physiotherapy with everyday life in mind.</p><a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Johnson George Physiotherapy Services</span><span>HCPC registered · CSP member · Herefordshire & Worcestershire</span></div></footer>
  </div>
}

export default App
