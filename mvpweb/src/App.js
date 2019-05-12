import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import BrandForm from './BrandForm.js'
import ProductForm from './ProductForm.js'


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      brands: [],
    };

    this.updateBrandList = this.updateBrandList.bind(this);
    this.getMarcas(this.updateBrandList);
  }

  getMarcas(updateFunction) {
    var database = firebase.database();
    let brandsRef = database.ref().child('marcas');

    brandsRef.on('value', function(snapShot) {
      updateFunction(snapShot.val());
    });
  }

  updateBrandList(newBrand) {
    var brands = this.state.brands.slice();
    brands.push(newBrand);
    this.setState({
      brands: brands
    });
  }

  onSubmit = (brandData) => {
    var database = firebase.database();
    var brandRef = database.ref().child('marcas');
    var brandKey = brandRef.push().key;
    var updates = {};

    updates['/marcas/' + brandKey] = brandData;
    firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Cadastro de Marcas!
        </header>
        <BrandForm onSubmit={brandData => this.onSubmit(brandData)}/>
        <p>
          {JSON.stringify(this.state.brands, null, 2)}
        </p>
        <div>
          <ProductForm props={this.state.brands}/>
        </div>
      </div>
    );
  }
}

export default App;
