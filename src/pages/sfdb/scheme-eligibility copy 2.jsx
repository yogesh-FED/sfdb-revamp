import React , {useEffect, useState} from 'react';
import { List, ListItem, Icon, BlockTitle, Block , f7, Button} from 'framework7-react';

const SchemeEligibilityPage = (languageData) => {
  
  const store = f7.store;
  
  const tabsId = localStorage.getItem('authtabsId');

  const [availed_schemes, set_availed_schemes] = useState(store.state.availed_schemes);
  const [eligible_schemes, set_eligible_schemes] = useState(store.state.eligible_schemes);
  const [family_schemes_member, set_family_schemes_member] = useState(store.state.family_schemes_member);
  const [current_member, set_current_member] = useState("");
  const [loading, set_loading] = useState(false);
  
  const checkSchemeInfo = async ()=>{
          
    f7.preloader.show();
     set_loading(true);
      const response = await store.dispatch('getMySchemes');
     
      if(response.data) {
            if(response.success){
                  
              set_availed_schemes(response.data.availed_schemes);
              set_eligible_schemes(response.data.eligible_schemes);
              set_family_schemes_member(response.data.family);
              set_current_member(response.data.makkal_id);
            }
            else{
              // console.log(response.messeage);
            }
        
      } 
      else 
      {
          f7.toast.create({
            text: 'Server Could not connect. Please try after sometime',
            position: 'top',
            closeTimeout: 2000,
          }).open();
      }
      f7.preloader.hide();
      set_loading(false);
}


const get_schemes = async(e)=>{
   
  f7.preloader.show();
  set_loading(true);
   const response = await store.dispatch('getMyFamilySchemes', e.target.value);
  
   if(response.data) {
         if(response.success){
               
           set_availed_schemes(response.data.availed_schemes);
           set_eligible_schemes(response.data.eligible_schemes);
           set_current_member(response.data.makkal_id);
         }
         else{
           // console.log(response.messeage);
         }
     
   } 
   else 
   {
       f7.toast.create({
         text: 'Server Could not connect. Please try after sometime',
         position: 'top',
         closeTimeout: 2000,
       }).open();
   }
   f7.preloader.hide();
   set_loading(false);

}
useEffect(() => {

  if(tabsId == "C"){
    
    if(availed_schemes.length === 0 || !availed_schemes){
           checkSchemeInfo();
    }
   
  }
}, [tabsId, availed_schemes]);

const applyButton=(url)=>{
  return (
    
      <Button fill small className='external' href={url} target="_blank" rel="noopener noreferrer">Apply Now</Button>
   
  )
}
const availedButton=()=>{
  return (
    <Button fill small color="green">Already Availed</Button>
  )
}
const family_dropdown_box = () => {
  
  return (
      family_schemes_member.length > 0 ? (
        <div className="container">
        <select 
          className="select-box" 
          onChange={get_schemes} 
          value={current_member} // Control the selected value via `value` here
        >
          {family_schemes_member?.map((member, index) => (
            <option key={index} value={member?.makkal_id}>
              {languageData.language === "EN" ? 
                member?.user_info?.name 
                : member?.user_info?.info_tamil?.name}
            </option>
          ))}
        </select>
      </div>
      ):(
        null
      )
      
  );
};

const availed_schemes_box = () => {
  return (
      <>
          {loading ? (
             <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
             {[1, 2, 3].map((n) => (
                 <ListItem  title="Loading Schemes" after="Availed" key={n} className='skeleton-block skeleton-text' style={{height:"50px"}}>
                     <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" /> 
                 </ListItem>
             ))}
            </List>
          ) : (
            languageData.language === "EN" ? ( // Use ? for the true case
              <List dividersIos outlineIos strongIos className='scheme-list'>
                  {availed_schemes?.map((scheme, index) => (
                      <ListItem  title={`${index + 1}. ${scheme.scheme_name}`} after={availedButton()} key={index}>
                          {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                      </ListItem>
                  ))}
              </List>
          ) : ( // Use : for the false case
              <List dividersIos outlineIos strongIos className='scheme-list'>
                  {availed_schemes?.map((scheme, index) => (
                      <ListItem  title={`${index + 1}. ${scheme.scheme_name_tamil}`} after={availedButton()} key={index}>
                          {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" ></Icon>  */}
                      </ListItem>
                  ))}
              </List>
          )
          )}
          
      </>
  );
}

const eligible_schemes_box = () => {
  return (
      <>
        {loading ? (
             <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
             {[1, 2, 3, 4].map((n) => (
                 <ListItem  title="Loading Schemes" after="Availed" key={n} className='skeleton-block skeleton-text' style={{height:"50px"}}>
                     <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" /> 
                 </ListItem>
             ))}
            </List>
          ) : (
          languageData.language === "EN" ? ( // Use ? for the true case
              <List dividersIos outlineIos strongIos className='scheme-list'>
                  {eligible_schemes?.map((scheme, index) => (
                      <ListItem  title={`${index + 1}. ${scheme.scheme_name}`} after={applyButton(scheme.url)} key={index}>
                          {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                      </ListItem>
                  ))}
              </List>
          ) : ( // Use : for the false case
              <List dividersIos outlineIos strongIos className='scheme-list'>
                  {eligible_schemes?.map((scheme, index) => (
                      <ListItem  title={`${index + 1}. ${scheme.scheme_name_tamil}`} after={applyButton(scheme.url)} key={index}>
                          {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                      </ListItem>
                  ))}
              </List>
          )
        )}
      </>
  );
}

 return (
         <>
          <Block>
             {family_dropdown_box()}
          </Block>
         <Block className='page-content'>
            {loading ? (
           <BlockTitle className='sckeleton-wave-effect skeleton-text'>Availed Schemes</BlockTitle>
            ) : (
                <>
                  <BlockTitle>{languageData?.languageData?.already_availed} ({availed_schemes? availed_schemes.length : 0})</BlockTitle>
                </>
            )}
               
               {availed_schemes_box()}
               {loading ? (
              <BlockTitle className='sckeleton-wave-effect skeleton-text'>Eligible Schemes  </BlockTitle>
           
            ) : (
              <BlockTitle>{languageData?.languageData?.scheme_eligible}  ({eligible_schemes? eligible_schemes.length : 0})</BlockTitle>
            )}
             {eligible_schemes_box()}
           
         </Block>
         </>
  );
};
export { SchemeEligibilityPage };