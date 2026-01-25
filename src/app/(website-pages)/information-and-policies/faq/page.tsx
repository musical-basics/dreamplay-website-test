import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQList from "@/components/faq-list";
import { getFaqItems } from "@/actions/faq-actions";

export const revalidate = 0; // Ensure fresh data on every request

export default async function FAQPage() {
    const faqItems = await getFaqItems();

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="main-wrapper">
                <div className="section-faq">
                    <div className="global-padding">
                        <div className="section-padding">
                            <div className="container-1045">
                                <style>{`
                  .container-1045 { max-width: 65.3125rem; margin: 0 auto; }
                  .faq-title-block { margin-bottom: 2.5rem; text-align: center; }
                  .h2-heading { font-size: 2.5rem; font-weight: 700; line-height: 1.1; margin-top: 0; margin-bottom: 0; }
                `}</style>

                                <div className="faq-content-wrapper">
                                    <div className="faq-title-block">
                                        <h2 className="h2-heading">Frequently Asked Questions</h2>
                                    </div>

                                    <FAQList items={faqItems} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
