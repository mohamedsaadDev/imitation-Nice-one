import React from 'react'
import "./Order.css"
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap'
import WithGuard from '../../util/WithGuard';
import { useSelector,useDispatch } from 'react-redux';
import { cartaction } from '../../Redux/slice/cartSlice'
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
        const res = await fetch('https://tradition-nice-one-api.vercel.app/api/orders/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(order)
        })
            const data = await res.json()
            handleSendOrder()
            console.log(data)
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
                            <img crossOrigin='anonymous' className='img-order' src={`https://tradition-nice-one-api.vercel.app/${item.img1}`} alt="" />
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
