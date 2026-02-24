/**
 * Shopify Variant ID Matrix
 * 
 * Each tier × size × color combination maps to a unique Shopify variant ID.
 * To find a variant ID: Shopify Admin → Products → [Product] → Variants → click Edit → copy ID from URL.
 */
export const VARIANT_MAP: Record<string, Record<string, Record<string, string>>> = {
    full: { // DreamPlay Bundle
        'DS5.5': { 'Black': '53081205506362', 'White': '53081205539130' },
        'DS6.0': { 'Black': '53081205571898', 'White': '53081205604666' },
        'DS6.5': { 'Black': '53081289883962', 'White': '53081289916730' },
    },
    solo: { // Keyboard Only
        'DS5.5': { 'Black': '52968307097914', 'White': '52968307130682' },
        'DS6.0': { 'Black': '52968307163450', 'White': '52968307196218' },
        'DS6.5': { 'Black': '53081296470330', 'White': '53081296503098' },
    },
    deposit: { // Reserve Deposit
        'DS5.5': { 'Black': '', 'White': '' },
        'DS6.0': { 'Black': '', 'White': '' },
        'DS6.5': { 'Black': '', 'White': '' },
    },
    signature: { // Signature Edition
        'DS5.5': { 'Black': '53081298501946', 'White': '53081298534714' },
        'DS6.0': { 'Black': '53081298567482', 'White': '53081298600250' },
        'DS6.5': { 'Black': '53081298633018', 'White': '53081298665786' },
    },
};
