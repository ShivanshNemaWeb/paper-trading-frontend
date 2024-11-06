'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import {baseUrl} from '../../../constants.json'
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
  } from '@mui/material';
interface PortfolioItem {
  ticker: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profitLoss: number;
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const token = Cookies.get('token'); // Get the token from cookies

        // Fetch portfolio data
        const response = await axios.get(
          `${baseUrl}/portfolio/getPortfolio`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPortfolio(response.data.portfolio);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <TableContainer component={Paper} 
    sx={{
        backgroundColor: 'inherit', // Match the background color to its parent
        color: 'white', // Set the text color to white
      }}
      elevation={0} // Removes the shadow effect
      >
      <Table sx={{ maxWidth: 800 }} aria-label="portfolio table">
        <TableHead>
          <TableRow sx={{color: 'white'}}>
            <TableCell sx={{ color: 'white' }}>Ticker</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Total Invested</TableCell>

            <TableCell align="right" sx={{ color: 'white' }}>Quantity</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Current Price</TableCell>
            <TableCell align="right"sx={{ color: 'white' }}>Profit/Loss</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.map((item) => (
            <TableRow key={item.ticker} >
              <TableCell component="th" scope="row" sx={{ color: 'blue', cursor:"pointer" }}>
              <Link href={`/stocks/${item.ticker}`}>{item.ticker}</Link>
              </TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>₹{item.averagePrice.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>{item.quantity}</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>₹{item.currentPrice.toFixed(2)}</TableCell>

              <TableCell align="right" style={{ color: item.profitLoss >= 0 ? 'green' : 'red' }}>
              ₹ {item.profitLoss.toFixed(2)}
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
