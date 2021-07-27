import React, { useState, useEffect } from 'react';
import config from 'config';
import Card from 'components/Card';
import './Forecast.css';
import { Chart } from 'react-google-charts';
import Api from 'services/ApiForecast';
import { Forecast as constants } from 'constants/Forecast';

const Forecast = () => {
  const title = constants.title;
  const [updated, setUpdated] = useState('');
  const [solarFlux, setSolarFlux] = useState([]);
  const [skyCoverage, setSkyCoverage] = useState([]);
  const [isError, setIsError] = useState(false);

  const charts = [
    {
      id: 1,
      type: 'LineChart',
      loaderMessage: constants.messages.loading,
      title: constants.charts.solarFlux.title,
      toolTip: constants.charts.solarFlux.titleToolTip,
      data: solarFlux,
      options: {
        legend: 'none',
        hAxis: {
          title: constants.charts.solarFlux.xAxisTitle,
          titleTextStyle: {
            color: constants.charts.solarFlux.textColor,
          },
          textStyle: {
            color: constants.charts.solarFlux.textColor,
          },
        },
        vAxis: {
          title: constants.charts.solarFlux.yAxisTitle,
          titleTextStyle: {
            color: constants.charts.solarFlux.textColor,
          },
          viewWindow: {
            min: 0,
          },
          textStyle: {
            color: constants.charts.solarFlux.textColor,
          },
          baselineColor: constants.charts.solarFlux.textColor,
        },
        curveType: 'function',
        backgroundColor: constants.charts.solarFlux.backgroundColor,
        colors: [constants.charts.solarFlux.lineColor],
      },
    },
    {
      id: 2,
      type: 'ColumnChart',
      loaderMessage: constants.messages.loading,
      title: constants.charts.sky.title,
      toolTip: '',
      data: skyCoverage,
      options: {
        legend: 'none',
        hAxis: {
          title: constants.charts.sky.xAxisTitle,
          titleTextStyle: {
            color: constants.charts.sky.textColor,
          },
          textStyle: {
            color: constants.charts.sky.textColor,
          },
        },
        vAxis: {
          title: constants.charts.sky.yAxisTitle,
          titleTextStyle: {
            color: constants.charts.sky.textColor,
          },
          textStyle: {
            color: constants.charts.sky.textColor,
          },
          baselineColor: constants.charts.sky.textColor,
        },
        backgroundColor: constants.charts.sky.backgroundColor,
        colors: [constants.charts.sky.lineColor],
      },
    },
  ];

  useEffect(() => {
    async function getSolarFlux(time) {
      const data = [];
      data.push([
        constants.charts.solarFlux.xTitle,
        constants.charts.solarFlux.yTitle,
      ]);

      const params = {
        lon: constants.position.longitude,
        lat: constants.position.latitude,
        var: constants.api.solarFlux.var,
        count: constants.api.solarFlux.count,
        // start: time.start,
        // end: time.end,
        reftime_recent: constants.api.solarFlux.refTime,
        apikey: config.apiKey,
        interval: constants.api.solarFlux.interval,
      };

      try {
        setIsError(false);
        const results = await Api.getWeatherForecast(params);

        for (let i = 0; i < results.data.entries.length; i++) {
          const time = new Date(results.data.entries[i].axes.time).getHours();
          const vddsf = results.data.entries[i].data.av_swsfcdown;

          data.push([`${time}`, vddsf]);
        }

        return data;
      } catch (error) {
        setIsError(true);
      }
    }

    async function getSkyCloudCoverage(time) {
      const data = [];
      data.push([constants.charts.sky.xTitle, constants.charts.sky.yTitle]);

      const params = {
        lon: constants.position.longitude,
        lat: constants.position.latitude,
        var: constants.api.sky.var,
        count: constants.api.sky.count,
        // start: time.start,
        // end: time.end,
        reftime_recent: constants.api.sky.refTime,
        apikey: config.apiKey,
      };

      try {
        setIsError(false);
        const results = await Api.getWeatherForecast(params);

        for (let i = 0; i < results.data.entries.length; i++) {
          const time = new Date(results.data.entries[i].axes.time).getHours();
          const sky_cloud_coverage =
            results.data.entries[i].data.av_ttl_cld * 100;

          data.push([`${time}`, sky_cloud_coverage]);
        }

        return data;
      } catch (error) {
        setIsError(true);
      }
    }

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

    async function getData() {
      const { start, end } = getISOTime();
      const time = { start, end };
      const solarFlux = await getSolarFlux(time);
      setSolarFlux(solarFlux);
      const skyCoverage = await getSkyCloudCoverage(time);
      setSkyCoverage(skyCoverage);

      setUpdated(new Date().toLocaleString(config.locale));
    }

    getData();

    const interval = setInterval(() => {
      getData();
    }, constants.forecastTimer);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title={title} footer={`${constants.messages.lastUpdate} ${updated}`}>
      {isError && <p className='error'>{constants.messages.apiError}</p>}
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
    </Card>
  );
};

export default Forecast;
