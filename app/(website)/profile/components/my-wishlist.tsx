import React from 'react'
import WishlistCard from '../../wishlist/components/wishlist-card'


const wishlistProducts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Airpods",
        general_description: "Apple Airpods",
        rating: 4.8,
        price: "120000",
        discount_percentage: "10%",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Iphone",
        general_description: "Iphone White Color",
        rating: 4.3,
        price: "8000",
        discount_percentage: "5%",
    }
];


const MyWishlist: React.FunctionComponent = () => {

    const deleteWishlistClient = () => { };

    return (
        <section>
            <div className="flex flex-col gap-5">
                <h1 className="text-xl font-medium text-primary">My Wishlist</h1>
                {wishlistProducts.map((product) => (
                    <WishlistCard
                        key={product.id}
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
        </section>
    )
}

export default MyWishlist