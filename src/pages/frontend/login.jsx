import React, { useState, useEffect, useSelect } from 'react';
import { Block, List, ListItem, Button, ListInput, f7, Page, Navbar, NavLeft, NavTitle, NavRight, Link, f7ready, useStore } from 'framework7-react';
import loginLeftImg from '../../assets/images/landing-small-bg.jpg';
import TopNavbar from '../TopNavbar';
import { CustomNavbar } from '../CustomNavbar';


const LoginPage = ({ f7router, popUpclosefromLogin, tnClass, hidef7router }) => {
  const [hideNav, setHideNav] = useState(false);
  const getSwitchedLang = useStore('getLanguageWhenReload');
  useEffect(() => {
    debugger;
    f7ready(() => {
      const mainView = f7.views?.main;
      if (mainView && mainView.router) {

        checkRoute(mainView.router.currentRoute?.path);

        mainView.router.on('routeChange', (newRoute) => {
          checkRoute(newRoute.path);
        });
      }
    });
  }, []);
  const checkRoute = (path) => {
    debugger;
    if (path === '/home/' || path === '/home' || path === '/login') {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  };
  const [lang, setLang] = useState('ENGLISH');
  const store = f7.store;
  const state = store.state;

  const [is_login_with, set_login_with] = useState('aadhar');

  const [is_login_error, set_login_error] = useState(store.getters.login_error.value);
  const [setAadhar, set_setAadhar] = useState(store.getters.aadharNumber.value || '');
  const language_data = useStore('language_data');
  const [tnfont, setTnFont] = useState(false);
  const [is_login_screen, set_login_screen] = useState(1);
  const [is_login_button, set_login_button] = useState(true);
  const [is_resend_button, set_resend_button] = useState(true);
  const [countdown, setCountdown] = useState(120);
  const [formData, setFormData] = useState({
    mobile: '',
    aadhar: '',
    saveConsent: false, // For checkbox
    otp: '',
    txn: '',
  });

  // useEffect(() => {
  //   if (getSwitchedLang === 'ENGLISH') {
  //     setLang('ENGLISH');
  //     // set_language_data(f7.passedParams.english_language);
  //   } else {
  //     setLang('TAMIL');
  //     // set_language_data(f7.passedParams.tamil_language);
  //     setTnFont(true);
  //   }
  // }, [lang]);
  const checkLogin = (event) => {

    set_login_with(event.target.value);

    setErrors({});

    setFormData({
      mobile: '',
      aadhar: '',
      saveConsent: false, // For checkbox
      otp: '',
      txn: '',
    })

  }

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (name == "aadhar") {

      if (/^\d*$/.test(value) && value.length <= 12) {
        setFormData((prev) => ({ ...prev, [name]: value }));

      }
      if (value.length >= 12) {

        set_login_button(false); // Enable login button if exactly 12 digits
      } else {
        set_login_button(true); // Disable login button if not exactly 12 digits
      }
    }
    if (name == "mobile") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        set_login_button(false);
      }
      if (value.length >= 10) {
        set_login_button(false); // Enable login button if exactly 12 digits
      } else {
        set_login_button(true); // Disable login button if not exactly 12 digits
      }

    }
    if (name == "otp") {
      if (/^\d*$/.test(value) && value.length <= 6) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    if (name == "saveConsent") {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    // Clear error for the corresponding input
    if (value || (type === 'checkbox' && checked)) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

  };

  //new login submit 
  // const formSubmit = async (e) => {

  //   e.preventDefault();
  //   localStorage.setItem('uid', formData.aadhar);

  //   const newErrors = {};
  //   if (is_login_with == "aadhar") {

  //     if (!formData.aadhar) {

  //       newErrors.aadhar = 'Aadhar is required.';

  //     }
  //     if (formData.aadhar.length != 12) {

  //       newErrors.aadhar = 'Enter valid aadhar number.';
  //     }
  //   }


  //   if (is_login_with == "mobile") {

  //     if (!formData.mobile) {

  //       newErrors.mobile = 'Mobile number is required.';

  //     }

  //     if (formData.mobile.length != 10) {

  //       newErrors.mobile = 'Enter valid mobile number.';
  //     }
  //   }

  //   if (!formData.saveConsent) {

  //     newErrors.saveConsent = 'You must accept the terms.';

  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors); // Set errors if validation fails

  //   }
  //   else {

  //     setErrors({}); // Clear errors if valid

  //     set_login_error("");

  //     f7.preloader.show();

  //     const response = await store.dispatch('sendLogin', formData);

  //     if (response) {
  //       if (response.status == "OK") {

  //         if (response.data?.data?.code == 500) {
  //           set_login_error("Internal Server Error UIDAI");
  //           f7.preloader.hide();
  //           return true;
  //         }
  //         set_login_screen(2);

  //         setFormData(prevState => ({
  //           ...prevState,
  //           txn: response.data.txn
  //         }));
  //         setCountdown(120);           // Reset countdown to 10
  //         // Start countdown
  //         startTimer();
  //       }
  //       else {
  //         if (response.message?.errorInfo) {
  //           set_login_error("Internal Server Error")
  //         }
  //         else {
  //           set_login_error(response.message)
  //         }

  //       }

  //     }
  //     else {

  //       set_login_error("Server Could not connect");

  //     }
  //     f7.preloader.hide();
  //   }

  //   // f7.store.dispatch('sendLogin', formData);
  // }

  //new otp submit
  // const otpSubmit = async (e) => {
  //   e.preventDefault();
  //   const newErrors = {};
  //   if (!formData.otp) {
  //     newErrors.otp = 'OTP is required.';
  //   }

  //   if (formData.otp.length != 6) {

  //     newErrors.otp = 'Enter valid OTP.';
  //   }


  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors); // Set errors if validation fails

  //   }
  //   else {

  //     setErrors({}); // Clear errors if valid

  //     set_login_error("");

  //     f7.preloader.show();

  //     const response = await store.dispatch('sendOtp', formData);

  //     if (response) {
  //       debugger;

  //       if (response.status === "OK") {
  //         localStorage.setItem('token', response.refreshToken);
  //         // localStorage.setItem('user_image', response.data.user_image);
  //         // location.reload();
  //         //f7.views.main.router.refreshPage();
  //         f7.views.main.router.navigate('/home/', {
  //           clearPreviousHistory: true,
  //           ignoreCache: true,
  //         });
  //         f7.popup.close();
  //       }
  //       else {

  //         set_login_error(response.message.error)

  //       }
  //     }
  //     else {


  //       set_login_error("Server Could not connect");

  //     }
  //     f7.preloader.hide();

  //   }

  //   // f7.store.dispatch('sendLogin', formData);
  // }

  // old otp submit

  //old login submit
  const formSubmit = async (e) => {

    e.preventDefault();

    localStorage.setItem('uid', formData.aadhar);
    const newErrors = {};
    if (is_login_with == "aadhar") {

      if (!formData.aadhar) {

        newErrors.aadhar = 'Aadhar is required.';

      }
      if (formData.aadhar.length != 12) {

        newErrors.aadhar = 'Enter valid aadhar number.';
      }
    }


    if (is_login_with == "mobile") {

      if (!formData.mobile) {

        newErrors.mobile = 'Mobile number is required.';

      }

      if (formData.mobile.length != 10) {

        newErrors.mobile = 'Enter valid mobile number.';
      }
    }

    if (!formData.saveConsent) {

      newErrors.saveConsent = 'You must accept the terms.';

    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails

    }
    else {

      setErrors({}); // Clear errors if valid

      set_login_error("");

      f7.preloader.show();

      const response = await store.dispatch('sendLogin', formData);

      if (response) {
        // if (response.success == true) {
        if (response.status == "OK") {
          // if (response.data?.data?.code == 500) {
          if (response.data?.code == 500) {
            set_login_error("Internal Server Error UIDAI");
            f7.preloader.hide();
            return true;
          }
          set_login_screen(2);

          setFormData(prevState => ({
            ...prevState,
            // txn: response.data.data.data.txn
            txn: response.data?.txn
          }));
          setCountdown(120);           // Reset countdown to 10
          // Start countdown
          startTimer();
        }
        else {
          if (response.message !== null) {
            set_login_error("Internal Server Error")
          }
          else {
            set_login_error(response.message)
          }

        }

      }
      else {

        set_login_error("Server Could not connect");

      }
      f7.preloader.hide();
    }

    // f7.store.dispatch('sendLogin', formData);
  }

  const otpSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = 'OTP is required.';
    }

    if (formData.otp.length != 6) {

      newErrors.otp = 'Enter valid OTP.';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails

    }
    else {

      setErrors({}); // Clear errors if valid

      set_login_error("");

      f7.preloader.show();

      const response = await store.dispatch('sendOtp', formData);

      if (response) {
        debugger;

        // if (response.success == true) {
        if (response.status == "OK") {
          localStorage.setItem('token', response.data?.refreshToken);
          // localStorage.setItem('user_image', response.data.user_image);
          // location.reload();
          //f7.views.main.router.refreshPage();
          f7.views.main.router.navigate('/home/', {
            clearPreviousHistory: true,
            ignoreCache: true,
          });
          f7.popup.close();
        }
        else {

          set_login_error(response.message.error)

        }
      }
      else {


        set_login_error("Server Could not connect");

      }
      f7.preloader.hide();

    }

    // f7.store.dispatch('sendLogin', formData);
  }
  const resendOtp = async (e) => {
    e.preventDefault();
    f7.preloader.show();
    set_resend_button(true);
    const response = await store.dispatch('sendLogin', formData);

    if (response) {
      if (response.success == true) {
        set_login_screen(2);

        setFormData(prevState => ({
          ...prevState,
          txn: response.data.data.data.txn
        }));
        setCountdown(10);           // Reset countdown to 10
        // Start countdown
        startTimer();
      }
      else {
        if (response.message?.errorInfo) {
          set_login_error("Internal Server Error")
        }
        else {
          set_login_error(response.message)
        }

      }

    }
    else {

      set_login_error("Server Could not connect");

    }
    f7.preloader.hide();
  }
  const startTimer = () => {
    const timerInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timerInterval);  // Clear interval when countdown reaches 0
          set_resend_button(false);     // Re-enable the button
          setCountdown(0);
          return 120;  // Reset the countdown
        }
        return prevCountdown - 1;  // Decrement countdown
      });
    }, 1000); // Update every second
  };

  return (
    <Page name='loginpage'>
      {/* <TopNavbar
        language_data={language_data}
        lang={lang}
        toggleLanguage={toggleLanguage}
        tnClass={tnClass}
      />
      <CustomNavbar
        isDetailsPage="showMenus"
        language_data={language_data}
        lang={lang}
        toggleLanguage={toggleLanguage}
        tnClass={tnClass}
        f7router={f7router}
        hideNav={hideNav}
      /> */}
      {/* <Navbar title="Scheme Dashboard" backLink="Back" /> */}
      <Block>

        <div className={tnClass === "tnFontChange" ? 'tnFontChange grid grid-cols-1 large-grid-cols-1 grid-gap' : 'grid grid-cols-1 large-grid-cols-1 grid-gap'}>
          {is_login_screen == 1 ?
            <div className='login-box'>
              <h3 className='text-center'> {language_data?.login}</h3>

              <form onSubmit={formSubmit}>
                {is_login_error ?
                  <span className='form-error'>{is_login_error}</span>
                  : ""}

                <List strongIos outlineIos dividersIos>
                  <ListItem
                    radio
                    radioIcon="start"
                    className='text-white'
                    title={language_data?.login_with_aadhar}
                    name="login_with"
                    value="aadhar"
                    onChange={checkLogin}
                    defaultChecked
                  />
                  {/* <ListItem
            radio
            radioIcon="start"
            className='text-white'
            title={languageData?.login_with_mobile}
            name="login_with"
            value="mobile"
            onChange={checkLogin}
          /> */}

                  <ListInput
                    outline
                    floatingLabel
                    type="tel"
                    placeholder={language_data?.enter_aadhar_number}
                    autocomplete='off'
                    name='aadhar'
                    value={formData.aadhar}
                    onChange={handleInputChange}
                    errorMessage={errors.aadhar}
                    errorMessageForce
                    style={{ display: is_login_with == "aadhar" ? "block" : "none" }}
                  />

                  <ListInput
                    outline
                    floatingLabel
                    type="tel"
                    placeholder={language_data?.enter_mobile_number}
                    autocomplete='off'
                    name='mobile'
                    value={formData.mobile}
                    onChange={handleInputChange}
                    errorMessage={errors.mobile}
                    errorMessageForce
                    style={{ display: is_login_with == "mobile" ? "block" : "none" }}
                  />

                  <ListItem
                    className='save-consent'
                    checkbox
                    checkboxIcon="start"
                    title={language_data?.consent_label}
                    name="saveConsent"
                    checked={formData.saveConsent}
                    onChange={handleInputChange}

                  />
                  <ListItem>
                    <center>
                      {errors.saveConsent && (
                        <span className="error-message" style={{ color: 'red' }}>
                          {errors.saveConsent}
                        </span>
                      )}

                    </center>

                  </ListItem>
                  <ListItem>

                    <Button fill round className='login-button' type="submit" disabled={is_login_button}>
                      {language_data?.send_otp}
                    </Button>
                  </ListItem>
                </List>
              </form>
            </div>
            :
            <div className='login-box'>
              <h3 className='text-center'> {language_data?.enter_otp}</h3>

              <form onSubmit={otpSubmit}>
                {is_login_error ?
                  <span className='form-error'>{is_login_error}</span>
                  : ""}

                <List strongIos outlineIos dividersIos>

                  <ListInput
                    outline
                    floatingLabel
                    type="tel"
                    placeholder={language_data?.please_enter_otp}
                    autocomplete='off'
                    name='otp'
                    value={formData.otp}
                    onChange={handleInputChange}
                    errorMessage={errors.otp}
                    errorMessageForce
                  />

                  {countdown > 0 ? (
                    <div>
                      <center>
                        <p>Resend available in: {countdown} seconds</p>
                      </center>


                    </div>
                  ) : (
                    <>

                    </>
                  )}

                  <ListItem>


                    <Button fill round className='login-button' type="submit" >
                      {language_data?.enter_otp}
                    </Button>

                    <Button fill round className='login-button' type='button' onClick={resendOtp} disabled={is_resend_button}>
                      {language_data?.resent_otp}
                    </Button>


                  </ListItem>


                </List>


              </form>
            </div>
          }
        </div>
      </Block>
      {/* <Navbar>
        <NavLeft>
          <Link onClick={(e) => f7router.navigate('/', { clearPreviousHistory: true, ignoreCache: true })}>
            <i className="icon f7-icons">arrow_left</i>
            <span>Back</span>
          </Link>
        </NavLeft>
        <NavTitle>Login</NavTitle>
        <NavRight />
      </Navbar> */}
    </Page>
    // <>
    //   <Block>
    //     <div className="grid grid-cols-1 large-grid-cols-2 grid-gap">
    //       <div className='loginBackDrop'>
    //         <img src={loginLeftImg} alt="leader" />
    //       </div>
    //       <div className='loginFn'>
    //         <h4>LOGIN</h4>
    //       </div>
    //     </div>
    //   </Block>
    // </>
  );
};
export default LoginPage;