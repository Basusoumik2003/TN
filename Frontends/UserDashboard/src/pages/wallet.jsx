import React, { useEffect, useState } from 'react';

import { FaTrophy, FaCoins, FaCreditCard } from "react-icons/fa";
import '../styles/wallet.css';

const WalletPopup = ({ onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [credit, setCredit] = useState(0);
const userId = localStorage.getItem("userId");
useEffect(() => {
  const fetchCredit = async () => {
    try {
      const res = await fetch(`https://add-asset-service.onrender.com/api/credits/${userId}`);
      const data = await res.json();

      // Make sure it's a number
      const value = Number(data.token_value);
      setCredit(isNaN(value) ? 0 : value);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
      setCredit(0);
    }
  };

  fetchCredit();
}, [userId]);


  const handleConnectMetaMask = () => {
    setIsConnected(true);
  };

  return (
    <div className="wallet-popup-container">
      {/* Cross icon in top right */}
      <span className="wallet-close-icon" onClick={onClose}>×</span>


      <h3>My Wallet</h3>
      {/* <p className={`status ${isConnected ? 'connected' : 'not-connected'}`}>
        ⬤ {isConnected ? 'Connected' : 'Not Connected'}
      </p> */}

      <div className="wallet-details">
        <div className="detail">
          <FaTrophy style={{ color: "#FFD700", marginRight: "8px" }} />
          Game Points <strong>2,450</strong>
        </div>
        <div className="detail">
          <FaCoins style={{ color: "#FFA500", marginRight: "8px" }} />
          Gold Coins <strong>1,250</strong>
        </div>
        <div className="detail">
  <FaCreditCard style={{ color: "#4CAF50", marginRight: "8px" }} />
   Carbon Credits <strong>{credit.toFixed(2)}</strong>
</div>

      </div>

     

     
      {/* <button className="connect-button" onClick={handleConnectMetaMask}>
        Connect MetaMask
      </button> */}
      <button className="marketplace-button">Marketplace</button>
    </div>
  );
};

export default WalletPopup;
