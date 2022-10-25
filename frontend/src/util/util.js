import { Origin, Horoscope } from "./birthChartJS";

export const getLatLng = async (user) => {
    
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.birthLocation}&key=${process.env.REACT_APP_GEOCODE}`);
    let data = await response.json();

    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    
    user.lat = lat.toString();
    user.lng = lng.toString();

    return user;
}

export const getHoroscope = (user) => {
    const origin = new Origin({
        year: user.birthDateTime.getYear(),
        month: user.birthDateTime.getMonth(),
        date: user.birthDateTime.getDay(), //.getDate() ?
        hour: user.birthDateTime.getHours(),
        minute: user.birthDateTime.getMinutes(),
        latitude: user.lat,
        longitude: user.lng
    })

    const horoscope = new Horoscope({
        origin: origin
    })
    
    const output = {
        sun: horoscope.CelestialBodies.sun,
        rising: horoscope.Ascendant,
        moon: horoscope.CelestialBodies.moon,
        mercury: horoscope.CelestialBodies.mercury,
        venus: horoscope.CelestialBodies.venus,
        mars: horoscope.CelestialBodies.mars,
        jupiter: horoscope.CelestialBodies.jupiter,
        saturn: horoscope.CelestialBodies.saturn,
        uranus: horoscope.CelestialBodies.uranus,
        neptune: horoscope.CelestialBodies.neptune,
        pluto: horoscope.CelestialBodies.pluto,
        chiron: horoscope.CelestialBodies.chiron,
        sirius: horoscope.CelestialBodies.sirius
    }
    // console.log(output);
    return output;

}