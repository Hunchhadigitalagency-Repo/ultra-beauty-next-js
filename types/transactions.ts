export interface ITransactions {
    id: number;
    invoice_id: number;
    amount: string;
    date: string;
    transaction_details: {
        total_amount: number;
        payment_status: string;
        transaction_code: string;
        transaction_uuid: string;
    };
    status: string;
}
