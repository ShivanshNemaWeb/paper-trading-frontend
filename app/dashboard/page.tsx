// 'use client'
import Dashboard from './Components/content/Dashboard';
import AsideBar from './Components/AsideBar';
import Navbar from './Components/Navbar';
import './styles/Home.css'
const dashboard = () => {

  return (
    <>
      {/* <Navbar /> */}
      <div style={{display:'flex'}}>
      <AsideBar />
      <Dashboard />
      </div>
    </>
  );
};


export default dashboard;