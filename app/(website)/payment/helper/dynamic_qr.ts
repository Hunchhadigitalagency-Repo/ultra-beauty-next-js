import axios from "axios";

export class DynamicQr {


    async generateDynamicQR(params: {
        amount: number;
        remarks1: string;
        remarks2: string;
    }): Promise<{
        qrMessage: string;
        merchantWebSocketUrl: string;
        status: string;
    }> {
        try {
            const {
                amount,
                remarks1,
                remarks2,
            } = params;

            const postData = {
                amount: amount,
                remarks1: remarks1,
                remarks2: remarks2,
            };

            const url =  `${process.env.NEXT_PUBLIC_API_URL}generate-dynamic-qr/`;
            const response = await axios.post(url, postData);
            console.log("dynamic_qr_ts", response.data)
            if (response.data?.qrMessage) {
                return {
                    qrMessage: response.data.qrMessage,
                    merchantWebSocketUrl: response.data.merchantWebSocketUrl,
                    status: response.data.status,
                };
            }

            throw new Error("QR message not found");
        } catch (error) {
            console.log("what is error", error)
            throw new Error(`Error: ${String(error)}`);
        }
    }
}
