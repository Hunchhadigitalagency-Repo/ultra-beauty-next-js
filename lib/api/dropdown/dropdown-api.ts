import api from "@/services/api-instance";

export const getBlogCategories = async (page: number, search?: string) => {
  const response = await api.get(
    `/cms/blog-categories/dropdown/?page=${page}&page_size=10&search_name=${
      search || ""
    }`
  );
  return response.data;
};

export const getUsersDropdown = async (page: number, search?: string) => {
  const response = await api.get(
    `/auth/users/dropdown/?page=${page}&page_size=10&search_name=${
      search || ""
    }`
  );
  return response.data;
};

export const getCategoriesDropdown = async (page: number, search?: string) => {
  const response = await api.get(
    `/categories/?page=${page}&page_size=10&search_name=${search || ""}`
  );
  return response.data;
};

export const getTaxesDropdown = async (page: number, search?: string) => {
  const response = await api.get(
    `/taxes/dropdown/?page=${page}&page_size=10&search_name=${search || ""}`
  );
  return response.data;
};

export const getProductsDropdown = async (page: number, search?: string) => {
  const response = await api.get(
    `/products/dropdown/?page=${page}&page_size=10&search_product=${search || ""}`
);
  return response.data;
};

export const getBrandsDropdown = async (page: number, search?: string) => {
const response = await api.get(`/brand-dropdown/?page=${page}&page_size=10&search_name=${search || ""}`);
  return response.data;
}

export const getInventoryLocationDropdown = async (page: number, search?: string) => {
  const response = await api.get(
    `/inventory-dropdown/?page=${page}&page_size=10&search_name=${search || ""}`
  );
  return response.data;
}