
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar, Icon, ListInput, List, f7 } from 'framework7-react';
import agriculture from '../../assets/images/agriculture.png';
import education from '../../assets/images/education.png';
import HealthWellness from '../../assets/images/HealthWellness.png';
import womenschild from '../../assets/images/womenschild.png';
import findScheme from '../../assets/images/find_schemes.png';
import departmentImg from '../../assets/images/department-logo/sample.png';
import CategoryPage from './categoryschemes';
import SchemeList from './scheme-list';
import FilterPagination from '../../components/FilterPagination';




export default ({ language_data, tnClass, getdepartment, f7router }) => {
  const store = f7.store;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDeptQuery, setSearchDeptQuery] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [deptLabel, setDeptLabel] = useState('');
  const [deptSchCount, setDeptSchCount] = useState('');
  const [categoriesSchCount, setCategoriesSchCount] = useState('');
  const getCategorySchemesLabel = async () => {
    const categoryResponse = await store.dispatch('getCategorySchemes');
    const categoryResponseData = categoryResponse?.categories.map((item) => {
      return item.category
    })

    setCategoriesSchCount(categoryResponse);
    setCategoryLabel(categoryResponseData);
  }
  const getDepartmentSchemesLabel = async () => {
    const deptResponse = await store.dispatch('getDepartmentSchemes');
    const deptResponseData = deptResponse?.departments.map((item) => {
      return item.department
    })

    setDeptSchCount(deptResponse);
    setDeptLabel(deptResponseData);
  }
  const goToDetails = () => {
    f7.popup.close();
    // f7.views.main.router.navigate('/details', {
    //   force: true,
    //   reloadCurrent: true,
    //   ignoreCache: true,
    //   animate: true,
    //   props: {
    //     language_data: language_data,
    //     langVersion: Date.now(),
    //   },
    // });
    f7.views.main.router.navigate('/details')
    // setTimeout(() => {
    //   f7router.navigate('/details?reload=' + Date.now());
    // }, 250)
    //alert('Page under development');
  };
  const [deptName, setDeptName] = useState('');
  const popup = useRef(null);
  const handleCategoryPopUp = () => {
    return false;
    if (!popup.current) {
      popup.current = f7.popup.create({
        content: `
          <div class="popup">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="navbar-bg"></div>
                  
                  <div class="right"><a  class="link popup-close">Close</a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="block">
                  <div id="category-popup-root"></div>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      });
    }
    // Open it
    popup.current.open();
    setTimeout(() => {
      const container = document.getElementById('category-popup-root');
      if (container) {
        ReactDOM.render(<CategoryPage languageData={language_data} />, container);
      }
    }, 100);

    popup.current.on('closed', () => {
      const container = document.getElementById('login-popup-root');
      if (container) ReactDOM.unmountComponentAtNode(container);
    });
  };
  const [activeTabText, setActiveTabText] = useState('categories');
  useEffect(() => {
    getCategorySchemesLabel();
    getDepartmentSchemesLabel();
    if (tnClass) {
      setActiveTabText('வகைகள்');
    } else {
      setActiveTabText('categories');
    }
  }, [tnClass]);
  console.log('deptLabel', deptLabel);
  const handleTabClick = (e) => {
    setActiveTabText(e.target.innerText);
  }
  const handleSchemeCountClick = (id, name) => {
    getDeptSchId(id, name);
  }
  const popupdepsch = useRef(null);
  const handleSchemeIdPopUp = (data, name) => {
    if (!popupdepsch.current) {
      popupdepsch.current = f7.popup.create({
        content: `
          <div class="popup schemeListPopup popExtcss">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="navbar-bg"></div>
                 
                  <div class="right"><a  class="link popup-close"><i class="icon f7-icons">xmark</i></a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="block">
                  <div id="scheme-list-popup-root"></div>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      });
    }
    // Open it
    popupdepsch.current.open();
    setTimeout(() => {
      const container = document.getElementById('scheme-list-popup-root');
      if (container) {
        ReactDOM.render(<SchemeList languageData={language_data} schemeListData={data} tnClass={tnClass} schemeTitleName={name} />, container);
      }
    }, 100);

    popupdepsch.current.on('closed', () => {
      const container = document.getElementById('login-popup-root');
      if (container) ReactDOM.unmountComponentAtNode(container);
    });
  };
  const getDeptSchId = async (id, name) => {
    const store = f7.store;

    f7.preloader.show();

    const response = await store.dispatch('getDeptSchemes', id);

    if (response) {
      if (response.success) {
        handleSchemeIdPopUp(response.data, name);
      }
      else {
        console.log(response.messeage);
      }

    }
    else {

    }
    f7.preloader.hide();

  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const categoryCount = categoriesSchCount.categories;
  const deptCount = deptSchCount.departments;
  //const currentData = Array.isArray(categoryLabel) ? categoryLabel.slice(startIndex, startIndex + itemsPerPage) : [];
  const currentData = categoryLabel || [];
  const currentDeptData = deptLabel || [];
  const searchSchemes = currentData.filter(sch => {
    return sch.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const searchDeptSchemes = currentDeptData.filter(schDept => {
    return schDept.toLowerCase().includes(searchDeptQuery.toLowerCase());
  });

  return (
    <>
      <div className="grid grid-cols-1 large-grid-cols-1 scheme_layout">
        <div className="grid grid-cols-1">
          <div className='kyswl'>
            <div className='grid grid-cols-1 large-grid-cols-2'>
              <div>
                <img src={findScheme} alt='find-schemes' />
              </div>
              <div className='findschemesPad'>
                <h4>{language_data.know_your_scheme}</h4>
                <p> {language_data.know_your_scheme_desc} </p>
                <Link href={`/details`}>
                  <span className='detailsCta kysCTA'>{language_data.know_your_scheme_cta}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Toolbar bottom tabbar>
          <Link tabLink="#tab-1" tabLinkActive onClick={(e) => handleTabClick(e)}>
            {language_data.tab1}
          </Link>
          <Link tabLink="#tab-2" onClick={(e) => handleTabClick(e)}>
            {language_data.tab2}
          </Link>
        </Toolbar>
      </div>
      <div className='grid grid-cols-1 large-grid-cols-2 viewBy'>
        {
          tnClass === true ?
            <h3> {activeTabText.toLowerCase()} {language_data.view_scheme_by} </h3>
            :
            <h3> {language_data.view_scheme_by} {activeTabText.toLowerCase()}</h3>
        }
        <div className='searchInpt'>
          <List strongIos dividersIos insetIos>
            <ListInput outline label={language_data.schemeSearch} floatingLabel type="text" value={searchQuery}
              onInput={(e) => setSearchQuery(e.target.value)}>
              {/* onInput={(e) => activeTabText === "categories" ? setSearchQuery(e.target.value) : setSearchDeptQuery(e.target.value)}> */}

              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
          </List>
        </div>
      </div>
      <Tabs>
        <Tab id="tab-1" className="page-content tabContent" tabActive>
          <Block>
            {/* <p>Categories</p> */}
            <div className="grid grid-cols-1 large-grid-cols-4 grid-gap adjustGridGap">
              {searchSchemes && searchSchemes.map((cat, index) => {
                return (
                  <div className='schemeDetails' key={index}>
                    <img src={`../../assets/images/category/${cat}.png`} alt={cat} />
                    <div>
                      <p>{cat}</p>
                      {categoryCount && categoryCount.length > 0 && (
                        <span>
                          {
                            categoryCount.find(catCount => catCount.category === cat)
                              ? (
                                <a onClick={() => handleCategoryPopUp()}>
                                  {
                                    categoryCount.find(catCount => catCount.category === cat).schemes.length
                                  } {language_data.schemes} Schemes
                                </a>
                              )
                              : (
                                <a>0 {language_data.schemes}</a> // in case no schemes for this category
                              )
                          }
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
            {/* <FilterPagination
              totalItems={categoryLabel.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            /> */}
          </Block>
        </Tab>
        <Tab id="tab-2" className="page-content tabContent">
          <Block>
            {/* <div className="grid grid-cols-1 large-grid-cols-3 grid-gap">
              {getdepartment.map((departmentName, i) => {
                return (
                  <div className='departmentDetails grid grid-cols-3 large-grid-cols-3' key={i}>
                    <img
                      src={`../../assets/images/department-logo/${departmentName.org_id}.png`} alt={departmentName.name} />
                    <p>{departmentName.name}</p>
                    <p className='schemeCountDept' onClick={() => handleSchemeCountClick(departmentName.org_id, departmentName.name)}> {departmentName.schemes_count} </p>
                  </div>

                )
              })}
            </div> */}
            <div className="grid grid-cols-1 large-grid-cols-2 grid-gap adjustGridGap">
              {searchDeptSchemes && searchDeptSchemes.map((cat, index) => {
                console.log('deptCount', cat);
                return (
                  <div className='schemeDetails' key={index}>
                    {/* <img src={`../../assets/images/department-logo/${departmentName.org_id}.png`} alt={cat} /> */}
                    <div>
                      <p>{cat}</p>
                      {deptCount && deptCount.length > 0 && (
                        <span>
                          {
                            deptCount.find(catCount => catCount.category === cat)
                              ? (
                                <a onClick={() => handleCategoryPopUp()}>
                                  {
                                    deptCount.find(catCount => catCount.category === cat).schemes.length
                                  } {language_data.schemes} Schemes
                                </a>
                              )
                              : (
                                <a>0 {language_data.schemes}</a> // in case no schemes for this category
                              )
                          }
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>


            {/* <div className="grid grid-cols-1 large-grid-cols-3 grid-gap">
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
              <div className='departmentDetails grid grid-cols-3 large-grid-cols-3'>
                <img src={departmentImg} alt='Animal' />
                <p>Animal Husbandry, Dairying, Fisheries & Fishermen Welfare </p>
                <p>24</p>
              </div>
            </div> */}
          </Block>
        </Tab>
      </Tabs>
    </>)
};