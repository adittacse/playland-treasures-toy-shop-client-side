import React, { useEffect, useState } from 'react';
import AllToysRow from './AllToysRow';
import useTitle from '../../hooks/useTitle';

const AllToys = () => {
    const [toys, setToys] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const toysPerPage = 20;
    useTitle('All Toys');
    
    useEffect(() => {
        fetch('https://playland-treasures-toy-shop-server-side.onrender.com/toys')
            .then(res => res.json())
            .then(data => {
                setToys(data);
            });
    }, []);
    
    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset the current page when search query changes
    };
    
    const filteredToys = toys.filter(toy =>
        toy.toyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const totalPages = Math.ceil(filteredToys.length / toysPerPage);
    const paginatedToys = filteredToys.slice(
        (currentPage - 1) * toysPerPage,
        currentPage * toysPerPage
    );
    
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    
    return (
        <div>
            <h2 className="text-center text-white text-5xl mt-10 mb-10">All Toys</h2>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2"
                    placeholder="Search Toy Here"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full mb-10">
                    <thead>
                    <tr>
                        <th>Toy Name</th>
                        <th>Seller Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginatedToys.map(toy => <AllToysRow key={toy._id} toy={toy}></AllToysRow>)
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Toy Name</th>
                        <th>Seller Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div className="flex justify-center mb-10">
                {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    page => <button key={page}
                            className={`px-4 py-2 mx-1 font-bold ${currentPage === page ? "bg-warning text-black" : "bg-black text-white"}`}
                            onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                    )
                }
            </div>
        </div>
    );
};

export default AllToys;
