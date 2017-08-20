import React, {Component} from 'react';
import Man from './Man';
import { _, O, M, X, V } from '../maps/index';
import levels from '../maps/maps.json';

const Modal = ({ header, children, visible }) => !visible ? null : (
    <div className="modal" style={{ opacity: visible ? 1 : 0 }}>
        {header && <h1>{header}</h1>}
        {children}
    </div>
);

const Cell = ({type}) => {
    let typeClass = '';
    switch (type) {
        case O: typeClass = 'block'; break;
        case X: typeClass = 'fence'; break;
        case V: typeClass = 'place'; break;
        default: typeClass = '';
    }
    return (<div className={"cell " + typeClass} />)
};

const GameField = ({ map }) => {
    let cells = [];
    for (let i = 0; i < map.length; i++) {
        let row = [];
        for (let j = 0; j < map[i].length; j++) {
            row.push(<Cell key={j} type={map[i][j]} />);
        }
        cells.push(<div key={i} className="row">{row}</div>);
    }

    return (<div className="field">{cells}</div>);
};

const Block = ({ x, y }) => (<div className="block" style={{ top: y * 5 + 'vh', left: x * 5 + 'vw' }} />);

const Blocks = ({ data }) => (
    <div className="blocks">
        {data.map((b, i) => <Block key={i} {...b} />)}
    </div>
);

class Game extends Component {
    constructor(props) {
        super(props);
        this.handleKeys = this.handleKeys.bind(this);

        this.state = this.initGameFromLevel(props.level);
    }

    restartGame() {
        this.setState(this.initGameFromLevel(this.props.level));
    }

    initGameFromLevel(level) {
        return {
            x: level.x, 
            y: level.y, 
            width: level.width, 
            height: level.height, 
            map: level.map, 
            blocks: [...level.blocks], 
            moves: 0, 
            direction: 'down'
        };
    }

    initGame(map) {
        let mapCopy = map.map(r => [...r]);
        let y = map.findIndex(r => r.includes(M));
        let x = map[y].indexOf(M);
        mapCopy[y][x] = _;
        let blocks = [];
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === O) {
                    blocks.push({ x: j, y: i });
                    mapCopy[i][j] = _;
                }
            }
        }

        return { x, y, width: map[y].length, height: map.length, map: mapCopy, blocks, moves: 0, direction: 'down' };
    }

    checkWin(blocks, map) {
        return blocks.every(b => map[b.y][b.x] === V);
    }

    cellHasBlock(x, y, blocks) {
        return blocks.some(b => b.x === x && b.y === y);
    }

    canMoveBlock(dx, dy, state) {
        let { x, y } = state;
        if (!this.cellHasBlock(x + dx, y + dy, state.blocks)) {
            // has no block
            return false;
        }

        let next = { x: x + 2 * dx, y: y + 2 * dy };

        if (next.x < 0 || next.y < 0 || next.y > state.map.length - 1 || next.x > state.map[y].length - 1) {
            // near to edge
            return false;
        }

        if (state.map[next.y][next.x] !== X && state.blocks.every(b => b.x !== next.x || b.y !== next.y)) {
            // can move
            return true;
        } else {
            // next position for block is not empty
            return false;
        }
    }

    moveBlock(dx, dy, state) {
        let { x, y } = state;
        let blockIdx = state.blocks.findIndex(b => b.x === x + dx && b.y === y + dy);
        let newBlocks = [...state.blocks];
        newBlocks.splice(blockIdx, 1, { x: x + 2 * dx, y: y + 2 * dy });

        return newBlocks;
    }

    makeMove(dx, dy, state) {
        let { x, y } = state;
        if (x + dx < 0 || y + dy < 0 || y + dy >= state.map.length || x + dx >= state.map[y].length || state.map[y + dy][x + dx] === X) {
            return { x, y };
        }

        if (this.cellHasBlock(x + dx, y + dy, state.blocks)) {
            return this.canMoveBlock(dx, dy, state) ? 
                { x: x + dx, y: y + dy, blocks: this.moveBlock(dx, dy, state), moves: state.moves + 1 } : { x, y };
        } else {
            return  { x: x + dx, y: y + dy, moves: state.moves + 1 };
        }
    }

    handleKeys(e) {
        let key = e.keyCode;
        if (key >= 37 && key <= 40) {
            e.preventDefault();
        }
        switch (key) {
            case 37:
                this.setState(state => ({ ...this.makeMove(-1, 0, state), direction: 'left' }));
                break;
            case 38:
                this.setState(state => ({ ...this.makeMove(0, -1, state), direction: 'up' }));
                break;
            case 39:
                this.setState(state => ({ ...this.makeMove(1, 0, state), direction: 'right' }));
                break;
            case 40:
                this.setState(state => ({ ...this.makeMove(0, 1, state), direction: 'down' }));
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeys);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeys);
    }

    render() {
        return (
            <div>
                <div className="stage">
                    <GameField map={this.state.map} />
                    <Blocks data={this.state.blocks} />
                    <Man x={this.state.x} y={this.state.y} direction={this.state.direction} />
                </div>
                <div className="score">
                    <button style={{ marginRight: '10px' }} onClick={() => this.restartGame()}>Restart Game</button>
                    Moves: {this.state.moves}
                </div>
                <Modal visible={this.checkWin(this.state.blocks, this.state.map)} header="Congratulations!">
                    <button onClick={() => this.restartGame()}>Restart Game</button>
                </Modal>
            </div>
        );
    }
}

const GameScreen = () => (<Game level={levels[0]} />);

export default GameScreen;