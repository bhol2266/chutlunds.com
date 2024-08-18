// utils/cookies.js
import { setCookie, destroyCookie, getCookie } from 'cookies-next';

export const getViewTypeFromCookie = () => {
    const viewType = getCookie('viewType');
    return viewType ? viewType : 'grid';       //default is grid 
};


export const setViewTypeCookie = (value) => {
    setCookie('viewType', value, { maxAge: 60 * 60 * 24 * 365 }); // Set cookie with expiry of 7 days
};

export const removeViewTypeCookie = () => {
    destroyCookie('viewType');
};


export const formatDuration = (duration) => {
    const minutes = parseInt(duration.replace('m', ''), 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};


export async function fetchVideos(key) {
    // key is also langugae for country videos
    let url = `https://spankbang.party/s/${key.toLowerCase().trim()}/?o=trending`;
    const rawResponse = await fetch('/api/spangbang/getvideos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });
    const content = await rawResponse.json();
    return (shuffle(content.finalDataArray));
}


export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }