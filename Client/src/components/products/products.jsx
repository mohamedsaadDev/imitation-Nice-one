import React, { useMemo, useState } from 'react'
import Product from '../Product/Product'
import CBreadcrumb from '../Breadcrumb/Breadcrumb'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'    
import "./products.css"
import NotFound from '../../pages/NotFound/NotFound'
import { useTranslation } from 'react-i18next'
import { changelanguge } from '../../Func/changelanguge'
const Products = ({type}) => {
    const {i18n} = useTranslation()
    const {products}=useSelector((state)=>state.products)
    const productType =useMemo(()=>{return changelanguge(products.filter(product => product.type === type),i18n)},[i18n.language])
    const [prodectfilter,setprodectfilter] =useState([])
    return (
        <>
        {
            productType.length !==0? 
            <>
            <CBreadcrumb type={productType[0].type}/>
            <div style={{background:"#f4f4f4"}}>
                <div className='wrapper-products'>
                    <Sidebar setprodectfilter={setprodectfilter} prodectfilter={prodectfilter} data={productType}/>
                    <div>
                    <h4 className='mx-3 fw-bold' >{productType[0].type}</h4>
                        <div className='continer-products'>
                        {
                            prodectfilter.map((proudct,index)=>
                            <div key={index} className="wrapper-product">
                                <Product data={proudct}/>
                            </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
            </>:<NotFound/>
            }
        </>
    )
}
export default React.memo(Products)