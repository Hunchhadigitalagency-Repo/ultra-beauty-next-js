"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import AdvertiseForm from '../components/avdertise-form'

const EditAdverBanner = () => {
    const { selectedData } = useAppSelector(state => state.authentication)
    return (
        <div>
            <AdvertiseForm initialData={selectedData} />
        </div>
    )
}

export default EditAdverBanner
