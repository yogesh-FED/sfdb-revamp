import React from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  Toolbar,
  Link,
  Tabs,
  Tab,
} from 'framework7-react';
import TabStructure from './tabStructure';

const CategoriesSchemes = ({ categoryName, schemes, language_data, tnClass }) => {
  console.log('Popup data:', categoryName, schemes);
  return (
    <div className="category-popup">
      <h3>{categoryName}</h3>

      {schemes.length === 0 && (
        <p>No schemes available</p>
      )}

      {schemes.map((scheme, index) => (
        <div key={index} className="scheme-item">
          <h4>{scheme.schemeName}</h4>
          <p>{scheme.schemeDesc}</p>
        </div>
      ))}
    </div>
  );
};
export default { CategoriesSchemes };