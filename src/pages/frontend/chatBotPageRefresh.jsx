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
import { Icon } from "framework7-react";
import './chatStyle.css';

export default function ChatBotWidgetPage({ f7router, user }) {
  const eligibilitySteps = [
    { key: "age", question: "Please tell us your age?", options: ["18", "26", "41"] },
    { key: "income", question: "Please tell us your annual income?", options: ["Below 2L", "2.5 Lakhs", "Above 5L"] },
    { key: "community", question: "Please tell us  your community", options: ["General", "OBC", "SC", "ST"] },
    { key: "gender", question: "Please tell us  your gender", options: ["Male", "Female", "Transgender"] },
    { key: "maritalStatus", question: "Please tell us your Marital status?", options: ["Single", "Married"] },
  ];
  const CHAT_STEPS = {
    PRECHAT: "PRECHAT",
    ELIGIBILITY_FORM: "ELIGIBILITY_FORM",
    SCHEME_RESULT: "SCHEME_RESULT",
  };
  const [chatStep, setChatStep] = useState(CHAT_STEPS.PRECHAT);
  const [showReopenFormBtn, setShowReopenFormBtn] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);
  const lastEligibilityFormRef = useRef(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    income: "",
    community: "",
    maritalStatus: "",
    disability: "",
    disabilityPercentage: "",
    srilankaRefugee: "",
    occupation: "",
    farmerType: "",
    studentType: "",
    collegeType: "",
    schoolType: "",
    studentClass: "",
    fishingType: "",
    govtSchool612: "",
    boatOwner: "",
    educationQualification: "",
    memberType: "",
    bpl: "",
  });
  const emptyFormData = {
    age: "",
    gender: "",
    income: "",
    community: "",
    maritalStatus: "",
    disability: "",
    srilankaRefuge: ""
  };
  const store = f7.store;
  const [loadFlag, setLoadFlag] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [allSchemeAndDesc, setAllSchemeAndDesc] = useState([]);

  const [showInputBox, setShowInputBox] = useState(false);
  const [showTotal, setShowTotal] = useState(0);
  const chatEndRef = useRef(null);
  const eligibilityFormRef = useRef(null);
  // useEffect(() => {
  //   const savedState = localStorage.getItem("chat_ui_state");
  //   if (savedState) {
  //     const parsed = JSON.parse(savedState);
  //     setChatStep(parsed.chatStep || CHAT_STEPS.PRECHAT);
  //     setMessages(parsed.messages || []);
  //     setShowInputBox(parsed.showInputBox || false);
  //     setShowReopenFormBtn(parsed.showReopenFormBtn || false);
  //   }
  // }, []);
  useEffect(() => {
    const savedState = localStorage.getItem("chat_ui_state");

    if (!savedState) return;

    const parsed = JSON.parse(savedState);

    setChatStep(parsed.chatStep || CHAT_STEPS.PRECHAT);
    setMessages(parsed.messages || []);
    setShowInputBox(parsed.showInputBox || false);
    setShowReopenFormBtn(parsed.showReopenFormBtn || false);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chat_ui_state",
      JSON.stringify({
        chatStep,
        messages,
        showInputBox,
        showReopenFormBtn,
      })
    );
  }, [chatStep, messages, showInputBox, showReopenFormBtn]);

  useEffect(() => {
    if (user) {
      const saved = JSON.parse(localStorage.getItem("chat_history") || "[]");
      setChatHistory(saved);
    }
  }, [user]);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages, botTyping]);
  const isEligibilityTrigger = (text) => {
    if (!text) return false;

    const normalized = text.toLowerCase().trim();

    const triggers = [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good evening",
      "good afternoon",
      "eligibility",
      "check eligibility",
      "scheme eligibility",
      "find schemes",
    ];

    return triggers.some(t => normalized.includes(t));
  };

  // const buildEligibilitySummary = (answers) => {
  //   return `I am ${answers.age} years old, my income is ${answers.income}, I belong to ${answers.community} community, I am ${answers.gender} and ${answers.maritalStatus}`;
  // };
  // const buildFormSentence = (data) => {
  //   const parts = [];

  //   if (data.age) parts.push(`I am ${data.age} years old`);
  //   if (data.gender) parts.push(`I am ${data.gender}`);
  //   if (data.income) parts.push(`my income is ${data.income}`);
  //   if (data.community) parts.push(`I belong to ${data.community} community`);
  //   if (data.maritalStatus) parts.push(`I am ${data.maritalStatus}`);
  //   if (data.disability) parts.push(`Disability: ${data.disability}`);
  //   if (data.srilankaRefugee) parts.push(`Sri Lanka refugee: ${data.srilankaRefugee}`);

  //   return parts.join(", ");
  // };

  const buildFormSentence = (data) => {
    const parts = [];

    // Basic details
    if (data.age) parts.push(`I am ${data.age} years old`);
    if (data.gender) parts.push(`I am ${data.gender}`);
    if (data.income) parts.push(`my income is ${data.income}`);
    if (data.community) parts.push(`I belong to ${data.community} community`);
    if (data.maritalStatus) parts.push(`I am ${data.maritalStatus}`);
    if (data.disability) parts.push(`Disability: ${data.disability}`);

    // Occupation
    if (data.occupation) {
      parts.push(`My occupation is ${data.occupation}`);

      /* ========= FARMER ========= */
      if (data.occupation === "Farmer" && data.farmerType) {
        parts.push(`I am a ${data.farmerType} farmer`);
      }

      /* ========= STUDENT ========= */
      if (data.occupation === "Student" && data.studentType) {
        parts.push(`I am a ${data.studentType} student`);

        // School student
        if (data.studentType === "School") {
          if (data.schoolType)
            parts.push(`studying in a ${data.schoolType} school`);

          if (data.studentClass)
            parts.push(`currently studying in class ${data.studentClass}`);
        }

        // College student
        if (data.studentType === "College") {
          if (data.collegeType)
            parts.push(`studying in a ${data.collegeType} college`);

          if (data.govtSchool612)
            parts.push(
              `my schooling from 6th to 12th was in a government school: ${data.govtSchool612}`
            );
        }
      }

      /* ========= FISHERMAN ========= */
      if (data.occupation === "Fisherman" && data.fishingType) {
        parts.push(`I am a ${data.fishingType} fisherman`);

        if (data.govtSchool612)
          parts.push(
            `my schooling from 6th to 12th was in a government school: ${data.govtSchool612}`
          );
      }
    }

    return parts.join(", ") + ".";
  };


  const handleNo = () => {
    setShowIntro(false);
    f7.views.main.router.navigate('/', {
      clearPreviousHistory: true,
      ignoreCache: true,
    });
  }
  const clearChatSession = () => {
    localStorage.removeItem("chat_ui_state");
    localStorage.removeItem("chat_history");
  };

  const handleFormClose = () => {
    clearChatSession();
    setMessages([]);
    setInput("");
    setBotTyping(false);
    setCurrentChatId(null);
    setShowEligibilityForm(false);
    setShowInputBox(true);
    setShowReopenFormBtn(true);
    setChatStep(CHAT_STEPS.SCHEME_RESULT);
    f7.views.main.router.navigate('/', {
      clearPreviousHistory: true,
      ignoreCache: true,
    });
  }

  // const handleEligibilityFormSubmit = () => {
  //   debugger;
  //   if (!formData.age || !formData.gender || !formData.maritalStatus) {
  //     f7.toast.create({
  //       text: 'Please fill Age, Gender and Marital Status',
  //       position: 'top',
  //       closeTimeout: 2000,
  //     }).open();
  //     return;
  //   }
  //   const payload = buildEligibilityPayload(formData);
  //   console.log("FINAL PAYLOAD", payload);
  //   const sentence = buildFormSentence(formData);

  //   setShowEligibilityForm(false);
  //   setShowInputBox(true);
  //   setShowReopenFormBtn(true);

  //   setMessages(prev => [...prev, { from: "user", text: sentence }]);

  //   setTimeout(() => {
  //     // sendEligibilityMessage(sentence);
  //     sendEligibilityMessage(payload);
  //   }, 500);
  // };

  const handleEligibilityFormSubmit = () => {
    if (!formData.age || !formData.gender || !formData.maritalStatus) {
      f7.toast.create({
        text: 'Please fill Age, Gender and Marital Status',
        position: 'top',
        closeTimeout: 2000,
      }).open();
      return;
    }

    const payload = buildEligibilityPayload(formData);

    lastEligibilityFormRef.current = { ...formData };

    const sentence = buildFormSentence(formData);

    setShowEligibilityForm(false);
    setShowInputBox(true);
    setShowReopenFormBtn(true);

    setMessages(prev => [
      ...prev,
      { from: "user", text: sentence }
    ]);
    setChatStep(CHAT_STEPS.SCHEME_RESULT);
    setTimeout(() => {
      sendEligibilityMessage(payload);
    }, 500);
  };



  const ageOptions = [
    ...Array.from({ length: 59 }, (_, i) => String(i + 1)),
    "60 and Above"
  ];

  const buildEligibilitySummary = (answers) => {
    return `📋 Your Details:
      • Age: ${answers.age}
      • Income: ${answers.income}
      • Community: ${answers.community}
      • Gender: ${answers.gender}
      • Marital Status: ${answers.maritalStatus}`;
  };

  const buildEligibilityPayload = (formData) => {
    debugger;
    const payload = {
      type: "attributes",
      details: "Test",
      category: "",
      name: "User",
      age: Number(formData.age) || null,
      gender: formData.gender?.charAt(0) || null,
      marital_status: formData.maritalStatus || null,
      disability: formData.disability === 'yes' ? 'Disabled' : 'no',
      income: {
        amount: formData.bpl === 'yes' ? 0 : formData.income || "",
        type: "",
      },
      community: formData.community || null,
      occupation: formData.occupation ? formData.occupation : null,
      // occupation_type: {},
      occupation_type: formData.occupation === "Student" ? formData.studentType?.toLowerCase()
        : formData.studentType === "School" ? formData.schoolType?.toLowerCase()
          : formData.studentType === "College" ? formData.collegeType?.toLowerCase()
            : formData.occupation === "Farmer" ? formData.farmerType?.toLowerCase()
              : formData.occupation === "Fisherman" ? formData.fishingType?.toLowerCase()
                : null,
      school_6th_12th: formData.govtSchool612,
      college_type: formData.collegeType ? formData.collegeType : null,
      school_type: formData.schoolType ? formData.schoolType : null,
      boat_owner: formData.boatOwner ? formData.boatOwner : null,
      class: formData.studentClass ? formData.studentClass : null,
      //bpl: formData.bpl ? formData.bpl : null,
      member: formData.memberType ? formData.memberType : null,
      educationQualification: formData.educationQualification ? formData.educationQualification : null,
      disability_percentage: formData.disabilityPercentage ? formData.disabilityPercentage : null
    }
    return payload;
  };


  const resetChat = () => {
    setMessages([]);
    setInput("");
    setBotTyping(false);

    setCurrentChatId(null);
    setCurrentStep(-1);
    setEligibilityAnswers({});

    setShowInputBox(false);
    setShowEligibilityForm(false);
    setShowIntro(true);
    setShowReopenFormBtn(false);
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
    setShowInputBox(false);

    setMessages(prev => ([
      ...prev,
      {
        from: "bot",
        text: {
          question: eligibilitySteps[0].question,
          options: eligibilitySteps[0].options,
          stepKey: eligibilitySteps[0].key,
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
    setChatStep(CHAT_STEPS.PRECHAT);
    setMessages([botWelcome]);
    setShowInputBox(true);

    if (!currentChatId) {
      setCurrentChatId(Date.now());
    }
    setLoadFlag(true);
  };



  const sendMessage = async () => {
    if (isEligibilityTrigger(input) && currentStep === -1) {
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

  const handleEligibilityAnswer = (answer, isSkipped = false) => {
    debugger;
    const stepKey = eligibilitySteps[currentStep].key;

    const finalAnswer = isSkipped ? "Not provided" : answer;

    // show user action in chat
    setMessages(prev => ([
      ...prev,
      { from: "user", text: isSkipped ? "Skipped" : answer }
    ]));

    const updatedAnswers = {
      ...eligibilityAnswers,
      [stepKey]: finalAnswer,
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
            stepKey: eligibilitySteps[nextStep].key,
          },
        },
      ]));
    } else {
      // ✅ last step finished
      setCurrentStep(-1);
      setShowInputBox(true);

      const summaryText = buildEligibilitySummary(updatedAnswers);
      const sentence = buildEligibilitySentence(updatedAnswers);
      console.log(sentence, 'sent');
      setMessages(prev => ([
        ...prev,
        {
          from: "bot",
          text: summaryText,
          class: "eligibilitySummary",
        }
      ]));

      setTimeout(() => {
        sendEligibilityMessage(sentence);
      }, 600);
    }
  };


  // const buildEligibilitySentence = (answers) => {
  //   return `I am ${answers.age} years old, my income is ${answers.income}, I belong to ${answers.community} community, I am ${answers.gender} and ${answers.maritalStatus}`;
  // };
  const buildEligibilitySentence = (answers) => {
    const parts = [];

    if (answers.age !== "Not provided")
      parts.push(`I am ${answers.age} years old`);

    if (answers.income !== "Not provided")
      parts.push(`my income is ${answers.income}`);

    if (answers.community !== "Not provided")
      parts.push(`I belong to ${answers.community} community`);

    if (answers.gender !== "Not provided")
      parts.push(`I am ${answers.gender}`);

    if (answers.maritalStatus !== "Not provided")
      parts.push(`I am ${answers.maritalStatus}`);

    return parts.join(", ");
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
          meta: {
            eligibilityFormData: lastEligibilityFormRef.current
          }
        };

        // ✅ APPEND — DO NOT REPLACE
        setMessages(prev => ([
          ...prev,
          botMsg,
        ]));
        setChatStep(CHAT_STEPS.SCHEME_RESULT);
      }

      saveChatToStorage(currentChatId || Date.now(), [
        ...messages,
      ]);
    } catch (err) {
      console.log('eeeerrrroooorrr', err);
      alert('Please try again after sometime');
      f7.toast.create({
        text: 'Something went wrong ! Please try again after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();
      return err;
    } finally {
      setBotTyping(false);
    }
  };

  const handleEditEligibility = (savedFormData) => {
    setFormData({
      ...formData,
      ...savedFormData
    });

    setShowEligibilityForm(true);
    setShowInputBox(false);
    setShowReopenFormBtn(false);

    setTimeout(() => {
      eligibilityFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
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
          {chatStep === CHAT_STEPS.PRECHAT && !showInputBox && messages.length === 0 && (
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
                        {msg.text.stepKey === "age" ? (
                          <div className="age-dropdown">
                            <select
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleEligibilityAnswer(e.target.value);
                                }
                              }}
                            >
                              <option value="" disabled>
                                Select Age
                              </option>

                              {ageOptions.map((age, i) => (
                                <option key={i} value={age}>
                                  {age}
                                </option>
                              ))}
                            </select>

                            <button
                              className="skip-btn"
                              onClick={() => handleEligibilityAnswer(null, true)}
                            >
                              Skip
                            </button>
                          </div>
                        ) : (

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

                            <button
                              className="pill-item skip-btn"
                              onClick={() => handleEligibilityAnswer(null, true)}
                            >
                              Skip
                            </button>
                          </div>
                        )}

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
                            {/* <div className="showsCountOfSchemes">
                              <h4>Based on your provided details, </h4>
                              <p>Below are the top <b>{msg.text.length}</b> {msg.text.length > 1 ? 'schemes' : 'scheme'} relevant to you:</p>
                            </div> */}
                            <div className="showsCountOfSchemes">
                              <div className="summaryHeader">
                                <h4>Based on your provided details
                                  <span>
                                    {msg.meta?.eligibilityFormData && (
                                      <button
                                        className="editBtn"
                                        onClick={() =>
                                          handleEditEligibility(msg.meta.eligibilityFormData)
                                        }
                                      >
                                        <Icon f7="square_pencil" />
                                        Edit Eligibility
                                      </button>
                                    )}
                                  </span>
                                </h4>


                              </div>

                              <p>
                                Below are the top <b>{msg.text.length}</b>{" "}
                                {msg.text.length > 1 ? "schemes" : "scheme"} relevant to you:
                              </p>
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
              {showIntro && (
                <div className="introText">
                  <p className="preText">
                    Hi! I can help you find government schemes that match your eligibility.
                    <br />
                    Would you like to check your eligibility now?
                  </p>
                  <button onClick={() => {
                    setShowIntro(false);
                    setShowEligibilityForm(true);
                    setTimeout(() => {
                      eligibilityFormRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}>
                    Yes
                  </button>

                  <button onClick={handleNo}>
                    No
                  </button>
                </div>
              )}




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
        {showEligibilityForm && (
          <div className="eligibilityFullWidth" ref={eligibilityFormRef}>
            <h2>Check Your Eligibility</h2>
            <p className="subText">
              <b> Note : * is mandatory</b>
            </p>

            <div className="formGrid">
              <div className="formGroup">
                <label>Age <span className="required">*</span></label>
                <select value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}>
                  <option value="">Select Age</option>
                  {/* {ageOptions.map((age, i) => (
                    <option key={i} value={age}>{age}</option>
                  ))} */}
                  {Array.from({ length: 59 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                  <option value="60">60 and Above</option>
                </select>
              </div>

              <div className="formGroup">
                <label>Gender <span className="required">*</span></label>
                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
              </div>

              <div className="formGroup">
                <label>Marital Status <span className="required">*</span></label>
                {/* <select onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}>
                  <option value="">Select Status</option>
                  <option value={'single'}>Single</option>
                  <option value={'married'}>Married</option>
                  {formData.gender !== "Male" && (
                    <option value="widow">Widow</option>
                  )}
                  <option value={'divorced'}>Divorced</option>

                </select> */}
                <select
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, maritalStatus: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  {formData.age < 18 ? (
                    <option value="single">Single</option>
                  ) : (
                    <>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      {formData.gender !== "Male" && (
                        <option value="widow">Widow</option>
                      )}
                      <option value="divorced">Divorced</option>
                    </>
                  )}
                </select>

              </div>

              <div className="formGroup">
                <label>Community </label>
                <select value={formData.community} onChange={(e) => setFormData({ ...formData, community: e.target.value })}>
                  <option value="">Select Community</option>
                  <option value={'mbc'}>MBC/DNC</option>
                  <option value={'obc'}>BC</option>
                  <option value={'sc'}>SC</option>
                  <option value={'scc'}>SCC</option>
                  <option value={'st'}>ST</option>
                </select>
              </div>

              {/* <div className="formGroup">
                <label>Do you belong to BPL category? </label>
                <select value={formData.bpl} onChange={(e) => setFormData({ ...formData, bpl: e.target.value })}>
                  <option value="">Select BPL</option>
                  <option value={'yes'}>Yes</option>
                  <option value={'no'}>No</option>
                </select>
              </div> */}


              {/* {
                formData.bpl === 'no' && (
                  <div className="formGroup">
                    <label>Annual Income</label>
                    <select value={formData.income} onChange={(e) => setFormData({ ...formData, income: e.target.value })}>
                      <option value="">Select Income</option>
                      <option value='72000'>0 to 72,000</option>
                      <option value="100000">72,000 to 1,00,000</option>
                      <option value="2,50,000">1,00,000 to 2,50,000</option>
                      <option value="3,00,000">2,50,000 to 3,00,000</option>
                    </select>
                  </div>
                )
              } */}
              <div className="formGroup">
                <label>Annual Income</label>
                <select value={formData.income} onChange={(e) => setFormData({ ...formData, income: e.target.value })}>
                  <option value="">Select Income</option>
                  <option value='0'>No Income</option>
                  <option value='72000'>0 to 72,000</option>
                  <option value="100000">72,000 to 1,00,000</option>
                  <option value="2,50,000">1,00,000 to 2,50,000</option>
                  <option value="3,00,000">2,50,000 to 3,00,000</option>
                </select>
              </div>

              <div className="formGroup">
                <label>Disability</label>
                <select value={formData.disability} onChange={(e) => setFormData({ ...formData, disability: e.target.value })}>
                  <option value="">Select</option>
                  <option value={'yes'}>Yes</option>
                  <option value={'no'}>No</option>
                </select>
              </div>

              {formData.disability === "yes" && (
                <div className="formGroup">
                  <label>Disability Percentage</label>
                  <select
                    value={formData.disabilityPercentage}
                    onChange={(e) =>
                      setFormData({ ...formData, disabilityPercentage: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="0">0% – 40%</option>
                    <option value="40">40% – 80%</option>
                    <option value="80">Above 80%</option>
                  </select>
                </div>
              )}

              <div className="formGroup">
                <label>Occupation</label>
                <select
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      occupation: e.target.value,
                      farmerType: "",
                      studentType: "",
                      collegeType: "",
                      schoolType: "",
                      studentClass: "",
                      fishingType: "",
                      govtSchool612: "",
                      educationQualification: "",
                    })
                  }
                >
                  <option value="">Select Occupation</option>
                  <option value={'Farmer'}>Farmer</option>
                  <option value={'Student'}>Student</option>
                  <option value={'Fisherman'}>Fisherman</option>
                  <option value={'Handloom Weavers'}>Handloom Weavers</option>
                  <option value={'Labour'}>Labour</option>
                </select>
              </div>

              {(formData.occupation === "Handloom Weavers" || formData.occupation === "Labour") && (
                <div className="formGroup">
                  <label>Are you a member ?</label>
                  <select
                    value={formData.memberType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        memberType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value={'yes'}>Yes</option>
                    <option value={'no'}>No</option>
                  </select>
                </div>
              )}

              {formData.occupation && formData.occupation !== "Student" && (
                <div className="formGroup">
                  <label>Education Qualification</label>
                  <select
                    value={formData.educationQualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        educationQualification: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="illiterate">Illiterate</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="higher_secondary">Higher Secondary</option>
                    <option value="graduate">Graduate</option>
                    <option value="post_graduate">Post Graduate</option>
                  </select>
                </div>
              )}


              {formData.occupation === "Farmer" && (
                <div className="formGroup">
                  <label>Farmer Type</label>
                  <select
                    value={formData.farmerType}
                    onChange={(e) =>
                      setFormData({ ...formData, farmerType: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value={'small'}>Small</option>
                    <option value={'marginal'}>Marginal</option>
                    <option value={'tenant'}>Tenant</option>
                  </select>
                </div>
              )}


              {formData.occupation === "Student" && (
                <div className="formGroup">
                  <label>Student Type</label>
                  <select
                    value={formData.studentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentType: e.target.value,
                        collegeType: "",
                        schoolType: "",
                        studentClass: "",
                        govtSchool612: "",
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value={'College'}>College</option>
                    <option value={'School'}>School</option>
                  </select>
                </div>
              )}

              {formData.studentType === "College" && (
                <>
                  <div className="formGroup">
                    <label>College Type</label>
                    <select
                      value={formData.collegeType}
                      onChange={(e) =>
                        setFormData({ ...formData, collegeType: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value={'government'}>Govt</option>
                      <option value={'aided'}>Aided</option>
                      <option value={'private'}>Private</option>
                    </select>
                  </div>

                  <div className="formGroup">
                    <label>School 6th to 12th in Govt?</label>
                    <div className="radioGroup">
                      <label>
                        <input
                          type="radio"
                          name="govtSchool612"
                          value="Yes"
                          checked={formData.govtSchool612 === "Yes"}
                          onChange={(e) =>
                            setFormData({ ...formData, govtSchool612: e.target.value })
                          }
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="govtSchool612"
                          value="No"
                          checked={formData.govtSchool612 === "No"}
                          onChange={(e) =>
                            setFormData({ ...formData, govtSchool612: e.target.value })
                          }
                        />
                        No
                      </label>
                    </div>
                  </div>
                </>
              )}


              {formData.studentType === "School" && (
                <>
                  <div className="formGroup">
                    <label>School Type</label>
                    <select
                      value={formData.schoolType}
                      onChange={(e) =>
                        setFormData({ ...formData, schoolType: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value={'government'}>Govt</option>
                      <option value={'aided'}>Aided</option>
                      <option value={'private'}>Private</option>
                    </select>
                  </div>

                  <div className="formGroup">
                    <label>Class</label>
                    <select
                      value={formData.studentClass}
                      onChange={(e) =>
                        setFormData({ ...formData, studentClass: e.target.value })
                      }
                    >
                      <option value="">Select Class</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {formData.occupation === "Fisherman" && (
                <>
                  <div className="formGroup">
                    <label>Fishing Type</label>
                    <select
                      value={formData.fishingType}
                      onChange={(e) =>
                        setFormData({ ...formData, fishingType: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value={'marine'}>Marine</option>
                      <option value={'inland'}>Inland</option>
                    </select>
                  </div>


                  <div className="formGroup">
                    <label>Are you a Boat Owner?</label>
                    <div className="radioGroup">
                      <label>
                        <input
                          type="radio"
                          name="boatOwner"
                          value="Yes"
                          checked={formData.boatOwner === "Yes"}
                          onChange={(e) =>
                            setFormData({ ...formData, boatOwner: e.target.value })
                          }
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="boatOwner"
                          value="No"
                          checked={formData.boatOwner === "No"}
                          onChange={(e) =>
                            setFormData({ ...formData, boatOwner: e.target.value })
                          }
                        />
                        No
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>





            <div className="formActions">
              <Button fill onClick={handleEligibilityFormSubmit} disabled={!formData.age || !formData.gender || !formData.maritalStatus}>
                Find Eligible Schemes
              </Button>
              <Button
                fill
                color="red"
                onClick={handleFormClose}
              >Cancel</Button>
              {/* <button
                // className="formCloseBtn"
                onClick={() => {
                  setShowEligibilityForm(false);
                  setShowInputBox(true);
                  setShowReopenFormBtn(true);
                }}
              >
                Cancel
              </button> */}
            </div>
          </div>
        )}


      </Block>

      {/* INPUT BOX (ONLY AFTER OPTION SELECTED) */}
      {
        showInputBox && (
          <div className="chat-input-bar">
            <div className="chat-input-wrapper">
              {/* <input
                type="text"
                className="chat-input"
                placeholder="Say Hi to Know your Eligibility"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              /> */}
              {showReopenFormBtn && !showEligibilityForm && (
                <div className="reopenFormWrapper">
                  <Button
                    outline
                    small
                    color="blue"
                    onClick={() => {
                      setShowEligibilityForm(true);
                      setShowInputBox(false);
                      setShowReopenFormBtn(false);
                      setFormData(emptyFormData);
                      setTimeout(() => {
                        eligibilityFormRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                      }, 100);
                    }}

                  >
                    Reset & Check Eligibility Again
                  </Button>
                </div>
              )}
              {showInputBox && (
                <div className="back-select-btn">
                  <Button
                    outline
                    small
                    color="gray"
                    // onClick={() => {
                    //   setShowInputBox(false);
                    //   setMessages([]);
                    // }}
                    onClick={resetChat}
                  >
                    ← New Chat
                  </Button>
                </div>
              )}
              {/* <Button fill small onClick={sendMessage} className="send-btn">
                Send
              </Button> */}
            </div>
          </div>
        )
      }
    </Page >
  );
}
