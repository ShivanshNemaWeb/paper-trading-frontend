'use client'
import Image from "next/image"
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import constants from "../../../constants.json"
export default function MoneyTransaction() {
  const baseUrl = constants.baseUrl
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
   {
    transections.slice(0, 5).map((transection,i)=>(
      
      <article key={i} className='w-full flex justify-between mt-2 hover:bg-lightColor/5 p-2 rounded-lg cursor-pointer'>
      <div className='flex justify-start items-center '>
        <div className="rounded-[4px] overflow-hidden">
          <Image src='/Icon/trans.svg' width={40} height={40} alt="ImageAvatar" />
        </div>
        <div className="ml-2">
          <h3 className="text-[10px] font-thin" style={{color:"white"}}> {transection?.description}</h3>
          <h5 className="font-normal text-base" style={{color:"white"}}>
            {new Date(transection?.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </h5>
        </div>
      </div>
    
      {/* Determine the color and sign based on the description */}
      {transection?.description?.toLowerCase().includes('withdraw') || transection?.description?.toLowerCase().includes('bought') || transection?.description?.toLowerCase().includes('short sold') ? (
        <h4 className="text-selectedColor" style={{color:"red"}}>- ₹ {transection?.amount}</h4>
      ) : (
        <h4 className="text-selectedColor" style={{color:"green"}}>+ ₹ {transection?.amount}</h4>
      )}
    </article>
    
    ))
   }
   </>
   
  )
}
