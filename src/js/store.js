
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

const decrypt = (value) => {
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};



const SEND_LOGIN = API + "/makkal/login";
const SEND_OTP = API + "/makkal/validate-otp";
const GET_LATEST = API + "/makkal/get-latest";
// const GET_PERSONAL_INFO = API + "/makkal/get-master-data";
const GET_PERSONAL_INFO = LOCAL_API + "/getApplicantInfo";
const GET_MY_SCHEMES = API + "/makkal/get-my-schemes";
const GET_CHATBOT_SCHEMES = API + "/makkal/get-chatbot-schemes";
const GET_MY_FAMILY_SCHEMES = API + "/makkal/get-my-family-schemes";
// const GET_MY_FAMILY = API + "/makkal/get-my-family";
const GET_MY_FAMILY = LOCAL_API + "/getApplicantInfo";
const GET_PDS_DATA = API + "/makkal/get-pds-data";
const GET_MY_SERVICES = API + "/makkal/get-my-services";
const LOGOUT = API + "/makkal/logout";
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
  },

  getters: {
    lang: ({ state }) => state.lang,
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
      f7.preloader.show();
      state.login_error = "";
      const secureData = {
        // aadhar: formData.aadhar ? CryptoJS.AES.encrypt(formData.aadhar, key, { iv: iv}).toString() : "",
        aadhar: encrypt(formData.aadhar),
        // mobile: formData.mobile ? CryptoJS.AES.encrypt(formData.mobile, key, { iv: iv}).toString() : "",
        saveConsent: formData.saveConsent, // For checkbox
      };

      try {
        const response = await fetch(SEND_LOGIN, {
          method: "POST",
          body: JSON.stringify(secureData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();
        //console.log(data);
        return data; // Returning response data

      } catch (error) {
        // return error; // Indicate failure
      }
    },

    sendOtp: async ({ state }, formData) => {
      const secureData = {
        aadhar: encrypt(formData.aadhar),
        mod: encrypt(formData.otp),
        txn: formData.txn,
        saveConsent: formData.saveConsent, // For checkbox
      };
      try {
        const response = await fetch(SEND_OTP, {
          method: "POST",
          body: JSON.stringify(secureData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        return data;

      } catch (error) {
        return error; // Indicate failure
      }
    },

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


    getPersonalInfo: async ({ state }) => {
      const uid = localStorage.getItem('uid');
      const getPersonalInfoPayload = {
        uid: uid,
        deptId: 1,
        schemeId: null
      };
      // let token = localStorage.getItem("token");
      const queryParams = new URLSearchParams(getPersonalInfoPayload).toString();
      try {
        const response = await axios.get(`${GET_PERSONAL_INFO}?${queryParams}`, {
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
        const data = response.data;
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
        const response = await fetch(`${GET_MY_SCHEMES}?${queryParams}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
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
            Authorization: "Bearer " + token
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

    getMyServices: async ({ state }) => {

      let token = localStorage.getItem("token");

      try {
        const response = await fetch(GET_MY_SERVICES, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
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

    getMyFamilySchemes: async ({ state }, id) => {

      let token = localStorage.getItem("token");

      try {
        const response = await fetch(GET_MY_FAMILY_SCHEMES, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            makkal_id: id
          }),
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

    getMyFamily: async ({ state }) => {

      let token = localStorage.getItem("token");

      try {
        // const response = await fetch(GET_MY_FAMILY, {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json; charset=UTF-8",
        //     Authorization: "Bearer " + token
        //   },
        // });
        const uid = localStorage.getItem('uid');
        const getPersonalInfoPayload = {
          uid: uid,
          deptId: 1,
          schemeId: null
        };
        // let token = localStorage.getItem("token");
        const queryParams = new URLSearchParams(getPersonalInfoPayload).toString();
        const response = await axios.get(`${GET_MY_FAMILY}?${queryParams}`, {
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

    getPdsData: async ({ state }, family_id) => {

      let token = localStorage.getItem("token");

      try {
        const response = await fetch(GET_PDS_DATA, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            family_id: family_id
          }),
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

    logout: async ({ state }) => {

      let token = localStorage.getItem("token");

      try {
        const response = await fetch(LOGOUT, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          },
        });

        const data = await response.json();

        return data;
      }
      catch (error) {
        return error; // Indicate failure
      }
    },


  },
})
export default store;
