'use client'
import { useAppSelector } from '@/redux/hooks';
import React from 'react'
import TeamForm from '../components/team-form';

const EditTeam = () => {
    const { selectedData } = useAppSelector((state) => state.authentication);
    return (
        <div>
            <TeamForm initialData={selectedData} />
        </div>
    )
}

export default EditTeam
