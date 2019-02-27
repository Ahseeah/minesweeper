import React, { Component } from 'react'
import axios from 'axios'
import Cell from './components/Cell'

//const API_URL = `https......`

class App extends Component {
  state = {
    difficulty: 0,
    id: 0,
    game: [[]]
  }
  // updateGame = event => {
  // this.setState{(
  // newGameText: event.target.value
  // )}
  //}
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

  testFn = (x, y) => {
    //add {for event}
    //event.preventDefault()
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        {
          row: x,
          col: y
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board
        })
      })
  }

  setPin = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        {
          row: x,
          col: y,
          id: this.state.id
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board
        })
      })
  }

  //changeDifficulty() {
  // if (event.target.value === 'beginner')
  //this.setState({
  //difficulty: 0
  //})
  //} else if (event.target.value === 'intermediate')
  //this.setState({
  //difficulty: 1
  //})
  //} else if(event.target.value === 'expert')
  //this.setState({
  //difficulty: 2
  //})

  resetGame() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board
        })
      })
  }

  render() {
    return (
      <main>
        <section>
          <h1>⭐️Sailor Moonsweeper🌙</h1>
          <img
            src="http://www.picgifs.com/glitter-gifs/s/sailor-moon/picgifs-sailor-moon-79062.gif"
            id="brooch"
          />
          <select
            onChange={this.changeDifficulty}
            value={this.state.difficulty}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <button className="reset">Reset</button>
        </section>
        <section className="gameBody">
          <table>
            <tbody>
              {this.state.game.map((row, x) => {
                return (
                  <tr key={x}>
                    {row.map((col, y) => {
                      return (
                        <td
                          key={y}
                          onClick={() => this.testFn(x, y)}
                          onContextMenu={() => this.setPin(x, y)}
                          //onChange={this.updatesStateWithNewGame}
                        >
                          <Cell character={col} />
                        </td>
                      )
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
