const fs = require('fs');
const MAP_EMPTY = 0
const MAP_CRATE = 1;
const MAP_MAN = 5;
const MAP_FENCE = 3;
const MAP_TARGET = 2;
const MAP_OUTLINED = 9;
const cloneDeep = v => typeof v === 'object' && v !== null 
    ? Object.keys(v).reduce((o, n) => { o[n] = cloneDeep(v[n]); return o; }, v instanceof Array ? [] :  Object.create(v.__proto__))
    : v;

if (process.argv.length < 3) {
    console.log('Usage: node levels-convert.js levels.txt [levels.json]');
    return -1;
}

const fileName = process.argv[2];
if (!fs.existsSync(fileName)) {
    console.error('Source file does not exist');
    return -1;
}

const file = fs.readFileSync(fileName, 'utf8');

function processLevel(levelData) {
    let height = levelData.length;
    let width = levelData.reduce((max, l) => (l.length > max ? l.length : max), 0 );
    let map = [];
    let blocks = [];
    let x, y;
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            switch (levelData[i].charAt(j)) {
                case '#':
                    row.push(MAP_FENCE);
                    break;
                case '.':
                    row.push(MAP_TARGET);
                    break;
                case '*':
                    row.push(MAP_TARGET);
                    blocks.push({ x: j, y: i });
                    break;
                case ' ':
                    row.push(MAP_EMPTY);
                    break;
                case '$':
                    row.push(MAP_EMPTY);
                    blocks.push({ x: j, y: i });
                    break;
                case '@':
                    x = j;
                    y = i;
                    row.push(MAP_EMPTY);
                    break;
                case '+':
                    x = j;
                    y = i;
                    row.push(MAP_TARGET);
                    break;
                default:
                    if (j < levelData[i].length) {
                        console.log('Unknown symbol in map - code: ' + levelData[i].charCodeAt(j) +
                            ', position { x: ' + j + ', y: ' + i + ' }');
                        console.log('Line is: ' + levelData[i]);
                    }
                    row.push(MAP_EMPTY);
            }
        }
        map.push(row);
    }

    return { map: getMapWithOutline(map), blocks, height, width, x, y }
}

function addBorderToMap(map) {
    map.forEach(line => {
        line.unshift(MAP_EMPTY);
        line.push(MAP_EMPTY);
    });
    let emptyLine = new Array(map[0].length).fill(MAP_EMPTY);
    map.unshift(emptyLine);
    map.push(emptyLine);
}

function fillOutline(map, x, y) {
    if (map[x][y] === MAP_OUTLINED || map[x][y] !== MAP_EMPTY) {
        return;
    }

    map[x][y] = MAP_OUTLINED;

    if (x > 0) fillOutline(map, x - 1, y);
    if (x < map.length - 1) fillOutline(map, x + 1, y);
    if (y > 0) fillOutline(map, x, y - 1);
    if (y <map[0].length - 1) fillOutline(map, x, y + 1);
}

function removeBorderFromMap(map) {
    map.shift();
    map.pop();

    map.forEach(line => {
        line.shift();
        line.pop();
    });
}

function getMapWithOutline(map) {
    let outline = cloneDeep(map);
    addBorderToMap(outline);
    fillOutline(outline, 0, 0);
    removeBorderFromMap(outline);

    return outline;
}

function getOutline(map) {
    let outline = getMapWithOutline(map);

    for (let i = 0; i < outline.length; i++) {
        for (let j = 0; j < outline[i].length; j++) {
            outline[i][j] = outline[i][j] === MAP_OUTLINED ? MAP_OUTLINED : 0;
        }
    }

    return outline;
}

function parseMap(text) {
    let lines = text.split('\n').map(line => line.trimRight());

    let levels = [];
    let currentLevel = 1;
    let levelData = [];
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line === '') {
            continue;
        }
        if (line.charAt(0) !== ';') {
            levelData.push(line);
        } else {
            levels.push({ id: currentLevel++, name: line.slice(1).trim(), ...processLevel(levelData) });
            levelData = [];
        }
    }

    return levels;
}

const levels = parseMap(file);


let outFileName;
if (process.argv.length >= 4) {
    outFileName = process.argv[3];
} else {
    outFileName = (fileName.slice(-4) === '.txt' ? fileName.slice(0, -4) : fileName) + '.json';
}

fs.writeFileSync(outFileName, JSON.stringify(levels), 'utf8');

console.log('Converted ' + fileName + ' to ' + outFileName + ' successfully');
