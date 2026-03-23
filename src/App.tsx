/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Briefcase, 
  Info, 
  Mail, 
  CheckCircle2, 
  TrendingUp, 
  Scale, 
  ArrowUpRight,
  Menu,
  X,
  BadgeCheck,
  LineChart,
  FileText,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";

type Page = "Home" | "Services" | "About" | "Contact";

const NAV_LINKS = [
  { name: "Home" as Page, icon: Home },
  { name: "Services" as Page, icon: Briefcase },
  { name: "About" as Page, icon: Info },
  { name: "Contact" as Page, icon: Mail },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage />;
      case "Services":
        return <ServicesPage />;
      case "About":
        return <AboutPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-white/80 backdrop-blur-md py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-12 md:h-14">
          <span className="text-2xl font-black text-primary tracking-tighter font-headline">Kgolagano</span>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.name}
                onClick={() => setCurrentPage(link.name)}
                className={`font-headline font-bold tracking-tight transition-colors ${currentPage === link.name ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"}`}
              >
                {link.name === "About" ? "About Us" : link.name}
              </button>
            ))}
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold scale-95 active:opacity-80 transition-transform">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-primary">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-32 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 flex justify-around items-center px-4 pb-safe bg-white/90 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50 rounded-t-2xl">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = currentPage === link.name;
          return (
            <button 
              key={link.name}
              onClick={() => setCurrentPage(link.name)}
              className={`flex flex-col items-center justify-center transition-all duration-200 ${isActive ? "text-primary font-bold bg-primary-fixed/30 rounded-xl px-3 py-1" : "text-on-surface-variant opacity-70 hover:opacity-100"}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium tracking-wide">{link.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-surface-container-low border-t border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-12">
          <div className="col-span-1">
            <span className="text-xl font-bold text-primary font-headline mb-4 block">Kgolagano</span>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              © 2024 Kgolagano Accounting & Consulting. Your Trusted Partner.
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-primary text-sm">Services</p>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage("Services")} className="text-on-surface-variant text-sm hover:text-primary">CIPC Services</button></li>
              <li><button onClick={() => setCurrentPage("Services")} className="text-on-surface-variant text-sm hover:text-primary">SARS Compliance</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-primary text-sm">Legal</p>
            <ul className="space-y-2">
              <li><a href="#" className="text-on-surface-variant text-sm hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-on-surface-variant text-sm hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-4 font-label">OUR COMMITMENT</span>
        <h1 className="text-4xl md:text-7xl font-extrabold font-headline leading-tight tracking-tighter text-on-surface mb-6">
          Building Financial <span className="text-primary">Success</span> Since 2024.
        </h1>
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-full md:rounded-[3rem] overflow-hidden bg-surface-container-high">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuf2xZHHAUlp9dVaBL0STFF007TcexM4Tj0MuO7EWCW9MgaiL5W1ouLbAlp1iaBkpAYA7_utO0bd1Q3g0toO6T572cOHdK8Tt2_sY41Iz8dKb3EfKYX28Xw8BRx1LGrihPDY7LzMovG9Rqjv_JFFvNcnl3sx_3vepuil-Gp0395c9BJvydsqNlE8bM-lgCcW2g_xwtXEc_5LF6GNDAZr1Y27SciIV374Q9At_twotKXbD405nbsg3nEDZwyFjRVgbtSWZLinFviDs" 
            alt="Modern professional office interior" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="bg-surface-container-low py-16 px-6 md:px-12 mb-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="editorial-asymmetry">
            <h2 className="text-2xl md:text-4xl font-bold font-headline mb-4">Your Strategic Partner</h2>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base mb-8">
              At Kgolagano, we don't just balance books; we empower your growth. Our approach combines the rigorous accuracy of traditional accounting with a modern, results-driven perspective on financial consulting.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm">
                <span className="text-secondary font-bold text-3xl mb-2 block">100%</span>
                <span className="text-xs font-semibold text-outline tracking-wider font-label uppercase">Compliance</span>
              </div>
              <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm mt-4">
                <span className="text-primary font-bold text-3xl mb-2 block">24/7</span>
                <span className="text-xs font-semibold text-outline tracking-wider font-label uppercase">Support</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://picsum.photos/seed/office/800/600" 
              alt="Professional workspace detail" 
              className="rounded-[2rem] grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <h3 className="text-sm font-bold tracking-[0.1em] text-outline uppercase mb-8 font-label text-center">Our Core Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-8 rounded-full md:rounded-[2.5rem] border-l-4 border-secondary transition-all hover:scale-[1.02]">
            <CheckCircle2 className="w-8 h-8 text-secondary mb-4" />
            <h4 className="text-xl font-bold font-headline mb-2">Absolute Integrity</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">Financial transparency that forms the bedrock of every consulting partnership we enter.</p>
          </div>
          <div className="bg-primary text-on-primary p-8 rounded-full md:rounded-[2.5rem] transition-all hover:scale-[1.02]">
            <TrendingUp className="w-8 h-8 text-primary-fixed mb-4" />
            <h4 className="text-xl font-bold font-headline mb-2">Strategic Growth</h4>
            <p className="text-primary-fixed opacity-90 text-sm leading-relaxed">Moving beyond rows and columns to deliver actionable business intelligence.</p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-full md:rounded-[2.5rem] border-l-4 border-primary transition-all hover:scale-[1.02]">
            <Scale className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-xl font-bold font-headline mb-2">Regulatory Compliance</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">Navigating SARS and CIPC requirements with complete accuracy and zero margin for error.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-primary to-primary-container p-10 md:p-20 rounded-full md:rounded-[3rem] text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h2 className="text-on-primary text-2xl md:text-5xl font-bold font-headline mb-4 relative z-10">Ready to build your legacy?</h2>
          <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-3 rounded-full font-bold text-sm tracking-tight transition-transform active:scale-95 relative z-10">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-16 overflow-hidden">
        <div className="relative">
          <span className="inline-block text-primary font-bold tracking-[0.15em] mb-4 uppercase text-xs">Expert Financial Guidance</span>
          <h1 className="text-5xl md:text-8xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface mb-6">
            Reliable <br/>
            <span className="text-primary italic">Financial</span> <br/>
            Consultancy.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-2xl">
            Bespoke accounting solutions designed for the modern enterprise. We provide the financial stability your growth demands.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold editorial-shadow hover:scale-105 transition-all">
              Our Services
            </button>
          </div>
          <div className="absolute -right-20 top-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-secondary">
            <span className="text-3xl font-bold font-headline block text-primary">15+</span>
            <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Years Experience</span>
          </div>
          <div className="bg-surface-container-high p-6 rounded-xl">
            <span className="text-3xl font-bold font-headline block text-primary">500+</span>
            <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Clients Managed</span>
          </div>
          <div className="col-span-2 bg-primary-container p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase mb-2 block">SARS Compliance</span>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-headline leading-tight">100% Audit Success Rate</h3>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <ShieldCheck className="w-32 h-32 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="px-6 mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-secondary font-bold text-xs tracking-widest uppercase">Expertise</span>
            <h2 className="text-3xl font-bold font-headline">Key Services</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-8 rounded-xl group transition-all hover:bg-surface-container">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center editorial-shadow">
                <Briefcase className="text-primary w-6 h-6" />
              </div>
              <ArrowUpRight className="text-outline-variant w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-headline mb-3">CIPC Services</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Streamlined company registration and secretarial services to keep your business compliant.</p>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-transparent hover:border-secondary transition-all hover:bg-surface-container">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center editorial-shadow">
                <FileText className="text-primary w-6 h-6" />
              </div>
              <ArrowUpRight className="text-outline-variant w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-headline mb-3">Accounting</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Full-cycle bookkeeping and financial reporting tailored to your specific industry needs.</p>
          </div>
        </div>
      </section>

      {/* CTA Canvas */}
      <section className="mx-6 mb-12 bg-surface p-8 md:p-16 rounded-2xl border border-outline-variant/20 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold font-headline mb-4">Ready to optimize your finances?</h2>
          <p className="text-on-surface-variant mb-8 text-sm md:text-base">Schedule a free 15-minute consultation with our senior partners today.</p>
          <button className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 rounded-full font-bold tracking-tight active:scale-95 transition-all">
            Book Consultation
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 hidden md:block">
          <Landmark className="w-64 h-64" />
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="mb-12 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-5xl font-bold font-headline">The Founders</h3>
          <div className="h-[1px] flex-grow ml-4 bg-outline-variant/30"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="snap-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 bg-surface-container-high">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF5pSq2uhG2j-oSpiPsB4zAknXFMuZvv657H3hHKJ3UobaSBg-A1Bu7_7u2JciWUuZ0-_VOD5fJDWHHcySjNJtBtB9MlQz4f-hEe5s2X1rQNXp3yhj5qacQzJUT7LA2vSOVrD2J-18631G6Ho1OO7_ol_ti5svbIyZ2CBlf1Tyt-4ntygfi110Lt34PYD_LPn4kIluA0TIYqqdtXIMbBqHe7tbTllSoUo-zyn3ujaFVsrpIhRHsDqOwcjH8OnwbS12XOkzFChPKoo" 
                alt="Thabo Mokoena" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h5 className="font-bold text-xl">Thabo Mokoena</h5>
            <p className="text-primary text-xs font-semibold font-label uppercase tracking-widest">Chief Strategist</p>
          </div>
          <div className="snap-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 bg-surface-container-high">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRByDBjRzIeGu5Splq-0nhczeD3yX_nS6XkYeiPfcQ8UVwjvtLFo5MyDtGCTKs2GT0Gl2Qp819Fl-Xf6UEt1-UlFGC0k4q1th8xbds09EJ_GBGqiRK2eHk3MlgJjOO0S1ceKq2k742fpgt73KDqrmZ95fuMXpXxXXp4aVmGmd30cWz9QzYJdkIurioa2NsSImR2lyOiU-QX2NnBjTGBNBukavw7nAsKfQZZDwL2z9xh2OGxij6kn8qkDgCsGT9E5acDJM3t6ELOoQ" 
                alt="Sarah Jenkins" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h5 className="font-bold text-xl">Sarah Jenkins</h5>
            <p className="text-primary text-xs font-semibold font-label uppercase tracking-widest">Tax Director</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="mb-12 max-w-2xl mx-auto text-center md:text-left">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block font-label">Reach Out</span>
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-on-surface tracking-tighter leading-none mb-4">
          Let's Build Your <br/><span className="text-secondary">Financial Future.</span>
        </h1>
        <p className="text-on-surface-variant leading-relaxed text-sm md:text-base opacity-80">
          Accuracy in accounting, clarity in consulting. Our team is ready to assist with your compliance and growth strategies.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form Card */}
        <section className="bg-surface-container-lowest rounded-xl p-6 md:p-10 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-on-surface-variant font-label tracking-wide uppercase">Full Name</label>
              <input className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all text-on-surface placeholder:text-outline/50" placeholder="John Doe" type="text"/>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-on-surface-variant font-label tracking-wide uppercase">Email Address</label>
              <input className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all text-on-surface placeholder:text-outline/50" placeholder="john@company.com" type="email"/>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-on-surface-variant font-label tracking-wide uppercase">Service Interest</label>
              <select className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all text-on-surface appearance-none">
                <option>CIPC Services</option>
                <option>SARS Compliance</option>
                <option>Accounting</option>
                <option>General Consultation</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-on-surface-variant font-label tracking-wide uppercase">Your Message</label>
              <textarea className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all text-on-surface placeholder:text-outline/50 resize-none" placeholder="How can we help you?" rows={3}></textarea>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md">
              Send Inquiry
            </button>
          </form>
        </section>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-surface-container-low p-5 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Our Offices</h4>
                <p className="text-xs text-on-surface-variant">Sandton, Johannesburg, ZA</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-5 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs">Call Us</h4>
                <p className="text-[10px] text-on-surface-variant">+27 11 000 0000</p>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs">Email</h4>
                <p className="text-[10px] text-on-surface-variant">hello@kgolagano.co.za</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 rounded-xl overflow-hidden bg-surface-container relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4fxL4DRccGELnFxna6dDnV_yNtmBiFIiv9iTCXI36RZRtb1DOLidqS00Ts3JeAL5duyPcNT6_achzlFnlDlyac0DLJI37ZR34KMaUVXq5e-lh7COmmkDr-VvkzmCGxXg87RzQHjKJlok3txm7PNCXP03i3fSsivuJRbM1EX5kVeGWtPcc3gTcCGpBi2lAY2sGhwdbHHmfdCivVEKkktBHHXL96yFEIlEw2pm5g52oQT7tnqiD7rDh0xdbyHqNKpvZtgOn2b38j3A" 
              alt="Map showing office location" 
              className="w-full h-full object-cover grayscale opacity-50 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Main Branch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
