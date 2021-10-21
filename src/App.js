import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router,Switch} from 'react-router-dom';
import Home from "./Pages/Home";
import Launch from "./Pages/Launch";
import ErrorPage from "./Pages/404";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/launch/:id" component={Launch}/>
          <Route path="/error" component={ErrorPage}/>
        </Switch> 
      </div>
        
    </Router>
    
  );
}

export default App;
