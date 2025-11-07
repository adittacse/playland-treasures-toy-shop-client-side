import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../Providers/AuthProviders.jsx";
import ToysRow from "./ToysRow.jsx";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle.jsx";

const MyToys = () => {
    const {user} = useContext(AuthContext);
    const [toys, setToys] = useState([]);
    const [sortedToys, setSortedToys] = useState([]);
    useTitle("My Toys");
    
    const url = `https://playland-treasures-toy-shop-server-side.onrender.com/toys?email=${user?.email}`;
    useEffect( () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setToys(data);
            })
    },[url]);
    
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://playland-treasures-toy-shop-server-side.onrender.com/toys/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Toy has been deleted.',
                                'success'
                            )
                            const remaining = toys.filter(toy => toy._id !== id);
                            setToys(remaining);
                        }
                    })
            }
        })
    }
    
    useEffect(() => {
        const sortedToys = [...toys].sort((a, b) => a.price - b.price);
        setSortedToys(sortedToys);
    }, [toys]);
    
    return (
        <div className="mb-10">
            <h2 className="text-center text-5xl mt-10 mb-10">My Total Toys: {toys.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price & Ratings</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row */}
                    {sortedToys.map(toy => (
                        <ToysRow key={toy._id} toy={toy} handleDelete={handleDelete} />
                    ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price & Ratings</th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MyToys;