"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const isCustomizePage = pathname === "/customize";

    const getLinkClass = (path: string) => {
        const baseClass = "navigation5_link-wrfrm w-nav-link";
        const darkClass = isCustomizePage ? " text-white hover:text-[#4a9eff]" : "";
        return pathname === path ? `${baseClass} w--current${darkClass}` : `${baseClass}${darkClass}`;
    };

    const getBrandClass = (path: string) => {
        const baseClass = "navigation5_logo-link w-nav-brand";
        return pathname === path ? `${baseClass} w--current` : baseClass;
    };

    return (
        <div
            data-animation="default"
            className={`section_navigation5-wrfrm w-nav ${isCustomizePage ? 'bg-[#0a0a0f] border-b border-white/5' : ''}`}
            style={isCustomizePage ? { position: 'relative', inset: 'auto' } : undefined}
            data-wf--navbar--variant="base"
            data-easing2="ease"
            // @ts-ignore
            fs-scrolldisable-element="smart-nav"
            data-easing="ease"
            data-collapse="medium"
            role="banner"
            data-duration="400"
        >
            <div className="navigation5_container">
                <Link
                    href="/"
                    aria-current="page"
                    className={getBrandClass("/")}
                >
                    <img
                        loading="lazy"
                        src="/images/Logo.svg"
                        alt="DreamPlay Pianos"
                        className={`navigation_logo ${isCustomizePage ? 'brightness-0 invert' : ''}`}
                    />
                </Link>
                <nav
                    role="navigation"
                    className="navigation5_menu-wrfrm is-page-height-tablet w-nav-menu"
                >
                    <div className="navigation5_menu-links">
                        <Link
                            href="/"
                            aria-current="page"
                            className={getLinkClass("/")}
                        >
                            DreamPlay One
                        </Link>
                        <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
                        <Link
                            href="/why-narrow"
                            className={getLinkClass("/why-narrow")}
                        >
                            Why Narrow?
                        </Link>
                        <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
                        <Link
                            href="/better-practice"
                            className={getLinkClass("/better-practice")}
                        >
                            Practice Better
                        </Link>
                        <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
                        <Link
                            href="/how-it-works"
                            className={getLinkClass("/how-it-works")}
                        >
                            How It Works
                        </Link>
                        <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setShowAboutDropdown(true)}
                            onMouseLeave={() => setShowAboutDropdown(false)}
                        >
                            <div className={`${getLinkClass("/about-us")} cursor-pointer !flex items-center gap-2 whitespace-nowrap`}>
                                About Us
                                <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`}
                                >
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div
                                className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden transition-all duration-200 border ${isCustomizePage
                                    ? 'bg-[#0a0a0f] border-white/10'
                                    : 'bg-white border-black/5 ring-1 ring-black/5'
                                    } ${showAboutDropdown
                                        ? 'opacity-100 translate-y-0 visible'
                                        : 'opacity-0 translate-y-2 invisible'
                                    }`}
                                style={{ zIndex: 100 }}
                            >
                                <Link
                                    href="/our-story"
                                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    Our Story
                                </Link>
                                <Link
                                    href="/about-us/ds-standard"
                                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    The DS Standard
                                </Link>
                                <Link
                                    href="https://blog.dreamplaypianos.com/blog"
                                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    Our Blog
                                </Link>
                            </div>
                        </div>
                        <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className={`${getLinkClass("/information-and-policies")} cursor-pointer !flex items-center gap-2 whitespace-nowrap`}>
                                Information & Policies
                                <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                >
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div
                                className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden transition-all duration-200 border ${isCustomizePage
                                    ? 'bg-[#0a0a0f] border-white/10'
                                    : 'bg-white border-black/5 ring-1 ring-black/5'
                                    } ${showDropdown
                                        ? 'opacity-100 translate-y-0 visible'
                                        : 'opacity-0 translate-y-2 invisible'
                                    }`}
                                style={{ zIndex: 100 }}
                            >
                                <Link
                                    href="/information-and-policies/faq"
                                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/information-and-policies/shipping"
                                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    Shipping
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="navigation5_button-wrapper button-show-on-landscape">
                        <div>
                            <Link
                                data-wf--button-primary--variant="secondary"
                                href="/customize"
                                className="button w-variant-1ae2a9c7-3071-e35e-921a-e41dc6d6ad44 w-inline-block"
                            >
                                <div className="button_text">
                                    <div>Pre-Order Now</div>
                                </div>
                                <div className="button_icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        viewBox="0 0 18 10"
                                        fill="none"
                                        className="button_icon-svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="navigation5_buttons-wrfrm">
                    <div className="navigation5_button-wrapper">
                        <Link
                            data-wf--button-primary--variant="base"
                            href="/customize"
                            className="button w-inline-block"
                        >
                            <div className="button_text">
                                <div>Pre-Order Now</div>
                            </div>
                            <div className="button_icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 18 10"
                                    fill="none"
                                    className="button_icon-svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <div
                        className={`navigation5_menu-button w-nav-button ${mobileMenuOpen ? 'w--open' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className="navigation5_menu-icon">
                            <div className="navigation_menu_line-top navigation-menu-line-background-wrfrm"></div>
                            <div className="navigation_menu_line-middle navigation-menu-line-background-wrfrm">
                                <div className="navigation_menu_line-middle-inner"></div>
                            </div>
                            <div className="navigation_menu_line-bottom navigation-menu-line-background-wrfrm"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[999]"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-[70px] left-0 right-0 bg-white shadow-xl z-[1001] transition-all duration-300 ${mobileMenuOpen
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-4 invisible pointer-events-none'
                    }`}
            >
                <div className="flex flex-col py-4">
                    <Link
                        href="/"
                        className="px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        DreamPlay One
                    </Link>
                    <Link
                        href="/why-narrow"
                        className="px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Why Narrow?
                    </Link>
                    <Link
                        href="/better-practice"
                        className="px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Practice Better
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        How It Works
                    </Link>
                    <div className="border-t border-gray-200 my-2" />
                    <div className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">About Us</div>
                    <Link
                        href="/our-story"
                        className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/about-us/ds-standard"
                        className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        The DS Standard
                    </Link>
                    <Link
                        href="https://blog.dreamplaypianos.com/blog"
                        className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Our Blog
                    </Link>
                    <div className="border-t border-gray-200 my-2" />
                    <div className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">Information & Policies</div>
                    <Link
                        href="/information-and-policies/faq"
                        className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/information-and-policies/shipping"
                        className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Shipping
                    </Link>
                    <div className="border-t border-gray-200 my-2" />
                    <div className="px-6 py-4">
                        <Link
                            href="/customize"
                            className="block w-full text-center py-3 px-6 bg-black text-white rounded-full font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pre-Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

