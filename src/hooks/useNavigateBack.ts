import { useRouter } from "@tanstack/react-router";


export const useNavigateBack = () => {

    const router = useRouter();
    
    const goBack = () => {
        router.history.back();
    }

    return goBack;

}