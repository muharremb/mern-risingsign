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
        year: user.birthDate.getYear(),
        month: user.birthDate.getMonth(),
        date: user.birthDate.getDay(), //.getDate() ?
        hour: user.birthDate.getHours(),
        minute: user.birthDate.getMinutes(),
        latitude: user.lat,
        longitude: user.lng
    })

    const horoscope = new Horoscope({
        origin: origin
    })
    
    const output = {
        sun: horoscope.SunSign,
        rising: horoscope.Ascendant.Sign,
        celestialBodies: horoscope.CelestialBodies
    }
    console.log(output);
    debugger;
    return output;

}