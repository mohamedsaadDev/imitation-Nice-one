import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API_KEY } from '../../LocaleVarbile';
import Cookie from "cookie-universal"
const Registers = ()=> {
  const cookie = Cookie()
  const { t } = useTranslation();
  const registersSchema =Yup.object().shape({
    firstName: Yup
      .string()
      .min(3, t('Thenameisshort'))
      .max(10, t('Thenameislong'))
      .required(t('Required')),
      LastName: Yup.string()
      .min(3, t('Thenameisshort'))
      .max(10, t('Thenameislong'))
      .required(t('Required')),
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
  const navigate = useNavigate()
        const formik = useFormik({
          initialValues:{
            firstName: '',
            LastName: '',
            email: '',
            password: ''
          },
          validationSchema:registersSchema,
          onSubmit:async(values) => {
            try{
              const res = await fetch(`${API_KEY || "http://localhost:5000"}/api/users/register`,{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(values)
            })
            const data = await res.json()
            if (!res.ok) {
              toast.error(t('registrationfailed'),{ position: `top-${t('dir')}`})
              throw new Error(data);
            }
            toast.success(t('registrationSuccessful'),{ position: `top-${t('dir')}`})
            const tokenhash = btoa(data.data.token)
            cookie.set('cookie-user', tokenhash)
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userid", data.data._id);
            setTimeout(() => {
              navigate('/')
            }, 1000);
            }catch(err){
              console.log('error register ',err)
            }
            
          }
        })
    return (
        <>
        <ToastContainer/>
        <div>
          <h5 className='address-Registers'>{t('Createandaccount')}</h5>
          <form className='continer-form-Registers' onSubmit={formik.handleSubmit}>
            <div>
              <input
              type="text"
              className="form-control input-form border-input"
              id="firstName"
              placeholder={t("firstName")}
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
            </div>
            
              {formik.touched.firstName && 
              formik.errors.firstName?
              <div id="username-error" className="alert alert-danger">{formik.errors.firstName}</div>
              :null}
            <div >
              <input
              type="text"
              className="form-control input-form border-input"
              id="lastname"
              placeholder={t("LastName")}
              name='LastName'
              value={formik.values.LastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.LastName && 
              formik.errors.LastName?
              <div id="username-error" className="alert alert-danger">{formik.errors.LastName}</div>
              :null}
            <div>
              <input
              type="text"
              className="form-control input-form border-input"
              id="email"
              placeholder={t('email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='email'
              />
            </div>
            {formik.touched.email && 
              formik.errors.email?
              <div id="username-error" className="alert alert-danger">{formik.errors.email}</div>
              :null}
            <div >
              <input
              type="password"
              className="form-control input-form"
              id="password"
              placeholder={t('Password')}
              value={formik.values.password}
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              />
            </div>
            {formik.touched.password && 
              formik.errors.password?
              <div id="username-error" className="alert alert-danger">{formik.errors.password}</div>
              :null}
            <p className='bg-light'>{t('Byregisteringyouacceptour')} <span className='privacy-terms-Registers'>{t('termsandconditions')}</span></p>
            <button type="submit" className="btn btn-submitform">{t('Register')} </button>
          </form>
        </div>
        </>
    )
}
export default Registers
