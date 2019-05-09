import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class BrandForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
      if(!this.state.name.length) {
        return
      }
      const newBrand = this.state;
      var database = firebase.database();
      var brandRef = database.ref().child('marcas');
      var brandKey = brandRef.push().key;
      var updates = {};

      updates['/marcas/' + brandKey] = newBrand;
      firebase.database().ref().update(updates);
    }

    handleChange(e) {
      this.setState({ name: e.target.value });
    }

    render() {
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="newBrand">
              Nome da Marca
            </label>
            <input id="newBrand" onChange={this.handleChange} value={this.state.name} />
            <button>
              Nova Marca
            </button>
          </form>
        </div>
      );
    }
}

function getMarcas() {
  let data;
  var database = firebase.database();
  let brandsRef = database.ref().child('marcas').once('value').then( function(snapShot) {
    console.log(snapShot.val());
      data = snapShot.val();
  })
  console.log('e ai?');
  return (
    <h1>{data}</h1>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        {getMarcas()}
      </div>
      <BrandForm/>
    </div>
  );
}

export default App;
