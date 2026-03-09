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
