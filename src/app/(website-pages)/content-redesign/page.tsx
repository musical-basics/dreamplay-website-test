"use client";
import React, { useState } from "react";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import {
    Monitor,
    Mail,
    BookOpen,
    ArrowRight,
    Columns2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Tab definitions
// ─────────────────────────────────────────────────────────
type ViewTab = "website" | "newsletter" | "blog";

const TABS: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: "website", label: "Website", icon: <Monitor className="h-4 w-4" /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
    { id: "blog", label: "Blog", icon: <BookOpen className="h-4 w-4" /> },
];

// ─────────────────────────────────────────────────────────
// Newsletter HTML (inline-styled, email-safe, following DnD block compiler output)
// Uses the "Better Practice" page content converted to email blocks
// ─────────────────────────────────────────────────────────
const NEWSLETTER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Benefits of Narrower Keys</title>
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

      <!-- Hero Image -->
      <div style="padding: 0; text-align: center;">
        <img src="https://www.dreamplaypianos.com/images/BW%20Piano%20(1).jpg" alt="Piano in black and white" style="display: block; max-width: 100%; width: 600px; height: auto;" />
      </div>

      <!-- Spacer -->
      <div style="height: 30px;"></div>

      <!-- Heading -->
      <div style="padding: 10px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; font-weight: bold; line-height: 1.3;">
          The Benefits of Practicing on Narrower Keys
        </h1>
      </div>

      <!-- Subheading -->
      <div style="padding: 5px 30px; text-align: center;">
        <p style="margin: 0; font-size: 18px; color: #666666; font-family: Georgia, serif; font-style: italic;">
          Stop practicing the stretch. Start playing the music.
        </p>
      </div>

      <!-- Spacer -->
      <div style="height: 20px;"></div>

      <!-- Divider -->
      <div style="padding: 10px 30px; text-align: center;">
        <hr style="border: none; border-top: 1px solid #e5e5e5; width: 60%; margin: 0 auto;" />
      </div>

      <!-- Body Text -->
      <div style="padding: 15px 30px; font-size: 15px; line-height: 1.7; color: #444444; font-family: Arial, Helvetica, sans-serif; text-align: left;">
        The greater the degree of technical difficulty for a pianist, <strong>the greater the amount of practice required</strong>. This means the pianist must spend more time on technical issues, with less time and mental capacity to focus on musical expression.
      </div>

      <div style="padding: 5px 30px; font-size: 15px; line-height: 1.7; color: #444444; font-family: Arial, Helvetica, sans-serif; text-align: left;">
        When small-handed pianists play a piece on a smaller keyboard that they previously learnt on the conventional keyboard, <strong>it is often a revelation</strong>. They immediately become aware of how much physical and mental effort they previously had to invest just to "get the notes."
      </div>

      <!-- Spacer -->
      <div style="height: 15px;"></div>

      <!-- Quote Block -->
      <div style="padding: 20px 30px;">
        <div style="background-color: #f9f9f9; border-left: 3px solid #1a1a1a; padding: 20px 25px;">
          <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; color: #333333; font-family: Georgia, serif; font-style: italic;">
            "I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size..."
          </p>
          <p style="margin: 0; font-size: 12px; color: #888888; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">
            <strong style="color: #333333;">Christopher Donison</strong><br />
            Executive Artistic Director, Music by the Sea
          </p>
        </div>
      </div>

      <!-- Spacer -->
      <div style="height: 15px;"></div>

      <!-- Second Quote -->
      <div style="padding: 20px 30px;">
        <div style="background-color: #fdf8ef; border-left: 3px solid #c9a85c; padding: 20px 25px;">
          <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; color: #333333; font-family: Georgia, serif; font-style: italic;">
            "Everything is easier on the 6.0 for me… I feel very comfortable playing scales, fast passages, or big chords"
          </p>
          <p style="margin: 0; font-size: 12px; color: #888888; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">
            <strong style="color: #c9a85c;">Claudia Wang</strong><br />
            Master's Student at Southern Methodist University
          </p>
        </div>
      </div>

      <!-- Spacer -->
      <div style="height: 20px;"></div>

      <!-- CTA Button -->
      <div style="padding: 10px 30px; text-align: center;">
        <a href="https://www.dreamplaypianos.com/customize" target="_blank" style="display: inline-block; padding: 14px 40px; background-color: #1a1a1a; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; text-decoration: none; text-align: center; text-transform: uppercase; letter-spacing: 2px;">
          Configure Yours →
        </a>
      </div>

      <!-- Spacer -->
      <div style="height: 30px;"></div>

      <!-- Divider -->
      <div style="padding: 10px 30px; text-align: center;">
        <hr style="border: none; border-top: 1px solid #e5e5e5; width: 80%; margin: 0 auto;" />
      </div>

      <!-- Social Links -->
      <div style="padding: 20px 30px; text-align: center;">
        <a href="https://instagram.com/dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;">
          <span style="display: inline-block; width: 32px; height: 32px; background-color: #E4405F; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-size: 13px; font-family: Arial, sans-serif; font-weight: bold;">I</span>
        </a>
        <a href="https://youtube.com/@dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;">
          <span style="display: inline-block; width: 32px; height: 32px; background-color: #FF0000; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-size: 13px; font-family: Arial, sans-serif; font-weight: bold;">Y</span>
        </a>
        <a href="https://facebook.com/dreamplaypianos" target="_blank" style="text-decoration: none; display: inline-block; margin: 0 6px;">
          <span style="display: inline-block; width: 32px; height: 32px; background-color: #1877F2; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-size: 13px; font-family: Arial, sans-serif; font-weight: bold;">F</span>
        </a>
      </div>

      <!-- Footer -->
      <div style="padding: 15px 30px 30px; text-align: center; font-size: 11px; color: #aaaaaa; font-family: Arial, sans-serif;">
        <p style="margin: 0;">DreamPlay Pianos • Victoria, BC, Canada</p>
        <p style="margin: 5px 0 0 0;">
          <a href="{{unsubscribe_url}}" style="color: #aaaaaa; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;

// ─────────────────────────────────────────────────────────
// Blog HTML (following dreamplay-blog patterns: dark mode, 
// Cormorant Garamond serif headings, prose-dreamplay styling)
// ─────────────────────────────────────────────────────────
const BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Benefits of Practicing on Narrower Keys</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050505; color: #fafafa; font-family: 'Inter', sans-serif; }
    .blog-container { max-width: 800px; margin: 0 auto; padding: 0 24px; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    img { max-width: 100%; height: auto; display: block; }
  </style>
</head>
<body>

  <!-- Hero -->
  <div style="position: relative; min-height: 450px; overflow: hidden;">
    <img src="https://www.dreamplaypianos.com/images/BW%20Piano%20(1).jpg" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;" />
    <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.9));"></div>
    <div class="blog-container" style="position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: flex-end; min-height: 450px; padding-bottom: 60px;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 24px;">
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #000; background: #fff; padding: 4px 12px;">Featured</span>
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.5);">Science & Research</span>
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.35);">5 min read</span>
      </div>
      <h1 class="serif" style="font-size: 48px; line-height: 1.15; font-weight: 600; margin-bottom: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">
        The Benefits of Practicing on Narrower Keys
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.65); max-width: 600px;">
        Why reducing key width transforms technique, eliminates injury risk, and unlocks a new level of musicality for pianists of all hand sizes.
      </p>
      <div style="display: flex; align-items: center; gap: 16px; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); font-family: 'Cormorant Garamond', serif; font-size: 14px; color: #fff;">DP</div>
        <div>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">DreamPlay Editorial</span>
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.35); margin-top: 4px;">March 9, 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="blog-container" style="padding-top: 60px; padding-bottom: 80px;">

    <h2 class="serif" style="font-size: 32px; font-weight: 600; margin-bottom: 24px; color: #fafafa;">The Cognitive Load of Small Hands</h2>

    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
      The greater the degree of technical difficulty for a pianist, <strong style="color: #fafafa;">the greater the amount of practice required</strong>. This means the pianist must spend more time on technical issues, with less time and mental capacity to focus on musical issues.
    </p>

    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
      When small-handed pianists play a piece on a smaller keyboard that they previously learnt on the conventional keyboard, <strong style="color: #fafafa;">it is often a revelation</strong>. They immediately become aware of how much physical and mental effort they previously had to invest just to "get the notes" in passages that were not "under the hand."
    </p>

    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px;">
      Suddenly, a pianist no longer has to focus on just reaching the octaves, but has the ability to relax the hand and think about <strong style="color: #fafafa;">shaping the musical line</strong> being played by both hands.
    </p>

    <!-- Quote Card -->
    <div style="border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); padding: 40px; margin-bottom: 50px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.6; color: rgba(255,255,255,0.9); font-style: italic; margin-bottom: 20px;">
        "I realize now, looking back, that most of the time I spent practicing was used trying to overcome difficulties because of my hand-size… If you spend 90% of the time trying to overcome limitations imposed by hand size, then you are truly disadvantaged."
      </div>
      <div>
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">Christopher Donison</span>
        <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Executive Artistic Director, Music by the Sea</div>
      </div>
    </div>

    <!-- Warm Quote -->
    <div style="border: 1px solid rgba(201,168,92,0.3); background: rgba(201,168,92,0.05); padding: 40px; margin-bottom: 50px; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.6; color: rgba(255,255,255,0.85); font-style: italic; margin-bottom: 20px;">
        "Everything is easier on the 6.0 for me… I feel very comfortable playing scales, fast passages, or big chords"
      </div>
      <div style="width: 30px; height: 1px; background: rgba(255,255,255,0.2); margin: 16px auto;"></div>
      <span style="font-size: 12px; font-weight: 600; color: #c9a85c;">Claudia Wang</span>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Master's Student, Southern Methodist University</div>
    </div>

    <h2 class="serif" style="font-size: 32px; font-weight: 600; margin-bottom: 24px; color: #fafafa;">"Will this ruin my technique?"</h2>

    <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 30px;">
      The reality is the exact opposite of what most people fear. Because the narrower keys teach your hands to play without tension, your brain maps a healthier, more relaxed technique. When you return to a standard piano, that relaxed muscle memory translates with you.
    </p>

    <!-- Ness Quote -->
    <div style="border: 1px solid rgba(255,255,255,0.1); background: rgba(10,10,15,1); padding: 40px; margin-bottom: 50px; text-align: center;">
      <div style="height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent); margin-bottom: 24px;"></div>
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 24px; line-height: 1.5; color: rgba(255,255,255,0.9); margin-bottom: 20px;">
        "Another surprising effect for me was that playing this [DS6.0] also has a positive effect when you go back to the normal keyboard."
      </div>
      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #fff;">Hubert Ness</span>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Professor of Jazz Piano, HMDK University of Stuttgart</div>
    </div>

    <!-- CTA -->
    <div style="text-align: center; padding: 40px 0;">
      <h2 class="serif" style="font-size: 36px; font-weight: 600; margin-bottom: 16px;">Experience the Revelation.</h2>
      <p style="font-size: 15px; color: rgba(255,255,255,0.5); margin-bottom: 30px;">Stop limiting your repertoire. Secure your allocation today.</p>
      <a href="https://www.dreamplaypianos.com/customize" style="display: inline-block; padding: 14px 40px; background: #fff; color: #000; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; text-decoration: none;">
        Configure Yours →
      </a>
    </div>

  </div>
</body>
</html>`;

// ─────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────
export default function ContentRedesignPage() {
    const [activeTab, setActiveTab] = useState<ViewTab>("website");
    const [splitView, setSplitView] = useState(false);
    const [splitRight, setSplitRight] = useState<"newsletter" | "blog">("newsletter");

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
                            Webpages → Newsletters & Blog
                        </h1>
                        <p className="max-w-2xl font-sans text-sm text-white/50">
                            Side-by-side comparison showing how website landing page content translates into
                            newsletter and blog formats following DreamPlay&apos;s design system.
                        </p>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="sticky top-[100px] z-50 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-md">
                    <div className="container mx-auto flex max-w-7xl items-center gap-2 px-6 py-3">
                        {/* Individual tabs */}
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSplitView(false); }}
                                className={`flex items-center gap-2 rounded-none border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${!splitView && activeTab === tab.id
                                        ? "border-white bg-white text-black"
                                        : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}

                        <div className="mx-2 h-6 w-px bg-white/10" />

                        {/* Split view toggles */}
                        <button
                            onClick={() => { setSplitView(true); setSplitRight("newsletter"); }}
                            className={`flex items-center gap-2 rounded-none border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${splitView && splitRight === "newsletter"
                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                                }`}
                        >
                            <Columns2 className="h-4 w-4" />
                            Web ↔ Newsletter
                        </button>
                        <button
                            onClick={() => { setSplitView(true); setSplitRight("blog"); }}
                            className={`flex items-center gap-2 rounded-none border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${splitView && splitRight === "blog"
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
                        /* ═══ SPLIT VIEW ═══ */
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Left: Website */}
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Monitor className="h-4 w-4 text-white/40" />
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                        Website
                                    </span>
                                    <span className="ml-auto font-sans text-[10px] text-white/20">
                                        /better-practice
                                    </span>
                                </div>
                                <div className="overflow-hidden border border-white/10 bg-white shadow-2xl">
                                    <iframe
                                        src="/better-practice"
                                        className="h-[800px] w-full"
                                        title="Website preview"
                                    />
                                </div>
                            </div>

                            {/* Right: Newsletter or Blog */}
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    {splitRight === "newsletter" ? (
                                        <Mail className="h-4 w-4 text-cyan-400/60" />
                                    ) : (
                                        <BookOpen className="h-4 w-4 text-purple-400/60" />
                                    )}
                                    <span
                                        className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] ${splitRight === "newsletter" ? "text-cyan-400/60" : "text-purple-400/60"
                                            }`}
                                    >
                                        {splitRight === "newsletter" ? "Newsletter" : "Blog"}
                                    </span>
                                    <span className="ml-auto font-sans text-[10px] text-white/20">
                                        {splitRight === "newsletter" ? "email-safe HTML" : "blog.dreamplaypianos.com"}
                                    </span>
                                </div>
                                <div className="overflow-hidden border border-white/10 bg-[#f4f4f7] shadow-2xl">
                                    <iframe
                                        srcDoc={splitRight === "newsletter" ? NEWSLETTER_HTML : BLOG_HTML}
                                        className="h-[800px] w-full"
                                        title={splitRight === "newsletter" ? "Newsletter preview" : "Blog preview"}
                                        sandbox="allow-same-origin allow-popups"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ═══ SINGLE VIEW ═══ */
                        <div className="mx-auto max-w-4xl">
                            <div className="mb-3 flex items-center gap-2">
                                {activeTab === "website" && <Monitor className="h-4 w-4 text-white/40" />}
                                {activeTab === "newsletter" && <Mail className="h-4 w-4 text-cyan-400/60" />}
                                {activeTab === "blog" && <BookOpen className="h-4 w-4 text-purple-400/60" />}
                                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    {activeTab === "website" ? "Website — /better-practice" : activeTab === "newsletter" ? "Newsletter — Email-safe HTML" : "Blog — blog.dreamplaypianos.com"}
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden border border-white/10 shadow-2xl ${activeTab === "website" ? "bg-white" : "bg-[#f4f4f7]"
                                    }`}
                            >
                                {activeTab === "website" ? (
                                    <iframe
                                        src="/better-practice"
                                        className="h-[900px] w-full"
                                        title="Website preview"
                                    />
                                ) : (
                                    <iframe
                                        srcDoc={activeTab === "newsletter" ? NEWSLETTER_HTML : BLOG_HTML}
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
                            <p className="font-sans text-xs leading-relaxed text-white/40">
                                Full interactive landing page with scroll animations, gradient backgrounds, embedded videos, and responsive layout. Built with Next.js, Tailwind, and the AnimatedSection component.
                            </p>
                        </div>
                        <div className="border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
                            <div className="mb-3 flex items-center gap-2">
                                <Mail className="h-4 w-4 text-cyan-400" />
                                <span className="font-sans text-xs font-bold uppercase tracking-wider text-cyan-300">Newsletter</span>
                            </div>
                            <p className="font-sans text-xs leading-relaxed text-white/40">
                                Email-safe HTML following the DnD block compiler format: 600px max-width, inline styles, table-compatible layout, social icons, and mustache template variables for tracking.
                            </p>
                        </div>
                        <div className="border border-purple-500/20 bg-purple-500/[0.03] p-6">
                            <div className="mb-3 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-purple-400" />
                                <span className="font-sans text-xs font-bold uppercase tracking-wider text-purple-300">Blog</span>
                            </div>
                            <p className="font-sans text-xs leading-relaxed text-white/40">
                                Dark-themed blog format matching blog.dreamplaypianos.com: Cormorant Garamond headings, featured post hero, author cards, and bordered quote blocks on #050505 background.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
