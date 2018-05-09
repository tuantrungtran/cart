import React, { Component } from 'react'
import Product from './Product'
import NoResult from '../empty/NoResult'

class Products extends Component {
  // constructor(props){
  //   super(props)
  // }

  render() {
    let productsData
  	let searchKey = this.props.searchProduct

    function searchFor(search){
      return s => {
        return s.name.toLowerCase().includes(search.toLowerCase())
      }
    }

    productsData = this.props.productsList.filter(searchFor(searchKey)).map(product => {
			return(
						<Product key={product.id} price={product.price} name={product.name} image={product.image}
              id={product.id} productQuantity={product.quantity} addToCart={this.props.addToCart}
            />
				)
			}
		)
    let view;

		if(productsData.length <= 0){
			view = <NoResult />
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
