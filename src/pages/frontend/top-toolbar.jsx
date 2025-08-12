import React from 'react';
import { Toolbar, Link, } from 'framework7-react';

const TopToolbarPage = ({languageData}) => {


 return (
          
          <Toolbar top className='tabs-bg'>
            <Link className='tabs-link' tabLink="#tab-1" tabLinkActive>
            {languageData?.home}
            </Link>
            <Link className='tabs-link' tabLink="#tab-2">{languageData?.about_makkal_sevai}</Link>
            <Link className='tabs-link' tabLink="#tab-3">{languageData?.services}</Link>
            <Link className='tabs-link' tabLink="#tab-4">{languageData?.about_tnega}</Link>
            <Link className='tabs-link' tabLink="#tab-5">{languageData?.login}</Link>
          </Toolbar>
          
  );
};
export { TopToolbarPage };