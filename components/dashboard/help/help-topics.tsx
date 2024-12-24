'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const helpTopics = [
  {
    question: 'Which ITR form should I file?',
    answer: 'The choice of ITR form depends on your source of income. ITR-1 is for salaried individuals, ITR-2 for capital gains, ITR-3 for business income, and so on.',
  },
  {
    question: 'What is Form 26AS?',
    answer: 'Form 26AS is your tax credit statement that shows TDS deductions, tax payments, and other tax-related transactions linked to your PAN.',
  },
  {
    question: 'When should I file Form 15G/15H?',
    answer: 'Form 15G/15H should be submitted to prevent TDS deduction if your income is below the taxable limit. Form 15H is for senior citizens.',
  },
];

export function HelpTopics() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {helpTopics.map((topic, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{topic.question}</AccordionTrigger>
          <AccordionContent>{topic.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}