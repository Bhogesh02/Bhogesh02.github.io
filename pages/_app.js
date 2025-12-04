import Head from 'next/head';
import '../src/index.css';
import '../src/App.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Primary favicon and icons (use files in /public) */}
        <link rel="icon" href="/tb-logo.png" sizes="any" />
        <link rel="icon" type="image/webp" href="/B-icon.webp" />
        <link rel="apple-touch-icon" href="/tb-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />

        {/* Open Graph / Twitter cards to help link previews and search engines */}
        <meta property="og:title" content="Tamminana Bhogesh — Full Stack Developer" />
        <meta property="og:site_name" content="Tamminana Bhogesh" />
        <meta property="og:description" content="Portfolio of Tamminana Bhogesh — Full Stack Developer (React, Next.js)." />
        <meta property="og:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png'} />
        <meta property="og:image:alt" content="Tamminana Bhogesh logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tamminana Bhogesh — Full Stack Developer" />
        <meta name="twitter:description" content="Portfolio of Tamminana Bhogesh — Full Stack Developer (React, Next.js)." />
        <meta name="twitter:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png'} />

        {/* Mask icon for Safari pinned tabs (optional) */}
        <link rel="mask-icon" href="/tb-logo.png" color="#7c3aed" />

        {/* Improve Google Search: provide site logo via JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Tamminana Bhogesh",
          "url": process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info',
          "image": (process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://tamminanabhogesh.info') + '/tb-logo.png'
        }) }} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
