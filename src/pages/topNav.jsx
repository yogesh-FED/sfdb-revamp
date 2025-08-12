import React from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  AccordionContent,
} from 'framework7-react';

const TopNavRevamp = ({ languageData }) => {


  return (
    <>
      <div>
        <div className="grid grid-cols-1 large-grid-cols-3">
          <div>
            <img src='' alt='logo'></img>
            <span><a>Tamil Nadu eGovernance Agency</a></span>
          </div>
          <div>
            <span>Skip To Main Content</span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
export { TopNavRevamp };