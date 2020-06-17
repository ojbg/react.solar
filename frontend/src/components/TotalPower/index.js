import React, { useState, useEffect } from 'react';
import './TotalPower.css';
import config from 'config';
import Card from 'components/Card';
import { Chart } from 'react-google-charts';

const TotalPower = ({ totalPower }) => {
  const title = 'TOTAL POWER';
  const [updated, setUpdated] = useState('');
  const [powerData, setPowerData] = useState([['time', 'Total Power (W)']]);

  const chartOptions = {
    chartType: 'LineChart',
    legend: 'none',
    backgroundColor: config.charts.backgroundColor,
    series: {
      0: { color: '#f7f7f7' },
    },
    vAxis: {
      title: 'Watts',
      titleTextStyle: { color: '#f7f7f7' },
      gridlines: { color: 'transparent' },
      baselineColor: 'transparent',
      textStyle: { color: '#f7f7f7' },
      format: 'short',
    },
    hAxis: {
      gridlines: { color: 'transparent' },
      baselineColor: 'transparent',
      textStyle: { color: '#f7f7f7' },
    },
    loaderMessage: 'Loading...',
  };

  const chartEvents = [
    {
      eventName: 'ready',
      callback({ chartWrapper }) {
        if (powerData.length > config.charts.trend.maxPoints) {
          const data = Array.from(powerData);
          data.splice(1, 1);
          setPowerData(data);
        }
      },
    },
  ];

  function formatPower(power) {
    return `${(power / 1e3).toFixed(2)} KW`;
  }

  function getPreviousPower() {
    if (powerData.length > 2) {
      const [[, power]] = powerData.slice(-2);
      return power;
    }
    return 0;
  }

  function getLastPower() {
    const [[, power]] = powerData.slice(-1);
    return power;
  }

  function comparePower() {
    const previous = getPreviousPower();
    const last = getLastPower();
    return last >= previous ? 'trend-green' : 'trend-red';
  }

  useEffect(() => {
    const [, date] = new Date().toLocaleString('en-US').split(',');
    const newPower = [date, totalPower];
    setUpdated(date);
    setPowerData((prevPower) => [...prevPower, newPower]);
  }, [totalPower]);

  return (
    <Card title={title} footer={`Last Update: ${updated}`}>
      <div className='total_power'>
        <div className='total_power_info'>
          <div className='power'>
            <span>{formatPower(totalPower)}</span>
            <span className={comparePower()}></span>
          </div>
          <div>
            <span>Previous: {formatPower(getPreviousPower())}</span>
          </div>
        </div>

        <div className='total_power_chart'>
          <Chart
            chartType={chartOptions.chartType}
            loader={<div>{chartOptions.loaderMessage}</div>}
            data={powerData}
            options={chartOptions}
            chartEvents={chartEvents}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalPower;
