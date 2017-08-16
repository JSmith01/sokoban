import React, {Component} from 'react';

const _ = 0
const O = 1;
const M = 5;
const X = 3;
const V = 2;

const map = [
    [_, _, _, _, X, X, _, _, _, _],
    [_, _, X, X, _, _, X, X, _, _],
    [_, _, X, _, _, O, _, X, _, _],
    [_, _, X, _, _, _, O, _, X, _],
    [_, _, X, _, M, O, _, V, X, _],
    [_, _, X, _, _, _, _, V, X, _],
    [_, _, _, X, _, _, _, V, X, _],
    [_, _, _, _, X, X, X, X, X, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
];

const Man = ({x, y}) => (
    <div className="man" style={{ top: y * 5 + 'vh', left: x * 5 + 'vw' }} />
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

        this.state = this.initGame(props.map);
    }

    restartGame() {
        this.setState(this.initGame(this.props.map));
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

        return { x, y, width: map[y].length, height: map.length, map: mapCopy, blocks, moves: 0 };
    }

    checkWin(blocks, map) {
        return blocks.every(b => map[b.y][b.x] === V);
    }

    moveBlock(x, y, dx, dy, state) {
        let next = { x: x + 2 * dx, y: y + 2 * dy };
        if (next.x < 0 || next.y < 0 || next.y > state.map.length - 1 || next.x > state.map[y].length - 1) {
            return state.blocks;
        }
        let moveBlock = { x: x + dx, y: y + dy };
        let blockIdx = state.blocks.findIndex(b => b.x === moveBlock.x && b.y === moveBlock.y);
        if (blockIdx === -1) {
            return state.blocks;
        }
        if (state.map[next.y][next.x] !== X && state.blocks.every(b => b.x !== next.x || b.y !== next.y)) {
            let newBlocks = [...state.blocks];
            newBlocks.splice(blockIdx, 1, next);
            return newBlocks;
        } else {
            return state.blocks;
        }
    }

    handleKeys(e) {
        e.preventDefault();
        if (e.keyCode === 37) {
            this.setState(state => {
                let x = Math.max(state.x - 1, 0);
                if (state.map[state.y][x] !== X) {
                    return { x, moves: state.moves + 1, blocks: this.moveBlock(state.x, state.y, -1, 0, state) };
                }
            });
        }
        if (e.keyCode === 39) {
            this.setState(state => {
                let x = Math.min(state.x + 1, state.width - 1);
                if (state.map[state.y][x] !== X) {
                    return { x, moves: state.moves + 1, blocks: this.moveBlock(state.x, state.y, 1, 0, state) };
                }
            });
        }
        if (e.keyCode === 38) {
            this.setState(state => {
                let y = Math.max(state.y - 1, 0);
                if (state.map[y][state.x] !== X) {
                    return { y, moves: state.moves + 1, blocks: this.moveBlock(state.x, state.y, 0, -1, state) };
                }
            });
        }
        if (e.keyCode === 40) {
            this.setState(state => {
                let y = Math.min(state.y + 1, state.height - 1);
                if (state.map[y][state.x] !== X) {
                    return { y, moves: state.moves + 1, blocks: this.moveBlock(state.x, state.y, 0, 1, state) };
                }
            });
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
                    <Man x={this.state.x} y={this.state.y} />
                    <GameField map={this.state.map} />
                    <Blocks data={this.state.blocks} />
                </div>
                <div className="score">{this.state.moves}</div>
                <div className="victory" style={{ opacity: this.checkWin(this.state.blocks, this.state.map) ? 1 : 0 }}>
                    <h1>Congratulations!</h1>
                    <button onClick={() => this.restartGame()}>Restart Game</button>
                </div>
            </div>
        );
    }
}

const GameScreen = () => (<Game map={map} />);

export default GameScreen;