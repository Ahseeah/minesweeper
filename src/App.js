import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    id: 0,
    game: [[]]
  }

  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board
        })
      })
  }

  testFn() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        row: 0,
        column: 0
      })
      .then(resp => {
        this.setState({
          game: resp.data.board
        })
      })
  }

  render() {
    return (
      <main>
        <section>
          <h1>⭐️Sailor 🎀 Moonsweeper🌙</h1>
          <img
            src="http://www.picgifs.com/glitter-gifs/s/sailor-moon/picgifs-sailor-moon-79062.gif"
            id="brooch"
          />
          <select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <button className="reset">Reset</button>
        </section>
        <section className="gameBody">
          <table>
            <tbody>
              {this.state.game.map(row => {
                return (
                  <tr>
                    {row.map(col => {
                      // Put an onClick{} event on td for functionality.
                      return <td onClick={this.testFn}>{col}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>
    )
  }
}

export default App
