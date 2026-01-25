'use client'

import React, { useState } from "react";
import { FAQItem } from "@/actions/faq-actions";

interface FAQListProps {
    items: FAQItem[];
}

export default function FAQList({ items }: FAQListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-qa-wrap">
            <div className="faq_wrapper-wrfrm">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={item.id || index} className="faq4_item-wrfrm" onClick={() => toggleAccordion(index)}>
                            <div className={`faq_trigger ${isOpen ? 'active' : ''}`}>
                                <div className="faq_trigger-info">
                                    <h3 className="heading-style-wrfrm-h5">{item.question}</h3>
                                </div>
                                <div className={`faq4_toggle-icon-wrfrm ${isOpen ? 'active' : ''}`}>
                                    <div className="faq4_icon-line-wrfrm"></div>
                                    <div className="faq4_icon-line-static-wrfrm"></div>
                                </div>
                            </div>
                            <div className={`faq_description ${isOpen ? 'open' : ''}`}>
                                <div className="faq_description-inner">
                                    <div dangerouslySetInnerHTML={{ __html: item.answer || "" }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Styles scoped here since they were styled-jsx in the parent */}
            <style jsx>{`
              .faq-qa-wrap { width: 100%; max-width: 48rem; margin: 0 auto; }
              .faq4_item-wrfrm {
                display: block;
                width: 100%;
                border-bottom: 1px solid #e5e7eb;
                padding: 1.5rem 0;
                cursor: pointer;
                text-align: left;
                background: none;
                border-left: none; border-right: none; border-top: none; 
              }
              .faq_trigger { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
              .heading-style-wrfrm-h5 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin: 0; color: #111827; }
              .faq4_toggle-icon-wrfrm { position: relative; width: 1rem; height: 1rem; flex-shrink: 0; }
              .faq4_icon-line-wrfrm, .faq4_icon-line-static-wrfrm {
                position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background-color: #111827;
                transition: transform 0.3s ease; transform: translateY(-50%);
              }
              .faq4_icon-line-wrfrm { transform: translateY(-50%) rotate(90deg); }
              .active .faq4_icon-line-wrfrm { transform: translateY(-50%) rotate(0deg); }
              
              .faq_description {
                display: grid;
                grid-template-rows: 0fr;
                transition: grid-template-rows 0.3s ease-out;
                overflow: hidden;
              }
              .faq_description.open { grid-template-rows: 1fr; }
              .faq_description-inner { min-height: 0; padding-top: 1rem; }
              .p-regular { font-size: 1rem; line-height: 1.6; color: #4b5563; margin-bottom: 1rem; }
              
              /* Global styles for content inside answer */
              :global(.faq_description-inner p) { margin-bottom: 1rem; line-height: 1.6; color: #4b5563; }
              :global(.faq_description-inner a) { color: #3b82f6; text-decoration: underline; }
              :global(.faq_description-inner img) { max-width: 100%; border-radius: 0.5rem; margin: 1rem 0; }
              :global(.faq-image-block) { margin: 1.5rem 0; border-radius: 0.75rem; overflow: hidden; }
              :global(.faq-image) { width: 100%; height: auto; display: block; }
              :global(.is-flex) { display: flex; flex-direction: column; gap: 1rem; }
            `}</style>
        </div>
    );
}
