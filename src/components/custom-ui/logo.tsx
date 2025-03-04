import fraudwall_logo from "/assets/icon-256.png"


export default function Logo() {

    return (
        <>
            <img 
                src={fraudwall_logo}
                alt='FraudWall logo'
                className="object-contain w-5 h-5"
            />
        </>
    )
    
};
