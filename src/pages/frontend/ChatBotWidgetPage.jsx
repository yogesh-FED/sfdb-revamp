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
  const eligibilitySteps = [
    { key: "age", question: "Please tell us your age?", options: ["18", "26", "41"] },
    { key: "income", question: "Please tell us your annual income?", options: ["Below 2L", "2.5 Lakhs", "Above 5L"] },
    { key: "community", question: "Please tell us  your community", options: ["General", "OBC", "SC", "ST"] },
    { key: "gender", question: "Please tell us  your gender", options: ["Male", "Female"] },
    { key: "maritalStatus", question: "Please tell us your Marital status?", options: ["Single", "Married"] },
  ];

  const [currentStep, setCurrentStep] = useState(-1);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});

  const store = f7.store;
  const [loadFlag, setLoadFlag] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [allSchemeAndDesc, setAllSchemeAndDesc] = useState([]);
  // NEW STATE → input box hidden until user selects an option
  const [showInputBox, setShowInputBox] = useState(false);
  const [showTotal, setShowTotal] = useState(0);
  const chatEndRef = useRef(null);
  // const chatContainerRef = useRef(null)

  // replace the scroll effect with:
  // useEffect(() => {
  //   const el = chatContainerRef.current;
  //   if (!el) return;
  //   const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  //   if (distanceFromBottom < 40) {
  //     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  //   }
  // }, [messages, botTyping]);

  useEffect(() => {
    if (user) {
      const saved = JSON.parse(localStorage.getItem("chat_history") || "[]");
      setChatHistory(saved);
    }
  }, [user]);

  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, botTyping]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages, botTyping]);

  const createNewChat = () => {
    const newId = Date.now();
    setCurrentChatId(newId);
    setMessages([]);
    setShowInputBox(false); // hide input until user chooses category again
  };
  // const buildEligibilitySummary = (answers) => {
  //   return `I am ${answers.age} years old, my income is ${answers.income}, I belong to ${answers.community} community, I am ${answers.gender} and ${answers.maritalStatus}`;
  // };

  const buildEligibilitySummary = (answers) => {
    return `📋 Your Details:
• Age: ${answers.age}
• Income: ${answers.income}
• Community: ${answers.community}
• Gender: ${answers.gender}
• Marital Status: ${answers.maritalStatus}`;
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

  const startEligibilityFlow = () => {
    setEligibilityAnswers({});
    setCurrentStep(0);
    setShowInputBox(false); // 👈 hide input during questions

    setMessages(prev => ([
      ...prev,
      {
        from: "bot",
        text: {
          question: eligibilitySteps[0].question,
          options: eligibilitySteps[0].options,
        },
      },
    ]));
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



  const sendMessage = async () => {
    debugger;
    if (input.trim().toLowerCase() === "hi" && currentStep === -1) {
      setMessages(prev => ([...prev, { from: "user", text: input }]));
      setInput("");
      startEligibilityFlow();
      return;
    }
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    const updatedList = [...messages, newMsg];
    setMessages(updatedList);
    try {
      let response = await store.dispatch('getChatMsg', input);
      console.log('chat-response', response.total);
      setShowTotal(response.total);

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
          setAllSchemeAndDesc(botResponse);
          // const botReplyResponse = Object.values(botResponse).map(item => item.scheme_name, item.scheme_description.english);
          const botReplyResponse = Object.values(botResponse).map(item => ({
            name: item.scheme_name,
            desc: item.scheme_description.english
          }));
          console.log('botReplyResponse', botReplyResponse);
          const botMsg = {
            from: "bot",
            text: botReplyResponse,
            class: 'botResponse',
          };
          finalMessages = [...updatedList, botMsg];
        }

        setMessages(finalMessages);
        setBotTyping(false);

        saveChatToStorage(currentChatId || Date.now(), finalMessages);

      }, 900);

    }
    catch (err) {
      console.log(err);
    }
    finally {

    }


  };


  const handleEligibilityAnswer = (answer) => {
    const stepKey = eligibilitySteps[currentStep].key;

    setMessages(prev => ([
      ...prev,
      { from: "user", text: answer }
    ]));

    const updatedAnswers = {
      ...eligibilityAnswers,
      [stepKey]: answer,
    };

    setEligibilityAnswers(updatedAnswers);

    const nextStep = currentStep + 1;

    if (nextStep < eligibilitySteps.length) {
      setCurrentStep(nextStep);

      setMessages(prev => ([
        ...prev,
        {
          from: "bot",
          text: {
            question: eligibilitySteps[nextStep].question,
            options: eligibilitySteps[nextStep].options,
          },
        },
      ]));
    }
    else {
      setCurrentStep(-1);
      setShowInputBox(true);

      const finalAnswers = {
        ...eligibilityAnswers,
        [stepKey]: answer,
      };

      const summaryText = buildEligibilitySummary(finalAnswers);
      const sentence = buildEligibilitySentence(finalAnswers);

      // 👤 show summary as BOT log in chat
      setMessages(prev => ([
        ...prev,
        {
          from: "bot",
          text: summaryText,
          class: "eligibilitySummary",
        }
      ]));

      // 🤖 show processing message
      // setMessages(prev => ([
      //   ...prev,
      //   {
      //     from: "bot",
      //     // text: "🔍 Finding the best schemes for you...",
      //   }
      // ]));

      // 🔥 auto trigger API
      setTimeout(() => {
        sendEligibilityMessage(sentence);
      }, 600);
    }


  };
  const buildEligibilitySentence = (answers) => {
    return `I am ${answers.age} years old, my income is ${answers.income}, I belong to ${answers.community} community, I am ${answers.gender} and ${answers.maritalStatus}`;
  };


  const sendEligibilityMessage = async (text) => {
    setBotTyping(true);

    try {
      let response = await store.dispatch("getChatMsg", text);
      setShowTotal(response.total);

      if (response.type === "greeting" || response.total === 0) {
        setMessages(prev => ([
          ...prev,
          response,
        ]));
      } else {
        const botResponse = response.reply.reply;

        const botReplyResponse = Object.values(botResponse).map(item => ({
          name: item.scheme_name,
          desc: item.scheme_description.english,
        }));

        const botMsg = {
          from: "bot",
          text: botReplyResponse,
          class: "botResponse",
        };

        // ✅ APPEND — DO NOT REPLACE
        setMessages(prev => ([
          ...prev,
          botMsg,
        ]));
      }

      saveChatToStorage(currentChatId || Date.now(), [
        ...messages,
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setBotTyping(false);
    }
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
        {/* <div className="chat-container"> */}
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
            <>
              {
                typeof msg.text === "object" && msg.text?.options ? (
                  <>
                    <div className="getInputs"
                      ref={idx === messages.length - 1 ? chatEndRef : null}
                    >
                      <p>{msg.text.question}</p>
                      <div className="flex-list-item">
                        {msg.text.options.map((opt, i) => (
                          <button
                            key={i}
                            className="pill-item gradient-btn"
                            onClick={() => handleEligibilityAnswer(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : <div
                  ref={idx === messages.length - 1 ? chatEndRef : null}
                  key={idx}
                  className={`message-row ${msg.from} ${msg.class}`}>
                  <div className="bubble">
                    {
                      Array.isArray(msg.text)
                        ? (
                          <>
                            <div className="showsCountOfSchemes">
                              <h4>Based on your provided details, </h4>
                              <p>Below are the top <b>{msg.text.length}</b> {msg.text.length > 1 ? 'schemes' : 'scheme'} relevant to you:</p>
                            </div>
                            <div className="flex-list">
                              {msg.text.map((item, i) => (
                                <span key={i} className="pill-item gradient-btn">
                                  {item.name}
                                </span>
                              ))}
                            </div>
                            <p className="colorBlk">Below you can see the description of <b>{msg.text.length}</b> {msg.text.length > 1 ? 'schemes' : 'scheme'}</p>
                            <div className="allSchemesandDesc">
                              {
                                msg.text.map((item, i) => {
                                  return (
                                    <>
                                      <h4>
                                        {i + 1} : {item.name} :
                                      </h4>
                                      <p>
                                        {item.desc} <br />
                                        <span className="applyBtn"><a href=''>Apply</a></span>
                                      </p >
                                    </>
                                  )
                                })
                              }
                            </div>
                            {/* <div className="chatSchemeDesc">
                          {msg.text.map((item, i) => (
                            <span key={i} className="pill-item gradient-btn">
                              {item}
                            </span>
                          ))}
                        </div> */}
                            {/* <div className="showsCountOfSchemes">
                          <p>Want to know more about the schemes, Tell me the scheme name or number, and I’ll show more details.</p>
                        </div> */}
                          </>
                        )
                        : msg.text || msg.reply
                    }
                  </div>
                </div>
              }

            </>

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
      {
        showInputBox && (
          <div className="chat-input-bar">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Say Hi to Know your Eligibility"
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
        )
      }

      {/* STYLES */}
      <style>{`
      .applyBtn a {
      font-size:12px;
    background: #005bc1;
    display: inline-block;
    padding: .5rem;
    border-radius: 5px;
    color: #fff;
}
      .botResponse {
        border-bottom: 1px solid #fff;
        padding-top: 1rem;
        padding-bottom: 2rem;
      }
        .flex-list-item {
        display: flex;
        gap: 10px;
        }
      .flex-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .gradient-btn {
        background: linear-gradient(90deg, #ff4f9a, #7b61ff);
        color: #fff;
        padding: 10px 22px;
        border-radius: 10px;
        font-size: 14px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
      }
      .pill-item {
        padding: 8px 14px;
        border-radius: 20px;
        font-size: 14px;
        white-space: nowrap;
      }
      .flex-list-item .pill-item {
        width: max-content;
      }

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
        .botResponse .bubble {
        background: transparent;
        }
        .showsCountOfSchemes, .colorBlk {
          color: #222;
        }
          .allSchemesandDesc {
           color: #222;
          padding: 2rem;
          margin-top: 1rem;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 15px;
          }
            .allSchemesandDesc h4 {
            margin-bottom: 0;
            }
            .allSchemesandDesc p{
            margin-top: 5px;
            }
            .getInputs {
            border-bottom: 1px solid #fff;
            padding-bottom: 1rem;
            }
            .eligibilitySummary .bubble {
              background: rgba(255, 255, 255, 0.85);
              color: #222;
              font-size: 14px;
              line-height: 1.6;
              border-radius: 12px;
            }
      `}</style>
    </Page >
  );
}
