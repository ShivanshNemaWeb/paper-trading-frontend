
import React from 'react';
import MoneyState from '../MoneyState';
import Chart from '../Chart';
import MoneyTransaction from '../MoneyTransaction';

import WatchList from '../watchlist';
import CommandPopup from '@/components/ui/command-popup';

import Portfolio from '../portfolio';
import Link from 'next/link';
const Dashboard = async () => {

  return (
    <section className='sm:m-10  sm:w-[1200px]' >
      <div className='flex flex-wrap mt-8 sm:mt-0'>
          <MoneyState />
       
      </div>

<section className='flex flex-col sm:flex-col sm:space-x-4 space-y-4 sm:space-y-0'>
  {/* First Row: Chart and Watchlist */}
  <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full mb-5'>
    {/* Chart */}
    <article className='flex-1 sm:w-[70%] bg-sidebar rounded-lg flex flex-col' style={{ backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)" }}>
      <div className='z-0' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        
          {/* <h1 style={{color:'white', marginTop:'40%'}}>Nothing to show</h1> */}
          <Chart/>
        
      </div>
    </article>

    {/* Watchlist */}
    <div className='flex-1 sm:w-[50%] flex flex-col space-y-4'>
      <div className='flex flex-col justify-center items-center pb-4 bg-navbar rounded-lg sm:w-[70%]' style={{ overflow: "scroll", backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)" }}>
        <div className='flex justify-between w-full px-3 my-3'>
          <div className='capitalize text-[#fff] sm:text-xl'>Watch List</div>
          <div className='text-[#fff]'>
            <CommandPopup />
          </div>
        </div>

        <article className='relative rounded-lg text-[#fff] bg-body-secound w-full h-[20rem] mt-4 mb-5'>
          <WatchList />
        </article>
      </div>
    </div>
  </div>

  {/* Second Row: Activity, Payment, and Recent Transactions */}
  <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 sm:w-[85%] mt-5'>
    {/* Activity */}
    <article className='flex-1 bg-sidebar rounded-lg text-selectedColor flex-col sm:w-[70%]' style={{ backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)" }}>
      <Portfolio/>
    </article>

  

    {/* Recent Transactions */}
    <article className='flex-1 bg-navbar rounded-lg sm:w-full' style={{ backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)" }}>
      <div className='flex justify-between px-3 my-3'>
        <div className='capitalize text-[#fff] sm:text-xl'>recent transactions</div>
        <Link href='/transections'>
        <button className='text-xs py rounded-lg flex justify-start items-center text-white transition-all hover:text-selectedColor/75'>see all</button>
        </Link>
      </div>
          <MoneyTransaction  />
    </article>
  </div>
</section>

    </section>
  );
};


export default Dashboard;


