import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)

    this.decrement=this.decrement.bind(this)
    this.increment = this.increment.bind(this)

    this.state = {
      value: this.props.productQuantity
    }
  }

  decrement(e) {
    if(this.state.value <= 1) return this.state.value
    else {
      this.setState(prevState => ({
        value: Number(prevState.value) - 1
      }),() => {
        this.props.updateQuantity(this.state.value)
      })
    }
    e.preventDefault()
  }

  increment(e) {
    this.setState(prevState => ({
      value: Number(prevState.value) + 1
    }),() => {
      this.props.updateQuantity(this.state.value)
    })
    e.preventDefault()
  }

  render() {
    return (
			<div className="stepper-input">
				<a href="#" onClick={this.decrement} className="decrement">–</a>
				<input type="number" value={this.state.value} className="quantity" />
				<a href="#" onClick={this.increment} className="increment">+</a>
			</div>
		)
  }
}

export default Counter
