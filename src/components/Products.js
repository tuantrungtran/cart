import React, { Component } from 'react'
import Product from './Product'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Products extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let productsData
  	let term = this.props.searchTerm
  	let x
    productsData = this.props.productsList.map(product => {
			return(
						<Product key={product.id} price={product.price} name={product.name} image={product.image}
              id={product.id} productQuantity={product.quantity} addToCart={this.props.addToCart}
            />
				)
			}
		)
    let view;
		if(productsData.length <= 0 && !term){
			view = `Loading...`
		} else if(productsData.length <= 0 && term){
			view = `Not found`
		} else{
			view = productsData
		}
		return(
			<div className="products-wrapper">
        <div className="products">
			    {view}
        </div>
			</div>
		)
  }
}

export default Products
