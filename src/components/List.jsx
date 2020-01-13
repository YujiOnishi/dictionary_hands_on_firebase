import React, { Component } from 'react';
import firebaseApp from '../plugins/firebase';
import { firestore } from '../plugins/firebase';

export default class List extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      type: "en",
      words: [],
      documents: [],
      isLoading: true
    };
    this.getWords = this.getWords.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  getWords() {
    let type = "";
    let translatedType = "";

    type = this.state.type;
    if (type === "en") {
      translatedType = "ja"
    }
    else {
      translatedType = "en"
    }


    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        firestore.collection('dictionary')
          .orderBy('created_at')
          .where('type', '==', type)
          .where('uid', '==', user.uid)
          .get()
          .then(snapShot => {
            let dicWords = [];
            snapShot.forEach(doc => {
              if (doc.data().translated == null) {
                return;
              }
              dicWords.push({
                word: doc.data().word,
                translated: doc.data().translated[translatedType],
                id: doc.id
              });
            });
            if (this._isMounted) {
              this.setState({
                words: dicWords,
                isLoading: false
              });
            }
          });
      }
    });
  }

  changeType(dicType) {
    this.setState({ type: dicType });
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getWords();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.getWords();
  }

  render() {
    return (
      <div>
        <label className="siimple-label siimple--color-white">表示:</label>
        <div className="siimple-btn siimple-btn--primary" onClick={() => this.changeType("en")}>
          英和
        </div>
        <div className="siimple-btn siimple-btn--primary" onClick={() => this.changeType("ja")}>
          和英
        </div>
        <div className="siimple-rule"></div>
        {this.state.isLoading &&
          <div className="siimple-card-title siimple--color-white">Loading...</div>}
        {
          this.state.words.map(function (dicWord) {
            return (
              <div className="siimple-card" key={dicWord.word}>
                <div className="siimple-card-body">
                  <div className="siimple-card-title siimple--color-white">{dicWord.word}</div>
                  <div className="siimple-card-subtitle siimple--color-white">訳:{dicWord.translated}</div>
                  <span className="siimple-tag siimple-tag--error" onClick={function () {
                    firestore.collection("dictionary").doc(dicWord.id).delete().then(function () {
                      //alert("削除しました");
                    }).catch(function (error) {
                      //alert("error");
                    });
                  }}>Delete</span>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}