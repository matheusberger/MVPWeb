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
import BrandList from './brand/BrandList.js';
import RefSearch from './RefSearch.js'

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
			<Route path="/marcas" exact={true} component={BrandList} />
			<Route path="/marcas/cadastro" component={BrandRegister} />
			<Route path="/produtos" exact={true} component={ProductList} />
			<Route path="/produtos/cadastro" component={ProductRegister} />
			<Route path="/produtos/imprimir" component={TagPrintPage} />
			<Route path="/produtos/pesquisar" component={RefSearch} />
		</Switch>
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
