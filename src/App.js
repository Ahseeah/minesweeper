import React, { Component } from 'react'
import axios from 'axios'
import Cell from './components/Cell'

class App extends Component {
  state = {
    difficulty: 0,
    id: 0,
    game: [[]],
    gameMines: 0,
    gameStatus: ''
  }

  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          gameStatus: resp.data.state
        })
      })
  }

  setGameOption = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          gameStatus: resp.data.state
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
        this.setState(
          {
            game: resp.data.board,
            gameStatus: resp.data.state
            //gameMines: resp.data.mines
          },
          () => {
            if (this.state.gameState === 'won') {
              this.setState({ announcement: 'You Won ✨' })
            } else if (this.state.gameState === 'lost') {
              this.setState({ announcement: 'You Lost ❌' })
            }
          }
        )
      })
  }

  setFlag = (event, x, y) => {
    event.preventDefault()
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        { id: this.state.gameID, row: x, col: y }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board,
          gameState: resp.data.state,
          gameMines: resp.data.mines
        })
      })
  }

  changeDifficulty = event => {
    console.log(event.target.value)
    this.setState({
      difficulty: event.target.value
    })
  }

  resetGame() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          gameStatus: resp.data.state
        })
      })
  }

  render() {
    return (
      <main>
        <section>
          <h1>⭐️Sailor Moonsweeper🌙</h1>
          <section className="results">
            <h2>{this.state.gameStatus}</h2>
          </section>
          <img
            src="http://www.picgifs.com/glitter-gifs/s/sailor-moon/picgifs-sailor-moon-79062.gif"
            id="brooch"
          />
          <button className="difficulty" onClick={() => this.setGameOption()}>
            Change Difficulty
          </button>

          <select
            onChange={this.changeDifficulty}
            value={this.state.difficulty}
          >
            <option value="0">Beginner</option>
            <option value="1">Intermediate</option>
            <option value="2">Expert</option>
          </select>
          <button className="reset" onClick={() => this.resetGame()}>
            Reset
          </button>
        </section>
        <section className="gameBody">
          <table>
            <tbody>
              {this.state.game.map((row, x) => {
                return (
                  <tr key={x}>
                    {row.map((col, y) => {
                      return (
                        <Cell
                          character={col}
                          key={y}
                          rowIndex={x}
                          rowValue={row}
                          colIndex={y}
                          colValue={col}
                          check={this.testFn}
                          flag={this.setFlag}
                          //key={y}
                          //onClick={() => this.testFn(x, y)}
                          //onContextMenu={() => this.setPin(x, y)}
                          //onChange={this.updatesStateWithNewGame}
                        />
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
