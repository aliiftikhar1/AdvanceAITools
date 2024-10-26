import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqData = [
  {
    question: 'What is Advance Ai Tools and what do you offer?',
    answer:
      'Advance Ai Tools is a platform that provides a diverse range of templates for various purposes. Whether you need templates for websites, presentations, documents, or other projects, we\'ve got you covered.'
  },
  {
    question: 'How do I browse and find templates on Advance Ai Tools?',
    answer:
      'Navigating our website is easy. Simply browse through the categories or use our search feature to find the templates that suit your needs. Once you find a template you like, you can preview it before downloading.'
  },
  {
    question: 'Are the templates on Advance Ai Tools free to use?',
    answer:
      'We offer a mix of free and premium templates. Free templates can be used without any charge, while premium templates may require a one-time purchase. Check the pricing details on each template\'s page for more information.'
  },
  {
    question: 'Can I customize the templates to fit my specific requirements?',
    answer:
      'Absolutely! Our templates are designed to be easily customizable. You can edit text, images, colors, and other elements to tailor the template to your unique needs using compatible software.'
  },
  {
    question: 'How do I download a template from Advance Ai Tools?',
    answer:
      'To download a template, simply click on the "Download" button on the template\'s page. If it\'s a free template, you may be able to download it directly. For premium templates, follow the checkout process to access the download link.'
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`mb-4 transition-transform duration-300 `}
    >
      <div
        className={`p-5 rounded-full cursor-pointer transition-colors duration-300 flex justify-between items-center ${
          isOpen ? 'bg-blue-600 text-white text-xl' : 'bg-white text-gray-800'
        }`}
        onClick={onClick}
      >
        <h4 className="text-lg font-medium">{question}</h4>
        <span className="text-2xl">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all text-justify duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 text-xl' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg text-gray-600 mt-4">
          {answer}
        </div>
      </div>
    </div>
  );
};

const AccordionExpandDefault = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{  margin: 'auto', paddingBottom: '50px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start px-20 py-20">
        
        {/* Left Column - Heading */}
        <div className="flex flex-col justify-center  w-full">
          <h2 className="text-[#333333] text-[60px] font-[1000] text-center lg:text-left mb-6 leading-[100px]">
            Frequently Asked Questions <br></br>????
          </h2>
        
        </div>

        {/* Right Column - Accordion FAQs */}
        <div className="space-y-4 col-span-2">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionExpandDefault;
