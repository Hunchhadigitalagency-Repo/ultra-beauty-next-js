import React from 'react'
import UserStatsCards from './user-stats-cards/user-stats-cards'
import WithdrawDetails from './withdraw-details/withdraw-details'
import InfluencerDetails from './influencer/influencer-details'
import CouponDetails from './coupons-history/cupon-details'

const UserDashboard = () => {
  return (
    <>
      <UserStatsCards />
      <WithdrawDetails />
      <InfluencerDetails />
      <CouponDetails />
    </>
  )
}

export default UserDashboard
