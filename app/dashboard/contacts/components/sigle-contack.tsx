"use client";
import React from "react";
import { IContact } from "@/types/cms";

interface Props {
  contact: IContact;
}

const SingleContact: React.FC<Props> = ({ contact }) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500">Full Name</p>
        <p className="font-medium">
          {contact.firstname} {contact.lastname}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{contact.email}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Subject</p>
        <p className="font-medium">{contact.subject}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Message</p>
        <p className="font-medium">{contact.message}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Created At</p>
        <p className="font-medium">{new Date(contact.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SingleContact;
