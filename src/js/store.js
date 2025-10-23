
import { createStore } from 'framework7/lite';
import { f7 } from 'framework7-react';
import tamil_contents from '../assets/locales/tn/translator.json';
import english_contents from '../assets/locales/en/translator.json';
// import CryptoJS from 'crypto-js';

// const key = CryptoJS.enc.Utf8.parse("t700#umsF@db0705i700#umsF@db0705"); // Must be 16, 24, or 32 bytes for AES
// const iv = CryptoJS.enc.Utf8.parse("i700#umsF@db0705"); // Must be 16 bytes for AES

import * as CryptoJS from "crypto-js";
import axios from 'axios';

const key = CryptoJS.enc.Latin1.parse("t700#umsF@db0705");
const iv = CryptoJS.enc.Latin1.parse("i700#umsF@db0705");

const encrypt = (value) => {
  return CryptoJS.AES.encrypt(value, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString();
};

const decrypt = async (value) => {
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: iv,
    // padding: CryptoJS.pad.ZeroPadding,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  const cleanStr = decryptedStr.trim().replace(/\0/g, '');
  console.log("Decrypted string:", cleanStr);
  return JSON.parse(cleanStr);
};



// const SEND_LOGIN = API + "/makkal/login";
const SEND_LOGIN = LOGIN_API;
// const SEND_LOGIN = LOCAL_API + "/sendAadharSms";
// const SEND_OTP = API + "/makkal/validate-otp";
// const SEND_OTP = LOCAL_API + "/sendAadharSmsKyc";
const GET_TOKEN = LOCAL_API + "/getToken";
const SEND_OTP = OTP_VERIFY_API;
const GET_LATEST = API + "/makkal/get-latest";
// const GET_PERSONAL_INFO = API + "/makkal/get-master-data";
const GET_PERSONAL_INFO = LOCAL_API + "/getPersonalInfo";
// const GET_MY_SCHEMES = API + "/makkal/get-my-schemes";
const GET_MY_SCHEMES = LOCAL_API + "/getAllSchemes";
const GET_MY_SCHEMES_WITH_STS = LOCAL_API + "/getAllSchemesWithStatus";
const GET_CATEGORY_SCHEMES = LOCAL_API + "/getMakkalPortalSchemes";
const GET_DEPARTMENT_SCHEMES = LOCAL_API + "/getMakkalSchemesByDepartment";
const GET_CHATBOT_SCHEMES = API + "/makkal/get-chatbot-schemes";
const GET_MY_FAMILY_SCHEMES = API + "/makkal/get-my-family-schemes";
// const GET_MY_FAMILY = API + "/makkal/get-my-family";
const GET_MY_FAMILY = LOCAL_API + "/getFamilyInfo";
// const GET_PDS_DATA = API + "/makkal/get-pds-data";
const GET_PDS_DATA = LOCAL_API + "/fetchPdsSalesData";
// const GET_MY_SERVICES = API + "/makkal/get-my-services";
const GET_MY_SERVICES = LOCAL_API + "/getIndividualSchemeDetailsByUid";
const GET_MY_FAMILY_SERVICES = LOCAL_API + "/getfamilySchemeDetailsByUfc";
// const LOGOUT = API + "/makkal/logout";
const LOGOUT = LOCAL_API + "/logout";
const GET_ALL_SCHEMES = API + "/makkal/get-all-schemes";
const CHECK_MY_ELIGIBILITY = API + "/makkal/check-eligibility";
const GET_DEPT_SCHEMES = API + "/makkal/get-schemes";
const savedValue = localStorage.getItem('languageSwitched');
const isTamil = localStorage.getItem('language') === 'TA';
const store = createStore({
  state: {
    getLanguageWhenReload: savedValue,
    language: "",
    language_contents: [],
    user: [],
    login_error: "",
    aadharNumber: "",
    posts: [],
    resource: [],
    availed_schemes: [],
    eligible_schemes: [],
    all_schemes: [],
    schemes: [],
    individual_schemes: [],
    family_schemes: [],
    family_schemes_member: [],
    members: [],
    pds_transaction: [],
    user_image: "",
    lang: isTamil ? 'TAMIL' : 'ENGLISH',
    language_data: isTamil ? tamil_contents : english_contents,
    tnFont: isTamil,
    aadharImg: "",
    uidNumber: '',
    familyIdfromPersonalInfo: '',
  },

  getters: {
    lang: ({ state }) => state.lang,
    ufcId: ({ state }) => state.familyIdfromPersonalInfo,
    uidNumber: ({ state }) => state.uidNumber,
    aadharImg: ({ state }) => state.aadharImg,
    language_data: ({ state }) => state.language_data,
    tnFont: ({ state }) => state.tnFont,
    getLanguageWhenReload({ state }) {
      return state.getLanguageWhenReload
    },
    language({ state }) {
      return state.language;
    },
    language_contents({ state }) {
      return state.language_contents;
    },

    login_error({ state }) {
      return state.login_error;
    },

    aadharNumber({ state }) {
      return state.aadharNumber;
    },

    posts({ state }) {
      return state.posts;
    },
    resource({ state }) {
      return state.resource;
    },
    user({ state }) {
      return state.user;
    },
    availed_schemes({ state }) {
      return state.availed_schemes;
    },
    family_schemes_member({ state }) {
      return state.family_schemes_member;
    },
    eligible_schemes({ state }) {
      return state.eligible_schemes;
    },
    all_schemes({ state }) {
      return state.all_schemes;
    },
    schemes({ state }) {
      return state.schemes;
    },
    members({ state }) {
      return state.members;
    },
    pds_transaction({ state }) {
      return state.pds_transaction;
    },
    user_image({ state }) {
      return state.user_image;
    },


  },
  actions: {
    toggleLanguage({ state }) {
      const isCurrentlyTamil = state.lang === 'TAMIL';
      state.lang = isCurrentlyTamil ? 'ENGLISH' : 'TAMIL';
      state.language_data = isCurrentlyTamil ? english_contents : tamil_contents;
      state.tnFont = !isCurrentlyTamil;
      localStorage.setItem('language', isCurrentlyTamil ? 'EN' : 'TA');
    },
    setEngOrTn({ state }, value) {
      state.getLanguageWhenReload = value;
      localStorage.setItem('languageSwitched', value);
    },
    checkImage({ state }) {
      const image_path = localStorage.getItem('user_image');
      const path = "https://makkalsevai.tn.gov.in/MakkalService/" + image_path;
      state.user_image = path;
    },
    getLanguage({ state }) {

      let lang = localStorage.getItem('language');

      if (lang) {
        if (lang == "EN") {
          state.language_contents = english_contents;
        }
        else {
          state.language_contents = tamil_contents;
        }
        state.language = lang;
      }
      else {
        localStorage.setItem('language', "EN");
        state.language = "EN";
        state.language_contents = english_contents;
      }
    },
    setLanguage({ state }, lang) {

      if (lang == "EN") {

        state.language_contents = english_contents;
      }
      else {
        state.language_contents = tamil_contents;
      }
      localStorage.setItem('language', lang);

      state.language = lang;

    },

    sendLogin: async ({ state }, formData) => {
      state.login_error = "";
      // const secureData = {
      //   // aadhar: formData.aadhar ? CryptoJS.AES.encrypt(formData.aadhar, key, { iv: iv}).toString() : "",
      //   aadhar: encrypt(formData.aadhar),
      //   // aadharNo: encrypt(formData.aadhar),
      //   // mobile: formData.mobile ? CryptoJS.AES.encrypt(formData.mobile, key, { iv: iv}).toString() : "",
      //   saveConsent: formData.saveConsent, // For checkbox
      //   // isConsent: "true"
      // };

      try {
        // const response = await fetch(SEND_LOGIN, {
        //   method: "POST",
        //   body: JSON.stringify(secureData),
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //   },
        // });
        const response = await axios.post(
          `${SEND_LOGIN}`,
          {
            aadharNo: encrypt(formData.aadhar),
            isConsent: formData.saveConsent,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
            },
            auth: {
              username: "TNeGA",
              password: "aiml",
            },
          }
        );

        const data = response.data;
        // const data = await response.json();

        return data;

      } catch (error) {
        f7.toast.create({
          text: error + 'Please Try Again After Sometime',
          position: 'top',
          closeTimeout: 2000,
        }).open();
      }
    },

    //new otp with axios
    sendOtp: async ({ state }, formData) => {
      // const secureData = {
      //   aadhar: encrypt(formData.aadhar),
      //   mod: encrypt(formData.otp),
      //   txn: formData.txn,
      //   saveConsent: formData.saveConsent, // For checkbox
      // };
      try {
        // const response = await axios.post(`${SEND_OTP}`, {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     // Authorization: "Bearer " + token,
        //   },
        //   auth: {
        //     username: "TNeGA",
        //     password: "aiml",
        //   },
        // });
        const response = await axios.post(
          `${SEND_OTP}`,
          {
            aadharNo: encrypt(formData.aadhar),
            mod: encrypt(formData.otp),
            txn: formData.txn,
            isConsent: formData.saveConsent,
          },  // Request body goes here (if any)
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
            },
            auth: {
              username: "TNeGA",
              password: "aiml",
            },
          }
        );
        const data = response.data;
        // state.aadharImg = data.userImagePath;
        localStorage.setItem('user_image', data.userImagePath);
        return data;

      } catch (error) {
        alert(error);
        return error;
      }
    },

    getToken: async ({ state }, getTokenPayload) => {
      debugger
      try {
        const response = await axios.post(
          `${GET_TOKEN}`,
          {
            aadharNo: encrypt(getTokenPayload.formData.aadhar),
            mod: encrypt(getTokenPayload.formData.otp),
            txn: getTokenPayload.formData.txn,
            isConsent: getTokenPayload.formData.saveConsent,
            name: getTokenPayload.name || '',
            state: getTokenPayload.state || '',
            district: getTokenPayload.district || '',
            gender: getTokenPayload.gender || '',
            dob: getTokenPayload.dob || '',
            address: getTokenPayload.address || '',
            userImagePath: getTokenPayload.userImagePath || '',
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
            },
            auth: {
              username: "TNeGA",
              password: "aiml",
            },
          }
        );
        const data = response.data;
        localStorage.setItem('token', data.data.refreshToken);
        return data;

      } catch (error) {
        alert(error);
        return error;
      }
    },
    //old otp
    // sendOtp: async ({ state }, formData) => {
    //   const secureData = {

    //     aadhar: encrypt(formData.aadhar),
    //     mod: encrypt(formData.otp),
    //     txn: formData.txn,
    //     saveConsent: formData.saveConsent, // For checkbox
    //   };
    //   try {
    //     const response = await fetch(SEND_OTP, {
    //       method: "POST",
    //       body: JSON.stringify(secureData),
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     });
    //     const data = await response.json();
    //     return data;

    //   } catch (error) {
    //     return error; // Indicate failure
    //   }
    // },

    getLatest: async ({ state }) => {
      f7.preloader.show();

      try {
        const response = await fetch(GET_LATEST, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();

        return data; // Returning response data

      } catch (error) {

        return error; // Indicate failure
      }
    },

    getDeptSchemes: async ({ state }, id) => {
      f7.preloader.show();
      try {
        const response = await fetch(`${GET_DEPT_SCHEMES}/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();
        return data;

      } catch (error) {
        return error;
      }
    },


    getChatbotSchemes: async ({ state }, aadhar) => {
      const secureData = {
        aadhar: encrypt(aadhar)
      };
      try {
        const response = await fetch(GET_CHATBOT_SCHEMES, {
          method: "POST",
          body: JSON.stringify(secureData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();

        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },


    getPersonalInfo: async ({ state }, uid) => {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.post(`${GET_PERSONAL_INFO}`, {
          uid: encrypt(uid),
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });

        // const data = await response.json();
        const data = await response.data;
        const decryptPersonalInfoData = await decrypt(data.data);
        // const imagePath = data?.ApplicantInfo?.[0]?.Image;
        // if (imagePath) {
        //   const imageUrl = "https://makkalsevai.tn.gov.in/MakkalService/" + imagePath;
        //   localStorage.setItem('user_image', imagePath);
        //   state.aadharImg = imageUrl;
        // }
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return decryptPersonalInfoData;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    // getPersonalInfo: async ({ state }) => {
    //   let token = localStorage.getItem("token");
    //   try {
    //     const response = await fetch(GET_PERSONAL_INFO, {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json; charset=UTF-8",
    //         Authorization: "Bearer " + token
    //       },
    //     });

    //     const data = await response.json();
    //     if (data?.code == 401) {
    //       f7.dialog.confirm(data?.message, 'Session Expire', () => {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('authtabsId');
    //         localStorage.removeItem('pds_transactions');
    //         localStorage.removeItem('user_image');
    //         f7.views.main.router.refreshPage();
    //       });
    //     }

    //     return data;
    //   }
    //   catch (error) {
    //     return error; // Indicate failure
    //   }
    // },


    getCategorySchemes: async ({ state }) => {
      try {
        const response = await axios.get(`${GET_CATEGORY_SCHEMES}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });
        const data = await response.data;
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error;
      }
    },

    getDepartmentSchemes: async ({ state }) => {
      try {
        const response = await axios.get(`${GET_DEPARTMENT_SCHEMES}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });
        const data = await response.data;
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error;
      }
    },

    getMySchemeswithStatus: async ({ state }) => {

      let token = localStorage.getItem("token");

      const filters = {
        is_ex: 1,
        is_widow: 1,
        is_dap: 1,
        is_student: 1
      };

      const queryParams = new URLSearchParams(filters).toString(); // Convert object to query string


      try {
        // const response = await fetch(`${GET_MY_SCHEMES}?${queryParams}`, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        // });
        // const response = await fetch(`${GET_MY_SCHEMES}`, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     // Authorization: "Bearer " + token
        //   },
        //   auth: {
        //     username: "TNeGA",
        //     password: "aiml",
        //   },
        // });

        const response = await axios.get(`${GET_MY_SCHEMES_WITH_STS}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });

        // const data = await response.json();
        const data = await response.data;

        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    getMySchemes: async ({ state }) => {

      let token = localStorage.getItem("token");

      const filters = {
        is_ex: 1,
        is_widow: 1,
        is_dap: 1,
        is_student: 1
      };

      const queryParams = new URLSearchParams(filters).toString(); // Convert object to query string


      try {
        // const response = await fetch(`${GET_MY_SCHEMES}?${queryParams}`, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        // });
        // const response = await fetch(`${GET_MY_SCHEMES}`, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     // Authorization: "Bearer " + token
        //   },
        //   auth: {
        //     username: "TNeGA",
        //     password: "aiml",
        //   },
        // });

        const response = await axios.get(`${GET_MY_SCHEMES}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });

        // const data = await response.json();
        const data = await response.data;

        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },
    getAllSchemes: async ({ state }) => {

      let token = localStorage.getItem("token");

      const filters = {
        is_ex: 1,
        is_widow: 1,
        is_dap: 1,
        is_student: 1
      };

      const queryParams = new URLSearchParams(filters).toString(); // Convert object to query string


      try {
        const response = await fetch(`${GET_ALL_SCHEMES}?${queryParams}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token
          },
        });

        const data = await response.json();
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    getMyServices: async ({ state }, uid) => {
      debugger
      let token = localStorage.getItem("token");

      try {
        // const response = await fetch(GET_MY_SERVICES, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        // });
        const response = await axios.post(`${GET_MY_SERVICES}`, {
          "uid": encrypt(uid),
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });

        // const data = await response.json();
        const data = await decrypt(response.data.data);
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    getMyFamilySchemes: async ({ state }, ufc) => {

      let token = localStorage.getItem("token");

      try {
        // const response = await fetch(GET_MY_FAMILY_SCHEMES, {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        //   body: JSON.stringify({
        //     makkal_id: id
        //   }),
        // });

        const response = await axios.post(`${GET_MY_FAMILY_SERVICES}`, {
          "ufc": ufc,
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });

        const data = await decrypt(response.data.data);
        console.log(data, 'family services');
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    getMyEligibleSchemes: async ({ state }, requestData) => {
      let token = localStorage.getItem("token");

      try {
        const response = await fetch(CHECK_MY_ELIGIBILITY, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(requestData), // ✅ Use 'requestData' (renamed parameter)
        });

        const responseData = await response.json(); // ✅ Renamed to 'responseData'

        // ✅ Handle session expiration properly
        // if (responseData?.code == 401) {
        //     f7.dialog.confirm(responseData?.message, 'Session Expired', () => {
        //         localStorage.clear(); // ✅ Clear all user session data
        //         f7.views.main.router.refreshPage();
        //     });
        // }

        return responseData; // ✅ Return corrected response data
      } catch (error) {
        console.error("Error in getMyEligibleSchemes:", error);
        return { success: false, error }; // Return an error object
      }
    },

    getMyFamily: async ({ state }, uid) => {
      debugger
      // let token = localStorage.getItem("token");

      try {
        // const response = await fetch(GET_MY_FAMILY, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        // });
        let token = localStorage.getItem("token");
        const response = await axios.post(`${GET_MY_FAMILY}`, {
          "uid": encrypt(uid),
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });
        // const data = await response.json();
        const data = await response.data;
        const decryptedData = await decrypt(data.data);
        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return decryptedData;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },

    getPdsData: async ({ state }, formData) => {
      debugger
      let token = localStorage.getItem("token");

      try {
        // const response = await fetch(GET_PDS_DATA, {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        //   body: JSON.stringify({
        //     family_id: family_id
        //   }),
        // });
        const response = await axios.post(`${GET_PDS_DATA}`
          , {
            uid: encrypt(formData),
            // isConsent: formData.saveConsent,
          }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + token,
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });


        // const data = await response.json();
        const data = await decrypt(response.data.data);

        if (data?.code == 401) {
          f7.dialog.confirm(data?.message, 'Session Expire', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('authtabsId');
            localStorage.removeItem('pds_transactions');
            localStorage.removeItem('user_image');
            f7.views.main.router.refreshPage();
          });
        }
        return data;
      }
      catch (error) {
        console.log(error);
        return error; // Indicate failure
      }
    },

    logout: async ({ state }, refreshToken) => {
      try {
        const response = await axios.post(`${LOGOUT}`
          , {
            token: refreshToken,
          }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          auth: {
            username: "TNeGA",
            password: "aiml",
          },
        });
        const data = await response.data;
        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },


  },
})
export default store;
