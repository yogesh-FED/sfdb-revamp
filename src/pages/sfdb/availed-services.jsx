import React, { useEffect, useState } from 'react';
import { List, ListItem, Icon, BlockTitle, Block, f7, Button, useStore } from 'framework7-react';

const AvailedServicePage = ({ languageData, lang }) => {
  const store = f7.store;

  const tabsId = localStorage.getItem('authtabsId');
  const pds = JSON.parse(localStorage.getItem('pds_transactions'));
  const [individual_schemes, set_individual_schemes] = useState(store.state.individual_schemes);
  const [family_schemes, set_family_schemes] = useState(store.state.family_schemes);
  const [loading, set_loading] = useState(false);
  const [pds_transaction, set_pds_transaction] = useState([]);
  const [family_id, set_family_id] = useState();
  const [products, set_products] = useState([]);
  const [listItms, setListItms] = useState(true);
  const uid = localStorage.getItem('uidNumber');
  const ufc = localStorage.getItem('ufc');
  const familySchemes = async () => {
    debugger
    f7.preloader.show();
    set_loading(true);

    const response = await store.dispatch('getMyFamilySchemes', ufc);

    if (response.statusCode === 200) {
      // if (response.success) {
      // set_individual_schemes(response.Data !== null ? response?.Data?.schemes : []);
      set_family_schemes(response.Data !== null ? JSON.parse(response?.Data?.schemes) : []);
      //   set_family_id(response.data.family_id);

      // }
      // set_individual_schemes(response.data.individual_schemes);
      // set_family_schemes(response.data.family_schemes);
      // set_family_id(response.data.family_id);

    }
    else {
      f7.toast.create({
        text: 'Server Could not connect. Please try after sometime',
        position: 'top',
        closeTimeout: 2000,
      }).open();
    }
    f7.preloader.hide();
    set_loading(false);
  }
  const checkServices = async () => {
    debugger
    f7.preloader.show();
    set_loading(true);

    const response = await store.dispatch('getMyServices', uid);

    if (response.statusCode === 200) {
      // if (response.success) {
      set_individual_schemes(response.Data !== null ? JSON.parse(response?.Data?.schemes) : []);
      //   set_family_schemes(response.data.family_schemes);
      //   set_family_id(response.data.family_id);

      // }
      // set_individual_schemes(response.data.individual_schemes);
      // set_family_schemes(response.data.family_schemes);
      // set_family_id(response.data.family_id);

    }
    else {
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
    if (tabsId == "C") {
      checkServices();
      familySchemes();
    }
  }, [tabsId]);

  const get_pds_transaction = async () => {
    debugger
    f7.preloader.show();
    const response = await store.dispatch('getPdsData', uid);
    if (response.statusCode === 200) {
      // if (response.success) {
      set_products(response?.Data?.transactionData.map((txtlist, i) => {
        return txtlist?.txtlist;
      }));
      setListItms(true);
      const sortedData = response?.Data?.transactionData.sort((a, b) => {
        const dateA = a.transaction_date.slice(4) + a.transaction_date.slice(2, 4) + a.transaction_date.slice(0, 2);
        const dateB = b.transaction_date.slice(4) + b.transaction_date.slice(2, 4) + b.transaction_date.slice(0, 2);
        return dateB.localeCompare(dateA);
      });
      set_pds_transaction(sortedData);
      // }
      // else {

      //   // console.log(response.messeage);
      // }

    }

    f7.preloader.hide();

  }
  let dateStored = [];
  const chanhge_date_format = (dateString) => {
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);
    dateStored.push(`${day}-${month}-${year}`);
    return `${day}-${month}-${year}`;
  };
  const product_details = (id) => {
    debugger
    const product = products.find(item => item.product_id === id);

    return product ? product : null;
  }

  let listItems = pds_transaction?.map((pds, index) => {
    return `
    <li class="accordion-item pds-accordian">
      <a class="item-link item-content">
        <div class="item-inner">
          <div class="item-title">${chanhge_date_format(pds.transaction_date)}</div>
        </div>
      </a>
      <div class="accordion-item-content ">

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
               ${pds?.txtlist?.map((list, index) => {
      // const t_product = product_details(list.product_id);
      // console.log('t_product', t_product);
      return `
                  <tr>
                      <td class="numeric-cell">${index + 1}</td>
                      <td class="label-cell">
                       ${list ? (
          lang === "ENGLISH" ?
            list.product_name :
            list.product_name_tamil  // Assuming you have product_name_tamil in the product object
        ) : 'Product Not Found'  // Fallback in case t_product is null
        }</td>
                      <td class="numeric-cell">${list.distributed_quanitity}
                       ${list ? list.product_unit : ''  // Fallback in case t_product is null
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
  }).join('');

  if (listItems !== "" && listItms === true) {
    const popOpen = f7.popup.create({
      content: `
        <div class="popup">
            <div class="page">
              <div class="navbar popup-pds">
                <div class="navbar-inner">
                  <div class="navbar-bg popup-bg"></div>
                  <div class="title">Latest PDS Transaction</div>
                  <div class="right"><a  class="link popup-close">X</a></div>
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
    });
    popOpen.open();
    popOpen.el.querySelector('.popup-close').addEventListener('click', () => {
      setListItms(false);
    });
  }


  const individual_availed_schemes = () => {
    return (
      <>
        {loading ? (
          <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
            {[1, 2, 3].map((n) => (
              <ListItem title="Loading Schemes" after="Availed" key={n} className='skeleton-block skeleton-text' style={{ height: "50px" }}>
                <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />
              </ListItem>
            ))}
          </List>
        ) : (

          lang === "ENGLISH" ? ( // Use ? for the true case
            <List dividersIos outlineIos strongIos className='scheme-list'>
              {individual_schemes.length === 0 ? <ListItem title="No Schemes Availed" key="0"></ListItem> :
                individual_schemes?.map((scheme, index) => (
                  <ListItem title={`${index + 1}. ${scheme.scheme_name}`} key={index}>
                    {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />  */}
                  </ListItem>
                ))}
            </List>
          ) : ( // Use : for the false case
            <List dividersIos outlineIos strongIos className='scheme-list'>
              {individual_schemes?.map((scheme, index) => (
                <ListItem title={`${index + 1}. ${scheme.scheme_name_tamil}`} key={index}>
                  {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" ></Icon>  */}
                </ListItem>
              ))}
            </List>
          )
        )}

      </>
    );
  };
  const family_availed_schemes = () => {
    return (
      <>
        {loading ? (
          <List dividersIos outlineIos strongIos className='scheme-list skeleton-effect-wave'>
            {[1, 2, 3].map((n) => (
              <ListItem title="Loading Schemes" after="Availed" key={n} className='skeleton-block skeleton-text' style={{ height: "50px" }}>
                <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" />
              </ListItem>
            ))}
          </List>
        ) : (
          lang === "ENGLISH" ? ( // Use ? for the true case

            <List dividersIos outlineIos strongIos className='scheme-list'>
              <ListItem title="1. PDS" key="1">
                <Button fill className="padding-button" onClick={() => get_pds_transaction()}>Transaction</Button>
              </ListItem>
              {family_schemes?.map((scheme, index) => (
                <ListItem title={
                  <>
                    {index + 2}. {scheme.scheme_name} - (
                    <span style={{ fontWeight: "bold", color: "blue" }}>{scheme.name}</span>
                    )
                  </>
                }

                  key={index + 2}>
                  <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" /> {scheme.last_availed}
                </ListItem>
              ))}
            </List>
          ) : ( // Use : for the false case
            <>




              <List dividersIos outlineIos strongIos className='scheme-list'>
                <ListItem title="1. PDS" key="1">
                  <Button fill className="padding-button" onClick={() => get_pds_transaction()}>Transaction</Button>
                </ListItem>
                {family_schemes?.map((scheme, index) => (
                  <ListItem title={
                    <>
                      {index + 2}. {scheme.scheme_name_tamil} - (
                      <span style={{ fontWeight: "bold", color: "blue" }}>{scheme.name}</span>
                      )
                    </>
                  }

                    key={index + 2}>
                    {/* <Icon md="material:done_outline" ios="f7:checkmark_alt" slot="media" ></Icon>  */}
                  </ListItem>
                ))}
              </List>


            </>

          )
        )}

      </>
    );
  };

  return (
    <>

      <Block className='page-content'>
        <div className='block'>
          <div className="block-title">Individual availed Schemes / Services</div>
          {individual_availed_schemes()}
        </div>
        <div className='block'>
          <div className="block-title">Family availed Schemes / Services</div>
          {family_availed_schemes()}
        </div>
      </Block>
    </>
  );
};
export { AvailedServicePage };