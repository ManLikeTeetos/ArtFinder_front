import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Event from '../pages/Event';
import Sales from '../pages/Sales';
import NFT  from "../pages/NFT";
import Faq from "../pages/Faq";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/event" element={<Event/>}/>
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/nft" element={<NFT/>}/>
            <Route path="/faq" element={<Faq/>}/>
        </Routes>
    );
}

export default Routing;