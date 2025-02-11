import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

export default function Footer(){
    return<>
        <div className="footer h-100 px-sm-5 py-sm-2 p-3 d-flex flex-column justify-content-evenly">
            <div className="about-us d-flex flex-column justify-content-center align-items-center">
                <p className="mb-2"><b className="pricing-highlighter">About Us</b></p>
                <p className='text-center'>We are Industry Leading SAAS provider with Clients all across the Globe. We are expanding globally and headquatered at Coimbatore, TamilNadu</p>
            </div>
            <div className='d-flex mt-3 flex-sm-row flex-column align-items-center justify-content-between'>
                <div className='d-flex justify-content-start align-items-center m-sm-0 m-2'>
                    <AdbIcon className='mx-1 nav-logo' fontSize='small' />
                    <h6 className='m-0'>Hari HR Recruit App</h6>
                </div>
                <ul className='footer-ul d-flex justify-content-evenly'>
                    <li className='mx-sm-2 mx-md-3 mx-lg-4 p-md-auto p-sm-0'><a href="#services">Services</a></li>
                    <li className='mx-sm-2 mx-md-3 mx-lg-4 p-md-auto p-sm-0'><a href="#pricing">Pricing</a></li>
                    <li className='mx-sm-2 mx-md-3 mx-lg-4 p-md-auto p-sm-0'><Link className="nav-link" to="/login">Login</Link></li>
                    <li className='mx-sm-2 mx-md-3 mx-lg-4 p-md-auto p-sm-0'><Link className="nav-link" to="/signup">Sign Up</Link></li>
                </ul>
            </div>
            <p className='footer-cpy text-center m-2 mt-4'>All Rights Reserved ©2024</p>
        </div>
    </>
}