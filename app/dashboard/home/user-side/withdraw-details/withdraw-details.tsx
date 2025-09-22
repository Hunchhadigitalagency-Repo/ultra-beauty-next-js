import SectionHeader from '@/components/common/header/section-header'
import React from 'react'
import WithdrawAnalytics from './withdraw-analytics'
import WithdrawHistory from './withdraw-history'
import { Button } from '@/components/ui/button'

const WithdrawDetails = () => {
    return (
        <>
            <div className="bg-white rounded-xl">
                <div className="flex justify-between p-8">
                <SectionHeader
                    title='Withdraw Details'
                    description=''
                    titleClassName='!text-black'
                    className=''
                />
                <Button >
                    Request for Payment
                </Button>
                </div>
                <div className="px-8 flex justify-between w-full gap-4">
                    <WithdrawAnalytics />
                    <WithdrawHistory />
                </div>
            </div>
        </>
    )
}

export default WithdrawDetails
