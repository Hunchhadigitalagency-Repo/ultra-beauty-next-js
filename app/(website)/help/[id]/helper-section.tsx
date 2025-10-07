"use client";
import React from "react";
import DOMPurify from "dompurify";
import { AlertCircle } from "lucide-react";
import useFetchData from "@/hooks/use-fetch";
import { useParams, useRouter } from "next/navigation";
import { HelpAndSupport } from "@/types/help-and-support";
import SectionHeader from "@/components/common/header/section-header";

const Helper: React.FunctionComponent = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetchData<HelpAndSupport>(
    `help-and-support/${id}`
  );
  const router = useRouter();

  return (
    <section className="space-y-6 padding">
      {/* Header */}
      <SectionHeader
        title={data?.name || "-"}
        description={data?.description}
        titleClassName="text-primary"
        descriptionClassName="line-clamp-1"
      />
      {/* Items */}
      {loading ? (
        <p className="text-base font-medium">Loading data...</p>
      ) : error ? (
        <div className="flex flex-col py-10 justify-center items-center">
          <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
          <p className="font-medium text-gray-700">
            Oops! Something went wrong.
          </p>
        </div>
      ) : (
        <div className="gap-2 p-5 border border-gray-300 rounded-md">
          <p className="text-xl font-semibold text-foreground">{data?.name}</p>
          <ul className="py-5 pl-5 text-sm list-disc font-poppins text-primary">
            <li
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.steps || ""),
              }}
            />
          </ul>
        </div>
      )}
      {/* button */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/contact")}
          className="w-1/4 h-12 text-white rounded-full cursor-pointer bg-primary"
        >
          For any confusion contact us
        </button>
      </div>
    </section>
  );
};

export default Helper;
