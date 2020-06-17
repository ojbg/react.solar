
const appTitle = 'POWERBOARD TEST';

const config = {
    apiKey: 'df2878e6af684cbd9977a5bc26894f19',  
    apiUrl: 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/',
    weatherForecastUrl: 'point', 
    maxPanels: 30,
    forecastTimer: 1000*60*5,
    panelsTimer: 1000,
    charts: {
      backgroundColor: 'transparent',
      lineColor: '#56d4fa',
      textColor: '#FFF',
      trend: {
        maxpoints:3
      }
    }    
}

export default config;
export { appTitle };
  