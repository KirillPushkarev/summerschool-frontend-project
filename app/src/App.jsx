import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import Header from './components/Header/Header';
import IssueList from './components/IssueList/IssueList';
import IssueDetails from './components/IssueDetails/IssueDetails';
import IssueEdit from './components/AddIssue/IssueEdit'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/issues" component={IssueList}/>
            <Route path="/issues/:id" component={IssueDetails}/>
            <Route path="/createissue" render={(props) => <IssueEdit {...props} mode={"Create"}/>}/>
            <Route path="/updateissue/:id" render={(props) => <IssueEdit {...props} mode={"Update"}/>}/> 
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
