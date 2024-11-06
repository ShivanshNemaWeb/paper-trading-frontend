'use client';
import { useState } from 'react';
import AsideBar from '../dashboard/Components/AsideBar';
import Navbar from '../dashboard/Components/Navbar';
import MoneyState from '../dashboard/Components/MoneyState';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal
import Cookies from 'js-cookie';
import constants from '../../constants.json'
import {baseUrl} from '../../constants.json'
const Wallet = () => {
  const baseUrl = constants.baseUrl
  const [showPopup, setShowPopup] = useState(false);
  const [withdrawalPopup, setWithdrawalPopup] = useState(false);
  const [withdrawlAmount, setwithdrawlAmount] = useState('');
  const [amount, setAmount] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleDeposit = async () => {
    const token = Cookies.get('token');
    const url = `${baseUrl}/wallet`;

    try {
      setLoadingAdd(true); // Set loading state
      const response = await axios.post(url, {amount: parseInt(amount)} , {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Amount added to wallet successfully!'
        });
        setAmount("");
        setShowPopup(false); // Close the popup after success
      }
    } catch (error) {
      console.error("Error adding amount to wallet:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.'
      });
    } finally {
      setLoadingAdd(false); // Reset loading state
    }
  };

  const handleWithdraw = async () => {
    const token = Cookies.get('token');
    const url = `${baseUrl}/wallet/withdraw`;

    try {
      setLoadingWithdraw(true); // Set loading state
      const response = await axios.post(url, { amount: withdrawlAmount, upiId:upiId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Withdrawal request successful!'
        });
        setwithdrawlAmount('');
        setWithdrawalPopup(false); // Close the popup after success
      }
      else if(response.status===404 || response.status==400){
        Swal.fire({
          icon: 'error',
          title: 'Fail',
          text: response.data
        });
        setwithdrawlAmount('');
        setWithdrawalPopup(false); // Close the popup after success
      }
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      Swal.fire({
        icon: 'error',
        title: 'Fail',
        text: 'Something went wrong. Please try again later.'
      });
    } finally {
      setLoadingWithdraw(false); // Reset loading state
    }
  };

  const handleAdd = () => {
    handleDeposit(); // Call handleDeposit when Add is clicked
  };

  return (
    <>
    <div style={{display:'flex'}}>
    <AsideBar />
      <div style={{ marginTop: "4%"}}>
        <div className='flex flex-wrap mt-8 sm:mt-0'>
          <MoneyState />
        </div>
        <section className='flex flex-col sm:flex-col sm:space-x-4 space-y-4 sm:space-y-0 items-center'>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full mb-5'>
            <article className='flex-1 bg-sidebar rounded-lg flex flex-col h-full'>
              <div className='z-1000' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "12%",  }}>
                <button
                  style={{ color: "white", backgroundColor: "green", padding: "10px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "2%" }}
                  onClick={() => setShowPopup(true)} // Open popup on click
                >
                  <Image className="selectedColor" src="/Icon/wallet-2.svg" width={'18'} height={'18'} alt={''} /> <span>{loadingAdd ? 'Sending...' : 'Add to Wallet'}</span>
                </button>
                <button
                  style={{ color: "white", backgroundColor: "gray", padding: "10px", borderRadius: "7px", display: "flex", justifyContent: "center", alignItems: "center" }}
                  onClick={() => setWithdrawalPopup(true)}
                >
                  <span>{loadingWithdraw ? 'Sending...' : 'Request Withdrawal'}</span>
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

      {/* Modal Popup for Add */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-1/3 w-2/3">
            <h2 className="text-xl mb-4">Add to Wallet</h2>
            
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter amount"
            />
           
            <div className="flex justify-end">
              <button
                onClick={handleAdd}
                className={`bg-green-500 text-white p-2 rounded mr-2 ${loadingAdd ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: "green" }}
                disabled={loadingAdd} // Disable button when loading
              >
                {loadingAdd ? 'Sending...' : 'Add'}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white p-2 rounded"
                style={{ backgroundColor: "gray" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Popup for Withdrawal */}
      {withdrawalPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-1/3 w-2/3">
            <h2 className="text-xl mb-4">Request Withdrawal</h2>
            <input
              type="number"
              value={withdrawlAmount}
              onChange={(e) => setwithdrawlAmount(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter amount"
            />
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter UPI ID"
            />
            <div className="flex justify-end">
              <button
                onClick={handleWithdraw}
                className={`bg-green-500 text-white p-2 rounded mr-2 ${loadingWithdraw ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: "green" }}
                disabled={loadingWithdraw} // Disable button when loading
              >
                {loadingWithdraw ? 'Sending...' : 'Withdraw'}
              </button>
              <button
                onClick={() => setWithdrawalPopup(false)}
                className="bg-gray-500 text-white p-2 rounded"
                style={{ backgroundColor: "gray" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;

