import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'

const serviceGroups = [
  { title: 'Pain, joints & movement', intro: 'Support for movement that has become painful, stiff or difficult.', items: [
    ['Musculoskeletal physiotherapy', 'Assessment-led support for muscles, joints and soft tissues, including strains, sprains, arthritis-related stiffness and weakness. A plan may include graded exercise, movement practice and self-management advice.'],
    ['Back pain & spinal rehabilitation', 'A practical approach to back pain, stiffness and reduced mobility, focused on comfortable movement, strength and confidence with everyday activities.'],
    ['Hip pain & rehabilitation', 'Movement and strengthening work for hip stiffness, pain affecting walking or standing, and recovery after injury or surgery, subject to clinical guidance.'],
    ['Knee pain & rehabilitation', 'Support for knee stiffness, weakness and walking or stair difficulties, including rehabilitation after knee replacement where appropriate.'],
    ['Shoulder, arm & elbow rehabilitation', 'Graded movement and exercise for upper-limb pain, stiffness or weakness that affects reaching, dressing, lifting and other daily tasks.'],
  ] },
  { title: 'Recovery after surgery or illness', intro: 'Rebuild strength and confidence in the environment where daily life happens.', items: [
    ['Hip replacement rehabilitation', 'Practice with transfers, walking, stairs and daily routines following a hip replacement, in line with the surgical team’s precautions and weight-bearing advice.'],
    ['Knee replacement rehabilitation', 'An individual plan may include prescribed movement, progressive strengthening, walking practice and functional training after knee replacement.'],
    ['Fracture rehabilitation', 'Movement, strength, balance and walking work after a fracture when healing and medical instructions permit.'],
    ['After a hospital stay', 'Support for reduced stamina, weakness, balance and everyday mobility after illness, surgery or a period of inactivity.'],
  ] },
  { title: 'Mobility & neurological support', intro: 'Care shaped around safety, independence and each person’s abilities.', items: [
    ['Stroke rehabilitation', 'Task-specific movement, walking, balance and strength practice may help people work towards personal goals following a stroke.'],
    ['Mobility support for dementia', 'Familiar routines, clear instructions and adapted activity may support mobility and everyday function for people living with dementia or Alzheimer’s disease.'],
    ['Balance, walking & falls prevention', 'Individualised balance, leg-strength and walking practice, including the use of mobility aids where appropriate.'],
    ['Functional exercise & carer guidance', 'Practice for daily movements such as sitting to standing, transfers and stairs, with guidance for family or carers when suitable and agreed.'],
  ] },
]

const steps = [
  ['Get in touch', 'Share what is happening, what feels difficult and what you would like help with.'],
  ['Initial assessment', 'Movement, strength, balance and everyday activities are considered alongside your goals.'],
  ['A plan for you', 'Your rehabilitation plan is shaped around your abilities, home and medical guidance.'],
  ['Treatment & review', 'Practice, education and progress reviews help the plan adapt as you move forward.'],
]

const faqs = [
  ['What is home physiotherapy?', 'It is physiotherapy provided in your own home. Assessment and rehabilitation can focus on the movements and activities that matter in your daily surroundings.'],
  ['What happens at the first visit?', 'An initial visit typically explores your concerns, relevant medical history, movement, mobility and goals. Any treatment plan should be tailored after assessment.'],
  ['How many visits will I need?', 'This depends on your needs, goals and response to rehabilitation. A suitable plan can be discussed after an individual assessment.'],
  ['What should I prepare?', 'If available, have relevant medical or discharge information, operation or fracture instructions, a medication list and any mobility aids ready. Comfortable clothing that allows movement can help.'],
]

function Brand() {
  return <a className="brand" href="#top" aria-label="Pratheesh Physiotherapy, back to top"><span className="brand-icon" aria-hidden="true">P<span>.</span></span><span className="brand-name">Pratheesh <small>Physiotherapy at home</small></span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <div id="top" className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <Brand />
      <nav id="main-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation"><a href="#services" onClick={closeMenu}>Services</a><a href="#how-it-works" onClick={closeMenu}>How it works</a><a href="#about" onClick={closeMenu}>About</a><a href="#faqs" onClick={closeMenu}>FAQs</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
      <a className="header-action" href="#contact">Contact details <ArrowUpRight size={16} aria-hidden="true" /></a>
      <button className="menu-toggle" type="button" aria-controls="main-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
    </div></header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><h1 id="hero-title">Physiotherapy, in the comfort of <span>your home.</span></h1><p>Personalised support to help you move more comfortably, rebuild confidence and return to the everyday things that matter.</p><div className="hero-actions"><a className="button button-primary" href="#services">Explore home physiotherapy <ArrowRight size={18} aria-hidden="true" /></a><a className="quiet-link" href="#how-it-works">How visits work <ArrowDown size={17} aria-hidden="true" /></a></div></div><div className="hero-image-wrap"><img src="/images/home-physiotherapy.jpg" alt="Illustrative scene of a seated mobility exercise at home, with faces outside the frame" width="1774" height="887" /><span className="image-note">Illustrative home-care imagery</span></div></section>

      <section className="value-section" aria-labelledby="value-title"><div className="container value-layout"><div className="value-heading"><h2 id="value-title">Care that fits real life.</h2><p>Home visits bring rehabilitation into the space where you move every day.</p></div><div className="value-points"><div><Check size={20} aria-hidden="true" /><span><strong>Comfort and convenience</strong>Make progress without travelling to a clinic.</span></div><div><Check size={20} aria-hidden="true" /><span><strong>Personal to you</strong>Work towards goals that make a difference at home.</span></div><div><Check size={20} aria-hidden="true" /><span><strong>Practical movement</strong>Practice walking, stairs and daily routines where you use them.</span></div></div></div></section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title"><div className="container"><div className="section-intro"><div><h2 id="services-title">What home physiotherapy can support</h2><p>From pain and joint concerns to rehabilitation after surgery, care starts with understanding your needs.</p></div><span className="draft-pill">Draft service information</span></div><p className="draft-note">The areas below come from the supplied content and are awaiting confirmation against Pratheesh’s training, insurance and available services. They are not a booking menu.</p><div className="service-groups">{serviceGroups.map(group => <div className="service-group" key={group.title}><div className="group-head"><h3>{group.title}</h3><p>{group.intro}</p></div><div className="group-items">{group.items.map(([title, detail]) => <details className="service-detail" key={title}><summary><span>{title}</span><ChevronDown size={20} aria-hidden="true" /></summary><div className="detail-body"><p>{detail}</p><span>Service details pending confirmation</span></div></details>)}</div></div>)}</div></div></section>

      <section className="process-section section-pad" id="how-it-works" aria-labelledby="process-title"><div className="container process-layout"><div className="process-lead"><h2 id="process-title">A clear path forward, one step at a time.</h2><p>Here is how a home physiotherapy journey may work. Pratheesh’s exact booking and clinical process will be confirmed before launch.</p><a className="quiet-link" href="#contact">Practical details <ArrowRight size={17} aria-hidden="true" /></a></div><ol className="steps">{steps.map(([title, text], i) => <li key={title}><span className="step-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

      <section className="audience-section section-pad" aria-labelledby="audience-title"><div className="container audience-layout"><div className="audience-image"><img src="/images/home-mobility.jpg" alt="Illustrative scene of supported movement beside a chair at home, with faces outside the frame" width="1024" height="1536" loading="lazy" /></div><div className="audience-copy"><h2 id="audience-title">Support for the moments that matter.</h2><p>Home physiotherapy may suit people who find travel difficult or want to practise movement in familiar surroundings.</p><ul><li>Older adults working on mobility and confidence</li><li>People recovering after surgery, fracture or a hospital stay</li><li>People managing pain, stiffness or reduced strength</li><li>People who need help with balance, walking or everyday tasks</li></ul><p className="small-print">Suitability and specific services depend on an individual assessment and confirmed clinical scope.</p></div></div></section>

      <section className="about-section section-pad" id="about" aria-labelledby="about-title"><div className="container about-layout"><div><h2 id="about-title">Meet Pratheesh.</h2><p className="about-lead">A personal introduction belongs here, in Pratheesh’s own words.</p></div><div className="about-detail"><p>His biography, qualifications, registration information and approach to care will be added after they are verified.</p><div className="pending-grid"><span><strong>Professional registration</strong>Details to be confirmed</span><span><strong>Qualifications & experience</strong>Details to be confirmed</span></div></div></div></section>

      <section className="faq-section section-pad" id="faqs" aria-labelledby="faq-title"><div className="container faq-layout"><div><h2 id="faq-title">Common questions</h2><p>Helpful starting points before arranging a visit.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}<div className="faq-pending"><strong>Practical details to follow</strong><p>Visit length, fees, referrals, availability and areas covered are awaiting confirmation.</p></div></div></div></section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div><h2 id="contact-title">Take the first step towards better mobility.</h2><p>If you are considering physiotherapy at home, contact details and booking options will appear here once they are confirmed.</p><a className="button button-light" href="#contact-details">View contact details <ArrowDown size={17} aria-hidden="true" /></a></div><div className="contact-panel" id="contact-details"><h3>Contact & visits</h3><div className="contact-line"><Phone size={19} aria-hidden="true" /><span><strong>Telephone & booking</strong>Number and booking link to be added</span><em>Pending</em></div><div className="contact-line"><Mail size={19} aria-hidden="true" /><span><strong>Email</strong>Business address to be added</span><em>Pending</em></div><div className="contact-line"><MapPin size={19} aria-hidden="true" /><span><strong>UK service area</strong>Towns and postcodes to be added</span><em>Pending</em></div><p className="contact-footnote">Fees, visit duration, cancellation terms and privacy information are also awaiting confirmation. No enquiry form collects personal health details at this stage.</p></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><Brand /><p>Home physiotherapy with everyday life in mind.</p><a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Pratheesh Physiotherapy</span><span>Practice details and clinical scope pending confirmation.</span></div></footer>
  </div>
}

export default App
