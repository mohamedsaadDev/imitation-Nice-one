import React,{useEffect,useState} from 'react'
import { useTranslation } from 'react-i18next';
import aribcimg from "../../assets/header/Saudi.png"
import Englishimg from "../../assets/header/en.png"
import "./ModleLanguage.css"
const ModleLanguage = () => {
    const {i18n ,t}=useTranslation()
    const [isChecked, setIsChecked] = useState(i18n.language);
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.value);
    }
    const html = document.querySelector('html')
    const  handlelangar= () =>{
            html.dir = "rtl"
            i18n.changeLanguage("ar")
    }
    const  handlelangen= () =>{
        html.dir = "ltr"
        i18n.changeLanguage("en")
    }
    useEffect(()=>{
        if( i18n.language === "en"){
            html.dir = "ltr"
        }else{
            html.dir = "rtl"
        }
    },[])
    return (
        <div className='model-language'>
            <p>{t('language')}</p>
            <div className='d-flex align-items-center justify-content-between'>
            <label onClick={handlelangar} className='' htmlFor="ar">
                <input className='invisible' 
                value="ar" id='ar' type="radio" name="lang" 
                onChange={handleCheckboxChange}
                checked={isChecked === "ar"&& "checked"}
                />
                <span className='checkmark-fake'></span>
                <p className='my-0 mx-1'>العربية(ع)</p>
                <img src={aribcimg} alt="" />
            </label>
            <label onClick={handlelangen} htmlFor="en">
                <input className='invisible' value="en" id="en" type="radio" name="lang" 
                onChange={handleCheckboxChange}
                checked={isChecked === "en"&& "checked"}  />
                <span className='checkmark-fake'></span>
                <p className='my-0 mx-1'>English(EN)</p>
                <img src={Englishimg} alt="" />
            </label>
            </div>
        </div>
    )
}
export default React.memo(ModleLanguage)