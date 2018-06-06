const util = require('util');
const fs = require('fs');

const rp = require('request-promise');
const { parseString } = require('xml2js');

const parseXml = util.promisify(parseString);

rp('http://dir.xiph.org/yp.xml').then(parseXml)
	.then(o => {
        const genres = [];
        let lastGenreId = 1;
        const radios = {};
        let lastRadioId = 1;

        let unsortedGenre = { id: lastGenreId++, name: 'unsorted', stations: [] };
        genres.push(unsortedGenre);

        o.directory.entry.forEach(s => {
        	if (s.server_type[0] !== 'audio/mpeg') {
        		return;
			}

            let stationId = lastRadioId++;

            radios[stationId] = {
                id: stationId,
                name: s.server_name[0],
                url: s.listen_url[0],
                genre: s.genre[0].trim()
            };

            let stationGenres = s.genre[0].trim().split(' ');
            stationGenres.forEach(genreName => {
                let genre = genres.find(gn => gn.name === genreName);
                if (!genre) {
                    genre = { id: lastGenreId++, name: genreName, stations: [stationId] };
                    genres.push(genre);
                } else {
                    genre.stations.push(stationId);
                }
            });
        });

        // remove every genre that has 1 or 2 stations
        let genresToRemove = [];
        genres.filter(g => g.name !== 'unsorted' && g.stations.length <= 2).forEach(
            g => {
                unsortedGenre.stations = unsortedGenre.stations.concat(g.stations);
                genresToRemove.push(g.id);
            }
        );
        genresToRemove.forEach(gtr => genres.splice(genres.findIndex(g => g.id === gtr), 1));

        genres.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

        fs.writeFileSync('radios.json', JSON.stringify(radios), 'utf8');
        fs.writeFileSync('genres.json', JSON.stringify(genres), 'utf8');

        console.log('Got total ' + o.directory.entry.length + ' records, and totally ' + (lastRadioId - 1) + ' stations in ' +
            genres.length + ' genres');
    });
