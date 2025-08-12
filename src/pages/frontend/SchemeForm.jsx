import React from 'react';
import {
  Page, Navbar, Block, f7, ListInput
} from 'framework7-react';

const SchemeForm = ({ language_data, handleSubmit, handleChange, formData, buttonImg }) => {
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
                <div className="grid grid-cols-1 large-grid-cols-4 gender leftAlign">
                  <p className="block-title">Gender *</p>
                  {['Male', 'Female', 'Transgender'].map((val) => (
                    <div key={val}>
                      <label className={`radio ${formData.gender === val ? 'active-radio' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value={val}
                          checked={formData.gender === val}
                          onChange={(e) => handleChange('gender', e.target.value)}
                        />
                        <i className={`icon-radio ${val}`}><p className={`i_${val}`}>{val}</p></i>
                      </label>
                    </div>
                  ))}
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
                      <option value="18-25">18-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-45">36-45</option>
                      <option value="46+">46+</option>
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