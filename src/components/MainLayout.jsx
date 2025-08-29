// import React, { useEffect, useState } from 'react';
// import { f7, f7ready } from 'framework7-react';
// import { CustomNavbar } from '../pages/CustomNavbar';
// import TopNavbar from '../pages/TopNavbar';

// const MainLayout = ({ children, language_data, lang, toggleLanguage, tnClass, f7router }) => {
//   const [hideNav, setHideNav] = useState(false);
//   const [hideMenusInDetailPage, setHideMenusInDetailPage] = useState(false);
//   useEffect(() => {
//     f7ready(() => {
//       const mainView = f7.views?.main;
//       if (mainView && mainView.router) {

//         checkRoute(mainView.router.currentRoute?.path);

//         mainView.router.on('routeChange', (newRoute) => {
//           checkRoute(newRoute.path);
//         });
//       }
//     });
//   }, []);

//   const checkRoute = (path) => {
//     debugger;
//     if (path === '/home/' || path === '/home') {
//       setHideNav(true);
//     } else {
//       setHideNav(false);
//     }
//     if (path === '/details') {
//       setHideMenusInDetailPage(true);
//     }
//   };

//   return (
//     <>
//       {!hideNav && (
//         <>
//           <TopNavbar
//             language_data={language_data}
//             lang={lang}
//             toggleLanguage={toggleLanguage}
//             tnClass={tnClass}
//           />
//           <CustomNavbar
//             isDetailsPage="showMenus"
//             language_data={language_data}
//             lang={lang}
//             toggleLanguage={toggleLanguage}
//             tnClass={tnClass}
//             f7router={f7router}
//             hideNav={hideNav}
//             hideMenusInDetailPage={hideMenusInDetailPage}
//           />
//         </>
//       )}
//       {/* <>
//         <TopNavbar
//           language_data={language_data}
//           lang={lang}
//           toggleLanguage={toggleLanguage}
//           tnClass={tnClass}
//         />
//         <CustomNavbar
//           isDetailsPage="showMenus"
//           language_data={language_data}
//           lang={lang}
//           toggleLanguage={toggleLanguage}
//           tnClass={tnClass}
//           f7router={f7router}
//         />
//       </> */}
//       {children}
//     </>
//   );
// };

// export default MainLayout;


import React, { useEffect, useState } from 'react';
import { f7, f7ready, useStore } from 'framework7-react';
import { CustomNavbar } from '../pages/CustomNavbar';
import TopNavbar from '../pages/TopNavbar';
import AccessibilityWidget from './AccessibilityWidget';

const MainLayout = ({ children }) => {
  //debugger;
  const lang = useStore('lang');
  const language_data = useStore('language_data');
  const tnFont = useStore('tnFont');
  const toggleLanguage = () => f7.store.dispatch('toggleLanguage');

  const [hideNav, setHideNav] = useState(false);
  const [hideMenusInDetailPage, setHideMenusInDetailPage] = useState(false);
  const [f7router, setF7Router] = useState(null);
  useEffect(() => {
   // debugger;
    f7ready(() => {
      const customRouter = f7.views?.main?.router;
      setF7Router(customRouter);
      const mainView = f7.views?.main;
      if (mainView?.router) {
        checkRoute(mainView.router.currentRoute?.path);
        mainView.router.on('routeChange', (newRoute) => {
          checkRoute(newRoute.path);
        });
      }
    });
  }, []);

  const checkRoute = (path) => {
    if (path === '/home/' || path === '/home') {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
    if (path === '/details') {
      setHideMenusInDetailPage(true);
    }
  };

  return (
    <>
      {!hideNav && (
        <>
          <TopNavbar
            language_data={language_data}
            lang={lang}
            toggleLanguage={toggleLanguage}
            tnClass={tnFont ? 'tnFontChange' : ''}
          />
          <CustomNavbar
            isDetailsPage="showMenus"
            language_data={language_data}
            lang={lang}
            toggleLanguage={toggleLanguage}
            tnClass={tnFont ? 'tnFontChange' : ''}
            f7router={f7router}
            hideNav={hideNav}
            hideMenusInDetailPage={hideMenusInDetailPage}
          />
        </>
      )}
      {children}
      {/* <AccessibilityWidget /> */}
    </>
  );
};

export default MainLayout;