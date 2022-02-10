import React, { Component } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import LetterDisplay from './components/letter-display';
import KeyInput from './components/key-input';
import {possibleWords} from './utils/possibileWords'
import {dayOfYear} from './utils/dayOfYear'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      word: possibleWords[dayOfYear(new Date())],
      onWord: 1,
      words: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
      },
      completed: localStorage.getItem('nordle_completed'),
      timeLeft: '',
    }
    // Binding input with the child prop
    this.handleInput=this.handleInput.bind(this)
  }

  componentDidMount = () => {
    // Checks if completed popup should show
    if (this.state.completed === 'true') {
      this.timeTill();
      // Removes the popup if its the next day
      if (localStorage.getItem('nordle_dayCompleted') !== `${dayOfYear(new Date())}`) {
        this.setState({completed: false})
        localStorage.removeItem('nordle_completed')
      }
    }
  }
  // Countdown until 12am
  timeTill() {
    let timeLeft = ""
    let start = new Date();
    start.setHours(23, 59, 59);

    function pad(num) {
      return ("0" + parseInt(num)).substr(-2);
    }

    function tick() {
      let now = new Date();
      if (now > start) {
        start.setDate(start.getDate() + 1)
      }
      let remain = ((start - now) / 1000)
      let hh = pad((remain / 60 / 60) % 60)
      let mm = pad((remain / 60) % 60)
      let ss = pad(remain % 60)
      timeLeft = hh + ":" + mm + ":" + ss
      setTimeout(tick, 1000)
    }
    tick()
    this.setState({timeLeft})
  }

  handleInput(e){
    let {words, word, onWord} = this.state
    let resultsArr = []
    // Enter functionality
    if (e === "<" && words[onWord].length >= 5) {
      let sep = words[onWord]
      // Puts correct or incorrect letters into resultsArr
      sep.forEach((e, index) => {
        resultsArr.push({
          letter: e.letter,
          position: index,
          color: word.indexOf(e.letter) === index ? 'lightGreen' :
          word.indexOf(e.letter) < 0 ? 'lightGray' : 'yellow'
        })
      })
      this.setState({
        words: {
          ...words,
          [onWord]: resultsArr
        }
      })
      // If the words match then starts the complete functionality
      if (words[onWord].map(u => u.letter).join('') === word) {
        this.setState({completed: 'true'})
        this.timeTill()
        localStorage.setItem('nordle_completed', true)
        localStorage.setItem('nordle_timesCompleted', 
        localStorage.getItem('nordle_timesCompleted') ? 
        parseInt(localStorage.getItem('nordle_timesCompleted')) + 1: 1)
        localStorage.setItem('nordle_lastAttempt', onWord)
        localStorage.setItem('nordle_dayCompleted', dayOfYear(new Date()))
      }
      this.setState({onWord: onWord + 1})
    // Delete key functionality
    } else if (e === "del") {
      console.log(words[onWord])
      this.setState({
        words: {
          ...words,
          [onWord]: words[onWord].slice(0,-1)
        }
      })
    // Key pressed functionality
    } else if (words[onWord].length < 5 && e !== "<" && e !== "del") {
      this.setState({
        words: {
          ...words,
          [onWord]: [...words[onWord], {
            letter: e
          }]
        }
      })
    }
  }
  

  render() {
    return (
      <div style={{
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto'
        }}>
        <Box sx={{ 
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 32,
          letterSpacing: 6,
          color: '#3A3B3C'
  
        }}>
          Nordle
        </Box>
        <LetterDisplay words={this.state.words}/>
        <KeyInput getInput={this.handleInput}/>
        <Modal
          open={this.state.completed === 'true'}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            backgroundColor: 'white',
            maxWidth: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 5,
            textAlign: 'center',
            borderRadius: 2,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              COMPLETED!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You completed this Nordle in {this.state.onWord === 1 ? 
              localStorage.getItem('nordle_lastAttempt') : 
              this.state.onWord - 1}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              You've completed {localStorage.getItem('nordle_timesCompleted')} Nordle(s)
            </Typography>
            <Typography id="modal-modal-description" variant="h9" component="h3" sx={{ mt: 4 }}>
              Next Nordle: {this.state.timeLeft}
            </Typography>
          </Box>
        </Modal>
      </div>
    ); 
  }
}
