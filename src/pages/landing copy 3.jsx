import React , {useState, useEffect}from 'react';
import { AboutPage} from './frontend/about';
import { AboutTnegaPage } from './frontend/about-tnega';
import { WelcomePage} from './frontend/welcome';
import { BenefitPage } from './frontend/benefit';
import { LoginPage } from './frontend/login';
import { BottomPage } from './frontend/bottom';
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
          set_language_data(store.getters.language_contents.value);
  
  }
  const tabsChange=(id)=>{
    set_tabs_id(id);
    localStorage.setItem('tabsId', id);
  }
  useEffect(() => {
          let lng = localStorage.getItem('language') ? localStorage.getItem('language') : "EN";
          set_language(lng);
          store.dispatch('setLanguage', lng);
          set_language_data(store.getters.language_contents.value);

  }, [is_language]);
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
      <BottomPage></BottomPage>
  </Page>
);
}
export default LandingPage;