const parse = require('csv-parse');
const fs = require('fs');
console.log('parse', parse);
const habitablePlanets = [];

function ishabitablePlanets(planets) {
    return planets['koi_disposition'] == 'CONFIRMED' &&
        planets['koi_insol'] > 0.36 && planets['koi_insol'] < 1.11 &&
        planets['koi_prad'] < 1.6;
}
fs.createReadStream('kepler_data.csv')
    .pipe(parse.parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (ishabitablePlanets(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (error) => {
        console.log(error);
    }).on('end', () => {
        console.log(habitablePlanets.map(res => {
            return res['kepler_name'];
        }))
        console.log(`${habitablePlanets.length} habitable Planets found ! ..`);
    })