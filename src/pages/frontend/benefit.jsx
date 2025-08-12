import React, { useState, useEffect, useSelect } from 'react';
import { Block } from 'framework7-react';

const BenefitPage = ({languageData}) => {


 return (
        <Block>
           <p className='welcome-title-1'>{languageData?.services}</p>
            <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-3 grid-gap">
                <div className='benefit-box'>
                  <img src="/assets/images/user.png" alt="" />
                    <h3>{languageData?.landing_profile_update_card_title}</h3>
                    <p>{languageData?.landing_profile_update_card_desc}</p>
                </div>
                <div className='benefit-box'>
                  <img src="/assets/images/benefit.png" alt="" />
                    <h3>{languageData?.landing_benefits_card_title}</h3>
                    <p>{languageData?.landing_benefits_card_desc}</p>
                </div>
                <div className='benefit-box'>
                  <img src="/assets/images/scheme.png" alt="" />
                    <h3>{languageData?.landing_schemeEligibility_card_title}</h3>
                    <p>{languageData?.landing_schemeEligibility_card_desc}</p>
                </div>
                </div>
                <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
                <div className='benefit-box'>
                    <img src="/assets/images/tracking.png" alt="" />
                    <h3>{languageData?.landing_cmHelpline_card_title}</h3>
                    <p>{languageData?.landing_cmHelpline_card_desc}</p>
                </div>
                <div className='benefit-box'>
                <img src="/assets/images/listing.png" alt="" />
                  <h3>{languageData?.landing_eSevai_card_title}</h3>
                  <p>{languageData?.landing_eSevai_card_desc}</p>
                </div>
                
              </div>
             
           </Block>
          
  );
};
export { BenefitPage };