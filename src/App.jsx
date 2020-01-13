import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dictionary from './screens/Dictionary';
import SignInOrUp from './screens/SignIn';
import SignUp from './screens/SignUp';
import Auth from './plugins/Auth';

export default class App extends Component {
  _isMounted = false;
  
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/signin" component={SignInOrUp} />
            <Route exact path="/signup" component={SignUp} />
            {/* 以下認証のみ */}
            <Auth>
              <Switch>
                <Route exact path="/dictionary" component={Dictionary} />
                <Route render={() => <p>not found.</p>} />
              </Switch>
            </Auth>
          </Switch>
        </Router>
      </div>
    );
  }
}