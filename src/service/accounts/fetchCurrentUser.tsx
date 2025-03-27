import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/common/Type/UserRole.type";

interface DecodedToken {
  sub: string; // Assuming "sub" claim contains the user ID
  // Add other claims as needed
}

export type APIResponse = {
  message: string;
  data: UserType; // Ensure this matches the API response
  statusCode: number;
};

export type UserResponse = APIResponse; // No need for an extra `json` property





async function fetchCurrentUser(accessToken: string): Promise<UserResponse> {
  const decodedToken = jwtDecode(accessToken) as DecodedToken;
  const userId = decodedToken.sub; 

  const response = await axios.get<UserResponse>(`${API_BASE_URL}/api/users/${userId}`, {
    headers: {
      'content-type': "application/json",
      Authorization: `Bearer ${accessToken}`,
      'X-API-KEY': `${API_KEY}`
    },
  });

  return response.data;
}

export function useCurrentUser() {
  const { token: access } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(access as string),
    enabled: !!access, // Only run the query if accessToken exists,
    refetchOnWindowFocus: false,
  });
}
