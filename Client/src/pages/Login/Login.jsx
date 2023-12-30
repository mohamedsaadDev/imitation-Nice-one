import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Registers from '../Register/Register.jsx';
import { useDispatch} from 'react-redux';
import {loginUser } from '../../Redux/slice/authSlice.js';
import { useTranslation } from 'react-i18next';
import "./Login.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
const Login = ({switchform}) => {
    const { t, i18n } = useTranslation();
    const loginSchema =Yup.object().shape({
        email: Yup
        .string()
        .min(8, t('Theemailisshort') )
        .max(40, t('Theemailislong'))
        .email(t('Enteravalidemailaddress'))
        .required(t('EmailisRequired')),
        password: Yup
        .string()
        .min(8, t('Thepasswordisshort'))
        .max(25, t('Thepasswordislong'))
        .required(t('passwordisRequired')),
    });
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema:loginSchema,
        onSubmit:(values) => {
            try{
                dispatch(loginUser(values));
                navigate('/')
            }catch(err){
                console.log(err);
            }
        }
    })
    return (
        <Offcanvas className="offcanvas-form" key={i18n.language ==="en"?"end":"start"} placement={i18n.language ==="en"?"end":"start"} show={true} onHide={()=>navigate('/')}>
            <Offcanvas.Header onClick={()=>navigate('/')} closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body >
                {switchform?  
                <div >
                    <h4>{t('Welcomebackagain')}</h4>
                    <p className='my-3 mb-4'>{t('Loginusingyouremail')}</p>
                    <form className='contianer-form' onSubmit={formik.handleSubmit}>
                        <div >
                            <input
                            type="email"
                            className="form-control input-form border-input"
                            id="email"
                            placeholder={t('email')}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && 
                        formik.errors.email?
                        <div id="username-error" className="alert alert-danger">{formik.errors.email}</div>
                        :null}
                        <div className="">
                            <input
                            type="password"
                            className="form-control input-form "
                            id="password"
                            placeholder={t('Password')}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password && 
                        formik.errors.password?
                        <div id="username-error" className="alert alert-danger">{formik.errors.password}</div>
                        :null}
                        <button type="submit" className="btn btn-submitform">{t('login')}</button>
                    </form>
                </div>
                :<Registers/>
                } 
                {
                    switchform? <button className='btn-changing-form text-dark' onClick={()=>navigate('/register')}><i className="fa-solid fa-user mx-2"></i>{t('Register')}</button>:
                    <button className='btn-changing-form text-dark' onClick={()=>navigate('/login')}><i className='fa fa-sign-in mx-2'></i>{t('LoginWithEmail')}</button>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default React.memo(Login)