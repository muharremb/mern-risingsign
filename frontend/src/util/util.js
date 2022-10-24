export const getLatLng = async (user) => {
    const geocoder = new google.maps.Geocoder();
    let res = await geocoder.geocode({
        address: user.birthLocation
    });
    const lat = res.result[0].geometry.location.lat();
    const lng = res.result[0].geometry.location.lng();

    user.lat = lat;
    user.lng = lng;

    return user;
}