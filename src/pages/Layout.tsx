// layout/MainLayout.tsx
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
      <div className="min-h-screen bg-black text-white">
                      <div className="fixed h-full w-full inset-0 bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px]" />
      <main> 
        <Outlet />
      </main>
    </div>
  )
}