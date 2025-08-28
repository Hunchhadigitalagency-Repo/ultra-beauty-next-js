import React from 'react'
import { X } from "lucide-react";
import { PROFILE_TABS } from '@/app/(website)/profile/components/profile-tabs';

type ProfileTabsProps = {
    isOpen: boolean;
    activeTabIndex: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileMenu: React.FunctionComponent<ProfileTabsProps> = ({
    activeTabIndex,
    setActiveTabIndex,
    setIsOpen,
    isOpen
}) => {

    const handleClose = () => {
        setIsOpen(!isOpen);
    }
    const handleButtonClick = (index: number) => {
        setActiveTabIndex(index)
        setIsOpen(false)
    }

    return (
        <div className='profile-menu'>
            <div className='flex justify-end pt-4 pr-4 cross-bar'>
                <X className="w-4 h-4 cursor-pointer" onClick={handleClose} />
            </div>
            <div className="profile-tabs min-w-[100px] flex flex-col justify-center items-start gap-6 px-6 py-5 rounded">
                {PROFILE_TABS.map((tab, index) => (
                    <button
                        key={tab.name}
                        onClick={() => handleButtonClick(index)}
                        className={`whitespace-nowrap flex gap-4 ${index === activeTabIndex && "text-primary"
                            }`}
                    >
                        <span className={`p-1 lg:block rounded-sm ${index === activeTabIndex && 'bg-primary'}`}>
                            <tab.icon className={`w-4 h-4 ${index === activeTabIndex && 'text-white'}`} />
                        </span>
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProfileMenu;