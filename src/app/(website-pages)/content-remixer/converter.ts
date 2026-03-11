// ── Content Block Types ──────────────────────────────────
export type ContentBlock =
    | { type: "heading"; level: 1 | 2 | 3; text: string }
    | { type: "text"; html: string }
    | { type: "image"; src: string; alt: string }
    | { type: "cta"; text: string; href: string }
    | { type: "quote"; text: string; author?: string; role?: string }
    | { type: "divider" }
    | { type: "stat"; value: string; label: string };

// ── DOM Scraper ──────────────────────────────────────────
export function scrapePageContent(doc: Document): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    const seen = new Set<string>();

    // Find the main content area (skip nav/footer)
    const main = doc.querySelector("main") || doc.body;
    if (!main) return blocks;

    // Walk through sections
    const sections = main.querySelectorAll("section");
    const targets = sections.length > 0 ? sections : [main];

    targets.forEach((section) => {
        // Skip hidden sections
        const style = getComputedStyle(section);
        if (style.display === "none" || style.visibility === "hidden") return;

        // Extract headings
        section.querySelectorAll("h1, h2, h3").forEach((el) => {
            const text = el.textContent?.trim() || "";
            if (!text || seen.has("h:" + text)) return;
            seen.add("h:" + text);
            const level = parseInt(el.tagName[1]) as 1 | 2 | 3;
            blocks.push({ type: "heading", level, text });
        });

        // Extract paragraphs
        section.querySelectorAll("p").forEach((el) => {
            const text = el.textContent?.trim() || "";
            if (!text || text.length < 15 || seen.has("p:" + text.slice(0, 60))) return;
            seen.add("p:" + text.slice(0, 60));
            // Preserve bold/italic by using innerHTML but strip classes
            const html = el.innerHTML
                .replace(/class="[^"]*"/g, "")
                .replace(/className="[^"]*"/g, "")
                .trim();
            blocks.push({ type: "text", html });
        });

        // Extract images
        section.querySelectorAll("img").forEach((el) => {
            const src = el.getAttribute("src") || "";
            if (!src || seen.has("img:" + src)) return;
            // Skip tiny icons, logos, avatars
            const w = el.naturalWidth || el.width;
            if (w > 0 && w < 80) return;
            seen.add("img:" + src);
            blocks.push({ type: "image", src, alt: el.alt || "" });
        });

        // Extract videos (use poster or first source)
        section.querySelectorAll("video").forEach((el) => {
            const poster = el.getAttribute("poster");
            const src = el.getAttribute("src") || el.querySelector("source")?.getAttribute("src") || "";
            if (poster && !seen.has("img:" + poster)) {
                seen.add("img:" + poster);
                blocks.push({ type: "image", src: poster, alt: "Video still" });
            } else if (src && !seen.has("vid:" + src)) {
                seen.add("vid:" + src);
                // Note: videos become image placeholders in email/blog
                blocks.push({ type: "image", src: src.replace(/\.mp4|\.webm/i, ".jpg"), alt: "Video content" });
            }
        });

        // Extract CTAs (buttons and prominent links)
        section.querySelectorAll("a").forEach((el) => {
            const text = el.textContent?.trim() || "";
            const href = el.getAttribute("href") || "";
            if (!text || !href || text.length > 50) return;
            // Check if it looks like a CTA button
            const cls = el.className || "";
            const isButton =
                cls.includes("btn") ||
                cls.includes("button") ||
                cls.includes("cta") ||
                el.closest("[class*='btn']") !== null ||
                (el.parentElement?.tagName === "DIV" &&
                    el.style.display === "inline-block") ||
                text.includes("→") ||
                text.includes("Get") ||
                text.includes("Learn") ||
                text.includes("Configure") ||
                text.includes("Order") ||
                text.includes("Buy") ||
                text.includes("Start") ||
                text.includes("Reserve");
            if (isButton && !seen.has("cta:" + text)) {
                seen.add("cta:" + text);
                blocks.push({ type: "cta", text: text.replace(/→|➜|➝/g, "").trim(), href });
            }
        });

        // Extract blockquotes
        section.querySelectorAll("blockquote, [class*='quote']").forEach((el) => {
            const text = el.querySelector("p, [class*='text']")?.textContent?.trim() || el.textContent?.trim() || "";
            if (!text || text.length < 20 || seen.has("q:" + text.slice(0, 40))) return;
            seen.add("q:" + text.slice(0, 40));
            const author = el.querySelector("[class*='author'], cite, footer")?.textContent?.trim();
            const role = el.querySelector("[class*='role'], [class*='title']")?.textContent?.trim();
            blocks.push({ type: "quote", text, author, role });
        });
    });

    // Add a divider between groups of content
    const withDividers: ContentBlock[] = [];
    let lastType = "";
    blocks.forEach((b) => {
        if (lastType === "text" && b.type === "heading") {
            withDividers.push({ type: "divider" });
        }
        withDividers.push(b);
        lastType = b.type;
    });

    return withDividers;
}

// ── Newsletter Builder (600px, inline styles) ────────────
export function blocksToNewsletter(blocks: ContentBlock[], pageTitle: string): string {
    const rows = blocks.map((b) => {
        switch (b.type) {
            case "heading":
                if (b.level === 1) {
                    return `<tr><td style="padding:20px 30px 10px;text-align:center;background:#050505;">
<h1 style="margin:0;font-size:28px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">${b.text}</h1>
</td></tr>`;
                }
                return `<tr><td style="padding:20px 30px 5px;">
<h2 style="margin:0;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">${b.text}</h2>
</td></tr>`;
            case "text":
                return `<tr><td style="padding:5px 30px 10px;">
<p style="font-size:15px;line-height:1.7;color:#444444;margin:0;">${b.html}</p>
</td></tr>`;
            case "image":
                return `<tr><td style="padding:10px 30px;text-align:center;">
<img src="${b.src}" alt="${b.alt}" width="540" style="display:block;max-width:100%;width:540px;height:auto;margin:0 auto;border:0;" />
</td></tr>`;
            case "cta":
                return `<tr><td style="padding:15px 30px;text-align:center;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr><td style="background:#000000;padding:14px 40px;">
<a href="${b.href}" style="color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">${b.text}</a>
</td></tr></table>
</td></tr>`;
            case "quote":
                return `<tr><td style="padding:15px 30px;background:#f8f8f8;border-left:3px solid #e5e5e5;">
<p style="font-size:15px;line-height:1.6;color:#555;font-style:italic;margin:0 0 5px;">"${b.text}"</p>
${b.author ? `<p style="font-size:12px;color:#888;margin:0;"><strong>${b.author}</strong>${b.role ? ` — ${b.role}` : ""}</p>` : ""}
</td></tr>`;
            case "divider":
                return `<tr><td style="padding:10px 30px;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;" /></td></tr>`;
            case "stat":
                return `<tr><td style="padding:10px 30px;text-align:center;">
<p style="font-size:36px;font-weight:bold;color:#1a1a1a;margin:0;">${b.value}</p>
<p style="font-size:12px;color:#888;margin:4px 0 0;text-transform:uppercase;letter-spacing:2px;">${b.label}</p>
</td></tr>`;
            default:
                return "";
        }
    }).join("\n");

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${pageTitle}</title></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f7;">
<tr><td align="center" style="padding:20px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;">
${rows}
<tr><td style="padding:20px 30px 30px;text-align:center;font-size:11px;color:#aaa;">
<p style="margin:0;">DreamPlay Pianos &bull; Victoria, BC, Canada</p>
<p style="margin:5px 0 0;"><a href="{{unsubscribe_url}}" style="color:#aaa;text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

// ── Blog Builder (themed CSS classes) ────────────────────
type BlogTheme = "minimalist" | "luxury" | "gold-accent";

const blogThemeCSSMap: Record<BlogTheme, string> = {
    minimalist: `body{background:#fafafa;color:#1a1a1a;}h1,h2{color:#1a1a1a;}p{color:#333;}blockquote{border-left:3px solid #e5e5e5;background:#f5f5f5;padding:20px 24px;margin:20px 0;}`,
    luxury: `body{background:#050505;color:rgba(255,255,255,0.85);}h1,h2{color:#fff;}p{color:rgba(255,255,255,0.7);}blockquote{border-left:3px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.03);padding:20px 24px;margin:20px 0;color:rgba(255,255,255,0.6);}a{color:#fff;}`,
    "gold-accent": `body{background:#0a0a0a;color:rgba(255,255,255,0.85);}h1,h2{color:#c9a85c;}p{color:rgba(255,255,255,0.7);}blockquote{border-left:3px solid rgba(201,168,92,0.4);background:rgba(201,168,92,0.05);padding:20px 24px;margin:20px 0;color:rgba(255,255,255,0.6);}a{color:#c9a85c;}`,
};

export function blocksToBlog(blocks: ContentBlock[], pageTitle: string, theme: BlogTheme): string {
    const css = blogThemeCSSMap[theme];

    const content = blocks.map((b) => {
        switch (b.type) {
            case "heading":
                return b.level === 1
                    ? `<h1 style="font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:600;line-height:1.2;margin:40px 0 20px;">${b.text}</h1>`
                    : `<h2 style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;margin:40px 0 16px;">${b.text}</h2>`;
            case "text":
                return `<p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;margin:0 0 16px;">${b.html}</p>`;
            case "image":
                return `<div style="margin:30px 0;overflow:hidden;border-radius:2px;"><img src="${b.src}" alt="${b.alt}" style="width:100%;height:auto;display:block;" /></div>`;
            case "cta":
                return `<div style="text-align:center;padding:30px 0;">
<a href="${b.href}" style="display:inline-block;padding:14px 40px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;text-decoration:none;border:1px solid currentColor;">${b.text} &rarr;</a>
</div>`;
            case "quote":
                return `<blockquote>
<p style="font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.5;font-style:italic;margin:0 0 10px;">"${b.text}"</p>
${b.author ? `<p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0;">${b.author}${b.role ? `<br/><span style="font-weight:400;opacity:0.6;">${b.role}</span>` : ""}</p>` : ""}
</blockquote>`;
            case "divider":
                return `<hr style="border:none;border-top:1px solid;opacity:0.1;margin:40px 0;" />`;
            case "stat":
                return `<div style="text-align:center;padding:20px 0;">
<p style="font-size:48px;font-weight:700;margin:0;font-family:'Cormorant Garamond',serif;">${b.value}</p>
<p style="font-size:11px;text-transform:uppercase;letter-spacing:3px;opacity:0.5;margin:8px 0 0;">${b.label}</p>
</div>`;
            default:
                return "";
        }
    }).join("\n");

    return `<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${pageTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
${css}
</style>
</head>
<body>
<div style="max-width:800px;margin:0 auto;padding:60px 40px;">
${content}
</div>
</body></html>`;
}

// ── Gmail Builder (table layout, pure inline) ────────────
export function blocksToGmail(blocks: ContentBlock[], pageTitle: string): string {
    const rows = blocks.map((b) => {
        switch (b.type) {
            case "heading":
                if (b.level === 1) {
                    return `<tr><td style="padding:20px 30px 10px;text-align:center;background:#050505;">
<h1 style="margin:0;font-size:26px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;line-height:1.3;">${b.text}</h1>
</td></tr>`;
                }
                return `<tr><td style="padding:20px 30px 5px;">
<h2 style="margin:0;font-size:20px;color:#1a1a1a;font-family:Georgia,serif;">${b.text}</h2>
</td></tr>`;
            case "text":
                return `<tr><td style="padding:5px 30px 10px;">
<p style="font-size:14px;line-height:1.7;color:#444444;margin:0;">${b.html}</p>
</td></tr>`;
            case "image":
                return `<tr><td style="padding:10px 30px;text-align:center;">
<img src="${b.src}" alt="${b.alt}" width="520" style="display:block;max-width:100%;width:520px;height:auto;margin:0 auto;border:0;" />
</td></tr>`;
            case "cta":
                return `<tr><td style="padding:15px 30px;text-align:center;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr><td style="background:#000000;padding:12px 36px;">
<a href="${b.href}" style="color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">${b.text}</a>
</td></tr></table>
</td></tr>`;
            case "quote":
                return `<tr><td style="padding:10px 30px;background:#f8f8f8;border-left:3px solid #e5e5e5;">
<p style="font-size:14px;line-height:1.6;color:#555;font-style:italic;margin:0 0 5px;">"${b.text}"</p>
${b.author ? `<p style="font-size:11px;color:#888;margin:0;"><strong>${b.author}</strong>${b.role ? ` - ${b.role}` : ""}</p>` : ""}
</td></tr>`;
            case "divider":
                return `<tr><td style="padding:10px 30px;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;" /></td></tr>`;
            default:
                return "";
        }
    }).join("\n");

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${pageTitle}</title></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f7;">
<tr><td align="center" style="padding:20px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="580" style="max-width:580px;background:#ffffff;">
${rows}
<tr><td style="padding:15px 30px 30px;text-align:center;font-size:11px;color:#aaaaaa;">
<p style="margin:0;">DreamPlay Pianos - Victoria, BC, Canada</p>
<p style="margin:5px 0 0;"><a href="{{unsubscribe_url}}" style="color:#aaaaaa;text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

// ── Helpers for social media builders ────────────────────
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

function getFirstHeading(blocks: ContentBlock[]): string {
    return blocks.find((b) => b.type === "heading")?.text || "DreamPlay Pianos";
}

function getFirstImage(blocks: ContentBlock[]): string {
    return (blocks.find((b) => b.type === "image") as { type: "image"; src: string; alt: string } | undefined)?.src || "";
}

function getAllImages(blocks: ContentBlock[]): string[] {
    return blocks.filter((b) => b.type === "image").map((b) => (b as { type: "image"; src: string; alt: string }).src);
}

function getFirstCta(blocks: ContentBlock[]): { text: string; href: string } {
    const cta = blocks.find((b) => b.type === "cta") as { type: "cta"; text: string; href: string } | undefined;
    return cta || { text: "Learn More", href: "https://www.dreamplaypianos.com" };
}

function getTexts(blocks: ContentBlock[]): string[] {
    return blocks.filter((b) => b.type === "text").map((b) => stripHtml((b as { type: "text"; html: string }).html));
}

function getHeadings(blocks: ContentBlock[]): string[] {
    return blocks.filter((b) => b.type === "heading").map((b) => (b as { type: "heading"; level: number; text: string }).text);
}

function getQuotes(blocks: ContentBlock[]): { text: string; author?: string; role?: string }[] {
    return blocks.filter((b) => b.type === "quote") as { type: "quote"; text: string; author?: string; role?: string }[];
}

function truncate(str: string, max: number): string {
    if (str.length <= max) return str;
    return str.slice(0, max - 1).trim() + "\u2026";
}

// ── Reddit Ad Builder ────────────────────────────────────
export function blocksToRedditAd(blocks: ContentBlock[], pageTitle: string, pageUrl: string): string {
    const headline = truncate(getFirstHeading(blocks), 300);
    const texts = getTexts(blocks);
    const description = truncate(texts[0] || pageTitle, 200);
    const image = getFirstImage(blocks);
    const cta = getFirstCta(blocks);
    const domain = "dreamplaypianos.com";

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0e1113;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;}
.card{background:#1a1a1b;border:1px solid #343536;border-radius:4px;max-width:640px;width:100%;overflow:hidden;}
.promoted{display:flex;align-items:center;gap:6px;padding:10px 12px 4px;color:#818384;font-size:12px;}
.promoted svg{width:14px;height:14px;fill:#818384;}
.header{display:flex;align-items:center;gap:8px;padding:4px 12px 8px;}
.avatar{width:28px;height:28px;border-radius:50%;background:#ff4500;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px;}
.sub{font-size:12px;font-weight:700;color:#d7dadc;}
.sub span{color:#818384;font-weight:400;margin-left:4px;}
.title{font-size:18px;font-weight:500;color:#d7dadc;padding:0 12px 10px;line-height:1.35;}
.desc{font-size:14px;color:#818384;padding:0 12px 12px;line-height:1.5;}
.thumb{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;}
.thumb-placeholder{width:100%;aspect-ratio:16/9;background:#272729;display:flex;align-items:center;justify-content:center;color:#818384;font-size:14px;}
.cta-bar{display:flex;align-items:center;gap:12px;padding:10px 12px;border-top:1px solid #343536;}
.cta-btn{background:#ff4500;color:#fff;border:none;border-radius:20px;padding:8px 20px;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;}
.actions{display:flex;gap:16px;padding:8px 12px;color:#818384;font-size:12px;font-weight:700;}
.actions span{display:flex;align-items:center;gap:4px;cursor:pointer;}
.domain{font-size:12px;color:#4fbcff;padding:0 12px 8px;}
.copyable{margin-top:20px;max-width:640px;width:100%;background:#1a1a1b;border:1px solid #343536;border-radius:4px;padding:16px;}
.copyable h4{color:#818384;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.copyable pre{color:#d7dadc;font-size:13px;font-family:monospace;white-space:pre-wrap;word-wrap:break-word;line-height:1.6;}
</style></head><body>
<div>
<div class="card">
<div class="promoted"><svg viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.5 14.5l-1 1L10 12l-3.5 3.5-1-1L9 11 5.5 7.5l1-1L10 10l3.5-3.5 1 1L11 11l3.5 3.5z"/></svg>Promoted</div>
<div class="header">
<div class="avatar">DP</div>
<div class="sub">u/DreamPlayPianos<span>· Promoted</span></div>
</div>
<div class="title">${headline}</div>
<div class="desc">${description}</div>
${image ? `<img class="thumb" src="${image}" alt="" />` : `<div class="thumb-placeholder">No image available</div>`}
<div class="domain">🔗 ${domain}</div>
<div class="cta-bar"><a class="cta-btn" href="${cta.href}">${cta.text}</a></div>
<div class="actions">
<span>⬆ Vote</span><span>💬 Comments</span><span>↗ Share</span><span>⭐ Save</span>
</div>
</div>
<div class="copyable">
<h4>📋 Ad Copy (ready to paste)</h4>
<pre><strong>Headline:</strong> ${headline}

<strong>Description:</strong> ${description}

<strong>CTA:</strong> ${cta.text}
<strong>URL:</strong> ${pageUrl || cta.href}</pre>
</div>
</div>
</body></html>`;
}

// ── X / Twitter Post Builder ─────────────────────────────
export function blocksToTwitterPost(blocks: ContentBlock[], pageTitle: string): string {
    const headings = getHeadings(blocks);
    const texts = getTexts(blocks);
    const quotes = getQuotes(blocks);
    const cta = getFirstCta(blocks);
    const image = getFirstImage(blocks);

    // Main tweet: punchy hook
    const hook = headings[0] || pageTitle;
    const body = texts[0] ? truncate(texts[0], 120) : "";
    const hashtags = "#DreamPlayPianos #Piano #MusicEducation";
    const mainTweet = truncate(`${hook}\n\n${body}\n\n${cta.href}\n\n${hashtags}`, 280);

    // Thread tweets from remaining content
    const threadTweets: string[] = [];
    for (let i = 1; i < headings.length && threadTweets.length < 5; i++) {
        const relatedText = texts[i] ? truncate(texts[i], 180) : "";
        threadTweets.push(truncate(`${headings[i]}\n\n${relatedText}`, 280));
    }
    for (const q of quotes) {
        if (threadTweets.length >= 5) break;
        threadTweets.push(truncate(`"${q.text}"\n\n— ${q.author || ""}${q.role ? `, ${q.role}` : ""}`, 280));
    }
    if (threadTweets.length > 0) {
        threadTweets.push(truncate(`Want to try it yourself?\n\n${cta.href}\n\n${hashtags}`, 280));
    }

    const threadHtml = threadTweets.map((t, i) => `
<div class="tweet reply">
<div class="tweet-header">
<div class="avatar">DP</div>
<div class="thread-line"></div>
<div class="name-row"><span class="display-name">DreamPlay Pianos</span><span class="handle">@DreamPlayPianos</span></div>
</div>
<div class="tweet-body">${t.replace(/\n/g, "<br/>")}</div>
<div class="tweet-meta">${i + 2}/${threadTweets.length + 1} in thread</div>
</div>`).join("");

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e7e9ea;display:flex;flex-direction:column;align-items:center;padding:20px;gap:0;}
.tweet{max-width:550px;width:100%;border:1px solid #2f3336;padding:16px;position:relative;}
.tweet.reply{border-top:none;}
.tweet-header{display:flex;align-items:center;gap:10px;margin-bottom:10px;position:relative;}
.avatar{width:40px;height:40px;border-radius:50%;background:#1d9bf0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0;}
.name-row{display:flex;flex-direction:column;}
.display-name{font-weight:700;font-size:15px;}
.handle{color:#71767b;font-size:13px;}
.tweet-body{font-size:15px;line-height:1.5;margin-bottom:10px;word-wrap:break-word;}
.tweet-body a{color:#1d9bf0;text-decoration:none;}
.tweet-img{width:100%;border-radius:16px;margin-bottom:10px;display:block;}
.tweet-actions{display:flex;gap:40px;color:#71767b;font-size:13px;}
.tweet-actions span{cursor:pointer;display:flex;align-items:center;gap:4px;}
.tweet-meta{color:#71767b;font-size:13px;margin-top:8px;}
.char-count{position:absolute;top:16px;right:16px;font-size:12px;color:#71767b;}
.char-count.danger{color:#f4212e;}
.thread-label{text-align:center;color:#1d9bf0;font-size:13px;font-weight:700;padding:8px 0;max-width:550px;width:100%;border:1px solid #2f3336;border-top:none;background:#000;}
.thread-line{position:absolute;left:19px;top:50px;bottom:-16px;width:2px;background:#2f3336;}
.copyable{margin-top:20px;max-width:550px;width:100%;background:#16181c;border:1px solid #2f3336;border-radius:12px;padding:16px;}
.copyable h4{color:#71767b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.copyable pre{color:#e7e9ea;font-size:13px;font-family:monospace;white-space:pre-wrap;word-wrap:break-word;line-height:1.6;}
</style></head><body>
<div class="tweet" style="border-radius:16px 16px 0 0;">
<span class="char-count ${mainTweet.length > 260 ? "danger" : ""}">${mainTweet.length}/280</span>
<div class="tweet-header">
<div class="avatar">DP</div>
${threadTweets.length > 0 ? '<div class="thread-line"></div>' : ''}
<div class="name-row"><span class="display-name">DreamPlay Pianos</span><span class="handle">@DreamPlayPianos · now</span></div>
</div>
<div class="tweet-body">${mainTweet.replace(/\n/g, "<br/>").replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>')}</div>
${image ? `<img class="tweet-img" src="${image}" alt="" />` : ""}
<div class="tweet-actions"><span>💬 0</span><span>🔁 0</span><span>❤️ 0</span><span>📊 0</span></div>
</div>
${threadTweets.length > 0 ? `<div class="thread-label">Show thread (${threadTweets.length + 1} posts)</div>` : ""}
${threadHtml}
<div class="copyable">
<h4>📋 Post Copy (ready to paste)</h4>
<pre><strong>Main Tweet:</strong>
${mainTweet}

${threadTweets.length > 0 ? `<strong>Thread (${threadTweets.length} replies):</strong>\n${threadTweets.map((t, i) => `\n[${i + 2}/${threadTweets.length + 1}] ${t}`).join("\n")}` : ""}</pre>
</div>
</body></html>`;
}

// ── Instagram Carousel Builder ───────────────────────────
export function blocksToIGCarousel(blocks: ContentBlock[], pageTitle: string): string {
    const headings = getHeadings(blocks);
    const texts = getTexts(blocks);
    const images = getAllImages(blocks);
    const quotes = getQuotes(blocks);
    const cta = getFirstCta(blocks);

    // Build slides: Hook → Problem/Value → Feature slides → Social Proof → CTA
    interface Slide { heading: string; body: string; image: string; type: string; }
    const slides: Slide[] = [];

    // Slide 1: Hook
    slides.push({
        heading: headings[0] || pageTitle,
        body: texts[0] ? truncate(texts[0], 100) : "",
        image: images[0] || "",
        type: "hook",
    });

    // Feature/value slides from remaining headings
    for (let i = 1; i < headings.length && slides.length < 5; i++) {
        slides.push({
            heading: headings[i],
            body: texts[i] ? truncate(texts[i], 100) : "",
            image: images[i] || images[0] || "",
            type: "feature",
        });
    }

    // Quote slide if available
    if (quotes.length > 0 && slides.length < 7) {
        const q = quotes[0];
        slides.push({
            heading: `"${truncate(q.text, 80)}"`,
            body: q.author ? `— ${q.author}${q.role ? `, ${q.role}` : ""}` : "",
            image: images[Math.min(images.length - 1, slides.length)] || images[0] || "",
            type: "quote",
        });
    }

    // CTA slide
    slides.push({
        heading: cta.text || "Get Yours Today",
        body: "dreamplaypianos.com",
        image: images[0] || "",
        type: "cta",
    });

    // Cap at 7 slides
    while (slides.length > 7) slides.pop();

    const slidesHtml = slides.map((s, i) => {
        const overlayColor = s.type === "cta" ? "rgba(0,0,0,0.7)" : s.type === "quote" ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.55)";
        const headingSize = s.type === "hook" ? "28px" : s.type === "cta" ? "24px" : "22px";
        return `<div class="slide" data-index="${i}" style="display:${i === 0 ? "flex" : "none"};">
${s.image ? `<img src="${s.image}" alt="" />` : `<div class="no-img"></div>`}
<div class="overlay" style="background:${overlayColor};">
${s.type === "hook" ? `<div class="badge">SWIPE →</div>` : ""}
${s.type === "quote" ? `<div class="quote-mark">❝</div>` : ""}
<h2 style="font-size:${headingSize};">${s.heading}</h2>
${s.body ? `<p>${s.body}</p>` : ""}
${s.type === "cta" ? `<div class="ig-cta">${cta.text} →</div>` : ""}
<div class="slide-counter">${i + 1} / ${slides.length}</div>
</div>
</div>`;
    }).join("\n");

    const captionHashtags = "#piano #musiclearning #dreamplay #pianolessons #musictech #learnpiano";
    const caption = `${headings[0] || pageTitle}\n\n${texts[0] ? truncate(texts[0], 150) : ""}\n\n🔗 Link in bio\n\n${captionHashtags}`;

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#121212;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;flex-direction:column;align-items:center;padding:20px;color:#fff;}
.phone{width:375px;background:#000;border-radius:20px;overflow:hidden;border:2px solid #333;position:relative;}
.ig-header{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #262626;}
.ig-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;}
.ig-user{font-size:13px;font-weight:600;}
.carousel{position:relative;width:375px;height:375px;overflow:hidden;}
.slide{position:absolute;inset:0;flex-direction:column;align-items:center;justify-content:center;}
.slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.slide .no-img{position:absolute;inset:0;background:#1a1a2e;}
.overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center;gap:12px;}
.overlay h2{font-family:'Georgia',serif;font-weight:700;line-height:1.3;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.5);}
.overlay p{font-size:14px;color:rgba(255,255,255,0.85);line-height:1.5;text-shadow:0 1px 4px rgba(0,0,0,0.5);}
.badge{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;background:rgba(255,255,255,0.15);padding:4px 12px;border-radius:20px;backdrop-filter:blur(4px);}
.quote-mark{font-size:36px;opacity:0.5;}
.ig-cta{background:#fff;color:#000;padding:10px 28px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-radius:6px;margin-top:8px;}
.slide-counter{position:absolute;bottom:12px;right:14px;font-size:11px;background:rgba(0,0,0,0.6);padding:3px 10px;border-radius:12px;color:rgba(255,255,255,0.8);}
.nav{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;}
.nav button{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px 12px;opacity:0.7;}
.nav button:hover{opacity:1;}
.dots{display:flex;gap:4px;}
.dots span{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.3);}
.dots span.active{background:#fff;}
.ig-actions{display:flex;justify-content:space-between;padding:10px 14px;}
.ig-actions .left{display:flex;gap:16px;font-size:22px;}
.ig-actions .right{font-size:22px;}
.caption-area{padding:10px 14px;font-size:13px;line-height:1.5;color:#e0e0e0;}
.caption-area strong{color:#fff;}
.copyable{margin-top:20px;width:375px;background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:16px;}
.copyable h4{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.copyable pre{color:#e0e0e0;font-size:12px;font-family:monospace;white-space:pre-wrap;word-wrap:break-word;line-height:1.6;}
</style></head><body>
<div class="phone">
<div class="ig-header">
<div class="ig-avatar">DP</div>
<div class="ig-user">dreamplaypianos</div>
</div>
<div class="carousel" id="carousel">
${slidesHtml}
</div>
<div class="nav">
<button onclick="navigate(-1)">‹</button>
<div class="dots" id="dots">${slides.map((_, i) => `<span class="${i === 0 ? "active" : ""}"></span>`).join("")}</div>
<button onclick="navigate(1)">›</button>
</div>
<div class="ig-actions"><div class="left">❤️ 💬 ↗️</div><div class="right">🔖</div></div>
<div class="caption-area"><strong>dreamplaypianos</strong> ${truncate(caption.replace(/\n/g, " "), 150)}</div>
</div>
<div class="copyable">
<h4>📋 Caption (ready to paste)</h4>
<pre>${caption}</pre>
</div>
<script>
let current=0;const total=${slides.length};
function navigate(dir){
document.querySelector('[data-index="'+current+'"]').style.display='none';
current=Math.max(0,Math.min(total-1,current+dir));
document.querySelector('[data-index="'+current+'"]').style.display='flex';
document.querySelectorAll('.dots span').forEach((d,i)=>d.className=i===current?'active':'');
}
</script>
</body></html>`;
}

// ── Instagram Ad Builder ─────────────────────────────────
export function blocksToIGAd(blocks: ContentBlock[], pageTitle: string, pageUrl: string): string {
    const headline = getFirstHeading(blocks);
    const texts = getTexts(blocks);
    const subline = texts[0] ? truncate(texts[0], 90) : "";
    const image = getFirstImage(blocks);
    const cta = getFirstCta(blocks);
    const quotes = getQuotes(blocks);

    // Build persuasive ad copy
    const adHook = truncate(headline, 60);
    const adBody = texts.slice(0, 2).map((t) => truncate(t, 100)).join("\n\n");
    const socialProof = quotes[0] ? `\n\n"${truncate(quotes[0].text, 80)}" — ${quotes[0].author || ""}` : "";
    const adCaption = `${adHook}\n\n${adBody}${socialProof}\n\n👇 ${cta.text}\n🔗 ${pageUrl || cta.href}\n\n#piano #dreamplay #musictech #learnpiano`;

    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#121212;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;flex-direction:column;align-items:center;padding:20px;color:#fff;}
.phone{width:375px;background:#000;border-radius:20px;overflow:hidden;border:2px solid #333;}
.ig-header{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #262626;}
.ig-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;}
.ig-user{font-size:13px;font-weight:600;flex:1;}
.sponsored{font-size:11px;color:#888;margin-left:auto;}
.ad-creative{position:relative;width:375px;height:375px;overflow:hidden;}
.ad-creative img{width:100%;height:100%;object-fit:cover;}
.ad-creative .no-img{width:100%;height:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);}
.ad-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 40%,rgba(0,0,0,0.1) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;gap:8px;}
.ad-overlay h1{font-size:26px;font-weight:800;line-height:1.2;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.6);font-family:'Georgia',serif;}
.ad-overlay p{font-size:14px;color:rgba(255,255,255,0.85);line-height:1.4;text-shadow:0 1px 4px rgba(0,0,0,0.5);}
.cta-strip{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:#262626;border-top:1px solid #363636;}
.cta-strip .domain{font-size:12px;color:#888;flex:1;}
.cta-strip .domain div{font-size:11px;color:#555;margin-top:2px;}
.cta-strip .cta-button{background:#0095f6;color:#fff;border:none;padding:8px 20px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;}
.ig-actions{display:flex;justify-content:space-between;padding:10px 14px;}
.ig-actions .left{display:flex;gap:16px;font-size:22px;}
.ig-actions .right{font-size:22px;}
.engagement{padding:4px 14px 10px;display:flex;gap:20px;font-size:12px;color:#888;}
.engagement strong{color:#fff;}
.copyable{margin-top:20px;width:375px;background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:16px;}
.copyable h4{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.copyable pre{color:#e0e0e0;font-size:12px;font-family:monospace;white-space:pre-wrap;word-wrap:break-word;line-height:1.6;}
.metrics{margin-top:12px;width:375px;background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:16px;}
.metrics h4{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.metrics-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.metric{background:#222;padding:10px;border-radius:8px;text-align:center;}
.metric .value{font-size:18px;font-weight:700;color:#0095f6;}
.metric .label{font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:4px;}
</style></head><body>
<div class="phone">
<div class="ig-header">
<div class="ig-avatar">DP</div>
<div class="ig-user">dreamplaypianos</div>
<div class="sponsored">Sponsored</div>
</div>
<div class="ad-creative">
${image ? `<img src="${image}" alt="" />` : `<div class="no-img"></div>`}
<div class="ad-overlay">
<h1>${adHook}</h1>
<p>${subline}</p>
</div>
</div>
<div class="cta-strip">
<div class="domain">dreamplaypianos.com<div>Learn more about DreamPlay</div></div>
<button class="cta-button">${cta.text}</button>
</div>
<div class="ig-actions"><div class="left">❤️ 💬 ↗️</div><div class="right">🔖</div></div>
<div class="engagement"><span><strong>2,847</strong> likes</span><span><strong>142</strong> comments</span></div>
</div>
<div class="metrics">
<h4>📊 Ad Performance Targets</h4>
<div class="metrics-grid">
<div class="metric"><div class="value">3-5%</div><div class="label">Target CTR</div></div>
<div class="metric"><div class="value">&lt;$2</div><div class="label">Target CPC</div></div>
<div class="metric"><div class="value">&gt;3s</div><div class="label">Avg. Watch Time</div></div>
<div class="metric"><div class="value">&gt;15%</div><div class="label">Engagement Rate</div></div>
</div>
</div>
<div class="copyable">
<h4>📋 Ad Copy (ready to paste)</h4>
<pre>${adCaption}</pre>
</div>
</body></html>`;
}
