'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MoneyState from "../dashboard/Components/MoneyState";
import AsideBar from "../dashboard/Components/AsideBar";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import constants from '../../constants.json'
export default function Transections() {
  const baseUrl = constants.baseUrl;
  const [transections, setTransections] = useState([]);

  const fetchTransections = async () => {
    const url = `${baseUrl}/states/transection`;
    const token = Cookies.get('token');
    try{
     const response = await axios.get(url, {
       headers: {
         'Authorization': `Bearer ${token}`
       }
     })
      if (response.status!=200) {
        throw new Error(`Response status: ${response.status}`);
      }
      setTransections(response.data);
    
    }
    catch(error){
      console.error('Error fetching transections: ', error);
    }
  }
  useEffect(() => {
    fetchTransections();
  }, []);
  return (
   <> 
  <div style={{display:'flex'}}>
  <AsideBar/>
  <div style={{marginTop:'4%'}}>
  <MoneyState /> 
  <div style={{display:'flex', justifyContent:"center", alignContent:"center", alignItems:"center", marginLeft:'5%'}}>
  <TableContainer component={Paper} 
    sx={{
        backgroundColor: 'inherit', // Match the background color to its parent
        color: 'white', // Set the text color to white
      }}
      elevation={0} // Removes the shadow effect
      >
      <Table sx={{ maxWidth: 800 }} aria-label="Transection table">
        <TableHead>
          <TableRow sx={{color: 'white'}}>
            <TableCell sx={{ color: 'white' }}>Description</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Time</TableCell>

            <TableCell align="right" sx={{ color: 'white' }}>Amount</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {transections.map((item,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" sx={{ color: 'blue' }}>
                {item.description}
              </TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>{new Date(item?.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',minute:'numeric' })}</TableCell>
              {item?.description?.toLowerCase().includes('withdraw') || item?.description?.toLowerCase().includes('bought') || item?.description?.toLowerCase().includes('short sold') ? (
        <TableCell className="text-selectedColor" style={{color:"red"}}>- ₹ {item?.amount}</TableCell>
      ) : (
        <TableCell className="text-selectedColor" style={{color:"green"}}>+ ₹ {item?.amount}</TableCell>
      )}
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
   </div>
   </div>
   </>
   
  )
}
