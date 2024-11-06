'use client'
import Image from "next/image";
import { useState  } from "react";
import Link from 'next/link';

import { usePathname } from "next/navigation";


const AsideBar = () => {
  const pathname = usePathname(); // Get the pathname of the current URL
  const lastSegment = pathname.split("/").pop(); // Extract the last part of the URL

  const [dashboard, setDashboard] = useState(true);
  const [transactions, setTransactions] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [analytic, setAnalytic] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [message, setMessage] = useState(false);
  const [setting, setSetting] = useState(false);
  const handlerDash = (e) => {

    //  change the state of the dashboard to true 
     { dashboard ? setDashboard(false) : setDashboard(true)  }

     // change other states 
     setTransactions(false);
     setWallet(false);
     setAnalytic(false);
     setPersonal(false);
     setMessage(false);
     setSetting(false);

    //
}

   

  const handlerTrans = (e) => {
  //  change the state of the dashboard to true 
   { transactions ? setTransactions(false) : setTransactions(true)  }
   // change other states 
     setDashboard(false);
     setWallet(false);
     setAnalytic(false);
     setPersonal(false);
     setMessage(false);
     setSetting(false);

 }

   const handlerWalet = (e) => {
  //  change the state of the dashboard to true 
   { wallet ? setWallet(false) : setWallet(true)  }
   // change other states 
     setDashboard(false);
     setTransactions(false);
     setAnalytic(false);
     setPersonal(false);
     setMessage(false);
     setSetting(false);

 }
 const handlerAnalytics = (e) => {
//  change the state of the dashboard to true 
 { analytic ? setAnalytic(false) : setAnalytic(true)  }
 // change other states 
   setDashboard(false);
   setTransactions(false);
   setWallet(false);
   setPersonal(false);
   setMessage(false);
   setSetting(false);

}

const links = {
  dashboard : {
    Name : 'dashboard', 
    icon : '/Icon/Dashboard.svg',
  } ,
  wallet : {
    Name : 'wallet', 
    icon : '/Icon/wallet-2.svg',
  } ,

  transactions : {
    Name : 'transactions', 
    icon : '/Icon/rupee.svg',
  } ,

  portfolio : {
    Name : 'portfolio', 
    icon : '/Icon/Analytics.svg',
  } ,
  stocks : {
    Name : 'Stocks', 
    icon : '/Icon/Analytics.svg',
  }
}

    return (
       <aside className=' left-0 bg-sidebar sm:w-[10rem] w-[3rem] h-full ' style={{backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)", marginTop:'4%', height:'1000px'}}>
        <ul className="mt-10 text-[#A9A9A9] space-y-3 text-white">
           
          {/*  dash */}
          <Link href='/dashboard'>
            <li id="dashoard"  onClick={handlerDash}  className={`${ lastSegment==='dashboard' ?'bg-selectedColor/10 cursor-pointer  w-full sm:w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center' : 'cursor-pointer w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center'}`}>
                <Image className=" " src={links.dashboard.icon} width={'18'} height={'18'} alt={''} />
                <h4 className="ml-2 sm:flex hidden"> {links.dashboard.Name}</h4>
               { lastSegment==='dashboard'  ?   <span className=" absolute w-[5px] h-4 rounded-l bg-[#FFC01E] right-0 "></span> : ''}
            </li> 
            </Link>
             {/* wallet */}
             <Link href='/wallet'>
            <li id="handlerWalet"  onClick={handlerWalet} className={`${ lastSegment==='wallet' ?'bg-selectedColor/10 cursor-pointer text-selectedColor w-full sm:w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center' : 'cursor-pointer w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center'}`}>
                <Image className="selectedColor " src={links.wallet.icon} width={'18'} height={'18'} alt={''} />
                <h4 className="ml-2 sm:flex hidden"> {links.wallet.Name}</h4>
                { lastSegment==='wallet' ?   <span className=" absolute w-[5px] h-4 rounded-l bg-[#FFC01E] right-0 "></span> : ''}
            </li>
            </Link>
            {/* transactions */}
            <Link href="/transections">
            <li id="handlerTrans"  onClick={handlerTrans} className={`${ lastSegment==='transections' ?'bg-selectedColor/10 cursor-pointer text-selectedColor w-full sm:w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center' : 'cursor-pointer w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center'}`}>
            <img width={20} height={20} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABFUlEQVR4nO1Vu04DMRA01KEBQtLAN0BDviKR+AUkIL9ExYcghZeooigSIjRQ+WbWdk7JFyA5snInrkhQ7s7pMtIWW3hmZ3dtK7VDVZDyTorfJAB5Ky0QDpUQeI3giMcArkmZZcSP3vs9FRtam0uAv8vK0a1MBEgfkPvVwenSBT9CniRyV1qAlPmmMwhtq+AAFyJyuypI/mQOBiEHcK5iIUlMpzCDXjRiY8wJyZu/LeKT936/MmGwv37v+aK1PqxVMcCv4k0Ne0/ygeRVrcoLDs7yYQJ8ds41VGwAOCXlO38O0jQ9iC7inGvn7QI4rN37f0QmmZMRgKPoItbaFsDPbPBjEWlu2QmHahuw1rbCZxTlD9ghYAEBz7YeginEzAAAAABJRU5ErkJggg=="/>
                
                <h4 className="ml-2 sm:flex hidden"> {links.transactions.Name}</h4>
                { lastSegment==='transections' ?   <span className=" absolute w-[5px] h-4 rounded-l  bg-[#FFC01E] right-0 "></span> : ''}
            </li>
            </Link>
            <Link href="/portfolio">
            <li id="Portfolio"  onClick={handlerAnalytics} className={`${ lastSegment==='portfolio' ?'bg-selectedColor/10 cursor-pointer text-selectedColor w-full sm:w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center' : 'cursor-pointer w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center'}`}>
                <Image className="selectedColor " src={links.portfolio.icon} width={'18'} height={'18'} alt={''} />
                <h4 className="ml-2 sm:flex hidden"> {links.portfolio.Name}</h4>
                { lastSegment==='portfolio' ?   <span className=" absolute w-[5px] h-4 rounded-l bg-[#FFC01E] right-0 "></span> : ''}
            </li>
            </Link>
            <Link href="/screener">
            <li id="stock" className={`${ lastSegment==='screener' ?'bg-selectedColor/10 cursor-pointer text-selectedColor w-full sm:w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center' : 'cursor-pointer w-[10rem] mt-2 py-3 pl-4 hover: text-[12px]  text-left relative flex items-center'}`}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABRklEQVR4nO3Uvy5EQRTH8bVkJaLYShQElWqR6ESHKP23vILKE6ismhcQUSk1SrUXEA+g0CqIkEg+chlyrbn37opo+CWTW8yZ7+/cc85MqfQnhGHUsRnW7E8bjKTgr+unDXqwXGSAAfS2C69iIYCXwrceiavgDIfoaxXeh5UAnQmQpFxDkdgTb3rGTivwQawH+DQ6c2K7Angf3SgXwUexEeCT6GghoWvcYLEocCLVzFrT3h7u0Yicq+EylGk7Bi5j6r2JGXV+CoDHnFJd4aJ5oxKamMBX0Z8B+FAkuVMc4wFHzQfnAzwZx2oMnqjA4AC3OP8ypsnVx1xyoUo5kmGQ2t9KepjHSAePYw1jrRq0pdTjVs8zyEgkc9rSBl/eHXGDWCKfpy3m2IbBZmFcbL5/w6Be+OttlKiBO+ymgsYizft23L9KWXoBvfnA0bQAnXoAAAAASUVORK5CYII="/>                <h4 className="ml-2 sm:flex hidden"> {links.stocks.Name}</h4>
                { lastSegment==='screener' ?   <span className=" absolute w-[5px] h-4 rounded-l bg-[#FFC01E] right-0 "></span> : ''}
            </li>
            </Link>
           
        </ul>

       </aside>
    );
}

export default AsideBar;
