const GOOGLE_API_KEY = 'AIzaSyAv9BiDg9f_Rcjd6SovscJKA8S2A5-JmWs';

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17.5&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

    return imagePreviewUrl;
}