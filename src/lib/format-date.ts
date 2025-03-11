import { format } from "date-fns"


export const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";

    return format(new Date(dateString), "iii, MMM dd, yyyy, pp")
}

export const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    return format(new Date(dateString), "iii, MMM dd, yyyy")
}