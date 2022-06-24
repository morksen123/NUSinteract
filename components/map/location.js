const GOOGLE_API_KEY = 'AIzaSyAv9BiDg9f_Rcjd6SovscJKA8S2A5-JmWs';

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17.5&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

    return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}