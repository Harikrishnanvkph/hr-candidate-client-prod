import AdbIcon from '@mui/icons-material/Adb';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export default function NavHome(){
   const [expand,setExpand] = useState(false);

   const isExpand = ()=>{
      setExpand(!expand);
   }

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 576) {
            setExpand(false);
         }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return <>
      <div className='container-fluid nav-expand'>
         <div className={`row nav-expand-open p-3 ${expand ? "d-none" : "d-flex align-items-center"}`}>
            <div className='col-xl-7 col-md-8 col-10 d-flex justify-content-md-end justify-content-sm-center justify-content-center align-items-center'>
                  <AdbIcon className='mx-1 nav-logo' fontSize='large' />
                  <h5 className='m-0'>Hari HR Recruit App</h5>
            </div>
            <div className='col-xl-5 p-0 col-md-4 col-2 d-none d-md-flex justify-content-end'>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">SignUp</Link>
            </div>
            <div className="col-2 expand-open d-md-none d-flex justify-content-center" onClick={isExpand}><DehazeIcon fontSize='large' /></div>
         </div>
         <div className={`expand-over ${expand ? 'd-flex flex-column' : 'd-none'}`}>
            <div className='row p-3'>
               <div className='col-xl-7 col-md-8 col-10 d-flex justify-content-md-end justify-content-sm-center justify-content-center align-items-center'>
                     <AdbIcon className='mx-1 nav-logo' fontSize='large' />
                     <h5 className='m-0'>Hari HR Re-Cruit App</h5>
               </div>
               <div className={`col-2 expand-close d-md-none ${expand ? "d-flex justify-content-center" : "d-none"}`} onClick={isExpand}><CloseIcon fontSize='large' /></div>
            </div>
            <div className='p-2 d-flex flex-column'>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">SignUp</Link>
            </div>
         </div>
      </div>
   </>
 }