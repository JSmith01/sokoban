const tmxHeader = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" tiledversion="1.1.5" orientation="orthogonal" renderorder="right-down" width="22" height="19" tilewidth="32" tileheight="32" infinite="0" nextobjectid="1">
 <tileset firstgid="1" name="main" tilewidth="32" tileheight="32" tilecount="1024" columns="32">
  <image source="public/i/terrain.png" width="1024" height="1024"/>
 </tileset>\n`;
const tmxFooter = `\n</map>`;

function createLayer(name, width, height, content) {
    const layerHeader = `<layer name="${ name }" width="${ width }" height="${ height }">\n    <data encoding="csv">\n`;
    const layerFooter = `\n    </data>
</layer>`;

    return layerHeader + content.map(row => row.join(', ')).join(', \n') + layerFooter;
}

const MAP_EMPTY = 0
const MAP_CRATE = 1;
const MAP_MAN = 5;
const MAP_FENCE = 3;
const MAP_TARGET = 2;
const MAP_OUTLINED = 9;

const $ = 999;
const WALL_MAPPING = [
    {
        pattern: [
                $, 0, 0,
                0, 1, 1,
                0, 1, $,
        ],
        tile: 860 // top left
    },
    {
        pattern: [
                0, 0, $,
                1, 1, 0,
                $, 1, 0,
        ],
        tile: 861 // top right
    },
    {
        pattern: [
                0, 1, $,
                0, 1, 1,
                $, 0, 0,
        ],
        tile: 924 // bottom left
    },
    {
        pattern: [
                $, 1, 0,
                1, 1, 0,
                0, 0, $,
        ],
        tile: 925 // bottom right
    },
    {
        pattern: [
                $, 0, $,
                1, 1, 1,
                $, 0, $,
        ],
        tile: 854 // horizontal line
    },
    {
        pattern: [
                $, 0, $,
                1, 1, 0,
                $, 0, $,
        ],
        tile: 856 // horizontal line right end
    },
    {
        pattern: [
                $, 0, $,
                0, 1, 1,
                $, 0, $,
        ],
        tile: 857 // horizontal line left end
    },
    {
        pattern: [
                0, $, 0,
                0, 1, 0,
                $, 1, $,
        ],
        tile: 892 // vertical line
    },
    {
        pattern: [
                $, 1, $,
                0, 1, 0,
                0, $, 0,
        ],
        tile: 892 // vertical line
    },
    {
        pattern: [
                0, 0, 0,
                0, 1, 0,
                0, 0, 0,
        ],
        tile: 827 // single item
    },
];

const DEFAULT_FENCE_TILE = 854;

function getCellWithSurroundings(map, x, y) {
    return [
        map[x - 1][y - 1] || 0,
        map[x    ][y - 1] || 0,
        map[x + 1][y - 1] || 0,
        map[x - 1][y    ] || 0,
        map[x    ][y    ] || 0,
        map[x + 1][y    ] || 0,
        map[x - 1][y + 1] || 0,
        map[x    ][y + 1] || 0,
        map[x + 1][y + 1] || 0,
    ].map(v => v === MAP_FENCE ? 1 : 0);
}

function compareWithPattern(pattern, cells) {
    return !(pattern.length !== cells.length || pattern.some((p, i) => p !== $ && p === cells[i]));
}

function transformFenceToTile(map, x, y) {
    let cells = getCellWithSurroundings(map, x, y);
    let fenceTile = WALL_MAPPING.find(mapping => compareWithPattern(cells, mapping.pattern));
    
    return (fenceTile || {}).tile || DEFAULT_FENCE_TILE;
}

function generateTmx(map) {
    let width = map[0].length;
    let height = map.length;
    let fences = map.map(
        (row, x) => row.map(
            (cell, y) => cell === MAP_FENCE ? transformFenceToTile(map, x, y) : 0
        )
    );

    return tmxHeader + createLayer('fences', width, height, fences) + tmxFooter;
}

exports.generateTmx = generateTmx;