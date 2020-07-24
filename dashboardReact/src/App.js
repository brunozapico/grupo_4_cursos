import React from 'react';
import Sidebar from './components/sideBar/SideBar';
import ContentWrapper from './components/contentWrapper/ContentWrapper';

function App() {
  return (
    <div id="wrapper">
      <Sidebar />
      <ContentWrapper />
    </div>
  );
}

export default App;
