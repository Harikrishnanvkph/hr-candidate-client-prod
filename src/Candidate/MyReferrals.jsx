import { useEffect, useState } from "react"
import { getMyReferral } from "../API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function MyReferrals(){
    const cUser = useSelector((state)=>state.myStore.userCE);
    const [ref,setRef] = useState([]);
    const [inpS,setInpS] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        async function get(){
            const getRef = await getMyReferral(cUser.mail);
            console.log(getRef.referrals)
            setRef(getRef.referrals);
        }
        get();
    },[])

    return<>
<div className="container-fluid ">
            <div className="row px-3 py-2 stickly-referral
            d-flex flex-sm-row flex-column justify-content-between">
                <button className="btn btn-primary" onClick={()=>{
                    navigate("/js/Referral")
                }}>
                    Go Back
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
                            return <ReferralCard obj={it} key={index} />
                        }
                    }) : <p>No Data Found</p>
                }
            </div>
            <div className="row px-3 py-3 stickly-referral d-flex justify-content-end">
                <button className="btn btn-primary" onClick={()=>{
                    navigate("/js/Referral")
                }}>
                    Go Back
                </button>
            </div>
        </div>
    </>
}

function ReferralCard({obj}){
    return <>
        <div className="col-xl-3 col-md-4 col-sm-6 col-12 emp-jb-card p-3">
            <div className="emp-card p-2 d-flex flex-column text-center justify-content-center align-items-center">
                <img src={obj.image_url} />
                <p className="pricing-highlighter">{obj.name}</p>
                <p className="pricing-highlighter mt-0">{`Opening : ${obj.job_opening}`}</p>
                <p style={{fontSize : "11px"}}>{obj.job_description}</p>
                <p style={{fontSize : "13px"}}>{obj.location}</p>
            </div>
        </div>
    </>
}