import { useNavigate } from 'react-router-dom'

function Logo() {
    const navigate = useNavigate()
  return (
  <div className="absolute top-5 left-6 z-50 flex items-center gap-2">
        <div className="text-lg font-semibold tracking-wide cursor-pointer" onClick={()=>navigate("/")}>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
            Architekt
          </span>
          <span className="ml-1 text-white/80">AI</span>
        </div>
      </div>
  )
}

export default Logo
