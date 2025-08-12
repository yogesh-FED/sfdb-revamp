import React, {useState, useEffect} from 'react';
import {Block , Button, f7, Icon, Card, Badge} from 'framework7-react';
import { change, height } from 'dom7';

const FamilyTreePage = (languageData) => {
   
    const store = f7.store;
  
    const tabsId = localStorage.getItem('authtabsId');
    const pds = JSON.parse(localStorage.getItem('pds_transactions'));
    const [members, set_members] = useState(store.state.members);
    const [family_head, set_family_head] = useState(store.state.family_head);
    const [loading, set_loading] = useState(false);
    const [relations, set_relations] = useState([]);
    const [is_grid_view, set_grid_view] = useState(true);
    const [current_user, set_current_user] = useState("");
    const [pds_transaction, set_pds_transaction] = useState(pds);
    const [products, set_products] = useState([]);
    const checkFamilyInfo = async ()=>{
         
      f7.preloader.show();
       set_loading(true);
        const response = await store.dispatch('getMyFamily');
       
        if(response.data) {
              if(response.success){
                const f_head = response.data?.family?.find(item => item.is_family_head === 1);
                const f_members = response.data?.family?.filter(item => item.is_family_head === 0).sort((a, b) => a.user_relation_code - b.user_relation_code); // Sort by user_age
                // Step 3: Insert relation names into the filtered family heads
                set_members(f_members);
                set_family_head(f_head);
                set_current_user(response.data.makkal_id);
                set_relations(response.data?.relations);
                set_products(response.data?.products);
             
                
              }
              else{
               // console.log(response.messeage);
              }
          
        } 
        else 
        {
            if(response?.error){
                f7.dialog.confirm(response?.message, 'Session Expire', () => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('authtabsId');
                   f7.views.main.router.refreshPage();
                });
              }
              else
              {
                f7.toast.create({
                  text: 'Server Could not connect. Please try after sometime',
                  position: 'top',
                  closeTimeout: 2000,
                }).open();
              }
               console.log(response)
        }
        f7.preloader.hide();
        set_loading(false);
  }
  
  


  useEffect(() => {
  
    if(tabsId == "B"){
      
      if(members.length === 0 || !members){
             checkFamilyInfo();
             
      }
     
    }
  }, [tabsId]);

  const check_relation =(code) => {
    const family_relation = relations?.find(item => item.relation_code === code);
   
    return(
        languageData?.language == "EN" ? (
        <span>{family_relation?.relation_name_english}</span>
        ): (
        <span>{family_relation?.relation_name_tamil}</span>
        )
    )
  }

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
                
                    <div className='family-members family-head'>
                        <center>
                            <div className="photo-container">
                           
                                {family_head?.user_info?.gender === "M" ? (
                                    <img src="assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                                ) : (
                                    <img src="assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                                )}
                                <div className='family-members-details'>
                                    <p>
                                        {languageData?.language == "EN" ? 
                                          (family_head?.user_info?.name)  
                                           :
                                          (family_head?.user_info?.info_tamil?.name)
                                        }
                                        {family_head?.makkal_id == current_user ? 
                                          <Badge color="green">You</Badge>
                                        : ""}
                                    </p>
                                    {languageData?.language == "EN" ? 

                                    <p>{family_head?.user_info?.user_gender}, {family_head?.user_info?.user_age} {languageData.languageData?.age}</p>
                                    :
                                    <p>{family_head?.user_info?.user_gender_tamil}, {family_head?.user_info?.user_age} {languageData.languageData?.age} </p>

                                    }
                                        
                                    
                                    <p> {check_relation(family_head?.user_relation_code)}</p>
                                        
                                      
                                      
                                    
                                </div>
                            </div>
                        </center>
                    </div>
            
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
                <div className='family-members '  key={index}>
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
                                      (member?.user_info?.info_tamil?.name)
                                    }
                                    { member?.makkal_id == current_user ? 
                                      <Badge color="green">You</Badge>
                                    : ""}
                                </p>
                                {languageData?.language == "EN" ? 

                                <p>{member?.user_info?.user_gender}, {member?.user_info?.user_age} {languageData.languageData?.age}</p>
                                :
                                <p>{member?.user_info?.user_gender_tamil}, {member?.user_info?.user_age} {languageData.languageData?.age} </p>

                                }
                               
                                <p>{languageData?.languageData.relation_with_family_head} : {check_relation(member?.user_relation_code)}</p>
                                  
                              

                              
                            </div>
                        </div>
                    </center>
                </div>
            ))
              
            )}
        </>
    );
}

const member_table_box=()=>{
     return(
        <div>
                <Card className="data-table">
                <table>
                    <thead>
                    <tr>
                        <th className="label-cell">#</th>
                        <th className="label-cell">{languageData?.languageData.name}</th>
                        <th className="label-cell">{languageData?.languageData.gender}</th>
                        <th className="label-cell">{languageData?.languageData.age}</th>
                        <th className="label-cell">{languageData?.languageData.relation_with_family_head}</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {languageData?.language == "EN" ? 
                    <tr>
                        <td className="label-cell">1</td>
                        <td className="label-cell">{family_head?.user_info?.name}
                        { family_head?.makkal_id == current_user ? 
                            <Badge color="green">You</Badge>
                        : ""}
                        </td>
                        <td className="label-cell">{family_head?.user_info?.user_gender}</td>
                        <td className="label-cell">{family_head?.user_info?.user_age}</td>
                        <td className="label-cell">{check_relation(family_head?.user_relation_code)}</td>
                    </tr>
                    :
                    <tr>
                        <td className="label-cell">1</td>
                        <td className="label-cell">{family_head?.user_info?.info_tamil?.name}
                        { family_head?.makkal_id == current_user ? 
                            <Badge color="green">You</Badge>
                        : ""}
                        </td>
                        <td className="label-cell">{family_head?.user_info?.user_gender_tamil}</td>
                        <td className="label-cell">{family_head?.user_info?.user_age}</td>
                        <td className="label-cell">{check_relation(family_head?.user_relation_code)}</td>
                    </tr>
                    }
                   { members?.map((member, index) => (
                    languageData?.language == "EN" ? 
                    <tr key={index}>
                        <td className="label-cell">{index + 2}</td>
                        <td className="label-cell">{member?.user_info?.name}
                        { member?.makkal_id == current_user ? 
                            <Badge color="green">You</Badge>
                        : ""}
                        </td>
                        <td className="label-cell">{member?.user_info?.user_gender}</td>
                        <td className="label-cell">{member?.user_info?.user_age}</td>
                        <td className="label-cell">{check_relation(member?.user_relation_code)}</td>
                       
                    </tr>
                    : 
                    <tr key={index}>
                        <td className="label-cell">{index + 2}</td>
                        <td className="label-cell">{member?.user_info?.info_tamil?.name} 
                        { member?.makkal_id == current_user ? 
                            <Badge color="green">You</Badge>
                        : ""}
                        </td>
                        <td className="label-cell">{member?.user_info?.user_gender_tamil}</td>
                        <td className="label-cell">{member?.user_info?.user_age}</td>
                        <td className="label-cell">{check_relation(member?.user_relation_code)}</td>
                       
                    </tr>
                    )
                    )}
                    
                    </tbody>
                </table>
             </Card> 
        </div>
     )
}

const change_view = (is_view) => {
   
   if(is_view == "table"){
       set_grid_view(false);
   }
   else{
    set_grid_view(true);
   }
}

const get_pds_transaction =  async (family_id) => {
        f7.preloader.show();
       
        const response = await store.dispatch('getPdsData', family_id);
       
        if(response.data) {
              if(response.success){
                set_pds_transaction(response?.data?.pds_data?.transactionData);
                localStorage.setItem('pds_transactions', JSON.stringify(response?.data?.pds_data?.transactionData))
              }
              else{
                // console.log(response.messeage);
              }
          
        } 
       
        f7.preloader.hide();
       
    
    const chanhge_date_format = (dateString) => {
        // Extract day, month, and year
        const day = dateString.slice(0, 2);
        const month = dateString.slice(2, 4);
        const year = dateString.slice(4, 8);
        
        // Format to a more readable format
        return `${day}-${month}-${year}`; // MM/DD/YYYY format
      };
      const product_details =(id) =>{
      
        const product = products.find(item => item.product_id == id);
        return product ? product: null;  
      }
     
     //console.log(pds_transaction);
     const sortedPdsTransaction = pds_transaction.sort((a, b) => {
        return b.transaction_date.localeCompare(a.transaction_date); // Sort descending
      });
      
     
      const listItems = sortedPdsTransaction.map((pds, index) => {
       
        return `
          <li class="accordion-item">
            <a class="item-link item-content">
              <div class="item-inner">
                <div class="item-title">${ chanhge_date_format(pds.transaction_date)}</div>
              </div>
            </a>
            <div class="accordion-item-content">

              <div class="block">
                      <div class="data-table">
                        <table>
                          <thead>
                            <tr>
                              <th class="numeric-cell">#</th>
                              <th class="label-cell">Product</th>
                              <th class="numeric-cell">Qty</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                     ${pds.txtlist.map((list, index) => {
                      const t_product = product_details(list.product_id);
                            return `
                        <tr>
                            <td class="numeric-cell">${index + 1}</td>
                            <td class="label-cell">
                             ${
                                t_product ? (
                                  languageData?.language == "EN" ? 
                                  t_product.product_name : 
                                  t_product.product_name_tamil  // Assuming you have product_name_tamil in the product object
                                ) : 'Product Not Found'  // Fallback in case t_product is null
                              }</td>
                            <td class="numeric-cell">${list.distributed_quanitity}
                             ${
                                t_product ? t_product.product_unit  : ''  // Fallback in case t_product is null
                              }
                            </td>
                          
                        </tr>`;  // Return each item wrapped in <p> tags
                    }).join('')}  
              
                 <tbody>
        
               </table>
               </div>
              </div>
            </div>
          </li>
        `;
      }).join(''); // Join the array into a single string
      

    f7.popup.create({
        content: `
         <div class="popup">
            <div class="page">
              <div class="navbar popup-pds">
                <div class="navbar-inner">
                  <div class="navbar-bg"></div>
                  <div class="title">Latest PDS Transaction</div>
                  <div class="right"><a  class="link popup-close">Close</a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="">
                  <div class="list list-strong list-outline-ios list-dividers-ios inset-md accordion-list">
                        <ul>
                          ${listItems}
                        </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      }).open();
    
   
 }
 return (
          <Block className='page-content'>
                 <div className='top-button'>
                        <div className="button-group float-right ">
                        {is_grid_view ?
                            <Button fill className="padding-button" onClick={() => change_view('table')}>
                            <Icon md="material:table_rows_narrow" ios="f7:table" slot="media" /> 
                            </Button>
                            :
                            <Button fill className="padding-button" onClick={() => change_view('grid')}>
                            <Icon md="material:grid_view" ios="f7:rectangle_grid_2x2" slot="media" /> 
                            </Button>
                            }
                            <Button fill className="padding-button" onClick={() => get_pds_transaction(family_head?.family_id)}>PDS Transaction</Button>
                        </div>
                
                 </div>
                 <br />
               {!is_grid_view ? (
                    member_table_box()
                ) : (
                    <>
                    <div className="grid grid-cols-1 grid-gap family-head">
                        {family_head_box()}
                    </div>
                    <br />
                    <div className="grid grid-cols-1 medium-grid-cols-2 large-grid-cols-3 grid-gap">
                        {family_members_box()}
                    </div>
                    </>
                )}
             
            </Block>
          
  );
};
export { FamilyTreePage };