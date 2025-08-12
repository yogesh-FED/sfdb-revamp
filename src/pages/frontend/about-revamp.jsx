import React, { useState, useEffect, useSelect } from 'react';
import { Block } from 'framework7-react';
import aboutUsImg from '../../assets/images/about-us.png';

const AboutPageRevamp = ({ language_data }) => {


  return (
    <>
      <div>
        <div className="grid grid-cols-1 large-grid-cols-2 grid-gap">
          <div className='about_us_content'>
            <h3> {language_data.about_us} </h3>
            <p> {language_data.about_us_text1} </p>
            <p> {language_data.about_us_text2} </p>
            {/* <a href="#" className='viewMore'> {language_data.viewMore} </a> */}
          </div>
          <div>
            <div className='about_us_img'>
              <img src={aboutUsImg} alt='aboutUsImg' />
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1">
          <div className='kyswl'>
            <h4> {language_data.know_your_scheme} </h4>
            <button> {language_data.know_your_scheme_cta} </button>
          </div>
        </div> */}
      </div>
    </>
  );
};
export { AboutPageRevamp };