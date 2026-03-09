"use client";
import React, { useState, useCallback, useRef } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import { Monitor, Mail, BookOpen, Columns2, ChevronDown, Palette, RefreshCw, Copy, Check, ArrowRightLeft, AlertCircle } from "lucide-react";
import { scrapePageContent, blocksToNewsletter, blocksToBlog, blocksToGmail } from "./converter";
import type { ContentBlock } from "./converter";

// ── Types ────────────────────────────────────────────────
type ViewTab = "website" | "newsletter" | "blog" | "gmail";
type PageId = string;
type BlogTheme = "minimalist" | "luxury" | "gold-accent";

const TABS: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
  { id: "website", label: "Website", icon: <Monitor className="h-4 w-4" /> },
  { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
  { id: "blog", label: "Blog", icon: <BookOpen className="h-4 w-4" /> },
  { id: "gmail", label: "Gmail", icon: <Mail className="h-4 w-4" /> },
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
      `< div style = "position:relative;min-height:450px;overflow:hidden;" class="hero-bg" >
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
<div style="display:flex;align-items:center;gap:16px;margin-top:30px;padding-top:24px;" class="hero-author-divider" >
<div class="hero-author-box sf" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:14px;">DP</div>
<div><span class="hero-author-name" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">DreamPlay Editorial</span><div class="hero-author-date" style="font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">March 9, 2026</div></div>
</div>
</div></div > `,
      `
  < h2 class="sf" style = "font-size:32px;font-weight:600;margin-bottom:24px;" > Two Modes.One App.</h2 >
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
      `< div style = "position:relative;min-height:450px;overflow:hidden;" class="hero-bg" >
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
</div></div > `,
      `
  < h2 class="sf" style = "font-size:32px;font-weight:600;margin-bottom:24px;" > The Cognitive Load of Small Hands</h2 >
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
  const [splitRight, setSplitRight] = useState<"newsletter" | "blog">("newsletter");
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const [blogTheme, setBlogTheme] = useState<BlogTheme>("luxury");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedContent, setConvertedContent] = useState<Record<string, {
    newsletter: string;
    blog: Record<string, string>;
    gmail: string;
    blocks: ContentBlock[];
  }>>({});
  const webIframeRef = useRef<HTMLIFrameElement>(null);
  const splitWebIframeRef = useRef<HTMLIFrameElement>(null);

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

  // Decide what right-side content to show
  const rightContent = splitRight === "newsletter"
    ? getNewsletterContent(selectedPage)
    : getDynamicBlogContent(selectedPage, blogTheme);

  const getActiveContent = (): string => {
    if (activeTab === "newsletter") return getNewsletterContent(selectedPage);
    if (activeTab === "blog") return getDynamicBlogContent(selectedPage, blogTheme);
    if (activeTab === "gmail") return getGmailContent(selectedPage);
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

  // Convert: scrape iframe DOM and build all formats
  const handleConvert = useCallback(() => {
    const iframe = splitView ? splitWebIframeRef.current : webIframeRef.current;
    if (!iframe) {
      // Try the other ref
      const altIframe = splitView ? webIframeRef.current : splitWebIframeRef.current;
      if (!altIframe) {
        showToast("No website iframe found. Switch to a view that shows the website first.");
        return;
      }
    }
    const activeIframe = (splitView ? splitWebIframeRef.current : webIframeRef.current) || splitWebIframeRef.current || webIframeRef.current;
    if (!activeIframe) return;

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
      const newsletter = blocksToNewsletter(blocks, title);
      const gmail = blocksToGmail(blocks, title);
      const blog: Record<string, string> = {
        minimalist: blocksToBlog(blocks, title, "minimalist"),
        luxury: blocksToBlog(blocks, title, "luxury"),
        "gold-accent": blocksToBlog(blocks, title, "gold-accent"),
      };

      setConvertedContent((prev) => ({
        ...prev,
        [selectedPage]: { newsletter, blog, gmail, blocks },
      }));

      showToast(`Converted! ${blocks.length} content blocks extracted from ${currentPage.label}.`);
      setConverting(false);

      // Auto-switch to newsletter view if on website tab
      if (activeTab === "website" && !splitView) {
        setActiveTab("newsletter");
      }
    } catch (e) {
      showToast("Conversion error: " + (e as Error).message);
      setConverting(false);
    }
  }, [selectedPage, currentPage, splitView, activeTab, blogTheme]);

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
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSplitView(false); setPageDropdownOpen(false); setThemeDropdownOpen(false); }}
                className={`flex items - center gap - 2 border px - 4 py - 2 font - sans text - xs font - medium uppercase tracking - wider transition - all cursor - pointer ${!splitView && activeTab === tab.id ? "border-white bg-white text-black" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"} `}>
                {tab.icon} {tab.label}
              </button>
            ))}

            <div className="mx-1 h-6 w-px bg-white/10" />

            {/* Split views */}
            <button onClick={() => { setSplitView(true); setSplitRight("newsletter"); setPageDropdownOpen(false); setThemeDropdownOpen(false); }}
              className={`flex items - center gap - 2 border px - 4 py - 2 font - sans text - xs font - medium uppercase tracking - wider transition - all cursor - pointer ${splitView && splitRight === "newsletter" ? "border-cyan-400 bg-cyan-400/10 text-cyan-300" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"} `}>
              <Columns2 className="h-4 w-4" /> Web ↔ Newsletter
            </button>
            <button onClick={() => { setSplitView(true); setSplitRight("blog"); setPageDropdownOpen(false); setThemeDropdownOpen(false); }}
              className={`flex items - center gap - 2 border px - 4 py - 2 font - sans text - xs font - medium uppercase tracking - wider transition - all cursor - pointer ${splitView && splitRight === "blog" ? "border-purple-400 bg-purple-400/10 text-purple-300" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"} `}>
              <Columns2 className="h-4 w-4" /> Web ↔ Blog
            </button>

            {/* Blog theme selector — visible when blog is showing */}
            {(activeTab === "blog" || (splitView && splitRight === "blog")) && (
              <>
                <div className="mx-1 h-6 w-px bg-white/10" />
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
            <button onClick={handleConvert}
              disabled={converting}
              className={`flex items-center gap-2 border px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${converting ? "border-green-400/50 bg-green-400/10 text-green-300 animate-pulse" : "border-emerald-400/30 bg-emerald-400/5 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-400/50"}`}
              title="Convert website content to newsletter, blog, and gmail formats">
              <ArrowRightLeft className="h-4 w-4" /> {converting ? "Converting..." : (convertedContent[selectedPage] ? "Re-convert" : "Convert")}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-6 py-10">
          {splitView ? (
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
                  {splitRight === "newsletter" ? <Mail className="h-4 w-4 text-cyan-400/60" /> : <BookOpen className="h-4 w-4 text-purple-400/60" />}
                  <span className={`font - sans text - [10px] font - bold uppercase tracking - [0.2em] ${splitRight === "newsletter" ? "text-cyan-400/60" : "text-purple-400/60"} `}>
                    {splitRight === "newsletter" ? "Newsletter" : "Blog"}
                  </span>
                  <span className="ml-auto font-sans text-[10px] text-white/20">
                    {splitRight === "newsletter" ? "email-safe HTML" : `blog / ${blogTheme} `}
                  </span>
                </div>
                <div className="overflow-hidden border border-white/10 bg-[#f4f4f7] shadow-2xl">
                  <iframe key={`right - ${refreshKey} `} srcDoc={rightContent} className="h-[800px] w-full" title={splitRight} sandbox="allow-same-origin allow-popups" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex items-center gap-2">
                {activeTab === "website" && <Monitor className="h-4 w-4 text-white/40" />}
                {activeTab === "newsletter" && <Mail className="h-4 w-4 text-cyan-400/60" />}
                {activeTab === "blog" && <BookOpen className="h-4 w-4 text-purple-400/60" />}
                {activeTab === "gmail" && <Mail className="h-4 w-4 text-orange-400/60" />}
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {activeTab === "website" ? `Website — ${currentPage.path} ` : activeTab === "newsletter" ? "Newsletter — Email-safe HTML" : activeTab === "gmail" ? "Gmail — Table-layout HTML" : `Blog — ${blogTheme} `}
                </span>
              </div>
              <div className={`overflow - hidden border border - white / 10 shadow - 2xl ${activeTab === "website" ? "bg-white" : "bg-[#f4f4f7]"} `}>
                {activeTab === "website" ? (
                  <iframe ref={webIframeRef} key={`web-${refreshKey}`} src={currentPage.path} className="h-[900px] w-full" title="Website" />
                ) : (
                  <iframe key={`single - ${refreshKey} `} srcDoc={singleContent} className="h-[900px] w-full" title={activeTab} sandbox="allow-same-origin allow-popups" />
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
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-3 flex items-center gap-2"><Monitor className="h-4 w-4 text-white/40" /><span className="font-sans text-xs font-bold uppercase tracking-wider text-white">Website</span></div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Full interactive landing page with scroll animations, videos, and responsive layout.</p>
            </div>
            <div className="border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
              <div className="mb-3 flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-400" /><span className="font-sans text-xs font-bold uppercase tracking-wider text-cyan-300">Newsletter</span></div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Email-safe HTML: 600px, inline styles, video stills at 540px, social icons, mustache variables.</p>
            </div>
            <div className="border border-purple-500/20 bg-purple-500/[0.03] p-6">
              <div className="mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4 text-purple-400" /><span className="font-sans text-xs font-bold uppercase tracking-wider text-purple-300">Blog</span></div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Cormorant Garamond headings, 800px max-width, 3 themes: Minimalist (light), Luxury (dark), Gold Accent.</p>
            </div>
            <div className="border border-orange-500/20 bg-orange-500/[0.03] p-6">
              <div className="mb-3 flex items-center gap-2"><Mail className="h-4 w-4 text-orange-400" /><span className="font-sans text-xs font-bold uppercase tracking-wider text-orange-300">Gmail</span></div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Table-based layout, pure inline styles, no CSS classes, Gmail-safe fonts. 580px max-width.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
