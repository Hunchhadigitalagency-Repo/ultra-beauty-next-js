"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { AlertCircle, Bell, X, Dot } from "lucide-react";
import SectionHeader from "../header/section-header";
import australis from "@/assets/australis.png";
import api from "@/services/api-instance";
import { updateCartAndWishlistCounts } from "@/lib/update-count";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useFetchData from "@/hooks/use-fetch";
import { useRouter } from "next/navigation";

export interface NotificationResponse {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  is_active: boolean;
  is_viewed: boolean;
}

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { notificationCount } = useAppSelector((state) => state.navbar);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useFetchData<NotificationResponse[]>(
    "/cms/notifications-views/",
    true
  );
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, data]);

  useEffect(() => {
    if (data && notificationCount > 0) {
      const id = data.map((not) => not.id);
      const handleView = async () => {
        const response = await api.post("/cms/notifications-views/", {
          notification_ids: id,
        });
        if (response.status === 201 || response.status === 200) {
          updateCartAndWishlistCounts(dispatch);
        }
      };
      handleView();
    }
  }, [data]);
  return (
    <div
      ref={modalRef}
      className="absolute w-[350px] md:w-[420px] lg:w-[450px] space-y-4 p-5 z-50 top-full right-4 sm:right-12 lg:right-16 
                 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 border-gray-200">
        <SectionHeader
          title="Notifications"
          titleClassName="!text-[25px] text-gray-800 "
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="h-60 flex flex-col w-full justify-center items-center">
          <p className="font-light text-sm text-gray-400">
            Loading Notifications...
          </p>
        </div>
      ) : error ? (
        /* Error State */
        <div className="h-60 flex flex-col w-full justify-center items-center text-center">
          <AlertCircle className="w-6 h-6 mb-2 text-red-500" />
          <p className="font-light text-sm text-red-500">
            Oops! Failed to load notifications.
          </p>
        </div>
      ) : !data || data.length === 0 ? (
        /* Empty State */
        <div className="h-60 flex flex-col w-full justify-center items-center">
          <Bell className="w-8 h-8 mb-2 text-gray-300" />
          <p className="font-light text-sm text-gray-400">
            No new notifications.
          </p>
        </div>
      ) : (
        /* Notifications List */
        <div className="max-h-[400px] overflow-y-auto space-y-1 -mx-5 px-5">
          {data.map((notification) => (
            <button
              key={notification.id}
              onClick={() => {
                notification.link && router.push(notification.link);
                onClose;
              }}
              className={`flex items-start justify-start gap-3 py-3 rounded-lg cursor-pointer transition-colors duration-150 relative ${
                notification.is_active
                  ? "bg-white hover:bg-gray-50"
                  : "bg-indigo-50/50 hover:bg-indigo-100"
              }`}
            >
              <div className="flex-shrink-0 flex justify-center items-center w-10 h-10 rounded-full overflow-hidden border border-gray-200 mt-0.5">
                <Bell />
              </div>

              <div className="fkex min-w-0">
                <h4
                  className={`text-sm font-semibold text-gray-800 ${
                    !notification.is_viewed && "text-indigo-700"
                  }`}
                >
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5 break-words">
                  {notification.description}
                </p>
              </div>

              {!notification.is_viewed && (
                <Dot className="absolute top-1 right-1 w-6 h-6 text-indigo-500 fill-indigo-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
