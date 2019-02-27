import React, { Component } from 'react'

class Cell extends Component {
  render() {
    let picture = this.props.colValue
    let cellType = 'cell'
    switch (picture) {
      case 'F':
        picture = '🎀'
        break
      case '*':
        picture = '💎'
        break
      case '@':
        picture = '💟'
        break
      case '_':
        picture = ''
        cellType = 'revealed-cell'
        break
      case ' ':
        break
      default:
        cellType = 'revealed-cell'
    }

    if (this.props.colValue !== 'F') {
      return (
        <td
          className={cellType}
          onClick={() =>
            this.props.check(this.props.rowIndex, this.props.colIndex)
          }
          onContextMenu={event =>
            this.props.flag(event, this.props.rowIndex, this.props.colIndex)
          }
        >
          {picture}
        </td>
      )
    } else {
      return (
        <td
          className={cellType}
          onContextMenu={event =>
            this.props.flag(event, this.props.rowIndex, this.props.colIndex)
          }
        >
          {picture}
        </td>
      )
    }
  }
}

export default Cell
