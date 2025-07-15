"use client"
import PartnerCompanyForm from "../components/partner-company-form";
import { useAppSelector } from "@/redux/hooks";
import { IPartnerCompany } from "@/types/cms";

const EditPartnerCompanyPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <PartnerCompanyForm initialData={selectedData as IPartnerCompany} />
    </div>
  );
};

export default EditPartnerCompanyPage;
