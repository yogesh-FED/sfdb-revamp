import React, { useState, useEffect, useRef } from 'react';
import { SettingsPage } from './sfdb/settings';
import { PersonalInformationPage } from './sfdb/personal-information';
import { FamilyTreePage } from './sfdb/family-tree';
import { SchemeEligibilityPage } from './sfdb/scheme-eligibility';
import { AvailedServicePage } from './sfdb/availed-services';
import { CheckEligibilityPage } from './sfdb/check-eligibilty';
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
  f7,
  Toggle,
  Tabs,
  Tab,
  Icon,
  useStore
} from 'framework7-react';
import { closePopup } from './sfdb/popUpService';
import EligibiltyFilter from './sfdb/EligibiltyFilter';



const HomePage = (props) => {
  const userImgPath = localStorage.getItem('user_image');
  const topLogoImg = "https://makkalsevai.tn.gov.in/MakkalService/" + userImgPath;
  const store = f7.store;

  const [is_language, set_language] = useState(f7.params.language);
  const language_data = useStore('language_data');
  const lang = useStore('lang');
  const adharImg = useStore('aadharImg');
  // console.log('adharImglink', adharImg);
  const [user_image, set_user_image] = useState(store.getters.user_image.value);
  const [userName, setUserName] = useState(store.state.user);

  useEffect(() => {
    store.dispatch('checkImage');

    const image_path = localStorage.getItem('user_image');

    const path = "https://makkalsevai.tn.gov.in/MakkalService/" + image_path;

    set_user_image(path);
    // getUserName();
  }, [user_image]);

  // const getUserName = async () => {
  //   debugger;
  //   f7.preloader.show();
  //   const uid = localStorage.getItem('uidNumber');
  //   const response = await store.dispatch('getPersonalInfo', uid);

  //   if (response) {
  //     debugger;
  //     if (response.Message === "Success") {
  //       setUserName(response?.ApplicantInfo[0]?.Name);
  //     }
  //   }
  //   else {

  //     f7.toast.create({
  //       text: 'Server Could not connect. Please try after sometime',
  //       position: 'top',
  //       closeTimeout: 2000,
  //     }).open();

  //   }
  //   f7.preloader.hide();
  // }

  useEffect(() => {
    // Update f7.params.language whenever the state changes
    let lng = localStorage.getItem('language') ? localStorage.getItem('language') : "EN";
    set_language(lng);
    // set_language_data(f7.passedParams.language_contents);


  }, [is_language]); // Effect runs when 'language' state changes

  // const changeLanguage = (lng) => {
  //   debugger;
  //   set_language(lng);

  //   store.dispatch('setLanguage', lng);
  //   // set_language_data(f7.passedParams.language_contents);
  //   f7.passedParams.language = lng;
  //   if (lng === "EN") {
  //     f7.passedParams.language_contents = f7.passedParams.english_language;
  //   }
  //   else {
  //     f7.passedParams.language_contents = f7.passedParams.tamil_language;
  //   }


  // }
  const changeLanguage = () => f7.store.dispatch('toggleLanguage');
  const tabId = localStorage.getItem('authtabsId');

  const [is_tabs_id, set_tabs_id] = useState(tabId ? tabId : 1);

  const tabsChange = (id) => {

    set_tabs_id(id);

    localStorage.setItem('authtabsId', id);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  const logout = () => {
    f7.dialog.confirm('Do you want to logout this session?', 'Confirm', () => {
      checkUserLogout();
    });
  };

  const showCustomLoader = () => {
    const dialog = f7.dialog.create({
      text: '<div class="custom-loader blinking-text">Session cleared...</div>',
      cssClass: 'custom-loader-dialog',
      closeByBackdropClick: false,
    });
    dialog.open();
    return dialog;
  };
  const logoutTimer = useRef(null);
  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimer();
    };

    // Add listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);

    // Start the timer initially
    resetLogoutTimer();

    console.log('logoutTimer.current', logoutTimer.current);
    // Cleanup listeners and timer on unmount
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, []);
  const resetLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    // Set timer to 10 seconds (10 * 1000 ms)
    logoutTimer.current = setTimeout(() => {
      checkUserLogout();
    }, 600 * 600 * 1000); // 👈 10 seconds
  };
  const checkUserLogout = async () => {
    try {
      closePopup();
      f7.popup.close();
      f7.dialog.close();
      f7.sheet.close();
      f7.popover.close();
      f7.panel.close();
    } catch (e) {
      console.warn('Error closing F7 popups:', e);
    }
    const loader = showCustomLoader();
    const refreshToken = localStorage.getItem('token');
    try {
      const response = await store.dispatch('logout', refreshToken);
      if (response) {
        localStorage.removeItem('token');
        localStorage.removeItem('authtabsId');
        localStorage.removeItem('pds_transactions');
        localStorage.removeItem('user_image');
        localStorage.removeItem('f7router-view_main-history');
        localStorage.removeItem('language');
        localStorage.removeItem('ufc');
        localStorage.removeItem('uidNumber');
        localStorage.removeItem('user_image');
        localStorage.removeItem('individualMakkalId');
        localStorage.removeItem('family_members_names');
        localStorage.removeItem('makkalId');
        // f7.views.main.router.navigate('/', {
        //   clearPreviousHistory: true,
        //   ignoreCache: true,
        // });
        // window.location.reload();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    finally {
      loader.close();
    }
    // localStorage.removeItem('token');
    // localStorage.removeItem('authtabsId');
    // localStorage.removeItem('pds_transactions');
    // localStorage.removeItem('user_image');
    // localStorage.removeItem('f7router-view_main-history');
    // localStorage.removeItem('language');
    // localStorage.removeItem('ufc');
    // localStorage.removeItem('uidNumber');
    // localStorage.removeItem('user_image');
    // f7.views.main.router.navigate('/', {
    //   clearPreviousHistory: true,
    //   ignoreCache: true,
    // });
    // f7.preloader.hide();
    // const response = await store.dispatch('logout');

    // if (response.data) {
    //   if (response.success) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('authtabsId');
    //     localStorage.removeItem('pds_transactions');
    //     localStorage.removeItem('user_image');
    //     // location.reload();
    //     //f7.views.main.router.refreshPage();
    //     f7.views.main.router.navigate('/', {
    //       clearPreviousHistory: true,
    //       ignoreCache: true,
    //     });
    //   }
    //   else {
    //     // console.log(response.messeage);
    //   }

    // }
    // else {
    //   f7.toast.create({
    //     text: 'Server Could not connect. Please try after sometime',
    //     position: 'top',
    //     closeTimeout: 2000,
    //   }).open();
    // }
    // f7.preloader.hide();
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Page name="home" className='auth-background'>
      {/* Top Navbar */}
      <Navbar className='nav-background'>
        {/* <NavLeft><Link iconIos="f7:menu" iconMd="material:menu" className='menu-bar' panelOpen="left" /></NavLeft> */}
        <img src="/assets/images/tn-logo.png" alt="" className="tnega-logo" />
        <NavTitle className='nav-title navMenuTitle'>{language_data?.welcome_to_makkal_self_service_portal}</NavTitle>
        <NavRight>
          <span className="nav-title p-1 navMenuTitle">{lang == "ENGLISH" ? "English" : "தமிழ்"}</span>
          {
            is_language == "EN" ?
              <Toggle onChange={() => changeLanguage('TA')} />
              :
              <Toggle defaultChecked onChange={() => changeLanguage('EN')} />
          }
          <Button onClick={logout}>
            <Icon md="material:logout" ios="f7:lock_rotation_open" slot="media" className='text-white' />
          </Button>
          <img src={topLogoImg} alt="" className="user-logo" />
          {/* <img src="/assets/images/user.png" alt="" className="tnega-logo" /> */}
        </NavRight>

      </Navbar>
      {/* Toolbar */}
      {!isMobile ?
        <Toolbar top className='tabbar-auth homeTabClicks' tabbar>
          <Link onClick={() => tabsChange("A")} tabLink="#tab-a" tabLinkActive={is_tabs_id == "A"}>
            <span>
              <img src="/assets/images/nav-icons/profile-1.png" alt="" className='nav-icon-image-big' />
            </span>
            <span>
              {language_data?.personal_information}
            </span>
          </Link>
          <Link onClick={() => tabsChange("B")} tabLink="#tab-b" tabLinkActive={is_tabs_id == "B"}>
            <span>
              <img src="/assets/images/nav-icons/family-tree-1.png" alt="" className='nav-icon-image-big' />
            </span>
            <span>
              {language_data?.family_details}
            </span>
          </Link>
          <Link onClick={() => tabsChange("C")} tabLink="#tab-c" tabLinkActive={is_tabs_id == "C"}>
            <span>
              <img src="/assets/images/nav-icons/service-nav.png" alt="" className='nav-icon-image-big' />
            </span>
            <span>
              {language_data?.services_availed}
            </span>
          </Link>
          <Link onClick={() => tabsChange("D")} tabLink="#tab-d" tabLinkActive={is_tabs_id == "D"}>
            <span>
              <img src="/assets/images/nav-icons/voter.png" alt="" className='nav-icon-image-big' />
            </span>
            <span>
              {language_data?.my_scheme_eligible}
            </span>
          </Link>
          {/* <Link  onClick={()=>tabsChange("E")} tabLink="#tab-e" tabLinkActive={is_tabs_id== "E"}>
            <img src="/assets/images/nav-icons/check.png" alt="" className='nav-icon-image-big'/>
            {language_data?.Schemes_eligibility_check}</Link> */}
        </Toolbar>
        :
        <Toolbar bottom tabbar className='tabbar-auth tabbar-auth-mobile'>
          <Link onClick={() => tabsChange("A")} tabLink="#tab-a" tabLinkActive={is_tabs_id == "A"}>
            <img src="/assets/images/nav-icons/profile-1.png" alt="" className='nav-icon-image-big' /><span className="padL nav-text">Personal Information</span>
          </Link>
          <Link onClick={() => tabsChange("B")} tabLink="#tab-b" tabLinkActive={is_tabs_id == "B"}>
            <img src="/assets/images/nav-icons/family-tree-1.png" alt="" className='nav-icon-image-big' /><span className="padL nav-text"> Family Tree</span>
          </Link>
          <Link onClick={() => tabsChange("C")} tabLink="#tab-c" tabLinkActive={is_tabs_id == "C"}>
            <img src="/assets/images/nav-icons/service-nav.png" alt="" className='nav-icon-image-big' /><span className="padL nav-text">Availed Schemes</span>
          </Link>
          <Link onClick={() => tabsChange("D")} tabLink="#tab-d" tabLinkActive={is_tabs_id == "D"}>
            <img src="/assets/images/nav-icons/voter.png" alt="" className='nav-icon-image-big' /> <span className="padL nav-text">Eligible Schemes</span>
          </Link>
          {/* <Link  onClick={()=>tabsChange("E")} tabLink="#tab-e" tabLinkActive={is_tabs_id== "E"}>
          <img src="/assets/images/nav-icons/check.png" alt="" className='nav-icon-image-big'/> <span className="nav-text">Check Eligiblilty</span>
          </Link> */}
        </Toolbar>
      }
      {/* Page content */}

      <Tabs animated >

        <Tab id="tab-a" tabActive={is_tabs_id == "A"} className='clearMar'>

          <PersonalInformationPage userImgPath={userImgPath} languageData={language_data} language={is_language} lang={lang}></PersonalInformationPage>

        </Tab>
        <Tab id="tab-b" tabActive={is_tabs_id == "B"} className='clearMar wid75'>

          <FamilyTreePage languageData={language_data} lang={lang} language={is_language}></FamilyTreePage>

        </Tab>
        <Tab id="tab-c" tabActive={is_tabs_id == "C"}>

          <AvailedServicePage languageData={language_data} language={is_language} lang={lang}></AvailedServicePage>

        </Tab>
        <Tab id="tab-d" tabActive={is_tabs_id == "D"}>

          <SchemeEligibilityPage languageData={language_data} language={is_language} lang={lang}></SchemeEligibilityPage>
          {/* <EligibiltyFilter
            languageData={language_data} language={is_language} lang={lang}
          /> */}
        </Tab>

        <Tab id="tab-e" tabActive={is_tabs_id == "E"}>

          <CheckEligibilityPage languageData={language_data} language={is_language} lang={lang}></CheckEligibilityPage>

        </Tab>
        {/* <Tab id="tab-e" tabActive={is_tabs_id == "E"}>
          
          <SettingsPage></SettingsPage>
      
       </Tab> */}
      </Tabs>


    </Page>
  )
};
export default HomePage;