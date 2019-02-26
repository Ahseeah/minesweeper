import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    game: [[]]
  }

  componentDidMount() {
    axios
      .get('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
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
          <h1>⭐️Sailor 🎀 Moonswiper🌙</h1>
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
                      return <td>{col}</td>
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
