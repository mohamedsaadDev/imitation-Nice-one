import React, { useState,useEffect } from 'react'
import "./Singleproduct.css"
import CBreadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { Link} from 'react-router-dom'
import Rating from '../../components/Rating/Rating'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartaction } from '../../Redux/slice/cartSlice'
import NotFound from '../NotFound/NotFound'
const Singleproduct = () => {
    const {t,i18n}= useTranslation()
    const {id} = useParams()
    const dispatch =useDispatch()
    const { products} = useSelector((state) => state.products);
    const [product,setproduct]=useState(null)
    const [img,setimg]=useState(product?product.img1:null)
    useEffect(()=>{
        const foundProduct = products.find(p => p._id === id)
        if (foundProduct !== undefined) {
            const products = i18n.language ==="en"? foundProduct:{
                "_id": foundProduct._id,
                "title":foundProduct.title_ar,
                "type":foundProduct.type,
                "img1":foundProduct.img1,
                "img2":foundProduct.img2,
                "img3":foundProduct.img3,
                "imgbrind":foundProduct.imgbrind,   
                "price":foundProduct.price,
                "discount":foundProduct.discount,
                "oldprice":foundProduct.oldprice,
                "brindname":foundProduct.brindname_ar,
                "brandstatus":foundProduct.brandstatus_ar,
                "reviews":foundProduct.reviews,
                "reating":foundProduct.reating,
                "mostpopular":foundProduct.mostpopular_ar,
                "new":foundProduct.new_ar,
                "trending":foundProduct.trending_ar,
                "bestseller":foundProduct.bestseller_ar,
                "taxStatus":foundProduct.taxStatus_ar,
                "returnPolicy":foundProduct.returnPolicy_ar,}
                setproduct(products)
                setimg(foundProduct.img1)
        }
        
    },[id,products])
    console.log('product show ',product)
    return (
        <>
        {
            product? 
            <>
            <CBreadcrumb title={product.title} type={product.type}/>
            <div className='continer-singleproduct'>
                <div className='d-flex continer-img-singleproduct'>
                    <img crossOrigin='anonymous' className='mainimg-singleproduct' src={`https://tradition-nice-one-api.vercel.app/${img}`} alt="" />
                    <div className='continer-subimg-singleproduct'>
                        <img crossOrigin='anonymous' className='subimg-singleproduct'onClick={()=>setimg(product.img1)} src={`https://tradition-nice-one-api.vercel.app/${product.img1}`} alt="" />
                        <img crossOrigin='anonymous' className='subimg-singleproduct'onClick={()=>setimg(product.img2)} src={`https://tradition-nice-one-api.vercel.app/${product.img2}`} alt="" />
                        <img crossOrigin='anonymous' className='subimg-singleproduct'onClick={()=>setimg(product.img3)} src={`https://tradition-nice-one-api.vercel.app/${product.img3}`} alt="" />
                    </div>
                </div>
                <div className='container-info-singleprodect '>
                    <div className='d-flex'>
                        <img className='imgbrand-singleproduct' src={`https://tradition-nice-one-api.vercel.app/${product.imgbrind}`} alt="" />
                        <div>   
                            <p className='m-0 original-singleproduct'>{product.brandstatus}</p>
                            <p className='m-0'>{t('clickhereformoreof')} <Link to={`/${product.type}`} className='type-singleproduct'> {product.Type} </Link></p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-4 continer-ratin-singleproduct'>
                        <div className='d-flex'>
                            <p >{product.reating}</p>
                            <Rating rating={product.reating}/>
                            <p>{product.reviews}</p>
                        </div>
                        <i className="fa-regular fa-heart iconheart-singleproduct"></i>
                    </div>
                    <p className='title-singleproduct'>{product.title}</p>
                    <section>
                        <del className='d-block oldprice-singleproduct'> {t('SAR')} {product.oldprice}</del>
                        <p className='d-inline price-singleproduct'>{t('SAR')} {product.price}</p>
                        <p className='d-inline mx-5 mb-5 Discount-singleproduct'>-{product.discount}%</p>
                        <span className='TaxStatus'>{product.taxStatus}</span>
                    </section>
                    <p className='details-singleproduct'>{product.returnPolicy}</p>
                    <Button onClick={()=>dispatch(cartaction.addtocart(product))} variant="dark" className='btn-singleproduct'>{t('Addtobag')}</Button>
                </div>
            </div>
        </> 
            :
            <NotFound/>
        }
        </>
    )
}
export default Singleproduct
