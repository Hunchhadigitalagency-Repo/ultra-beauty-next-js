export const handleError = (error: any, toast: any) => {
  if (error.response) {
    if (error.response.status === 403) {
      toast.error("Access Denied", {
        description: "You do not have permission to perform this action.",
      });
    } else if (error.response.data) {
      const errorData = error.response.data;
      const errorKey = Object.keys(errorData)[0];
      const errorValue = errorData[errorKey];
      toast.error("Uh oh! Something went wrong.", {
        description: errorValue,
      });
    }
  } else {
    toast("Uh oh! Something went wrong.", {
      description: "There was a problem with your request.",
    });
  }
};
