import React, { Component } from 'react'

class Cell extends Component {
  render() {
    if (this.props.character === '*') {
      return <i class="far fa-gem" />
    } else {
      return <div>{this.props.character}</div>
    }
  }
}

export default Cell
