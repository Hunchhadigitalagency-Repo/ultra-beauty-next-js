"use client";

import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GenericModal from "../../modals/generic-modal";

interface ConfirmationModalProps {
  onClose: () => void;
  message?: string; // dynamic message for success or error
  isError?: boolean; // true if it's an error
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, message, isError }) => {
  const isSuccess = !isError;

  return (
    <GenericModal
      title={isSuccess ? "Newsletter Confirmation" : "Subscription Error"}
      setIsOptionClick={onClose}
    >
      <div className="flex flex-col items-center gap-6 p-4">
        {/* Icon Section */}
        <div
          className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl py-8 px-10 w-full max-w-sm
          ${isSuccess ? "border-pink-300 bg-pink-50" : "border-red-300 bg-red-50"}`}
        >
          <div
            className={`p-5 rounded-full ${
              isSuccess ? "bg-pink-200" : "bg-red-200"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-12 h-12 text-pink-600" />
            ) : (
              <AlertCircle className="w-12 h-12 text-red-600" />
            )}
          </div>

          <p
            className={`text-md font-medium text-center ${
              isSuccess ? "text-pink-700" : "text-red-700"
            }`}
          >
            {message ||
              (isSuccess
                ? "Thank you for subscribing! Your email has been successfully added."
                : "Something went wrong. Please try again.")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-2">
          <Button
            variant="default"
            className="px-10 py-2 rounded-full text-base font-semibold"
            onClick={onClose}
          >
            OK
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary px-10 py-2 rounded-full font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </GenericModal>
  );
};

export default ConfirmationModal;
