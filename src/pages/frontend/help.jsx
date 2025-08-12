import React from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  AccordionContent,
} from 'framework7-react';
import helpImg from '../../assets/images/faq.png';

const HelpPageRevamp = ({ language_data }) => {


  return (
    <>
      <div>
        <div className="grid grid-cols-1 large-grid-cols-1 helpPageHead">
          <h3> {language_data.faqHead} </h3>
          <span> {language_data.faqSubHead} </span>
        </div>
        <div className="grid grid-cols-1 large-grid-cols-2 pad5">
          <div>
            <div className='help_img'>
              <img src={helpImg} alt='aboutUsImg' />
            </div>
          </div>
          <div className='help_content'>
            <List strong outlineIos dividersIos insetMd accordionList>
              <ListItem accordionItem title={language_data.faqQ1} className='accordion-item-opened'>
                <AccordionContent>
                  <Block>
                    <p>
                      {language_data.faqA1}
                    </p>
                  </Block>
                </AccordionContent>
              </ListItem>
              <ListItem accordionItem title={language_data.faqQ2}>
                <AccordionContent>
                  <Block>
                    <p>
                      {language_data.faqA2}
                    </p>
                  </Block>
                </AccordionContent>
              </ListItem>
              <ListItem accordionItem title={language_data.faqQ3}>
                <AccordionContent>
                  <Block>
                    <p>
                      {language_data.faqA3}
                    </p>
                  </Block>
                </AccordionContent>
              </ListItem>
              <ListItem accordionItem title={language_data.faqQ4}>
                <AccordionContent>
                  <Block>
                    <p>
                      {language_data.faqA4}
                    </p>
                  </Block>
                </AccordionContent>
              </ListItem>
              <ListItem accordionItem title={language_data.faqQ5}>
                <AccordionContent>
                  <Block>
                    <p>
                      {language_data.faqA5}
                    </p>
                  </Block>
                </AccordionContent>
              </ListItem>
            </List>
          </div>
        </div>
        <div className="grid grid-cols-1 large-grid-cols-2 stillGotQ">
          <div className='still_content'>
            <h3> {language_data.stillGotQ} </h3>
            <p> {language_data.stillGotQsub1} </p>
            <p> {language_data.stillGotQsub2} </p>
            <a className='contactUs'> {language_data.stillGotQCta} </a>
          </div>
          {/* <div className='still_content_right'>
            <span>குறள் (386)</span>
            <p>காட்சிக்கு எளியன் கடுஞ்சொல்லன் அல்லல்நீ</p>
            <p>மீக்கூறும் மன்னன் நிலம்.</p>
            <p>- திருவள்ளுவர்</p>
          </div> */}
        </div>
      </div>
    </>
  );
};
export { HelpPageRevamp };