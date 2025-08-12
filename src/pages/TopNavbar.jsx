import React from 'react';
import { App, View, Page, Navbar, Button, f7, Popup } from 'framework7-react';
import topNavLogo from '../assets/images/topNavlogo.png';
import globe from '../assets/images/globe.png';
import langDown from '../assets/images/lang-down.png';
import openInNew from '../assets/images/open_in_new.png';

const TopNavbar = (props) => {
  console.log('topnavbarprops', props);
  const alinkClk = () => {
    window.open("https://tnega.tn.gov.in/", "_blank");
  }
  return (
    <div>
      <div className="grid grid-cols-1 large-grid-cols-4 topNav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 99999,
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
      </div>
    </div>
  )
}

export default TopNavbar