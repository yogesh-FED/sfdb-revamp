import React , {useState, useEffect}from 'react';
import { AboutPage} from './frontend/about';
import { AboutTnegaPage } from './frontend/about-tnega';
import { WelcomePage} from './frontend/welcome';
import { BenefitPage } from './frontend/benefit';
import { LoginPage } from './frontend/login';
import { BottomPage } from './frontend/bottom';
import { ChatBotPage } from './frontend/chat-bot';
import { LeftPanelPage } from './frontend/left-panel';

import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button,
  Toggle,
  Tabs,
  Tab,
  f7,
} from 'framework7-react';

const LandingPage = (props) => {
  
  const store = props.f7router.app.store;
  

  
  const [language_data, set_language_data] = useState(f7.passedParams.language_contents);
  
  const tabId = localStorage.getItem('tabsId');
 
  const [is_language, set_language] = useState(f7.passedParams.language);

  const [is_tabs_id, set_tabs_id] = useState(tabId ? tabId : 1);

  const changeLanguage=(lng)=>{
          set_language(lng);
          
          store.dispatch('setLanguage', lng);

          set_language_data(f7.passedParams.language_contents);
          f7.passedParams.language = lng;
          if(lng === "EN"){
            f7.passedParams.language_contents = f7.passedParams.english_language;
          }
          else{
            f7.passedParams.language_contents = f7.passedParams.tamil_language;
          }
       

  }
  const tabsChange=(id)=>{
    set_tabs_id(id);
    localStorage.setItem('tabsId', id);
  }
  useEffect(() => {
          let lng = localStorage.getItem('language') ? localStorage.getItem('language') : "EN";
          set_language(lng);
          set_language_data(f7.passedParams.language_contents);

  }, [is_language]);

  const responses = {
    hello: "Hi there! How can I assist you today?",
    "Codeing Avengers":
      "Here you will get Notes, Ebooks, project source Code, Interview questions. visit Coding Hubs.<a href='https://codepen.io/' target='_blank'>Visit Website</a>",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "need help": "How I can help you today?",
    bye: "Goodbye! Have a great day!",
    default: "I'm sorry, I didn't understand that. Want to connect with expert?",
    expert: "Great! Please wait a moment while we connect you with an expert.",
    no: "Okay, if you change your mind just let me know!"
  };
  
  // document.getElementById("chatbot-toggle-btn").addEventListener("click", toggleChatbot);
  // document.getElementById("close-btn").addEventListener("click", toggleChatbot);
  // document.getElementById("send-btn").addEventListener("click", sendMessage);
  // document.getElementById("user-input").addEventListener("keypress", function (e) {
  // if (e.key === "Enter") {
  //       sendMessage();
  //     }
  //   });
  
  function toggleChatbot() {
    const chatbotPopup = document.getElementById("chatbot-popup");
    chatbotPopup.style.display =
      chatbotPopup.style.display === "none" ? "block" : "none";
  }
  
  function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput !== "") {
      appendMessage("user", userInput);
      respondToUser(userInput.toLowerCase());
      document.getElementById("user-input").value = "";
    }
  }
  
  function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function () {
      appendMessage("bot", response);
    }, 500);
  }
  
  function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === "bot" && message === responses["default"]) {
      const buttonYes = document.createElement("button");
      buttonYes.textContent = "✔ Yes";
      buttonYes.onclick = function () {
        appendMessage("bot", responses["expert"]);
      };
      const buttonNo = document.createElement("button");
      buttonNo.textContent = "✖ No";
      buttonNo.onclick = function () {
        appendMessage("bot", responses["no"]);
      };
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
      buttonContainer.appendChild(buttonYes);
      buttonContainer.appendChild(buttonNo);
      chatBox.appendChild(buttonContainer);
    }
  }
  
   return (
  
  <Page name="landing" className='landing-page'>
   <LeftPanelPage languageData={language_data}></LeftPanelPage>
    {/* Top Navbar */}
    <Navbar className='nav-background' sliding={false} >
                    <NavLeft>
                       <Link iconIos="f7:menu" iconMd="material:menu" className='menu-bar' panelOpen="left"/>
                    </NavLeft>
                    <NavTitle className='nav-title'>{language_data?.welcome_to_makkal_self_service_portal}</NavTitle>
                    <NavRight>
                        <span className="nav-title p-1">{is_language == "EN" ? "English" : "தமிழ்"}</span>
                        {
                            is_language == "EN" ?  
                            <Toggle  onChange={()=>changeLanguage('TA')} />
                            : 
                            <Toggle defaultChecked onChange={()=>changeLanguage('EN')} />
                        }
                        
                        <img src="assets/images/tn-logo.png" alt="" className="tn-logo"/>
                        <img src="assets/images/tnega-logo.png" alt="" className="tnega-logo" />
                    </NavRight>
                
                </Navbar>

                
    {/* Toolbar */}
        <Toolbar top tabbar className='tabs-bg'>
            <Link className="tabs-link"  onClick={()=>tabsChange(1)} tabLink="#tab-1" tabLinkActive={is_tabs_id==1}>
            <img src="assets/images/nav-icons/home.png" alt="" className='nav-icon-image'/> <span className='tab-content'>{language_data?.home}</span>
            </Link>
            <Link className="tabs-link"  onClick={()=>tabsChange(2)} tabLink="#tab-2" tabLinkActive={is_tabs_id==2}><img src="assets/images/nav-icons/about.png" alt="" className='nav-icon-image'/> <span className='tab-content'>{language_data?.about_makkal_sevai}</span></Link>
            <Link className="tabs-link"  onClick={()=>tabsChange(3)} tabLink="#tab-3" tabLinkActive={is_tabs_id==3}><img src="assets/images/nav-icons/service.png" alt="" className='nav-icon-image'/> <span className='tab-content'>{language_data?.services}</span></Link>
            <Link className="tabs-link"  onClick={()=>tabsChange(4)} tabLink="#tab-4" tabLinkActive={is_tabs_id==4}><img src="assets/images/nav-icons/about-tnega.png" alt="" className='nav-icon-image'/><span className='tab-content'>{language_data?.about_tnega}</span></Link>
            <Link className="tabs-link"  onClick={()=>tabsChange(5)} tabLink="#tab-5" tabLinkActive={is_tabs_id==5}><img src="assets/images/nav-icons/login.png" alt="" className='nav-icon-image'/> <span className='tab-content'>{language_data?.login}</span></Link>

          </Toolbar>
    {/* Page content */}
    <Tabs swipeable>
      <Tab id="tab-1" className="page-content page-background" tabActive={is_tabs_id == 1}>
          <Block className='box-bg'>
              <WelcomePage></WelcomePage>
          </Block>
      </Tab>
      <Tab id="tab-2" className="page-content page-bg-1" tabActive={is_tabs_id == 2}>
            <AboutPage languageData={language_data}></AboutPage>
      </Tab>
      <Tab id="tab-3" className="page-content page-bg-1" tabActive={is_tabs_id == 3}>
          <BenefitPage languageData={language_data}></BenefitPage>
      </Tab>
      <Tab id="tab-4" className="page-content page-bg-2" tabActive={is_tabs_id == 4}>
           <AboutTnegaPage languageData={language_data}></AboutTnegaPage>
      </Tab>
      <Tab id="tab-5" className="page-content page-bg-1" tabActive={is_tabs_id == 5}>
           <LoginPage languageData={language_data}></LoginPage>
      </Tab>
      </Tabs>
        <a id="chatbot-toggle-btn" onClick={toggleChatbot}>
        <img src="https://cdn1.iconfinder.com/data/icons/social-media-hexagon-1/1024/whatsapp-512.png" width="50" height="50" alt="buttonpng" />
        </a>
        <div className="chatbot-popup" id="chatbot-popup">
          <div className="chat-header">
            <p>HI</p>
            <span>Chatbot | <a href="#" target="_blank"> Codeing Avengers</a></span>
            <button id="close-btn" onClick={toggleChatbot}>&times;</button>
          </div>
          <div className="chat-box" id="chat-box" ></div>
          <div className="chat-input">
            <input type="text" id="user-input" onKeyPress={sendMessage} placeholder="Type a message..." />
            <button id="send-btn" onClick={sendMessage}>Send</button>
          </div>
          <div className="copyright">
            <a href="#" target="_blank"> Made By Codeing Avengers © 2024</a>
          </div>
        </div>
      {/* <BottomPage></BottomPage> */}
     

     
  </Page>
);
}
export default LandingPage;