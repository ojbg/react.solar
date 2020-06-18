
const appTitle = 'POWERBOARD TEST';

const config = {
    apiKey: '2a2bca3b98ce4e20b878928aed4ce572',//'df2878e6af684cbd9977a5bc26894f19',  
    apiUrl: 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/',
    weatherForecastUrl: 'point', 
    locale: 'en-US',
    maxPanels: 30,
    forecastTimer: 1000*60*5,
    panelsTimer: 10000,
    charts: {
      backgroundColor: 'transparent',
      lineColor: '#56d4fa',
      textColor: '#FFF',
      trend: {
        maxPoints:60
      }
    }    
}

export default config;
export { appTitle };
  