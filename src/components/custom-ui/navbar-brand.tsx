import fraudwall_logo from "/assets/logo/fraudwall-logo.png"
import fraudwall_logo_white from "/assets/logo/logo_white_wall.png"


export default function NavBrand() {

    return (
        <div className="w-full flex items-center px-3">
            <picture className="">
                <img 
                    src={fraudwall_logo} 
                    alt="FraudWall brand logo" 
                    className="object-contain w-[10rem]  dark:hidden block"
                />
                <img 
                    src={fraudwall_logo_white} 
                    alt="FraudWall brand logo" 
                    className="object-contain w-[10rem] dark:block hidden"
                />
            </picture>
        </div>
    )
    
};
