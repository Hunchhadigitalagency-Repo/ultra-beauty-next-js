"use client"
import { useEffect } from "react";

export default function TestPayment() {
    const BUNDLE_URL = process.env.NEXT_PUBLIC_BUNDLE_URL;
    useEffect(() => {
        if(!BUNDLE_URL) return ;
        const script = document.createElement('script');
        script.src = BUNDLE_URL;
        script.async = true;
        script.onload = () => console.log('GetPay script loaded successfully');
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div id="checkout"></div>
        </>
    );
}
