import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import BrandForm from './BrandForm.js';
import ProductForm from './ProductForm.js';
import _ from 'lodash';
import PrintableTagList from './Tag.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      brands: [],
      products: [],
    };

    this.updateBrandList = this.updateBrandList.bind(this);
    this.updateProductList = this.updateProductList.bind(this);

    this.getBrands(this.updateBrandList);
    this.getProducts(this.updateProductList);
  }

  getBrands(updateFunction) {
    var database = firebase.database();
    let brandsRef = database.ref().child('marcas');

    brandsRef.on('child_added', function(snapShot) {
        updateFunction(snapShot.val(), snapShot.key);
    });
  }

  updateBrandList = (newBrand, key) => {
    var brands = this.state.brands.slice();
    newBrand.key = key;
    brands.push(newBrand);
    this.setState({
      brands: brands,
      products: this.state.products
    });
  }

  onBrandSubmit = (brandData) => {
    var database = firebase.database();
    var brandRef = database.ref().child('marcas');
    var brandKey = brandRef.push().key;
    var updates = {};

    this.formatBrand(brandData);

    updates['/marcas/' + brandKey] = brandData;
    firebase.database().ref().update(updates);
  }

  onProductSubmit = (productData) => {
    var database = firebase.database();
    var productRef = database.ref().child('produtos');
    var produtcKey = productRef.push().key;
    var updates = {};

    this.formatProduct(productData);
    
    updates['/produtos/' + produtcKey] = productData;
    firebase.database().ref().update(updates);
  }

  formatBrand(brand) {
    brand.rent = parseInt(brand.rent);
    brand.percentage = parseInt(brand.percentage);
  }

  formatProduct(product) {
    let stock = product.stock.slice();
    var formatedStock = {};
    stock.forEach( (item, index) => {
      formatedStock[item.name] = parseInt(item.amount);
    });

    product.stock = formatedStock;
    product.price = parseInt(product.price);
  }

  getProducts(updateFunction) {
    var database = firebase.database();
    let productRef = database.ref().child('produtos');

    productRef.on('child_added', function(snapShot) {
      updateFunction(snapShot.val(), snapShot.key);
    });
  }

  updateProductList = (newProduct, key) => {
    var products = this.state.products.slice();
    newProduct.key = key;
    products.push(newProduct);
    this.setState({
      brands: this.state.brands,
      products: products
    });
  }

  render() {
    var tags = _.map(this.state.products, (product, index) => {
      return <PrintableTagList key={index} product={product}/>
    });
    return (
      <div className="App">
        <div>
          <BrandForm onSubmit={brandData => this.onBrandSubmit(brandData)}/>
          <p>
            {JSON.stringify(this.state.brands, null, 2)}
          </p>
        </div>
        <div>
          <ProductForm onSubmit={productData => this.onProductSubmit(productData)} />
          <p>
            {JSON.stringify(this.state.products, null, 2)}
          </p>
        </div>
        {tags}
      </div>
    );
  }
}

export default App;
