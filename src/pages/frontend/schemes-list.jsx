import React, { useState, useEffect, useSelect } from 'react';
import { Block, Page, List, ListInput, Navbar } from 'framework7-react';

const SchemesList = ({ languageData }) => {


  return (



    <Block>
      {/* <p className='welcome-title-1'>All Schemes</p> */}
      {/* <div className="grid grid-cols-1 large-grid-cols-1 grid-gap">

        <div className='schemeListbox'>



        </div>


      </div> */}
      {/* <div class="grid grid-cols-3 grid-gap">
        <div class="col-span-2 schemeListbox"></div>
        <div class=" schemeListbox"></div>
      </div> */}



      <div className="grid grid-cols-1 medium-grid-cols-2 grid-gap schemeListbox" style={{ display: 'flex' }}>
        <div style={{ flexBasis: '77.66%' }}><p>All Schemes</p>
          <div className="grid grid-cols-4 grid-gap allSchemeList">
            <div>Naan Mudhalvan</div>
            <div>Kalaignarin Kanavu Illam</div>
            <div>Unemployment Assistance</div>
            <div>OAP</div>
          </div>
        </div>
        <div style={{ flexBasis: '22.33%' }} className='filterSection'><p>Filter</p>
          <div className="grid grid-cols-1 grid-gap">
            <List inset>
              <ListInput
                label="Community"
                type="select"
                placeholder="Choose Community"
                defaultValue=""
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="" disabled selected hidden>Choose one</option>
                <option value="1">BC</option>
                <option value="2">MBC</option>
                <option value="3">SC/ST</option>
              </ListInput>

              <ListInput
                label="Gender"
                type="select"
                placeholder="Choose Gender"
                defaultValue=""
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="" disabled selected hidden>Choose one</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">TransGender</option>
              </ListInput>
              <ListInput
                label="Birthday"
                type="date"
                defaultValue="2014-04-30"
                placeholder="Please choose..."
              >
              </ListInput>
            </List>
          </div>

        </div>
      </div>





    </Block>


  );
};
export { SchemesList };