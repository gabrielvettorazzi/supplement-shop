"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all unopened products. Please contact our support team for more information.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 3-5 business days for domestic orders. International shipping times may vary.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Please check our shipping policy for a complete list of supported countries.",
  },
  {
    question: "Are your products third-party tested?",
    answer:
      "Yes, all of our products are rigorously tested by third-party labs to ensure the highest quality and purity.",
  },
];

export function FaqAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
