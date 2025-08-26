
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





export default ({ language_data, tnClass, getdepartment, f7router }) => {
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
    if (tnClass) {
      setActiveTabText('வகைகள்');
    } else {
      setActiveTabText('categories');
    }
  }, [tnClass]);
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
                <h4>Find Schemes Tailored To You</h4>
                <p>No need to browse through all the 1000+ schemes, no login needed! Just answer a few questions and we will match you to the schemes you are eligible for!</p>
                {/* <Link href={`/details`}>
                  <span className='detailsCta kysCTA'>{language_data.know_your_scheme_cta}</span>
                </Link> */}
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
            <ListInput outline label={language_data.schemeSearch} floatingLabel type="text">
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
              <div className='schemeDetails'>
                <img src={agriculture} alt='agri' />
                <div><p>Agriculture</p>
                  <span> <a onClick={handleCategoryPopUp}>24 Schemes</a></span></div>
              </div>
              <div className='schemeDetails'>
                <img src={education} alt='agri' />
                <div>
                  <p>Education</p>
                  <span> <a>70 Schemes</a></span>
                </div>
              </div>
              <div className='schemeDetails'>
                <img src={HealthWellness} alt='agri' />
                <div>
                  <p>Health & Wellness</p>
                  <span> <a>24 Schemes</a></span>
                </div>
              </div>
              <div className='schemeDetails'>
                <img src={womenschild} alt='agri' />
                <div>
                  <p>Women & Children</p>
                  <span> <a>24 Schemes</a></span>
                </div>
              </div>
            </div>
          </Block>
        </Tab>
        <Tab id="tab-2" className="page-content tabContent">
          <Block>
            <div className="grid grid-cols-1 large-grid-cols-3 grid-gap">
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