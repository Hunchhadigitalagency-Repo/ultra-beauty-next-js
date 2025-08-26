import React, { useState } from "react";
import Image from "next/image";
import OrderTable from '../Table/order-table';
import ProfileModal from "./components/profile-modal";
import ShippingDetailsModal from "./components/shipping-details-modal";
import ShippingModal from "./components/shipping-modal";
import useFetchData from "@/hooks/use-fetch";
import { AuthProfileResponse, RecentOrdersResponseWithPagination } from "@/types/profile";
import { useAppSelector } from "@/redux/hooks";
import ProfileInformationLoader from "./components/profile-information-loader";
import ShippingInformationLoader from "./components/shipping-information-loader";

const MyProfile: React.FunctionComponent = () => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showShippingModal, setShowShippingModal] = useState<boolean>(false);
  const [showShippingDetailsModal, setShowShippingDetailsModal] =
    useState<boolean>(false);

  const toggleProfileModal = () => {
    setShowProfileModal((prev) => !prev);
  };

  const toggleShippingModal = () => {
    setShowShippingModal((prev) => !prev);
  };

  const toggleShippingDetailsModal = () => {
    setShowShippingDetailsModal((prev) => !prev);
  };

  const { data, loading, error, refetch } = useFetchData<AuthProfileResponse>(`auth/profile`, true);
  const { data: orderData, error: orderError, loading: orderLoading } = useFetchData<RecentOrdersResponseWithPagination>(`recent-orders`, true);

  const { profile } = useAppSelector(
    (state) => state.authentication.profileDetails
  );
  const imgSource =
    data?.profile_picture !== null
      ? data?.profile_picture
      : profile?.profile_picture;

  return (
    <section className="flex flex-col gap-8 bg-white">
      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          data={data}
          imageUrl={typeof imgSource === "string" ? imgSource : ""}
          onUpdate={refetch}
          onClose={toggleProfileModal}
        />
      )}

      {/* Shipping Details Modal */}
      {showShippingDetailsModal && (
        <ShippingDetailsModal onClose={toggleShippingDetailsModal} />
      )}

      {/* Shipping Modal */}
      {showShippingModal && <ShippingModal onClose={toggleShippingModal} />}

      <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-10">
        {/* Personal Information */}
        <div className="border border-[#E2E2E2] rounded-sm">
          <div className="flex justify-between items-center p-3">
            <p className="font-medium text-sm md:text-base">
              Personal Information
            </p>
            <button
              onClick={toggleProfileModal}
              className="text-primary cursor-pointer text-sm md:text-base"
            >
              Change
            </button>
          </div>

          {loading ? (
            <ProfileInformationLoader />
          ) : error ? (
            <div className="border-t border-[#CFCECE] p-4 flex justify-center items-center h-35">
              <p className="text-sm font-medium text-center text-red-500 tracking-wide">
                Something Went Wrong While Fetching Shipping Details ...
              </p>
            </div>
          ) : (
            <div className="border-t border-[#CFCECE] p-4 flex gap-4">
              <div className="flex justify-center items-center">
                <div className=" relative w-20 h-20">
                  {imgSource && (
                    <Image
                      src={typeof imgSource === "string" ? imgSource : ""}
                      alt="Profile"
                      layout="fill"
                      className="object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-primary font-semibold text-lg">
                  {data?.first_name + " " + data?.last_name}
                </p>
                <p className="font-medium text-sm">{data?.email}</p>
                <p className="font-medium text-sm">
                  Phone: {data?.phone_number ? data?.phone_number : "N/A"}
                </p>
                <p className="font-medium text-sm text-[#5D5D5D]">
                  Address: {data?.address ? data?.address : "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Details */}
        <div className="border border-[#E2E2E2] rounded-sm">
          <div className="flex justify-between items-center p-3">
            <p className="font-medium text-sm md:text-base flex items-center gap-3">
              Shipping Details
              <span className="text-[#7C7C7C] font-normal text-xs md:text-base uppercase">
                default address
              </span>
            </p>
            <div className="flex gap-2 md:gap-3 lg:gap-5">
              <button
                onClick={toggleShippingDetailsModal}
                className="text-primary cursor-pointer text-sm md:text-base"
              >
                View
              </button>
              <button
                onClick={toggleShippingModal}
                className="text-primary cursor-pointer text-sm md:text-base"
              >
                Change
              </button>
            </div>
          </div>

          {loading ? (
            <ShippingInformationLoader />
          ) : error ? (
            <div className="border-t border-[#CFCECE] p-4 flex justify-center items-center h-35">
              <p className="text-sm font-medium text-center text-red-500 tracking-wide">
                Something Went Wrong While Fetching Shipping Details ...
              </p>
            </div>
          ) : (
            <div className="border-t border-[#CFCECE] p-4 flex flex-col gap-1.5">
              <p className="text-primary font-semibold text-lg">
                {data?.first_name + " " + data?.last_name}
              </p>
              <p className="font-medium text-sm">{data?.email}</p>
              <p className="font-medium text-sm">
                {data?.phone_number ? data?.phone_number : "N/A"}
              </p>
              <p className="font-medium text-sm">
                {data?.address ? data?.address : "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Recent Orders */}
      <div className="flex flex-col gap-3">
        <h1 className="text-primary font-medium text-xl">Recent Orders</h1>
        <OrderTable isLoading={orderLoading} isError={orderError} data={orderData?.results} />
      </div>
    </section>
  );
};

export default MyProfile;
