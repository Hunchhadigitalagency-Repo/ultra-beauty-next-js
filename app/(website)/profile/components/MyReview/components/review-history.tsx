import React from 'react'
import ReviewHistoryCard from './review-history-card'

const ReviewHistory = () => {
    return (
        <div>
            <ReviewHistoryCard
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                product='Sleek Pregnancy Cushion with some random text abd long text'
                rating={3.5}
                review='This is a good product'
            />
        </div>
    )
}

export default ReviewHistory