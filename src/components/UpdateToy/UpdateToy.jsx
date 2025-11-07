import React, {useContext, useState} from 'react';
import {AuthContext} from "../../Providers/AuthProviders.jsx";
import Swal from "sweetalert2";
import {useLoaderData} from "react-router-dom";
import useTitle from "../../hooks/useTitle.jsx";

const UpdateToy = () => {
    const {user} = useContext(AuthContext);
    useTitle("Update Toy");
    const toy = useLoaderData();
    const {_id, toyName, picture, sellerName, email, category, price, ratingFloat, quantity, description} = toy;
    
    const [selectedCategory, setSelectedCategory] = useState(category);
    
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
    };
    
    const handleUpdateToy = (event) => {
        event.preventDefault();
        
        const form = event.target;
        const toyName = form.toyName.value;
        const picture = form.picture.value;
        const sellerName = form.sellerName.value;
        const email = form.sellerEmail.value;
        let category = form.category.value;
        const price = form.price.value;
        const ratings = form.ratings.value;
        const quantity = form.quantity.value;
        const description = form.description.value;
        
        if (category === "marvel") {
            category = "Marvel"
        } else if (category === "avengers") {
            category = "Avengers";
        } else if (category === "star-wars") {
            category = "Star Wars";
        }
        
        const ratingFloat = parseFloat(ratings);
        
        if (!(ratingFloat < 0) && !(ratingFloat > 5)) {
            // valid ratings
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ratings Must Be From 0 To 5!',
            })
            return;
        }
        
        const updatedToy = {
            toyName,
            picture,
            sellerName,
            email,
            category,
            price,
            ratingFloat,
            quantity,
            description
        }
        
        // send data to the server
        fetch(`https://playland-treasures-toy-shop-server-side.onrender.com/toy/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedToy)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: 'Toy updated successfully!',
                        icon: "success",
                        confirmButtonText: 'Cool'
                    })
                }
            });
    }
    
    return (
        <div>
            <h2 className="text-center text-3xl mt-10 mb-10">Update Toy</h2>
            <form onSubmit={handleUpdateToy}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Toy Name</span>
                        </label>
                        <input type="text" name="toyName" defaultValue={toyName} placeholder="Toy Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Toy Picture URL</span>
                        </label>
                        <input type="text" name="picture" defaultValue={picture} placeholder="Toy Picture URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Name</span>
                        </label>
                        <input type="text" name="sellerName" defaultValue={user?.displayName} placeholder="Seller Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Email</span>
                        </label>
                        <input type="text" name="sellerEmail" defaultValue={user?.email} placeholder="Seller Email" className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select name="category" className="select select-bordered" value={selectedCategory} onChange={handleCategoryChange} required>
                            <option disabled value="">Select Toy Category</option>
                            <option value="marvel">Marvel</option>
                            <option value="avengers">Avengers</option>
                            <option value="star-wars">Star Wars</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Toy Price</span>
                        </label>
                        <input type="text" name="price" defaultValue={price} placeholder="Toy Price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Toy Ratings</span>
                        </label>
                        <input type="text" name="ratings" defaultValue={ratingFloat} placeholder="From 0 to 5" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available Quantity</span>
                        </label>
                        <input type="text" name="quantity" defaultValue={quantity} placeholder="Available Quantity" className="input input-bordered" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="form-control mt-6">
                        <label className="label">
                            <span className="label-text">Toy Description</span>
                        </label>
                        <textarea name="description" defaultValue={description} placeholder="Toy Description" className="textarea textarea-bordered" id="description" cols="30" rows="5"></textarea>
                    </div>
                </div>
                <div className="form-control mt-10">
                    <input className="btn text-white bg-[#FF3811] btn btn-block" type="submit" value="Update Toy"/>
                </div>
            </form>
            <div className="card-body">
            </div>
        </div>
    );
};

export default UpdateToy;