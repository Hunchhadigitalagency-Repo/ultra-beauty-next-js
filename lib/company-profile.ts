
import apiBase from "@/services/api-base-instance";

export const getCompanyProfile = async () => {
  try {
    const [companyResponse, seoResponse] = await Promise.all([
      apiBase.get("/company-profiledropdown/"),
      apiBase.get("/seo-dropdown/"),
    ]);

    const company = companyResponse.data;
    const seo = Array.isArray(seoResponse.data) && seoResponse.data.length > 0
      ? seoResponse.data[0]
      : null;

    return {
      company,
      seo,
    };
  } catch (error) {
    console.error("Failed to fetch company profile or SEO:", error);
    return {
      company: null,
      seo: null,
    };
  }
};