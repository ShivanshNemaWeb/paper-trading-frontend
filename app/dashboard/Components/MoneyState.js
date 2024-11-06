'use client'
import Image from "next/image";
import { useState,useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {baseUrl} from '../../../constants.json'
const MoneyState = () => {

    const fetchStates = async() => {
        // fetch data from server
        // set states with fetched data
        const url = `${baseUrl}/states`;
        const token = Cookies.get('token');
        try{
            const response = await axios.get(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              if (response.status!=200) {
                throw new Error(`Response status: ${response.status}`);
              }
           setMoneyStateData( [
          {
            'title': 'Current',
            'icon': '/Icon/Balance.svg',
            'money': response.data.current,
          },
          {
            'title': 'Invested',
            'icon': '/Icon/incume.svg',
            'money': response.data.invested,
          },
          {
            'title': 'Returns',
            'icon': '/Icon/expenses.svg',
            'money': response.data.returns,
          },
          {
            'title': 'Total Returns Percentage',
            'icon': '/Icon/saving.svg',
            'money': response.data.totalReturnsPerc,
          },
        ]
    )        
        }
        catch(error){
          console.error(error) 
        }
    }
    
    useEffect(() => {
        fetchStates()
    }, [])
    const [MoneyStateData, setMoneyStateData] = useState([
        {
          'title': 'Current',
          'icon': '/Icon/Balance.svg',
          'money': 0,
        },
        {
          'title': 'Invested',
          'icon': '/Icon/incume.svg',
          'money': 0,
        },
        {
          'title': 'Returns',
          'icon': '/Icon/expenses.svg',
          'money': 0,
        },
        {
          'title': 'Total Returns Percentage',
          'icon': '/Icon/saving.svg',
          'money': 0,
        },
  
    ])
   
    return (
        <>
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
        {MoneyStateData.map((e, i) => (
         <div key={i} className=' sm:w-[14rem]  w-[10rem] h-[6rem] hover:shadow-xl active:border-selectedColor hover:active:border-2 transition-all cursor-pointer bg-sidebar  rounded-lg  m-2 items-center flex' style={{backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)"}}>
         <div className=" w-[40%] flex justify-center  ">
             <div className=" bg-body-secound p-2 rounded-lg ">
             <Image src={e.icon} alt={''} width={24} height={24}  />
             </div>
         </div>
         <div className="w-[60%]">
               <h4 className="text-sm text-white "> {e.title} </h4>
               {
                e.title=="Total Returns Percentage"?(<h2 className="text-[#fff] bold-text text-xl mt-1 "> {e.money?.toFixed(2)} %</h2>):(<h2 className="text-[#fff] bold-text text-xl mt-1 "> &#8377; {e.money?.toFixed(2)}</h2>)
               }
         </div>
     </div>
        ))}
        </div>
        </>
    );
}

export default MoneyState;
