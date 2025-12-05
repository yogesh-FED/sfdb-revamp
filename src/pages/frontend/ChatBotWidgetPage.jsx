import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  Panel,
  List,
  ListItem,
  f7
} from "framework7-react";

export default function ChatBotWidgetPage({ f7router, user }) {
  const store = f7.store;
  const [loadFlag, setLoadFlag] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [botTyping, setBotTyping] = useState(false);

  // NEW STATE → input box hidden until user selects an option
  const [showInputBox, setShowInputBox] = useState(false);

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
    setShowInputBox(false); // hide input until user chooses category again
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

    // once a chat is selected, user can type normally
    setShowInputBox(true);
    f7router.closePanel("left");
  };

  // NEW → handle option click
  const handlePreChatOption = (optionText) => {
    const botWelcome = {
      from: "bot",
      text: `You selected: ${optionText}. How can I assist further?`,
      class: 'selectedOption',
    };

    setMessages([botWelcome]);
    setShowInputBox(true);

    if (!currentChatId) {
      setCurrentChatId(Date.now());
    }
    setLoadFlag(true);
  };

  // const sendMessage = async () => {
  //   debugger;
  //   if (!input.trim()) return;

  //   const newMsg = { from: "user", text: input };
  //   const updatedList = [...messages, newMsg];
  //   setMessages(updatedList);
  //   let response = await store.dispatch('getChatMsg', input);
  //   console.log('chat-response', response.reply.reply);
  //   if (!currentChatId) setCurrentChatId(Date.now());
  //   const userText = input;
  //   setInput("");

  //   setBotTyping(true);

  //   setTimeout(() => {
  //     const botResponse = response.reply.reply;
  //     const botReplyResponse = Object.values(botResponse).map((item, i) => {
  //       return (
  //         item.scheme_name
  //       )
  //     })
  //     console.log('botResponse', botReplyResponse);
  //     // const finalMessages = [...updatedList, botReply];
  //     const finalMessages = [...updatedList, botReplyResponse];
  //     console.log('finalMessages', finalMessages);
  //     setMessages(finalMessages);
  //     setBotTyping(false);
  //     saveChatToStorage(currentChatId || Date.now(), finalMessages);
  //   }, 900);
  // };

  const sendMessage = async () => {
    debugger;
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    const updatedList = [...messages, newMsg];
    setMessages(updatedList);

    let response = await store.dispatch('getChatMsg', input);
    console.log('chat-response', response.type);

    if (!currentChatId) setCurrentChatId(Date.now());

    setInput("");
    setBotTyping(true);

    setTimeout(() => {
      let finalMessages;
      if (response.type === 'greeting' || response.total === 0) {
        const botReply = response;
        finalMessages = [...updatedList, botReply];
      } else {
        const botResponse = response.reply.reply;
        const botReplyResponse = Object.values(botResponse).map(item => item.scheme_name);

        console.log('botResponse', botReplyResponse);

        const botMsg = {
          from: "bot",
          text: botReplyResponse
        };

        finalMessages = [...updatedList, botMsg];
      }

      setMessages(finalMessages);
      setBotTyping(false);

      saveChatToStorage(currentChatId || Date.now(), finalMessages);

    }, 900);
  };


  // console.log('message', messages);
  return (
    <Page name="chatbot" className="chatbotPage">
      {/* LEFT PANEL (Sidebar) */}
      <Panel left cover themeDark>
        <Block strong>
          <h3 style={{ color: "#fff", marginTop: 0 }}>Chats</h3>
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
          {/* BEFORE input → Show two options */}
          {!showInputBox && messages.length === 0 && (
            <div className="prechat-options">
              <p className="chatHead">Choose to discover scheme benefits or understand portal features.</p>

              <div className="questions">
                <Button
                  fill
                  color="blue"
                  onClick={() => handlePreChatOption("Schemes Information")}
                  style={{ marginBottom: "10px" }}
                >
                  Schemes Information
                </Button>

                <Button
                  fill
                  color="orange"
                  onClick={() => handlePreChatOption("Portal Guidance")}
                >
                  Portal Guidance
                </Button>
              </div>
            </div>
          )}

          {/* Normal Messages */}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.from} ${msg.class}`}>
              <div className="bubble">
                {
                  Array.isArray(msg.text) ? msg.text.map((item, i) => <p> <span> {i + 1}. </span> {item}</p>)
                    :
                    msg.text || msg.reply
                }
                {/* {
                  Array.isArray(msg.text) ? msg.text.map((item, i) => <span className="result"> <span> {i + 1}. </span> {item} &nbsp; </span>)
                    :
                    msg.text || msg.reply
                } */}
              </div>
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

      {/* INPUT BOX (ONLY AFTER OPTION SELECTED) */}
      {showInputBox && (
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
            {showInputBox && (
              <div className="back-select-btn">
                <Button
                  outline
                  small
                  color="gray"
                  onClick={() => {
                    setShowInputBox(false);
                    setMessages([]); // optional: reset chat
                  }}
                >
                  ← New Chat
                </Button>
                {/* <Button fill small color="green" onClick={createNewChat}>
                  + New Chat
                </Button> */}
              </div>
            )}
            <Button fill small onClick={sendMessage} className="send-btn">
              Send
            </Button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
      .selectedOption .bubble {
          background: #0c64bc;
          color: #ffffff;
          font-size: 14px;
          border-radius: 50px;
          margin: auto;
        }
      .chatHead {
        width: 500px;
        margin: auto;
        font-size: 30px;
      }

      .questions {
        display: flex;
        flex-direction: row;
        text-align: center;
        margin-top: 30px;
        gap: 1rem;
        justify-content: center;
      }

      .chat-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        overflow: auto;
        margin: auto;
        width: 85%;
        height: 60vh;
      }

      .chat-container::-webkit-scrollbar {
        width: 5px;
      }

      .chat-container::-webkit-scrollbar-track {
        background: #eee;
      }

      .chat-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }

      .chat-container::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      .prechat-options {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-top: 30px;
        border-radius: 15px;
        padding: 3rem;
      }

      /* NEW BACK BUTTON STYLE */
      .back-select-btn {
        display: flex;
        justify-content: center;
      }

      .back-select-btn .button {
        background: rgba(255, 255, 255, 0.7);
        border-color: #999;
        color: #333;
        backdrop-filter: blur(6px);
        border-radius: 8px;
      }

      .message-row {
        display: flex;
      }

      .message-row.user {
        justify-content: flex-end;
      }

      .message-row.bot {
        justify-content: flex-start;
      }

      .bubble {
        padding: 10px 15px;
        border-radius: 15px;
        background: #005bc1;
        color: #fff;
        font-size: 15px;
        line-height: 1.4;
      }

      .message-row.user .bubble {
         background-color: #fff;
        color: #222;
        word-wrap: break-word;
        border-radius: 50px;
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
