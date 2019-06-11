import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';

class App extends React.Component {

  state = {
    user: {
      email: '',
      uid: '',
      name: ''
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
              uid: uid,
              name: this.state.user.name
            },
            store: this.state.store
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
        user: {
          email: this.state.user.email,
          uid: this.state.user.uid,
          name: snapShot.val().name
        },
        store: snapShot.val().store
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Olá {this.state.user.name}</h1>
        <div className="centered">
        <h2>Marcas</h2>
        <div className="row">
          <Link to={{
            pathname: "/marcas/cadastro",
              state: {storeUID: this.state.store}
          }}>Cadastrar Marcas</Link>
          <p/>
        </div>
        <div className="row">
          <Link to={{
            pathname: "/marcas",
            state: {storeUID: this.state.store}
          }}>Lista de Marcas</Link>
        </div>
        <h2>Produtos</h2>
        <div className="row">
          <Link to={{
            pathname: "/produtos/cadastro",
            state: {storeUID: this.state.store}
          }}>Cadastrar Produtos</Link>
        </div>
        <div className="row">
          <Link to={{
            pathname: "/produtos",
            state: {storeUID: this.state.store}
          }}>Lista de Produtos</Link>
        </div>
        <h2>Vendas</h2>
        <div className="row">
          <Link to={{
            pathname: "/produtos/pesquisar",
            state: {storeUID: this.state.store}
          }}>Pesquisar pelo Código</Link>
        </div>
        <div className="row">
          <Link to={{
            pathname: "/vendas",
            state: {storeUID: this.state.store}
          }}>Lista de Vendas</Link>
        </div>
        </div>
        <h3>Sair</h3>
        <div className="row">
          <Link to="/login">Logout</Link>
        </div>
      </div>
    );
  }
}

export default App;
