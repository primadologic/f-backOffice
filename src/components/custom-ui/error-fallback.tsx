import { useNavigateBack } from "@/hooks/useNavigateBack";
import { FallbackProps } from "react-error-boundary";
import { Button } from "../ui/button";

function ErrorFallback({ error }: FallbackProps) {

    const navigateBack = useNavigateBack();

    return (
        <div role="alert" className="flex flex-row min-h-svh w-full items-center justify-center">
            <div className="flex flex-row text-lg font-medium">
                <h2>Something went wrong.</h2> {' '}
                <p>{error.message}</p>
            </div>
            <br />
            <Button size={"default"} variant={"outline"} onClick={() => navigateBack}>Go Back</Button >
         
        </div>
    );
}

export default ErrorFallback;
