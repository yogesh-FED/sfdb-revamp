import React, { useState, useEffect } from 'react';
import { Block, Button, f7, Icon, Card, Badge } from 'framework7-react';
import { change, height } from 'dom7';

const FamilyTreePage = ({ languageData, lang }) => {
  const store = f7.store;

  const tabsId = localStorage.getItem('authtabsId');
  const pds = JSON.parse(localStorage.getItem('pds_transactions'));
  const [members, set_members] = useState(store.state.members);
  const [family_head, set_family_head] = useState(store.state.family_head);
  const [loading, set_loading] = useState(false);
  const [relations, set_relations] = useState([]);
  const [is_grid_view, set_grid_view] = useState(true);
  const [activeView, setActiveView] = useState('grid');
  const [current_user, set_current_user] = useState("");
  const [pds_transaction, set_pds_transaction] = useState(pds);
  const [products, set_products] = useState([]);
  // console.log('family_head', family_head);
  const checkFamilyInfo = async () => {

    f7.preloader.show();
    set_loading(true);
    const response = await store.dispatch('getMyFamily');

    if (response) {
      if (response.success) {
        const f_head = response.data?.family?.find(item => item.is_family_head === 1);
        const f_members = response.data?.family?.filter(item => item.is_family_head === 0).sort((a, b) => a.user_relation_code - b.user_relation_code); // Sort by user_age
        // Step 3: Insert relation names into the filtered family heads
        set_members(f_members);
        set_family_head(f_head);
        set_current_user(response.data.makkal_id);
        set_relations(response.data?.relations);
        set_products(response.data?.products);


      }

    }
    else {

      f7.toast.create({
        text: 'Server Could not connect. Please try after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();

      console.log(response)
    }
    f7.preloader.hide();
    set_loading(false);
  }




  useEffect(() => {

    if (tabsId == "B") {

      if (members.length === 0 || !members) {
        checkFamilyInfo();

      }

    }
  }, [tabsId]);

  const check_relation = (code) => {
    const family_relation = relations?.find(item => item.relation_code === code);

    return (
      lang === "ENGLISH" ? (
        <span>{family_relation?.relation_name_english}</span>
      ) : (
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

                  <div className="passport-photo skeleton-block" />

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
          ) : (

            <div className='family-members family-head'>
              <center>
                <div className="photo-container">
                  <div className='containerTop'>
                    {family_head?.gender === "M" ? (
                      <img src="/assets/images/male_new.png" alt="Male Passport Photo" className="flex1" />
                    ) : (
                      // <img src="/assets/images/female_new.png" alt="Female Passport Photo" className="" />
                      'test'
                    )}
                    <p className='flex10'>
                      {lang === "ENGLISH" ?
                        (family_head?.name)
                        :
                        (family_head?.user_name_tamil)
                      }
                      {family_head?.makkal_id == current_user ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </p>
                    <p className='marR2'> {check_relation(family_head?.relation)}</p>
                  </div>

                  <div className='family-members-details'>
                    {/* <p>
                      {lang === "ENGLISH" ?
                        (family_head?.name)
                        :
                        (family_head?.user_name_tamil)
                      }
                      {family_head?.makkal_id == current_user ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </p> */}
                    {lang === "ENGLISH" ?

                      <p>{family_head?.user_gender}, {family_head?.user_age} {languageData?.age}</p>
                      :
                      <p>{family_head?.user_gender_tamil}, {family_head?.user_age} {languageData?.age} </p>

                    }

                    {lang === "ENGLISH" ?

                      <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>
                      :
                      <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>

                    }







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

                    <div className="passport-photo skeleton-block" />

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
              <div className='family-members ' key={index}>
                <center>
                  <div className="photo-container">
                    <div className='containerTop'>
                      {member?.user_info?.gender === "M" ? (
                        <img src="/assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                      ) : (
                        <img src="/assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                      )}
                      <p className='flex10'>
                        {lang === "ENGLISH" ?
                          (member?.name)
                          :
                          (member?.user_name_tamil)
                        }
                      </p>
                      <p>
                        {member?.makkal_id == current_user ?
                          <Badge color="green" className='marRg'>You</Badge>
                          : ""}
                      </p>
                    </div>
                    <div className='family-members-details'>

                      {lang === "ENGLISH" ?

                        <p>{member?.user_gender}, {member?.user_age} {languageData?.age}</p>
                        :
                        <p>{member?.user_gender_tamil}, {member?.user_age} {languageData?.age} </p>

                      }

                      {/* <p>{languageData?.languageData.relation_with_family_head} : {check_relation(member?.user_relation_code)}</p> */}
                      {lang === "ENGLISH" ?

                        <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>
                        :
                        <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>

                      }



                    </div>
                  </div>
                </center>
              </div>
            ))

          )}
      </>
    );
  }

  const member_table_box = () => {
    return (
      <div>
        <Card className="data-table">
          <table>
            <thead>
              <tr>
                <th className="label-cell">#</th>
                <th className="label-cell">{languageData?.name}</th>
                <th className="label-cell">{languageData?.gender}</th>
                <th className="label-cell">{languageData?.age}</th>
                <th className="label-cell">{languageData?.relation_with_family_head}</th>

              </tr>
            </thead>
            <tbody>
              {lang === "ENGLISH" ?
                <tr>
                  <td className="label-cell">1</td>
                  <td className="label-cell">{family_head?.name}
                    {family_head?.makkal_id == current_user ?
                      <Badge color="green">You</Badge>
                      : ""}
                  </td>
                  <td className="label-cell">{family_head?.user_gender}</td>
                  <td className="label-cell">{family_head?.user_age}</td>
                  <td className="label-cell">{check_relation(family_head?.relation)}</td>
                </tr>
                :
                <tr>
                  <td className="label-cell">1</td>
                  <td className="label-cell">{family_head?.user_name_tamil}
                    {family_head?.makkal_id == current_user ?
                      <Badge color="green">You</Badge>
                      : ""}
                  </td>
                  <td className="label-cell">{family_head?.user_gender_tamil}</td>
                  <td className="label-cell">{family_head?.user_info?.user_age}</td>
                  <td className="label-cell">{check_relation(family_head?.relation)}</td>
                </tr>
              }
              {members?.map((member, index) => (
                lang === "ENGLISH" ?
                  <tr key={index}>
                    <td className="label-cell">{index + 2}</td>
                    <td className="label-cell">{member?.name}
                      {member?.makkal_id == current_user ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </td>
                    <td className="label-cell">{member?.user_gender}</td>
                    <td className="label-cell">{member?.user_age}</td>
                    <td className="label-cell">{check_relation(member?.user_relation_code)}</td>

                  </tr>
                  :
                  <tr key={index}>
                    <td className="label-cell">{index + 2}</td>
                    <td className="label-cell">{member?.user_name_tamil}
                      {member?.makkal_id == current_user ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </td>
                    <td className="label-cell">{member?.user_gender_tamil}</td>
                    <td className="label-cell">{member?.user_age}</td>
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

    if (is_view == "table") {
      set_grid_view(false);
      setActiveView('table');
    }
    else {
      set_grid_view(true);
      setActiveView('grid');
    }
  }


  return (
    <Block className='page-content'>
      <div className='top-button'>
        <div className="button-group float-right ">
          {/* {is_grid_view ? */}
          <Button className={`padding-button notActive ${activeView === 'grid' ? 'family-active-button' : ''}`} onClick={() => change_view('grid')}>
            Chart <img src="/assets/images/account_tree.png" alt="account_tree" />
          </Button>
          <Button className={`padding-button notActive ${activeView === 'table' ? 'family-active-button' : ''}`} onClick={() => change_view('table')}>
            Table <img src="/assets/images/format_list_bulleted.png" alt="format_list_bulleted" />
          </Button>
          {/* : */}
          {/* } */}
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