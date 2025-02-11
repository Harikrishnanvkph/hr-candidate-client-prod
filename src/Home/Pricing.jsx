import { useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const priceLevels = [
    {
        price_name : "Free",
        price : {
            per_month : "₹0",
            per_year : "₹0"
        },
        no_of_jb_profile : 50,
        no_of_jb_chat : 5,
        security_level : "Standard",
        jb_exposure : "10 per Month",
        support : ["Expert 24/7 Technical Support",false],
        AI_chat : ['Custom AI ChatBot for finding Best Candidate',false]
    },
    {
        price_name : "Standard",
        price : {
            per_month : "₹180",
            per_year : "₹1500"
        },
        no_of_jb_profile : 500,
        no_of_jb_chat : 75,
        security_level : "Enterprise Level",
        jb_exposure : "100 per Month",
        support : ["Expert 24/7 Technical Support",true],
        AI_chat : ['Custom AI ChatBot for finding Best Candidate',false]
    },
    {
        price_name : "Professional",
        price : {
            per_month : "₹350",
            per_year : "₹3120"
        },
        no_of_jb_profile : "Unlimited",
        no_of_jb_chat : "Unlimited",
        security_level : "Enterprise Level",
        jb_exposure : "250 per Month",
        support : ["Expert 24/7 Technical Support",true],
        AI_chat : ['Custom AI ChatBot for finding Best Candidate',true]  
    }
]


export default function Pricing(){
    const [pricePlan, setPricePlan] = useState(false);
    const dStyle = "d-flex align-items-center";

    const pricePlanFunction = ()=>{
        console.log("ok")
        setPricePlan(!pricePlan);
    }

    return <>
        <div className="container-fluid p-md-4 pricing" id="pricing">
            <div className="row d-flex flex-sm-row flex-column align-items-center m-0 justify-content-md-between justify-content-center pr-5 p-2">
                <p className="m-0 ml-lg-5 ml-md-3 mx-sm-3 mr-sm-5 pricing-title" style={{fontSize : "30px",fontFamily : "Courier New, Courier, monospac"}}><mark>Our Pricing</mark></p>
                <div className="d-flex align-items-center">
                    <p className="m-0">Monthly</p>
                    <label className="switch m-3" >
                        <input type="checkbox" onClick={pricePlanFunction} className="checkInput" />
                        <span className="slider"></span>
                    </label>
                    <p className="m-0">Yearly</p>
                </div>
            </div>

            <div className="price_plan row px-sm-5 px-3">
                {
                    priceLevels.map((it,index)=>{
                        return (
                            <div className="col-xl-4 p-2 price-plan-inner" key={index}>
                                <div className="price_plan_tag p-3 text-center">
                                    <div className={`${dStyle} justify-content-center`}>
                                        <p className="mr-2">Plan</p>
                                        <p style={{fontSize : "30px"}} className="mx-3">{it.price_name}</p>
                                    </div>
                                    <hr className="mt-0"/>
                                    <div className={`${dStyle} justify-content-center`}>
                                        <p className="mr-lg-2 mx-0">Price</p>
                                        <p className="mx-3 d-flex align-items-center">{!pricePlan ? <><span className="price-element">{it.price.per_month}</span> per month</> : <><span className="price-element">{it.price.per_year}</span> per year</>}</p>
                                    </div>
                                    <p>Max No.Of Job Seekers Profile Check : <span className="pricing-highlighter">{it.no_of_jb_profile}</span></p>
                                    <p>Max Private Chat with Job Seekers : <span className="pricing-highlighter">{it.no_of_jb_chat}</span></p>
                                    <p><span className="pricing-highlighter">{it.security_level}</span> End to End Encryption</p>
                                    <p>Get Top Job Seekers Profile <span className="pricing-highlighter">{it.jb_exposure}</span></p>
                                    <p className={`${!it.support[1] ? "text-muted" : ""}`}><span className="mr-2">{!it.support[1] ? <ClearIcon /> : <DoneIcon />}</span>{it.support[0]}</p>
                                    <p className={`${!it.AI_chat[1] ? "text-muted" : ""}`}><span className="mr-2">{!it.AI_chat[1] ? <ClearIcon /> : <DoneIcon />}</span>{it.AI_chat[0]}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
}