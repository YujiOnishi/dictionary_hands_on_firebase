import React, { Component } from 'react';
import {firebaseApp }from '../plugins/firebase';
import Form from '../components/Form';
import List from '../components/List';

export default class Dictionary extends Component {
  _isMounted = false;
  
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMouFnted = false;
  }
  handleLogout ()  {
    firebaseApp.auth().signOut();
  }
  render() {
    return (
      <div>
        <div className="siimple-navbar siimple-navbar--success siimple-navbar--fluid">
          <div className="siimple-content siimple-content--small">
            <div className="siimple-navbar-title">Dictionary</div>
            <div className="siimple-navbar-subtitle">AI辞書</div>
            <div className="siimple--float-right">
              <a className="siimple-navbar-subtitle" onClick={() => this.handleLogout()}>ログアウト</a>
            </ div>
          </ div>
        </div>
        <div className="siimple-box siimple--bg-success">
          <div className="siimple-content siimple-content--small">
            <div className="siimple-rule"></div>
            <Form />
            <div className="siimple-rule"></div>
            <List />
          </div>
        </div>
      </div>
    );
  }
}