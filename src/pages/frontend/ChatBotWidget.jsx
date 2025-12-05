import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'framework7-react';
import ChatBotImg from '../../assets/images/chatbot.png';
// import chatbotwidgetImg from '../../assets/images/chatbotwidget.png';


const ChatBotWidget = ({ languageData }) => {
  return (
    <>
      <div className="chat-bot-widget">
        <Link href="/chat-page" className="button vibrate">
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
        .chat-bot-widget .button:hover {
          background-color: #fff;
        }

        .vibrate {
  animation: vibrate 0.2s linear infinite;
}

@keyframes vibrate {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.pulse {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  animation: pulseAnim 1.5s infinite;
}

@keyframes pulseAnim {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}
      .chat-bot-widget .button {
        border: 2px solid #0c64bc;
        border-radius: 50%; 
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
