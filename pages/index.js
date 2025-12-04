import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import AboutSection from '../src/components/About';
import Projects from '../src/components/Projects';
import Skills from '../src/components/Skills';
import Exp from '../src/components/Exp';
import Edu from '../src/components/Edu';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/scroll-top';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { personalData } from '../src/utils/data/personal-data';

export default function Home() {
  return (
    <>
      <Head>
        <title>{personalData.name} — {personalData.designation}</title>
        <meta name="description" content={personalData.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info'} />

        {/* Open Graph */}
        <meta property="og:title" content={`${personalData.name} — ${personalData.designation}`} />
        <meta property="og:description" content={personalData.description} />
        <meta property="og:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png'} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personalData.name} — ${personalData.designation}`} />
        <meta name="twitter:description" content={personalData.description} />
        <meta name="twitter:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png'} />

        {/* JSON-LD Person */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personalData.name,
          url: process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info',
          image: (process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png',
          sameAs: [personalData.github, personalData.linkedIn, personalData.twitter]
        }) }} />
      </Head>
      <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        <Hero />
        <AboutSection />
        <Exp />
        <Skills />
        <Projects />
        <Edu />
        <Contact />
        <ScrollToTop />
        <Footer />
        <ToastContainer />
      </main>
    </>
  );
}
