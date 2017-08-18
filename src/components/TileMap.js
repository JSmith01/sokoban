import React from 'react';
import map from '../maps/testmap.json';

const tileSet = {
    tilewidth: 32,
    tileheight: 32,
    url: '/i/terrain.png',
    columns: 32
};

const Tile = ({ num, tileSet }) => (
    <div style={{
        display: 'inline-block',
        height: tileSet.tileheight + 'px',
        width: tileSet.tilewidth + 'px',
        backgroundImage: num > 0 ? 'url(' + tileSet.url + ')' : 'none',
        backgroundPosition: num > 0 ? 
                                -tileSet.tilewidth * ((num - 1) % tileSet.columns) + 'px ' +
                                -tileSet.tileheight * (Math.floor((num - 1) / tileSet.columns)) + 'px' : 
                            '0  0'
    }}></div>
);

const TileLayer = ({ tileSet, data, height, width }) => {
    let rows = [];
    for(let i = 0; i < height; i++) {
        let tiles = [];
        for(let j = 0; j < width; j++) {
            tiles.push(<Tile tileSet={tileSet} num={data[i * width + j]} />);
        }
        rows.push(<div className="tile-row" style={{ height: tileSet.tileheight + 'px' }}>{tiles}</div>);
    }

    return <div className="tile-layer">{rows}</div>;
}

const VisibleTileLayers = ({ layers, tileSet }) => (
    <div className="tile-layers">
        {layers
            .filter(l => l.visible && l.type === 'tilelayer')
            .map(l => (<TileLayer tileSet={tileSet} data={l.data} width={l.width} height={l.height} />))
        }
    </div>
);

const TileMap = () => (<VisibleTileLayers layers={map.layers} tileSet={tileSet} />);

export default TileMap;

