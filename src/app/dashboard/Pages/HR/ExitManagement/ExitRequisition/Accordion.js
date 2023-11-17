
import React, { useState } from "react";
import AccordionStyles from './AccordionStyles/Accordion.module.css'
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={AccordionStyles.accordion_container}>
      {items?.map((item, index) => (
        <div className={AccordionStyles.accordion_item} key={index}>
          <div className={AccordionStyles.accordion_header} onClick={() => toggleAccordion(index)}>
            <h2> {index + 1 + '.' + '  '}  {item.question}</h2>
            <span className={AccordionStyles.toggle}>{activeIndex === index ? "-" : "+"}</span>
          </div>
          {activeIndex === index && <div className="accordion-content">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;