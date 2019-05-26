import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';

class App extends React.Component {

  state = {
    user: {
      email: '',
      uid: '',
    },
    store: ''
  };

  unsubscribe = '';

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          var email = user.email;
          var uid = user.uid;
          
          this.setState({
            user: {
              email: email,
              uid: uid
            },
            store: {}
          });
          this.getStoreData();
        } else {
          console.log('no user');
          window.location.href = "http://localhost:3000/login";
        }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getStoreData() {
    var database = firebase.database();
    let userRef = database.ref().child('users').child(this.state.user.uid);

    userRef.on('value', snapShot => {
      this.setState({
        user: this.state.user,
        store: snapShot.val().store
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Página Principal</h1>
        <div>
          <Link to="/login">Fazer Login</Link>
          <p/>
        </div>
        <div>
          <Link to={{
            pathname: "/marcas/cadastro",
              state: {storeUID: this.state.store}
          }}>Cadastrar Marcas</Link>
          <p/>
        </div>
        <div>
          <Link to={{
            pathname: "/marcas",
            state: {storeUID: this.state.store}
          }}>Lista de Marcas</Link>
          <p/>
        </div>
        <div>
          <Link to={{
            pathname: "/produtos/cadastro",
            state: {storeUID: this.state.store}
          }}>Cadastrar Produtos</Link>
          <p/>
        </div>
        <div>
          <Link to={{
            pathname: "/produtos",
            state: {storeUID: this.state.store}
          }}>Lista de Produtos</Link>
        </div>
      </div>
    );
  }
}

export default App;
