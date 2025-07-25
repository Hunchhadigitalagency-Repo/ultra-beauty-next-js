import React from 'react';
import BrandContent from './brand-content';

interface BrandAdsBannerProps {
    brandImage: string;
    brandName: string;
    brandDescription: string;
    brandColor: string
};

const BRAND: BrandAdsBannerProps = {
    brandImage: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brandName: 'COSMETIC',
    brandDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis saepe facere quaerat voluptas',
    brandColor: '#FF0000'
};

const BrandAdsBanner: React.FunctionComponent = () => {
    return (
        <div className='padding'>
            {BRAND &&
                <div
                    className="relative w-full h-60 md:h-80 lg:h-[563px] rounded-md"
                    style={{
                        backgroundImage: `url(${BRAND.brandImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div className='h-full padding flex items-center justify-center lg:justify-end'>
                        <BrandContent
                            brandName={BRAND.brandName}
                            brandDescription={BRAND.brandDescription}
                            brandColor={BRAND.brandColor}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default BrandAdsBanner;
