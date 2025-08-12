import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Block,
  List,
  ListInput,
  Button,
} from 'framework7-react';
import { SchemeEligibilityPage } from './scheme-eligibility';

const EligibiltyFilter = ({
  languageData, language, lang
}) => {
  const [showEligibiltySchemes, setShowEligibiltySchemes] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    income: '',
    community: '',
    disabilityStatus: '',
    maritalStatus: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    setShowEligibiltySchemes(true);
  };
  return (
    <>
      {
        showEligibiltySchemes === true ? (
          <SchemeEligibilityPage languageData={languageData} language={language} lang={lang}></SchemeEligibilityPage>
        ) : (
          <Block strong className='filter-options text-align-center'>
            <h3>To Know Your Eligible Scheme</h3>
            <List noHairlinesMd>
              <div className='grid grid-cols-2 gap-4'>
                <ListInput
                  label="Gender"
                  type="select"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  placeholder="Select gender"
                >
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </ListInput>

                {/* Age Dropdown (example: 18 to 60) */}
                <ListInput
                  label="Age"
                  type="select"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Select age"
                >
                  <option value="" disabled>Select</option>
                  {[...Array(43)].map((_, i) => (
                    <option key={i} value={i + 18}>{i + 18}</option>
                  ))}
                </ListInput>

                {/* Income Dropdown */}
                <ListInput
                  label="Income"
                  type="select"
                  value={formData.income}
                  onChange={(e) => handleChange('income', e.target.value)}
                  placeholder="Select income"
                >
                  <option value="" disabled>Select</option>
                  <option value="less_than_1_lakh">Less than ₹1 lakh</option>
                  <option value="1_5_lakh">₹1–5 lakh</option>
                  <option value="5_10_lakh">₹5–10 lakh</option>
                  <option value="above_10_lakh">Above ₹10 lakh</option>
                </ListInput>

                {/* Community Dropdown */}
                <ListInput
                  label="Community"
                  type="select"
                  value={formData.community}
                  onChange={(e) => handleChange('community', e.target.value)}
                  placeholder="Select community"
                >
                  <option value="" disabled>Select</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </ListInput>
                <ListInput
                  label="Marital Status"
                  type="select"
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  placeholder="Select marital Status"
                >
                  <option value="" disabled>Select</option>
                  <option value="general">Married</option>
                  <option value="obc">Single</option>
                </ListInput>
                <ListInput
                  label="Disability Status"
                  type="select"
                  value={formData.disabilityStatus}
                  onChange={(e) => handleChange('disabilityStatus', e.target.value)}
                  placeholder="Select disability Status"
                >
                  <option value="" disabled>Select</option>
                  <option value="general">Yes</option>
                  <option value="obc">No</option>
                </ListInput>
              </div>
            </List>

            <Button fill onClick={handleSubmit}>Check Eligibilty Schemes</Button>
          </Block>
        )
      }


    </>
  );
};

export default EligibiltyFilter;
