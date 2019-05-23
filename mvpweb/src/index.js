import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BrandRegister from './brand/BrandRegister.js';
import ProductRegister from './product/ProductRegister.js';
import ProductList from './product/ProductList.js';
import TagPrintPage from './product/tag/TagPrintPage.js';
import Login from './login/Login.js';

var firebaseConfig = {
    apiKey: "AIzaSyCEj_PrVcaIerFMtxWfVZ7_b2nDIc0K6Mc",
    authDomain: "firereact-4a755.firebaseapp.com",
    databaseURL: "https://firereact-4a755.firebaseio.com",
    projectId: "firereact-4a755",
    storageBucket: "firereact-4a755.appspot.com",
    messagingSenderId: "1033366666298",
    appId: "1:1033366666298:web:f56c01102c9894df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true} component={App} />
			<Route path="/login" component={Login} />
			<Route path="/cadastrar_marca" component={BrandRegister} />
			<Route path="/cadastrar_produto" component={ProductRegister} />
			<Route path="/lista_produtos" component={ProductList} />
			<Route path="/imprimir_produto" component={TagPrintPage} />
		</Switch>
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
