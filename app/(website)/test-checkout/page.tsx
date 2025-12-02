"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect,  } from 'react'
import { toast } from 'sonner';

const cartItems = [
    {
        id: 1,
        name: "Product",
        image: "/image.png",
        price: 1000

    }
]



const TestCheckoout = () => {
    const BUNDLE_URL = process.env.NEXT_PUBLIC_BUNDLE_URL || 'https://minio.finpos.global/getpay-cdn/webcheckout/bundle.js';

    const getOrderInformationHtml = (cartItems: any, totalAmount: any) => {
        let html = `<div style="font-family:Arial;"><h3>Order Information</h3>`;

        cartItems.forEach((cartItem: any) => {
            const { name, price, image } = cartItem;

            html += `
        <div class="item" style="margin-bottom: 20px; display: flex; align-items: center;">
            <img style="max-width: 50px; margin-right: 10px;" src="${image}" alt="${name}">
            <p>${name}</p>
            <span>Rs ${price.toFixed(2)}</span>
        </div>`;
        });

        html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background-color: #ddd; margin-top: 20px; border-radius: 5px;" class="total">
            <label>Total:</label>
            <span>Rs ${totalAmount.toFixed(2)}</span>
        </div>
        </div>`;

        return html;
    };

    const orderInformationHtml = getOrderInformationHtml(cartItems, 1000);

    const initializeGetPay = () => {
        if (!window.GetPay) {
            toast.error("Payment system is not ready yet.");
            return;
        }

        const options: any = {
            userInfo: {
                name: "John Doe",
                email: "john@gmail.com",
                state: "Bagmati",
                country: "Nepal",
                zipcode: "44600",
                city: "Kathmandu",
                address: "Chabahil",
            },

            papInfo: process.env.NEXT_PUBLIC_PAP_INFO,
            oprKey: process.env.NEXT_PUBLIC_OPR_KEY,
            insKey: process.env.NEXT_PUBLIC_INS_KEY,

            websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
            price: 1000,
            businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            imageUrl: process.env.NEXT_PUBLIC_LOGO_URL,
            currency: "NPR",

            prefill: {
                name: true,
                email: true,
                state: true,
                city: true,
                address: true,
                zipcode: true,
                country: true
            },

            disableFields: {
                address: true,
                state: true,
            },

            callbackUrl: {
                successUrl: process.env.NEXT_PUBLIC_SUCCESS_URL,
                failUrl: process.env.NEXT_PUBLIC_FAIL_URL,
            },

            themeColor: "#5662FF",
            orderInformationUI: orderInformationHtml,

            onSuccess: () => {
                window.location.href = '/test-payment'
            },
            onError: (error: any) => {
                toast.error(error?.error);
            },
        };

        options.baseUrl = process.env.NEXT_PUBLIC_PAYMENT_URL
        const getPay = new window.GetPay(options);
        getPay.initialize();
    };

    useEffect(() => {
        if (cartItems?.length > 0) {
            const script = document.createElement('script');
            script.src = BUNDLE_URL;
            script.async = true;
            script.onload = () => console.log('GetPay script loaded successfully');
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    return (
        <div>
            <div id="checkout" hidden></div>
            <Button id="checkout-btn" onClick={initializeGetPay}>Checkout</Button>
        </div>
    )
}

export default TestCheckoout
