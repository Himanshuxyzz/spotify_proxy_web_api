const axios = require("axios");
const querystring = require("querystring");

let cacheData;
let cacheTime;

const getAccessToken = async () => {
  const basic = new Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString("base64");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (cacheData && cacheTime <= Date.now() - 3900 * 1000) {
    return cacheData;
  }

  try {
    const response = await axios(
      `https://accounts.spotify.com/api/token?${querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.REFRESH_TOKEN,
      })}`,
      options
    ).then((data) => data.data);
    cacheData = response;
    cacheTime = Date.now();
    return response;
  } catch (err) {
    console.log(err.status);
  }
};

const getCurrentPlaying = async () => {
  const { access_token } = await getAccessToken();
  // console.log("getcurrentplaying:", access_token);

  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios(
      process.env.CURRENTLY_PLAYING_TRACK_ENDPOINT,
      options
    );
    return response.data;
  } catch (err) {
    console.log(err.response.statusText);
  }
};

const getCurrentPlayingItem = async () => {
  const song = await getCurrentPlaying();
  // console.log(song);
  const albumImg = song?.item?.album?.images[0]?.url;
  const artist = song?.item?.artists?.map((artist) => artist?.name).join(",");
  const songName = song?.item?.name;
  const isPlaying = song?.is_playing;
  const trackType = song?.currently_playing_type;
  const songUri = song?.item?.external_urls?.spotify;
  const duration_ms = song?.item?.duration_ms;

  return {
    isPlaying,
    songName,
    artist,
    albumImg,
    trackType,
    songUri,
    duration_ms,
  };
};

const getUserTopTracks = async () => {
  const { access_token } = await getAccessToken();
  // console.log("getusertoptracks:", access_token);

  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios(process.env.GET_TOP_TRACKS_ENDPOINT, options);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.statusText);
  }
};

module.exports = {
  getCurrentPlayingItem,
  getUserTopTracks,
};
