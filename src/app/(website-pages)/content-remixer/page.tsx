"use client";
import React, { useState } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import {
  Monitor,
  Mail,
  BookOpen,
  Columns2,
  ChevronDown,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
type ViewTab = "website" | "newsletter" | "blog";
type PageId = "learn" | "better-practice";

const TABS: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
  { id: "website", label: "Website", icon: <Monitor className="h-4 w-4" /> },
  { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
  { id: "blog", label: "Blog", icon: <BookOpen className="h-4 w-4" /> },
];

const PAGES: { id: PageId; label: string; path: string }[] = [
  { id: "learn", label: "DreamPlay Learn", path: "/learn" },
  { id: "better-practice", label: "The Benefits", path: "/better-practice" },
];

// ─────────────────────────────────────────────────────────
// Shared email wrapper (header + footer)
// ─────────────────────────────────────────────────────────
function emailWrap(body: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; }
    a { color: inherit; }
    @media only screen and (max-width: 640px) {
      .email-container { width: 100% !important; padding: 0 16px !important; }
      .email-container img { width: 100% !important; height: auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px 0;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header Logo -->
      <div style="padding: 30px 20px; text-align: center; background-color: #050505;">
        <img src="https://www.dreamplaypianos.com/images/DreamPlay%20Logo%20White.png" alt="DreamPlay Pianos" style="height: 32px; display: inline-block;" />
      </div>
${body}
      <!-- Divider -->
      <div style="padding: 10px 30px; text-align: center;">
        <hr style="border: none; border-top: 1px solid #e5e5e5; width: 80%; margin: 0 auto;" />
      </div>
      <!-- Social -->
      <div style="padding: 20px 30px; text-align: center;">
        <a href="https://instagram.com/dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;"><span style="display: inline-block; width: 32px; height: 32px; background-color: #E4405F; border-radius: 50%; text-align: center; line-height: 32px; color: #fff; font-size: 13px; font-weight: bold;">I</span></a>
        <a href="https://youtube.com/@dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;"><span style="display: inline-block; width: 32px; height: 32px; background-color: #FF0000; border-radius: 50%; text-align: center; line-height: 32px; color: #fff; font-size: 13px; font-weight: bold;">Y</span></a>
        <a href="https://facebook.com/dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;"><span style="display: inline-block; width: 32px; height: 32px; background-color: #1877F2; border-radius: 50%; text-align: center; line-height: 32px; color: #fff; font-size: 13px; font-weight: bold;">F</span></a>
      </div>
      <!-- Footer -->
      <div style="padding: 15px 30px 30px; text-align: center; font-size: 11px; color: #aaa; font-family: Arial, sans-serif;">
        <p style="margin: 0;">DreamPlay Pianos &bull; Victoria, BC, Canada</p>
        <p style="margin: 5px 0 0;"><a href="{{unsubscribe_url}}" style="color: #aaa; text-decoration: underline;">Unsubscribe</a></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────
// Shared blog wrapper
// ─────────────────────────────────────────────────────────
function blogWrap(hero: string, content: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050505; color: #fafafa; font-family: 'Inter', sans-serif; }
    .bc { max-width: 800px; margin: 0 auto; padding: 0 24px; }
    .sf { font-family: 'Cormorant Garamond', Georgia, serif; }
    img { max-width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
${hero}
  <div class="bc" style="padding-top: 60px; padding-bottom: 80px;">
${content}
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────
// Content per page — Newsletter
// ─────────────────────────────────────────────────────────
const NEWSLETTER_CONTENT: Record<PageId, string> = {
  "learn": emailWrap(`
      <!-- Hero Image -->
      <div style="padding: 0; text-align: center; background: #050505;">
        <img src="https://www.dreamplaypianos.com/images/learn/hero.png" alt="DreamPlay Learn" style="display: block; max-width: 100%; width: 600px; height: auto; opacity: 0.7;" />
      </div>
      <div style="height: 30px;"></div>
      <div style="padding: 10px 30px; text-align: center;">
        <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #888;">Software + Hardware Integration</p>
      </div>
      <div style="padding: 10px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #1a1a1a; font-family: Georgia, serif; font-weight: bold; line-height: 1.3;">Learn Piano.<br /><span style="color: #3b82f6;">The Smart Way.</span></h1>
      </div>
      <div style="padding: 5px 30px; text-align: center;">
        <p style="margin: 0; font-size: 15px; color: #666; font-family: Georgia, serif;">DreamPlay Learn guides you note by note—on screen and on your keyboard.</p>
      </div>
      <div style="height: 20px;"></div>
      <div style="padding: 10px 30px; text-align: center;">
        <hr style="border: none; border-top: 1px solid #e5e5e5; width: 60%; margin: 0 auto;" />
      </div>
      <!-- Dual Mode -->
      <div style="padding: 20px 30px;">
        <h2 style="margin: 0 0 10px; font-size: 22px; color: #1a1a1a; font-family: Georgia, serif;">Two Modes. One App.</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">Choose between <strong>Sheet Music Mode</strong> for traditional reading or <strong>Falling Notes Mode</strong> for an intuitive visual experience. Use both simultaneously for the ultimate practice session.</p>
      </div>
      <!-- Sheet Music -->
      <div style="padding: 10px 30px; text-align: center;">
        <img src="https://www.dreamplaypianos.com/images/learn/sheet-music-mode-real.jpg" alt="Sheet Music Mode" style="display: block; max-width: 100%; width: 540px; height: auto; margin: 0 auto; border: 1px solid #eee;" />
        <p style="margin: 10px 0 0; font-size: 13px; color: #888;">Sheet Music Mode — real-time notation tracking</p>
      </div>
      <div style="height: 15px;"></div>
      <!-- Smart Guidance -->
      <div style="padding: 20px 30px;">
        <h2 style="margin: 0 0 10px; font-size: 22px; color: #1a1a1a; font-family: Georgia, serif;">Smart Guidance</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">Every note comes with <strong>finger number suggestions</strong>. The app listens to your playing and highlights correct notes in green, wrong notes in red—giving you instant, visual feedback.</p>
      </div>
      <div style="height: 10px;"></div>
      <!-- LED -->
      <div style="padding: 20px 30px;">
        <h2 style="margin: 0 0 10px; font-size: 22px; color: #1a1a1a; font-family: Georgia, serif;">LED Key Integration</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">The DreamPlay One keyboard lights up the keys you need to press, so you learn the correct positions by sight <strong>and</strong> by feel—no more guessing.</p>
      </div>
      <div style="height: 10px;"></div>
      <!-- Tempo -->
      <div style="padding: 20px 30px;">
        <h2 style="margin: 0 0 10px; font-size: 22px; color: #1a1a1a; font-family: Georgia, serif;">Tempo Control & Detection</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">Slow it down to learn, speed it up to challenge yourself. The app adapts to <strong>your pace</strong>.</p>
      </div>
      <div style="height: 20px;"></div>
      <!-- CTA -->
      <div style="padding: 10px 30px; text-align: center;">
        <a href="https://www.dreamplaypianos.com/customize" target="_blank" style="display: inline-block; padding: 14px 40px; background-color: #1a1a1a; color: #fff; font-size: 12px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 2px;">Get DreamPlay One &rarr;</a>
      </div>
      <div style="height: 30px;"></div>
`, "DreamPlay Learn — The Smart Way to Learn Piano"),

  "better-practice": emailWrap(`
      <!-- Hero Image -->
      <div style="padding: 0; text-align: center;">
        <img src="https://www.dreamplaypianos.com/images/BW%20Piano%20(1).jpg" alt="Piano" style="display: block; max-width: 100%; width: 600px; height: auto;" />
      </div>
      <div style="height: 30px;"></div>
      <div style="padding: 10px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #1a1a1a; font-family: Georgia, serif; font-weight: bold; line-height: 1.3;">The Benefits of Practicing on Narrower Keys</h1>
      </div>
      <div style="padding: 5px 30px; text-align: center;">
        <p style="margin: 0; font-size: 18px; color: #666; font-family: Georgia, serif; font-style: italic;">Stop practicing the stretch. Start playing the music.</p>
      </div>
      <div style="height: 20px;"></div>
      <div style="padding: 10px 30px; text-align: center;"><hr style="border: none; border-top: 1px solid #e5e5e5; width: 60%; margin: 0 auto;" /></div>
      <div style="padding: 15px 30px; font-size: 15px; line-height: 1.7; color: #444; text-align: left;">
        The greater the degree of technical difficulty for a pianist, <strong>the greater the amount of practice required</strong>. This means the pianist must spend more time on technical issues, with less time and mental capacity to focus on musical expression.
      </div>
      <div style="padding: 5px 30px; font-size: 15px; line-height: 1.7; color: #444; text-align: left;">
        When small-handed pianists play a piece on a smaller keyboard that they previously learnt on the conventional keyboard, <strong>it is often a revelation</strong>.
      </div>
      <div style="height: 15px;"></div>
      <div style="padding: 20px 30px;"><div style="background: #f9f9f9; border-left: 3px solid #1a1a1a; padding: 20px 25px;">
        <p style="margin: 0 0 12px; font-size: 16px; line-height: 1.6; color: #333; font-family: Georgia, serif; font-style: italic;">"I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size..."</p>
        <p style="margin: 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;"><strong style="color: #333;">Christopher Donison</strong><br />Executive Artistic Director, Music by the Sea</p>
      </div></div>
      <div style="height: 15px;"></div>
      <div style="padding: 20px 30px;"><div style="background: #fdf8ef; border-left: 3px solid #c9a85c; padding: 20px 25px;">
        <p style="margin: 0 0 12px; font-size: 16px; line-height: 1.6; color: #333; font-family: Georgia, serif; font-style: italic;">"Everything is easier on the 6.0 for me… I feel very comfortable playing scales, fast passages, or big chords"</p>
        <p style="margin: 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;"><strong style="color: #c9a85c;">Claudia Wang</strong><br />Master's Student at Southern Methodist University</p>
      </div></div>
      <div style="height: 20px;"></div>
      <div style="padding: 10px 30px; text-align: center;">
        <a href="https://www.dreamplaypianos.com/customize" target="_blank" style="display: inline-block; padding: 14px 40px; background-color: #1a1a1a; color: #fff; font-size: 12px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 2px;">Configure Yours &rarr;</a>
      </div>
      <div style="height: 30px;"></div>
`, "The Benefits of Practicing on Narrower Keys"),
};

// ─────────────────────────────────────────────────────────
// Content per page — Blog
// ─────────────────────────────────────────────────────────
const BLOG_CONTENT: Record<PageId, string> = {
  "learn": blogWrap(
    `<div style="position: relative; min-height: 450px; overflow: hidden; background: #050505;">
    <img src="https://www.dreamplaypianos.com/images/learn/hero.png" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35;" />
    <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.9));"></div>
    <div class="bc" style="position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: flex-end; min-height: 450px; padding-bottom: 60px;">
      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #000; background: #fff; padding: 4px 12px;">Featured</span>
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.5);">Product</span>
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.35);">4 min read</span>
      </div>
      <h1 class="sf" style="font-size: 48px; line-height: 1.15; font-weight: 600; margin-bottom: 20px;">Learn Piano. The Smart Way.</h1>
      <p style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.65); max-width: 600px;">How DreamPlay Learn combines on-screen guidance with LED-lit keys to create the most intuitive piano learning experience.</p>
      <div style="display: flex; align-items: center; gap: 16px; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); font-family: 'Cormorant Garamond', serif; font-size: 14px;">DP</div>
        <div>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">DreamPlay Editorial</span>
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.35); margin-top: 4px;">March 9, 2026</div>
        </div>
      </div>
    </div>
  </div>`,
    `
    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">Two Modes. One App.</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 20px;">DreamPlay Learn offers two complementary practice modes: <strong style="color: #fafafa;">Sheet Music Mode</strong> for traditional notation reading, and <strong style="color: #fafafa;">Falling Notes Mode</strong> for an intuitive, visual approach. Use them individually or combine both for the ultimate practice session.</p>
    <div style="margin: 30px 0; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
      <img src="https://www.dreamplaypianos.com/images/learn/sheet-music-mode-real.jpg" alt="Sheet Music Mode" style="width: 100%; height: auto;" />
    </div>
    <p style="font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 40px; text-align: center;">Sheet Music Mode — real-time notation tracking with the score</p>

    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">Smart Guidance That Listens</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 20px;">Every note comes with <strong style="color: #fafafa;">finger number suggestions</strong>, helping you build proper technique from day one. The app listens to your playing in real time—correct notes light up green, wrong notes flash red. It's like having a patient teacher sitting next to you 24/7.</p>

    <div style="border: 1px solid rgba(59,130,246,0.3); background: rgba(59,130,246,0.05); padding: 30px; margin: 30px 0; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.5; color: rgba(255,255,255,0.9); margin-bottom: 12px;">The only keyboard that teaches you <em>while</em> you play.</div>
      <p style="font-size: 14px; color: rgba(255,255,255,0.4);">Software + Hardware, perfectly in sync.</p>
    </div>

    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">LED Key Integration</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px;">The DreamPlay One keyboard literally <strong style="color: #fafafa;">lights up the keys</strong> you need to press. Combined with on-screen guidance, you learn correct positions through sight and feel simultaneously—eliminating guesswork entirely.</p>

    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">Tempo Control & Detection</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px;">Start slow, build confidence, then speed up. The tempo control adapts to <strong style="color: #fafafa;">your pace</strong>, and the detection system ensures you're keeping time—never rushed, never left behind.</p>

    <div style="text-align: center; padding: 40px 0;">
      <h2 class="sf" style="font-size: 36px; font-weight: 600; margin-bottom: 16px;">Start Learning Smarter.</h2>
      <p style="font-size: 15px; color: rgba(255,255,255,0.5); margin-bottom: 30px;">The DreamPlay One is the only keyboard with a built-in learning app.</p>
      <a href="https://www.dreamplaypianos.com/customize" style="display: inline-block; padding: 14px 40px; background: #fff; color: #000; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; text-decoration: none;">Get DreamPlay One &rarr;</a>
    </div>
`,
    "DreamPlay Learn — The Smart Way to Learn Piano"
  ),

  "better-practice": blogWrap(
    `<div style="position: relative; min-height: 450px; overflow: hidden;">
    <img src="https://www.dreamplaypianos.com/images/BW%20Piano%20(1).jpg" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;" />
    <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.9));"></div>
    <div class="bc" style="position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: flex-end; min-height: 450px; padding-bottom: 60px;">
      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #000; background: #fff; padding: 4px 12px;">Featured</span>
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.5);">Science & Research</span>
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.35);">5 min read</span>
      </div>
      <h1 class="sf" style="font-size: 48px; line-height: 1.15; font-weight: 600; margin-bottom: 20px;">The Benefits of Practicing on Narrower Keys</h1>
      <p style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.65); max-width: 600px;">Why reducing key width transforms technique, eliminates injury risk, and unlocks a new level of musicality for pianists of all hand sizes.</p>
      <div style="display: flex; align-items: center; gap: 16px; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); font-family: 'Cormorant Garamond', serif; font-size: 14px;">DP</div>
        <div>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">DreamPlay Editorial</span>
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.35); margin-top: 4px;">March 9, 2026</div>
        </div>
      </div>
    </div>
  </div>`,
    `
    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">The Cognitive Load of Small Hands</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 20px;">The greater the degree of technical difficulty for a pianist, <strong style="color: #fafafa;">the greater the amount of practice required</strong>. This means the pianist must spend more time on technical issues, with less time and mental capacity to focus on musical issues.</p>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px;">When small-handed pianists play a piece on a smaller keyboard that they previously learnt on the conventional keyboard, <strong style="color: #fafafa;">it is often a revelation</strong>. They immediately become aware of how much physical and mental effort they previously had to invest just to "get the notes."</p>
    <div style="border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); padding: 40px; margin-bottom: 50px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.6; color: rgba(255,255,255,0.9); font-style: italic; margin-bottom: 20px;">"I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size…"</div>
      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">Christopher Donison</span>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Executive Artistic Director, Music by the Sea</div>
    </div>
    <div style="border: 1px solid rgba(201,168,92,0.3); background: rgba(201,168,92,0.05); padding: 40px; margin-bottom: 50px; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.6; color: rgba(255,255,255,0.85); font-style: italic; margin-bottom: 20px;">"Everything is easier on the 6.0 for me… I feel very comfortable playing scales, fast passages, or big chords"</div>
      <div style="width: 30px; height: 1px; background: rgba(255,255,255,0.2); margin: 16px auto;"></div>
      <span style="font-size: 12px; font-weight: 600; color: #c9a85c;">Claudia Wang</span>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Master's Student, Southern Methodist University</div>
    </div>
    <h2 class="sf" style="font-size: 32px; font-weight: 600; margin-bottom: 24px;">"Will this ruin my technique?"</h2>
    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 30px;">The reality is the exact opposite. Because narrower keys teach your hands to play without tension, your brain maps a healthier, more relaxed technique. When you return to a standard piano, that relaxed muscle memory translates with you.</p>
    <div style="border: 1px solid rgba(255,255,255,0.1); background: rgba(10,10,15,1); padding: 40px; margin-bottom: 50px; text-align: center;">
      <div style="height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent); margin-bottom: 24px;"></div>
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 24px; line-height: 1.5; color: rgba(255,255,255,0.9); margin-bottom: 20px;">"Another surprising effect for me was that playing this [DS6.0] also has a positive effect when you go back to the normal keyboard."</div>
      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">Hubert Ness</span>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Professor of Jazz Piano, HMDK University of Stuttgart</div>
    </div>
    <div style="text-align: center; padding: 40px 0;">
      <h2 class="sf" style="font-size: 36px; font-weight: 600; margin-bottom: 16px;">Experience the Revelation.</h2>
      <p style="font-size: 15px; color: rgba(255,255,255,0.5); margin-bottom: 30px;">Stop limiting your repertoire. Secure your allocation today.</p>
      <a href="https://www.dreamplaypianos.com/customize" style="display: inline-block; padding: 14px 40px; background: #fff; color: #000; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; text-decoration: none;">Configure Yours &rarr;</a>
    </div>
`,
    "The Benefits of Practicing on Narrower Keys"
  ),
};

// ─────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────
export default function ContentRemixerPage() {
  const [selectedPage, setSelectedPage] = useState<PageId>("learn");
  const [activeTab, setActiveTab] = useState<ViewTab>("website");
  const [splitView, setSplitView] = useState(false);
  const [splitRight, setSplitRight] = useState<"newsletter" | "blog">("newsletter");
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);

  const currentPage = PAGES.find((p) => p.id === selectedPage)!;

  return (
    <div>
      <SpecialOfferHeader
        forceOpaque={true}
        darkMode={true}
        className="border-b border-white/10 bg-[#050505] backdrop-blur-md"
      />
      <main className="min-h-screen bg-[#0a0a0f] pt-[100px]">
        {/* Page header */}
        <div className="border-b border-white/10 bg-[#050505] px-6 py-8">
          <div className="container mx-auto max-w-7xl">
            <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
              Content Pipeline
            </p>
            <h1 className="mb-4 font-serif text-3xl font-semibold text-white md:text-4xl">
              Content Remixer
            </h1>
            <p className="max-w-2xl font-sans text-sm text-white/50">
              Side-by-side comparison showing how website landing page content translates into
              newsletter and blog formats following DreamPlay&apos;s design system.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-[100px] z-50 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-md">
          <div className="container mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
            {/* Page selector */}
            <div className="relative">
              <button
                onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
                className="flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-amber-300 transition-all cursor-pointer hover:bg-amber-400/20"
              >
                <Monitor className="h-4 w-4" />
                {currentPage.label}
                <ChevronDown className="h-3 w-3" />
              </button>
              {pageDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 border border-white/10 bg-[#0a0a0f] shadow-2xl">
                  {PAGES.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        setSelectedPage(page.id);
                        setPageDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${selectedPage === page.id
                          ? "bg-amber-400/10 text-amber-300"
                          : "text-white/50 hover:bg-white/5 hover:text-white/80"
                        }`}
                    >
                      <span className="font-medium">{page.label}</span>
                      <span className="text-white/20 ml-auto">{page.path}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mx-2 h-6 w-px bg-white/10" />

            {/* View tabs */}
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSplitView(false); }}
                className={`flex items-center gap-2 border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${!splitView && activeTab === tab.id
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

            <div className="mx-2 h-6 w-px bg-white/10" />

            {/* Split views */}
            <button
              onClick={() => { setSplitView(true); setSplitRight("newsletter"); }}
              className={`flex items-center gap-2 border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${splitView && splitRight === "newsletter"
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}
            >
              <Columns2 className="h-4 w-4" />
              Web ↔ Newsletter
            </button>
            <button
              onClick={() => { setSplitView(true); setSplitRight("blog"); }}
              className={`flex items-center gap-2 border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${splitView && splitRight === "blog"
                  ? "border-purple-400 bg-purple-400/10 text-purple-300"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}
            >
              <Columns2 className="h-4 w-4" />
              Web ↔ Blog
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="container mx-auto max-w-7xl px-6 py-10">
          {splitView ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left: Website */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-white/40" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Website</span>
                  <span className="ml-auto font-sans text-[10px] text-white/20">{currentPage.path}</span>
                </div>
                <div className="overflow-hidden border border-white/10 bg-white shadow-2xl">
                  <iframe src={currentPage.path} className="h-[800px] w-full" title="Website preview" />
                </div>
              </div>
              {/* Right: Newsletter or Blog */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  {splitRight === "newsletter" ? <Mail className="h-4 w-4 text-cyan-400/60" /> : <BookOpen className="h-4 w-4 text-purple-400/60" />}
                  <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] ${splitRight === "newsletter" ? "text-cyan-400/60" : "text-purple-400/60"}`}>
                    {splitRight === "newsletter" ? "Newsletter" : "Blog"}
                  </span>
                  <span className="ml-auto font-sans text-[10px] text-white/20">
                    {splitRight === "newsletter" ? "email-safe HTML" : "blog.dreamplaypianos.com"}
                  </span>
                </div>
                <div className="overflow-hidden border border-white/10 bg-[#f4f4f7] shadow-2xl">
                  <iframe
                    srcDoc={splitRight === "newsletter" ? NEWSLETTER_CONTENT[selectedPage] : BLOG_CONTENT[selectedPage]}
                    className="h-[800px] w-full"
                    title={splitRight === "newsletter" ? "Newsletter preview" : "Blog preview"}
                    sandbox="allow-same-origin allow-popups"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex items-center gap-2">
                {activeTab === "website" && <Monitor className="h-4 w-4 text-white/40" />}
                {activeTab === "newsletter" && <Mail className="h-4 w-4 text-cyan-400/60" />}
                {activeTab === "blog" && <BookOpen className="h-4 w-4 text-purple-400/60" />}
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {activeTab === "website" ? `Website — ${currentPage.path}` : activeTab === "newsletter" ? "Newsletter — Email-safe HTML" : "Blog — blog.dreamplaypianos.com"}
                </span>
              </div>
              <div className={`overflow-hidden border border-white/10 shadow-2xl ${activeTab === "website" ? "bg-white" : "bg-[#f4f4f7]"}`}>
                {activeTab === "website" ? (
                  <iframe src={currentPage.path} className="h-[900px] w-full" title="Website preview" />
                ) : (
                  <iframe
                    srcDoc={activeTab === "newsletter" ? NEWSLETTER_CONTENT[selectedPage] : BLOG_CONTENT[selectedPage]}
                    className="h-[900px] w-full"
                    title={activeTab === "newsletter" ? "Newsletter preview" : "Blog preview"}
                    sandbox="allow-same-origin allow-popups"
                  />
                )}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-white/40" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-white">Website</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Full interactive landing page with scroll animations, gradient backgrounds, embedded videos, and responsive layout.</p>
            </div>
            <div className="border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-cyan-300">Newsletter</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Email-safe HTML following the DnD block compiler: 600px max-width, inline styles, social icons, and mustache template variables.</p>
            </div>
            <div className="border border-purple-500/20 bg-purple-500/[0.03] p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-purple-300">Blog</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-white/40">Dark-themed blog format: Cormorant Garamond headings, featured post hero, author cards, bordered quote blocks.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
