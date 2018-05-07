import React, { Component } from 'react'
import Counter from './Counter'

class Product extends Component {
  constructor(props){
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)

    this.state = {
      selectedProduct: {},
      quantity: 1
    }
  }

  addToCart(id, image, name, price, quantity) {
    this.setState({
      selectedProduct: {
        image: image,
        name: name,
        price: price,
        id: id,
        quantity: quantity
      }
    },() => {
      this.props.addToCart(this.state.selectedProduct)
    })
  }

  updateQuantity() {
    this.setState(prevState => ({
      quantity: Number(prevState.quantity) + 1
    }))
  }

  render() {
    let { id, image, name, price } = this.props
    let quantity = this.state.quantity
    return(
      <div className="product">
          <div className="product-image">
              <img src={image} alt={name} />
          </div>
          <h4 className="product-name">{name}</h4>
          <p className="product-price">{price}</p>
          <Counter productQuantity={quantity} updateQuantity={this.updateQuantity} />
          <div className="product-action">
              <button onClick={this.addToCart.bind(this, id, image, name, price, quantity)} type="button">{"ADD TO CART"}</button>
          </div>
      </div>
    )
  }
}

export default Product
