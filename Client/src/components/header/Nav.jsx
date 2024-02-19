import { Link, useNavigate} from 'react-router-dom';
import React, {useCallback, useState } from 'react';
import makeup from "../../assets/header/imgMakeup.png"
import Perfume from "../../assets/header/imgPerfume.png"
import Care from "../../assets/header/imgCare.png"
import Gifts from "../../assets/header/imgGifts.png"
import Nails from "../../assets/header/imgNails.png"
import Lenses from "../../assets/header/imgLenses.png"
import Devices from "../../assets/header/imgDevices.png"
import HomeScents from "../../assets/header/imgHomeScents.png"
import Saudi from "../../assets/header/Saudi.png"
import arrow from "../../assets/arrow.png"
import { Button } from "react-bootstrap";
import SubDropdown from './SubDropdown';
import { useTranslation } from 'react-i18next';
import Cookie from "cookie-universal"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ModleLanguage from '../ModleLanguage/ModleLanguage';
import ModelCountry from '../../pages/ModelCountry/ModelCountry';
import NavbarMobile from "./NavbarMobile"
import logoscroll from "../../assets/header/logosctoll.png"
import Search from './Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CNav({scrolled}) {
  const [flag,setflag]=useState(Saudi) 
  const [subDropdown,setsubDropdown]= useState([])
  const [show, setShow] = useState(false);
  const isLoggedIn =JSON.parse(localStorage.getItem("isLoggedIn"));
  const Navigate =useNavigate()
  const cookie = Cookie()
  const { t } = useTranslation();
  const logout = useCallback(()=>{
    setShow(false)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userid");
    cookie.remove('cookie-user');
    toast.success(t('logoutSuccessful'),{ position: `top-${t('dir')}`});
      Navigate('/') 
  },[isLoggedIn])
  const handlearray ={returnObjects: true }
  const subdropdownmakeup =()=>setsubDropdown(t('subdropdownmakeup',handlearray))
  const subdropdownperfume =()=>setsubDropdown(t('subdropdownPerfume',handlearray))
  const subdropdownCare = ()=>setsubDropdown(t('subdropdownCare',handlearray))
  return (
    <>
      <ToastContainer/>
      <Navbar className={scrolled?'wrapper-nav-scroll p-0':"wrapper-nav p-0"} expand="lg">
      <Container className={scrolled&&'container-nav-scroll'}>
      <NavbarMobile show={show} setShow={setShow} logout={logout}/>
          <Nav className='container-nav-item m-0' >
            <div className='w-100 d-flex justify-content-between'>
              <div className='container-mian-menu'>
              <Link to='/'><img className={scrolled?'logo-nav logo-nav-scroll':'logo-nav'} src={logoscroll} alt="" /></Link>
                <Nav.Link className='nav-item-Categorie d-flex align-items-center underline-3'>
                  <i className="fa-solid fa-bars px-1"></i> {t('Categorie')}
                  <div className='wrapper-dropdown-nav'>
                        <ul className='dropdown-nav'>
                          <li onMouseEnter={subdropdownmakeup} ><img src={makeup} alt="" /><span> {t('Makeup')}</span></li>
                          <li onMouseEnter={subdropdownperfume}><img src={Perfume} alt="" /> <span>{t('Perfume')}</span></li>
                          <li onMouseEnter={subdropdownCare}><img src={Care} alt="" /> <span>{t('Care')}</span></li>
                          <li><img src={Gifts} alt="" /> <span>{t('Gifts')}</span></li>
                          <li><img src={Nails} alt="" /> <span>{t('Nails')}</span></li>
                          <li><img src={Lenses} alt="" /> <span>{t('Lenses')}</span></li>
                          <li><img src={Devices} alt="" /> <span>{t('Devices')}</span></li>
                          <li><img src={HomeScents} alt="" /> <span>{t('HomeScents')}</span></li>
                        </ul>
                        <SubDropdown subDropdown={subDropdown}/>
                    </div>
                </Nav.Link>
                <Nav.Link className='underline-3'>{t('Makeup')}</Nav.Link>
                <Nav.Link className='underline-3'>{t('Perfume')}</Nav.Link>
                <Nav.Link className='underline-3'>{t('Care')}</Nav.Link>
                <Nav.Link className='underline-3'>{t('Brands')}</Nav.Link>
              </div>
              <Search scrolled={scrolled}/>
              <ul className='m-0 p-0 d-flex align-items-center continer-nav-info'>
                  <li className='nav-item-lang underline-3'>
                    <i className="fa-solid fa-globe"></i> {t('langnav')}<img src={arrow} className='arrow-header ' alt="" />
                    <ModleLanguage /> 
                  </li>
                  <li className='nav-item-country underline-3'>
                    <img className='img-flag' src={flag} alt="" /><img src={arrow} className='arrow-header ' alt="" />
                    <ModelCountry setflag={setflag} />
                  </li>
                  <li className='nav-item-profile underline-3'>
                    <i className="fa-regular fa-user"></i>{t('Profile')}<img className='arrow-header' src={arrow} alt="" />
                    <div className='model-profile'>
                    {
                      !isLoggedIn?
                      <>
                      <Button onClick={()=>Navigate('login')} variant="dark">{t('login')}</Button>
                      <Link to="register" ><p className='mt-10 '>{t('DonotHaveAccount')}</p></Link>
                      </>
                      :<Button  className='btn-profile' onClick={()=>logout()} variant="dark">{t('logout')} <i className="fa-solid fa-right-from-bracket"></i></Button>
                      }
                    </div>
                  </li> 
                  <li className='underline-3'>
                    <i className="fa-regular fa-bell pt-1"></i>
                  </li>
                  <Link className="me-2 underline-3" to='cart'><li >
                    <i className="fa-solid fa-basket-shopping text-dark"></i>
                  </li></Link>
                    
                </ul>
            </div>
          </Nav>  
      </Container>
      </Navbar>
    </>
  );
}
export default React.memo(CNav)