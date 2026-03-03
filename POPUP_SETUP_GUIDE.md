# Popup Setup Guide

How to add, modify, or configure newsletter popups on the DreamPlay website.

---

## Architecture Overview

The popup system has 3 layers:

| Layer | File | Purpose |
|-------|------|---------|
| **UI Component** | `src/components/NewsletterPopup.tsx` | Renders popups, handles form submissions, tracks conversions |
| **A/B API** | `src/app/api/popup-ab/route.ts` | Assigns visitors to buckets, logs qualifications & conversions |
| **Admin Config** | `src/app/admin/page.tsx` | UI for toggling A/B test, setting popup order/delays per bucket |

---

## Current Popup Types

| Type ID | Display Name | Icon (lucide) | Subscriber Tag | Success Behavior | localStorage Key |
|---------|-------------|---------------|----------------|-----------------|-----------------|
| `shipping` | Free Shipping | `Package` | `Free Shipping Lead` | "Check your inbox" | `dp_v2_shipping_seen` |
| `pdf` | PDF Guide | `FileText` | `Hand Guide Download` | Auto-opens PDF link | `dp_v2_pdf_seen` |
| `discount` | $300 Off | `DollarSign` | `$300 Off Lead` | "Check your inbox" | `dp_v2_discount_seen` |

---

## How to Add a New Popup Type

### Step 1: `NewsletterPopup.tsx`

1. **Add to `PopupType` union** (line ~11):
   ```ts
   type PopupType = "none" | "shipping" | "pdf" | "your_new_type";
   ```

2. **Add icon** in the icon conditional block (~line 248):
   ```tsx
   {activePopup === "your_new_type" ? (
       <YourIcon className="text-white" size={24} strokeWidth={1.5} />
   ) : ...}
   ```

3. **Add label** in the subtitle conditional (~line 256):
   ```tsx
   {activePopup === "your_new_type" ? "Your Subtitle" : ...}
   ```

4. **Add headline** in the h2 conditional (~line 260):
   ```tsx
   {activePopup === "your_new_type" ? "Your Headline." : ...}
   ```

5. **Add description** in the paragraph conditional (~line 266):
   ```tsx
   {activePopup === "your_new_type" ? "Your description text." : ...}
   ```

6. **Add button label** in the submit button conditional (~line 293):
   ```tsx
   {activePopup === "your_new_type" ? "Your CTA Text" : ...}
   ```

7. **Add subscriber tag** in `handleSubmit` (~line 179):
   ```ts
   const tag = currentOffer === "shipping" ? "Free Shipping Lead"
             : currentOffer === "your_new_type" ? "Your Tag Name"
             : "Hand Guide Download";
   ```

8. **Add success screen** — either reuse the "check your inbox" pattern or add a new `isSubmitted === "your_new_type"` block after line ~328.

9. **Add to `handleClose`** — set `localStorage.setItem("dp_v2_your_new_type_seen", "true")` and optionally chain to the next unseen popup.

10. **Add to post-submit localStorage cleanup** (~line 207):
    ```ts
    localStorage.setItem("dp_v2_your_new_type_seen", "true");
    ```

11. **Add analytics tracking** in `trackPopup` call (~line 214):
    ```ts
    trackPopup('yes', currentOffer === 'your_new_type' ? 'your_tracking_name' : ...);
    ```

### Step 2: `admin/page.tsx`

Add a new `<option>` in the A/B config popup type dropdown (~line 738):
```tsx
<option value="your_new_type">Your Display Name</option>
```

### Step 3: `api/popup-ab/route.ts`

No changes needed — the API is type-agnostic. It passes whatever `type` string is in the config entries.

### Step 4: Configure via Admin

1. Go to `/admin` → **A/B Config** tab
2. Add the new popup type to your **Control** and/or **Variant** entries
3. Set the delay (in minutes/seconds)
4. Save

---

## Key Behaviors

- **Once subscribed, no more popups** — `dp_v2_subscribed` flag in localStorage
- **Each popup shown once** — tracked via `dp_v2_{type}_seen` in localStorage
- **Popups don't stack** — only fires if `activePopup === "none"`
- **Close chaining** — closing one popup can trigger the next unseen one after a delay
- **A/B test** — visitors are assigned to `control` or `variant` bucket, each with its own popup sequence and delays
