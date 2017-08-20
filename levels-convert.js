const fs = require('fs');
const MAP_EMPTY = 0
const MAP_CRATE = 1;
const MAP_MAN = 5;
const MAP_FENCE = 3;
const MAP_TARGET = 2;


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
                default:
                    if (j < levelData[i].length) {
                        console.log('Unknown symbol in map - "' + levelData[i].charCodeAt(j) + '", position { x: ' + j + ', y: ' + i + ' }');
                        console.log('Line is: ' + levelData[i]);
                    }
                    row.push(MAP_EMPTY);
            }
        }
        map.push(row);
    }

    return { map, blocks, height, width, x, y }
}

function parseMap(text) {
    let lines = text.split('\n').map(line => line.trim());

    let levels = [];
    let currentLevel = 1;
    let levelData = [];
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i].trimRight();
        if (line.trim() === '') {
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
