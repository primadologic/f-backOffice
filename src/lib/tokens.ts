import Cookies from "js-cookie";

export const accessToken: string | undefined = Cookies.get('access');
export const refreshToken: string | undefined = Cookies.get('refresh');