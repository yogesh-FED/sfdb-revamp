
import React, { useState } from 'react';
import {
  Navbar,
  Page,
  BlockTitle,
  Button,
  Block,
  List,
  ListInput,
  Checkbox,
  Link,
  Toolbar,
  f7,
} from 'framework7-react';

import $ from 'dom7';

let globalTheme = 'light';
let globalThemeColor = $('html').css('--f7-color-primary').trim();


const SettingsPage = () => {
  const colors = Object.keys(f7.colors).filter(
    (c) => c !== 'primary' && c !== 'white' && c !== 'black',
  );

  const [theme, setTheme] = useState(globalTheme);
  const [themeColor, setThemeColor] = useState(globalThemeColor);

  const setScheme = (newTheme) => {
    f7.setDarkMode(newTheme === 'dark');
    globalTheme = newTheme;
    setTheme(newTheme);
    localStorage.setItem('mode', newTheme);
    
  };

  const setColorTheme = (newColor) => {
    globalThemeColor = f7.colors[newColor];
    setThemeColor(globalThemeColor);
    f7.setColorTheme(globalThemeColor);
    localStorage.setItem('theme', globalThemeColor);
  };

  
  return (
    <Block className='page-content'>
      <BlockTitle medium>Dark / Light Mode</BlockTitle>
      
       
        <div className="grid grid-cols-2 grid-gap">
          <div
            width="50"
           
            className="bg-color-white demo-theme-picker"
            onClick={() => setScheme('light')}
          >
             <div className='ceck-box-center'>
             {theme === 'light' && <Checkbox checked disabled >Light </Checkbox> }
             </div>
          </div>
          <div
            width="50"
            className="bg-color-black demo-theme-picker"
            onClick={() => setScheme('dark')}
          >
            <div className='ceck-box-center'>
            {theme === 'dark' && <Checkbox checked disabled>Dark </Checkbox>}
            </div>
          </div>
        </div>
     
      <BlockTitle medium>Color Themes</BlockTitle>
     
        <div className="grid grid-cols-2 medium-grid-cols-2 large-grid-cols-3 grid-gap">
          {colors.map((color, index) => (
            <div key={index}>
              <Button
                fill
                round
                small
                className="demo-color-picker-button"
                color={color}
                onClick={() => setColorTheme(color)}
              >
                {color}
              </Button>
            </div>
          ))}
        </div>
        </Block>
      
  );
};

export { SettingsPage };