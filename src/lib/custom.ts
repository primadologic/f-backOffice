import { format } from "date-fns"

export const formatDateTime = (dateString?: string) => {
    if (dateString === null || dateString === undefined) return "N/A";
  
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "N/A"; // Invalid date
      }
      return format(date, "iii, MMM dd, yyyy, pp");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

export const formatDate = (dateString: string) => {
    if (dateString === null || dateString === undefined) return "N/A";

    return format(new Date(dateString), "iii, MMM dd, yyyy")
}


export const maskNumber = (phone: any) => {
    if (phone === null || phone === undefined) return "N/A";
    return phone.replace(/(\d{3})\d{4}(\d{3})$/, "$1****$2");
  };