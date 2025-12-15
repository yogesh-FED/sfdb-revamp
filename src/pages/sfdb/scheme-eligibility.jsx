import React, { useEffect, useState } from 'react';
import { List, ListItem, Icon, BlockTitle, Block, f7, Button, AccordionContent, Chip, Searchbar, Badge, useStore } from 'framework7-react';
import FilterPagination from '../../components/FilterPagination';

const SchemeEligibilityPage = ({ languageData, lang }) => {
  const store = f7.store;
  const tabsId = localStorage.getItem('authtabsId');
  // const languageData = useStore('language_data');
  const [eligible_schemes, set_eligible_schemes] = useState(store.state.eligible_schemes);
  const [ineligible_schemes, set_ineligible_schemes] = useState(store.state.all_schemes);
  const [family_schemes_member, set_family_schemes_member] = useState(store.state.family_schemes_member);
  const [current_member, set_current_member] = useState("");
  const [loading, set_loading] = useState(false);
  const [scheme_count, set_scheme_count] = useState(0);

  const [filteredEligibleCount, setFilteredEligibleCount] = useState(eligible_schemes?.length || 0);
  const [filteredIneligibleCount, setFilteredIneligibleCount] = useState(ineligible_schemes?.length || 0);

  const [eligibilityData, setEligibilityData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIneligibleData = ineligible_schemes?.slice(startIndex, startIndex + itemsPerPage) || [];
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
  const showCustomLoader = () => {
    const dialog = f7.dialog.create({
      text: '<div class="custom-loader blinking-text">Please wait while we fetch your Eligibility information...</div>',
      cssClass: 'custom-loader-dialog',
      closeByBackdropClick: false,
    });
    dialog.open();
    return dialog;
  };
  const checkSchemeInfo = async () => {
    debugger
    const loader = showCustomLoader();
    try {
      const response = await store.dispatch('getMySchemeswithStatus');
      // if (response.success) {
      //   const { eligible_schemes: es } = response.data;
      //   set_eligible_schemes(es.schemes);
      //   set_ineligible_schemes(es.all_schemes);
      //   set_scheme_count(es.scheme_count);
      //   set_family_schemes_member(response.data.family);
      //   set_current_member(response.data.makkal_id);
      //   setFilteredEligibleCount(es.schemes?.length || 0);
      //   setFilteredIneligibleCount(es.all_schemes?.length || 0);
      // }
      if (response) {
        // const { eligible_schemes: es } = response.data;
        // set_eligible_schemes(response);
        set_ineligible_schemes(response);
        // set_scheme_count(es.scheme_count);
        // set_family_schemes_member(localStorage.getItem('family_members_names') ? JSON.parse(localStorage.getItem('family_members_names')) : []);
        // set_current_member(response.data.makkal_id);
        // setFilteredEligibleCount(es.schemes?.length || 0);
        setFilteredIneligibleCount(response?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
    finally {
      loader.close()
    }

    f7.preloader.hide();
    set_loading(false);
  };

  const get_schemes = async (e) => {
    f7.preloader.show();
    set_loading(true);
    set_current_member(e.target.value);
    const response = await store.dispatch('getMyFamilySchemes', e.target.value);
    if (response.success) {
      const { eligible_schemes: es } = response.data;
      set_eligible_schemes(es.schemes);
      set_ineligible_schemes(es.all_schemes);
      set_scheme_count(es.scheme_count);
      // set_current_member(response.data.makkal_id);
      setFilteredEligibleCount(es.schemes?.length || 0);
      setFilteredIneligibleCount(es.all_schemes?.length || 0);
    }
    f7.preloader.hide();
    set_loading(false);
  };


  // useEffect(() => {
  //   if (tabsId === "D" && (!eligible_schemes || eligible_schemes.length === 0)) {
  //     set_family_schemes_member(localStorage.getItem('family_members_names') ? JSON.parse(localStorage.getItem('family_members_names')) : []);
  //     checkSchemeInfo();
  //   }
  //   if (members.length > 0) {
  //     set_current_member(members[0].makkal_id);
  //   }

  // }, [tabsId]);


  useEffect(() => {
    if (tabsId === "D" && (!eligible_schemes || eligible_schemes.length === 0)) {
      const members = localStorage.getItem("family_members_names")
        ? JSON.parse(localStorage.getItem("family_members_names"))
        : [];
      const makkalId = localStorage.getItem("individualMakkalId");

      set_family_schemes_member(members);
      checkSchemeInfo();

      if (makkalId && members.length > 0) {
        const matchedMember = members.find(m => m.makkalId === makkalId);
        if (matchedMember) {
          set_current_member(
            lang === "ENGLISH"
              ? matchedMember.nameInEnglish
              : matchedMember.nameInTamil
          );
        } else {

          set_current_member(
            lang === "ENGLISH"
              ? members[0].nameInEnglish
              : members[0].nameInTamil
          );
        }
      }
    }
  }, [tabsId, lang]);
  const handleSearch = () => {

    const eligibleVisible = document.querySelectorAll(
      '.eligible-scheme-item:not(.searchbar-hide)'
    ).length;

    const ineligibleVisible = document.querySelectorAll(
      '.ineligible-scheme-item:not(.searchbar-hide)'
    ).length;
    // console.log(ineligibleVisible);
    setFilteredEligibleCount(eligibleVisible);
    setFilteredIneligibleCount(ineligibleVisible);
  };

  const applyButton = (url) => (
    <Button fill small className='external' href={url} target="_blank" rel="noopener noreferrer">
      {lang === "ENGLISH" ? "More Details" : "மேலும் விவரங்களுக்கு"}test
    </Button>
  );

  const family_dropdown_box = () => (
    family_schemes_member.length > 0 ? (
      <div className="container">
        <div className='viewEligBy'>
          <span>
            {languageData?.view_scheme_by}
          </span>
          <select className="select-box" onChange={get_schemes} value={current_member}>
            <option value="all">Family Schemes</option>
            {family_schemes_member?.map((member, index) => (
              <option key={index} value={member?.makkal_id}>
                {lang === "ENGLISH" ? member?.nameInEnglish : member?.nameInTamil}
              </option>
            ))}
          </select>
        </div>
      </div>
    ) : null
  );

  const eligible_schemes_box = () => (
    <>
      {loading ? (
        <BlockTitle className='sckeleton-wave-effect skeleton-text'>
          Eligible Schemes
        </BlockTitle>
      ) : (
        scheme_count === 0 ? (
          <p style={{ color: 'red' }}>{languageData?.no_schemes}</p>
        ) : (
          <BlockTitle>
            {languageData?.my_scheme_eligible} ({filteredEligibleCount})
          </BlockTitle>
        )
      )}

      {loading ? (
        <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
          {[1, 2, 3, 4].map((n) => (
            <ListItem title="Loading Schemes" key={n} className='skeleton-block skeleton-text' style={{ height: "50px" }}>
              <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />
            </ListItem>
          ))}
        </List>
      ) : (
        <List dividersIos outlineIos strongIos className='scheme-list search-list searchbar-found eligible-found' accordionList>
          {eligible_schemes?.map((scheme, index) => (
            <ListItem
              accordionItem
              key={index}
              className={`item-title eligible-scheme-item`}
              title={`${index + 1}. ${lang === "ENGLISH" ? scheme.scheme_name : scheme.scheme_name_tamil}`}
              after={
                <Chip
                  text={lang === "ENGLISH" ? "Probable Eligible" : "தகுதி உள்ளது"}
                  color="green"
                  style={{ fontWeight: 'bold' }}
                />
              }
            >
              <AccordionContent>
                <Block>
                  <div className='wrap-text' dangerouslySetInnerHTML={{ __html: lang === "ENGLISH" ? scheme.scheme_desc : scheme.scheme_desc_tamil }} />
                  <div className="grid-cols-1 medium-grid-cols-3 grid-gap">
                    <div>
                      {scheme_count === 1 ? applyButton(scheme.url) : ""}
                    </div>
                  </div>
                </Block>
              </AccordionContent>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );

  const ineligible_schemes_box = () => (
    <>
      <BlockTitle>
        {lang === "ENGLISH" ? "Other Schemes" : "மற்ற திட்டங்கள்"} ({filteredIneligibleCount})
      </BlockTitle>
      {loading ? (
        <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
          {[1, 2, 3, 4].map((n) => (
            <ListItem title="Loading Schemes" key={n} className='skeleton-block skeleton-text' style={{ height: "50px" }}>
              <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />
            </ListItem>
          ))}
        </List>
      ) : (
        <List dividersIos outlineIos strongIos className='scheme-list search-list searchbar-found ineligible-found' accordionList>
          {currentIneligibleData?.map((scheme, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + (index + 1);
            return (

              <ListItem
                accordionItem
                key={globalIndex}
                className={`item-title ineligible-scheme-item`}
                title={`${globalIndex}. ${lang === "ENGLISH" ? scheme.schemeName : scheme.schemeNameTamil}`}
                after={
                  <Chip
                    text={lang === "ENGLISH" ? "Check Eligibility" : "தகுதியை சரிபார்க்கவும்"}
                    color="red"
                    style={{ fontWeight: 'bold' }}
                  />
                }
              >
                <AccordionContent>
                  <Block>


                    <div className='wrap-text' dangerouslySetInnerHTML={{ __html: lang === "ENGLISH" ? scheme.scheme_desc : scheme.scheme_desc_tamil }} />

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
            )
          }
          )}
        </List>
      )}
      <FilterPagination
        totalItems={ineligible_schemes?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );

  return (
    <>
      <Block className='scheme-page padB5rem'>
        {family_dropdown_box()}

        <Searchbar
          placeholder="Search schemes / Departments..."
          searchContainer=".search-list"
          searchIn=".item-title"
          onChange={() => handleSearch()}
        />


        <List strongIos outlineIos dividersIos className="searchbar-not-found">
          <ListItem title="Nothing found" />
        </List>

        {eligible_schemes_box()}
        {/* {lang === "ENGLISH" ?
          <div className='text-danger text-center'>** The above eligibility is based on the information available and further processing will be based on the application and the Department Procedure **</div> :
          <div className='text-danger text-center'>** இமேற்கண்ட தகுதி கிடைக்கக்கூடிய தகவல்களை அடிப்படையாகக் கொண்டது, மேலும் விண்ணப்பம் மற்றும் துறை நடைமுறையைப் பொறுத்து மேலும் செயலாக்கம் இருக்கும். **</div>} */}
        {ineligible_schemes_box()}


      </Block>
    </>
  );
};

export { SchemeEligibilityPage };
