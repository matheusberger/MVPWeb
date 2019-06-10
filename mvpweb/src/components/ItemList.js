import React from 'react'

class ItemList extends React.Component {
	render() {
		var list = _.map(this.props.tabs, (tab, index) => {
		  	return (
		  		<div key={index+tab} className="row">
		  			<div className="brandColumn">
		  				<label>{this.pros.items[index][tab]}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.email}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.phone}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>R${brand.rent}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.percentage}%</label>
		  			</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				<h1> Marcas </h1>
				<div className="row">
					<div className="brandColumn">
						<h2>Nome</h2>
					</div>
					<div className="brandColumn">
						<h2>Email</h2>
					</div>
					<div className="brandColumn">
						<h2>Telefone</h2>
					</div>
					<div className="brandColumn">
						<h2>Aluguel</h2>
					</div>
					<div className="brandColumn">
						<h2>Porcentagem</h2>
					</div>
				</div>
				{brands}
			</div>
		);
	}
}