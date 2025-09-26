"use client";

import {  ArrowLeft } from "lucide-react";
import CustomDropdown from "@/components/common/filter/custom-dropdown";

const withdrawData = [
    {
        transactions: [
            {
                date: "24, Aug, TODAY",
                time: "10:14 PM",
                wd: "45678909876556789",
                from: "45678909876556789",
                amount: "Nrs. 10,000",
            },
            {
                date: "24, Aug, TODAY",
                time: "10:14 PM",
                wd: "45678909876556789",
                from: "45678909876556789",
                amount: "Nrs. 10,000",
            },
            {
                date: "24, Aug, TODAY",
                time: "10:14 PM",
                wd: "45678909876556789",
                from: "45678909876556789",
                amount: "Nrs. 10,000",
            },
        ],
    },
];

const options = [
    { name: "Month", value: "month" },
    { name: "Week", value: "week" },
    { name: "Year", value: "year" },
];

    export default function WithdrawHistory() {
    // const [filterType, setFilterType] = useState("week");
    // const handleChange = (value: string) => {
    //     setFilterType(value);
    // };

    return (
        <div className="border border-gray-200 rounded-lg p-4 w-full max-w-md bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-gray-800">Withdraw History</h2>
                <div className="relative">
                    <CustomDropdown
                        options={options}
                        // handleChange={handleChange}
                        getValue={(item) => item.value}
                        getLabel={(item) => item.name}
                        placeholder="Week"
                    />
                </div>
            </div>

            {withdrawData.map((entry, idx) => (
                <div key={idx} className="mb-4">
                    {entry.transactions.map((tx, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start justify-between mb-3 p-2 rounded-md hover:bg-gray-50"
                        >
                            <p className="text-sm text-gray-500 mb-2">{tx.date}</p>
                            <div className="flex items-start justify-between w-full mb-3 p-2 rounded-md hover:bg-gray-50">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 rounded-full p-2">
                                        <ArrowLeft className="text-blue-500 w-4 h-4" />
                                    </div>
                                    <div className="text-sm text-gray-700 leading-tight">
                                        <div>
                                            <span className="font-medium">WD:</span> {tx.wd}
                                        </div>
                                        <div>
                                            <span className="font-medium">FROM:</span> {tx.from}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap">
                                    <p className="text-gray-600">{tx.time}</p>
                                    <p className="text-green-500 font-semibold">: {tx.amount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
