import React from 'react'
import { useTranslation } from 'react-i18next';
import "./aboutus.css"
const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <section className='aboutus'>
            <div >
                <h5 className='m-0'>{t('Doyouneedhelp')}</h5>
                <p className='m-0 '>{t('Youcangethelp')}</p>
            </div>
            <div className='d-flex align-items-center'>
                <span><i className="fa-solid fa-exclamation icon-aboutus"></i></span>
                <div>
                    <h6>{t('HelpingCenter')}</h6>
                    <a href="/">help.niceonesa.com</a>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <i className="fa-solid fa-envelope icon-aboutus"></i>
                <div>
                    <h6>{t('Emailfooter')}</h6>
                    <a href="/">cs@niceonesa.com</a>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                    <i className="fa-solid fa-phone icon-aboutus"></i>
                <div>
                    <h6>{t('DirectCall')}</h6>
                    <a href="/">+966 92 003 3385</a>
                </div>
            </div>
        </section>
    )
}
export default AboutUs