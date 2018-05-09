import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import EmptyCart from '../empty/EmptyCart'
import CartScrollBar from './CartScrollBar'

class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            showCart: false,
            cart: this.props.cartItems,
        };
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }

    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        }
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    decrement(id) {
      let cartItem = this.state.cart
      let index = cartItem.findIndex((x => x.id === id))
      cartItem[index].quantity -= 1
      if(cartItem[index].quantity <= 1) cartItem[index].quantity = 1
      this.setState(prevState => ({
        cart: cartItem
      }), () => {
        this.props.updateQuantity(this.state.cart)
      })
    }

    increment(id) {
      let cartItem = this.state.cart
      let index = cartItem.findIndex((x => x.id === id))
      cartItem[index].quantity += 1
      this.setState(prevState => ({
        cart: cartItem
      }), () => {
        this.props.updateQuantity(this.state.cart)
      })
    }

    inputQty(e, id) {
      let cartItem = this.state.cart
      let index = cartItem.findIndex((x => x.id === id))
      cartItem[index].quantity = Number(e.target.value)
      this.setState({
        cart: cartItem
      }, () => {
        this.props.updateQuantity(this.state.cart)
      })
    }

    render(){
      let cartItems;
      cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
            <img className="product-image" src={product.image} alt="" />
            <div className="product-info">
                <p className="product-name">{product.name}</p>
            </div>
            <div className="product-total">
                <p className="product-price">$ {product.price}</p>
                <p className="amount">{product.quantity * product.price}</p>
            </div>
            <div className="stepper-input">
      				<a href="#" onClick={this.decrement.bind(this, product.id)} className="decrement">–</a>
      				<input type="number" value={product.quantity} onChange={(e) => this.inputQty(e, product.id)} className="quantity" />
      				<a href="#" onClick={this.increment.bind(this,product.id)} className="increment">+</a>
      			</div>
            <a onClick={this.props.removeProduct.bind(this, product.id)} className="product-remove" href="">×</a>
        </li>
			)
		});
    let view;
    if(cartItems.length <= 0){
      view = <EmptyCart />
    } else{
        view = <div>{cartItems}</div>
    }
    return(
        <header>
            <div className="container">
                <div className="brand">
                    <img className="logo" src="images/logo.jpg" alt="Pizza Brand Logo"/>
                </div>

                <div className="search">
                    <form action="#" method="get" className="search-form">
                          <input type="search" ref="searchBox" placeholder="Search for Pizza"
                            onChange={this.props.handleSearch} className="search-keyword" />
                          <button className="search-button" type="submit"></button>
                    </form>
                </div>

                <div className="cart">
                    <div className="cart-info">
                        <table>
                            <tbody>
                                <tr>
                                    <td>No. of items</td>
                                    <td>:</td>
                                    <td><strong>{this.props.totalItems}</strong></td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>:</td>
                                    <td><strong>$ {this.props.totalAmount}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                        <img className={this.props.cartBounce ? " " : "cart-img"} src="images/cart.png" alt="Cart"/>
                        {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                    </a>
                    <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                        <CartScrollBar>
                          {view}
                        </CartScrollBar>
                        <div className="action-block">
                            <button type="button" className={this.state.cart.length > 0 ? " " : "disabled"}>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
  }
}

export default Header;
