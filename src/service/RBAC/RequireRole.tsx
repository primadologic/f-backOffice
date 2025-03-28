import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "../accounts/fetchCurrentUser";
import { useNavigateBack } from "@/hooks/useNavigateBack";


interface RequireRoleProps {
    allowedRoles: string[];
    children: React.ReactNode;
    message?: string;
    guestRedirectPath?: string;
}

export default function RequireRole({ 
    allowedRoles, 
    children, 
    message = "Unauthorized access", 
    guestRedirectPath = '/forbidden' 
}: RequireRoleProps) {
    const navigate = useNavigate();
    const navigateBack = useNavigateBack();
    const { data: user, isLoading } = useCurrentUser();
    // const { isOpen, openDialog } = useAccessRoleStore();

    const userRoleName = user?.data?.role?.roleName?.toLowerCase() ?? "";

    useEffect(() => {
        // Skip checks while loading
        if (isLoading) return;

        // Check if user is authorized
        const isAuthorized = allowedRoles.some(role => 
            role.toLowerCase() === userRoleName
        );

        // Handle different unauthorized scenarios
        if (!user?.data) {

            navigate({ to: '/forbidden' });

            // No user data
            // if (!isOpen) {
            //     // openDialog("Unauthorized", message, () => navigate({ to: '/forbidden' }));
            //     navigate({ to: '/forbidden' });
            // }
        } else if (!isAuthorized) {
            // User exists but doesn't have required role
            if (userRoleName === 'guest') {
                // Redirect guests to their account profile
                navigate({ to: '/forbidden' });
            } else {

                navigate({ to: '/forbidden' });

                // Open unauthorized dialog for other unauthorized roles
                // if (!isOpen) {
                //     // openDialog("Unauthorized", message, () => navigate({ to: '/forbidden' }));
                //     navigate({ to: '/forbidden' });
                // }
            }
        }
    }, [
        userRoleName, 
        allowedRoles, 
        message, 
        navigateBack, 
        user, 
        isLoading, 
        navigate, 
        guestRedirectPath
    ]);

    // Skip rendering while loading
    if (isLoading) return null;

    // Check authorization for rendering
    const isAuthorized = allowedRoles.some(role => 
        role.toLowerCase() === userRoleName
    );

    // Prevent rendering if not authorized
    if (!user?.data || !isAuthorized) {
        // Automatically redirect guests
        if (userRoleName === 'guest') {
            navigate({ to: '/forbidden' });
        }
        return null;
    }

    return <>{children}</>;
}