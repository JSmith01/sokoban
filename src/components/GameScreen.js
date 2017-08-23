import React, { Component } from 'react';
import levels from '../maps/maps.json';
import Menu from './Menu';
import Game, { Modal } from './Game';
import {withRouter} from 'react-router-dom';

const EscapeScreen = ({ visible, onSelect }) => (
    <Modal header="Game menu" visible={visible}>
        <Menu onSelect={onSelect} inactive={!visible}>
            <span>Back to the game</span>
            <span>Restart level</span>
            <span>Exit to the main screen</span>
            <span>Exit game</span>
        </Menu>
    </Modal>
);

const VictoryScreen = ({ visible, onSelect, moves }) => (
    <Modal header="Congratulations!" visible={visible}>
        <h3>You've made {moves} moves to solve this level.</h3>
        <Menu onSelect={onSelect} inactive={!visible}>
            <span>Continue to the next level</span>
            <span>Restart level</span>
            <span>Exit to the main screen</span>
            <span>Exit game</span>
        </Menu>
    </Modal>
);

class GameScreen extends Component {
    state = {
        modal: false,
        won: false,
        moves: 0,
    }

    game = null;

    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
        this.gameAction = this.gameAction.bind(this);
        this.onWin = this.onWin.bind(this);
    }

    keyHandler(e) {
        let key = e.keyCode;

        if (key === 27) {
            e.preventDefault();
            if (this.state.won) {
                this.goToNextLevel();
            } else {
                this.setState(state => ({ modal: !state.modal }));                
            }
        }
    }

    goToNextLevel() {
        this.props.history.push('/game/' + this.getNextLevelId(this.props.match.params.id));
        this.setState({ won: false, moves: 0 });
    }

    gameAction(pos) {
        switch(pos) {
            case 1:
                if (this.game) {
                    this.setState({ modal: false });
                    this.game.restartGame();
                }
                break;
            case 2: // to main screen
                this.props.history.push('/');
                break;
            case 3: // exit game
                break;
            default: // back to game
                this.setState({ modal: false });
        }
    }

    victoryAction(pos) {
        switch(pos) {
            case 1:
                if (this.game) {
                    this.setState({ won: false, moves: 0 });
                    this.game.restartGame();
                }
                break;
            case 2: // to main screen
                this.props.history.push('/');
                break;
            case 3: // exit game
                break;
            default: // back to game
                this.goToNextLevel();
            }
    }


    componentDidMount() {
        document.body.addEventListener('keydown', this.keyHandler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.keyHandler);
    }

    onWin(moves) {
        this.setState({ won: true, moves });
    }

    getLevelIdx(levelId) {
        let levelIndex = levelId ? levels.findIndex(l => l.id === +levelId) : 0;
        if (levelIndex === -1) {
            levelIndex = 0;
        }

        return levelIndex;
    }

    getNextLevelId(levelId) {
        return levels[(this.getLevelIdx(levelId) + 1) % levels.length].id;
    }

    render() {
        let level = levels[this.getLevelIdx(this.props.match.params.id)];
    
        return (
            <div>
                <Game ref={game => { this.game = game; }}
                      inactive={this.state.modal || this.state.won}
                      level={level} 
                      onWin={this.onWin} />
                <EscapeScreen onSelect={this.gameAction} visible={this.state.modal && !this.state.won} />
                <VictoryScreen onSelect={this.victoryAction} visible={this.state.won} moves={this.state.moves} />
            </div>
        );
    }
}

export default withRouter(GameScreen);