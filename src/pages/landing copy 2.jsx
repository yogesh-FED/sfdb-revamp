import React, { useState, useEffect, useSelect } from 'react';
import { BenefitPage } from './components/benefit';
import { NavbarPage } from './components/navbar';
import { TopToolbarPage} from './components/top-toolbar';
import { WelcomePage} from './components/welcome';
import { AboutPage} from './components/about';
import {
  Page,
  
  Link,
  Toolbar,
  Block,
  Button,
  List,
  ListItem,
  ListInput,
  Tabs, Tab, Toggle
} from 'framework7-react';

const LandingPage = (props) => {

const store = props.f7router.app.store;

const [language_data, set_language_data] = useState(store.state.language_contents);

const language = store.state.language;

const updateLanguageData = (newData) => {
     set_language_data(newData);
};
 return (
  <Page name="landing" className="landing-page">
    {/* Top Navbar */}
    
    <NavbarPage languageData={language_data} language={language} updateData={updateLanguageData}></NavbarPage>
    {/* Toolbar */}
    {/* <TopToolbarPage languageData={language_data}></TopToolbarPage> */}
    {/* Page content */}
    <Tabs swipeable>
      <Tab id="tab-1" className="page-content page-background" tabActive>
          <Block className='box-bg'>
              <WelcomePage></WelcomePage>
          </Block>
      </Tab>
      <Tab id="tab-2" className="page-content page-bg-1">
       <AboutPage languageData={language_data}></AboutPage>
      </Tab>
      <Tab id="tab-3" className="page-content page-bg-1">
          <BenefitPage languageData={language_data}></BenefitPage>
      </Tab>
      <Tab id="tab-4" className="page-content page-bg-2">
        <Block>
        <p className='welcome-title-1'> {language_data?.about_tnega_title}</p>
        <div className="grid grid-cols-1 medium-grid-cols-2 grid-gap">
           <div></div>
           <div className='box'>
          
           <p>
           {language_data?.about_tnega_desc}
          </p>
         
           </div>
           
        </div>
        </Block>
      </Tab>
      <Tab id="tab-5" className="page-content page-bg-1">
        <Block>
       
        <div className="grid grid-cols-1 medium-grid-cols-2 grid-gap">
           <div>
               <center>
               <img src="assets/images/tn-logo.png" alt="" className="login-logo" />
               <p className='login-box-title'> {language_data?.welcome_to_makal_sevai_title}</p>
               </center>
           </div>
           <div className='login-box'>
           <h3 className='text-center'> {language_data?.login}</h3>
           <List strongIos outlineIos dividersIos>
            <ListItem
              radio
              radioIcon="start"
              className='text-white'
              title={language_data?.login_with_aadhar}
              name="login_with"
              value="aadhar"
             
              defaultChecked
            />
            <ListItem
              radio
              radioIcon="start"
              className='text-white'
              title={language_data?.login_with_mobile}
              name="login_with"
              value="mobile"
              
            />
            
            <ListInput  outline floatingLabel type="text" placeholder={language_data?.enter_aadhar_number}></ListInput>
            <ListItem checkbox checkboxIcon="start" title={language_data?.consent_label} name="demo-checkbox" />
            <Button fill round className='login-button'>
            {language_data?.send_otp}
            </Button>
            </List>
           
           </div>
           
        </div>
        </Block>
      </Tab>
    </Tabs>
    
      <div className="ticker">
          <div className="news-title">
              <h5>Latest Updates</h5>
          </div>
          <div className="news">
              <marquee className="news-content">
                  <p>The September 11 attacks, as well as the September 11, 2001 attacks or the September 11 attacks, known as: 9/11; It is a group of attacks that targeted the United States on Tuesday, September 11, 2001, and was carried out by four commercial civilian transport planes, led by four teams affiliated with Al-Qaeda, directed to hit specific targets
                </p>
              </marquee>
          </div>
      </div>
     
  </Page>
  );
};
export default LandingPage;