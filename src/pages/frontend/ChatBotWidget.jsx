import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'framework7-react';
import ChatBotImg from '../../assets/images/chatbot.png';
// import chatbotwidgetImg from '../../assets/images/chatbotwidget.png';


const ChatBotWidget = ({ languageData }) => {
  return (
    <>
      <div className="chat-bot-widget">
        <Link href="/chat-page" className="button">
          {/* {"languageData.openChat" || 'Open Chat'} */}
          <img src={ChatBotImg} alt="Chat Bot" style={{ width: '30px', height: '30px' }} />
        </Link>
      </div>
      <style>
        {`
      .chat-bot-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      } 
      .chat-bot-widget .button {
        background-color: #ff2435;
        color: white;
        border-radius: 10%; 
        width: 60px;
        height: 60px;
        display: flex;  
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
        font-size: 24px;
        text-decoration: none;
      }
        
      `}
      </style>
    </>
  );
};
export default ChatBotWidget;
