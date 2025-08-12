import React, { useState, useEffect, useSelect } from 'react';

import { 
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toggle
} from 'framework7-react';

import store from '../../js/store';

const NavbarPage = (props) => {
    
    const languageData = props.languageData;
    
    const language = props.language;

    const updateNewData = props.updateData;
    
    const [is_language, set_language] = useState(language ? language : "EN");

    const changeLanguage=(lng)=>{
     
             set_language(lng);
    
    store.dispatch('setLanguage', lng);
    store.dispatch('getLanguage');
    // updateNewData(store.getters.language_contents.value);
    
    }
 return (
        
                <Navbar className='nav-background' sliding={false} fixed>
                    <NavLeft><Link iconIos="f7:menu" iconMd="material:menu" className='menu-bar' panelOpen="left"/></NavLeft>
                    <NavTitle className='nav-title'>{languageData?.welcome_to_makkal_self_service_portal}</NavTitle>
                    <NavRight>
                        <span className="nav-title p-1">{is_language == "EN" ? "English" : "தமிழ்"}</span>
                        {
                            is_language == "EN" ?  
                            <Toggle  onChange={()=>changeLanguage('TA')} />
                            : 
                            <Toggle defaultChecked onChange={()=>changeLanguage('EN')} />
                        }
                        
                        <img src="/assets/images/tn-logo.png" alt="" className="tn-logo"/>
                        <img src="/assets/images/tnega-logo.png" alt="" className="tnega-logo" />
                    </NavRight>
                
                </Navbar>
          
  );


  
};
export {NavbarPage} ;
