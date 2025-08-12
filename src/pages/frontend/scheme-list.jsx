import DOMPurify from 'dompurify';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  AccordionContent,
} from 'framework7-react';




export default ({ languageData, schemeListData, tnClass, schemeTitleName }) => {
  // console.log('language_data', languageData);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleDescription = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };
  return (
    <>
      <h3>{schemeTitleName}</h3>
      <div className='grid-gap grid grid-cols-1 large-grid-cols-2 schemeListScreen'>
        {
          schemeListData.schemes.map((schemeNames, index) => {
            return (
              <div className='schemesDiv' key={index} style={{ alignSelf: 'start' }}>
                {
                  tnClass === true ?
                    <p>{schemeNames.scheme_name_tamil}</p>
                    :
                    <p className='schemeTitle'> {schemeNames.scheme_name} </p>
                }
                <div className={`desc-wrapper ${expandedIndex === index ? 'expanded' : ''}`}>
                  {
                    tnClass === true ?
                      <p className="scheme-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(schemeNames.dashboard_scheme_description_tamil) }} />

                      :
                      <p className="scheme-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(schemeNames.dashboard_scheme_description) }} />

                  }
                </div>
                {
                  schemeNames.dashboard_scheme_description === null ? '' :
                    <p onClick={() => toggleDescription(index)} className='viewmore'>
                      {expandedIndex === index ? languageData.viewLess : languageData.viewMore}
                    </p>
                }

              </div>
            )
          })
        }
      </div>
    </>)
};