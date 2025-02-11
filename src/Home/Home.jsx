import NavHome from "./NavHome";
import "./HomeScreen.css"
import BodyIntro from "./BodyIntro";
import SolutionOffer from "./SolutionOffer";
import Pricing from "./Pricing";
import Footer from "./Footer";


export default function Home(){
    return <>
        <div >
            <NavHome />
            <BodyIntro />
            <SolutionOffer />
            <Pricing />
            <Footer />
        </div>
    </>
}