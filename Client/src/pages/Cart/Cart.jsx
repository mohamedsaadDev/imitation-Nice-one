import React from 'react'
;
import Offcanvas from 'react-bootstrap/Offcanvas';
import sharimg from "../../assets/shar.svg"
import emptyimg from "../../assets/emptyimg.svg"
import "./Cart.css"
import Product from '../../components/Product/Product';
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { cartaction } from '../../Redux/slice/cartSlice'
import { useNavigate } from 'react-router-dom';
import { changelanguge } from '../../Func/changelanguge';
const Cart = () => {
    const { t,i18n } = useTranslation();
    const { cartitems} = useSelector((state) => state.cart);
    const {products}=useSelector((state)=>state.products)
    const firstfourElements = changelanguge(products.slice(3,9),i18n)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const isLoggedIn =JSON.parse(localStorage.getItem("isLoggedIn"));
    const handleopenlogin=()=> {
        isLoggedIn?Navigate("/Orders"):Navigate("/login")
    }
    //onHide={Navigate("/")}
    return (
        <Offcanvas className="offcanvas-cart" key={i18n.language ==="en"?"end":"start"} placement={i18n.language ==="en"?"end":"start"} show={true} onHide={()=>Navigate("/")} >
            <Offcanvas.Header onClick={()=>Navigate("/")} closeButton>
                <img src={sharimg} alt="" className='share-cart' />
                <Offcanvas.Title className='d-flex align-items-center justify-content-around'> {t('Shoppingbag')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='offcanvas-body-cart'>
                {
                    cartitems.length?
                    <div>
                    {
                        cartitems.map((item,index)=>
                        <div key={index} className='product-cart my-2'>
                            <img className='img-product-cart' src={`https://tradition-nice-one-api.vercel.app/${item.img1}`} crossOrigin="anonymous" alt="" />
                            <div className='info-product-cart px-3'>
                                <div className='d-flex justify-content-around  '>
                                    <h6>{item.title}</h6>
                                    <i onClick={()=>dispatch(cartaction.removeitem(item._id))} className="fa-solid fa-trash-can icon-trash-cart"></i>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <del>{t('SAR')} {item.oldprice}</del>
                                        <p className='price-product-cart'>{t('SAR')} {item.price}</p>
                                    </div>
                                    <div className='d-flex align-items-center continer-btn-productcart p-0'>
                                        <button onClick={()=>dispatch(cartaction.addtocart(item))} className='btn-productcart m-0 col'>+</button>
                                        <span className='m-0 col'>{item.quantity}</span>
                                        <button onClick={()=>dispatch(cartaction.decrease(item))} className='btn-productcart m-0 col'>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>:
                <div className='text-center'>
                    <img className='img-emptycart' src={emptyimg} alt="" />
                    <p className='textone-emptycart'>{t('Shoppingbagisempty')}</p>
                    <span className='texttow-emptycart'>{t('Addsomeproductstothecart')}</span>
                </div>
                }
                <h5 className='title-midle-cart my-4'>{t('Shopthelatestproducts')}</h5>
                <div className='wrapper-product-cart'>
                    {firstfourElements.map((productone) =>
                    <div key={productone._id} className='container-produectcart'>
                        <Product data={productone}/>
                    </div>
                    )}  
                </div>
                {cartitems.length?
                <Button onClick={handleopenlogin} variant="dark" className='btn-cart'>{t('ConfirmOrder')} </Button>:
                <Button variant="dark" className='btn-cart'>{t('Shopnow')} </Button>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default React.memo(Cart)
