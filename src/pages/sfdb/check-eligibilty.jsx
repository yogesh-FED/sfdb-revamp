
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Page,
  Subnavbar,
  Button,
  Block,
  BlockTitle,
  List,
  ListInput,
  Checkbox,
  Link,
  Searchbar,
  ListItem,
  Icon,
  Badge,
  f7,
  Accordion,
  AccordionContent,
  AccordionItem
} from 'framework7-react';

import $ from 'dom7';


const CheckEligibilityPage = ({ languageData, lang }) => {
  const store = f7.store;
  const tabsId = localStorage.getItem('authtabsId');
  const [schemes, set_schemes] = useState(store.state.schemes);
  const [scheme_count, set_scheme_count] = useState(0);
  const [loading, set_loading] = useState(false);

  const [eligibilityData, setEligibilityData] = useState({});

  const handleCheckboxChange = (schemeId, event) => {
    const { name, checked } = event.target;

    setEligibilityData((prevData) => ({
      ...prevData,
      [schemeId]: {
        ...prevData[schemeId],
        [name]: checked,
      },
    }));
  };

  //  const handleSubmit = async (event, schemeId) => {

  //   event.preventDefault();
  //   let token = localStorage.getItem("token");

  //   //const response = await store.dispatch('getMyFamilySchemes', e.target.value);
  //    try {
  //      const response = await fetch("/api/v1/makkal/check-eligibility", {
  //        method: "POST",
  //        headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json; charset=UTF-8",
  //         Authorization: "Bearer " + token
  //       },
  //        body: JSON.stringify({
  //          scheme_id: schemeId,
  //          ...eligibilityData[schemeId],
  //        }),
  //      });

  //      const result = await response.json();
  //      alert(result.message || "Eligibility checked successfully!");
  //    } catch (error) {
  //      console.error("Error checking eligibility:", error);
  //    }
  //  };

  const handleSubmit = async (event, schemeId) => {
    event.preventDefault(); // 🚀 Prevents form reload

    try {
      f7.preloader.show();
      let data = {
        scheme_id: schemeId,
        ...eligibilityData[schemeId],
      };
      // Dispatch Vuex action
      const response = await store.dispatch('getMyEligibleSchemes', data);
      if (response?.success && response?.data?.reasons) {

        const reasons = response?.data?.reasons || [];
        let reasonsList = "";

        if (response?.data?.status === false) {
          // Not eligible case: Show heading once and list all reasons
          reasonsList = `
    <h3 class="text-danger text-center">You are probably ineligible for this scheme. / நீங்கள் இந்தத் திட்டத்திற்குத் தகுதியற்றவராக இருக்கலாம்</h3>
    <ul>
      ${reasons.map(reason => `<li>${reason.en} / ${reason.ta}</li>`).join("")}
    </ul>
  `;
        } else {
          // Eligible case: Show scheme details
          const scheme = response.data.reasons; // Assuming it's an object in the eligible case

          reasonsList = `
    <h3 class="text-success text-center">You are probably Eligible for this scheme. / நீங்கள் இந்த திட்டத்திற்கு தகுதியானவராக இருக்கலாம்</h3>
    <ul>
      <li><strong>Scheme Name :</strong> ${scheme.scheme_name}</li>
      <li><strong>திட்டத்தின் பெயர் :</strong> ${scheme.scheme_name_tamil}</li>
      <li><strong>Description :</strong> ${scheme.scheme_desc}</li>
      <li><strong>விவரம் :</strong> ${scheme.scheme_desc_tamil}</li>
    </ul>
    <a target="_blank" href="${scheme.url}" class="external link button button-fill button-large">Apply Now</a>
  `;
        }

        f7.popup.create({
          content: `
    <div class="popup">
      <div class="page">
        <div class="navbar popup-pds">
          <div class="navbar-inner">
            <div class="navbar-bg popup-bg"></div>
            <center><div class="title"><h4>Scheme Eligibility Status</h4></div></center>
            <div class="right"><a class="link popup-close">X</a></div>
          </div>
        </div>
        <div class="page-content">
          <div class="dividersIos simpleList strong outline inset">
            <div class="eligible-list">${reasonsList}</div>
          </div>
        </div>
      </div>
    </div>
  `.trim(),
        }).open();
      } else {
        console.error(response?.message || "Unknown error occurred.");
      }

    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      f7.preloader.hide();

    }
  };


  const getAllSchemes = async () => {
    try {
      f7.preloader.show();
      set_loading(true);

      const response = await store.dispatch('getAllSchemes');

      if (response?.success && response?.data?.schemes) {
        set_schemes(response.data.schemes);
        set_scheme_count(response.data.schemes.length);
      } else {
        console.error(response?.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
      f7.toast.create({
        text: 'Server could not connect. Please try again later.',
        position: 'top',
        closeTimeout: 2000,
      }).open();
    } finally {
      f7.preloader.hide();
      set_loading(false);
    }
  };


  useEffect(() => {

    if (tabsId == "E") {
      // checkSchemeInfo();
      if (schemes.length === 0 || !schemes) {
        getAllSchemes();
      }

    }
  }, [tabsId]);

  return (
    <Block className='page-content'>
      <BlockTitle>
        {languageData?.Schemes_eligibility_check} ({scheme_count})
      </BlockTitle>
      <Searchbar placeholder="Search schemes / Departments..." searchContainer=".search-list" searchIn=".item-title" />

      <List strongIos outlineIos dividersIos className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>

      <>
        {loading ? (
          <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <ListItem title="Loading Schemes" after="Availed" key={n} className='skeleton-block skeleton-text' style={{ height: "50px" }}>
                <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />
              </ListItem>
            ))}
          </List>
        ) : (

          lang === "ENGLISH" ? ( // Use ? for the true case
            <List dividersIos outlineIos strongIos className='scheme-list search-list searchbar-found' accordionList>
              {schemes?.map((scheme, index) => (

                <ListItem accordionItem key={index} className="item-title">
                  <div slot="title">
                    {index + 1}. {scheme.scheme_name} <Badge color="red">{scheme.hod_dept_name}</Badge>
                  </div>
                  {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                  <AccordionContent>
                    <Block>

                      <div className='text-wrap scheme-box' dangerouslySetInnerHTML={{ __html: scheme.scheme_desc }} />
                      {/* Eligibility Form */}
                      <form onSubmit={(event) => handleSubmit(event, scheme.scheme_id)}>
                        <div className="eligibility-form">
                          <List strongIos outlineIos dividersIos>
                            {scheme.disability !== 0 || scheme.disability !== null && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_dap_question}
                                name="is_disabled"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.marital_status === 3 && scheme.gender === "F" && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_widow_question}
                                name="is_widow"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.marital_status === 2 && scheme.gender === "F" && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_unmarried_question}
                                name="is_unmarried"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.srilankan_refuge === 1 && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_refuge_question}
                                name="is_srilankan_refuge"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                          </List>

                          {/* Submit Button */}
                          <Button fill small className="eligibility-button" type="submit">
                            {languageData?.Check_Eligibility}
                          </Button>
                        </div>
                      </form>

                    </Block>
                  </AccordionContent>
                </ListItem>
              ))}
            </List>
          ) : ( // Use : for the false case
            <List dividersIos outlineIos strongIos className='scheme-list search-list searchbar-found' accordionList>
              {schemes?.map((scheme, index) => (
                <ListItem accordionItem title={`${index + 1}. ${scheme.scheme_name_tamil}`} key={index}>
                  {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                  <AccordionContent className='accordian-border'>
                    <Block>

                      <div className='text-wrap scheme-box' dangerouslySetInnerHTML={{ __html: scheme.scheme_desc_tamil }} />
                      <form onSubmit={(event) => handleSubmit(event, scheme.scheme_id)}>
                        <div className="eligibility-form">
                          <List strongIos outlineIos dividersIos>
                            {scheme.disability !== 0 && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_dap_question}
                                name="is_disabled"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.marital_status === 2 && scheme.gender === "F" && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_widow_question}
                                name="is_widow"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.marital_status === 3 && scheme.gender === "F" && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_unmarried_question}
                                name="is_unmarried"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                            {scheme.srilankan_refuge === 1 && (
                              <ListItem
                                checkbox
                                className="question-list"
                                checkboxIcon="end"
                                title={languageData?.is_refuge_question}
                                name="is_srilankan_refuge"
                                onChange={(event) => handleCheckboxChange(scheme.scheme_id, event)}
                              />
                            )}
                          </List>

                          {/* Submit Button */}
                          <Button fill small className="eligibility-button" type="submit">
                            {languageData?.Check_Eligibility}
                          </Button>
                        </div>
                      </form>
                    </Block>
                  </AccordionContent>
                </ListItem>
              ))}
            </List>
          )
        )}
      </>

    </Block>
  );
};

export { CheckEligibilityPage };