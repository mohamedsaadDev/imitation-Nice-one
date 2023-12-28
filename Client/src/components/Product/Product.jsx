import React from 'react'
import { Button } from 'react-bootstrap'
import "./product.css"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useDispatch} from 'react-redux';
import { cartaction } from '../../Redux/slice/cartSlice'
const Product = ({data}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    return (
        <div className='container-produect'>
            <Link to={`/product/${data._id}`}>
            <div className='position-relative'>
                <img className='w-100' src={`https://tradition-nice-one-api.vercel.app/${data.img1}`} alt='' />
                <span className='badg-productslide ornge'>{data.bestseller}</span>
                <span className='badg-productslide'>{data.trending}</span>
                <span className='badg-productslide'>{data.mostpopular}</span>
                <span className='badg-new-productslide'>{data.new}</span>
            </div>
            <div className='container-infoproduct'>
                <h5 className="brand-product mb-1">{data.brindname}</h5>  
                <h4 className='title-product'>{data.title}</h4>
                <p className='reating-product mb-0'>
                    {data.reating}<i className="fa-solid fa-star"></i> 
                    <span>( {data.reviews} )</span>
                </p>
                <del>{t('SAR')} {data.oldprice}</del>   
                <div className='price-product d-flex'>
                    <span> {t('SAR')} {data.price} </span>
                    <span>-{data.discount}%</span>
                </div>
            </div>
            </Link>
            <Button onClick={()=>dispatch(cartaction.addtocart(data))} className='btn-addBage'>{t('Addtobag')}<i className="fa-solid fa-plus"></i></Button>
        </div>
    )
}
export default Product
