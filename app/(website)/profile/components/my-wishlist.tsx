import React from 'react'
import WishlistCard from '../../wishlist/components/wishlist-card'


const wishlistProducts = [
    {
        id: 1,
        image: "/images/laptop.jpg",
        name: "Gaming Laptop",
        general_description: "High-performance laptop for gaming and work.",
        rating: 4.8,
        price: "120000",
        discount_percentage: "10%",
    },
    {
        id: 2,
        image: "/images/smartwatch.jpg",
        name: "Smart Watch",
        general_description: "Track your fitness and notifications on the go.",
        rating: 4.3,
        price: "8000",
        discount_percentage: "5%",
    },
    {
        id: 3,
        image: "/images/shoes.jpg",
        name: "Running Shoes",
        general_description: "Comfortable and lightweight running shoes.",
        rating: 4.7,
        price: "4500",
        discount_percentage: "15%",
    },
    {
        id: 4,
        image: "/images/phone.jpg",
        name: "Smartphone",
        general_description: "Latest model with powerful camera and features.",
        rating: 4.6,
        price: "95000",
        discount_percentage: "12%",
    },
];


const MyWishlist: React.FunctionComponent = () => {

    const deleteWishlistClient = () => {

    }

    return (
        <>
            <div className="flex flex-col gap-3">

                <div>MyWishlist</div>
                {wishlistProducts.map((product) => (
                    <WishlistCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        description={product.general_description || ""}
                        rating={product.rating ?? 4.5}
                        previousPrice={product.price || "0"}
                        price={product.price || "0"}
                        discountTag={product.discount_percentage || "0%"}
                        deleteWishlist={deleteWishlistClient}

                    />
                ))}
            </div>
        </>
    )
}

export default MyWishlist