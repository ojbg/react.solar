const Forecast = {
  title: 'WEATHER FORECAST',
  charts: {
    solarFlux: {
      title: 'VDDSF(W/m2)',
      titleToolTip: 'Visible Diffuse Downward Solar Flux',
      xAxisTitle: 'Hours',
      yAxisTitle: 'W/m2',
      xTitle: 'Hour',
      yTitle: 'VDDSF',
      lineColor: '#56d4fa',
      textColor: '#FFF',
      backgroundColor: 'transparent',
    },
    sky: {
      title: 'Sky cloud coverage',
      titleToolTip: '',
      xAxisTitle: 'Hours',
      yAxisTitle: '%',
      xTitle: 'Hour',
      yTitle: 'SCC',
      lineColor: '#56d4fa',
      textColor: '#FFF',
      backgroundColor: 'transparent',
    },
  },
  messages: {
    loading: 'Loading...',
    lastUpdate: 'Last Update:',
    apiError: 'API Error'
  },
  position: {
    latitude: -50.5,
    longitude: 49.5,
  },
  api: {
    solarFlux: { var: 'av_swsfcdown', count: 9, interval: null, refTime: true },
    sky: { var: 'av_ttl_cld', count: 9, refTime: true },
  },
};

export { Forecast };
