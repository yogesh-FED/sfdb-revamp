import React, { useState, useEffect, useSelect } from 'react';
import { Panel,View, Page, List, ListItem, Navbar, Link } from 'framework7-react';

const LeftPanelPage = ({languageData}) => {


 return (
    <Panel left cover  disableBreakpoint={768}>
    <View>
      <Page className='panel-page page-bg-1'>
       
        <center>
        <img src="/assets/images/tn-logo.png" alt="" className='image-responsive-minimum'/>
        </center>
        <hr />
        <List className="">
       
        <p className="porul-title">
        {languageData?.address}
        </p>
        <p className="porul">
        {languageData?.address_info}
        </p>
        <p className="porul-title">
        {languageData?.email}
        </p>
        <p className="porul">
        makkalsevai@tn.gov.in
        </p>
        <p className="porul-title">
        {languageData?.phone}
        </p>
        <p className="porul">
        +91 - 44 - 40164907
        </p>
        <p className="porul-title">
        {languageData?.fax}
        </p>
        <p className="porul">
        +91 - 44 - 28521112
        </p>

        </List>
        
      </Page>
    </View>
  </Panel>
  );
};
export { LeftPanelPage };