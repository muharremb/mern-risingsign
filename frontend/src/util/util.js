export const getLatLng = async (user) => {
    
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.birthLocation}&key=${process.env.REACT_APP_GEOCODE}`);
    let data = await response.json();

    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    
    user.lat = lat.toString();
    user.lng = lng.toString();

    return user;
}