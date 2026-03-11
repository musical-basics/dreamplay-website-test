"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import { Monitor, Mail, BookOpen, ChevronDown, Palette, RefreshCw, Copy, Check, ArrowRightLeft, AlertCircle, Hash, Instagram, Megaphone, Download, Clipboard, Pencil, Save, Trash2, FolderOpen, X, ImageIcon } from "lucide-react";
import { scrapePageContent, blocksToNewsletter, blocksToBlog, blocksToGmail, blocksToRedditAd, blocksToTwitterPost, blocksToIGCarousel, blocksToIGAd, getRedditCaption, getTwitterCaption, getIGCarouselCaption, getIGAdCaption, getAllMediaUrls } from "./converter";
import type { ContentBlock } from "./converter";

// ── Image Gallery for Picker ────────────────────────────────
const IMAGE_GALLERY = [
  { src: "/images/stills/hero-video-1-still.jpg", label: "Hero 1 — Top" },
  { src: "/images/stills/hero-video-2-still.jpg", label: "Hero 2 — Child+Mom" },
  { src: "/images/stills/hero-video-3-still.jpg", label: "Hero 3 — Hand Sizes" },
  { src: "/images/stills/hero-video-4-still.jpg", label: "Hero 4 — Specs" },
  { src: "/images/stills/hero-grid-still.jpg", label: "Grid Hero" },
  { src: "/images/learn/pianist-led-keys.jpg", label: "LED Keys" },
  { src: "/images/learn/sheet-music-mode-real.jpg", label: "Sheet Music Mode" },
  { src: "/images/learn/falling-notes-still.jpg", label: "Falling Notes" },
  { src: "/images/learn/ui-playthrough-still.jpg", label: "UI Playthrough" },
  { src: "/images/learn/control-buttons.jpg", label: "Control Buttons" },
  { src: "/images/learn/keyboard-led-lights.jpg", label: "Keyboard LEDs" },
  { src: "/images/learn/keyboard-back-ports.jpg", label: "Back Ports" },
  { src: "/images/Hero-Image-Final-Version.jpg", label: "Hero Final" },
  { src: "/images/DreamPlay Piano Hands.jpg", label: "Piano Hands" },
  { src: "/images/BW Piano (1).jpg", label: "BW Piano" },
  { src: "/images/DS5.5-White-p-800.png", label: "DS5.5 White" },
  { src: "/images/DS6.0-Black-1-p-800.png", label: "DS6.0 Black" },
  { src: "/images/DS6.5-Black-p-800.png", label: "DS6.5 Black" },
  { src: "/images/piano-bench-bundle.png", label: "Piano + Bench" },
  { src: "/images/David-Linda.jpg", label: "David & Linda" },
  { src: "/images/LionelYuPlayingPiano.jpg", label: "Lionel Playing" },
  { src: "/images/DreamPlay Logo White.png", label: "Logo White" },
];

// ── Draft Types ────────────────────────────────────────────
interface Draft {
  id: string;
  name: string;
  page: string;
  format: string;
  theme?: string;
  html: string;
  savedAt: string;
}
const DRAFTS_KEY = "dp-remixer-drafts";
function loadDrafts(): Draft[] {
  try { return JSON.parse(localStorage.getItem(DRAFTS_KEY) || "[]"); } catch { return []; }
}
function saveDrafts(drafts: Draft[]) {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

// ── Edit Mode Injection Script ────────────────────────────
const EDIT_SCRIPT = `<script>
(function(){
  // Make all text elements editable
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,li,td,th,div,strong,em,b,i,label').forEach(function(el){
    if(el.children.length===0 || el.textContent.trim().length > 0){
      el.contentEditable='true';
      el.style.outline='none';
      el.addEventListener('focus',function(){el.style.outline='2px solid rgba(59,130,246,0.5)';el.style.outlineOffset='2px';});
      el.addEventListener('blur',function(){el.style.outline='none';});
    }
  });
  // Make images clickable for swapping
  document.querySelectorAll('img').forEach(function(img){
    img.style.cursor='pointer';
    img.addEventListener('mouseenter',function(){img.style.outline='3px solid rgba(234,179,8,0.6)';img.style.outlineOffset='2px';});
    img.addEventListener('mouseleave',function(){img.style.outline='none';});
    img.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage({type:'IMAGE_CLICK',src:img.src,imgId:Array.from(document.querySelectorAll('img')).indexOf(img)},'*');
    });
  });
  // Listen for image swap messages from parent
  window.addEventListener('message',function(e){
    if(e.data && e.data.type==='SWAP_IMAGE'){
      var imgs=document.querySelectorAll('img');
      if(imgs[e.data.imgId]){
        imgs[e.data.imgId].src=e.data.newSrc;
      }
    }
  });
  // Notify parent that edit mode is ready
  window.parent.postMessage({type:'EDIT_READY'},'*');
})()
</script>`;


// ── Types ────────────────────────────────────────────────
type ViewTab = "website" | "newsletter" | "blog" | "gmail" | "reddit" | "twitter" | "ig-posts" | "ig-ad";
type PageId = string;
type BlogTheme = "minimalist" | "luxury" | "gold-accent";

const TABS: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
  { id: "website", label: "Website", icon: <Monitor className="h-4 w-4" /> },
  { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
  { id: "blog", label: "Blog", icon: <BookOpen className="h-4 w-4" /> },
  { id: "reddit", label: "Reddit", icon: <Hash className="h-4 w-4" /> },
  { id: "twitter", label: "X / Twitter", icon: <Hash className="h-4 w-4" /> },
  { id: "ig-posts", label: "IG Posts", icon: <Instagram className="h-4 w-4" /> },
  { id: "ig-ad", label: "IG Ad", icon: <Megaphone className="h-4 w-4" /> },
];

const PAGES: { id: PageId; label: string; path: string }[] = [
  { id: "learn", label: "DreamPlay Learn", path: "/learn" },
  { id: "better-practice", label: "The Benefits", path: "/better-practice" },
  { id: "how-it-works", label: "How It Works", path: "/how-it-works" },
  { id: "customize", label: "Customize", path: "/customize" },
  { id: "premium-offer", label: "Premium Offer", path: "/premium-offer" },
  { id: "our-story", label: "Our Story", path: "/our-story" },
  { id: "why-narrow", label: "Why Narrow Keys", path: "/why-narrow" },
  { id: "buyers-guide", label: "Buyer's Guide", path: "/buyers-guide" },
  { id: "product-information", label: "Product Info", path: "/product-information" },
  { id: "special-offer", label: "Special Offer", path: "/special-offer" },
  { id: "flash-sale", label: "Flash Sale", path: "/flash-sale" },
  { id: "vip", label: "VIP", path: "/vip" },
  { id: "production-timeline", label: "Production Timeline", path: "/production-timeline" },
  { id: "contact", label: "Contact", path: "/contact" },
  { id: "faq", label: "FAQ", path: "/information-and-policies/faq" },
  { id: "shipping", label: "Shipping", path: "/information-and-policies/shipping" },
];

const BLOG_THEMES: { id: BlogTheme; label: string; color: string }[] = [
  { id: "minimalist", label: "Minimalist", color: "text-white" },
  { id: "luxury", label: "Luxury", color: "text-purple-300" },
  { id: "gold-accent", label: "Gold Accent", color: "text-amber-300" },
];

// ── Theme CSS injectors ───────────────────────────────────
const blogThemeCSS: Record<BlogTheme, string> = {
  minimalist: `
        body { background: #fafafa; color: #1a1a1a; }
        .hero-bg { background: #111; }
        .hero-overlay { background: linear-gradient(to bottom, rgba(17,17,17,0.4), rgba(17,17,17,0.85)); }
        h1, h2 { color: #1a1a1a; }
        .bc { background: transparent; }
        .content-wrap { background: #fff; }
        .quote-card { border: 1px solid #e5e5e5; background: #fafafa; }
        .quote-text { color: #333; }
        .quote-author { color: #1a1a1a; }
        .quote-role { color: #888; }
        .body-text { color: #444; }
        .accent-border { border-color: #1a1a1a; }
        .hero-badge { background: #1a1a1a; color: #fff; }
        .hero-cat { color: rgba(255,255,255,0.6); }
        .hero-meta { color: rgba(255,255,255,0.4); }
        .hero-title { color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .hero-excerpt { color: rgba(255,255,255,0.7); }
        .hero-author-name { color: #fff; }
        .hero-author-date { color: rgba(255,255,255,0.4); }
        .hero-author-box { border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: #fff; }
        .hero-author-divider { border-color: rgba(255,255,255,0.1); }
        .cta-btn { background: #1a1a1a; color: #fff; }
        .caption { color: #999; }
        .img-border { border: 1px solid #eee; }
    `,
  luxury: `
        body { background: #050505; color: #fafafa; }
        .hero-bg { background: #050505; }
        .hero-overlay { background: linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.9)); }
        h1, h2 { color: #fafafa; }
        .bc { background: transparent; }
        .quote-card { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .quote-text { color: rgba(255,255,255,0.9); }
        .quote-author { color: #fff; }
        .quote-role { color: rgba(255,255,255,0.4); }
        .body-text { color: rgba(255,255,255,0.7); }
        .content-wrap { background: transparent; }
        .accent-border { border-color: rgba(255,255,255,0.15); }
        .hero-badge { background: #fff; color: #000; }
        .hero-cat { color: rgba(255,255,255,0.5); }
        .hero-meta { color: rgba(255,255,255,0.35); }
        .hero-title { color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
        .hero-excerpt { color: rgba(255,255,255,0.65); }
        .hero-author-name { color: #fff; }
        .hero-author-date { color: rgba(255,255,255,0.35); }
        .hero-author-box { border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: #fff; }
        .hero-author-divider { border-color: rgba(255,255,255,0.1); }
        .cta-btn { background: #fff; color: #000; }
        .caption { color: rgba(255,255,255,0.4); }
        .img-border { border: 1px solid rgba(255,255,255,0.1); }
    `,
  "gold-accent": `
        body { background: #0a0a08; color: #fafafa; }
        .hero-bg { background: #0a0a08; }
        .hero-overlay { background: linear-gradient(to bottom, rgba(10,10,8,0.5), rgba(10,10,8,0.92)); }
        h1, h2 { color: #f5e6c8; }
        .bc { background: transparent; }
        .quote-card { border: 1px solid rgba(201,168,92,0.3); background: rgba(201,168,92,0.05); }
        .quote-text { color: rgba(255,255,255,0.9); }
        .quote-author { color: #c9a85c; }
        .quote-role { color: rgba(255,255,255,0.4); }
        .body-text { color: rgba(255,255,255,0.7); }
        .content-wrap { background: transparent; }
        .accent-border { border-color: rgba(201,168,92,0.4); }
        .hero-badge { background: #c9a85c; color: #0a0a08; }
        .hero-cat { color: rgba(201,168,92,0.7); }
        .hero-meta { color: rgba(255,255,255,0.35); }
        .hero-title { color: #f5e6c8; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
        .hero-excerpt { color: rgba(255,255,255,0.65); }
        .hero-author-name { color: #c9a85c; }
        .hero-author-date { color: rgba(255,255,255,0.35); }
        .hero-author-box { border: 1px solid rgba(201,168,92,0.3); background: rgba(201,168,92,0.08); color: #c9a85c; }
        .hero-author-divider { border-color: rgba(201,168,92,0.2); }
        .cta-btn { background: #c9a85c; color: #0a0a08; }
        .caption { color: rgba(255,255,255,0.4); }
        .img-border { border: 1px solid rgba(201,168,92,0.2); }
    `,
};

// ── Shared email wrapper ──────────────────────────────────
function emailWrap(body: string, title: string): string {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<style>body{margin:0;padding:0;-webkit-text-size-adjust:100%}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;max-width:100%}a{color:inherit}@media only screen and (max-width:640px){.ec{width:100%!important;padding:0 16px!important}.ec img{width:100%!important;height:auto!important}}</style>
</head><body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:20px 0;">
<div class="ec" style="max-width:600px;margin:0 auto;background:#fff;">
<div style="padding:30px 20px;text-align:center;background:#050505;"><img src="/images/DreamPlay%20Logo%20White.png" alt="DreamPlay" style="height:32px;display:inline-block;"/></div>
${body}
<div style="padding:10px 30px;text-align:center;"><hr style="border:none;border-top:1px solid #e5e5e5;width:80%;margin:0 auto;"/></div>
<div style="padding:20px 30px;text-align:center;">
<a href="https://instagram.com/dreamplaypianos" target="_blank" style="text-decoration:none;display:inline-block;margin:0 6px;"><span style="display:inline-block;width:32px;height:32px;background:#E4405F;border-radius:50%;text-align:center;line-height:32px;color:#fff;font-size:13px;font-weight:bold;">I</span></a>
<a href="https://youtube.com/@dreamplaypianos" target="_blank" style="text-decoration:none;display:inline-block;margin:0 6px;"><span style="display:inline-block;width:32px;height:32px;background:#FF0000;border-radius:50%;text-align:center;line-height:32px;color:#fff;font-size:13px;font-weight:bold;">Y</span></a>
<a href="https://facebook.com/dreamplaypianos" target="_blank" style="text-decoration:none;display:inline-block;margin:0 6px;"><span style="display:inline-block;width:32px;height:32px;background:#1877F2;border-radius:50%;text-align:center;line-height:32px;color:#fff;font-size:13px;font-weight:bold;">F</span></a>
</div>
<div style="padding:15px 30px 30px;text-align:center;font-size:11px;color:#aaa;">
<p style="margin:0;">DreamPlay Pianos &bull; Victoria, BC, Canada</p>
<p style="margin:5px 0 0;"><a href="{{unsubscribe_url}}" style="color:#aaa;text-decoration:underline;">Unsubscribe</a></p>
</div>
</div></div></body></html>`;
}

// ── Shared blog wrapper (theme-aware) ─────────────────────
function blogWrap(hero: string, content: string, title: string, theme: BlogTheme): string {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;transition:all .3s}
.bc{max-width:800px;margin:0 auto;padding:0 24px}
.sf{font-family:'Cormorant Garamond',Georgia,serif}
img{max-width:100%;height:auto;display:block}
${blogThemeCSS[theme]}
</style>
</head><body>
<div style="padding:20px 24px;text-align:center;background:#050505;">
<img src="/images/DreamPlay%20Logo%20White.png" alt="DreamPlay" style="height:28px;display:inline-block;" />
</div>
${hero}
<div class="content-wrap">
<div class="bc" style="padding-top:60px;padding-bottom:80px;">
${content}
</div>
</div>
</body></html>`;
}

// ── Newsletter content per page ───────────────────────────
const NEWSLETTER_CONTENT: Record<PageId, string> = {
  "learn": emailWrap(`
<div style="padding:0;text-align:center;background:#050505;"><img src="/images/learn/grid-hero-still.jpg" alt="DreamPlay Learn" style="display:block;max-width:100%;width:600px;height:auto;opacity:0.8;"/></div>
<div style="height:30px;"></div>
<div style="padding:10px 30px;text-align:center;"><p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#888;">Software + Hardware Integration</p></div>
<div style="padding:10px 30px;text-align:center;"><h1 style="margin:0;font-size:28px;color:#1a1a1a;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">Learn Piano.<br/><span style="color:#3b82f6;">The Smart Way.</span></h1></div>
<div style="padding:5px 30px;text-align:center;"><p style="margin:0;font-size:15px;color:#666;font-family:Georgia,serif;">DreamPlay Learn guides you note by note - on screen and on your keyboard.</p></div>
<div style="height:20px;"></div>
<div style="padding:10px 30px;text-align:center;"><hr style="border:none;border-top:1px solid #e5e5e5;width:60%;margin:0 auto;"/></div>
<div style="padding:20px 30px;"><h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">Two Modes. One App.</h2><p style="font-size:15px;line-height:1.7;color:#444;">Choose <strong>Sheet Music Mode</strong> for traditional reading or <strong>Falling Notes Mode</strong> for visual learning. Use both simultaneously for the full experience.</p></div>
<div style="padding:10px 30px;text-align:center;"><img src="/images/learn/sheet-music-mode-real.jpg" alt="Sheet Music Mode" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:1px solid #eee;"/><p style="margin:10px 0 0;font-size:13px;color:#888;">Sheet Music Mode</p></div>
<div style="height:15px;"></div>
<div style="padding:10px 30px;text-align:center;"><img src="/images/learn/falling-notes-still.jpg" alt="Falling Notes Mode" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:1px solid #eee;"/><p style="margin:10px 0 0;font-size:13px;color:#888;">Falling Notes Mode</p></div>
<div style="height:15px;"></div>
<div style="padding:10px 30px;text-align:center;"><img src="/images/learn/ui-playthrough-still.jpg" alt="Both modes together" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:1px solid #eee;"/><p style="margin:10px 0 0;font-size:13px;color:#888;">Use both modes at once</p></div>
<div style="height:15px;"></div>
<div style="padding:20px 30px;"><h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">Smart Guidance</h2><p style="font-size:15px;line-height:1.7;color:#444;">Every note comes with <strong>finger number suggestions</strong>. Correct notes light up green, wrong notes flash red.</p></div>
<div style="height:10px;"></div>
<div style="padding:20px 30px;"><h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">LED Key Integration</h2><p style="font-size:15px;line-height:1.7;color:#444;">The DreamPlay One lights up the keys you need to press - learn by sight <strong>and</strong> by feel.</p></div>
<div style="padding:10px 30px;text-align:center;"><img src="/images/learn/pianist-led-keys.jpg" alt="LED keys" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;"/></div>
<div style="height:10px;"></div>
<div style="padding:20px 30px;"><h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">Tempo Control &amp; Detection</h2><p style="font-size:15px;line-height:1.7;color:#444;">Slow it down to learn, speed it up to challenge yourself. The app adapts to <strong>your pace</strong>.</p></div>
<div style="padding:10px 30px;text-align:center;"><img src="/images/learn/control-buttons.jpg" alt="Control buttons" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;"/></div>
<div style="height:20px;"></div>
<div style="padding:10px 30px;text-align:center;"><a href="https://www.dreamplaypianos.com/customize" target="_blank" style="display:inline-block;padding:14px 40px;background:#1a1a1a;color:#fff;font-size:12px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Get DreamPlay One &rarr;</a></div>
<div style="height:30px;"></div>
`, "DreamPlay Learn — The Smart Way to Learn Piano"),

  "better-practice": emailWrap(`
<div style="padding:0;text-align:center;"><img src="/images/BW%20Piano%20(1).jpg" alt="Piano" style="display:block;max-width:100%;width:600px;height:auto;"/></div>
<div style="height:30px;"></div>
<div style="padding:10px 30px;text-align:center;"><h1 style="margin:0;font-size:28px;color:#1a1a1a;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">The Benefits of Practicing on Narrower Keys</h1></div>
<div style="padding:5px 30px;text-align:center;"><p style="margin:0;font-size:18px;color:#666;font-family:Georgia,serif;font-style:italic;">Stop practicing the stretch. Start playing the music.</p></div>
<div style="height:20px;"></div>
<div style="padding:10px 30px;text-align:center;"><hr style="border:none;border-top:1px solid #e5e5e5;width:60%;margin:0 auto;"/></div>
<div style="padding:15px 30px;font-size:15px;line-height:1.7;color:#444;text-align:left;">The greater the degree of technical difficulty for a pianist, <strong>the greater the amount of practice required</strong>. This means less time and mental capacity to focus on musical expression.</div>
<div style="padding:5px 30px;font-size:15px;line-height:1.7;color:#444;text-align:left;">When small-handed pianists play on a smaller keyboard, <strong>it is often a revelation</strong>.</div>
<div style="height:15px;"></div>
<div style="padding:20px 30px;"><div style="background:#f9f9f9;border-left:3px solid #1a1a1a;padding:20px 25px;"><p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#333;font-family:Georgia,serif;font-style:italic;">"I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size..."</p><p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;"><strong style="color:#333;">Christopher Donison</strong><br/>Executive Artistic Director, Music by the Sea</p></div></div>
<div style="height:15px;"></div>
<div style="padding:20px 30px;"><div style="background:#fdf8ef;border-left:3px solid #c9a85c;padding:20px 25px;"><p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#333;font-family:Georgia,serif;font-style:italic;">"Everything is easier on the 6.0 for me&hellip; I feel very comfortable playing scales, fast passages, or big chords"</p><p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;"><strong style="color:#c9a85c;">Claudia Wang</strong><br/>Master's Student at SMU</p></div></div>
<div style="height:20px;"></div>
<div style="padding:10px 30px;text-align:center;"><a href="https://www.dreamplaypianos.com/customize" target="_blank" style="display:inline-block;padding:14px 40px;background:#1a1a1a;color:#fff;font-size:12px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Configure Yours &rarr;</a></div>
<div style="height:30px;"></div>
`, "The Benefits of Practicing on Narrower Keys"),
};

// ── Gmail-safe content (table layout, pure inline, no CSS classes) ──
const GMAIL_CONTENT: Record<string, string> = {
  "learn": `< !DOCTYPE html> <html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>DreamPlay Learn</title></head>
  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f7;">
      <tr><td align="center" style="padding:20px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="580" style="max-width:580px;background:#ffffff;">
          <tr><td style="padding:0;background:#050505;text-align:center;">
            <img src="/images/learn/grid-hero-still.jpg" alt="DreamPlay Learn" width="580" style="display:block;width:100%;max-width:580px;height:auto;border:0;" />
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;background:#050505;">
            <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#888888;">Software + Hardware Integration</p>
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;background:#050505;">
            <h1 style="margin:0;font-size:28px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">Learn Piano.<br /><span style="color:#3b82f6;">The Smart Way.</span></h1>
          </td></tr>
          <tr><td style="padding:5px 30px;text-align:center;background:#050505;">
            <p style="margin:0;font-size:15px;color:#999999;font-family:Georgia,serif;">DreamPlay Learn guides you note by note - on screen and on your keyboard.</p>
          </td></tr>
          <tr><td style="padding:20px 30px;background:#050505;text-align:center;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr><td style="background:#ffffff;padding:12px 36px;"><a href="https://www.dreamplaypianos.com/learn" style="color:#000000;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Learn More</a></td></tr></table>
          </td></tr>
          <tr><td style="height:20px;background:#050505;"></td></tr>
          <tr><td style="padding:10px 30px;text-align:center;"><hr style="border:none;border-top:1px solid #e5e5e5;width:60%;margin:0 auto;" /></td></tr>
          <tr><td style="padding:20px 30px;">
            <h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">Two Modes. One App.</h2>
            <p style="font-size:15px;line-height:1.7;color:#444444;">Choose <strong>Sheet Music Mode</strong> for traditional reading or <strong>Falling Notes Mode</strong> for visual learning. Use both simultaneously for the full experience.</p>
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;">
            <img src="/images/learn/sheet-music-mode-real.jpg" alt="Sheet Music Mode" width="540" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:0;" />
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;">
            <img src="/images/learn/falling-notes-still.jpg" alt="Falling Notes Mode" width="540" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:0;" />
          </td></tr>
          <tr><td style="padding:20px 30px;">
            <h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">LED Key Integration</h2>
            <p style="font-size:15px;line-height:1.7;color:#444444;">The DreamPlay One lights up the keys you need to press - learn by sight <strong>and</strong> by feel.</p>
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;">
            <img src="/images/learn/pianist-led-keys.jpg" alt="LED keys" width="540" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:0;" />
          </td></tr>
          <tr><td style="padding:20px 30px;text-align:center;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr><td style="background:#000000;padding:14px 40px;"><a href="https://www.dreamplaypianos.com/customize" style="color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Get DreamPlay One</a></td></tr></table>
          </td></tr>
          <tr><td style="padding:15px 30px 30px;text-align:center;font-size:11px;color:#aaaaaa;">
            <p style="margin:0;">DreamPlay Pianos - Victoria, BC, Canada</p>
            <p style="margin:5px 0 0;"><a href="{{unsubscribe_url}}" style="color:#aaaaaa;text-decoration:underline;">Unsubscribe</a></p>
          </td></tr>
        </table>
      </td></tr></table></body></html>`,

  "better-practice": `< !DOCTYPE html > <html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>The Benefits of Narrower Keys</title></head>
  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f7;">
      <tr><td align="center" style="padding:20px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="580" style="max-width:580px;background:#ffffff;">
          <tr><td style="padding:30px 30px 10px;text-align:center;">
            <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#888888;">Science + Research</p>
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;">
            <h1 style="margin:0;font-size:26px;color:#1a1a1a;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">The Benefits of Practicing<br />on Narrower Keys</h1>
          </td></tr>
          <tr><td style="padding:5px 30px 20px;text-align:center;">
            <p style="margin:0;font-size:14px;color:#666666;">Why reducing key width transforms technique and unlocks new musicality.</p>
          </td></tr>
          <tr><td style="padding:10px 30px;text-align:center;"><hr style="border:none;border-top:1px solid #e5e5e5;width:60%;margin:0 auto;" /></td></tr>
          <tr><td style="padding:20px 30px;">
            <h2 style="margin:0 0 10px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">The Cognitive Load Problem</h2>
            <p style="font-size:15px;line-height:1.7;color:#444444;">The greater the technical difficulty, <strong>the greater the practice required</strong>. When small-handed pianists switch to a smaller keyboard, it is often a revelation.</p>
          </td></tr>
          <tr><td style="padding:10px 30px;background:#f8f8f8;border-left:3px solid #e5e5e5;">
            <p style="font-size:15px;line-height:1.6;color:#555555;font-style:italic;margin:10px 0;">"I realize now that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size..."</p>
            <p style="font-size:12px;color:#888888;margin:5px 0 10px;"><strong>Christopher Donison</strong> - Executive Artistic Director, Music by the Sea</p>
          </td></tr>
          <tr><td style="padding:20px 30px;">
            <p style="font-size:15px;line-height:1.7;color:#444444;">Narrower keys teach relaxed technique. That muscle memory translates back to any piano.</p>
          </td></tr>
          <tr><td style="padding:10px 30px;background:#f8f8f8;border-left:3px solid #e5e5e5;">
            <p style="font-size:15px;line-height:1.6;color:#555555;font-style:italic;margin:10px 0;">"Another surprising effect was that playing the DS6.0 also has a positive effect when you go back to the normal keyboard."</p>
            <p style="font-size:12px;color:#888888;margin:5px 0 10px;"><strong>Hubert Ness</strong> - Professor of Jazz Piano, HMDK University of Stuttgart</p>
          </td></tr>
          <tr><td style="padding:20px 30px;text-align:center;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr><td style="background:#000000;padding:14px 40px;"><a href="https://www.dreamplaypianos.com/customize" style="color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Configure Yours</a></td></tr></table>
          </td></tr>
          <tr><td style="padding:15px 30px 30px;text-align:center;font-size:11px;color:#aaaaaa;">
            <p style="margin:0;">DreamPlay Pianos - Victoria, BC, Canada</p>
            <p style="margin:5px 0 0;"><a href="{{unsubscribe_url}}" style="color:#aaaaaa;text-decoration:underline;">Unsubscribe</a></p>
          </td></tr>
        </table>
      </td></tr></table></body></html>`,
};

// ── Blog content per page (theme-agnostic HTML using CSS classes) ──
function getBlogContent(page: PageId, theme: BlogTheme): string {
  if (page === "learn") {
    return blogWrap(
      `<div style="position:relative;min-height:450px;overflow:hidden;" class="hero-bg">
<img src="/images/learn/grid-hero-still.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;"/>
<div style="position:absolute;inset:0;" class="hero-overlay"></div>
<div class="bc" style="position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;min-height:450px;padding-bottom:60px;">
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
<span class="hero-badge" style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;padding:4px 12px;">Featured</span>
<span class="hero-cat" style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;">Product</span>
<span class="hero-meta" style="font-size:10px;text-transform:uppercase;letter-spacing:3px;">4 min read</span>
</div>
<h1 class="sf hero-title" style="font-size:48px;line-height:1.15;font-weight:600;margin-bottom:20px;">Learn Piano. The Smart Way.</h1>
<p class="hero-excerpt" style="font-size:15px;line-height:1.7;max-width:600px;">How DreamPlay Learn combines on-screen guidance with LED-lit keys to create the most intuitive piano learning experience.</p>
<div style="display:flex;align-items:center;gap:16px;margin-top:30px;padding-top:24px;" class="hero-author-divider">
<div class="hero-author-box sf" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:14px;">DP</div>
<div><span class="hero-author-name" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">DreamPlay Editorial</span><div class="hero-author-date" style="font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">March 9, 2026</div></div>
</div>
</div></div>`,
      `
<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">Two Modes. One App.</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:20px;">DreamPlay Learn offers two complementary practice modes: <strong>Sheet Music Mode</strong> for traditional notation reading, and <strong>Falling Notes Mode</strong> for an intuitive, visual approach.</p>
<div class="img-border" style="margin:30px 0;overflow:hidden;"><img src="/images/learn/sheet-music-mode-real.jpg" alt="Sheet Music Mode" style="width:100%;height:auto;"/></div>
<p class="caption" style="font-size:13px;margin-bottom:20px;text-align:center;">Sheet Music Mode  -  real-time notation tracking</p>
<div class="img-border" style="margin:30px 0;overflow:hidden;"><img src="/images/learn/falling-notes-still.jpg" alt="Falling Notes Mode" style="width:100%;height:auto;"/></div>
<p class="caption" style="font-size:13px;margin-bottom:20px;text-align:center;">Falling Notes Mode  -  intuitive visual learning</p>
<div class="img-border" style="margin:30px 0;overflow:hidden;"><img src="/images/learn/ui-playthrough-still.jpg" alt="Both modes together" style="width:100%;height:auto;"/></div>
<p class="caption" style="font-size:13px;margin-bottom:40px;text-align:center;">Use both modes at once for the ultimate practice session</p>

<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">Smart Guidance That Listens</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:20px;">Every note comes with <strong>finger number suggestions</strong>. Correct notes light up green, wrong notes flash red - like a patient teacher 24/7.</p>

<div class="quote-card" style="padding:30px;margin:30px 0;text-align:center;">
<div class="sf quote-text" style="font-size:22px;line-height:1.5;margin-bottom:12px;">The only keyboard that teaches you <em>while</em> you play.</div>
<p class="caption" style="font-size:14px;">Software + Hardware, perfectly in sync.</p>
</div>

<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">LED Key Integration</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:20px;">The DreamPlay One literally <strong>lights up the keys</strong> you need to press. Learn by sight and feel simultaneously.</p>
<div class="img-border" style="margin:30px 0;overflow:hidden;"><img src="/images/learn/pianist-led-keys.jpg" alt="LED keys glowing" style="width:100%;height:auto;"/></div>
<p class="caption" style="font-size:13px;margin-bottom:40px;text-align:center;">LED-lit keys guide your fingers in real time</p>

<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">Tempo Control &amp; Detection</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:20px;">Start slow, build confidence, then speed up. The app adapts to <strong>your pace</strong>.</p>
<div class="img-border" style="margin:30px 0;overflow:hidden;"><img src="/images/learn/control-buttons.jpg" alt="Control buttons" style="width:100%;height:auto;"/></div>
<p class="caption" style="font-size:13px;margin-bottom:40px;text-align:center;">Adaptive tempo control interface</p>

<div style="text-align:center;padding:40px 0;">
<h2 class="sf" style="font-size:36px;font-weight:600;margin-bottom:16px;">Start Learning Smarter.</h2>
<p class="body-text" style="font-size:15px;margin-bottom:30px;">The DreamPlay One is the only keyboard with a built-in learning app.</p>
<a href="https://www.dreamplaypianos.com/customize" class="cta-btn" style="display:inline-block;padding:14px 40px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;text-decoration:none;">Get DreamPlay One &rarr;</a>
</div>
`, "DreamPlay Learn — The Smart Way", theme);
  }

  if (page === "better-practice") {
    return blogWrap(
      `<div style="position:relative;min-height:450px;overflow:hidden;" class="hero-bg">
<img src="/images/BW%20Piano%20(1).jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;"/>
<div style="position:absolute;inset:0;" class="hero-overlay"></div>
<div class="bc" style="position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;min-height:450px;padding-bottom:60px;">
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
<span class="hero-badge" style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;padding:4px 12px;">Featured</span>
<span class="hero-cat" style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;">Science &amp; Research</span>
<span class="hero-meta" style="font-size:10px;text-transform:uppercase;letter-spacing:3px;">5 min read</span>
</div>
<h1 class="sf hero-title" style="font-size:48px;line-height:1.15;font-weight:600;margin-bottom:20px;">The Benefits of Practicing on Narrower Keys</h1>
<p class="hero-excerpt" style="font-size:15px;line-height:1.7;max-width:600px;">Why reducing key width transforms technique, eliminates injury risk, and unlocks new musicality.</p>
<div style="display:flex;align-items:center;gap:16px;margin-top:30px;padding-top:24px;" class="hero-author-divider">
<div class="hero-author-box sf" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:14px;">DP</div>
<div><span class="hero-author-name" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">DreamPlay Editorial</span><div class="hero-author-date" style="font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">March 9, 2026</div></div>
</div>
</div></div>`,
      `
<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">The Cognitive Load of Small Hands</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:20px;">The greater the degree of technical difficulty, <strong>the greater the practice required</strong>. Less time and mental capacity for musical expression.</p>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:40px;">When small-handed pianists switch to a smaller keyboard, <strong>it is often a revelation</strong>.</p>

<div class="quote-card" style="padding:40px;margin-bottom:50px;">
<div class="sf quote-text" style="font-size:22px;line-height:1.6;font-style:italic;margin-bottom:20px;">"I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size&hellip;"</div>
<span class="quote-author" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Christopher Donison</span>
<div class="quote-role" style="font-size:11px;margin-top:4px;">Executive Artistic Director, Music by the Sea</div>
</div>

<div class="quote-card accent-border" style="padding:40px;margin-bottom:50px;text-align:center;border-left:3px solid;">
<div class="sf quote-text" style="font-size:22px;line-height:1.6;font-style:italic;margin-bottom:20px;">"Everything is easier on the 6.0 for me&hellip; I feel very comfortable playing scales, fast passages, or big chords"</div>
<span class="quote-author" style="font-size:12px;font-weight:600;">Claudia Wang</span>
<div class="quote-role" style="font-size:11px;margin-top:4px;">Master's Student, Southern Methodist University</div>
</div>

<h2 class="sf" style="font-size:32px;font-weight:600;margin-bottom:24px;">"Will this ruin my technique?"</h2>
<p class="body-text" style="font-size:16px;line-height:1.8;margin-bottom:30px;">The exact opposite. Narrower keys teach relaxed technique. That muscle memory translates back to any piano.</p>

<div class="quote-card" style="padding:40px;margin-bottom:50px;text-align:center;">
<div style="height:2px;margin-bottom:24px;" class="accent-border" style="border-top:1px solid;"></div>
<div class="sf quote-text" style="font-size:24px;line-height:1.5;margin-bottom:20px;">"Another surprising effect for me was that playing this [DS6.0] also has a positive effect when you go back to the normal keyboard."</div>
<span class="quote-author" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Hubert Ness</span>
<div class="quote-role" style="font-size:11px;margin-top:4px;">Professor of Jazz Piano, HMDK University of Stuttgart</div>
</div>

<div style="text-align:center;padding:40px 0;">
<h2 class="sf" style="font-size:36px;font-weight:600;margin-bottom:16px;">Experience the Revelation.</h2>
<p class="body-text" style="font-size:15px;margin-bottom:30px;">Stop limiting your repertoire.</p>
<a href="https://www.dreamplaypianos.com/customize" class="cta-btn" style="display:inline-block;padding:14px 40px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;text-decoration:none;">Configure Yours &rarr;</a>
</div>
`, "The Benefits of Practicing on Narrower Keys", theme);
  }

  // Fallback for pages without custom blog content
  return '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;min-height:400px;font-family:system-ui;color:#888;background:#f4f4f7;"><div style="text-align:center;"><p style="font-size:16px;font-weight:600;">No Blog conversion yet</p><p style="font-size:13px;margin-top:8px;color:#aaa;">Page: ' + page + '</p></div></body></html>';
}

// ── Page Component ────────────────────────────────────────
export default function ContentRemixerPage() {
  const [selectedPage, setSelectedPage] = useState<PageId>("learn");
  const [activeTab, setActiveTab] = useState<ViewTab>("website");
  const [splitView, setSplitView] = useState(false);
  const [splitRight, setSplitRight] = useState<ViewTab>("newsletter");
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const [blogTheme, setBlogTheme] = useState<BlogTheme>("luxury");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedContent, setConvertedContent] = useState<Record<string, {
    newsletter: string;
    blog: Record<string, string>;
    gmail: string;
    reddit: string;
    twitter: string;
    igCarousel: string;
    igAd: string;
    blocks: ContentBlock[];
  }>>({});
  const webIframeRef = useRef<HTMLIFrameElement>(null);
  const splitWebIframeRef = useRef<HTMLIFrameElement>(null);

  // ── Edit Mode State ──────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editedHtml, setEditedHtml] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const editIframeRef = useRef<HTMLIFrameElement>(null);

  // Load drafts from localStorage on mount
  useEffect(() => { setDrafts(loadDrafts()); }, []);

  // Listen for postMessage from edit iframe
  useEffect(() => {
    if (!editMode) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "IMAGE_CLICK") {
        setSelectedImgId(e.data.imgId);
        setShowImagePicker(true);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [editMode]);

  // Get current iframe HTML for saving
  const getCurrentEditedHtml = useCallback((): string => {
    const iframe = editIframeRef.current;
    if (iframe?.contentDocument) {
      // Clone doc, remove edit script, return HTML
      const doc = iframe.contentDocument;
      const clone = doc.documentElement.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("script").forEach(s => s.remove());
      // Remove contentEditable attrs
      clone.querySelectorAll("[contenteditable]").forEach(el => el.removeAttribute("contenteditable"));
      return "<!DOCTYPE html><html>" + clone.innerHTML + "</html>";
    }
    return editedHtml || "";
  }, [editedHtml]);

  // Handle image swap from picker
  const handleSwapImage = useCallback((newSrc: string) => {
    if (selectedImgId === null) return;
    editIframeRef.current?.contentWindow?.postMessage({ type: "SWAP_IMAGE", imgId: selectedImgId, newSrc }, "*");
    setShowImagePicker(false);
    setSelectedImgId(null);
    showToast("Image swapped! Remember to save your draft.");
  }, [selectedImgId]);

  // Save draft
  const handleSaveDraft = useCallback(() => {
    if (!draftName.trim()) return;
    const html = getCurrentEditedHtml();
    const format = splitView ? splitRight : activeTab;
    const draft: Draft = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: draftName.trim(),
      page: selectedPage,
      format,
      theme: format === "blog" ? blogTheme : undefined,
      html,
      savedAt: new Date().toISOString(),
    };
    const updated = [...drafts, draft];
    setDrafts(updated);
    saveDrafts(updated);
    setShowSaveDialog(false);
    setDraftName("");
    showToast(`Draft "${draft.name}" saved!`);
  }, [draftName, drafts, getCurrentEditedHtml, splitView, splitRight, activeTab, selectedPage, blogTheme]);

  // Load draft
  const handleLoadDraft = useCallback((draft: Draft) => {
    setEditedHtml(draft.html);
    setEditMode(true);
    setShowDrafts(false);
    showToast(`Draft "${draft.name}" loaded.`);
  }, []);

  // Delete draft
  const handleDeleteDraft = useCallback((id: string) => {
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    saveDrafts(updated);
    showToast("Draft deleted.");
  }, [drafts]);

  // Enter edit mode
  const handleEnterEdit = useCallback(() => {
    // Get current content HTML and inject edit script
    const format = splitView ? splitRight : activeTab;
    let html = "";
    if (format === "newsletter") html = getNewsletterContent(selectedPage);
    else if (format === "blog") html = getDynamicBlogContent(selectedPage, blogTheme);
    else if (format === "gmail") html = getGmailContent(selectedPage);
    else if (format === "reddit") html = convertedContent[selectedPage]?.reddit || "";
    else if (format === "twitter") html = convertedContent[selectedPage]?.twitter || "";
    else if (format === "ig-posts") html = convertedContent[selectedPage]?.igCarousel || "";
    else if (format === "ig-ad") html = convertedContent[selectedPage]?.igAd || "";
    if (!html) {
      showToast("Convert the page first, then enter Edit Mode.");
      return;
    }
    // Inject edit script before </body>
    const injected = html.replace("</body>", EDIT_SCRIPT + "</body>");
    setEditedHtml(injected);
    setEditMode(true);
  }, [splitView, splitRight, activeTab, selectedPage, blogTheme, convertedContent]);

  // Exit edit mode
  const handleExitEdit = useCallback(() => {
    setEditMode(false);
    setEditedHtml(null);
    setShowImagePicker(false);
    setSelectedImgId(null);
  }, []);

  const currentPage = PAGES.find((p) => p.id === selectedPage)!;

  const fallbackHtml = (format: string, pageId: string) =>
    '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;min-height:400px;font-family:system-ui;color:#888;background:#f4f4f7;"><div style="text-align:center;"><p style="font-size:16px;font-weight:600;">No ' + format + ' conversion yet</p><p style="font-size:13px;margin-top:8px;color:#aaa;">Click <strong>Convert</strong> to generate from website content</p></div></body></html>';

  // Gmail content: converted → hardcoded → fallback
  const getGmailContent = useCallback((pageId: string): string => {
    if (convertedContent[pageId]?.gmail) return convertedContent[pageId].gmail;
    if (GMAIL_CONTENT[pageId]) return GMAIL_CONTENT[pageId];
    return fallbackHtml("Gmail", pageId);
  }, [convertedContent]);

  // Newsletter content: converted → hardcoded → fallback
  const getNewsletterContent = useCallback((pageId: string): string => {
    if (convertedContent[pageId]?.newsletter) return convertedContent[pageId].newsletter;
    if (NEWSLETTER_CONTENT[pageId]) return NEWSLETTER_CONTENT[pageId];
    return fallbackHtml("Newsletter", pageId);
  }, [convertedContent]);

  // Blog content: converted → hardcoded → fallback
  const getDynamicBlogContent = useCallback((pageId: string, theme: BlogTheme): string => {
    if (convertedContent[pageId]?.blog?.[theme]) return convertedContent[pageId].blog[theme];
    return getBlogContent(pageId, theme);
  }, [convertedContent]);

  // Decide what right-side content to show (for split view)
  const getRightContent = (): string => {
    if (splitRight === "newsletter") return getNewsletterContent(selectedPage);
    if (splitRight === "blog") return getDynamicBlogContent(selectedPage, blogTheme);
    if (splitRight === "gmail") return getGmailContent(selectedPage);
    if (splitRight === "reddit") return convertedContent[selectedPage]?.reddit || fallbackHtml("Reddit Ad", selectedPage);
    if (splitRight === "twitter") return convertedContent[selectedPage]?.twitter || fallbackHtml("X Post", selectedPage);
    if (splitRight === "ig-posts") return convertedContent[selectedPage]?.igCarousel || fallbackHtml("IG Posts", selectedPage);
    if (splitRight === "ig-ad") return convertedContent[selectedPage]?.igAd || fallbackHtml("IG Ad", selectedPage);
    return "";
  };
  const rightContent = getRightContent();

  const getActiveContent = (): string => {
    if (activeTab === "newsletter") return getNewsletterContent(selectedPage);
    if (activeTab === "blog") return getDynamicBlogContent(selectedPage, blogTheme);
    if (activeTab === "gmail") return getGmailContent(selectedPage);
    if (activeTab === "reddit") return convertedContent[selectedPage]?.reddit || fallbackHtml("Reddit Ad", selectedPage);
    if (activeTab === "twitter") return convertedContent[selectedPage]?.twitter || fallbackHtml("X Post", selectedPage);
    if (activeTab === "ig-posts") return convertedContent[selectedPage]?.igCarousel || fallbackHtml("IG Posts", selectedPage);
    if (activeTab === "ig-ad") return convertedContent[selectedPage]?.igAd || fallbackHtml("IG Ad", selectedPage);
    return "";
  };

  const singleContent = getActiveContent();

  const handleCopyHtml = useCallback(() => {
    const html = splitView ? rightContent : getActiveContent();
    if (!html) return;
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [splitView, rightContent, activeTab, selectedPage, blogTheme, convertedContent]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Social media: copy plain-text caption to clipboard
  const isSocialTab = (tab: ViewTab) => ["reddit", "twitter", "ig-posts", "ig-ad"].includes(tab);

  const handleCopyCaption = useCallback(() => {
    const pageData = convertedContent[selectedPage];
    if (!pageData?.blocks) {
      showToast("Convert the page first to generate captions.");
      return;
    }
    const blocks = pageData.blocks;
    const title = currentPage.label;
    const pageUrl = "https://www.dreamplaypianos.com" + currentPage.path;
    const tab = splitView ? splitRight : activeTab;

    let caption = "";
    if (tab === "reddit") caption = getRedditCaption(blocks, title, pageUrl);
    else if (tab === "twitter") caption = getTwitterCaption(blocks, title);
    else if (tab === "ig-posts") caption = getIGCarouselCaption(blocks, title);
    else if (tab === "ig-ad") caption = getIGAdCaption(blocks, title, pageUrl);

    if (!caption) return;
    navigator.clipboard.writeText(caption).then(() => {
      setCaptionCopied(true);
      showToast("Caption copied! Paste on your device.");
      setTimeout(() => setCaptionCopied(false), 2000);
    });
  }, [convertedContent, selectedPage, currentPage, splitView, splitRight, activeTab]);

  const handleDownloadAssets = useCallback(() => {
    const pageData = convertedContent[selectedPage];
    if (!pageData?.blocks) {
      showToast("Convert the page first to extract assets.");
      return;
    }
    const { images, videos } = getAllMediaUrls(pageData.blocks);
    if (images.length === 0 && videos.length === 0) {
      showToast("No media assets found on this page.");
      return;
    }

    // Download each image via anchor click
    let count = 0;
    images.forEach((src, i) => {
      const a = document.createElement("a");
      a.href = src;
      a.download = `dreamplay-asset-${i + 1}.jpg`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      count++;
    });
    videos.forEach((src, i) => {
      const a = document.createElement("a");
      a.href = src;
      a.download = `dreamplay-video-${i + 1}.mp4`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      count++;
    });
    showToast(`Downloading ${count} asset(s)...`);
  }, [convertedContent, selectedPage]);

  // Convert: scrape iframe DOM and build all formats
  const handleConvert = useCallback((targetTab?: ViewTab) => {
    // Try all iframe refs
    const activeIframe = webIframeRef.current || splitWebIframeRef.current;
    if (!activeIframe) {
      showToast("Website not loaded yet. Please wait for the page to load, then try again.");
      return;
    }

    try {
      const doc = activeIframe.contentDocument;
      if (!doc) {
        showToast("Cannot access iframe content. Make sure the website is loaded.");
        return;
      }

      setConverting(true);
      const blocks = scrapePageContent(doc);

      if (blocks.length === 0) {
        showToast("No content blocks found. Wait for the page to fully load and try again.");
        setConverting(false);
        return;
      }

      const title = currentPage.label;
      const pageUrl = "https://www.dreamplaypianos.com" + currentPage.path;
      const newsletter = blocksToNewsletter(blocks, title, pageUrl);
      const gmail = blocksToGmail(blocks, title);
      const blog: Record<string, string> = {
        minimalist: blocksToBlog(blocks, title, "minimalist"),
        luxury: blocksToBlog(blocks, title, "luxury"),
        "gold-accent": blocksToBlog(blocks, title, "gold-accent"),
      };
      const reddit = blocksToRedditAd(blocks, title, pageUrl);
      const twitter = blocksToTwitterPost(blocks, title);
      const igCarousel = blocksToIGCarousel(blocks, title);
      const igAd = blocksToIGAd(blocks, title, pageUrl);

      setConvertedContent((prev) => ({
        ...prev,
        [selectedPage]: { newsletter, blog, gmail, reddit, twitter, igCarousel, igAd, blocks },
      }));

      showToast(`Converted! ${blocks.length} content blocks extracted from ${currentPage.label}.`);
      setConverting(false);

      // Switch to target tab if provided
      if (targetTab) {
        setActiveTab(targetTab);
      } else if (activeTab === "website" && !splitView) {
        setActiveTab("newsletter");
      }
    } catch (e) {
      showToast("Conversion error: " + (e as Error).message);
      setConverting(false);
    }
  }, [selectedPage, currentPage, splitView, activeTab, blogTheme]);

  // Auto-convert when clicking a non-website tab (now activates split view)
  const handleTabClick = useCallback((tabId: ViewTab) => {
    setPageDropdownOpen(false);
    setThemeDropdownOpen(false);

    if (tabId === "website") {
      setActiveTab("website");
      setSplitView(false);
      return;
    }

    // Activate split view with website on left, format on right
    setSplitView(true);
    setSplitRight(tabId);
    setActiveTab(tabId);

    // Auto-convert if no content yet
    if (!convertedContent[selectedPage]) {
      // Small delay to let split view mount the iframe
      setTimeout(() => handleConvert(), 500);
    }
  }, [selectedPage, convertedContent, handleConvert]);

  return (
    <div>
      <SpecialOfferHeader forceOpaque darkMode className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />
      <main className="min-h-screen bg-[#0a0a0f] pt-[100px]">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#050505] px-6 py-8">
          <div className="container mx-auto max-w-7xl">
            <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">Content Pipeline</p>
            <h1 className="mb-4 font-serif text-3xl font-semibold text-white md:text-4xl">Content Remixer</h1>
            <p className="max-w-2xl font-sans text-sm text-white/50">
              Compare how website content converts to newsletter and blog formats. Select a source page and theme.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-[100px] z-50 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-md">
          <div className="container mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
            {/* Page selector */}
            <div className="relative">
              <button onClick={() => { setPageDropdownOpen(!pageDropdownOpen); setThemeDropdownOpen(false); }}
                className="flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-amber-300 transition-all cursor-pointer hover:bg-amber-400/20">
                <Monitor className="h-4 w-4" /> {currentPage.label} <ChevronDown className="h-3 w-3" />
              </button>
              {pageDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 border border-white/10 bg-[#0a0a0f] shadow-2xl min-w-[200px]">
                  {PAGES.map((p) => (
                    <button key={p.id} onClick={() => { setSelectedPage(p.id); setPageDropdownOpen(false); }}
                      className={`flex w - full items - center gap - 3 px - 5 py - 3 text - left font - sans text - xs uppercase tracking - wider transition - all cursor - pointer ${selectedPage === p.id ? "bg-amber-400/10 text-amber-300" : "text-white/50 hover:bg-white/5 hover:text-white/80"} `}>
                      <span className="font-medium">{p.label}</span>
                      <span className="text-white/20 ml-auto">{p.path}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mx-1 h-6 w-px bg-white/10" />

            {/* View tabs */}
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)}
                className={`${tab.id === "website" ? "md:hidden " : ""}flex items-center gap-2 border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${(tab.id === "website" ? !splitView && activeTab === "website" : splitView && splitRight === tab.id) ? "border-white bg-white text-black" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"}`}>
                {tab.icon} {tab.label}
              </button>
            ))}

            {/* Blog theme selector — visible when blog is showing */}
            {(activeTab === "blog" || (splitView && splitRight === "blog")) && (
              <>
                <div className="mx-1 h-6 w-px bg-white/10" />
                {/* Blog theme dropdown */}
                <div className="relative">
                  <button onClick={() => { setThemeDropdownOpen(!themeDropdownOpen); setPageDropdownOpen(false); }}
                    className="flex items-center gap-2 border border-purple-400/30 bg-purple-400/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-purple-300 transition-all cursor-pointer hover:bg-purple-400/20">
                    <Palette className="h-4 w-4" />
                    {BLOG_THEMES.find((t) => t.id === blogTheme)?.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {themeDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50 border border-white/10 bg-[#0a0a0f] shadow-2xl min-w-[180px]">
                      {BLOG_THEMES.map((t) => (
                        <button key={t.id} onClick={() => { setBlogTheme(t.id); setThemeDropdownOpen(false); }}
                          className={`flex w - full items - center gap - 3 px - 5 py - 3 text - left font - sans text - xs uppercase tracking - wider transition - all cursor - pointer ${blogTheme === t.id ? "bg-purple-400/10 text-purple-300" : "text-white/50 hover:bg-white/5 hover:text-white/80"} `}>
                          <span className={`font - medium ${t.color} `}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mx-1 h-6 w-px bg-white/10" />

            {/* Force refresh */}
            <button onClick={() => { setRefreshKey((k) => k + 1); setPageDropdownOpen(false); setThemeDropdownOpen(false); }}
              className="flex items-center gap-2 border border-white/10 px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white/50 transition-all cursor-pointer hover:border-white/30 hover:text-white/80" title="Force refresh all previews">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>

            {/* Copy HTML — visible when not on website tab */}
            {(activeTab !== "website" || splitView) && (
              <button onClick={handleCopyHtml}
                className={`flex items - center gap - 2 border px - 3 py - 2 font - sans text - xs font - medium uppercase tracking - wider transition - all cursor - pointer ${copied ? "border-green-400 bg-green-400/10 text-green-300" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"} `}
                title="Copy HTML to clipboard">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy HTML"}
              </button>
            )}

            {/* Generate / Convert */}
            <button onClick={() => handleConvert()}
              disabled={converting}
              className={`flex items-center gap-2 border px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${converting ? "border-green-400/50 bg-green-400/10 text-green-300 animate-pulse" : "border-emerald-400/30 bg-emerald-400/5 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-400/50"}`}
              title="Convert website content to newsletter, blog, and gmail formats">
              <ArrowRightLeft className="h-4 w-4" /> {converting ? "Converting..." : (convertedContent[selectedPage] ? "Re-convert" : "Convert")}
            </button>

            <div className="mx-1 h-6 w-px bg-white/10" />

            {/* Edit Mode Controls */}
            {!editMode ? (
              <>
                <button onClick={handleEnterEdit}
                  className="flex items-center gap-2 border border-blue-400/30 bg-blue-400/5 px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-blue-300 transition-all cursor-pointer hover:bg-blue-400/10 hover:border-blue-400/50"
                  title="Edit text and swap images">
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <div className="relative">
                  <button onClick={() => { setShowDrafts(!showDrafts); setPageDropdownOpen(false); setThemeDropdownOpen(false); }}
                    className="flex items-center gap-2 border border-white/10 px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white/50 transition-all cursor-pointer hover:border-white/30 hover:text-white/80"
                    title="Load a saved draft">
                    <FolderOpen className="h-4 w-4" /> Drafts{drafts.length > 0 && <span className="ml-1 text-amber-300">({drafts.length})</span>}
                  </button>
                  {showDrafts && (
                    <div className="absolute right-0 top-full mt-1 z-50 border border-white/10 bg-[#0a0a0f] shadow-2xl min-w-[280px] max-h-[400px] overflow-y-auto">
                      {drafts.length === 0 ? (
                        <div className="px-5 py-4 text-center font-sans text-xs text-white/30">No saved drafts yet</div>
                      ) : drafts.map(d => (
                        <div key={d.id} className="flex items-center gap-2 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all">
                          <button onClick={() => handleLoadDraft(d)} className="flex-1 text-left cursor-pointer">
                            <div className="font-sans text-xs font-medium text-white/80">{d.name}</div>
                            <div className="font-sans text-[10px] text-white/30 mt-0.5">{d.page} · {d.format}{d.theme ? ` · ${d.theme}` : ""} · {new Date(d.savedAt).toLocaleDateString()}</div>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteDraft(d.id); }}
                            className="p-1.5 text-white/20 hover:text-red-400 transition-colors cursor-pointer" title="Delete draft">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setShowSaveDialog(true)}
                  className="flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-amber-300 transition-all cursor-pointer hover:bg-amber-400/20"
                  title="Save current edits as a draft">
                  <Save className="h-4 w-4" /> Save Draft
                </button>
                <button onClick={() => {
                  const html = getCurrentEditedHtml();
                  navigator.clipboard.writeText(html).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
                }}
                  className={`flex items-center gap-2 border px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${copied ? "border-green-400 bg-green-400/10 text-green-300" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"}`}
                  title="Copy edited HTML">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy HTML"}
                </button>
                <button onClick={handleExitEdit}
                  className="flex items-center gap-2 border border-red-400/30 bg-red-400/5 px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-red-300 transition-all cursor-pointer hover:bg-red-400/10 hover:border-red-400/50"
                  title="Exit edit mode">
                  <X className="h-4 w-4" /> Exit Edit
                </button>
                {editMode && <span className="ml-2 font-sans text-[10px] uppercase tracking-wider text-blue-300 animate-pulse">✏️ Edit Mode Active — click text to edit, click images to swap</span>}
              </>
            )}

            {/* Save Draft Dialog */}
            {showSaveDialog && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSaveDialog(false)}>
                <div className="border border-white/10 bg-[#0a0a0f] p-8 shadow-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white mb-4">Save Draft</h3>
                  <input
                    type="text"
                    value={draftName}
                    onChange={e => setDraftName(e.target.value)}
                    placeholder="e.g. Learn Newsletter v2"
                    className="w-full border border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/50 mb-4"
                    autoFocus
                    onKeyDown={e => { if (e.key === "Enter") handleSaveDraft(); }}
                  />
                  <div className="flex gap-3">
                    <button onClick={handleSaveDraft} disabled={!draftName.trim()}
                      className="flex-1 border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-amber-300 transition-all cursor-pointer hover:bg-amber-400/20 disabled:opacity-30 disabled:cursor-not-allowed">
                      Save
                    </button>
                    <button onClick={() => setShowSaveDialog(false)}
                      className="border border-white/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white/50 transition-all cursor-pointer hover:text-white/80">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-6 py-10 relative">
          {/* Image Picker Panel */}
          {showImagePicker && editMode && (
            <div className="fixed right-0 top-[200px] z-[150] w-80 border-l border-white/10 bg-[#0a0a0f]/95 backdrop-blur-md shadow-2xl h-[calc(100vh-200px)] overflow-y-auto">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f] px-4 py-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-amber-400" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-white">Swap Image</span>
                </div>
                <button onClick={() => { setShowImagePicker(false); setSelectedImgId(null); }} className="p-1 text-white/40 hover:text-white cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {IMAGE_GALLERY.map((img) => (
                  <button key={img.src} onClick={() => handleSwapImage(img.src)}
                    className="group relative overflow-hidden border border-white/10 bg-white/5 transition-all hover:border-amber-400/50 hover:bg-white/10 cursor-pointer">
                    <img src={img.src} alt={img.label} className="h-20 w-full object-cover" />
                    <div className="px-2 py-1.5">
                      <span className="font-sans text-[9px] uppercase tracking-wider text-white/50 group-hover:text-amber-300">{img.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {editMode && editedHtml ? (
            /* Edit Mode View */
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex items-center gap-2">
                <Pencil className="h-4 w-4 text-blue-400/60" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Edit Mode</span>
                <span className="ml-auto font-sans text-[10px] text-white/20">Click text to edit · Click images to swap</span>
              </div>
              <div className="overflow-hidden border-2 border-blue-400/30 bg-[#121212] shadow-2xl shadow-blue-500/10">
                <iframe ref={editIframeRef} key={`edit-${refreshKey}`} srcDoc={editedHtml} className="h-[900px] w-full" title="Edit Mode" sandbox="allow-same-origin allow-popups allow-scripts" />
              </div>
            </div>
          ) : splitView ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-white/40" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Website</span>
                  <span className="ml-auto font-sans text-[10px] text-white/20">{currentPage.path}</span>
                </div>
                <div className="overflow-hidden border border-white/10 bg-white shadow-2xl">
                  <iframe ref={splitWebIframeRef} key={`web-${refreshKey}`} src={currentPage.path} className="h-[800px] w-full" title="Website" />
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  {splitRight === "newsletter" && <Mail className="h-4 w-4 text-cyan-400/60" />}
                  {splitRight === "blog" && <BookOpen className="h-4 w-4 text-purple-400/60" />}
                  {splitRight === "gmail" && <Mail className="h-4 w-4 text-orange-400/60" />}
                  {splitRight === "reddit" && <Hash className="h-4 w-4 text-orange-500/60" />}
                  {splitRight === "twitter" && <Hash className="h-4 w-4 text-blue-400/60" />}
                  {splitRight === "ig-posts" && <Instagram className="h-4 w-4 text-pink-400/60" />}
                  {splitRight === "ig-ad" && <Megaphone className="h-4 w-4 text-pink-400/60" />}
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {splitRight === "newsletter" ? "Newsletter" : splitRight === "blog" ? "Blog" : splitRight === "gmail" ? "Gmail" : splitRight === "reddit" ? "Reddit Ad" : splitRight === "twitter" ? "X Post" : splitRight === "ig-posts" ? "IG Posts" : "IG Ad"}
                  </span>
                  <span className="ml-auto font-sans text-[10px] text-white/20">
                    {splitRight === "newsletter" ? "email-safe HTML" : splitRight === "blog" ? `blog / ${blogTheme}` : splitRight === "gmail" ? "table-layout" : splitRight === "reddit" ? "promoted post" : splitRight === "twitter" ? "tweet + thread" : splitRight === "ig-posts" ? "swipe post" : "sponsored ad"}
                  </span>
                </div>
                <div className="overflow-hidden border border-white/10 bg-[#121212] shadow-2xl">
                  <iframe key={`right-${splitRight}-${refreshKey}`} srcDoc={rightContent} className="h-[800px] w-full" title={splitRight} sandbox="allow-same-origin allow-popups allow-scripts" />
                </div>
                {/* Caption preview + actions for social media tabs */}
                {isSocialTab(splitRight) && (() => {
                  const pageData = convertedContent[selectedPage];
                  const blocks = pageData?.blocks;
                  const title = currentPage.label;
                  const pageUrl = "https://www.dreamplaypianos.com" + currentPage.path;
                  const tab = splitView ? splitRight : activeTab;
                  let caption = "";
                  if (blocks) {
                    if (tab === "reddit") caption = getRedditCaption(blocks, title, pageUrl);
                    else if (tab === "twitter") caption = getTwitterCaption(blocks, title);
                    else if (tab === "ig-posts") caption = getIGCarouselCaption(blocks, title);
                    else if (tab === "ig-ad") caption = getIGAdCaption(blocks, title, pageUrl);
                  }
                  return (
                    <div className="mt-3 space-y-2">
                      {caption ? (
                        <div
                          onClick={handleCopyCaption}
                          className="group relative cursor-pointer border border-white/10 bg-[#0a0a0f] p-4 transition-all hover:border-amber-400/30"
                          title="Click to copy caption"
                        >
                          <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-white/70">{caption}</pre>
                          <div className={`absolute top-2 right-2 flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${captionCopied ? "bg-green-400/15 text-green-300" : "bg-white/5 text-white/30 group-hover:bg-amber-400/10 group-hover:text-amber-300"}`}>
                            {captionCopied ? <Check className="h-3 w-3" /> : <Clipboard className="h-3 w-3" />}
                            {captionCopied ? "Copied!" : "Tap to copy"}
                          </div>
                        </div>
                      ) : (
                        <div className="border border-white/5 bg-[#0a0a0f] p-4 text-center font-sans text-xs text-white/20">
                          Convert the page to generate caption text
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={handleDownloadAssets}
                          className="flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-cyan-300 transition-all cursor-pointer hover:bg-cyan-400/10 hover:border-cyan-400/50">
                          <Download className="h-4 w-4" /> Download Assets
                        </button>
                        <span className="ml-auto font-sans text-[10px] text-white/20">
                          {convertedContent[selectedPage]?.blocks ? `${getAllMediaUrls(convertedContent[selectedPage].blocks).images.length} images, ${getAllMediaUrls(convertedContent[selectedPage].blocks).videos.length} videos` : "Convert first"}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex items-center gap-2">
                {activeTab === "website" && <Monitor className="h-4 w-4 text-white/40" />}
                {activeTab === "newsletter" && <Mail className="h-4 w-4 text-cyan-400/60" />}
                {activeTab === "blog" && <BookOpen className="h-4 w-4 text-purple-400/60" />}
                {activeTab === "gmail" && <Mail className="h-4 w-4 text-orange-400/60" />}
                {activeTab === "reddit" && <Hash className="h-4 w-4 text-orange-500/60" />}
                {activeTab === "twitter" && <Hash className="h-4 w-4 text-blue-400/60" />}
                {activeTab === "ig-posts" && <Instagram className="h-4 w-4 text-pink-400/60" />}
                {activeTab === "ig-ad" && <Megaphone className="h-4 w-4 text-pink-400/60" />}
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {activeTab === "website" ? `Website — ${currentPage.path}` : activeTab === "newsletter" ? "Newsletter — Email-safe HTML" : activeTab === "gmail" ? "Gmail — Table-layout HTML" : activeTab === "reddit" ? "Reddit — Promoted Post" : activeTab === "twitter" ? "X — Tweet + Thread" : activeTab === "ig-posts" ? "Instagram — Posts" : activeTab === "ig-ad" ? "Instagram — Sponsored Ad" : `Blog — ${blogTheme}`}
                </span>
              </div>
              <div className={`overflow - hidden border border - white / 10 shadow - 2xl ${activeTab === "website" ? "bg-white" : "bg-[#f4f4f7]"} `}>
                {activeTab === "website" ? (
                  <iframe ref={webIframeRef} key={`web-${refreshKey}`} src={currentPage.path} className="h-[900px] w-full" title="Website" />
                ) : (
                  <iframe key={`single-${refreshKey}`} srcDoc={singleContent} className="h-[900px] w-full" title={activeTab} sandbox="allow-same-origin allow-popups allow-scripts" />
                )}
              </div>
            </div>
          )}

          {/* Toast notification */}
          {toastMsg && (
            <div className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-3 border border-amber-400/30 bg-[#1a1a0f] px-6 py-3 shadow-2xl">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span className="font-sans text-xs text-amber-200">{toastMsg}</span>
            </div>
          )}

          {/* Legend */}
          <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-2 flex items-center gap-2"><Monitor className="h-3.5 w-3.5 text-white/40" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white">Website</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">Full interactive page with videos and animations.</p>
            </div>
            <div className="border border-cyan-500/20 bg-cyan-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-cyan-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-cyan-300">Newsletter</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">600px email HTML with inline styles.</p>
            </div>
            <div className="border border-purple-500/20 bg-purple-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-purple-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-purple-300">Blog</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">3 themes: Minimalist, Luxury, Gold Accent.</p>
            </div>
            <div className="border border-orange-500/20 bg-orange-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-orange-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-orange-300">Gmail</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">Table-layout, pure inline styles, 580px.</p>
            </div>
            <div className="border border-orange-600/20 bg-orange-600/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Hash className="h-3.5 w-3.5 text-orange-500" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-orange-400">Reddit</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">Promoted post with headline, thumbnail, CTA.</p>
            </div>
            <div className="border border-blue-500/20 bg-blue-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Hash className="h-3.5 w-3.5 text-blue-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-blue-300">X / Twitter</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">280-char tweet + thread with character counter.</p>
            </div>
            <div className="border border-pink-500/20 bg-pink-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Instagram className="h-3.5 w-3.5 text-pink-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-pink-300">IG Posts</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">5-7 slide storytelling arc with navigation.</p>
            </div>
            <div className="border border-pink-500/20 bg-pink-500/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2"><Megaphone className="h-3.5 w-3.5 text-pink-400" /><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-pink-300">IG Ad</span></div>
              <p className="font-sans text-[10px] leading-relaxed text-white/40">Scroll-stopping hero + CTA + performance targets.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
