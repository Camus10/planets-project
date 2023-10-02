const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

// finding habitable planets
function isHabitablePlanet(planet){
  return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')  // is source
  .pipe(parse({
    comment: '#',
    columns: true
  }))  // is destination
  .on('data', (data) => {
    if(isHabitablePlanet(data)){
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => {
      return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });