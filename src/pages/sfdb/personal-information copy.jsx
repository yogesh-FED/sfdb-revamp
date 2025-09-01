import React, { useEffect, useState } from 'react';


import { List, ListItem, AccordionContent, Block, Icon, f7, BlockTitle } from 'framework7-react';
import { width } from 'dom7';

const PersonalInformationPage = ({ languageData, language }) => {

  const store = f7.store;

  const tabsId = localStorage.getItem('authtabsId');

  const [user_master, set_user] = useState(store.state.user);

  const checkUserIfo = async () => {

    f7.preloader.show();

    const response = await store.dispatch('getPersonalInfo');

    if (response.data) {
      if (response.success) {

        set_user(response.data);
      }
      else {
        // console.log(response.messeage);
      }

    }
    else {
      f7.toast.create({
        text: 'Server Could not connect. Please try after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();
    }
    f7.preloader.hide();
  }

  const personal_english = () => {
    return (
      <div>
        <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-3 grid-gap">
          <div>
            <b> Full Name (Ration Card) </b>: {user_master?.user?.name}
          </div>
          <div>
            <b> Full Name (Aadhar) </b>: {user_master?.user?.name}
          </div>
          <div>
            <b> Gender </b>: {user_master?.user?.gender}
          </div>
          <div>
            <b> DOB </b>: {user_master?.user?.dob}
          </div>
          <div>
            <b> Age </b>: {user_master?.user?.age}
          </div>
          <div>
            <b> Marital Status</b>: {user_master?.user?.marital_status}
          </div>
          <div>
            <b> Community </b>: {user_master?.user?.community}
          </div>
          <div>
            <b> Father's Full Name </b>: {user_master?.user?.f_name}
          </div>
          <div>
            <b> Mother's Full Name </b>: {user_master?.user?.m_name}
          </div>
        </div>
        <div>
          <BlockTitle>
            Contact Information
          </BlockTitle>
          <div>
            <b> Mobile (Ration Card) </b>:  {user_master?.user?.pds_mobile}
          </div>
        </div>
      </div>
    );
  };
  const personal_tamil = () => {
    return (
      <div>
        <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-3 grid-gap">
          <div>
            <b> முழு பெயர் (குடும்ப அட்டை) </b>: {user_master?.user?.name_tamil}
          </div>
          <div>
            <b> முழு பெயர் (ஆதார்) </b>: {user_master?.user?.name_tamil}
          </div>
          <div>
            <b> பாலினம் </b>: {user_master?.user?.gender_tamil}
          </div>
          <div>
            <b> பிறந்த தேதி </b>: {user_master?.user?.dob}
          </div>
          <div>
            <b> வயது </b>: {user_master?.user?.age}
          </div>
          <div>
            <b> திருமண நிலை</b>: {user_master?.user?.marital_status_tamil}
          </div>
          <div>
            <b> சமூகம் </b>: {user_master?.user?.community_tamil}
          </div>
          <div>
            <b> தந்தையின் முழு பெயர் </b>: {user_master?.user?.f_name_tamil}
          </div>
          <div>
            <b> தாயின் முழு பெயர் </b>: {user_master?.user?.m_name_tamil}
          </div>
        </div>
        <div>
          <BlockTitle>
            Contact Information
          </BlockTitle>
          <div>
            <b> மொபைல் (குடும்ப அட்டை) </b> :  {user_master?.user?.pds_mobile}
          </div>
        </div>
      </div>
    );
  };


  const address_english = () => {
    return (
      <div>
        <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
          <div>
            <b> Address (Aadhar Card) </b> <br />
            {user_master?.user?.pds_address?.address_line1} <br />


          </div>
          <div>
            <b> Address (Ration Card) </b> <br />
            {user_master?.user?.pds_address?.address_line1} <br />
            {user_master?.user?.pds_address?.address_line2 && (
              <>
                {user_master.user.pds_address.address_line2} <br />
              </>
            )}
            {user_master?.user?.pds_address?.address_line3 && (
              <>
                {user_master.user.pds_address.address_line3} <br />
              </>
            )}
            {languageData?.villageName} : {user_master?.user?.pds_address?.village_name} <br />
            {languageData?.talukName} :  {user_master?.user?.pds_address?.taluk_name} <br />
            {languageData?.districtName} :  {user_master?.user?.pds_address?.district_name} <br />
            {languageData?.pincode} :  {user_master?.user?.pds_address?.pincode}
          </div>
        </div>
      </div>
    );
  };

  const address_tamil = () => {
    return (
      <div>
        <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
          <div>
            <b> முகவரி (ஆதார்) </b> <br />
            {user_master?.user?.pds_address?.address_line1} <br />


          </div>
          <div>
            <b> முகவரி (குடும்ப அட்டை) </b> <br />
            {user_master?.user?.pds_address_tamil?.address_line1} <br />
            {user_master?.user?.pds_address_tamil?.address_line2 && (
              <>
                {user_master.user.pds_address_tamil.address_line2} <br />
              </>
            )}
            {user_master?.user?.pds_address_tamil?.address_line3 && (
              <>
                {user_master.user.pds_address_tamil.address_line3} <br />
              </>
            )}
            {languageData?.villageName} : {user_master?.user?.pds_address_tamil?.village_name} <br />
            {languageData?.talukName} :  {user_master?.user?.pds_address_tamil?.taluk_name} <br />
            {languageData?.districtName} :  {user_master?.user?.pds_address_tamil?.district_name} <br />
            {languageData?.pincode} :  {user_master?.user?.pds_address_tamil?.pincode}
          </div>
        </div>
      </div>
    );
  };


  const education_english = () => {
    return (
      <div>
        {user_master?.user?.education ?
          <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
            <div>
              {languageData?.education} :  {user_master?.user?.education}
            </div>

          </div>
          : no_data_found()}
      </div>
    );
  };

  const education_tamil = () => {
    return (
      <div>
        {user_master?.user?.education_tamil ?
          <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
            <div>
              {languageData?.education} :  {user_master?.user?.education_tamil}
            </div>

          </div>
          : no_data_found()}
      </div>
    );
  };

  const no_data_found = () => {
    return (
      <div>
        <center>
          <img src="assets/images/no-data.png" alt="" style={{ width: "50px" }} /> <br />
          No Data Found
        </center>
      </div>
    )
  }
  useEffect(() => {

    if (tabsId == "A" || !tabsId) {

      if (user_master.length === 0 || !user_master) {
        checkUserIfo();
      }

    }
  }, [tabsId, language]);

  return (
    <div>
      {/* <List menuList mediaList outlineIos strongIos>
        <ListItem
              link
              title={language == "EN"? user_master?.user?.name : user_master?.user?.name_tamil}
              subtitle="Home subtitle"
              selected
              
            >
             
          </ListItem>
      
      </List> */}

      <List strong outlineIos dividersIos insetMd accordionList className='custom-accordian'>
        <ListItem accordionItem title={languageData?.profile} accordionItemOpened>
          <AccordionContent>
            <Block>

              <div className='accordian-box'>
                {language == "EN" ? personal_english() : personal_tamil()}
              </div>
            </Block>
          </AccordionContent>
          <Icon md="material:person" ios="f7:person_fill" slot="media" />

        </ListItem>
        <ListItem accordionItem title={languageData?.address}>
          <AccordionContent>
            <Block>
              <div className='accordian-box'>
                {language == "EN" ? address_english() : address_tamil()}
              </div>
            </Block>
          </AccordionContent>
          <Icon md="material:credit_card" ios="f7:creditcard" slot="media" />
        </ListItem>
        <ListItem accordionItem title={languageData?.education_attained}>
          <AccordionContent>
            <Block>
              <div className='accordian-box'>
                {language == "EN" ? education_english() : education_tamil()}
              </div>
            </Block>

          </AccordionContent>
          <Icon md="material:school" ios="f7:rosette" slot="media" />
        </ListItem>
      </List>
    </div>
  );
};
export { PersonalInformationPage };