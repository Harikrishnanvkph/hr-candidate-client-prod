import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import AdbIcon from '@mui/icons-material/Adb';
import {createConversation, register} from "../API";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function Register(){
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onRegisterClick = async (userData) => {
        try {
            setIsLoading(true);
            const getLoginBack = await register(userData);
            console.log(userData)
            setIsLoading(false);
            if (Number(getLoginBack.status)  === 409) {
                toast.error('User already exists, please login!', {
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
            } else if (Number(getLoginBack.status) === 200) {
                await createConversation({
                    uuid : getLoginBack.uuid,
                    mail : userData.mail,
                    name : userData.firstName
                },{
                    uuid : 52046188,
                    mail : 'harshavnithkin53@gmail.com',
                    name : 'Helpdesk'
                })
                toast.success('Registration Successful!', {
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
                setTimeout(()=>{
                    navigate("/login");
                },3000)
            } else if(Number(getLoginBack.status) === 400) {
                toast.error('Unexpected registration error. Please try again.', {
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
            } else {
                console.log("An unknown error occurred.");
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during registration:", error);
            toast.error('An error occurred. Please try again later.', {
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
    }
    
    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"}>
            <div id='loader-log'></div>
            <p id='loader-p'>Initial Loading will take time on this Free Server</p>
        </div>
        <div className="container-fluid">
            <div className="row  login-screen d-flex justify-content-center align-items-center p-xl-5 vh-100">
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
                        <form method="post" className="d-flex flex-column w-100 form" onSubmit={(event)=>{
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            onRegisterClick(Object.fromEntries(formData.entries()));
                        }}>
                            <div className="row d-flex">
                                <div className="col-lg-6 col-12 d-flex flex-column">
                                    <label htmlFor="first-name" className="pricing-highlighter">First Name :</label>
                                    <input type="text" required id="first-name" name="firstName" className="login-first-name p-2 mb-2" />
                                </div>
                                <div className="col-lg-6 col-12 d-flex flex-column">
                                    <label htmlFor="last-name" className="pricing-highlighter">Last Name :</label>
                                    <input type="text" required id="last-name" name="lastName" className="login-last-name p-2 mb-2" />
                                </div>
                            </div>
                            <label htmlFor="mail" className="pricing-highlighter">Your Mail Address :</label>
                            <input type="email" required id="mail" name="mail" className="login-input p-2 mb-2" />
                            <label htmlFor="pwd" className="pricing-highlighter">Password :</label>
                            <input type="password" required id="pwd" name="password" className="login-input p-2 mb-2" />
                            <Link className="mt-2 pricing-highlighter" to="#">Terms and Conditions</Link>
                            <button type="submit" className="my-3 p-2 login-button ">Register</button>
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
        <ToastContainer style={{zIndex : "999"}}/>
    </>
}
