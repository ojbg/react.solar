import ApiClient from 'services/ApiClient';
import config from 'config';

export function getWeatherForecast(params) {
  const url = config.weatherForecastUrl;
  return ApiClient.get(url, { params });
}
