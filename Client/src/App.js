import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/products/products';
import Singleproduct from './pages/Singleproduct/Singleproduct';
import Order from './pages/Order/Order';
import React, { useEffect } from 'react';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import { getProducts } from './Redux/slice/prodectSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
const Headerlazy = React.lazy(()=>import('./components/header/Header'))
const Mainlazy = React.lazy(()=>import('./pages/main/Main'))
const Footerlazy = React.lazy(()=>import('./components/Footer/Footer'))
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <React.Suspense>
    <Headerlazy/>
    </React.Suspense>
      <Routes>
          <Route path='/' element={<React.Suspense><Mainlazy/></React.Suspense>}>
            <Route path='cart'element={<Cart/>} />
            <Route path='login'element={<Login switchform={true} />} />
            <Route path='register'element={<Login switchform={false} />} />
          </Route>
          <Route path='/care' element={<Products type={"Care"}/>}/> 
          <Route path='/makeup' element={<Products type={"Makeup"}/>}/> 
          <Route path='/devices' element={<Products type={"Devices"}/>}/>
          <Route path='/product/:id' element={<Singleproduct/>}/>
          <Route path='/Orders' element={<Order/>}/>
      </Routes>
      <React.Suspense>
        <Footerlazy/>
      </React.Suspense>
    </BrowserRouter>
    </>
  );
}
export default App;
