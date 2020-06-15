import React from 'react';
import 'App.css';
import TopBar from 'components/TopBar';
import Content from 'components/Content';
import Footer from 'components/Footer';

const App = () => {
  return (
    <div className="App">
      <TopBar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
