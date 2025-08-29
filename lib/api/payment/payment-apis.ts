import crypto from "crypto"

export async function generateEsewaPayload(
    total_amount: number,
    transaction_uuid: string,
    product_code: string
) {
    const secretKey = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!;
    const payload = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    const signature = crypto.createHmac("sha256", secretKey).update(payload).digest("base64");

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    return {
        amount: total_amount - 0,
        tax_amount: 0,
        total_amount,
        transaction_uuid,
        product_code,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${origin}/payment/success`,
        failure_url: `${origin}/payment/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
    };

}
