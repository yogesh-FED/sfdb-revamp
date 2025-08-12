import React, { useState, useEffect, useSelect } from 'react';
import { Block } from 'framework7-react';

const AboutPage = ({languageData}) => {


 return (
        
        
         
          <Block>
             <p className='welcome-title-1'>{languageData?.about_makkal_portal_title}</p>
               <div className="grid grid-cols-1 large-grid-cols-2 grid-gap">
                  
                  <div className='box'>
               
                     <p>
                     {languageData?.about_makkal_portal_desc}
                     </p>
               
                  </div>
                  <div>
                     <center>
                     <img src="/assets/images/about.png" alt="" className='image-responsive-half' />
                     </center>
                  </div>
          
              </div>
          </Block>
         
         
  );
};
export { AboutPage };