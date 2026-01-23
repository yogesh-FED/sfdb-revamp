
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Popup, Navbar, Page, Block, Tabs, Tab, Link, Toolbar, Icon, ListInput, List, f7 } from 'framework7-react';
import agriculture from '../../assets/images/agriculture.png';
import education from '../../assets/images/education.png';
import HealthWellness from '../../assets/images/HealthWellness.png';
import womenschild from '../../assets/images/womenschild.png';
import findScheme from '../../assets/images/find_schemes.png';
import departmentImg from '../../assets/images/department-logo/sample.png';
import CategoryPage from './categoryschemes';
import SchemeList from './scheme-list';
import FilterPagination from '../../components/FilterPagination';
import { createRoot } from 'react-dom/client';




export default ({ language_data, tnClass, getdepartment, f7router }) => {
  const store = f7.store;
  const [categoryPopupOpened, setCategoryPopupOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDeptQuery, setSearchDeptQuery] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [deptLabel, setDeptLabel] = useState('');
  const [deptSchCount, setDeptSchCount] = useState('');
  const [categoriesSchCount, setCategoriesSchCount] = useState('');
  const showCustomLoader = () => {
    const dialog = f7.dialog.create({
      text: '<div class="custom-loader blinking-text">Loading</div>',
      cssClass: 'custom-loader-dialog',
      closeByBackdropClick: false,
    });
    dialog.open();
    return dialog;
  };
  const getCategorySchemesLabel = async () => {
    debugger;
    const loaderDialog = showCustomLoader();
    const categoryResponse = await store.dispatch('getCategorySchemes');
    try {
      const categoryResponseData = categoryResponse?.categories.map((item) => {
        return item.category
      })

      setCategoriesSchCount(categoryResponse);
      setCategoryLabel(categoryResponseData);
    } catch (error) {
      f7.toast.create({
        text: 'Something went wrong ! Please try again after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();
      console.error('Error fetching category schemes:', error);
      alert('something went wrong');

    }
    finally {
      loaderDialog.close();
    }

  }
  const getDepartmentSchemesLabel = async () => {
    debugger;
    const deptResponse = await store.dispatch('getDepartmentSchemes');
    const deptResponseData = deptResponse?.departments.map((item) => {
      try {
        return {
          id: item.departmentCode,
          department: item.department
        };
      } catch (error) {
        f7.toast.create({
          text: 'Something went wrong ! Please try again after sometime',
          position: 'top',
          closeTimeout: 2000,
        }).open();
      } finally {

      }
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
  const popupRoot = useRef(null);
  const openCategoryPopup = (categoryName, schemes) => {
    setSelectedCategory(categoryName);
    setSelectedSchemes(schemes);
    setCategoryPopupOpened(true);
  };

  // const handleCategoryPopUp = (categoryName, schemes) => {
  //   // return false;
  //   if (popup.current) {
  //     popup.current.destroy();
  //     popup.current = null;
  //   }
  //   if (!popup.current) {
  //     popup.current = f7.popup.create({
  //       content: `
  //         <div class="popup popAdjust">
  //           <div class="page">
  //             <div class="navbar">
  //               <div class="navbar-inner">
  //                 <div class="navbar-bg"></div>

  //                 <div class="right"><a  class="link popup-close">Close</a></div>
  //               </div>
  //             </div>
  //             <div class="page-content">
  //               <div class="block">
  //                 <div id="category-popup-root"></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       `.trim(),
  //     });
  //   }
  //   // Open it
  //   popup.current.open();
  //   setTimeout(() => {
  //     const container = document.getElementById('category-popup-root');
  //     if (container) {
  //       ReactDOM.render(<CategoryPage languageData={language_data} categoryName={categoryName}
  //         schemes={schemes} />, container);
  //     }
  //   }, 100);

  //   popup.current.on('closed', () => {
  //     const container = document.getElementById('login-popup-root');
  //     if (container) ReactDOM.unmountComponentAtNode(container);
  //   });
  // };
  const handleCategoryPopUp = (categoryName, schemes) => {

    if (popup.current) {
      popup.current.destroy();
      popup.current = null;
    }

    popup.current = f7.popup.create({
      content: `
      <div class="popup popAdjust">
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="navbar-bg"></div>
              <div class="title">${categoryName}</div>
              <div class="right">
                <a class="link popup-close">Close</a>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="block">
              <div id="category-popup-root"></div>
            </div>
          </div>
        </div>
      </div>
    `,
    });

    popup.current.open();

    setTimeout(() => {
      const container = document.getElementById('category-popup-root');

      if (container) {
        popupRoot.current = createRoot(container);
        popupRoot.current.render(
          <CategoryPage
            languageData={language_data}
            categoryName={categoryName}
            schemes={schemes}
          />
        );
      }
    }, 0);

    popup.current.on('closed', () => {
      if (popupRoot.current) {
        popupRoot.current.unmount();
        popupRoot.current = null;
      }
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
  // console.log('deptLabel', deptLabel);
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
    return {
      deptName: schDept.department.toLowerCase().includes(searchDeptQuery.toLowerCase()),
      id: schDept.id
    }
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
                {/* <Link href={`/details`}> */}
                <Link href={`/chat-page`}>
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
            {/* <ListInput outline label={language_data.schemeSearch} floatingLabel type="text" value={searchQuery}
              onInput={(e) => setSearchQuery(e.target.value)}> */}
            {/* onInput={(e) => activeTabText === "categories" ? setSearchQuery(e.target.value) : setSearchDeptQuery(e.target.value)}> */}

            {/* <Icon icon="demo-list-icon" slot="media" />
            </ListInput> */}
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
                                <a onClick={() =>
                                  openCategoryPopup(
                                    cat,
                                    categoryCount.find(c => c.category === cat)?.schemes || []
                                  )
                                }>
                                  {
                                    categoryCount.find(catCount => catCount.category === cat).schemes.length
                                  } {language_data.schemes} Schemes
                                </a>
                              )
                              : (
                                <a>0 {language_data.schemes}</a>
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
            <div className="grid grid-cols-1 large-grid-cols-3 grid-gap adjustGridGap">
              {searchDeptSchemes && searchDeptSchemes.map((cat, index) => {
                // console.log('deptCount', cat);
                return (
                  <div className='schemeDetails' key={index}>
                    <img src={`../../assets/images/department-logo/${cat.id}.png`} alt={cat} />
                    <div>
                      <p>{cat.department}</p>
                      {/* {deptCount && deptCount.length > 0 && (
                        <span>
                          {
                            deptCount.find(catCount => catCount.department === cat.department)
                              ? (
                                <a onClick={() => handleCategoryPopUp()}>
                                  {
                                    deptCount.find(catCount => catCount.department === cat.department)?.schemes?.length
                                  } {language_data.schemes} Schemes
                                </a>
                              )
                              : (
                                <a>0 {language_data.schemes}</a> // in case no schemes for this category
                              )
                          }
                        </span>
                      )} */}
                    </div>
                  </div>
                );
              })}

            </div>
          </Block>
        </Tab>
      </Tabs>
      <Popup
        opened={categoryPopupOpened}
        onPopupClosed={() => setCategoryPopupOpened(false)}
        className="scheme-popup"
      >
        <Page>
          {/* Header */}
          <Navbar className="scheme-popup-navbar">
            <div className="popup-title">{selectedCategory}</div>
            <Link slot="right" popupClose className="popup-close-btn">
              Close
            </Link>
          </Navbar>

          {/* Content */}
          <div className="scheme-popup-content">
            {selectedSchemes.map((scheme, index) => (
              <div key={index} className="scheme-card">
                <h4 className="scheme-name">{scheme.schemeName}</h4>
                <p className="scheme-desc">{scheme.schemeDesc}</p>
              </div>
            ))}
          </div>
        </Page>
      </Popup>

    </>)
};