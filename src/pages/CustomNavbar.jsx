import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useRef } from 'react';
import { App, View, Page, Navbar, Button, f7, Popup } from 'framework7-react';

const CustomNavbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("0");
  const menuItems = [props.language_data.home,
  props.language_data.about,
  props.language_data.scheme,
  props.language_data.help];
  const scrollToSection = (id, setOpen) => {
    debugger;
    if (props.hideMenusInDetailPage === true) {
      props.f7router.navigate('/', { clearPreviousHistory: true, ignoreCache: true })
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
          if (setOpen) setOpen(false);
        }
      }, 300)
    } else {
      f7.views.main.router.navigate('/', {
        clearPreviousHistory: true,
        ignoreCache: true,
      });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
          if (setOpen) setOpen(false);
        }
      }, 300)
    }

  };

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      menuItems.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  const [hideMenu, setHideMenu] = useState(false);
  useEffect(() => {
    // if (props.hideMenusInDetailPage !== true) {
    //   scrollToSection(0);
    // }
  }, []);
  const popup = useRef(null);
  const LoginPopup = () => {
    setHideMenu(true);
    f7.views.main.router.navigate('/login', {
      clearPreviousHistory: true,
      ignoreCache: true,
    });
  };
  const handleHomeClick = () => {
    setHideMenu(false);
    props.f7router.navigate('/', { clearPreviousHistory: true, ignoreCache: true })
    //scrollToSection(0);
  }
  const goToHome = () => {
    setHideMenu(false);
    f7.views.main.router.navigate('/', {
      clearPreviousHistory: true,
      ignoreCache: true,
      reloadAll: true,
    });
  }
  //const homePage = ()
  return (
    <>
      {/* <div className="grid grid-cols-1 large-grid-cols-4 topNav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          background: '#0A0032',
          padding: '5px 16px',
          color: '#fff'
        }}>
        <span><img src={topNavLogo} alt="tnega" /> <a href='' className='tnegaLink' target='blank' onClick={() => alinkClk()}>Tamil Nadu eGovernance Agency  <img src={openInNew} alt='link' /></a></span>
        <p></p>
        <p>
          <span>{props.language_data.skipToNavigation}</span>
          <span className='rt1'>A<sup>+</sup> </span><span className='rt1'> A </span><span className='rt1'>A <sup>-</sup></span>
        </p>
        <div>
          <Button onClick={() => props.toggleLanguage(props.lang)} className='btnStyle'>
            <img src={globe} alt='globe' /> &nbsp; {props.lang} &nbsp; <img src={langDown} alt='language' />
          </Button>
        </div>
      </div> */}
      <Navbar
        className={props.isDetailsPage === 'hideMenus' ? 'menuHide makkalportalmenu' : 'makkalportalmenu'}
        noHairline
        style={{
          position: 'fixed',
          top: 44,
          left: 0,
          width: '100%',
          zIndex: 99999,
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          height: '64px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo + Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }} className='flexAuto'
          onClick={handleHomeClick}>
          <img src="/assets/images/tn-logo.png" alt="" className="tn-logo" />
          <div style={{ lineHeight: 1.2, cursor: 'pointer' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#002060' }}>
              {props.language_data.makkalPortal}
            </div>
            <div style={{ fontSize: '12px', color: '#444' }}>
              {props.language_data.TnGov}
            </div>
          </div>
        </div>

        {/* Center: Menu */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div
            className={props.tnClass === 'tnFontChange' ? "tnFontChange desktop-menu" : "desktop-menu"}
            style={{
              display: props.hideNav === true ? 'none' : 'inline-flex',
              gap: '40px',
              alignItems: 'center'
            }}>
            {
              !hideMenu && menuItems.map((item, indx) => (
                <span
                  key={indx}
                  onClick={() => scrollToSection(indx)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 500,
                    padding: activeSection === indx ? '0.5rem 1rem' : 'none',
                    background: activeSection === indx ? 'rgb(10, 0, 50)' : 'none',
                    color: activeSection === indx ? '#fff' : '#222',
                    transition: 'all 0.3s ease',
                    borderRadius: activeSection === indx ? '5px' : 'none',
                  }}
                >
                  {item}
                </span>
              ))
            }
          </div>
        </div>

        {/* Right: Login Button */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          {
            !hideMenu &&
            <button
              className='loginBtn'
              //onClick={() => handleLoginClick('Login clicked')}
              onClick={props.hideNav === true ? goToHome : LoginPopup}
              style={{
                backgroundColor: props.hideNav === true ? '#fff' : '#0c64bc',
                color: props.hideNav === true ? '#222' : '#fff',
                border: 'none',
                padding: props.hideNav === true ? '0' : '0.8rem 1rem',
                borderRadius: '5px',
                fontWeight: 500,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width: 'auto',
                marginRight: '10rem'
              }}

            >
              {props.hideNav === true ? '' : props.language_data.login}
            </button>
          }
        </div>
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            fontSize: '22px',
            cursor: 'pointer',
          }}
        >
          ☰
        </div>
      </Navbar >

      {/* Mobile dropdown */}
      {
        menuOpen && (
          <div
            className="mobile-menu"
            style={{
              position: 'fixed',
              top: '64px',
              width: '100%',
              background: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 0',
            }}
          >
            {menuItems.map((item, indx) => (
              <span
                key={indx}
                onClick={() => scrollToSection(indx, setMenuOpen)}
                style={{
                  padding: '10px 0',
                  width: '100%',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 500,
                  color: activeSection === indx ? '#002060' : '#000',
                  backgroundColor: activeSection === indx ? '#f2f2f2' : 'transparent',
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            ))}
          </div>
        )
      }

      {/* Responsive toggle */}
      <style jsx='true'>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger {
            display: inline-block !important;
            margin-right: 1rem;
          }
          .loginBtn {
            margin-right: 1rem !important;
          }
          .flexAuto {
            flex: auto !important;
          }
          .navbar {
            top: 7rem !important;
          }
          .topNav p {
            text-align: left !important;
          }
          .mobile-menu {
            top: 10.5rem !important;
          }
          #about, #scheme, #help {
            padding-top: 7rem !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
          .posRel {
          position: relative;
          }
      `}</style>
    </>
  );
};

export { CustomNavbar };