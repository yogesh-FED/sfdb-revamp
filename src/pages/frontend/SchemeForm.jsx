import React from 'react';
import {
  Page, Navbar, Block, f7, ListInput
} from 'framework7-react';

const SchemeForm = ({ language_data, handleSubmit, handleChange, formData, buttonImg }) => {
  const genderOptions = [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
    { label: 'Transgender', value: 't' }
  ];
  return (
    <div>
      <div className='grid grid-cols-1 large-grid-cols-1'>
        <h2>{language_data?.goBack || 'Discover the most relevant schemes for you'}</h2>
      </div>
      <div className='grid grid-cols-1 large-grid-cols-1'>
        <div className='demo_details'>
          <h3>Build your profile to get personalized recommendations</h3>
          <p className='title'>Demographic Details</p>
          <div className='demo_form'>
            <form onSubmit={handleSubmit}>
              <div className="block block-strong-ios block-outline-ios">

                {/* Gender */}
                <div className="grid grid-cols-1 large-grid-cols-4 gender twoGrid mb0">
                  {/* <p className="block-title">Gender *</p> */}
                  {/* {genderOptions.map((val) => (
                    <div key={val.value}>
                      <label className={`radio ${formData.gender === val.value ? 'active-radio' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value={val.value}
                          checked={formData.gender === val.value}
                          onChange={(e) => handleChange('gender', e.target.value)}
                        />
                        <i className={`icon-radio ${val}`}><p className={`i_${val}`}>{val}</p></i>
                      </label>
                    </div>
                  ))} */}

                  <p className="block-title">Gender *</p>
                  <div>
                    <ListInput
                      label="Gender"
                      type="select"
                      value={formData.gender}
                      placeholder="Choose Gender"
                      onInput={(e) => handleChange('gender', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                      <option value="t">Transgender</option>
                      <option value="o">Others</option>
                    </ListInput>
                  </div>
                </div>

                {/* Age */}
                <div className="grid grid-cols-1 large-grid-cols-4 gender ageSection">
                  <p className="block-title">Age *</p>
                  <div>
                    <ListInput
                      label="Age"
                      type="select"
                      value={formData.age}
                      placeholder="Choose Age"
                      onInput={(e) => handleChange('age', e.target.value)}
                    >
                      <option value="">Select</option>

                      {Array.from({ length: 96 }, (_, i) => i + 5).map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </ListInput>
                  </div>

                  {/* Marital Status */}
                  <p className="block-title alignRight">Marital Status</p>
                  <div>
                    <ListInput
                      label="Marital Status"
                      type="select"
                      value={formData.maritalStatus}
                      placeholder="Choose Status"
                      onInput={(e) => handleChange('maritalStatus', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                    </ListInput>
                  </div>
                </div>

                {/* Community */}
                <div className="grid grid-cols-1 large-grid-cols-2 gender twoGrid">
                  <span>Community</span>
                  <ListInput
                    label="Community"
                    type="select"
                    value={formData.community}
                    placeholder="Choose Community"
                    onInput={(e) => handleChange('community', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </ListInput>
                </div>

                {/* Income */}
                <div className="grid grid-cols-1 large-grid-cols-1 gender twoGrid">
                  <span>Income</span>
                  <ListInput
                    label="Income"
                    type="select"
                    value={formData.income}
                    placeholder="Choose Income Range"
                    onInput={(e) => handleChange('income', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="<1L">&lt; ₹1 Lakh</option>
                    <option value="1L-5L">₹1-5 Lakh</option>
                    <option value="5L-10L">₹5-10 Lakh</option>
                    <option value=">10L">&gt; ₹10 Lakh</option>
                  </ListInput>
                </div>
              </div>

              <button type="submit" className='demo_form_submit'>
                <img src={buttonImg} alt='button-submit' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeForm