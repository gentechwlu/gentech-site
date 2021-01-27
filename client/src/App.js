import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Navigation from './components/navigation';
import Footer from './components/footer';
import NotFoundPage from './pages/NotFoundPage';
import WhatWeDo from './pages/WhatWeDo';
import AdminAuthPage from './pages/AdminAuthPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/about" component={AboutPage}/>   
              <Route path="/whatwedo/:name" component={WhatWeDo} />           
              <Route path="/admin/authenticate" component={AdminAuthPage} />
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route component={NotFoundPage} />
            </Switch>
            
          </div>
          <Footer />
      </div>
      
    </Router>
      
  );
}

export default App;
