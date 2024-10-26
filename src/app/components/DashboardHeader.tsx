import { UserButton } from "@clerk/nextjs"



const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-md border-b flex justify-between items-center">
        <div></div>

        <div>
            <UserButton afterSignOutUrl="/"/>
        </div>

    </div>
  )
}

export default DashboardHeader
