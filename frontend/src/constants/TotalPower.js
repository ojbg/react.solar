const TotalPower = {
  title: 'TOTAL POWER',
  chart: {
    xAxisTitle: 'Watts',
    xTitle: 'Time',
    yTitle: 'Total Power (W)',
    lineColor: '#f7f7f7',
    textColor: '#f7f7f7',
    gridColor: 'transparent',
    backgroundColor: 'transparent',
    trend: { maxPoints: 60 },
  },
  messages: {
    loading: 'Loading...',
    notValid: 'Not Valid',
    lastUpdate: 'Last Update:',
    previous: 'Previous:',
  },
  units: {
    watts: 'W',
    kilo: 'KW',
    mega: 'MW',
    giga: 'GW',
  },
};

export { TotalPower };
