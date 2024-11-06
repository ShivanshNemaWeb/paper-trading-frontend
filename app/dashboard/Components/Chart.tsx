
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import {baseUrl} from '../../../constants.json'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PortfolioGraph = () => {
  const [data, setData] = useState({});
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/states`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: ['Invested', 'Returns'],
    datasets: [
      {
        label: 'Amount',
        data: [data?.invested ?? 0, data.returns ?? 0],
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set X-axis labels color to white
        },
      },
      y: {
        ticks: {
          color: 'white', // Set Y-axis labels color to white
        },
      },
    },
  };

  return (
    <Box sx={{ bgcolor: 'inherit', color: 'white', p: 2 }}>
      <Bar data={chartData} options={options} height={400} />
    </Box>
  );
};

export default PortfolioGraph;
