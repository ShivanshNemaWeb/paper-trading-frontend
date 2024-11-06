// 'use client'
// import axios from "axios";
// import Cookies from "js-cookie";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// interface User{
//     name:string,
//     email:string,
//     _id:string,
//     phone:string
// }
// import Image from "next/image";
// import {baseUrl} from '../../../constants.json';
// const Actions = () => {
//     const [isUser, setIsUser] = useState(false);
//     const [user, setUser] = useState<User>();
//     const getUser = async (token: string) => {
//         try{
//             const user = await axios.get(`${baseUrl}/user/profile`,{
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             if(user.status == 200){
//               setIsUser(true);
//               setUser(user.data.user);
//             }
//         }
//         catch(error){
//              setIsUser(false);
//         }
//     }
//     const token = Cookies.get('token');
//     useEffect(() => {
//       if(token){
//         getUser(token);
//       }
//     }, [token])
//     return(
//    <>
//     {
//         isUser?(<>
//         <div style={{display:'flex'}}>
//         <Image className="selectedColor " src='/Icon/Personal.svg' width={'15'} height={'15'} alt={''} />
//         <Link href='/dashboard'>
//         <h1 style={{color:'white',marginLeft:'5px',cursor:'pointer'}}>{user?.name}</h1>
//         </Link>
//         </div>
//         </>):(<>
//             <div className='flex'>
//         <Link href='/login'>
//             <button className=' lg:flex justify-end text-xl font-semibold py-2 px-3 lg:px-6 navbutton text-white m-2'>Login</button>
//         </Link>
        
//         </div>

//         </>)
//     }
//     </>

// )
// }
// export default Actions

'use client'
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { baseUrl } from '../../../constants.json';
import { useRouter } from "next/navigation";
import {LogOutIcon} from 'lucide-react';
interface User {
  name: string,
  email: string,
  _id: string,
  phone: string
}

const Actions = () => {
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState<User>();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to manage logout popup
  const router = useRouter(); // Next.js router to handle redirection

  const getUser = async (token: string) => {
    try {
      const user = await axios.get(`${baseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (user.status == 200) {
        setIsUser(true);
        setUser(user.data.user);
      }
    } catch (error) {
      setIsUser(false);
    }
  }

  const handleLogout = () => {
    // Clear the token and redirect to login
    Cookies.remove('token');
    setIsUser(false);
    router.push('/login');
  }

  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, [token])

  return (
    <>
      {
        isUser ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image className="selectedColor" src='/Icon/Personal.svg' width={'15'} height={'15'} alt={''} />
              <Link href='/dashboard'>
                <h1 style={{ color: 'white', marginLeft: '5px', cursor: 'pointer' }}>{user?.name}</h1>
              </Link>
              {/* <button
                onClick={() => setShowLogoutPopup(true)} // Show popup when clicking logout
                className='text-white ml-4 bg-red-600 px-3 py-2 rounded-md hover:bg-red-700'>
                Logout
              </button> */}
              <LogOutIcon className="text-white ml-4" size={20} onClick={() => setShowLogoutPopup(true)} />
            </div>

            {/* Logout Confirmation Popup */}
            {showLogoutPopup && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h2>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-black text-white rounded mr-2"
                      onClick={() => setShowLogoutPopup(false)} // Close popup without logging out
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red text-white rounded hover:bg-red-700"
                      onClick={handleLogout} // Perform logout
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className='flex'>
              <Link href='/login'>
                <button className='lg:flex justify-end text-xl font-semibold py-2 px-3 lg:px-6 navbutton text-white m-2'>Login</button>
              </Link>
            </div>
          </>
        )
      }
    </>
  )
}

export default Actions;
