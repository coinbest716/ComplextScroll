import React from 'react';
import { TabType } from '../../types';

interface TabsProps {
  tabs: Array<{ id: TabType; label: string }>;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-black text-white' 
              : 'bg-transparent text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;