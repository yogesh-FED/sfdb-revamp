import React, { useEffect, useState } from 'react';


import { List, ListItem, AccordionContent, Block, Icon, f7, BlockTitle, Button, useStore } from 'framework7-react';
import { width } from 'dom7';

const PersonalInformationPage = ({ languageData, language, lang }) => {
  // const languageData = useStore('language_data');
  const uidai = () => {
    window.open("https://uidai.gov.in/", "_blank");
  }

  const pds = () => {
    window.open("https://www.tnpds.gov.in/login.xhtml", "_blank");
  }

  const store = f7.store;

  const tabsId = localStorage.getItem('authtabsId');

  const [user_master, set_user] = useState(store.state.user);
  const [user_image, set_user_image] = useState('');
  const checkUserIfo = async () => {
    f7.preloader.show();

    const response = await store.dispatch('getPersonalInfo');

    if (response) {
      // if (response.success) {
      //   set_user(response.data);
      //   localStorage.setItem('user_image', response.data?.user?.ekyc_data?.image);

      // }
      if (response?.Message === "Success") {
        set_user(response?.ApplicantInfo[0]);
        localStorage.setItem('user_image', response?.ApplicantInfo[0]?.Image);
        const imgPath = response?.ApplicantInfo[0]?.Image;
        const path = "https://makkalsevai.tn.gov.in/MakkalService/" + imgPath;
        set_user_image(path);
      }
    }
    else {

      f7.toast.create({
        text: 'Server Could not connect. Please try after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();

      console.log(response)

    }
    f7.preloader.hide();
  }
  const personal_english = () => {
    return (
      <div className='pad3 personalEng'>
        <div className='grid grid-cols-1 large-grid-cols-2 grid-gap'>
          <div className='personalWelcome'>
            <p><b>Hello {user_master?.Name} ! </b></p>
            <span>{languageData.banner_text}</span>
          </div>
          {/* <div className='personalWelcome'>
            <p>
              <a >View Schemes you are eligible for {'>'} </a>
              
            </p>
          </div> */}
        </div>
        <div className='grid grid-cols-1 large-grid-cols-2 grid-gap gap50'>
          <div className='profileStyles'>
            <h3>Ration Card Details</h3>
            <div className='grid grid-cols-2 large-grid-cols-2 details'>
              <p>Full Name</p>
              <p>{user_master?.Name}</p>
              <p>D.O.B</p>
              <p>{user_master?.Dob}</p>
              <p>Gender</p>
              <p>{user_master?.Gender}</p>
              <p>Address</p>
              <div>{user_master?.Address} <br />
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
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>{languageData?.villageName}</td>
                      <td>: {user_master?.village}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.talukName}</td>
                      <td>: {user_master?.taluk}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.districtName}</td>
                      <td>: {user_master?.district}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.pincode}</td>
                      <td>: {user_master?.pincode}</td>
                    </tr>
                    {/* <tr>
                      <td colSpan={2}>
                        <Button fill small className='external' href="https://www.tnpds.gov.in/login.xhtml"
                          target="_blank"
                          rel="noopener noreferrer">Change Address</Button>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <Button fill small className='external' href="https://www.tnpds.gov.in/login.xhtml"
              target="_blank"
              rel="noopener noreferrer">Update details on TNPDS</Button> */}
            <p className='external'>For updation or Correction ? <span> <a onClick={pds}>Click Here {'>'} </a> </span></p>
          </div>
          <div className='profileStyles'>
            <h3>Aadhaar Card Details</h3>
            <div className='grid grid-cols-2 large-grid-cols-2 details'>
              <p>Full Name</p>
              <p>{user_master?.Name} <img src={user_image} alt="" className="user-profile-image" /></p>
              <p>D.O.B</p>
              <p>{user_master?.Dob}</p>
              <p>Gender</p>
              <p>{user_master?.Gender}</p>
              <p>Address</p>
              <p>{user_master?.AddressByAadhaar}</p>
            </div>
            {/* <Button fill small className='external' href="https://uidai.gov.in/"
              target="_blank"
              rel="noopener noreferrer">Update details on UIDAI</Button> */}
            <p className='external uidai'>For updation or Correction ? <span><a onClick={uidai}>Click Here{'>'} </a> </span></p>
          </div>
        </div>
      </div>
    );
  };
  const personal_tamil = () => {
    return (
      <div className='pad3 personalEng'>
        <div className='grid grid-cols-2 large-grid-cols-2 grid-gap'>
          <div className='personalWelcome'>
            <p><b>Hello {user_master?.NameInTamil} ! </b></p>
            <span>{languageData.banner_text}</span>
          </div>
          <div className='personalWelcome'>
            <p>
              <a>View Schemes you are eligible for {'>'} </a>
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 large-grid-cols-2 grid-gap gap50'>
          <div className='profileStyles'>
            <h3>குடும்ப அட்டை</h3>
            <div className='grid grid-cols-1 large-grid-cols-2 details'>
              <p>முழு பெயர்</p>
              <p>{user_master?.NameInTamil}</p>
              <p>பிறந்த தேதி</p>
              <p>{user_master?.Dob}</p>
              <p>பாலினம்</p>
              <p>{user_master?.Gender}</p>
              <p>முகவரி</p>
              <p>{user_master?.AddressByPds} <br />
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
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>{languageData?.villageName}</td>
                      <td>: {user_master?.user?.pds_address?.village_name}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.talukName}</td>
                      <td>: {user_master?.user?.pds_address?.taluk_name}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.districtName}</td>
                      <td>: {user_master?.user?.pds_address?.district_name}</td>
                    </tr>
                    <tr>
                      <td>{languageData?.pincode}</td>
                      <td>: {user_master?.user?.pds_address?.pincode}</td>
                    </tr>
                  </tbody>
                </table></p>
            </div>
            {/* <Button fill small className='external' href="https://www.tnpds.gov.in/login.xhtml"
              target="_blank"
              rel="noopener noreferrer">Update details on TNPDS</Button> */}
            <p className='external'>For updation or Correction ? <span> <a onClick={pds}>Update details on TNPDS {'>'} </a> </span></p>
          </div>
          <div className='profileStyles'>
            <h3>Aadhaar Card Details</h3>
            <div className='grid grid-cols-2 large-grid-cols-2 details'>
              <p>முழு பெயர்</p>
              <p>{user_master?.NameInTamil} <img src={user_image} alt="" className="user-profile-image" /></p>
              <p>பிறந்த தேதி</p>
              <p>{user_master?.Dob}</p>
              <p>பாலினம்</p>
              <p>{user_master?.user?.Gender}</p>
              <p>முகவரி</p>
              <p>{user_master?.AddressByAadhaar}</p>
            </div>
            {/* <Button fill small className='external' href="https://tathya.uidai.gov.in/access/login?role=resident"
              target="_blank"
              rel="noopener noreferrer">Update details on UIDAI</Button> */}
            <p className='external'>For updation or Correction ? <span><a onClick={uidai}>Update details on UIDAI {'>'} </a> </span></p>
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
            <h3><b> Address (Aadhar Card) </b></h3>
            {user_master?.user?.ekyc_data?.address} <br />


          </div>
          <div>
            <h3><b> Address (Ration Card) </b></h3>
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
            <br />

            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>{languageData?.villageName}</td>
                  <td>: {user_master?.user?.pds_address?.village_name}</td>
                </tr>
                <tr>
                  <td>{languageData?.talukName}</td>
                  <td>: {user_master?.user?.pds_address?.taluk_name}</td>
                </tr>
                <tr>
                  <td>{languageData?.districtName}</td>
                  <td>: {user_master?.user?.pds_address?.district_name}</td>
                </tr>
                <tr>
                  <td>{languageData?.pincode}</td>
                  <td>: {user_master?.user?.pds_address?.pincode}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Button fill small className='external' href="https://www.tnpds.gov.in/login.xhtml"
                      target="_blank"
                      rel="noopener noreferrer">Change Address</Button>
                  </td>
                </tr>
              </tbody>
            </table>

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
            {languageData?.pincode} :  {user_master?.user?.pds_address_tamil?.pincode} <br />

            <Button fill small className='external' href="https://www.tnpds.gov.in/login.xhtml"
              target="_blank"
              rel="noopener noreferrer">முகவரி மாற்றம் செய்ய</Button>

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


  const occupation_english = () => {


    return (
      <div>

        {user_master?.user?.occupation ?
          <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
            <div>
              {languageData?.occupation} :  {user_master?.user?.occupation}
            </div>

          </div>
          : no_data_found()}
      </div>
    );
  };

  const occupation_tamil = () => {
    return (
      <div>
        {user_master?.user?.occupation_tamil ?
          <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-2 grid-gap">
            <div>
              {languageData?.occupation} :  {user_master?.user?.occupation}
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
          <img src="/assets/images/no-data.png" alt="" style={{ width: "50px" }} /> <br />
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
      const image_path = localStorage.getItem('user_image');
      console.log("image_path", image_path);
      const path = "https://makkalsevai.tn.gov.in/MakkalService/" + image_path;
      set_user_image(path);

    }
  }, [tabsId, language]);


  return (
    <Block className='page-content'>
      <div className='grid grid-cols-1 large-grid-cols-1'>
        {lang == "ENGLISH" ? personal_english() : personal_tamil()}
      </div>
      {/* { user_table_data()} */}
      {/* <List menuList mediaList outlineIos strongIos>
        <ListItem
              link
              title={language == "EN"? user_master?.user?.name : user_master?.user?.name_tamil}
              subtitle="Home subtitle"
              selected
              
            >
             
          </ListItem>
      
      </List> */}


    </Block>
  );
};
export { PersonalInformationPage };