import React, { useRef, useEffect, useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShareAlt, FaCube, FaWhatsapp, FaTelegram, FaLink, FaFileAlt, FaFilePdf } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
// note: html2pdf.js and html2canvas are browser-only. We import them dynamically
// inside the functions that run in the browser to avoid SSR issues.

const ProfileCard = ({ name, profession, role, social = {}, onClose }) => {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [shareAnimating, setShareAnimating] = useState(false);

  const menuItems = [
    { key: 'native', icon: FaShareAlt },
    { key: 'whatsapp', icon: FaWhatsapp },
    { key: 'linkedin', icon: FaLinkedin },
    { key: 'facebook', icon: FaFacebook },
    { key: 'twitter', icon: FaTwitter },
    { key: 'telegram', icon: FaTelegram },
    { key: 'copy', icon: FaLink },
    { key: 'pdf', icon: FaFilePdf },
  ];

  async function handleMenuAction(key) {
    setShowShareMenu(false);
    try {
      switch (key) {
        case 'native': {
          setDownloading(true);
          const canvas = await captureCard(false, 24);
          try {
            await shareCanvas(canvas, name);
          } catch (err) {
            const url = canvas.toDataURL('image/png');
            const w = window.open();
            if (w) w.document.write(`<img src="${url}" alt="${name || 'Profile'}"/>`);
          }
          break;
        }
        case 'pdf':
          setDownloading(true);
          await downloadAsPDF(false);
          break;
        case 'copy':
          navigator.clipboard && navigator.clipboard.writeText(window.location.href);
          break;
        case 'whatsapp':
        case 'linkedin':
        case 'facebook':
        case 'twitter':
        case 'telegram':
          sharePage(key);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  }

  // Download helpers exposed to the UI
  async function handleDownloadPNG() {
    setShowDownloadMenu(false);
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await captureCard(false, 18);
      downloadCanvas(canvas, name);
    } catch (e) {
      console.error('PNG download failed', e);
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadPDF() {
    setShowDownloadMenu(false);
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadAsPDF(false);
    } catch (e) {
      console.error('PDF download failed', e);
    } finally {
      setDownloading(false);
    }
  }

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // click backdrop to close
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
          <div className="relative w-[480px] max-w-full">
        <div
          ref={cardRef}
          id="profile-atm-card"
          className="bg-gradient-to-br from-neutral-900 via-indigo-900 to-[#7c3aed] rounded-[12px] p-6 flex flex-col items-center shadow-[0_10px_24px_rgba(2,6,23,0.35)] relative"
          style={{ transform: 'perspective(900px) rotateX(1.5deg)', width: 480 }}
        >
            {/* Top-right controls removed per user request (3D removed). Share + Download moved to bottom-center. */}
          <div className="w-full flex justify-center mt-1 mb-6">
            {/* Rectangle image with gradient border */}
            <div className="transform translate-y-2" style={{ borderRadius: 12 }}>
              <div style={{ padding: 2, borderRadius: 12, background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 100%)' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', background: '#071026', width: 194, height: 243, border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 26px rgba(124,58,237,0.10)' }}>
                  <img
                    src="/Bhogesh02.webp"
                    alt={name || "Profile"}
                    className="w-full h-full object-contain"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-white font-extrabold text-3xl mt-2">Mr _ {name}</div>
          <div className="text-white text-base mb-4 opacity-90 font-semibold">{profession || role}</div>

          <div className="flex mb-2 items-center" style={{ gap: 20 }}>
            <a href={(social && social.instagram) || 'https://www.instagram.com/tamminana_bhogesh/'} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-white text-xl rounded-[12px]" /></a>
            {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="text-white text-xl rounded-[12px]" /></a>}
            {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="text-white text-xl rounded-[12px]" /></a>}
            {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer"><FaGithub className="text-white text-xl rounded-[12px]" /></a>}
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-white text-xl rounded-[12px]" /></a>}
          </div>

          

          {/* Decorative footer line */}
          <div className="w-full h-px bg-white/8 my-4" />

          {/* Contact info - improved layout */}
          <div className="w-full grid grid-cols-1 gap-3 text-white/90 text-xs">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-white/90 w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Email</span>
                <a className="no-underline text-sm" href={`mailto:${social.email || ''}`}>{social.email || 'Not provided'}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-white/90 w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Phone</span>
                {social.phone || social.mobile ? (
                  <a className="text-xs" href={`tel:${(social.phone || social.mobile).replace(/\s+/g, '')}`}>{social.phone || social.mobile}</a>
                ) : (
                  <span className="text-xs">Not provided</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-white/90 w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Location</span>
                <span className="text-xs">{social.address || '—'}</span>
              </div>
            </div>

            <div className="mt-1 w-full flex justify-end text-white/90 text-xs italic">ID: {name ? name.split(' ').join('').toLowerCase() : 'profile'}</div>
          </div>
          
        </div>
        {/* Controls placed at the very end of the card container (outside `#profile-atm-card`) */}
        <div className="w-full flex justify-center mt-4 mb-4 relative" data-export-ignore>
          {showShareMenu && (
            <div style={{ position: 'absolute', bottom: 68, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 9999 }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const colorMap = { native: '#111827', whatsapp: '#25D366', linkedin: '#0077b5', facebook: '#1877F2', twitter: '#1DA1F2', telegram: '#26A5E4', copy: '#6b7280', pdf: '#ef4444' };
                const bg = colorMap[item.key] || 'rgba(255,255,255,0.06)';
                return (
                  <button key={item.key} onClick={(ev) => { ev.stopPropagation(); handleMenuAction(item.key); }} title={item.key} style={{ width: 56, height: 56, borderRadius: 9999, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 34px rgba(2,6,23,0.5)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                    <Icon className="w-5 h-5 text-white" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={(e) => { e.stopPropagation(); setShowShareMenu(s => !s); }} className="bg-white/10 hover:bg-white/20 text-white rounded-md px-4 py-2 flex items-center gap-2">
              <FaShareAlt className="w-5 h-5" />
              <span>Share</span>
            </button>

            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowDownloadMenu(s => !s); }} className="bg-white/10 hover:bg-white/20 text-white rounded-md px-4 py-2 flex items-center gap-2">
                {downloading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                ) : (
                  <>
                    <MdDownload className="w-5 h-5" />
                    <span>Download</span>
                  </>
                )}
              </button>

              {showDownloadMenu && (
                <div onClick={(e) => e.stopPropagation()} className="absolute right-0 mt-2 bg-[#081024] border border-white/5 rounded-md p-2 shadow-lg" style={{ minWidth: 140, zIndex: 9999 }}>
                  <button onClick={(e) => { e.stopPropagation(); handleDownloadPNG(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded">Download PNG</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDownloadPDF(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded">Download PDF</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

// Helpers
async function captureCard(preserveTransform = false, padding = 0) {
  const el = document.getElementById('profile-atm-card');
  if (!el) throw new Error('Card element not found');
  // If padding is requested, clone the element into an offscreen wrapper so we can capture with margin and without page layout noise.
  if (padding && padding > 0) {
    const clone = el.cloneNode(true);
    if (!preserveTransform) clone.style.transform = 'none';
    // remove interactive controls from the clone so they don't appear in the exported image
    const ignored = clone.querySelectorAll('[data-export-ignore]');
    ignored.forEach(n => n.remove());
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '-9999px';
    wrapper.style.padding = `${padding}px`;
    wrapper.style.background = 'transparent';
    wrapper.style.borderRadius = '12px';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true, backgroundColor: null });
      return canvas;
    } finally {
      document.body.removeChild(wrapper);
    }
  }

  // For the direct capture path, temporarily hide interactive controls so they don't appear in the export
  const ignoredEls = Array.from(el.querySelectorAll('[data-export-ignore]'));
  const prevDisplays = ignoredEls.map(n => n.style.display || '');
  ignoredEls.forEach(n => { n.style.display = 'none'; });

  const prevTransform = el.style.transform;
  if (!preserveTransform) el.style.transform = 'none';
  try {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
    return canvas;
  } finally {
    el.style.transform = prevTransform;
    // restore hidden controls
    ignoredEls.forEach((n, i) => { n.style.display = prevDisplays[i]; });
  }
}

function downloadCanvas(canvas, name) {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  const safeName = (name || 'profile-card').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  link.download = `${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function shareCanvas(canvas, name) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) return reject(new Error('Failed to create blob'));
      const file = new File([blob], `${(name || 'profile-card').toLowerCase().replace(/[^a-z0-9_-]/g, '-')}.png`, { type: 'image/png' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: name || 'Profile card' });
          resolve();
        } else {
          // fallback: open in new tab
          const url = URL.createObjectURL(blob);
          const w = window.open();
          if (w) w.document.write(`<img src="${url}" alt="${name || 'Profile'}"/>`);
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    }, 'image/png');
  });
}

// Create a self-contained HTML file from the card (inlines images as data URLs and styles)
async function downloadAsHTML() {
  const el = document.getElementById('profile-atm-card');
  if (!el) throw new Error('Card element not found');

  const clone = el.cloneNode(true);

  // Remove interactive controls that rely on app JS, then inline images
  const ignoredEls = clone.querySelectorAll('[data-export-ignore]');
  ignoredEls.forEach(n => n.remove());

  // Convert relative anchors to absolute so links remain valid when opened locally
  const anchorsRel = clone.querySelectorAll('a');
  anchorsRel.forEach(a => {
    try {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('/')) {
        a.setAttribute('href', window.location.origin + href);
      }
    } catch (e) {
      // noop
    }
  });

  // Inline images
  const imgs = clone.querySelectorAll('img');
  await Promise.all(Array.from(imgs).map(async (img) => {
    try {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;
      const resp = await fetch(src, { mode: 'cors' });
      const blob = await resp.blob();
      const dataUrl = await new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      });
      img.setAttribute('src', dataUrl);
    } catch (err) {
      console.warn('Could not inline image', err);
    }
  }));

  // Inline basic computed styles for the clone (keeps layout close to original)
  const inlineStyles = (node) => {
    if (node.nodeType !== 1) return;
    const cs = window.getComputedStyle(node);
    let s = '';
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];
      s += `${prop}:${cs.getPropertyValue(prop)};`;
    }
    node.setAttribute('style', s);
    Array.from(node.children).forEach(inlineStyles);
  };
  inlineStyles(clone);

  // Add a tiny helper toolbar script into the exported HTML so users can copy link or open original site easily
  const injectedScript = `
    (function(){
      function addToolbar(){
        if(document.getElementById('export-toolbar')) return;
        const bar = document.createElement('div');
        bar.id = 'export-toolbar';
        bar.style.position = 'fixed';
        bar.style.top = '12px';
        bar.style.right = '12px';
        bar.style.display = 'flex';
        bar.style.gap = '8px';
        bar.style.zIndex = 9999;
        const btnStyle = 'background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.06);padding:8px 10px;border-radius:8px;font-family:sans-serif;font-size:13px;cursor:pointer;backdrop-filter:blur(6px)';
        const copy = document.createElement('button'); copy.innerText = 'Copy page link'; copy.style = btnStyle; copy.onclick = function(){ navigator.clipboard && navigator.clipboard.writeText(window.location.href).then(()=>{ copy.innerText='Copied'; setTimeout(()=>copy.innerText='Copy page link',1300)}); };
        const open = document.createElement('button'); open.innerText = 'Open original'; open.style = btnStyle; open.onclick = function(){ window.open(window.location.origin, '_blank'); };
        bar.appendChild(copy); bar.appendChild(open);
        document.body.appendChild(bar);
      }
      if(document.readyState === 'complete' || document.readyState === 'interactive') addToolbar(); else document.addEventListener('DOMContentLoaded', addToolbar);
    })();
  `;

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Profile Card</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:linear-gradient(180deg,#020317 0%,#06102b 100%);">${clone.outerHTML}<script>${injectedScript}</script></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(document.title || 'profile-card').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Generate a PDF using html2pdf (preserves links in many viewers)
async function downloadAsPDF(preserveTransform = false) {
  const el = document.getElementById('profile-atm-card');
  if (!el) throw new Error('Card element not found');

  // Clone and optionally clear transforms
  const clone = el.cloneNode(true);
  if (!preserveTransform) clone.style.transform = 'none';
  // Remove interactive controls and convert relative links before inlining images
  const ignoredEls = clone.querySelectorAll('[data-export-ignore]');
  ignoredEls.forEach(n => n.remove());

  // Convert relative anchors to absolute so links remain valid in PDF/HTML
  const anchorsRel = clone.querySelectorAll('a');
  anchorsRel.forEach(a => {
    try {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('/')) {
        a.setAttribute('href', window.location.origin + href);
      }
    } catch (e) {
      // noop
    }
  });

  // Inline images
  const imgs = clone.querySelectorAll('img');
  await Promise.all(Array.from(imgs).map(async (img) => {
    try {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;
      const resp = await fetch(src, { mode: 'cors' });
      const blob = await resp.blob();
      const dataUrl = await new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      });
      img.setAttribute('src', dataUrl);
    } catch (err) {
      console.warn('Could not inline image', err);
    }
  }));

  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  const opt = {
    margin: 8,
    filename: `${(document.title || 'profile-card').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.pdf`,
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'px', format: [clone.offsetWidth + 16, clone.offsetHeight + 16], orientation: 'portrait' }
  };

  // Use html2pdf pipeline but intercept the jsPDF instance to add link annotations
  const { default: html2pdf } = await import('html2pdf.js');
  const worker = html2pdf().set(opt).from(clone);
  try {
    await worker.toPdf().get('pdf').then((pdf) => {
      try {
        const cloneRect = clone.getBoundingClientRect();
        const anchors = clone.querySelectorAll('a');
        const scale = (opt.html2canvas && opt.html2canvas.scale) || 1;
        anchors.forEach(a => {
          try {
            const r = a.getBoundingClientRect();
            const x = (r.left - cloneRect.left) * scale + opt.margin;
            const y = (r.top - cloneRect.top) * scale + opt.margin;
            const w = r.width * scale;
            const h = r.height * scale;
            if (a.href) {
              // jsPDF link coordinates use (x, y) from top-left
              pdf.link(x, y, w, h, { url: a.href });
            }
          } catch (e) {
            // ignore link annotation failures
          }
        });
      } catch (e) {
        // ignore annotation errors
      }
    });
    // finally save the PDF
    await worker.save();
  } finally {
    document.body.removeChild(wrapper);
  }
}

function sharePage(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title || 'Profile');
  const text = encodeURIComponent(`Check out ${document.title} - ${window.location.href}`);
  let shareUrl = '';
  switch (platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${text}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    default:
      shareUrl = window.location.href;
  }
  window.open(shareUrl, '_blank', 'noopener');
}
