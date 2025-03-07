import Cookies from "js-cookie";

export const accessToken = Cookies.get('access');
export const refreshToken = Cookies.get('refresh');