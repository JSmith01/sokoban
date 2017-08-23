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

class GameScreen extends Component {
    state = {
        modal: false
    }

    game = null;

    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
        this.gameAction = this.gameAction.bind(this);
    }

    keyHandler(e) {
        let key = e.keyCode;

        if (key === 27) {
            e.preventDefault();
            this.setState(state => ({ modal: !state.modal }));
        }
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

    componentDidMount() {
        document.body.addEventListener('keydown', this.keyHandler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.keyHandler);
    }

    render() {
        let levelId = this.props.match.params.id;
        let levelIndex = levelId ? levels.findIndex(l => l.id === +levelId) : 0;
        if (levelIndex === -1) {
            levelIndex = 0;
        }
        const levelsQty = levels.length;
    
        return (
            <div>
                <Game ref={game => { this.game = game; }}
                      inactive={this.state.modal}
                      level={levels[levelIndex]} 
                      goNextLevel={() => this.props.history.push('/game/' + levels[(levelIndex + 1) % levelsQty].id)} />
                <EscapeScreen onSelect={this.gameAction} visible={this.state.modal} />
            </div>
        );
    }
}

export default withRouter(GameScreen);