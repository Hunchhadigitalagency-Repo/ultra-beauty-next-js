import React from 'react'
import Paid from './components/paid'
import Unpaid from './components/unpaid'
import Failed from './components/failed'
import BrandsSection from '../components/brands-that-you-love/brands-section'

const Payments = () => {
  const status : 'paid' | 'unpaid' | 'failed' = 'paid'
  
  function Renderstatus(){
    if(status==='paid'){
    return <Paid/>
  }else if (status ==='unpaid'){
    return <Unpaid/>
  } else if (status === 'failed'){
    return <Failed/>
  }
  }
  return (
  
<>
{Renderstatus()}
 <BrandsSection/>
</>
    
    
  )
}
export default Payments