// 'use client'
// import { useState } from 'react';
// import Users from './components/Users';
// import Deposit from './components/Deposit';
// import Withdrawal from './components/Withdrawal';
// import Portfolio from './components/Withdrawal';

// const AdminPage = () => {
//   const [activeTab, setActiveTab] = useState('users');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'users':
//         return <Users />;
//       case 'deposit':
//         return <Deposit />;
//       case 'withdrawal':
//         return <Withdrawal />;
//       case 'portfolio':
//         return <Portfolio />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="md:w-1/4 w-full bg-gray-800 text-white p-5 space-y-4">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//         <ul>
//           <li>
//             <button 
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
//               onClick={() => setActiveTab('users')}
//             >
//               Users
//             </button>
//           </li>
//           <li>
//             <button 
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'deposit' ? 'bg-gray-700' : ''}`}
//               onClick={() => setActiveTab('deposit')}
//             >
//               Deposit
//             </button>
//           </li>
//           <li>
//             <button 
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'withdrawal' ? 'bg-gray-700' : ''}`}
//               onClick={() => setActiveTab('withdrawal')}
//             >
//               Withdrawal
//             </button>
//           </li>
//           <li>
//             <button 
//               className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'portfolio' ? 'bg-gray-700' : ''}`}
//               onClick={() => setActiveTab('portfolio')}
//             >
//               Portfolio
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="md:w-3/4 w-full p-8">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
'use client'

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Users from './components/Users';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import Portfolio from './components/Portfolio';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for toggling sidebar

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <Users />;
      case 'deposit':
        return <Deposit />;
      case 'withdrawal':
        return <Withdrawal />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`fixed z-20 md:relative md:w-1/4 w-64 bg-gray-800 text-white p-5 space-y-4 transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li>
            <button 
              className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveTab('users');
                setSidebarOpen(false);
              }}
            >
              Users
            </button>
          </li>
          <li>
            <button 
              className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'deposit' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveTab('deposit');
                setSidebarOpen(false);
              }}
            >
              Deposit
            </button>
          </li>
          <li>
            <button 
              className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'withdrawal' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveTab('withdrawal');
                setSidebarOpen(false);
              }}
            >
              Withdrawal
            </button>
          </li>
          <li>
            <button 
              className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'portfolio' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveTab('portfolio');
                setSidebarOpen(false);
              }}
            >
              Portfolio
            </button>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu Button */}
      <div className="md:hidden flex items-center p-4 bg-gray-800 text-white fixed top-0 w-full z-30" style={{marginTop:'100vh'}}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-8 h-8" />
        </button>
        <h2 className="ml-4 text-xl font-bold">Admin Panel</h2>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-8 md:ml-0 ml-64">
        {renderContent()}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
