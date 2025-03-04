import React from "react"


export default function PageLayout({children}: {children: React.ReactNode}) {

    return (
        <>
            <section className="my-5">
                {children}
            </section>
        </>
    )
    
};
