import React, { useState, useEffect } from 'react';
import config from 'config';
import Panel from 'components/Panel';
import './Forecast.css';
import { Chart } from 'react-google-charts';
import ApiForecast from 'services/ApiForecast';

function getISOTime(hours = 24) {
  const start = new Date();
  // Fix UTC to use native date ISO conversion
  const startISO = new Date(
    start.getTime() - start.getTimezoneOffset() * 6e4
  ).toISOString();

  const end = new Date(start);
  end.setHours(end.getHours() + hours);

  const endISO = new Date(
    end.getTime() - end.getTimezoneOffset() * 6e4
  ).toISOString();

  return {
    start: startISO,
    end: endISO,
  };
}

const Forecast = () => {
  const title = 'WEATHER FORECAST';

  const [updated, setUpdated] = useState('');
  const [solarFlux, setSolarFlux] = useState([]);
  const [skyCoverage, setSkyCoverage] = useState([]);

  const charts = [
    {
      id: 1,
      type: 'LineChart',
      loaderMessage: 'Loading...',
      title: 'VDDSF(W/m2)',
      toolTip: 'Visible Diffuse Downward Solar Flux',
      data: solarFlux,
      options: {
        legend: 'none',
        hAxis: {
          title: 'Hours',
          titleTextStyle: {
            color: config.charts.textColor,
          },
          textStyle: {
            color: config.charts.textColor,
          },
        },
        vAxis: {
          title: 'W/m2',
          titleTextStyle: {
            color: config.charts.textColor,
          },
          viewWindow: {
            min: 0,
          },
          textStyle: {
            color: config.charts.textColor,
          },
          baselineColor: config.charts.textColor,
        },
        curveType: 'function',
        backgroundColor: config.charts.backgroundColor,
        colors: [config.charts.lineColor],
      },
    },
    {
      id: 2,
      type: 'ColumnChart',
      loaderMessage: 'Loading...',
      title: 'Sky cloud coverage',
      toolTip: '',
      data: skyCoverage,
      options: {
        legend: 'none',
        hAxis: {
          title: 'Hours',
          titleTextStyle: {
            color: config.charts.textColor,
          },
          textStyle: {
            color: config.charts.textColor,
          },
        },
        vAxis: {
          title: '%',
          titleTextStyle: {
            color: config.charts.textColor,
          },
          textStyle: {
            color: config.charts.textColor,
          },
          baselineColor: config.charts.textColor,
        },
        backgroundColor: config.charts.backgroundColor,
        colors: [config.charts.lineColor],
      },
    },
  ];

  useEffect(() => {
    const position = {
      latitude: -50.5,
      longitude: 49.5,
    };

    async function getSolarFlux(time) {
      const data = [];
      data.push(['Hour', 'VDDSF']);

      const params = {
        lon: position.longitude,
        lat: position.latitude,
        var: 'av_swsfcdown',
        count: 9,
        start: time.start,
        end: time.end,
        reftime_recent: true,
        apikey: config.apiKey,
        interval: null,
      };

      try {
        const results = await ApiForecast.getWeatherForecast(params);

        for (let i = 0; i < results.data.entries.length; i++) {
          const time = new Date(results.data.entries[i].axes.time).getHours();
          const vddsf = results.data.entries[i].data.av_swsfcdown;

          data.push([`${time}`, vddsf]);
        }

        return data;
      } catch (error) {}
    }

    async function getSkyCloudCoverage(time) {
      const data = [];
      data.push(['Hour', 'SCC']);

      const params = {
        lon: position.longitude,
        lat: position.latitude,
        var: 'av_ttl_cld',
        count: 9,
        start: time.start,
        end: time.end,
        reftime_recent: true,
        apikey: config.apiKey,
      };

      try {
        const results = await ApiForecast.getWeatherForecast(params);

        for (let i = 0; i < results.data.entries.length; i++) {
          const time = new Date(results.data.entries[i].axes.time).getHours();
          const sky_cloud_coverage =
            results.data.entries[i].data.av_ttl_cld * 100;

          data.push([`${time}`, sky_cloud_coverage]);
        }

        return data;
      } catch (error) {}
    }

    async function getData() {
      const { start, end } = getISOTime();
      const time = { start, end };
      const solarFlux = await getSolarFlux(time);
      setSolarFlux(solarFlux);
      const skyCoverage = await getSkyCloudCoverage(time);
      setSkyCoverage(skyCoverage);

      setUpdated(new Date().toLocaleString('en-US'));
    }

    getData();

    const interval = setInterval(() => {
      getData();
    }, config.forecastTimer);
    return () => clearInterval(interval);
  }, []);

  return (
    <Panel title={title} footer={`Last Update: ${updated}`}>
      <div className='forecast'>
        {charts.map((chart) => (
          <div key={chart.id} className='forecast_chart'>
            <div title={chart.toolTip} className='text_bold'>
              {chart.title}
            </div>
            <Chart
              chartType={chart.type}
              loader={<div>{chart.loaderMessage}</div>}
              data={chart.data}
              options={chart.options}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default Forecast;
