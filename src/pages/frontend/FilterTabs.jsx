
import React, { useCallback, useEffect, useState } from 'react';
import {
  Navbar, Page, Block, Tabs, Tab, Link, Toolbar,
  List,
  ListItem,
  AccordionContent,
  ListInput,
  Button,
  f7,
  useStore,
} from 'framework7-react';
import axios from 'axios';
import FilterPagination from '../../components/FilterPagination';

const FilterTabs = (props) => {
  const language_data = useStore('lang');
  const storedData = JSON.parse(localStorage.getItem('formDataVal'))
  const [schData, setSchData] = useState([]);
  const [categoryOptionsData, setCategoryOptionsData] = useState([]);
  const [categoriesValue, setCategoriesValue] = useState('');
  const [showCategoriesWiseData, setShowCategoriesWiseData] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const store = f7.store;
  useEffect(() => {
    allSchemesCategory();
  }, [])
  const allSchemesCategory = async () => {
    debugger;
    const fieldFilterData = localStorage.getItem('formDataVal');
    // const buildEligibilitySentence = useCallback((answers) => {
    //   if (answers.age !== "")
    //     parts.push(`I am ${answers.age} years old`);

    //   if (answers.income !== "")
    //     parts.push(`my income is ${answers.income}`);

    //   if (answers.community !== "")
    //     parts.push(`I belong to ${answers.community} community`);

    //   if (answers.gender !== "")
    //     parts.push(`I am ${answers.gender}`);

    //   if (answers.maritalStatus !== "")
    //     parts.push(`I am ${answers.maritalStatus}`);
    //   return parts.join(", ");
    // }, [])
    const buildEligibilitySentence = useCallback((answers) => {
      const parts = [];

      if (answers.age)
        parts.push(`I am ${answers.age} years old`);

      if (answers.income)
        parts.push(`my income is ${answers.income}`);

      if (answers.community)
        parts.push(`I belong to ${answers.community} community`);

      if (answers.gender)
        parts.push(`I am ${answers.gender}`);

      if (answers.maritalStatus)
        parts.push(`I am ${answers.maritalStatus}`);

      return parts.join(", ");
    }, []);

    const parseToObj = JSON.parse(fieldFilterData);
    const finalData = buildEligibilitySentence(parseToObj);
    const response = await store.dispatch('getFilterResponse', finalData);
    const categoryResponse = await store.dispatch('getCategorySchemes');
    const categoryResponseData = categoryResponse?.categories.map((item) => {
      return item.category
    })
    setCategoryData(categoryResponse.categories || []);
    setCategoryOptionsData(categoryResponseData);
    if (response) {
      setSchData(response);
    }
  }
  const filteredCategory = categoryData.find(
    (cat) => cat.category.toLowerCase() === categoriesValue.toLowerCase()
  );
  let schemeInnerFilter;
  const filteredSchemes = schData.filter((val) => {
    return (
      (val.gender && val.gender.toLowerCase() === (storedData.gender.toLowerCase())) &&
      // (!val.age || val.age === storedData?.age) &&
      (!val.community || val.community.toLowerCase() === storedData?.community.toLowerCase() || !storedData?.community)
    );
  });
  if (props.eligibleSchemeFilter === true) {
    schemeInnerFilter = filteredSchemes.filter((val) => {
      return (
        (!val?.areaOfResidence || val?.areaOfResidence.toLowerCase() === props.schemeFilterFormData?.areaOfResidence[0]?.currentPlace || !props.schemeFilterFormData?.areaOfResidence[0]?.currentPlace) && (!props.schemeFilterFormData?.areaOfResidence[0]?.isSrilankan || !val?.isSrilankan || val?.isSrilankan.toLowerCase() === props.schemeFilterFormData?.areaOfResidence[0]?.isSrilankan)
      )
    })
    // if (schemeInnerFilter.length === 0) {
    //   schemeInnerFilter = filteredSchemes;
    // }
  }
  const handleViewMore = (e) => {
    e.preventDefault();
    props.f7router.navigate('/scheme-description-and-apply', {
      clearPreviousHistory: true,
      ignoreCache: true,
    })
  }
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (value) => {
    debugger;
    if (value) {
      setCategoriesValue(value);
      setShowCategoriesWiseData(true);
      setCurrentPage(1);
    }
    else if (value === '') {
      setCategoriesValue('');
      setShowCategoriesWiseData(false);
    }
    else {
      setCategoriesValue('');
    }
  }
  const itemsPerPage = 10;
  const categoryItemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const categoryStartIndex = (currentPage - 1) * categoryItemsPerPage;
  const currentData = schData.slice(startIndex, startIndex + itemsPerPage);
  const eligibilityPagination = filteredSchemes?.slice(startIndex, startIndex + itemsPerPage);
  const currentCategoryData = filteredCategory?.schemes?.slice(categoryStartIndex, categoryStartIndex + categoryItemsPerPage);
  return (
    <>
      <Toolbar tabbar>
        <Link tabLink="#eligible" tabLinkActive>
          Your Eligible Schemes ({schemeInnerFilter?.length > 0 ? schemeInnerFilter?.length :
            schemeInnerFilter?.length === 0 ? 0 : filteredSchemes?.length})
        </Link>
        <Link tabLink="#all">
          All ({schData.length})
        </Link>
        {/* <Link tabLink="#women">Women</Link>
        <Link tabLink="#child">Child And Youth</Link>
        <Link tabLink="#diffAbled">Differently Abled</Link>
        <Link tabLink="#fisherman">Fisherman</Link>
        <Link tabLink="#farmer">Farmer</Link> */}
      </Toolbar>
      <Tabs className='filterTabsAccordion'>
        <Tab id="eligible" className="" tabActive>
          <Block>
            {
              eligibilityPagination?.length > 0 && props.eligibleSchemeFilter !== true ?
                eligibilityPagination?.map((val, i) => {
                  return (
                    <List strong outlineIos dividersIos insetMd accordionList key={i}>
                      <ListItem accordionItem title={language_data === "TAMIL" ? val.schemeNameTamil : val.schemeName}>
                        <AccordionContent>
                          <Block>
                            <div className='schemeDescSection'>
                              <p>
                                {language_data === "TAMIL" ? val.schemeDescTamil : val.schemeDesc}
                              </p>
                              <a href='' onClick={handleViewMore}>View More</a>
                            </div>
                          </Block>
                        </AccordionContent>
                      </ListItem>
                    </List>
                  )

                })
                :
                schemeInnerFilter?.map((val, i) => {
                  return (
                    <List strong outlineIos dividersIos insetMd accordionList key={i}>
                      <ListItem accordionItem title={val.scheme_name}>
                        <AccordionContent>
                          <Block>
                            <div className='schemeDescSection'>
                              <p>
                                {val.scheme_desc}
                              </p>
                              <a href='' onClick={handleViewMore}>View More</a>
                            </div>
                          </Block>
                        </AccordionContent>
                      </ListItem>
                    </List>
                  )
                })
            }
            <FilterPagination
              totalItems={filteredSchemes?.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Block>
        </Tab>
        <Tab id="all" className="filterTabsAccordion">
          <Block>
            <p><b>Most Relevant Schemes Based on Your Profile ({showCategoriesWiseData ? filteredCategory?.schemes?.length : schData?.length})</b></p>

            <div className="grid grid-cols-1 large-grid-cols-2 category categorySection">
              <p className="block-title">View By Category : </p>
              <div>
                <ListInput
                  type="select"
                  placeholder="Choose Age"
                  onInput={(e) => handleChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categoryOptionsData && categoryOptionsData.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </ListInput>
              </div>
            </div>
            {
              showCategoriesWiseData ?
                currentCategoryData?.length > 0 ? (
                  currentCategoryData?.map((val, i) => {
                    return (
                      <List strong outlineIos dividersIos insetMd accordionList key={i}>
                        <ListItem accordionItem title={language_data === "TAMIL" ? val.schemeNameTamil : val.schemeName}>
                          <AccordionContent>
                            <Block>
                              <p>
                                {language_data === "TAMIL" ? val.schemeDescTamil : val.schemeDesc}
                              </p>
                            </Block>
                          </AccordionContent>
                        </ListItem>
                      </List>
                    )
                  }
                  )
                ) : (
                  <p>No schemes available for this category.</p>
                )
                :
                currentData.map((val, i) => {
                  return (
                    <List strong outlineIos dividersIos insetMd accordionList key={i}>
                      <ListItem accordionItem title={language_data === "TAMIL" ? val.schemeNameTamil : val.schemeName}>
                        <AccordionContent>
                          <Block>
                            <p>
                              {language_data === "TAMIL" ? val.schemeDescTamil : val.schemeDesc}
                            </p>
                          </Block>
                        </AccordionContent>
                      </ListItem>
                    </List>
                  )
                })
            }
            <FilterPagination
              totalItems={showCategoriesWiseData ? filteredCategory?.schemes.length : schData.length}
              itemsPerPage={showCategoriesWiseData ? categoryItemsPerPage : itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Block>
        </Tab>
        <Tab id="women" className="">
          <Block>
            <p>Tab 2 content</p>
          </Block>
        </Tab>
        <Tab id="child" className="">
          <Block>
            <p>Tab 3 content</p>
          </Block>
        </Tab>
        <Tab id="diffAbled" className="">
          <Block>
            <p>Tab 4 content</p>
          </Block>
        </Tab>
        <Tab id="fisherman" className="">
          <Block>
            <p>Tab 5 content</p>
          </Block>
        </Tab>
        <Tab id="farmer" className="">
          <Block>
            <p>Tab 6 content</p>
          </Block>
        </Tab>
      </Tabs>
    </>
  );
}

export default FilterTabs;