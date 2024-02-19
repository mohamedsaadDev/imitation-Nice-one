import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/header/logo.svg"
import { Link} from 'react-router-dom';
import "./NavMobile.css"
import sidegloble from "../../assets/header/globle.svg"
import sidebrind from "../../assets/header/sidebrinds.svg"
import sidecall from "../../assets/header/call.svg"
import sidererurn from "../../assets/header/rerurn.svg"
import sideprivte from "../../assets/header/privte.svg"
import sidecareers from "../../assets/header/career.svg"
import imgMakeup from "../../assets/header/imgMakeup.png"
import imgPerfume from "../../assets/header/imgPerfume.png"
import imgCare from "../../assets/header/imgCare.png"
import imgGifts from "../../assets/header/imgGifts.png"
import imgNails from "../../assets/header/imgNails.png"
import imgLenses from "../../assets/header/imgLenses.png"
import imgDevices from "../../assets/header/imgDevices.png"
import imghomescnts from "../../assets/header/imgHomeScents.png"
import { useTranslation } from 'react-i18next';
import saudi from "../../assets/header/Saudi.png"
import aribcimg from "../../assets/header/Saudi.png"
import Englishimg from "../../assets/header/en.png"
const NavbarMobile = ({logout,show,setShow}) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showSubItem, setshowSubItem]=useState(false)
    const [openlang, setopenlang]=useState(false)
    const [dataSubItem, setdataSubItem]=useState([])
    const [titleitem, settitleitem]=useState("")
    const {t,i18n} =useTranslation()
    const [isChecked, setIsChecked] = useState(i18n.language);
    const handlearrayTr ={ returnObjects: true }
    const html = document.querySelector('html')
    const isLoggedIn =JSON.parse(localStorage.getItem("isLoggedIn"));
    function handleShowSubItem(data,title){
        setshowSubItem(true)
        setdataSubItem(data)
        settitleitem(title)
        setopenlang(false)
    }
    const handelopenlang = (title)=>{
        setopenlang(true)
        setshowSubItem(true)
        settitleitem(title)
    }
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.value);
    }
    const  handlelangar= () =>{
        html.dir = "rtl"
        i18n.changeLanguage("ar")
}
const  handlelangen= () =>{
    html.dir = "ltr"
    i18n.changeLanguage("en")
}
useEffect(()=>{
    if( i18n.language === "ar"){
        html.dir = "rtl"
    }else{
        html.dir = "ltr"
    }
    
},[])
    return (
        <>
        <div className='wrapper-navMobile'>
            <Button variant="transparent" onClick={handleShow} className="me-2 btn-nav-mobile"><i className="fa-solid fa-bars icon-mobile-menu"></i></Button>
            <Link to='/'><img className='logo-mobile' src={logo} alt="" /></Link>
            <Offcanvas className='container-navMobile' key={i18n.language ==="en"?"start":"end"} placement={i18n.language ==="en"?"start":"end"} show={show} onHide={handleClose} >
                <Offcanvas.Header className={showSubItem&&'d-none'} closeButton>
                <Offcanvas.Title><img className='logo-mobile-body' src={logo} alt="" /></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={showSubItem?'p-0 Offcanvas-Body-navMobile ':'p-0'}>
                {
                    showSubItem?
                    <>
                        <div className='wrapper-subitem'>
                            <button className='bg-light w-100 py-3 t-start h-auto text-dark  btn-subitem'  onClick={()=>setshowSubItem(false)}>
                                <i className="fa-solid fa-arrow-left mx-2"></i>
                                {titleitem}
                            </button>
                            <ul className='p-0 mt-2 container-subitem'>
                            {
                                openlang?
                                <>
                                <li className='continer-country-mobile'>
                                <p>{t('Country')}</p>
                                        <label  htmlFor="SaudiM">
                                        <input value="Saudi" id='SaudiM' type="radio" name="countryM" />
                                        <p>{t('SaudiArabia')} </p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                        <label  htmlFor="KuwaitM">
                                        <input value="Kuwait" id="KuwaitM" type="radio" name="countryM" />
                                        <p>{t('Kuwait')}</p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                        <label htmlFor="emiratesM">
                                        <input value="emirates" id='emiratesM' type="radio" name="countryM" />
                                        <p>{t('Unitedarabemirates')}</p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                        <label  htmlFor="BahrainM">
                                        <input value="Bahrain" id='BahrainM' type="radio"  name="countryM" />
                                        <p>{t('Bahrain')}</p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                        <label  htmlFor="OmanM">
                                        <input value="Oman" id='OmanM' type="radio" name="countryM"  />
                                        <p>{t('Oman')}</p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                        <label htmlFor="QatarM">
                                        <input value="Qatar" id='QatarM' type="radio" name="countryM"  />
                                        <p>{t('Qatar')}</p>
                                        <span className='checkmark-fake-countryM'></span>
                                        </label>
                                </li>
                                <li style={{color:"#efefef",background:"#efefef",fontSize:"6px"}}>'</li>
                                <li className='continer-sub-mobile pt-2'>
                                    <div>
                                        <p>{t('language')}</p>
                                    <label  onClick={handlelangar} className='d-flex align-items-center my-2' htmlFor="arM">
                                        <input className='invisible' value="ar" id='arM' type="radio" name="langM"
                                        onChange={handleCheckboxChange}
                                        checked={isChecked === "ar"&& "checked"} />
                                        <span className='checkmark-fakeM'></span>
                                        <img className='img-lang-mobile' src={aribcimg} alt="" />
                                        <p className='my-0 mx-1'>العربية(ع)</p>
                                    </label>
                                    <label  onClick={handlelangen} className='d-flex align-items-center my-2' htmlFor="enM">
                                        <input className='invisible' value="en" id="enM" type="radio" name="langM"
                                        onChange={handleCheckboxChange}
                                        checked={isChecked === "en"&& "checked"}/>
                                        <span className='checkmark-fakeM'></span>
                                        <img className='img-lang-mobile' src={Englishimg} alt="" />
                                        <p className='my-0 mx-1'>English(EN)</p>
                                    </label>
                                    </div>
                                </li>
                                
                                </>
                                :
                                dataSubItem.map((item,index)=>
                                <li className='item-menu-mobile' key={index}>{item}</li>
                                )
                            }
                            </ul>
                        </div>
                    </>
                    :
                    <>
                    <div>
                        <ul className='p-0'>
                            <Link to='/'><li className='item-menu-mobile'> <i className="fa-solid fa-house mx-2"></i> {t('Home')}</li></Link>
                            {
                                isLoggedIn? <li onClick={()=>logout()} className='item-menu-mobile'>{t('logout')} </li> :<>
                                <Link onClick={()=>setShow(false)} to="/login"><li className='item-menu-mobile'>{t('login')}</li></Link>
                                <Link onClick={()=>setShow(false)} to="register"><li className='item-menu-mobile'>{t('Register')}</li></Link></>
                            }
                        </ul>
                    </div>
                    <div className='wrapper-menu-mobile m-0'>
                    <section className='pt-2 m-0'>
                        <ul className='p-0 mb-0 mt-1 menu-mobile'>
                            <li 
                            onClick={()=>handleShowSubItem(t('subdropdownmakeup',handlearrayTr),t('Makeup'))} 
                            className='item-menu-mobile'>
                                <img className='w-30px mx-2' src={imgMakeup} alt="" />{t('Makeup')}
                            </li>
                            <li onClick={()=>handleShowSubItem(t('subdropdownPerfume',handlearrayTr),t('Perfume'))} className='item-menu-mobile'><img className='w-30px mx-2' src={imgPerfume} alt="" />{t('Perfume')}</li>
                            <li onClick={()=>handleShowSubItem(t('subdropdownCare',handlearrayTr),t('Gifts'))} className='item-menu-mobile'><img className='w-30px mx-2' src={imgCare} alt="" />{t('Care')}</li>
                            <li className='item-menu-mobile'><img className='w-30px mx-2' src={imgGifts} alt="" />{t('Gifts')}</li>
                            <li className='item-menu-mobile'><img className='w-30px mx-2' src={imgNails} alt="" />{t('Nails')}</li>
                            <li className='item-menu-mobile'><img className='w-30px mx-2' src={imgLenses} alt="" />{t('Lenses')}</li>
                            <li className='item-menu-mobile'><img className='w-30px mx-2' src={imgDevices} alt="" />{t('Devices')}</li>
                            <li className='item-menu-mobile'><img className='w-30px mx-2' src={imghomescnts} alt="" />{t('HomeScents')}</li>
                        </ul>
                    </section>
                    <section className='pt-2 m-0'>
                        <ul className='p-0 mt-1 mb-0 menu-mobile-info'>
                            <li className='item-menu-mobile'><img src={sidegloble} className='mx-2' alt="" /> {t('Brands')}</li>
                            <li onClick={()=>handelopenlang(t('CountryandLanguage'))} className='item-menu-mobile w-100 d-flex justify-content-between align-items-center'><div><img src={sidebrind} className='mx-2' alt="" /> {t('CountryandLanguage')}</div> <img className='w-30px' src={i18n.language==="ar" ? saudi : Englishimg} alt="" /> </li>
                            <li className='item-menu-mobile'><img src={sidecall} className='mx-2' alt="" />{t('CustomerService')}</li>
                            <li className='item-menu-mobile'><img src={sidererurn} className='mx-2' alt="" />{t('Returnandrefundpolice')}</li>
                            <li className='item-menu-mobile'><img src={sideprivte} className='mx-2' alt="" />{t('Privacy')}</li>
                            <li className='item-menu-mobile'><img src={sidecareers} className='mx-2' alt="" />{t('Careers')}</li>
                        </ul>
                    </section>
                </div>
                    </>
                }
            </Offcanvas.Body>
            </Offcanvas>
        </div>
        </>
    )
}
export default React.memo(NavbarMobile)