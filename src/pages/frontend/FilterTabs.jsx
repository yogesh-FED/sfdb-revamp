
import React, { useEffect, useState } from 'react';
import {
  Navbar, Page, Block, Tabs, Tab, Link, Toolbar,
  List,
  ListItem,
  AccordionContent,
  ListInput,
  Button,
} from 'framework7-react';
import axios from 'axios';
import FilterPagination from '../../components/FilterPagination';

const FilterTabs = (props) => {
  console.log('filterTabsProps', props);
  const storedData = JSON.parse(localStorage.getItem('formDataVal'))
  console.log('storedData', storedData);
  const [schData, setSchData] = useState([]);

  useEffect(() => {
    axios.get('../assets/getschemes.json')
      .then(response => {
        console.log('Data:', response.data.data.eligible_schemes.schemes);
        setSchData(response.data.data.eligible_schemes.schemes || []);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  let schemeInnerFilter;
  const filteredSchemes = schData.filter((val) => {
    return (
      (!val.gender || val.gender.toLowerCase() === storedData?.gender.toLowerCase()) &&
      (!val.age || val.age === storedData?.age) &&
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
  const itemsPerPage = 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = schData.slice(startIndex, startIndex + itemsPerPage);
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
        <Link tabLink="#women">Women</Link>
        <Link tabLink="#child">Child And Youth</Link>
        <Link tabLink="#diffAbled">Differently Abled</Link>
        <Link tabLink="#fisherman">Fisherman</Link>
        <Link tabLink="#farmer">Farmer</Link>
      </Toolbar>
      <Tabs className='filterTabsAccordion'>
        <Tab id="eligible" className="" tabActive>
          <Block>
            {
              filteredSchemes?.length > 0 && props.eligibleSchemeFilter !== true ?
                filteredSchemes?.map((val, i) => {
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
              totalItems={filteredSchemes.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Block>
        </Tab>
        <Tab id="all" className="filterTabsAccordion">
          <Block>
            <p><b>Most Relevant Schemes Based on Your Profile ({schData.length})</b></p>
            {
              currentData.map((val, i) => {
                return (
                  <List strong outlineIos dividersIos insetMd accordionList key={i}>
                    <ListItem accordionItem title={val.scheme_name}>
                      <AccordionContent>
                        <Block>
                          <p>
                            {val.scheme_desc}
                          </p>
                        </Block>
                      </AccordionContent>
                    </ListItem>
                  </List>
                )
              })
            }
            <FilterPagination
              totalItems={schData.length}
              itemsPerPage={itemsPerPage}
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
      <p>Filter-Page</p>
    </>
  );
}

export default FilterTabs;