import React from 'react';
import { PageLayout } from './components/Layout/PageLayout';
import { user, contentItems, tabs } from './data/mockData';
import './index.css';

function App() {
  return (
    <PageLayout 
      user={user} 
      contentItems={contentItems} 
      tabs={tabs} 
    />
  );
}

export default App;