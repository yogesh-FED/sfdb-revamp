// import React, { useState, useEffect } from 'react';
// import { getDevice } from 'framework7/lite-bundle';
// import {
//   f7,
//   f7ready,
//   App,
//   Panel,
//   Views,
//   View,
//   Popup,
//   Page,
//   Navbar,
//   Toolbar,
//   NavRight,
//   Link,
//   Block,
//   BlockTitle,
//   LoginScreen,
//   LoginScreenTitle,
//   List,
//   ListItem,
//   ListInput,
//   ListButton,
//   BlockFooter
// } from 'framework7-react';
// import cordovaApp from '../js/cordova-app';

// import routes from '../js/routes';
// import store from '../js/store';
// import tamil_contents from '../assets/locales/tn/translator.json';
// import english_contents from '../assets/locales/en/translator.json';
// import pds_data from '../assets/pds.json';

// const MyApp = () => {


//   const token = localStorage.getItem('token');

//   localStorage.setItem('pds_transactions', JSON.stringify(pds_data.data.pds_data.transactionData));

//   const mode = localStorage.getItem('mode');

//   const theme = localStorage.getItem('theme');

//   const language = localStorage.getItem('language');
//   // const APP_URL = "http:";
//   const device = getDevice();
//   // Framework7 Parameters
//   const f7params = {
//     reloadCurrent: true,
//     name: 'SFDB', // App name
//     theme: 'auto', // Automatic theme detection
//     colors: {
//       primary: theme ? theme : '#007aff',
//     },
//     darkMode: mode && mode == "dark" ? true : false,
//     language: language ? language : "EN",
//     tamil_language: tamil_contents,
//     pds_transaction: pds_data,
//     english_language: english_contents,
//     language_contents: language && language == "TA" ? tamil_contents : english_contents,
//     token: token,
//     // App store
//     store: store,
//     // App routes
//     routes: routes,

//     // Input settings
//     input: {
//       scrollIntoViewOnFocus: device.cordova,
//       scrollIntoViewCentered: device.cordova,
//     },
//     // Cordova Statusbar settings
//     statusbar: {
//       iosOverlaysWebView: true,
//       androidOverlaysWebView: false,
//     },
//     view: {
//       pushState: false,
//       stackPages: true,
//       browserHistory: true,
//     }
//   };

//   f7ready(() => {
//     // Init cordova APIs (see cordova-app.js)
//     if (f7.device.cordova) {
//       cordovaApp.init(f7);
//     }

//     // Call F7 APIs here
//   });


//   const [language_data, set_language_data] = useState(store.getters.language_contents.value);

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {

//     const token = localStorage.getItem('authToken');

//     setIsAuthenticated(token !== null);



//   }, []);

//   return (
//     <App {...f7params}>

//       {/* Left panel with cover effect when hidden */}

//       <View main className="safe-areas" url="/" />

//     </App>
//   )
// }
// export default MyApp;

// import React, { useState, useEffect } from 'react';
// import { getDevice } from 'framework7/lite-bundle';
// import {
//   f7,
//   f7ready,
//   App,
//   View
// } from 'framework7-react';
// import cordovaApp from '../js/cordova-app';

// import routes from '../js/routes';
// import store from '../js/store';
// import tamil_contents from '../assets/locales/tn/translator.json';
// import english_contents from '../assets/locales/en/translator.json';
// import pds_data from '../assets/pds.json';

// const MyApp = () => {
//   const token = localStorage.getItem('token');
//   localStorage.setItem('pds_transactions', JSON.stringify(pds_data.data.pds_data.transactionData));

//   const mode = localStorage.getItem('mode');
//   const theme = localStorage.getItem('theme');
//   const language = localStorage.getItem('language');
//   const device = getDevice();

//   const f7params = {
//     name: 'SFDB',
//     theme: 'auto',
//     colors: {
//       primary: theme || '#007aff',
//     },
//     darkMode: mode === 'dark',
//     language: language || 'EN',
//     tamil_language: tamil_contents,
//     pds_transaction: pds_data,
//     english_language: english_contents,
//     language_contents: language === 'TA' ? tamil_contents : english_contents,
//     token,
//     store,
//     routes,
//     input: {
//       scrollIntoViewOnFocus: device.cordova,
//       scrollIntoViewCentered: device.cordova,
//     },
//     statusbar: {
//       iosOverlaysWebView: true,
//       androidOverlaysWebView: false,
//     },
//     view: {
//       pushState: false,
//       stackPages: true,
//       browserHistory: true,
//     }
//   };

//   f7ready(() => {
//     if (f7.device.cordova) cordovaApp.init(f7);
//   });

//   return (
//     <App {...f7params}>
//       <View main className="safe-areas" url="/" />
//     </App>
//   );
// };

// export default MyApp;

import React, { useEffect } from 'react';
import { getDevice } from 'framework7/lite-bundle';
import { f7, f7ready, App, View } from 'framework7-react';
import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import store from '../js/store';
import pds_data from '../assets/pds.json';
import MainLayout from '../components/MainLayout';

const MyApp = (props) => {
  const token = localStorage.getItem('token');
  localStorage.setItem('pds_transactions', JSON.stringify(pds_data.data.pds_data.transactionData));

  const mode = localStorage.getItem('mode');
  const theme = localStorage.getItem('theme');
  const language = localStorage.getItem('language');
  const device = getDevice();

  const f7params = {
    name: 'SFDB',
    theme: 'auto',
    colors: {
      primary: theme || '#007aff',
    },
    darkMode: mode === 'dark',
    language: language || 'EN',
    pds_transaction: pds_data,
    token,
    store,
    routes,
    input: {
      scrollIntoViewOnFocus: device.cordova,
      scrollIntoViewCentered: device.cordova,
    },
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
    view: {
      pushState: false,
      stackPages: true,
      browserHistory: true,
    }
  };

  f7ready(() => {
    if (f7.device.cordova) cordovaApp.init(f7);
  });

  return (
    <App {...f7params}>
      <MainLayout>
        <View main className="safe-areas" url="/" />
      </MainLayout>
    </App>
  );
};

export default MyApp;

