import React, { useState, useEffect } from 'react';
import { Block, Button, f7, Icon, Card, Badge, useStore } from 'framework7-react';
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
  const [you, setYou] = useState("");
  const [pds_transaction, set_pds_transaction] = useState(pds);
  const [products, set_products] = useState([]);
  const uid = localStorage.getItem('uidNumber');
  const showCustomLoader = () => {
    const dialog = f7.dialog.create({
      text: '<div class="custom-loader blinking-text">Please wait while we fetch your family information...</div>',
      cssClass: 'custom-loader-dialog',
      closeByBackdropClick: false,
    });
    dialog.open();
    return dialog;
  };
  const checkFamilyInfo = async () => {
    debugger
    const loader = showCustomLoader();
    try {
      const response = await store.dispatch('getMyFamily', uid);
      if (response) {
        const makkalId = localStorage.getItem('individualMakkalId');
        localStorage.setItem('family_members_names', JSON.stringify(response?.Data));
        if (response.statusCode === 200) {
          const f_head = response?.Data?.find(item => item.relationCode === "1");
          const youLable = response?.Data?.filter(item => item.makkalId === makkalId);
          setYou(youLable[0].makkalId);
          const f_members = response?.Data.filter(item => item.relationCode !== "1").sort((a, b) => a.Age - b.Age); // Sort by user_age
          // const t = response?.ApplicantInfo[0].makkalId;
          // const member = f_members.find((m) => m.makkalId === t);
          // setYou(member);
          set_members(f_members);
          set_family_head(f_head);
          // set_current_user(response?.ApplicantInfo[0].makkalId);
          // set_relations(response.data?.relations);
          // set_products(response.data?.products);
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
    }
    catch (error) {
      console.error('Error fetching family info:', error);
      f7.toast.create({
        text: 'An unexpected error occurred.',
        position: 'top',
        closeTimeout: 2000,
      }).open();
    }
    finally {
      loader.close();
    }
  }




  useEffect(() => {

    if (tabsId == "B") {

      if (members.length === 0 || !members) {
        checkFamilyInfo();

      }

    }
  }, [tabsId]);

  const check_relation = (code) => {
    // const family_relation = family_head?.find(item => item.RelationCode === code);
    return (
      lang === "ENGLISH" ? (
        <span>{family_head?.relationName}</span>
      ) : (
        <span>{family_head?.relationName}</span>
      )
    )
  }

  const family_head_box = () => {

    return (
      <>
        {loading ?
          (
            <div className='family-members skeleton-effect-wave'>
              {/* <center>
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
              </center> */}
            </div>
          ) : (

            <div className='family-members family-head'>
              <center>
                <div className="photo-container">
                  <div className='containerTop'>
                    {family_head?.sex === "M" ? (
                      <img src="/assets/images/male_new.png" alt="Male Passport Photo" className="flex1" />
                    ) : (
                      // <img src="/assets/images/female_new.png" alt="Female Passport Photo" className="" />
                      ''
                    )}
                    <p className='flex10'>
                      {lang === "ENGLISH" ?
                        (family_head?.nameInEnglish)
                        :
                        (family_head?.nameInTamil)
                      }
                      {family_head?.makkal_id == you ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </p>
                    <p className='marR2'> {check_relation(family_head?.relationCode)}</p>
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

                      <p>Gender : {family_head?.sex} <br /> {family_head?.age} {languageData?.age}</p>
                      :
                      <p>Gender : {family_head?.sex} <br /> {family_head?.age} {languageData?.age} </p>

                    }

                    {/* {lang === "ENGLISH" ?

                      <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>
                      :
                      <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>

                    } */}







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
                {/* <center>
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
                </center> */}
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
                      {member?.sex === "M" ? (
                        <img src="/assets/images/male.png" alt="Male Passport Photo" className="passport-photo" />
                      ) : (
                        <img src="/assets/images/female.png" alt="Female Passport Photo" className="passport-photo" />
                      )}
                      <p className='flex10'>
                        {lang === "ENGLISH" ?
                          (member?.nameInEnglish)
                          :
                          (member?.nameInTamil)
                        }
                      </p>
                      <p>
                        {member?.makkalId == you ?
                          <Badge color="green" className='marRg'>You</Badge>
                          : ""}
                      </p>
                    </div>
                    <div className='family-members-details'>

                      {lang === "ENGLISH" ?

                        <p>Gender : {member?.sex} <br /> {member?.age} {languageData?.age}</p>
                        :
                        <p>Gender : {member?.sex}<br /> {member?.age} {languageData?.age} </p>

                      }

                      {/* <p>{languageData?.languageData.relation_with_family_head} : {check_relation(member?.user_relation_code)}</p> */}
                      {/* {lang === "ENGLISH" ?

                        <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>
                        :
                        <p><a className='viewEligible'>View eligible schemes {'>'}</a></p>

                      } */}



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
                  <td className="label-cell">{family_head?.nameInEnglish}
                    {members?.makkal_id == you ?
                      <Badge color="green">You</Badge>
                      : ""}
                  </td>
                  <td className="label-cell">{family_head?.sex}</td>
                  <td className="label-cell">{family_head?.age}</td>
                  <td className="label-cell">{check_relation(family_head?.RelationName)}</td>
                </tr>
                :
                <tr>
                  <td className="label-cell">1</td>
                  <td className="label-cell">{family_head?.NameInTamil}
                    {members?.makkal_id == you ?
                      <Badge color="green">You</Badge>
                      : ""}
                  </td>
                  <td className="label-cell">{family_head?.sex}</td>
                  <td className="label-cell">{family_head?.age}</td>
                  <td className="label-cell">{check_relation(family_head?.RelationName)}</td>
                </tr>
              }
              {members?.map((member, index) => (
                lang === "ENGLISH" ?
                  <tr key={index}>
                    <td className="label-cell">{index + 2}</td>
                    <td className="label-cell">{member?.nameInEnglish}
                      {member?.makkalId == you ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </td>
                    <td className="label-cell">{member?.sex}</td>
                    <td className="label-cell">{member?.age}</td>
                    <td className="label-cell">{member?.relationName}</td>

                  </tr>
                  :
                  <tr key={index}>
                    <td className="label-cell">{index + 2}</td>
                    <td className="label-cell">{member?.nameInTamil}
                      {member?.makkalId == you ?
                        <Badge color="green">You</Badge>
                        : ""}
                    </td>
                    <td className="label-cell">{member?.sex}</td>
                    <td className="label-cell">{member?.age}</td>
                    <td className="label-cell">{member?.relationName}</td>

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
    <Block className=''>
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