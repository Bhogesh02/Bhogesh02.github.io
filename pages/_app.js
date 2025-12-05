import Head from 'next/head';
import '../src/index.css';
import '../src/App.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Favicon and icons for all platforms */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/favicon-512x512.png" sizes="512x512" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Open Graph / Twitter cards for link previews and search engines */}
        <meta property="og:title" content="Tamminana Bhogesh" />
        <meta property="og:site_name" content="Tamminana Bhogesh" />
        <meta property="og:description" content="Portfolio of Tamminana Bhogesh — Full Stack Developer (React, Next.js)." />
        <meta property="og:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://bhogesh02.github.io') + '/favicon-512x512.png'} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Tamminana Bhogesh logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tamminana Bhogesh " />
        <meta name="twitter:description" content="Portfolio of Tamminana Bhogesh — Full Stack Developer (React, Next.js)." />
        <meta name="twitter:image" content={(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://bhogesh02.github.io') + '/favicon-512x512.png'} />
        <meta name="twitter:image:alt" content="Tamminana Bhogesh logo" />

        {/* Mask icon for Safari pinned tabs */}
        <link rel="mask-icon" href="/favicon-192x192.png" color="#7c3aed" />

        {/* Google Search: site logo via JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Tamminana Bhogesh",
          "url": process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://bhogesh02.github.io',
          "image": (process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://bhogesh02.github.io') + '/favicon-512x512.png'
        }) }} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
