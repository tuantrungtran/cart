import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import EmptyCart from '../empty/EmptyCart'
import CartScrollBar from './CartScrollBar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
        const buttonNode = findDOMNode(this.refs.cartButton);
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
    render(){
      let cartItems;
      cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
            <img className="product-image" src={product.image} />
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
            </div>
            <div className="product-total">
                <p className="quantity">{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
                <p className="amount">{product.quantity * product.price}</p>
            </div>
            <a onClick={this.props.removeProduct.bind(this, product.id)} className="product-remove" href="#">×</a>
        </li>
			)
		});
    let view;
    if(cartItems.length <= 0){
      view = <EmptyCart />
		} else{
      view = <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
      transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
        {cartItems}
    </ReactCSSTransitionGroup>
		}
        return(
            <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src="images/logo.jpg" alt="Pizza Brand Logo"/>
                    </div>

                    <div className="search">
                        <a className="mobile-search" href="#" ><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" alt="search"/></a>
                        <form action="#" method="get" className="search-form">
                            <a className="back-button" href="#" ><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png" alt="back"/></a>
                            <input type="search" ref="searchBox" placeholder="Search for Pizza" className="search-keyword" />
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
                            <img className={this.props.cartBounce ? "tada" : "cart-img"} src="images/cart.png" alt="Cart"/>
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
