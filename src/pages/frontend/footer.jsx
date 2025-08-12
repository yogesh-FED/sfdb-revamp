import React from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  Toolbar,
  Link,
  Tabs,
  Tab,
} from 'framework7-react';
import TabStructure from './tabStructure';
import fb from '../../assets/images/fb.png';
import linkdIn from '../../assets/images/linkdIn.png';
import insta from '../../assets/images/insta.png';
import twitter from '../../assets/images/twitter.png';
import yt from '../../assets/images/yt.png';
import footertnega from '../../assets/images/footertnega.png';

const FooterRevampPage = ({ language_data }) => {


  return (
    <>
      <div className='grid grid-cols-1 large-grid-cols-4 footer_sec'>
        <div>
          <h6>Makkal Portal </h6>
          <span className='pad1r'>powered by <a><img src={footertnega} alt='logo' /></a> <b className='footerLogotext'>TNeGA</b> </span>
          <span className='pad1r clrB'>Tamil Nadu e-Governance Agency/ Directorate of e-Governance</span>
          <span className='clrB'>Information Technology and Digital Services Department,Government of Tamil Nadu</span>
          <div className='grid grid-cols-5 large-grid-cols-5 footer_sec_social_icon'>
            <a><img src={fb} alt='facebook' /></a>
            <a><img src={linkdIn} alt='linkedIn' /></a>
            <a><img src={insta} alt='instagram' /></a>
            <a><img src={twitter} alt='twitter' /></a>
            <a><img src={yt} alt='youtube' /></a>
          </div>
        </div>
        <div>
          <h6>Quick links </h6>
          <span> <a>Screen Reader</a></span>
          <span> <a>Accessibility Statement</a></span>
          <span> <a>Frequently Asked Questions</a></span>
          <span> <a>Disclaimer</a></span>
          <span> <a>Terms & Conditions</a></span>
          <span> <a>Privacy Policy</a></span>
        </div>
        <div><h6>Useful Links</h6></div>
        <div>
          <h6>Get in touch</h6>
          <span>Directorate of e-Governance / Tamil Nadu e-Governance Agency, 2nd & 7th Floor, P.T.LEE Chengalvaraya Naicker Building, Anna Salai, Chennai - 600 002 </span>
          <span>Email - makkalsevai@tn.gov.in</span>
          <span>Phone - +91 - 44 - 40164907</span>
        </div>
      </div>
    </>
  );
};
export { FooterRevampPage };