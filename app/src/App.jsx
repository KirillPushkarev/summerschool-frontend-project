import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import IssueApiService from './api_services/IssueApiService'

import Header from './components/Header/Header';
import IssueList from './components/IssueList/IssueList';
import Board from './components/Board/Board';
import IssueDetails from './components/IssueDetails/IssueDetails';
import IssueEditForm from './components/IssueEditForm/IssueEditForm';

class App extends Component {
  constructor(props){
    super(props);

    this.issueApiService = new IssueApiService('http://localhost:3004');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={(props) => <IssueList {...props} issueApiService={this.issueApiService} />}/>
            <Route exact path="/issues" component={(props) => <IssueList {...props} issueApiService={this.issueApiService} />}/>
            <Route exact path="/board" component={Board}/>
            <Route path="/issues/:id" component={(props) => <IssueDetails {...props} issueApiService={this.issueApiService} />}/>
            <Route path="/createissue" render={(props) => <IssueEditForm {...props} mode={"Create"} issueApiService={this.issueApiService} />}/>
            <Route path="/updateissue/:id" render={(props) => <IssueEditForm {...props} mode={"Update"} issueApiService={this.issueApiService} />}/> 
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
