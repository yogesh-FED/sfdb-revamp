import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  AccordionContent,
  ListInput,
  Toolbar,
  Link,
  Tab,
  Tabs
} from 'framework7-react';
import '../../css/schemefilter.css';
import FilterTabs from './FilterTabs';

const SchemeFilter = (props) => {
  const handleBackClick = () => {
    props.f7router.navigate('/details', {
      clearPreviousHistory: true,
      ignoreCache: true,
    })
  }
  useEffect(() => {
    console.log('schemeFilterProps', props);
  }, [])
  const [eligibleSchemeFilter, setEligibleSchemeFilter] = useState(false);
  const [schemeFilterFormData, setSchemeFilterFormData] = useState({
    "areaOfResidence": [
      {
        currentPlace: '',
        isSrilankan: ''
      }
    ],
    "education&employement": [
      {
        student: '',
        highestQualification: '',
        board: '',
        empStatus: '',
        occupation: ''
      }
    ],
    "disabilityStatus": [
      {
        isDisabled: '',
        disablityPercentage: ''
      }
    ]
  })
  const handleChange = (name, indx, val) => {
    setEligibleSchemeFilter(true);
    setSchemeFilterFormData((prev) => ({
      ...prev,
      [name]: prev[name]?.map((item, index) =>
        index === indx ? { ...item, ...val } : item
      )
    }));

  }
  return (
    <div>
      <Page name="schemeFilter" className='schemeFiltersPage'>
        <Block>
          <button className="backBtn" onClick={handleBackClick}>Back</button>
          <div className='grid grid-cols-1 large-grid-cols-2 g3080'>
            <div className='filterFormSection'>
              <h4>Build your profile to get personalized recommendations</h4>
              <List strong outlineIos dividersIos insetMd accordionList>
                <p onClick={handleBackClick} className='editDemoDetails'><u>Edit Demographic Details</u></p>
                <ListItem accordionItem title="Area of Residence">
                  <AccordionContent>
                    <Block>
                      <ul className="areaOfResidence inputFieldsSection">
                        <span>Where do you live currently?</span>
                        <ListInput
                          type="select"
                          value={schemeFilterFormData.areaOfResidence[0].currentPlace}
                          placeholder="Choose Area"
                          onInput={(e) => handleChange("areaOfResidence", 0, { currentPlace: e.target.value })}
                        >
                          <option value="">Select</option>
                          <option value="urban">Urban</option>
                          <option value="rural">Rural</option>
                        </ListInput>
                      </ul>
                      <ul className="areaOfResidence inputFieldsSection">
                        <span>Are you a Sri Lankan Refugee?</span>
                        <ListInput
                          type="select"
                          value={schemeFilterFormData.areaOfResidence[0].isSrilankan}
                          placeholder="Choose"
                          onInput={(e) => handleChange("areaOfResidence", 0, { isSrilankan: e.target.value })}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </ListInput>
                      </ul>
                    </Block>
                  </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Education and Employment">
                  <AccordionContent>
                    <Block>
                      <ul className="educationEmp inputFieldsSection">
                        <span>Are you a Student?</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                      <ul className="educationEmp inputFieldsSection">
                        <span>Select your current or highest education level:</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                      <ul className="educationEmp inputFieldsSection">
                        <span>What is your current board of Education?</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                      <ul className="educationEmp inputFieldsSection">
                        <span>Please select your current employment status:</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                      <ul className="educationEmp inputFieldsSection">
                        <span>What best describes your Occupation?</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                    </Block>
                  </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Disability status">
                  <AccordionContent>
                    <Block>
                      <ul className="educationEmp inputFieldsSection">
                        <span>Are you differently abled?</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                      <ul className="educationEmp inputFieldsSection">
                        <span>Choose you Percentage Disabilty:</span>
                        <ListInput
                          type="select"
                          // value={formData.community}
                          placeholder="Choose"
                        // onInput={(e) => handleChange('community', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="General">Yes</option>
                          <option value="OBC">No</option>
                        </ListInput>
                      </ul>
                    </Block>
                  </AccordionContent>
                </ListItem>
              </List>
            </div>
            <div className='filterContent'>

              <div className="searchbar-backdrop"></div>
              <form className="searchbar">
                <div className="searchbar-inner">
                  <div className="searchbar-input-wrap">
                    <input type="search" placeholder="Search" />
                    <i className="searchbar-icon"></i>
                    <span className="input-clear-button"></span>
                  </div>
                  <span className="searchbar-disable-button">Cancel</span>
                </div>
              </form>
              <FilterTabs
                formData={props.formDataVal}
                schemeFilterFormData={schemeFilterFormData}
                eligibleSchemeFilter={eligibleSchemeFilter}
                f7router={props.f7router}
              />
            </div>
          </div>
        </Block>
      </Page>
    </div>
  )
}

export default SchemeFilter