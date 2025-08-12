import React, { useState, useEffect } from 'react';
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
  Button
} from 'framework7-react';


const LandingPage = () => {

 return (
  <Page name="landing" className="page-background">
    {/* Top Navbar */}
    <Navbar>
      <NavLeft>
        
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft>
      <NavTitle sliding>MAKKAL SEVAI PORTAL</NavTitle>
      <NavRight>
         <img src="images/tn-logo.png" alt="" className="tn-logo"/>
         <img src="images/tnega-logo.png" alt="" className="tnega-logo" />
      </NavRight>
      
    </Navbar>
    {/* Toolbar */}
    <Toolbar top tabbar>
      <Link tabLink="#tab-1" tabLinkActive>
        Home
      </Link>
      <Link tabLink="#tab-2">About Makkal Sevai</Link>
      <Link tabLink="#tab-3">Services</Link>
      <Link tabLink="#tab-4">About TNeGA</Link>
      <Link tabLink="#tab-5">Login</Link>
    </Toolbar>
    {/* Page content */}
    <Block>
    <div className="grid grid-cols-1 medium-grid-cols-2 grid-gap">
        <div>
          <h2 className='welcome-title-1'> Welcome to</h2>
          <h3 className='welcome-title-2'> Makkal Sevai Portal</h3>
          <p>
          குறள் (1023)  <br />

குடிசெய்வல் என்னும் ஒருவற்குத் தெய்வம் <br />
மடிதற்றுத் தான்முந் துறும். <br />

பொருள் <br />

தன்னைச் சேர்ந்த குடிமக்களை உயர்வடையச் செய்திட ஓயாது உழைப்பவனுக்குத் தெய்வச் செயல்எனக்கூறப்படும் இயற்கையின் ஆற்றல் கூட வரிந்து கட்டிக்கொண்டு வந்து துணைபுரியும். <br />

- திருவள்ளுவர்
          </p>
        </div>
        
      </div>
    </Block>
   
  </Page>
  );
};
export default LandingPage;