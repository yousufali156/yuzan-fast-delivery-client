import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

// You might need to install framer-motion: npm install framer-motion

// Dummy data for the FAQ section
const faqData = [
  {
    question: 'How does this posture corrector work?',
    answer: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.',
  },
  {
    question: 'Is it suitable for all ages and body types?',
    answer: 'Yes, our posture correctors are designed to be fully adjustable and are suitable for a wide range of body types and ages, from teenagers to seniors. We recommend checking the size guide before purchasing.',
  },
  {
    question: 'Does it really help with back pain and posture improvement?',
    answer: 'Absolutely. By promoting proper alignment, the corrector helps reduce strain on your back muscles, which can significantly alleviate back pain. Consistent use helps retrain your muscles for better long-term posture.',
  },
  {
    question: 'Does it have smart features like vibration alerts?',
    answer: 'Some of our premium models include smart features like gentle vibration alerts that remind you to correct your posture whenever you start to slouch. This active feedback mechanism is highly effective.',
  },
  {
    question: 'How will I be notified when the product is back in stock?',
    answer: 'You can subscribe to our back-in-stock notification on the product page. We will send you an email or SMS as soon as the item is available for purchase again.',
  },
];

/**
 * A single accordion item component.
 * It uses framer-motion for smooth open/close animations.
 */
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${isOpen ? 'bg-white rounded-xl shadow-md' : ''}`}>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-6"
      >
        <span className={`font-semibold ${isOpen ? 'text-teal-600' : 'text-gray-800'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-6 w-6 transition-colors ${isOpen ? 'text-teal-600' : 'text-gray-500'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600 text-left">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * The main FAQ component that holds the list of accordion items.
 */
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First item is open by default

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Allows toggling
  };

  return (
    <div className="bg-[#F5F8F9] py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={activeIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
        
        <div className="mt-12">
            <button className="bg-lime-300 text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto hover:bg-lime-400 transition-colors">
                <span>See More FAQ's</span>
                <div className="bg-black text-white rounded-full p-1">
                    <ChevronRight className="h-4 w-4" />
                </div>
            </button>
        </div>

      </div>
    </div>
  );
};


export default FAQ;