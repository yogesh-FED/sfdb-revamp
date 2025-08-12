import React, { useState, useEffect, useSelect } from 'react';
import { Block , List, ListItem, Button, ListInput} from 'framework7-react';

const BottomPage = () => {


 return (
  
   <div className="ticker">
          <div className="news-title">
              <h5>Latest Updates</h5>
          </div>
          <div className="news">
              <marquee className="news-content">
                  <p>Makkal Portal will allow the resident of Tamil Nadu to view their personal information available in various department/beneficiary databases. Using Aadhar based authentication, the residents can make changes to their personal information, update residential address in SFDB and upload the supporting documents for the changes.
                </p>
              </marquee>
          </div>
      </div>
         
  );
};
export { BottomPage };