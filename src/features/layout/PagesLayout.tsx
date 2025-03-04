import React from "react"


export default function PageLayout({children}: {children: React.ReactNode}) {

    return (
        <>
            <section className="">
                {children}
            </section>
        </>
    )
    
};
