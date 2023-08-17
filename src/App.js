// import logo from './logo.svg';
import "./App.css";

import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 5;
  // apiKey= '5e3bee8a16214293a72fcdfa7bb3f26e';
  apiKey= process.env.REACT_APP_NEWS_API;
  
  state={
    progress: 0,
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    console.log('apikey:',this.apiKey)
    return (
      <div>
        <Router>
          <NavBar />

          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />

          <Switch>
            <Route exact path="/">
              <News setProgress= {this.setProgress}
                key="general"
                pageSize={this.pageSize}
                country="in"
                category="general"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/business">
              <News setProgress= {this.setProgress}
                key="business"
                pageSize={this.pageSize}
                country="in"
                category="business"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress= {this.setProgress}
                key="entertainment"
                pageSize={this.pageSize}
                country="in"
                category="entertainment"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/general">
              <News setProgress= {this.setProgress}
                key="general"
                pageSize={this.pageSize}
                country="in"
                category="general"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/health">
              <News setProgress= {this.setProgress}
                key="health"
                pageSize={this.pageSize}
                country="in"
                category="health"
                apiKey={this.apiKey}
              />
            </Route>
            <Route key="science" exact path="/science">
              <News setProgress= {this.setProgress} pageSize={this.pageSize} country="in" category="science" />
            </Route>
            <Route exact path="/sports">
              <News setProgress= {this.setProgress}
                key="sports"
                pageSize={this.pageSize}
                country="in"
                category="sports"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/technology">
              <News setProgress= {this.setProgress}
                key="technology"
                pageSize={this.pageSize}
                country="in"
                category="technology"
                apiKey={this.apiKey}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
