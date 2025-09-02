import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../src/components/Header';
import ReturnsAndRepairs from '../src/components/ReturnandRepairs';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: 'How do I contact you?',
    answer:
     "You can contact us simply by typing your questions or messages. " +
  "Just type out your inquiry, and we'll respond as soon as we can.\n\n" +
  "Or you can reach us through the following channels:\n\n" +
  "Email: Support@sjdgnd.com\n" +
  "Website: https://www.sjdgnd.com/contact-us (fill out the form and we'll get back to you as soon as possible).",
  },
  {
    id: 2,
    question: 'How do I know if my order has been placed and received by you?',
    answer:
      'Once you place an order, you will receive a confirmation email, text message, call or WhatsApp with your order details. If you do not receive a confirmation within a few minutes, please check your spam or junk folder.\n'+
    'You can also log into your account and check your order history. If you still have concerns, feel free to contact us.',
  },
  {
    id: 3,
    question: 'How long will it take to customize my special order?',
    answer:
      'The customization time depends on the complexity of your order. Typically, it takes 4 to 6 weeks to complete, but will provide an estimated timeline when you place your order. If you need a rush order, please contact us, and we will do our best to accommodate your request.',
  },
  {
    id: 4,
    question: 'Do you ship?',
    answer:
      'Yes, we offer shipping to various locations. Shipping options, costs and delivery times depend on your location.\n'+
        'For more information, please ship@sjdgnd.com,713-773-2786 (122) /shipping policy page.',
  },
  {
    id: 5,
    question: 'What is your Return Policy?',
    answer:
      'We accept returns within of delivery. Customized or personalized items may not be eligible for returns unless there is a defect or error on our part.',
  },
  {
    id: 6,
    question: 'How can I create an account?',
    answer:
    'Creating an account is quick and easy! Simply follow these steps:\n'+
    '1. Visit our website and click on the Sign Up or Create Account icon button ,located at the top right of the homepage.\n'+
    '2. Fill in the required information, such as your name, email address, and a password.\n'+
    '3. Once you are logged in ,you may also be asked to provide additional details, such as your shipping address, for a more personalized experience.\n'+
    '4. Once you’ve filled out the form, click Submit or Create Account.\n'+
    '5. Once you submit the form , admin will approve your account and you are good to start shopping, and tracking orders.'
  },
  
  {
    id: 7,
    question: 'How can I access the store through this platform?',
    answer:
      'You can access the store by: Visiting our website -Navigate to the home page you will see categorical items on top menu. Some features may require you to sign in. If you need assistance, feel free to contact our support team.' 
     },
  {
    id: 8,
    question: 'What payment methods do you accept?',
    answer:
     'Paypal, cashapp (processing fee may apply on certain items)\n'+
       ' We accept a variety of payment methods, including:\n'+
        'Credit/Debit Cards (Visa, MasterCard, American Express, etc.)\n'+
        'PayPal, Bank Transfers',
  },
  {
    id: 9,
    question: 'Can I buy from you if I live outside the United States?',
    answer:
     'Contact our support team to confirm if we deliver to your location.'
  },
  {
    id: 10,
    question: 'Will you deliver on Saturdays?',
    answer:
     'Yes, we offer Saturday deliveries in selective locations, depending on the shipping method and courier service used. Delivery availability may vary based on your location and order type.'
  }
];

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) =>
    setOpenId(prev => (prev === id ? null : id));

  return (
    <>
    <Header />
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* ---------- Hero ---------- */}
      <header className="relative h-60 md:h-72 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
          Frequently Asked Questions
        </h1>
      </header>

      {/* ---------- FAQ List ---------- */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        {faqData.map(({ id, question, answer }) => {
  const open = id === openId;

  return (
    <div key={id} className="border-b last:border-0">
      {/* ---------- Header ---------- */}
      <button
        onClick={() => toggleItem(id)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-lg md:text-xl font-medium">{question}</span>

        {/* icon */}
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* ---------- Body ---------- */}
      <div
        /* 1️⃣ transition on MAX-height, not grid-rows */
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out
                    ${open ? 'max-h-40' : 'max-h-0'}`}
      >
        {/* 2️⃣ give the inner <p> its own padding so we don’t
               lose it when max-height turns to 0                */}
        <p className="py-3 text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
})}

      </main>
      <ReturnsAndRepairs />

      {/* ---------- Contact CTA ---------- */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            Still have questions?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Our support team replies within one business day. Drop us a message
            and we’ll be delighted to help.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-md bg-amber-500 px-8 py-3 text-white
                       font-medium shadow-lg hover:bg-amber-600 transition"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Faq;
