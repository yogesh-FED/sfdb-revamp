// // App.jsx
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import React, { useState, useEffect, useRef } from 'react';
// import { App, View, Page, Navbar, Button, f7, Popup } from 'framework7-react';
// import homebg from '../assets/images/landing-bg.jpg';
// import { WelcomePage } from './frontend/welcome';
// import { AboutPage } from './frontend/about';
// import { AboutPageRevamp } from './frontend/about-revamp';
// import { FooterRevampPage } from './frontend/footer';
// import { SchemePageRevamp } from './frontend/schemes-revamp';
// import { HelpPageRevamp } from './frontend/help';
// import { ChatBotPage } from './frontend/chat-bot';
// import { CustomNavbar } from './CustomNavbar';
// import MainLayout from '../components/MainLayout';
// import TopNavbar from './TopNavbar';


// // const Section = ({ id, title, bg }) => (
// //   <div
// //     id={id}
// //     style={{
// //       height: '100vh',
// //       background: bg,
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       fontSize: 28,
// //     }}
// //   >
// //     {title}
// //   </div>
// // );

// // const Section = ({ id, title, bg, children }) => (
// //   <div
// //     id={id}
// //     style={{
// //       height: '100vh',
// //       //background: bg,
// //       backgroundImage: `url(${bg})`,
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       padding: '40px 20px',
// //       fontSize: 28,
// //     }}
// //   >
// //     <h2 style={{ marginBottom: '20px' }}>{title}</h2>
// //     {children}
// //   </div>
// // );
// const Section = ({ id, title, bg, children, className }) => {
//   const isImage = typeof bg === 'string' && (bg.startsWith('/') || bg.startsWith('http') || bg.startsWith('data:'));

//   return (
//     <div
//       className={className}
//       id={id}
//       style={{
//         ...(isImage
//           ? {
//             backgroundImage: `url(${bg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'right center',
//             backgroundRepeat: 'no-repeat',
//             color: '#fff',
//             willChange: 'transform',
//             backfaceVisibility: 'hidden',
//           }
//           : {
//             backgroundColor: bg,
//             color: '#000',
//           }),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '5rem',
//         fontSize: 28,
//       }}
//     >
//       <h2 style={{ marginBottom: '20px' }}>{title}</h2>
//       {children}
//     </div>
//   );
// };






// // const CustomNavbar = (props) => {
// //   console.log('props.language_data', props.language_data);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [activeSection, setActiveSection] = useState("0");
// //   const menuItems = [props.language_data.home, props.language_data.about, props.language_data.scheme, props.language_data.help];
// //   const scrollToSection = (id, setOpen) => {
// //     const section = document.getElementById(id);
// //     if (section) {
// //       section.scrollIntoView({ behavior: 'smooth' });
// //       setActiveSection(id);
// //       if (setOpen) setOpen(false);
// //     }
// //   };

// //   const alinkClk = () => {
// //     window.open("https://tnega.tn.gov.in/", "_blank");
// //   }

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       let current = '';
// //       menuItems.forEach((id) => {
// //         const section = document.getElementById(id);
// //         if (section) {
// //           const rect = section.getBoundingClientRect();
// //           if (rect.top <= 100 && rect.bottom >= 100) {
// //             current = id;
// //           }
// //         }
// //       });
// //       if (current && current !== activeSection) {
// //         setActiveSection(current);
// //       }
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, [activeSection]);
// //   useEffect(() => {
// //     scrollToSection(0);
// //   }, []);
// //   const [popupOpened, setPopupOpened] = useState(false);
// //   const popup = useRef(null);
// //   const LoginPopup = () => {

// //     if (!popup.current) {
// //       popup.current = f7.popup.create({
// //         content: `
// //           <div class="popup loginPopPage popExtcss">
// //             <div class="page">
// //               <div class="navbar">
// //                 <div class="navbar-inner">
// //                   <div class="navbar-bg"></div>

// //                   <div class="right"><a  class="link popup-close"><i class="icon f7-icons">xmark</i></a></div>
// //                 </div>
// //               </div>
// //               <div class="page-content">
// //                 <div class="block">
// //                   <div id="login-popup-root"></div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         `.trim(),
// //       });
// //     }
// //     // Open it
// //     popup.current.open();
// //     let container = document.getElementById('login-popup-root');
// //     let root = createRoot(container);
// //     setTimeout(() => {
// //       if (container) {
// //         root.render(<LoginPage tnClass={props.tnClass} languageData={props.language_data} />, container);
// //       }
// //     }, 100);

// //     popup.current.on('closed', () => {
// //       if (container) root.unmountComponentAtNode(container);
// //     });
// //   };
// //   return (
// //     <>
// //       <div className="grid grid-cols-1 large-grid-cols-4 topNav"
// //         style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           width: '100%',
// //           zIndex: 999,
// //           background: '#0A0032',
// //           padding: '5px 16px',
// //           color: '#fff'
// //         }}>
// //         <span><img src={topNavLogo} alt="tnega" /> <a href='' className='tnegaLink' target='blank' onClick={() => alinkClk()}>Tamil Nadu eGovernance Agency  <img src={openInNew} alt='link' /></a></span>
// //         <p></p>
// //         <p>
// //           <span>{props.language_data.skipToNavigation}</span>
// //           <span className='rt1'>A<sup>+</sup> </span><span className='rt1'> A </span><span className='rt1'>A <sup>-</sup></span>
// //         </p>
// //         <div>
// //           <Button onClick={() => props.toggleLanguage(props.lang)} className='btnStyle'>
// //             <img src={globe} alt='globe' /> &nbsp; {props.lang} &nbsp; <img src={langDown} alt='language' />
// //           </Button>
// //         </div>
// //       </div>
// //       <Navbar
// //         className='makkalportalmenu'
// //         noHairline
// //         style={{
// //           position: 'fixed',
// //           top: 44,
// //           left: 0,
// //           width: '100%',
// //           zIndex: 999,
// //           background: '#fff',
// //           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
// //           height: '64px',
// //           padding: '0 16px',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'space-between',
// //         }}
// //       >
// //         {/* Left: Logo + Title */}
// //         <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }} className='flexAuto'>
// //           <img src="/assets/images/tn-logo.png" alt="" className="tn-logo" />
// //           <div style={{ lineHeight: 1.2 }}>
// //             <div style={{ fontWeight: 700, fontSize: '16px', color: '#002060' }}>
// //               {props.language_data.makkalPortal}
// //             </div>
// //             <div style={{ fontSize: '12px', color: '#444' }}>
// //               {props.language_data.TnGov}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Center: Menu */}
// //         <div style={{ flex: 1, textAlign: 'center' }}>
// //           <div
// //             className={props.tnClass === 'tnFontChange' ? "tnFontChange desktop-menu" : "desktop-menu"}
// //             style={{ display: 'inline-flex', gap: '40px', alignItems: 'center' }}>
// //             {menuItems.map((item, indx) => (
// //               <span
// //                 key={indx}
// //                 onClick={() => scrollToSection(indx)}
// //                 style={{
// //                   cursor: 'pointer',
// //                   fontWeight: 500,
// //                   padding: activeSection === indx ? '0.5rem 1rem' : 'none',
// //                   background: activeSection === indx ? 'rgb(10, 0, 50)' : 'none',
// //                   color: activeSection === indx ? '#fff' : '#222',
// //                   transition: 'all 0.3s ease',
// //                   borderRadius: activeSection === indx ? '5px' : 'none',
// //                 }}
// //               >
// //                 {item}
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Right: Login Button */}
// //         <div style={{ flex: 1, textAlign: 'right' }}>
// //           <button
// //             className='loginBtn'
// //             //onClick={() => handleLoginClick('Login clicked')}
// //             onClick={LoginPopup}
// //             style={{
// //               backgroundColor: '#0c64bc',
// //               color: '#fff',
// //               border: 'none',
// //               padding: '0.8rem 1rem',
// //               borderRadius: '5px',
// //               fontWeight: 500,
// //               fontSize: '16px',
// //               cursor: 'pointer',
// //               transition: 'background-color 0.3s ease',
// //               width: 'auto',
// //               marginRight: '10rem'
// //             }}

// //           >
// //             {props.language_data.login}
// //           </button>
// //         </div>
// //         <div
// //           className="hamburger"
// //           onClick={() => setMenuOpen(!menuOpen)}
// //           style={{
// //             display: 'none',
// //             fontSize: '22px',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           ☰
// //         </div>
// //       </Navbar>

// //       {/* Mobile dropdown */}
// //       {menuOpen && (
// //         <div
// //           className="mobile-menu"
// //           style={{
// //             position: 'fixed',
// //             top: '64px',
// //             width: '100%',
// //             background: '#fff',
// //             boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
// //             zIndex: 998,
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //             padding: '12px 0',
// //           }}
// //         >
// //           {menuItems.map((item, indx) => (
// //             <span
// //               key={indx}
// //               onClick={() => scrollToSection(indx, setMenuOpen)}
// //               style={{
// //                 padding: '10px 0',
// //                 width: '100%',
// //                 textAlign: 'center',
// //                 cursor: 'pointer',
// //                 fontWeight: 500,
// //                 color: activeSection === indx ? '#002060' : '#000',
// //                 backgroundColor: activeSection === indx ? '#f2f2f2' : 'transparent',
// //               }}
// //             >
// //               {item.charAt(0).toUpperCase() + item.slice(1)}
// //             </span>
// //           ))}
// //         </div>
// //       )}

// //       {/* Responsive toggle */}
// //       <style jsx='true'>{`
// //         @media (max-width: 768px) {
// //           .desktop-menu {
// //             display: none !important;
// //           }
// //           .hamburger {
// //             display: inline-block !important;
// //             margin-right: 1rem;
// //           }
// //           .loginBtn {
// //             margin-right: 1rem !important;
// //           }
// //           .flexAuto {
// //             flex: auto !important;
// //           }
// //           .navbar {
// //             top: 7rem !important;
// //           }
// //           .topNav p {
// //             text-align: left !important;
// //           }
// //           .mobile-menu {
// //             top: 10.5rem !important;
// //           }
// //           #about, #scheme, #help {
// //             padding-top: 7rem !important;
// //           }
// //         }
// //         @media (min-width: 769px) {
// //           .mobile-menu {
// //             display: none !important;
// //           }
// //         }
// //           .posRel {
// //           position: relative;
// //           }
// //       `}</style>
// //     </>
// //   );
// // };

// const LandingPage = ({ f7router }) => {
//   debugger;
//   const [getdepartment, setGetDepartment] = useState([]);
//   const [lang, setLang] = useState('ENGLISH');
//   const [tnfont, setTnFont] = useState(false);
//   var [language_data, set_language_data] = useState(f7.passedParams.language_contents);
//   const checkLatest = async () => {

//     const store = f7.store;

//     f7.preloader.show();

//     const response = await store.dispatch('getLatest');

//     if (response) {
//       if (response.success) {
//         // set_posts(response.data);
//         // set_resource(response.resource);
//         setGetDepartment(response.data.organisations);
//       }
//       else {
//         console.log(response.messeage);
//       }

//     }
//     else {

//     }
//     f7.preloader.hide();

//   }
//   useEffect(() => {

//     checkLatest();
//   }, [])
//   const toggleLanguage = () => {
//     debugger;
//     setLang(prev => {
//       const newLang = prev === 'ENGLISH' ? 'TAMIL' : 'ENGLISH';
//       if (newLang === 'ENGLISH') {
//         f7.passedParams.language_contents = f7.passedParams.english_language;
//         set_language_data(f7.passedParams.english_language);
//         setTnFont(false);
//       } else {
//         f7.passedParams.language_contents = f7.passedParams.tamil_language;
//         set_language_data(f7.passedParams.tamil_language);
//         setTnFont(true);
//       }
//       return newLang;
//     });
//   };


//   return (
//     <MainLayout
//       language_data={language_data}
//       lang={lang}
//       toggleLanguage={toggleLanguage}
//       tnClass={tnfont === true ? 'tnFontChange' : ''}
//     >
//       <App theme="auto">
//         <View main className='mainLayoutDesign'>
//           <Page>
//             {/* <TopNavbar
//             language_data={language_data}
//             lang={lang}
//             toggleLanguage={() => toggleLanguage()}
//             tnClass={tnfont === true ? 'tnFontChange' : ''}
//           />
//           <CustomNavbar
//             language_data={language_data}
//             lang={lang}
//             toggleLanguage={() => toggleLanguage()}
//             tnClass={tnfont === true ? 'tnFontChange' : ''}
//           /> */}
//             <Section
//               id="0"
//               bg={homebg}
//               //className="posRel"
//               className={tnfont === true ? 'tnFontChange posRel' : 'posRel'}
//             >
//               <WelcomePage
//                 language_data={language_data}
//               />
//             </Section>


//             <Section id="1" bg="#fff" className={tnfont === true ? 'tnFontChange abouUsPage' : 'abouUsPage'}>
//               <AboutPageRevamp language_data={language_data} />
//             </Section>

//             <Section id="2" bg="#fff"
//               className={tnfont === true ? 'tnFontChange schemeBg' : 'schemeBg'}
//             >
//               <SchemePageRevamp language_data={language_data} getdepartment={getdepartment} f7router={f7router}
//                 lang={lang}
//                 toggleLanguage={() => toggleLanguage()}
//                 tnClass={tnfont === true ? 'tnFontChange' : ''}
//               />
//             </Section>

//             <Section id="3" bg="#fff"
//               className={tnfont === true ? 'tnFontChange padLRZ' : 'padLRZ'}
//             >
//               <HelpPageRevamp language_data={language_data} />
//             </Section>

//             <Section id="4" bg="rgb(10, 0, 50)"
//               className={tnfont === true ? 'tnFontChange footerCls' : 'footerCls'}
//             >
//               <FooterRevampPage language_data={language_data} />
//             </Section>
//             <ChatBotPage languageData={language_data}></ChatBotPage>
//           </Page>
//         </View>
//       </App>
//     // </MainLayout>
//   );
// };

// export default LandingPage;



// import React, { useEffect, useRef, useState } from 'react';
// import { Page, f7, useStore } from 'framework7-react';
// import homebg from '../assets/images/landing-bg.jpg';
// import { WelcomePage } from './frontend/welcome';
// import { AboutPageRevamp } from './frontend/about-revamp';
// import { FooterRevampPage } from './frontend/footer';
// import { SchemePageRevamp } from './frontend/schemes-revamp';
// import { HelpPageRevamp } from './frontend/help';
// import { ChatBotPage } from './frontend/chat-bot';
// import MainLayout from '../components/MainLayout';

// const Section = ({ id, title, bg, children, className }) => {
//   const isImage = typeof bg === 'string' && (bg.startsWith('/') || bg.startsWith('http') || bg.startsWith('data:'));
//   return (
//     <div
//       className={className}
//       id={id}
//       style={{
//         ...(isImage
//           ? {
//             backgroundImage: `url(${bg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'right center',
//             backgroundRepeat: 'no-repeat',
//             color: '#fff',
//             willChange: 'transform',
//             backfaceVisibility: 'hidden',
//           }
//           : {
//             backgroundColor: bg,
//             color: '#000',
//           }),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '5rem',
//         fontSize: 28,
//       }}
//     >
//       <h2 style={{ marginBottom: '20px' }}>{title}</h2>
//       {children}
//     </div>
//   );
// };

// // const LandingPage = ({ f7router }) => {
// //   const getSwitchedLang = useStore('getLanguageWhenReload');
// //   const [getdepartment, setGetDepartment] = useState([]);
// //   const [lang, setLang] = useState('ENGLISH');
// //   const [tnfont, setTnFont] = useState(false);
// //   const [language_data, set_language_data] = useState(f7.passedParams.language_contents);
// //   let store = f7.store;
// //   const checkLatest = async () => {
// //     const store = f7.store;
// //     f7.preloader.show();
// //     const response = await store.dispatch('getLatest');
// //     if (response?.success) setGetDepartment(response.data.organisations);
// //     f7.preloader.hide();
// //   };

// //   useEffect(() => {
// //     checkLatest();
// //     //const getLanguageFromLocal = localStorage.getItem('setLanguage');
// //     if (getSwitchedLang === 'ENGLISH') {
// //       setLang('ENGLISH');
// //       set_language_data(f7.passedParams.english_language);
// //     } else {
// //       setLang('TAMIL');
// //       set_language_data(f7.passedParams.tamil_language);
// //       setTnFont(true);
// //     }
// //   }, [lang]);

// //   const toggleLanguage = () => {
// //     let newLang;
// //     setLang(prev => {
// //       newLang = prev === 'ENGLISH' ? 'TAMIL' : 'ENGLISH';
// //       if (newLang === 'ENGLISH') {
// //         f7.passedParams.language_contents = f7.passedParams.english_language;
// //         set_language_data(f7.passedParams.english_language);
// //         setTnFont(false);
// //       } else {
// //         f7.passedParams.language_contents = f7.passedParams.tamil_language;
// //         set_language_data(f7.passedParams.tamil_language);
// //         setTnFont(true);
// //       }
// //       // localStorage.setItem('setLanguage', newLang);
// //       store.dispatch('setEngOrTn', newLang);
// //       return newLang;
// //     });
// //   };

// //   return (
// //     // <MainLayout
// //     //   language_data={language_data}
// //     //   lang={lang}
// //     //   toggleLanguage={toggleLanguage}
// //     //   tnClass={tnfont ? 'tnFontChange' : ''}
// //     //   f7router={f7router}
// //     // >
// //       <Page>
// //         <Section id="0" bg={homebg} className={tnfont ? 'tnFontChange posRel' : 'posRel'}>
// //           <WelcomePage language_data={language_data} />
// //         </Section>
// //         <Section id="1" bg="#fff" className={tnfont ? 'tnFontChange abouUsPage' : 'abouUsPage'}>
// //           <AboutPageRevamp language_data={language_data} />
// //         </Section>
// //         <Section id="2" className={tnfont ? 'tnFontChange schemeBg' : 'schemeBg'}>
// //           <SchemePageRevamp
// //             language_data={language_data}
// //             getdepartment={getdepartment}
// //             f7router={f7router}
// //             lang={lang}
// //             toggleLanguage={toggleLanguage}
// //             tnClass={tnfont ? 'tnFontChange' : ''}
// //           />
// //         </Section>
// //         <Section id="3" bg="#fff" className={tnfont ? 'tnFontChange padLRZ' : 'padLRZ'}>
// //           <HelpPageRevamp language_data={language_data} />
// //         </Section>
// //         <Section id="4" bg="rgb(10, 0, 50)" className={tnfont ? 'tnFontChange footerCls' : 'footerCls'}>
// //           <FooterRevampPage language_data={language_data} />
// //         </Section>
// //         <ChatBotPage languageData={language_data} />
// //       </Page>
// //     // </MainLayout>
// //   );
// // };

// const LandingPage = ({ f7router, language_data, lang, toggleLanguage, tnClass }) => {
//   debugger;
//   const getSwitchedLang = useStore('getLanguageWhenReload');
//   const [getdepartment, setGetDepartment] = useState([]);

//   const checkLatest = async () => {
//     const store = f7.store;
//     f7.preloader.show();
//     const response = await store.dispatch('getLatest');
//     if (response?.success) setGetDepartment(response.data.organisations);
//     f7.preloader.hide();
//   };

//   useEffect(() => {
//     checkLatest();
//   }, []);

//   return (
//     <Page>
//       <Section id="0" bg={homebg} className={tnClass ? 'tnFontChange posRel' : 'posRel'}>
//         <WelcomePage language_data={language_data} />
//       </Section>
//       <Section id="1" bg="#fff" className={tnClass ? 'tnFontChange abouUsPage' : 'abouUsPage'}>
//         <AboutPageRevamp language_data={language_data} />
//       </Section>
//       <Section id="2" className={tnClass ? 'tnFontChange schemeBg' : 'schemeBg'}>
//         <SchemePageRevamp
//           language_data={language_data}
//           getdepartment={getdepartment}
//           f7router={f7router}
//           lang={lang}
//           toggleLanguage={toggleLanguage}
//           tnClass={tnClass}
//         />
//       </Section>
//       <Section id="3" bg="#fff" className={tnClass ? 'tnFontChange padLRZ' : 'padLRZ'}>
//         <HelpPageRevamp language_data={language_data} />
//       </Section>
//       <Section id="4" bg="rgb(10, 0, 50)" className={tnClass ? 'tnFontChange footerCls' : 'footerCls'}>
//         <FooterRevampPage language_data={language_data} />
//       </Section>
//       <ChatBotPage languageData={language_data} />
//     </Page>
//   );
// };


// export default LandingPage;


import React, { useEffect, useState } from 'react';
import { Page, f7, useStore } from 'framework7-react';
import homebg from '../assets/images/landing-bg.jpg';
import { WelcomePage } from './frontend/welcome';
import { AboutPageRevamp } from './frontend/about-revamp';
import { FooterRevampPage } from './frontend/footer';
import { SchemePageRevamp } from './frontend/schemes-revamp';
import { HelpPageRevamp } from './frontend/help';
import { ChatBotPage } from './frontend/chat-bot';

const Section = ({ id, title, bg, children, className }) => {
  debugger;
  const isImage = typeof bg === 'string' && (bg.startsWith('/') || bg.startsWith('http') || bg.startsWith('data:'));
  return (
    <div
      className={className}
      id={id}
      style={{
        ...(isImage
          ? {
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
          }
          : {
            backgroundColor: bg,
            color: '#000',
          }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem',
        fontSize: 28,
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>{title}</h2>
      {children}
    </div>
  );
};

const LandingPage = ({ f7router }) => {
  debugger;
  const language_data = useStore('language_data');
  const lang = useStore('lang');
  const tnFont = useStore('tnFont');
  const toggleLanguage = () => f7.store.dispatch('toggleLanguage');

  const [getdepartment, setGetDepartment] = useState([]);

  const checkLatest = async () => {
    f7.preloader.show();
    const response = await f7.store.dispatch('getLatest');
    if (response?.success) setGetDepartment(response.data.organisations);
    f7.preloader.hide();
  };

  useEffect(() => {
    checkLatest();
  }, []);

  return (
    <Page>
      <Section data-id="home" id="0" bg={homebg} className={tnFont ? 'tnFontChange posRel' : 'posRel'}>
        <WelcomePage language_data={language_data} />
      </Section>
      <Section data-id="about" id="1" bg="#fff" className={tnFont ? 'tnFontChange abouUsPage' : 'abouUsPage'}>
        <AboutPageRevamp language_data={language_data} />
      </Section>
      <Section data-id="scheme" id="2" className={tnFont ? 'tnFontChange schemeBg' : 'schemeBg'}>
        <SchemePageRevamp
          language_data={language_data}
          getdepartment={getdepartment}
          f7router={f7router}
          lang={lang}
          toggleLanguage={toggleLanguage}
          tnClass={tnFont ? 'tnFontChange' : ''}
        />
      </Section>
      <Section data-id="help" id="3" bg="#fff" className={tnFont ? 'tnFontChange padLRZ' : 'padLRZ'}>
        <HelpPageRevamp language_data={language_data} />
      </Section>
      <Section id="4" bg="rgb(10, 0, 50)" className={tnFont ? 'tnFontChange footerCls' : 'footerCls'}>
        <FooterRevampPage language_data={language_data} />
      </Section>
      <ChatBotPage languageData={language_data} />
    </Page>
  );
};

export default LandingPage;
