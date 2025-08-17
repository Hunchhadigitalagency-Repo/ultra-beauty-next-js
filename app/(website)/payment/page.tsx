import React from 'react';
import Paid from './components/paid';
import Unpaid from './components/unpaid';
import Failed from './components/failed';
import BrandsSection from '../components/brands-that-you-love/brands-section';

const Payment: React.FunctionComponent = () => {

  const status = 'paid';

  return (
    <section>
      {
        status === 'paid' ? <Paid />
          : status === 'unpaid' ? <Unpaid />
            : <Failed />
      }
      <BrandsSection />
    </section>
  )
}
export default Payment