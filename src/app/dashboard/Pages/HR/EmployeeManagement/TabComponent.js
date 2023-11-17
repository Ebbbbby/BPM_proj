import React, { useState } from 'react';
import './TabComponent.css'

const Tab = ({ label, isActive, onClick }) => (
  <div
    className={`tab ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

const TabContent = ({ children, isActive }) => (
  <div className={`tab-content ${isActive ? 'active' : ''}`}>{children}</div>
);

const TabComponent = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tab-list">
        {children.map((child, index) => (
          <Tab
            key={index}
            label={child.props.label}
            isActive={activeTab === index}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      {children.map((child, index) => (
        <TabContent
          key={index}
          isActive={activeTab === index}
        >
          {child.props.children}
        </TabContent>
      ))}
    </div>
  );
};
export default TabComponent