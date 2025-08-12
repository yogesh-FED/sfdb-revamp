import React, { useState, useEffect, useSelect } from 'react';
import { Block, f7 } from 'framework7-react';

const WelcomePage = ({ language_data }) => {
  debugger;
  const store = f7.store;

  const tabsId = localStorage.getItem('tabsId');

  const [posts, set_posts] = useState(store.state.posts);
  const [resource, set_resource] = useState(store.state.resource);
  const checkLatest = async () => {

    f7.preloader.show();

    const response = await store.dispatch('getLatest');

    if (response) {
      if (response.success) {
        set_posts(response.data);
        set_resource(response.resource);
      }
      else {
        console.log(response.messeage);
      }

    }
    else {

    }
    f7.preloader.hide();

  }


  useEffect(() => {

    if (tabsId == 1 || !tabsId) {

      if (posts.length === 0 || !posts) {

        //  checkLatest();
      }

    }
  }, [tabsId]);

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

  const resource_box = () => {

    return (
      <>
        <Block className='padLft4'>
          <div>
            <p className='welcomeTxt'>{language_data.banner_text}</p>
            <h2 className='welcome-title-2'>{language_data.banner_heading}</h2>
            {/* <span className='subHead'> {language_data.banner_subText} </span> */}
            <div className="grid grid-cols-1 large-grid-cols-3 head_split grid-gap">
              <p> {language_data.banner_step_text1} </p>
              <p>{language_data.banner_step_text2}</p>
              <p>{language_data.banner_step_text3}</p>
            </div>
            <div className='banner_kural_text'>
              <span className='kuralClr'><b>குறள் (386)</b></span>
              <p>காட்சிக்கு எளியன் கடுஞ்சொல்லன் அல்லல்நீ <br /> மீக்கூறும் மன்னன் நிலம்.</p>
            </div>
            <p className='porul-title'>
              <b>பொருள்</b> <br />
            </p>
            <p className='porul'>
              குடிமக்கள் எவரும் எளிதில் அணுகக்கூடியவராகவும் , எவரிடத்திலும் கடுமையான சொற்களைக் கூறாது ஆட்சிபுரிந்து வரும் அரசரின் நாட்டை உலகமே போற்றும்<br />
            </p>
            <p className='kuralClr kural-author'><b>- திருவள்ளுவர்</b></p>
            {/* <button className='bannerCta'><b> {language_data.banner_cta_text} </b></button> */}
          </div>
        </Block>
        <div className='updatesec'>
          <marquee> {language_data.banner_marq_text} </marquee>
        </div>
      </>
    )
  }
  return (


    <div className="grid grid-cols-1 large-grid-cols-2 grid-gap">
      {/* <a href="tel:9677778953" target='_blank' className='external'>Call Now</a> */}
      {resource_box()}

    </div>


  );
};
export { WelcomePage };