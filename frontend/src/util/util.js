// TODO find geocode module

export const getLatLng = async (user) => {
    
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.birthLocation}&key=${'Geocode Key Here'}`);
    let data = await response.json();

    // let res = await geocoder.geocode({
    //     address: user.birthLocation
    // });
    debugger;
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    
    user.lat = lat.toString();
    user.lng = lng.toString();
    // console.log('user in getLatLng ', user);
    return user;
}