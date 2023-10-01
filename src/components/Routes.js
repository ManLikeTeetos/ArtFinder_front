import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Event from '../pages/Event';
import Sales from '../pages/Sales';
import NFT from '../pages/NFT';
import Faq from '../pages/Faq';
import AddGallery from '../pages/AddGallery';
import Finder from '../pages/Finder';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Become from '../pages/Become';
import GalleryList from '../pages/GalleryList';
import Footer from '../pages/Footer'; // Import the Footer component

function Routing() {
    const location = useLocation();

    // Check if the current route is "/gallery"
    const isGalleryRoute = location.pathname === '/gallery';

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/event" element={<Event />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/nft" element={<NFT />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/addgallery" element={<AddGallery />} />
                <Route path="/finder" element={<Finder />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/become" element={<Become />} />
                <Route path="/gallerylist" element={<GalleryList />} />
            </Routes>

            {/* Render the Footer unless it's the "/gallery" route */}
            {!isGalleryRoute && <Footer />}
        </>
    );
}

export default Routing;
