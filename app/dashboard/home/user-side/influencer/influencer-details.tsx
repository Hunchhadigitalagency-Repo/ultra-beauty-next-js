import React from 'react'
import InfluencerCart from './influencer-sale-cart'
import InfluencerSaleByCategory from './influncer-sale-category'

const InfluencerDetails = () => {
  return (
    <div className='flex gap-4 bg-white p-4 rounded-xl'>

       <InfluencerCart />
       <InfluencerSaleByCategory />
    </div>
  )
}

export default InfluencerDetails
