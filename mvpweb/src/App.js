import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      brands: [],
    };

    this.updateBrandList = this.updateBrandList.bind(this);
  }

  componentDidMount() {
    this.getBrands(this.updateBrandList);
  }

  componentWillUnmount() {
    var database = firebase.database();
    let productRef = database.ref().child('marcas').off();
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

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/cadastrar_marca">Cadastrar Marcas</Link>
          <p>
            {JSON.stringify(this.state.brands, null, 2)}
          </p>
        </div>
        <div>
          <Link to="/cadastrar_produto">Cadastrar Produtos</Link>
          <p>
          </p>
        </div>
        <div>
          <Link to="/lista_produtos">Lista de Produtos</Link>
        </div>
      </div>
    );
  }
}

export default App;
