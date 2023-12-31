import React from 'react';
import useTitle from "../../../hooks/useTitle.jsx";
import ToysCategory from "../ToysCategory/ToysCategory.jsx";
import Banner from "../Banner/Banner.jsx";
import BonusSectionOne from "../BonusSectionOne/BonusSectionOne.jsx";
import BonusSectionTwo from "../BonusSectionTwo/BonusSectionTwo.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import BonusSectionThree from "../BonusSectionThree/BonusSectionThree.jsx";

const Home = () => {
    useTitle("Home");
    
    return (
        <div>
            <Banner></Banner>
            <Gallery></Gallery>
            <ToysCategory></ToysCategory>
            <BonusSectionOne></BonusSectionOne>
            <BonusSectionTwo></BonusSectionTwo>
            <BonusSectionThree></BonusSectionThree>
        </div>
    );
};

export default Home;