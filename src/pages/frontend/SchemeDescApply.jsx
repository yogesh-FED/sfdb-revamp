import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  AccordionContent,
  ListInput,
  Toolbar,
  Link,
  Tab,
  Tabs
} from 'framework7-react';
import '../../css/schemefilter.css';

const SchemeDescApply = (props) => {
  console.log('schemeDescPageProps', props);
  const handleBackClick = () => {
    props.f7router.navigate('/detailsResult', {
      clearPreviousHistory: true,
      ignoreCache: true,
    })
  }
  return (
    <div className='schemeDescAndApply'>
      <Page>
        <Block>
          <button className="backBtn" onClick={handleBackClick}>Back</button>
          <div className='grid grid-cols-1 large-grid-cols-2 g2080'>
            <div className='sectionList'>

            </div>
            <div className='schemeDescPage'>
              <div className='borderBottomLine'>
                <div className='schemeDescTitle grid grid-cols-2'>
                  <p><b>Naan Mudhalvan</b>  by Tamil Nadu Skill Development Corporation</p>
                  <p className='suggest'>
                    <span>
                      Suggested for you
                    </span>
                  </p>
                </div>
                <p>
                  Naan Mudhalvan is a flagship skill-development and career-guidance initiative launched by Tamil Nadu Chief Minister on 1 March 2022, aimed at upskilling around 10 lakh students annually across Class 9 to postgraduate levels. It offers industry-relevant training, English communication improvement, exam prep, counseling, and internship support through both online and offline modes.
                </p>
                <a href=''>Go to application site</a>
              </div>
              <div className='sectionDetails'>
                <p><b>Beneficiaries</b></p>
                <ul>
                  <li>College students across Tamil Nadu </li>
                  <li>Polytechnic and school students</li>
                  <li>Job seekers looking to upskill</li>
                </ul>
                <p><b>Benefits</b></p>
                <ul>
                  <li>Personalized career guidance</li>
                  <li>Skill development in trending industries</li>
                  <li>Soft skills training (communication, leadership, etc.)</li>
                  <li>Access to free/subsidized courses</li>
                  <li>Internship and job opportunities</li>
                </ul>
                <p><b>Eligibility Criteria</b></p>
                <p><b>Documents Required</b></p>
                <ul>
                  <li>Class/College ID (EMIS or registration)</li>
                  <li>Aadhar card  Download from UIDAI</li>
                  <li>TN domicile proof/ Community Certificate  Apply on e-Sevai</li>
                  <li>Category certificate (SC/ST/BC/MBC, PwD)  Apply on e-Sevai</li>
                  <li>UG degree certificate (for scholarship/coaching)</li>
                </ul>
                <p><b>Application Process</b></p>
                <span><b>1.	Visit the official portal :</b> Go to naanmudhalvan.tn.gov.in and click on “Student Registration”  </span>
                <span><b>2.	Start your registration</b>
                  <ul>
                    <li>Class/College ID (EMIS or registration)</li>
                    <li>Aadhar card  Download from UIDAI</li>
                  </ul>
                </span>
                <span><b>3.	Verify via OTP :</b> You’ll receive an OTP on your mobile - Enter the OTP to authenticate and proceed.</span>
                <span><b>4.	Complete your profile : </b>
                  <ul>
                    <li>Enter background details: institution name, class/course, EMIS or college registration number.</li>
                    <li>Upload personal details and a passport-size photograph</li>
                  </ul>
                </span>
                <span><b>5.	Select skill tracks</b>
                  <ul>
                    <li>Browse available skills (AI, coding, communication, government exam prep, etc.)</li>
                    <li>Choose courses based on your interest and career goals </li>
                  </ul>
                </span>
                <span><b>6. Submit your application.</b>
                  <ul>
                    <li>You can then log in with OTP or set credentials.</li>
                    <li>Aadhar card  Download from UIDAIIn your personal dashboard, track your enrolled courses, progress, upcoming webinars, and training sessions</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </Block>
      </Page>
    </div>
  )
}

export default SchemeDescApply