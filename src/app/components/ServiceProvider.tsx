import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"


const ServiceProvider = ({children}: {children:ReactNode}) => {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
)
}

export default ServiceProvider