import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OlGeolocation from 'ol/Geolocation';
import View from 'ol/View';

const googleKeyID = "";
const combainKeyID = "";
const hereKeyID = "";

const Geolocation = () => {
  useEffect(() => {
    // fetchDataFromGoogleAPI();
    // fetchDataFromCombainAPI();
    fetchDataFromW3cAPI();
    // fetchDataFromOpenLayers();
  }, []);

  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })

  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const fetchDataFromGoogleAPI = () => {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKeyID}`)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDataFromCombainAPI = () => {
    axios.post(`https://cps.combain.com?key==${combainKeyID}`)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDataFromHereAPI = () => {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${hereKeyID}`)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDataFromW3cAPI = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    } else {
      setError('error');
      setLocation({ lat: 0, lon: 0 });
    }
  }

  const view = new View({
    center: [0, 0],
    zoom: 2
  });

  const fetchDataFromOpenLayers = () => {
    var geolocation = new OlGeolocation({
      projection: view.getProjection()
    });
    geolocation.on('change', function(evt) {
      console.log(geolocation.getPosition());
    });
  }

  return (
    <div className="App">
      <h1> Geo location </h1>
      lat: {location.lat} <br />
      lon: {location.lon}
      {error}
    </div>
  );
}

export default Geolocation;
