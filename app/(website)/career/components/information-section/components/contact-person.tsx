import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoLogoLinkedin } from "react-icons/io";


interface ContactItemProps {
    name: string;
    position: string;
    image: string;
    link?: string;
}

const ContactPerson: React.FunctionComponent<ContactItemProps> = ({ name, position, image, link }) => {

    return (
        <div className="flex items-center justify-start gap-5 text-center">
            <div className="relative w-20 h-20">
                <Image src={image} alt="" fill className="object-cover rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-start">
                <h4 className="text-lg font-playfair text-primary font-semibold">
                    {name}
                </h4>
                <p className="text-xs sm:text-sm text-custom-black">
                    {position}
                </p>
                <Link
                    href={`${link}`}
                    className="flex gap-2"
                >
                    <IoLogoLinkedin className="w-5 h-5 text-primary" />
                    <p className="text-sm hover:underline">
                        Connect to Linkedln
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default ContactPerson;
