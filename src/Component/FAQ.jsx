"use client";

import React, { useState } from "react";
import '@/styles/FAQ.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <div
          className="question"
          onClick={() => toggleAnswer(0)}
        >
          What is your return policy?
        </div>
        <div className={`answer ${activeIndex === 0 ? "show" : ""}`}>
          Our return policy allows you to return items within 30 days of purchase.
        </div>
      </div>

      <div className="faq-item">
        <div
          className="question"
          onClick={() => toggleAnswer(1)}
        >
          Do you offer international shipping?
        </div>
        <div className={`answer ${activeIndex === 1 ? "show" : ""}`}>
          Yes, we offer worldwide shipping. Additional fees may apply.
        </div>
      </div>

      <div className="faq-item">
        <div
          className="question"
          onClick={() => toggleAnswer(2)}
        >
          How can I track my order?
        </div>
        <div className={`answer ${activeIndex === 2 ? "show" : ""}`}>
          Once your order is shipped, you will receive a tracking number via email.
        </div>
      </div>
    </div>
  );
}

export default FAQ;
