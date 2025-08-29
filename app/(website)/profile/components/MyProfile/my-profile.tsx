import Image from "next/image";
import React, { useState } from "react";
import useFetchData from "@/hooks/use-fetch";
import OrderTable from '../Table/order-table';
import { useAppSelector } from "@/redux/hooks";
import ProfileModal from "./components/profile-modal";
import ShippingModal from "./components/shipping-modal";
import ShippingDetailsModal from "./components/shipping-details-modal";
import ProfileInformationLoader from "./components/profile-information-loader";
import ShippingInformationLoader from "./components/shipping-information-loader";
import { AuthProfileResponse, RecentOrdersResponseWithPagination } from "@/types/profile";

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

  const filtered_Order_Data = orderData?.results?.filter(order => order.order_details.length > 0);

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
          <div className="flex items-center justify-between p-3">
            <p className="text-sm font-medium md:text-base">
              Personal Information
            </p>
            <button
              onClick={toggleProfileModal}
              className="text-sm cursor-pointer text-primary md:text-base"
            >
              Change
            </button>
          </div>

          {loading ? (
            <ProfileInformationLoader />
          ) : error ? (
            <div className="border-t border-[#CFCECE] p-4 flex justify-center items-center h-35">
              <p className="text-sm font-medium tracking-wide text-center text-red-500">
                Something Went Wrong While Fetching Shipping Details ...
              </p>
            </div>
          ) : (
            <div className="border-t border-[#CFCECE] p-4 flex gap-4">
              <div className="flex items-center justify-center">
                <div className="relative w-20 h-20 ">
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
                <p className="text-lg font-semibold text-primary">
                  {data?.first_name + " " + data?.last_name}
                </p>
                <p className="text-sm font-medium">{data?.email}</p>
                <p className="text-sm font-medium">
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
          <div className="flex items-center justify-between p-3">
            <p className="flex items-center gap-3 text-sm font-medium md:text-base">
              Shipping Details
              <span className="text-[#7C7C7C] font-normal text-xs md:text-base uppercase">
                default address
              </span>
            </p>
            <div className="flex gap-2 md:gap-3 lg:gap-5">
              <button
                onClick={toggleShippingDetailsModal}
                className="text-sm cursor-pointer text-primary md:text-base"
              >
                View
              </button>
              <button
                onClick={toggleShippingModal}
                className="text-sm cursor-pointer text-primary md:text-base"
              >
                Change
              </button>
            </div>
          </div>

          {loading ? (
            <ShippingInformationLoader />
          ) : error ? (
            <div className="border-t border-[#CFCECE] p-4 flex justify-center items-center h-35">
              <p className="text-sm font-medium tracking-wide text-center text-red-500">
                Something Went Wrong While Fetching Shipping Details ...
              </p>
            </div>
          ) : (
            <div className="border-t border-[#CFCECE] p-4 flex flex-col gap-1.5">
              <p className="text-lg font-semibold text-primary">
                {data?.first_name + " " + data?.last_name}
              </p>
              <p className="text-sm font-medium">{data?.email}</p>
              <p className="text-sm font-medium">
                {data?.phone_number ? data?.phone_number : "N/A"}
              </p>
              <p className="text-sm font-medium">
                {data?.address ? data?.address : "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Recent Orders */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-medium text-primary">Recent Orders</h1>
        <OrderTable isLoading={orderLoading} isError={orderError} data={filtered_Order_Data} />
      </div>
    </section>
  );
};

export default MyProfile;
