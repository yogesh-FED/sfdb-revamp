import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  Panel,
  List,
  ListItem,
} from "framework7-react";

export default function ChatBotWidgetPage({ f7router, user }) {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [botTyping, setBotTyping] = useState(false); // <-- loader state
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      const saved = JSON.parse(localStorage.getItem("chat_history") || "[]");
      setChatHistory(saved);
    }
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const createNewChat = () => {
    const newId = Date.now();
    setCurrentChatId(newId);
    setMessages([]);
  };

  const saveChatToStorage = (chatId, messages) => {
    if (!user) return;

    let updatedHistory = [...chatHistory];
    const existingIndex = updatedHistory.findIndex((c) => c.id === chatId);

    if (existingIndex >= 0) {
      updatedHistory[existingIndex].messages = messages;
    } else {
      updatedHistory.push({
        id: chatId,
        title: messages[0]?.text?.slice(0, 20) || "New Chat",
        messages,
      });
    }

    setChatHistory(updatedHistory);
    localStorage.setItem("chat_history", JSON.stringify(updatedHistory));
  };

  const loadChat = (chat) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    f7router.closePanel("left");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    const updatedList = [...messages, newMsg];
    setMessages(updatedList);

    if (!currentChatId) {
      setCurrentChatId(Date.now());
    }

    const userText = input;
    setInput("");

    // Show loader
    setBotTyping(true);

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: "Bot reply here. Connect your ChatGPT API.",
      };

      const finalMessages = [...updatedList, botReply];
      setMessages(finalMessages);
      setBotTyping(false);

      saveChatToStorage(currentChatId || Date.now(), finalMessages);
    }, 900);
  };

  return (
    <Page name="chatbot" className="chatbotPage">

      {/* LEFT PANEL (Sidebar with chat history) */}
      <Panel left cover themeDark>
        <Block strong>
          <h3 style={{ color: "#fff", marginTop: 0 }}>Chats</h3>
          <Button fill small color="green" onClick={createNewChat}>
            + New Chat
          </Button>
          <List mediaList className="chat-list">
            {chatHistory.length === 0 && <ListItem title="No chats yet" />}
            {chatHistory.map((chat) => (
              <ListItem
                key={chat.id}
                title={chat.title}
                subtitle={chat.messages[0]?.text}
                after="Open"
                link
                onClick={() => loadChat(chat)}
              />
            ))}
          </List>
        </Block>
      </Panel>

      {/* CHAT AREA */}
      <Block className="chatbotPage_block" style={{ paddingBottom: "90px", marginTop: "4rem" }}>
        <div className="chat-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.from}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}

          {/* Bot typing loader */}
          {botTyping && (
            <div className="message-row bot">
              <div className="bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </Block>

      {/* INPUT BAR */}
      <div className="chat-input-bar">
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button fill small onClick={sendMessage} className="send-btn">
            Send
          </Button>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .message-row {
          display: flex;
        }

        .message-row.user {
          justify-content: flex-start;
        }

        .message-row.bot {
          justify-content: flex-start;
        }

        .bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 5px;
          background-color: #fff;
          font-size: 15px;
          line-height: 1.4;
        }

        .message-row.user .bubble {
          background-color: #007aff;
          color: white;
          word-wrap: break-word;
        }

        .typing {
          background: #fff;
          display: flex;
          gap: 3px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: #555;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }

        .chat-input-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 80%;
          padding: 1.5rem;
          background: white;
          border-top: 1px solid #ccc;
          z-index: 999;
          margin: 0 auto;
          right: 0;
          border-radius: 15px;
          margin-bottom: 10px;
        }

        .chat-input-wrapper {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .chat-input {
          flex-grow: 1;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
        }

        .send-btn {
          white-space: nowrap;
        }

        .chat-list .item-title {
          color: #fff;
        }
      `}</style>
    </Page>
  );
}
