import React, { useState, useEffect, useSelect } from 'react';
import { Block } from 'framework7-react';

const AboutTnegaPage = ({languageData}) => {


 return (
      <Block>
      <p className='welcome-title-1'> {languageData?.about_tnega_title}</p>
      <div className="grid grid-cols-1 medium-grid-cols-2 grid-gap">
        <div></div>
        <div className='box'>
        
        <p>
        {languageData?.about_tnega_desc}
        </p>
      
        </div>
        
      </div>
      </Block>
         
  );
};
export { AboutTnegaPage };