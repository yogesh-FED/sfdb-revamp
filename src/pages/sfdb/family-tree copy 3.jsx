import React, {useState, useEffect} from 'react';
import {Block , Button, f7, Icon} from 'framework7-react';
import { height } from 'dom7';

const FamilyTreePage = (languageData) => {
   
    const store = f7.store;
  
    const tabsId = localStorage.getItem('authtabsId');
  
    const [members, set_members] = useState(store.state.members);
    const [family_head, set_family_head] = useState(store.state.family_head);
    const [loading, set_loading] = useState(false);
    const [relations, set_relations] = useState([]);

    const checkFamilyInfo = async ()=>{
            
      f7.preloader.show();
       set_loading(true);
        const response = await store.dispatch('getMyFamily');
       
        if(response.data) {
              if(response.success){
                const f_head = response.data?.family?.filter(item => item.is_family_head === 1);
                const f_members = response.data?.family?.filter(item => item.is_family_head === 0);
                // Step 3: Insert relation names into the filtered family heads
                set_members(f_members);
                set_family_head(f_head);
                set_relations(response.data?.relations);
                
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
  
    if(tabsId == "B" || !tabsId){
      
      if(members.length === 0 || !members){
             checkFamilyInfo();
             
      }
     
    }
  }, [tabsId, members, languageData]);


  const family_head_box = () => {
   
    return (
        <>
            {loading ?
            (
                <div className='family-members skeleton-effect-wave'>
                <center>
                    <div className="photo-container skeleton-block" style={{ height: "200px" }}>
                       
                        <div  className="passport-photo skeleton-block" />
                       
                        <div>
                            <p className='skeleton-text'>
                               Name 
                            </p>
                            <p className='skeleton-text'>Relation ship </p>
                            
                            <p className='skeleton-text'>
                                gender
                            </p>
                        </div>
                    </div>
                </center>
            </div>
            ): (
                family_head?.map(member => (
                    <div className='family-members' key={member?.user_info?.makkal_id}>
                        <center>
                            <div className="photo-container">
                                {member?.user_info?.gender === "M" ? (
                                    <img src="assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                                ) : (
                                    <img src="assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                                )}
                                <div>
                                    <p>
                                        {languageData?.language == "EN" ? 
                                          (member?.user_info?.name)  
                                           :
                                          (member?.user_info_tamil?.name)
                                        }
                                    </p>
                                    <p>{languageData?.languageData.relation_with_family_head} : </p>
                                    
                                    <p>
                                        {languageData?.language == "EN" ? 
                                          (member?.user_info?.user_gender)
                                           :
                                          (member?.user_info?.user_gender_tamil)
                                        }
                                    </p>
                                </div>
                            </div>
                        </center>
                    </div>
                ))
            )}
        </>
    );
}
  const family_members_box = () => {
    return (
        <>
          {loading ?
            (
               [1, 2, 3].map((n) => (
                <div className='family-members skeleton-effect-wave' key={n}>
                <center>
                    <div className="photo-container skeleton-block" style={{ height: "200px" }}>
                       
                        <div  className="passport-photo skeleton-block" />
                       
                        <div>
                            <p className='skeleton-text'>
                               Name 
                            </p>
                            <p className='skeleton-text'>Relation ship </p>
                            
                            <p className='skeleton-text'>
                                gender
                            </p>
                        </div>
                    </div>
                </center>
            </div>
            )) 
            )
            :
            (
            members?.map((member, index) => (
                <div className='family-members' key={index}>
                    <center>
                        <div className="photo-container">
                           {member?.user_info?.gender === "M" ? (
                                <img src="assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                            ) : (
                                <img src="assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                            )}
                            <div className='family-members-details'>
                                <p>
                                    {languageData?.language == "EN" ? 
                                      (member?.user_info?.name)
                                       :
                                      (member?.user_info_tamil?.name)
                                    }
                                </p>
                                <p>{languageData.languageData?.age} : {member?.user_info?.user_age}</p>
                                <p>
                                    {languageData?.language == "EN" ? 
                                      (member?.user_info?.user_gender)
                                       :
                                      (member?.user_info?.user_gender_tamil)
                                    }
                                </p>
                            </div>
                        </div>
                    </center>
                </div>
            ))
              
            )}
        </>
    );
}

 return (
          
          <Block className='page-content'>
              <div className="grid grid-cols-2 medium-grid-cols-6 large-grid-cols-6 grid-gap">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                <Button fill><Icon md="material:home" ios="f7:house_fill" slot="media" /></Button>
                </div>
                   <div>
                      <Button fill>Pds Transaction</Button>
                   </div>
              </div>
              <div className="grid grid-cols-1 grid-gap">
                  
                  {family_head_box()}
                
              </div>
              <br />
              <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-3 grid-gap">
                 {family_members_box()}
               
              </div>
             
            </Block>
          
  );
};
export { FamilyTreePage };