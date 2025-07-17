import React from 'react';
import ProductSection from '../product/product-section';


const PRODUCTS = [
    { id: 1, imageSrc: 'https://images.unsplash.com/photo-1619352520578-8fefbfa2f904?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Red Lipstick', title: 'Red Lipstick', description: 'A beautiful red lipstick for all occasions', brand: 'Pastel Cosmetics', rating: 4.5, price: '$19.99' },
    { id: 2, imageSrc: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Calvin Klein Soft Tube', title: ' Soft Tube', description: 'A soft tube from Calvin Klein', brand: 'Ubiya Derma', rating: 4.0, price: '$29.99' },
    { id: 3, imageSrc: 'https://images.unsplash.com/photo-1657297950139-179a9a70ea9e?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Jewelry', title: 'Jewelry', description: 'Elegant jewelry for special occasions', brand: 'Indoor Cosmetics', rating: 4.8, price: '$49.99' },
    { id: 4, imageSrc: 'https://images.unsplash.com/photo-1512351660358-6bed42b7b842?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Lip Glow Color Reviver Balm', title: 'Lip Balm', description: 'A color reviver balm for your lips', brand: 'Channel', rating: 4.2, price: '$22.99' }
]

const Featured = () => {
    return (
        <ProductSection
            products={PRODUCTS}
            headerTitle='Featured Brand'
            headerDescription='Make yourself Up to fit the every  Occassion'
            headerLink='/shop'
        />
    )
}

export default Featured