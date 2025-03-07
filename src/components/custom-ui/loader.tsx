import { Oval } from "react-loader-spinner";


export default function Loader() {

    return (
        <Oval 
            visible={true}
            height="20"
            width="20"
            strokeWidth={4}
            color="#fff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />  
    )
    
};
