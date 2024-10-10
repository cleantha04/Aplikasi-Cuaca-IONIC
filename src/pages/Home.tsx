import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './Home.css';

const AplikasiCuaca: React.FC = () => {
  const [city, setCity] = useState<string>('Manado');
  const [weather, setWeather] = useState<any>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string>('');

  const apiKey = 'ad73fbd4d6da5e2cbf23761a1acd976a';

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=id`);
      const data = await response.json();
      setWeather(data);
      setWeatherIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);

      const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`);
      const uvData = await uvResponse.json();
      setUvIndex(uvData.value);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <IonContent>
        <div className="weather-container">
          {weather && (
            <IonCard>
              <IonCardContent>
                <div className="input-container">
                  <IonInput value={city} placeholder="Masukkan nama kota" onIonChange={(e) => setCity(e.detail.value!)} clearInput class="city-input"></IonInput>
                  <IonButton expand="full" onClick={getWeather}>
                    Cari
                  </IonButton>
                </div>
              </IonCardContent>

              <IonCardHeader>
                <IonCardTitle className="city-title">Cuaca Kota {city}</IonCardTitle>
              </IonCardHeader>

              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />

              <IonCardContent>
                <IonCardTitle className="temperature">{Math.round(weather.main.temp)}°C</IonCardTitle>
                <br />
                <h2 className="description">{weather.weather[0].description}</h2>

                <div className="weather-details">
                  <div className="weather-box">
                    <p>Angin</p>
                    <p className="value">{weather.wind.speed} m/s</p>
                  </div>
                  <div className="weather-box">
                    <p>Kelembaban</p>
                    <p className="value">{weather.main.humidity}%</p>
                  </div>
                  <div className="weather-box">
                    <p>Tekanan</p>
                    <p className="value">{weather.main.pressure} hPa</p>
                  </div>
                  <div className="weather-box">
                    <p>Indeks UV</p>
                    <p className="value">{uvIndex !== null ? uvIndex : 'Memuat...'}</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default AplikasiCuaca;
