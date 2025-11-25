import { Metadata } from "next";
/* import Links from "../../components/links";
import Footer from "../../components/footer"; */


export const metadata:Metadata = {
  title: "layout y template",
  description: "Demo layaout y templates"
}

interface DashboardLayoutprops {
  children: React.ReactNode
}

export default function AuthLayout({children}: DashboardLayoutprops){
  return(
  <div className="flex flex-col min-h-screen" >
      <div>
        {children}
      </div>
  </div>
  )
}
