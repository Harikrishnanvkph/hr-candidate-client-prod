import ContactMailIcon from '@mui/icons-material/ContactMail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const arrayOfSolutions = [
    {icon : <ContactMailIcon className='s-icon'  />, description : "Find Smooth Interface for Job Seekers to Apply from Multiple available templates"},
    {icon : <VerifiedUserIcon className='s-icon' />, description : "Get Valid Candidates with Relevant Expertise listed for Job posts and Choose from the Best"},
    {icon : <MarkChatReadIcon className='s-icon' />, description : "Communicate Job Seekers via Real Time Messaging which helps to understand Candidates Better"},
    {icon : <SupportAgentIcon className='s-icon' />, description : "Experience Expert 24/7 Real Time Technical Support"},
    {icon : <VpnKeyIcon className='s-icon' />, description : "Feel Safe and Secure with Strong End to End Data Protection Policy"},
]


export default function SolutionOffer() {
    return (
        <div className='container-fluid solution-offer p-sm-5 m-0' id='services'>
            <div className='d-flex justify-content-md-start justify-content-center p-sm-0 p-2 st-service'><p className="m-0 ml-lg-5 ml-md-3 mx-sm-3 mr-sm-5 service-title" style={{fontSize : "30px",fontFamily : "Courier New, Courier, monospac"}}><mark>Our Services</mark></p></div>
            <div className='row'>
                {
                    arrayOfSolutions.map((it,index)=>{
                        const cusClass = arrayOfSolutions.length-1 - index === 0 ? "col-12" : "col-md-6 col-12";
                        return (
                            <DisplayIconSolution iconElement={it.icon} description={it.description}
                            customClass={cusClass} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
}

function DisplayIconSolution({ iconElement, description, customClass}) {
    return (
        <div className={`sol-item d-sm-flex flex-sm-row flex-column align-items-center ${customClass} justify-content-md-center justify-content-sm-start p-3`}>
            <div className={`s-display s-display-icon p-sm-3 p-2 text-center`}>{iconElement}</div>
            <p className={`s-display ml-3 m-0 text-center`}>{description}</p>
        </div>
    );
}
