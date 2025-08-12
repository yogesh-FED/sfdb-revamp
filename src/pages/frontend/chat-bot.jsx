import React, { useState, useRef, useEffect } from 'react';
import { f7 } from 'framework7-react';

const ChatBotPage = ({ languageData, language }) => {

  const store = f7.store;
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // For toggling chatbot visibility
  const [messages, setMessages] = useState([
    { message: "Hi, Welcome to makkal portal. Find your various type of eligible schemes? Please enter your aadhar number" }
  ]); // For storing the chat messages
  const [userInput, setUserInput] = useState(""); // For storing user input
  const [showPulse, setShowPulse] = useState(true);

  const pulse = (
    <>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </>
  );

  // Predefined responses for the chatbot
  const responses = {
    default: "Invalid Aadhaar number: Must be exactly 12 digits.",
    invalid: "Invalid Aadhaar number: Reserved or invalid number.",
    luhn: "Invalid Aadhaar number: Checksum validation failed.",
    valid: "Wait we are fetching your details.",
  };

  // Toggle the visibility of the chatbot
  const toggleChatbot = () => {

    setIsChatbotVisible((prevState) => !prevState);
  };

  // Handle sending messages
  const sendMessage = () => {
    const trimmedUserInput = userInput.trim();
    if (trimmedUserInput !== "") {
      appendMessage("user", trimmedUserInput);
      respondToUser(trimmedUserInput.toLowerCase());
      setUserInput(""); // Clear the input field
    }
  };

  // Respond to the user's input based on predefined responses
  const respondToUser = async (aadhaarNumber) => {


    if (!/^\d{12}$/.test(aadhaarNumber)) {
      appendMessage("bot", pulse);

      const response = responses[aadhaarNumber] || responses["default"];
      setTimeout(() => {
        setShowPulse(false); // Hide pulse
        appendMessage("bot", response);
      }, 500);
      return true;
    }

    // Rule 2: Check for reserved/invalid numbers (e.g., 0000, 1111)
    const invalidNumbers = [
      // Repeating Digits
      "000000000000", "111111111111", "222222222222", "333333333333", "444444444444",
      "555555555555", "666666666666", "777777777777", "888888888888", "999999999999",

      // Sequential Numbers (Forward & Backward)
      "123456789012", "234567890123", "345678901234", "456789012345", "567890123456",
      "678901234567", "789012345678", "890123456789", "901234567890", "987654321098",
      "876543210987", "765432109876", "654321098765", "543210987654", "432109876543",
      "321098765432", "210987654321",

      // Mirrored & Palindromic Numbers
      "123443211234", "987667889876", "122112211221", "100110011001", "456776543210",
      "321002345123", "789887988789", "555666777666", "123454321234",

      // Alternating Digits & Repeating Patterns
      "121212121212", "343434343434", "565656565656", "787878787878", "909090909090",
      "010101010101", "232323232323", "454545454545",

      // Common Fake Numbers
      "999888777666", "777666555444", "987778978789",

      // Numbers Starting or Ending with Too Many Zeros
      "000123456789", "123456789000", "000000123456", "654321000000",

      // Repeated Blocks of Numbers
      "111222333444", "555666777888", "999000111222", "000111222333",
      "123123123123", "456456456456", "789789789789", "987987987987", "123412341234",
    ];


    if (invalidNumbers.includes(aadhaarNumber)) {

      const response = responses[aadhaarNumber] || responses["invalid"];
      setTimeout(() => {
        appendMessage("bot", response);
      }, 500);
      return true;
    }

    // Rule 3: Optional Luhn algorithm check for checksum validity

    if (!isValidAadhaarChecksum(aadhaarNumber)) {

      const response = responses[aadhaarNumber] || responses["luhn"];
      setTimeout(() => {
        appendMessage("bot", response);
      }, 500);
      return true;
    }

    // If it passes all checks
    const response = responses[aadhaarNumber] || responses["valid"];


    setTimeout(() => {
      appendMessage("bot", response);

    }, 500);
    const result = await store.dispatch('getChatbotSchemes', aadhaarNumber);
    if (result.success == false) {
      setTimeout(() => {

        appendMessage("bot", result.message.message);


      }, 500);
      return true;
    }
    if (result.data?.eligible_schemes?.schemes?.length == 0) {
      setTimeout(() => {

        appendMessage("bot", "Sorry!!!, you are not Eligible for any Schemes.");
        result.data.eligible_schemes.schemes.forEach((scheme, index) => {
          // You can customize the message as needed. Here, I just append a placeholder message.
          appendMessage("bot", `Reason ${index + 1}: ${scheme.scheme_name}`);
        });

      }, 500);

    }
    else {
      const showDetails = (schemeDesc) => {
        f7.sheet.create({
          content: `
            <div class="sheet-modal sheet-modal-bottom">
              <div class="toolbar">
                <div class="toolbar-inner justify-content-flex-end">
                  <a href="#" class="link sheet-close">Close</a>
                </div>
              </div>
              <div class="sheet-modal-inner">
                <div class="page-content">
                  <div class="block">
                    ${schemeDesc} <!-- Dynamically inject schemeDesc here -->
                  </div>
                </div>
              </div>
            </div>
          `.trim(),
        }).open();


        // You can handle more details here
      };

      setTimeout(() => {
        appendMessage("bot", "Congratulations!!! You are eligible for the scheme(s)");
        result.data.eligible_schemes.schemes.forEach((scheme, index) => {

          const message = language == "EN" ? (
            <div key={index}>
              {index + 1}: {scheme.scheme_name}{" "}

              <button className="chatbot-details-button" onClick={() => showDetails(scheme.scheme_desc)}>
                More Info
              </button>
              {scheme.url && (
                <a className="custom-button external" href={scheme.url} target="_blank">
                  Apply
                </a>
              )}
            </div>
          ) : (
            <div key={index}>
              {index + 1}: {scheme.scheme_name_tamil}{" "}
              <div className="grid grid-cols-2 grid-gap">
                <button className="chatbot-details-button" onClick={() => showDetails(scheme.scheme_desc_tamil)}>
                  More Info
                </button>
                {scheme.url && (
                  <a className="custom-button external" href={scheme.url} target="_blank">
                    Apply
                  </a>
                )}
              </div>
            </div>
          );

          appendMessage("bot", message);

        });


      }, 500);
    }



  };
  const isValidAadhaarChecksum = (aadhaar) => {
    // Ensure Aadhaar is a string and has exactly 12 digits
    if (typeof aadhaar !== "string" || aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
      return false;  // Invalid input if not a 12-digit number
    }

    // Verhoeff algorithm tables
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
    const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
    // Reverse the string and convert each character to a number
    const digits = aadhaar.split("").reverse().map(Number);
    let checksum = 0;
    // Calculate the checksum
    for (let i = 0; i < digits.length; i++) {
      checksum = d[checksum][p[i % 8][digits[i]]];
    }

    // Aadhaar is valid if checksum is 0
    return checksum === 0;
  }

  // Append a message to the chat
  const appendMessage = (sender, message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, message },
    ]);
  };

  // Handle user input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const chatBoxRef = useRef(null); // Reference to the chat box container

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to bottom
    }
  }, [messages]); // This runs whenever messages change

  return (
    <div>
      {/* Toggle button for chatbot */}
      <a id="chatbot-toggle-btn" onClick={toggleChatbot}>
        <center>
          <img
            src="/assets/images/chatbot.png"
            width="70"
            height="70"
            alt="buttonpng"
          />
          <br />
          Know your <br /> Eligible Schemes
        </center>
      </a>


      {/* Chatbot popup */}
      {isChatbotVisible && (
        <div className="chatbot-popup" id="chatbot-popup">
          <div className="chat-header">

            <span>
              {languageData?.welcome_to_makal_sevai_title}
            </span>
            <span onClick={toggleChatbot} className='chatbotClose'>x</span>

          </div>

          {/* Chat Box */}
          <div className="chat-box" id="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-message" : "bot-message"}
              >

                {msg.message}

              </div>
            ))}
          </div>

          {/* User Input */}
          <div className="chat-input">
            <input
              type="number"
              maxLength="12"
              minLength="12"
              id="user-input"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
            />
            <button id="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <a href="#">
              Developed By SFDB © 2024
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export { ChatBotPage };
