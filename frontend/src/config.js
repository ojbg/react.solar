
const appTitle = 'POWERBOARD TEST';

const config = {
    apiKey: 'df2878e6af684cbd9977a5bc26894f19',  
    apiUrl: 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/',
    maxPanels: 30,
    forecastTimer: 1000*60*5,
    panelsTimer: 10000,
    charts: {
      backgroundColor: '#616161',
      lineColor: '#F57C00',
      textColor: '#FFF',
      trend: {
        maxpoints:100
      }
    }    
}

export default config;
export { appTitle };
  