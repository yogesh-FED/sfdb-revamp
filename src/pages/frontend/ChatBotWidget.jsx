import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'framework7-react';
import ChatBotImg from '../../assets/images/chatbot.png';
// import chatbotwidgetImg from '../../assets/images/chatbotwidget.png';
import '../frontend/chatStyle.css';


const ChatBotWidget = ({ languageData }) => {
  return (
    <>
      <div className="chat-bot-widget">
        <Link href="/chat-page" className="button vibrate" onClick={() => {
          sessionStorage.setItem("chat_open_mode", "fresh");
        }}>
          {/* {"languageData.openChat" || 'Open Chat'} */}
          <img src={ChatBotImg} alt="Chat Bot" style={{ width: '30px', height: '30px' }} />
        </Link>
      </div>
    </>
  );
};
export default ChatBotWidget;
