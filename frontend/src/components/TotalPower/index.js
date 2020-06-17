import React, { useState, useEffect } from 'react';
import './TotalPower.css';
import config from 'config';
import Panel from 'components/Panel';
import { Chart } from 'react-google-charts';

const TotalPower = ({ totalPower }) => {
  const title = 'TOTAL POWER';

  const [powerData, setPowerData] = useState([['x', 'Total Power']]);

  const chartOptions = {
    chartType: 'LineChart',
    legend: 'none',
    backgroundColor: config.charts.backgroundColor,
    series: {
      0: { color: '#f7f7f7' },
    },
    vAxis: {
      gridlines: { color: 'transparent' },
      baselineColor: 'transparent',
    },
    hAxis: {
      gridlines: { color: 'transparent' },
      baselineColor: 'transparent',
    },
    loaderMessage: 'Loading...',
  };

  const [updated, setUpdated] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleString('en-US');
    setUpdated(date);

    const newPower = [date, totalPower];

    setPowerData((prevPower) => [...prevPower, newPower]);
  }, [totalPower]);

  return (
    <Panel title={title} footer={`Last Update: ${updated}`}>
      <div className='total_power'>
        <div className='total_power_info'>
          <div className='power'>{`${(totalPower / 1e3).toFixed(2)} KW`}</div>
        </div>

        <div className='total_power_chart'>
          <Chart
            chartType={chartOptions.chartType}
            loader={<div>{chartOptions.loaderMessage}</div>}
            data={powerData}
            options={chartOptions}
          />
        </div>
      </div>
    </Panel>
  );
};

export default TotalPower;
