import React, { Component } from 'react';
import { firestore,firebaseApp } from '../plugins/firebase';

export default class Form extends Component {
  _isMounted = false;
  
  constructor() {
    super();
    this.state = {
      type: "en",
      word: "",
      uid: ""
    };
    this.addWord = this.addWord.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.changeWord = this.changeWord.bind(this);

  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  addWord() {
    if (this.state["word"] === '') {
      return
    }
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        firestore.collection('dictionary').add({
          fav: false,
          type: this.state.type,
          created_at: new Date(),
          word: this.state.word,
          uid: user.uid,
        }).then(() => {
          this.setState({ word: "" });
        });
      }
    });
  }

  changeSelect(event) {
    this.setState({ type: event.target.value });
  }

  changeWord(event) {
    this.setState({ word: event.target.value });
  }

  render() {
    return (
      <form>
        <div>
          <label className="siimple-label siimple--color-white">Word:</label>
          <input name="word" type="text" className="siimple-input" onChange={this.changeWord} value={this.state.word} />
        </div>
        <div>
          <label className="siimple-label siimple--color-white">Type:</label>
          <select className="siimple-select" defaultValue={this.state.type} onChange={this.changeSelect} >
            <option name="typeSelect" value="en">英和 </option>
            <option name="typeSelect" value="ja">和英 </option>
          </select>
        </div>
        <div value="Add" className="siimple-btn siimple-btn--primary" onClick={() => this.addWord()}>Add</div>
      </form>
    );
  }
}