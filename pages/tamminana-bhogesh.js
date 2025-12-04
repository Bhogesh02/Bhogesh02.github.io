import Head from 'next/head'
import React from 'react'
import ProfileCard from '../src/components/ProfileCard'

export default function TamminanaPage(){
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://bhogesh02.github.io'
  const site = origin.replace(/\/$/, '')
  const pageUrl = `${site}/tamminana-bhogesh`
  const image = `${site}/Bhogesh02.webp`
  const name = 'Tamminana Bhogesh'
  const description = 'Tamminana Bhogesh — Full Stack Developer. Portfolio and contact details.'

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": pageUrl,
    "image": image,
    "jobTitle": "Full Stack Developer"
  }

  return (
    <>
      <Head>
        <title>{name} — Full Stack Developer</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${name} — Full Stack Developer`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} — Full Stack Developer`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </Head>

      <main style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px'}}>
        <div style={{maxWidth: 920, width: '100%'}}>
          {/* Reuse the React ProfileCard component so content is consistent with the app */}
          <ProfileCard />
        </div>
      </main>
    </>
  )
}
