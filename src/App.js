import React, { Component } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Products from './components/Products'
import rafSchedule from 'raf-schd'
import './scss/style.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.checkProduct = this.checkProduct.bind(this)
    this.sumTotalItems = this.sumTotalItems.bind(this)
    this.sumTotalAmount = this.sumTotalAmount.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

    this.state = {
      products: [],
      cart: [],
      quantity: 1,
      totalItems: 0,
      totalAmount: 0,
      keySearch: ''
    }
  }

  getProducts() {
    const url = "products.json"
    axios.get(url)
			.then(response => {
				this.setState({
					products : response.data
				})
			})
  }

  componentWillMount(){
		this.getProducts();
	}

  handleAddToCart(selectedProduct) {
    let cartItem = this.state.cart
    let productID = selectedProduct.id
    let productQty = selectedProduct.quantity

    if(this.checkProduct(productID)) {
      let index = cartItem.findIndex((x => x.id === productID))
      cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty)
    }else
      cartItem.push(selectedProduct)

    this.setState({
      cart: cartItem
    },() => {
      this.sumTotalItems()
      this.sumTotalAmount()
    })
  }

  sumTotalAmount() {
    let total = 0
    let cart = this.state.cart
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * Number(cart[i].quantity)
    }

    this.setState({
      totalAmount: total
    })
  }

  sumTotalItems() {
    let total = this.state.cart.length || 0
    this.setState({
      totalItems: total
    })
  }

  checkProduct(productID) {
    let cart = this.state.cart
    return cart.some(item => {
      return item['id'] === productID
    })
  }

  updateQuantity(cart) {
    this.setState(prevState => ({
      cart: cart
    }), () => {
      this.sumTotalItems()
      this.sumTotalAmount()
    })
  }

  handleRemoveProduct(id, e) {
    let cart = this.state.cart
    let index = cart.findIndex(( x => x.id === id))
    cart.splice(index, 1)
    this.setState({
      cart: cart
    })

    this.sumTotalItems()
    this.sumTotalAmount()

    e.preventDefault()
  }

  handleSearch(e) {
    this.setState({
      keySearch: e.target.value
    })
  }

  render() {
    return(
      <div>
        <Header
          cartItems={this.state.cart}
          totalItems={this.state.totalItems}
          totalAmount={this.state.totalAmount}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          updateQuantity={this.updateQuantity}
        />
        <Products
          productsList={this.state.products}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          searchProduct={this.state.keySearch}
        />
      </div>
    )
  }
}

export default App
