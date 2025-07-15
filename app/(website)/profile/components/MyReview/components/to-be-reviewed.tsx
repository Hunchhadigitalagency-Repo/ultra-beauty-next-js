import React from 'react';
import ReviewCard from './review-card';

const ToBeReviewed = () => {


    return (
        <section className='flex flex-col gap-4'>
            <ReviewCard
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                description='Pregnancy sofa with some random te text and random data'
            />
            <ReviewCard
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                description='Pregnancy sofa with some random te text and random data'
            />
            <ReviewCard
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                description='Pregnancy sofa with some random te text and random data'
            />
            <ReviewCard
                image='https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg'
                description='Pregnancy sofa with some random te text and random data'
            />
        </section>

    )
}

export default ToBeReviewed