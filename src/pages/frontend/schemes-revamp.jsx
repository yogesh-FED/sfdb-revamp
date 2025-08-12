import React, { useEffect } from 'react';
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

const SchemePageRevamp = ({ language_data, getdepartment, f7router, toggleLanguage, tnClass, lang }) => {
  return (
    <>
      <TabStructure
        language_data={language_data}
        tnClass={tnClass}
        getdepartment={getdepartment}
        f7router={f7router}
        toggleLanguage={toggleLanguage}
        lang={lang}
      />
    </>
  );
};
export { SchemePageRevamp };