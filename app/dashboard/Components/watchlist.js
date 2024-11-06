'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import Cookies from 'js-cookie';
import constants from '../../../constants.json'
const WatchList = () => {
  const baseUrl = constants.baseUrl
const [list,setList] = useState([]);
  async function fetchWatchList() {
    const url = `${baseUrl}/watchlist/get`;
    const token = Cookies.get('token');

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status!=200) {
        throw new Error(`Response status: ${response.status}`);
      }

      setList(response.data.list);

    } catch (error) {
      console.error("Failed to fetch watchlist or stock quotes:", error.message);
      return []; // Return an empty array or some default value
    }
  }

  useEffect(()=>{
    fetchWatchList(); 
  },[])


  return (
    <TableContainer component={Paper} 
    sx={{
        backgroundColor: 'inherit', // Match the background color to its parent
        color: 'white', // Set the text color to white
      }}
      elevation={0} // Removes the shadow effect
      >
        <Table sx={{ maxWidth: 500 }}>
        <TableHead>
        <TableRow sx={{color: 'white'}}>
            <TableCell sx={{ color: 'white' }}>Ticker</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>

            <TableCell align="right" sx={{ color: 'white' }}>%</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {list?.length > 0 &&
          list.map((stock) => (
            <TableRow key={stock.ticker}>
             
              <TableCell component="th" scope="row" sx={{ color: 'blue', cursor:"pointer" }}>
              <Link href={`/stocks/${stock.ticker}`}>{stock.ticker}</Link>
                
                </TableCell>
             
             <TableCell align="right" sx={{ color: 'white' }}>
              ₹ {stock.currentPrice?.toFixed(2)}
              </TableCell>
              <TableCell align="right" style={{ color: stock.percentageChange >= 0 ? 'green' : 'red' }}>
                {stock.percentageChange} %
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatchList;
