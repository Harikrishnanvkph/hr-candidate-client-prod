import { useEffect, useState } from "react"
import { getReferral, updateReferral } from "../API"
import { useDispatch, useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage } from "../ReduxStore/Slicer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MyReferrals } from "./MyReferrals";



export default function JBReferral(){
    const user = useSelector((state)=>state.myStore.userCE);
    const [ref, setRef] = useState([])
    const [inpS,setInpS] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        async function get(){
            const getRef = await getReferral();
            setRef(getRef);
        }
        get();
    },[])
    

    const addReferral = async(referral)=>{
        const addRef = await updateReferral(user.mail,referral);
        console.log(addRef.status)
        if(addRef.status === 200){
            dispatch(toastMessage("+ Referral Added"))
        }else{
            dispatch(toastMessage("Error While Adding Referral"))
        }
    }

    return<>
        <div className="jb-referral">
            <div className="row px-3 py-2 stickly-referral
            d-flex flex-sm-row flex-column justify-content-between">
                <button className="btn btn-primary" onClick={()=>{
                    navigate("myReferrals")
                }}>
                    My Applied Referrals
                </button>
                <div className="ref-inp">
                    <input className="p-2" type="text" placeholder="Search"
                    value={inpS} onChange={(e)=>{
                        setInpS(e.target.value);
                    }} />
                </div>
            </div>
            <div className="row candidate-seeker">
                {
                    ref.length > 0 ? ref.map((it,index)=>{
                        if(it.name.toLowerCase().startsWith(inpS.toLowerCase())){
                            return <ReferralCard obj={it} clicked={()=>{
                                addReferral(it)
                            }} key={index} />
                        }
                    }) : <p></p>
                }
            </div>
            {/*<div className="row px-3 py-3 stickly-referral d-flex justify-content-end">*/}
            {/*    <button className="btn btn-primary" onClick={()=>{*/}
            {/*        navigate("myReferrals")*/}
            {/*    }}>*/}
            {/*        My Applied Referrals*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    </>
}

function ReferralCard({obj,clicked}){

    return <>
        <div className="col-xl-3 col-md-4 col-sm-6 col-12 emp-jb-card p-3">
            <div className="emp-card p-2 d-flex flex-column text-center justify-content-center align-items-center">
                <img src={obj.image_url} />
                <p className="pricing-highlighter">{obj.name}</p>
                <p className="pricing-highlighter mt-0">{`Opening : ${obj.job_opening}`}</p>
                <p style={{fontSize : "11px"}}>{obj.job_description}</p>
                <p style={{fontSize : "13px"}}>{obj.location}</p>
                <button onClick={clicked} className="btn btn-primary py-1 px-5">Refer</button>
            </div>
        </div>
    </>
}