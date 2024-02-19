import React,{useState,useEffect} from 'react'
import logo from "../../assets/header/logo.svg"
import imgExperience from "../../assets/header/285b093.svg"
import CNav from './Nav'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import "./Header.css"
const Header = ()=> {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [search,setsearch]=useState("")
    const { products} =useSelector((state)=>state.products)
    let datasearch = products.filter(a=>a.title.includes(search)).slice(0,5)
        useEffect(()=>{
            window.addEventListener('scroll', ()=>{
            const offset = window.scrollY;
            if (offset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
            });
        },[])
    return (
        <>
        <header >
            <div className='top-header' >
                <Link to="/"><img className='img-logo' src={logo} alt="" /></Link>
                <div className="continer-box-search-header">
                    <input onChange={(e)=>setsearch(e.target.value)} className='search-input-header' type="search" placeholder={t('placeholdersearch')}  />
                    <div className='box-search-header'>
                        {
                            datasearch.map((item)=><Link key={item._id} to={`/product/${item._id}`}>{i18n.language === "en" ? item.title : item.title_ar}</Link>)
                        }
                    </div>
                </div>
                <section>
                    <img src={imgExperience} alt="" />
                    <p className='Pragraph-header' >{t('ExperienceHeader')}</p>
                </section>
            </div>
        </header>
        <CNav scrolled={scrolled} />
        </>
    )
}
export default Header