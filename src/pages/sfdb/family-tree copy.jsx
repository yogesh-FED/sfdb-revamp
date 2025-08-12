import React, {useState, useEffect} from 'react';
import {Block , f7} from 'framework7-react';

const FamilyTreePage = (languageData, language) => {
    const store = f7.store;
  
    const tabsId = localStorage.getItem('authtabsId');
  
    const [members, set_members] = useState(store.state.members);
    const [family_head, set_family_head] = useState(store.state.family_head);
    const [relations, set_relations] = useState([]);

    const checkFamilyInfo = async ()=>{
            
      f7.preloader.show();
  
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
  }
  
  


  useEffect(() => {
  
    if(tabsId == "B" || !tabsId){
      
      if(members.length === 0 || !members){
             checkFamilyInfo();
             
      }
     
    }
  }, [tabsId, members]);


  const family_head_box = () => {
   
    return (
        <>
            {family_head?.map(member => (
                <div className='family-members' key={member?.user_info?.makkal_id}>
                    <center>
                        <div className="photo-container">
                            {member?.user_info?.gender === "M" ? (
                                <img src="assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                            ) : (
                                <img src="assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                            )}
                            <div>
                                <p>{member?.user_info?.name}</p>
                                <p>{member?.user_info?.user_age}</p>
                                <p>{member?.user_info?.user_gender}</p>
                            </div>
                        </div>
                    </center>
                </div>
            ))}
        </>
    );
}
  const family_members_box = () => {
    return (
        <>
            {members?.map((member, index) => (
                <div className='family-members' key={index}>
                    <center>
                        <div className="photo-container">
                           {member?.user_info?.gender === "M" ? (
                                <img src="assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                            ) : (
                                <img src="assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                            )}
                            <div>
                                <p>{member?.user_info?.name}</p>
                                <p>{member?.user_info?.user_age}</p>
                                <p>{member?.user_info?.user_gender}</p>
                            </div>
                        </div>
                    </center>
                </div>
            ))}
        </>
    );
}

 return (
          
          <Block className='page-content'>
              
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