import React from 'react'
import WishlistCard from '../../wishlist/components/wishlist-card'


const wishlistProducts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1725172045217-d1e1f2ecdf62?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dermama",
        general_description: "Dermama Streching cream",
        rating: 4.8,
        price: "120000",
        discount_percentage: "10%",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1648712789205-4a05ebb8d026?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Cosmozone",
        general_description: "Cosmozone Antidark Spot Serum for all skin types.",
        rating: 4.3,
        price: "8000",
        discount_percentage: "5%",
    }
];


const MyWishlist: React.FunctionComponent = () => {

    const deleteWishlistClient = () => {

    }

    return (
        <>
            <div className="flex flex-col gap-3">

                <h1 className="text-primary font-medium text-lg lg:text-xl">
                    My Wishlist
                </h1>
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