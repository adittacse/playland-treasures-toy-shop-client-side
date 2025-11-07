import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ToyCard from "./ToyCard.jsx";

const ToysCategory = () => {
    const [avengersToys, setAvengersToys] = useState([]);
    const [marvelToys, setMarvelToys] = useState([]);
    const [starWarsToys, setStarWarsToys] = useState([]);
    
    useEffect(() => {
        fetch('https://playland-treasures-toy-shop-server-side.onrender.com/toys')
            .then(response => response.json())
            .then(data => {
                const avengersToysData = getRandomToysByCategory(data, "Avengers");
                const marvelToysData = getRandomToysByCategory(data, "Marvel");
                const starWarsToysData = getRandomToysByCategory(data, "Star Wars");
                
                setAvengersToys(avengersToysData);
                setMarvelToys(marvelToysData);
                setStarWarsToys(starWarsToysData);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);
    
    const getRandomToysByCategory = (toys, category, limit = 3) => {
        const categoryToys = toys.filter(toy => toy.category === category);
        const shuffledToys = categoryToys.sort(() => 0.5 - Math.random());
        return shuffledToys.slice(0, limit);
    }
    
    return (
        <div className="text-center mb-20">
            <h2 className="text-4xl text-white font-bold mb-10">Shop By Category</h2>
            <Tabs>
                <TabList className="flex flex-wrap justify-center text-white mb-10">
                    <Tab>Marvel</Tab>
                    <Tab>Avengers</Tab>
                    <Tab>Star Wars</Tab>
                </TabList>
                
                <TabPanel>
                    <div className="flex mx-auto justify-center gap-10 flex-wrap">
                        {marvelToys.map(toy => <ToyCard key={toy._id} toy={toy} />)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex mx-auto justify-center gap-10 flex-wrap">
                        {avengersToys.map(toy => <ToyCard key={toy._id} toy={toy} />)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex mx-auto justify-center gap-10 flex-wrap">
                        {starWarsToys.map(toy => <ToyCard key={toy._id} toy={toy} />)}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ToysCategory;