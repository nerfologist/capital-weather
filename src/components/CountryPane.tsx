import { useQuery as useApolloQuery } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
import { GET_COUNTRY } from "../graphql/queries";

const fetchWeather = (city: string, countryCode: string) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
  ).then((res) => res.json());
};

const toFahrenheit = (tKelvin: number) => {
  return toCelsius(tKelvin) * 1.8 + 32;
};

const toCelsius = (tKelvin: number) => {
  return tKelvin - 273.15;
};

const CountryPane = ({ countryCode }: { countryCode?: string }) => {
  const {
    loading: isCountryLoading,
    error: countryError,
    data: countryData,
  } = useApolloQuery(GET_COUNTRY, {
    variables: { countryCode },
  });

  const {
    isPending: isWeatherLoading,
    error: weatherError,
    data: weatherData,
  } = useQuery({
    queryKey: [
      "weather-for-capital-",
      countryData?.country.capital,
      countryCode,
    ],
    queryFn: ({ queryKey }) => fetchWeather(queryKey[1], queryKey[2]),
    enabled: Boolean(countryData?.country.capital),
  });

  if (isCountryLoading || isWeatherLoading) return <p>Loading...</p>;
  if (countryError || weatherError)
    return <p>Error: {countryError?.message || weatherError?.message}</p>;

  const { capital, emoji, name } = countryData.country;
  const { coord, main, weather } = weatherData;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {emoji} {name} ({countryCode})
        </h2>
        <p>The country's capital is {capital}</p>
        <ul>
          <li>
            📍 <strong>Latitude</strong>: {coord.lat},{" "}
            <strong>Longitude</strong>: {coord.lon}
          </li>
        </ul>
        <p>Its weather is:</p>
        <ul>
          <li>
            <strong>🌤️ Weather</strong>: {weather[0].main} (
            {weather[0].description})
          </li>
          <li>
            <strong>🌡️ Temperature</strong>:{" "}
            {toFahrenheit(main.temp).toFixed(2)}°F (
            {toCelsius(main.temp).toFixed(2)}°C)
          </li>
          <li>
            <strong>💧 Humidity</strong>: {main.humidity}%
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountryPane;
