import React, { useEffect, useState } from 'react';
import {
  Page, Navbar, Block, f7, ListInput
} from 'framework7-react';
import buttonImg from '../assets/images/arrow_right_alt.png';
import SchemeForm from './frontend/SchemeForm';
import SchemeFilter from './frontend/SchemeFilter';
import axios from 'axios';
import schemeData from '../assets/getschemes.json';

export default function Details({ f7router, title, language_data }) {
  const [schemeFormIsVisible, setSchemeFormIsVisible] = useState(true);
  const [eligibleSchemeFilter, setEligibleSchemeFilter] = useState(false);
  // const [schData, setSchData] = useState([]);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    maritalStatus: '',
    community: '',
    income: '',
  });

  const IsVisibleFalse = (getFormData) => {
    debugger;
    setSchemeFormIsVisible(false);
    // axios.get('../assets/getschemes.json')
    //   .then(response => {
    //     console.log('Data:', response.data.data.eligible_schemes.schemes);
    //     setSchData(response.data.data.eligible_schemes.schemes || []);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
    localStorage.setItem('formDataVal', JSON.stringify(getFormData));
    f7router.navigate('/detailsResult', {
      clearPreviousHistory: true,
      ignoreCache: true,
    })
  }

  const gobackclk = () => {
    f7.views.main.router.navigate('/', {
      force: true,
      reloadCurrent: true,
      ignoreCache: true,
      animate: true,
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { gender, age } = formData;
    console.log('formDatadetailsPage', formData);
    if (!gender || !age) {
      f7.dialog.alert('Please fill in all mandatory fields (Gender and Age).');
      return;
    }
    const alert = f7.dialog.alert('Form submitted successfully!', '', () => {
      setTimeout(() => {
        const modal = document.querySelector('.dialog-buttons-1');
        if (modal) {
          modal.style.display = 'none';
        }
        IsVisibleFalse(formData);
      }, 300);
    });

    dialog.open();
  };
  useEffect(() => {
    console.log('detailsPage');
  }, [])
  return (
    <Page name="details" className='schemeFilters'>
      <Block className='res_block'>
        {
          // schemeFormIsVisible === true ?
          //   <SchemeForm
          //     handleChange={handleChange}
          //     handleSubmit={handleSubmit}
          //     formData={formData}
          //     buttonImg={buttonImg}
          //     IsVisibleFalse={IsVisibleFalse}
          //   />
          //   :
          //   <SchemeFilter
          //     handleBackClick={handleBackClick}
          //     schData={schData}
          //     formData={formData}
          //   />
          <SchemeForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            buttonImg={buttonImg}
            IsVisibleFalse={IsVisibleFalse}
          />
        }

      </Block>
    </Page>
  );
}
