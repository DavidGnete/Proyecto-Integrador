import { Metadata } from "next";
import Links from "@/components/links";




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
          <script src="https://upload-widget.cloudinary.com/latest/global/all.js"
        type="text/javascript" />
        
      <div className="relative z-0">
        {children}
      </div>

      <div className="relative z-50">
    <Links />
    </div>
  </div>
  )
}
