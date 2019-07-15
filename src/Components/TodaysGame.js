import React, { Component } from 'react'
import axios from 'axios'
import '../Components/TodaysGame.css'

export class TodaysGame extends Component {
    constructor() {
        let today = new Date()
        super() 

        this.state = {
            venueId: 120,
            today: today,
            gameStart: '',
            homeTeam: '',
            awayTeam: '',
            inning: 0,
            topOrBottom: '',
            awayScore: 0,
            homeScore: 0,
            gameStatus: ''
        }
    }
    

    componentDidMount = () => {
        axios({
            method: 'get',
            url: 'https://api.mysportsfeeds.com/v2.1/pull/mlb/current/date/20190715/games.JSON?team=lad',
            auth: {
                username: 'fbd092c8-d4ac-4444-bfea-24b226',
                password: 'MYSPORTSFEEDS'
            }
        }).then(response => {
            console.log('Authenticated')
            const games = response.data.games[0]
            this.setState({
                awayTeam: games.schedule.awayTeam.abbreviation,
                homeTeam: games.schedule.homeTeam.abbreviation,
                gameStart: games.schedule.startTime,
                awayScore: games.score.awayScoreTotal,
                homeScore: games.score.homeScoreTotal,
                inning: games.score.currentInning,
                topOrBottom: games.score.currentInningHalf
            })
            if(games.schedule.playedStatus === "UNPLAYED") {
                this.setState({
                    gameStatus: 'pregame'
                })
            } else if(games.schedule.playedStatus === "LIVE") {
                this.setState({
                    gameStatus: 'live'
                })
            } else {
                this.setState({ 
                    gameStatus: 'final'
                })
            }
        }).catch(error => {
            console.log('Error on Authenication')
            console.log(error)
        })
    }

    render() {
        let body = null
        if(this.state.gameStatus === 'pregame') {
            body = ( 
                <div> 
                <p>Game Starts at {this.state.gameStart}</p>
                </div>
            )
        }
        else if(this.state.gameStatus === 'live') {
            body = ( 
                <div> 
                <p>{this.state.awayTeam} - {this.state.awayScore}</p>
                <p>{this.state.homeTeam} - {this.state.homeScore}</p>
                <p>{this.state.topOrBottom} of the {this.state.inning}</p>
                </div>
            )
        } else if(this.state.gameStatus === 'final') {
            body = ( 
                <div> 
                <p>Final Score</p>
                <p>{this.state.awayTeam} - {this.state.awayScore}</p>
                <p>{this.state.homeTeam} - {this.state.homeScore}</p>
                </div>
            )
        }
    

        return (
           
            <div className='text'> {body}</div>
        )
        
    }


}



export default TodaysGame