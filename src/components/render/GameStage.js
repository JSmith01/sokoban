import React from 'react';
import GameField from './GameField';
import Blocks from './Blocks';
import Man from './Man';

const GameStage = ({ map, blocks, manX, manY, manDirection }) => (
    <div className="stage">
        <GameField map={map} />
        <Blocks data={blocks} map={map} />
        <Man x={manX} y={manY} direction={manDirection} />
    </div>
);

export default GameStage;