import React, { useEffect, useState } from "react";
import Profile from "./Profile-form";
import SeoForm from "../seo/Seo-form";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { getCompanyProfile } from "@/lib/company-profile";
import { getSeo } from "@/lib/api/settings/seo-api";
import { Spinner } from "@/components/ui/spinner";

const CombinedSeoProfileForm = () => {
  const [seoData, setSeoData] = useState();
  const [profileData, setprofileData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      try {
        const [seo, profile] = await Promise.all([
          getSeo(),
          getCompanyProfile(),
        ]);
        console.log("seo", seo, "profile", profile);

        setSeoData(seo?.data?.results?.[0]);
        setprofileData(profile.company);
      } catch (error) {
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(seoData, profileData);
if(loading) return <p className="w-full flex justify-center items-center min-h-[50vh]"><Spinner className="w-6 h-6"/></p>
  return (
    <div className="flex flex-col gap-10 bg-white">
      <Profile initialData={profileData || null} />
      <hr className="mx-3"/>
      <SeoForm initialData={seoData || null} />
    </div>
  );
};

export default CombinedSeoProfileForm;
