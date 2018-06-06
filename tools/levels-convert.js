const fs = require('fs');
const processLevel = require('./transformLevel').processLevel;

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
