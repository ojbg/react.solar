import ApiClient from 'services/ApiClient';
import config from 'config';

export default {
    getWeatherForecast (params){
        const url = config.weatherForecastUrl;
        return ApiClient.get(url, {params});
    }    
}