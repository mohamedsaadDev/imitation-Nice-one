import React from 'react'
import "./Order.css"
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap'
import WithGuard from '../../util/WithGuard';
import { useSelector,useDispatch } from 'react-redux';
import { cartaction } from '../../Redux/slice/cartSlice'
import { API_KEY } from '../../LocaleVarbile';
import { toast } from 'react-toastify';
const Order = () => {
    const { cartitems} = useSelector((state) => state.cart);
    const { t } = useTranslation();
    const dispathch = useDispatch()
    const extractedData = cartitems.map((item)=>{
        return {
            id: item._id,
            img: item.img1,
            price: item.price,
            type: item.Type,
            quantity:item.quantity
        }
    })
    const userids =localStorage.getItem("userid");
    const order = {id:userids,items:extractedData}
    const handleSendOrder = ()=>{
        dispathch(cartaction.removecart())
        localStorage.removeItem("cartItems")
    }
    const sendOrder =async()=>{
        try{
        const res = await fetch(`${API_KEY||"http://localhost:5000"}/api/orders`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(order)
        })
        if (!res.ok) {
            toast.error(t('failedtosendorder'), { position: `top-${t('dir')}`});
            throw new Error(`Failed to send order. Status: ${res.status}`);
        }
            const data = await res.json()
            handleSendOrder()
            toast.success(t('successfulorder'), { position: `top-${t('dir')}`});
        }catch(err){
            console.log(err)
        }
}
    return (
        <>
            <div className='d-flex justify-content-center '>
            <div className='continer-order p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>{t('Homedelivery')}</h6>
                    <i className="fa-solid fa-truck icon-order  "></i>
                </div>
                <div className='container-product '>
                    <div>
                        <p className='Shippingperiod my-1'>{t('DeliverybetweenDecember10thandDecember11th')}</p>
                        {
                        cartitems.length ===0 ? <p className='text-period-orders'>{t('Noitems')}</p>:
                        cartitems.map((item)=>
                        <div key={item._id} className='d-flex py-2 container-info'>
                            <img className='img-order' src={`${API_KEY+item.img1}`} alt="" />
                            <div className='px-2' >
                                <p className='m-0 titleproduct-order'>{item.title}</p>
                                <span className='m-0' >{t('Quantity')} {item.quantity}</span>
                            </div>
                        </div>
                        )
                        }
                    </div>
                        <Button onClick={()=>sendOrder()} variant="dark" className='btn-orders mt-2'>{t('Confirmation')}</Button>
                </div>
            </div>
        </div>
        </>
    )
}
export default WithGuard(Order)
