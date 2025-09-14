"use client";
import Image from "next/image";
import React, { useState } from "react";
import useFetchData from "@/hooks/use-fetch";
import OrderTable from "../Table/order-table";
import { useAppSelector } from "@/redux/hooks";
import ProfileModal from "./components/profile-modal";
import ShippingModal from "./components/shipping-modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShippingDetailsModal from "./components/shipping-details-modal";
import ProfileInformationLoader from "./components/profile-information-loader";
import ShippingInformationLoader from "./components/shipping-information-loader";
import {
  AuthProfileResponse,
  RecentOrdersResponseWithPagination,
} from "@/types/profile";

const MyProfile: React.FunctionComponent = () => {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showShippingDetailsModal, setShowShippingDetailsModal] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useFetchData<AuthProfileResponse>(`auth/profile/`, true);

  const {
    data: orderData,
    loading: isLoading,
    error: isError
  } = useFetchData<RecentOrdersResponseWithPagination>(`recent-orders/?page=${currentpage}`, true)

  const filtered_Order_Data = orderData?.results?.filter(
    (order) => order.order_details.length > 0
  );

  const { profile } = useAppSelector(
    (state) => state.authentication.profileDetails
  );
  const imgSource =
    data?.profile_picture !== null
      ? data?.profile_picture
      : profile?.profile_picture;

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="flex flex-col gap-8 bg-white">
      {/* Modals */}
      {showProfileModal && (
        <ProfileModal
          data={data}
          imageUrl={typeof imgSource === "string" ? imgSource : ""}
          onUpdate={refetch}
          onClose={() => setShowProfileModal(false)}
        />
      )}
      {showShippingDetailsModal && (
        <ShippingDetailsModal onClose={() => setShowShippingDetailsModal(false)} />
      )}
      {showShippingModal && (
        <ShippingModal onClose={() => setShowShippingModal(false)} />
      )}

      {/* Personal Information + Shipping */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-10">
        {/* Personal Information */}
        <div className="border border-[#E2E2E2] rounded-sm">
          <div className="flex items-center justify-between p-3">
            <p className="text-sm font-medium md:text-base">Personal Information</p>
            <button
              onClick={() => setShowProfileModal(true)}
              className="text-sm cursor-pointer text-primary md:text-base"
            >
              Change
            </button>
          </div>
          {
            loading ? (
              <ProfileInformationLoader />
            ) : error ? (
              <div className="border-t p-4 flex justify-center items-center h-35 text-red-500">
                Something Went Wrong While Fetching Profile ...
              </div>
            ) : (
              <div className="border-t p-4 flex gap-4">
                <div className="relative w-20 h-20">
                  {
                    imgSource && (
                      <Image
                        src={typeof imgSource === "string" ? imgSource : ""}
                        alt="Profile"
                        fill
                        className="object-cover rounded-full"
                      />
                    )
                  }
                </div>
                <div className="flex flex-col gap-1.5">
                  {
                    data?.first_name && data?.last_name && <p className="text-lg font-semibold text-primary">
                      {data?.first_name + " " + data?.last_name}
                    </p>
                  }
                  {
                    data?.email && <p className="text-sm font-medium">{data?.email}</p>
                  }
                  {
                    data?.phone_number && (
                      <p className="text-sm font-medium">
                        Phone: {data?.phone_number}
                      </p>
                    )
                  }
                  {
                    data?.address && (
                      <p className="text-sm font-medium text-[#5D5D5D]">
                        Address: {data?.address}
                      </p>
                    )
                  }
                </div>
              </div>
            )}
        </div>

        {/* Shipping Details */}
        <div className="border border-[#E2E2E2] rounded-sm">
          <div className="flex items-center justify-between p-3">
            <p className="flex items-center gap-3 text-sm font-medium md:text-base">
              Shipping Details
              <span className="text-[#7C7C7C] font-normal text-xs md:text-base uppercase">
                default address
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowShippingDetailsModal(true)}
                className="text-sm cursor-pointer text-primary md:text-base"
              >
                View
              </button>
              <button
                onClick={() => setShowShippingModal(true)}
                className="text-sm cursor-pointer text-primary md:text-base"
              >
                Change
              </button>
            </div>
          </div>
          {loading ? (
            <ShippingInformationLoader />
          ) : error ? (
            <div className="border-t p-4 flex justify-center items-center h-35 text-red-500">
              Something Went Wrong While Fetching Shipping ...
            </div>
          ) : (
            <div className="border-t p-4 flex flex-col gap-1.5">
              {
                data?.first_name && data?.last_name && <p className="text-lg font-semibold text-primary">
                  {data?.first_name + " " + data?.last_name}
                </p>
              }
              {
                data?.email && <p className="text-sm font-medium">{data?.email}</p>
              }
              {
                data?.phone_number && (
                  <p className="text-sm font-medium">
                    Phone: {data?.phone_number}
                  </p>
                )
              }
              {
                data?.address && (
                  <p className="text-sm font-medium">
                    Address: {data?.address}
                  </p>
                )
              }
            </div>
          )
          }
        </div>
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-medium text-primary">Recent Orders</h1>
        <OrderTable
          isLoading={isLoading}
          isError={isError}
          data={filtered_Order_Data}

        />

        {/* Pagination */}
        {orderData && orderData.total_pages > 1 && (
          <div className="flex justify-end gap-2 mt-4 items-center">
            <button
              disabled={currentpage === 1}
              onClick={() => handlePagination(currentpage - 1)}
              className="px-2 py-1 border rounded-md disabled:opacity-30"
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: orderData.total_pages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-2 py-1 border rounded ${pageNum === orderData.current_page
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentpage === orderData.total_pages}
              onClick={() => handlePagination(currentpage + 1)}
              className="px-2 py-1 border rounded disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
