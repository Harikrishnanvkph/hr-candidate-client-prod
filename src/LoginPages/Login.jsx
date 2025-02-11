import { useNavigate } from "react-router-dom";
import "./Login.css"
import AdbIcon from '@mui/icons-material/Adb';
import { getUserDetail, login, getUserId } from "../API";
import { useDispatch } from "react-redux";
import { addUser, setSecret, setUserId } from "../ReduxStore/Slicer";
import { Bounce, ToastContainer,toast } from "react-toastify";
import {useEffect, useState} from "react";


export default function Login(){
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const successToast = (message)=>{
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const errorToast = (message)=>{
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const onLoginClick = async(userData) => {
        try{
            setIsLoading(true);
            const getLoginBack= await login(userData);
            setIsLoading(false);
            if(getLoginBack == null || getLoginBack == ""){
                errorToast('Not Registered Yet, Please Register to login')
            }else if(getLoginBack == '200'){
                const user = await getUserDetail(userData.mail);
                const getUser = await getUserId(userData.mail);
                dispatch(setUserId(getUser))
                dispatch(addUser(user));
                dispatch(setSecret(userData.password))
                successToast('Login Successful! Preparing User...')
                setTimeout(()=>{
                    navigate("/js"); //,{replace : true}
                },2000)
            }else if(getLoginBack == '409'){
                errorToast("Invalid user credentials");
            }else{
                errorToast("something occured");
            }
        }catch(error){
            setIsLoading(false);
            errorToast('Login ERROR!!!')
        }
    }

    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"}>
            <div id='loader-log'></div>
            <p id='loader-p'>Initial Loading will take time on this Free Server</p>
        </div>
        <div className="container-fluid ">
            <div className="row login-screen d-flex justify-content-center align-items-center p-xl-5 vh-100">
                <div className="row p-3 w-100 login-row d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <div className='d-md-none mb-md-3 mb-2 d-flex justify-content-md-end justify-content-sm-center justify-content-center align-items-center'>
                        <AdbIcon className='mx-1 nav-logo' fontSize='large' />
                        <h5 className='m-0'>Hari HR Recruit App</h5>
                    </div>
                    <div className="p-3 col-md-6 d-flex align-items-center flex-column login-form">
                        <div className='mb-md-3 mb-2 d-md-flex d-none justify-content-md-end justify-content-sm-center justify-content-center align-items-center'>
                            <AdbIcon className='mx-1 nav-logo' fontSize='large' />
                            <h5 className='m-0'>Hari HR Recruit App</h5>
                        </div>
                        <form className="d-flex flex-column w-100 form" onSubmit={(event)=>{
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            onLoginClick(Object.fromEntries(formData.entries()));
                        }}>
                            <label htmlFor="mail" className="pricing-highlighter">Registered Mail ID :</label>
                            <input type="email" id="mail" required name="mail" className="login-input p-2 mb-2" />
                            <label htmlFor="pwd" className="pricing-highlighter">Password :</label>
                            <input type="password" id="pwd" required name="password" className="login-input p-2 mb-2" />
                            <button type="submit" className="my-3 p-2 login-button ">Login</button>
                            <p className="m-0 pricing-highlighter">Not a Registered User? <span className="">Sign Up to Register!</span></p>
                            <button type="button" className="my-3 p-2 login-button" onClick={()=>navigate("/signup")}>Sign Up</button>
                        </form>
                    </div>
                    <div className="login-div-image col-md-6 py-xl-4 d-flex align-items-center justify-content-center">
                        <picture>
                            <source media="(max-width: 1400px) and (min-width : 1200px)" srcSet="loginHrMd.jpg" />
                            <source media="(max-width: 1199px) and (min-width : 992px)" srcSet="loginHrSm.jpg" />
                            <img src="loginHr.jpg" alt="Attracting Job Seekers" className="login-image" />
                        </picture>
                    </div>

                </div>
            </div>
        </div>
        <ToastContainer style={{zIndex : "999"}} />
    </>
}
