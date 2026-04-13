import Logo from './Logo';

function Loader({message}:{message:string}) {
return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br animate-fade-in">
        <Logo/>
        <div className="relative flex flex-col items-center">
          <svg className="w-24 h-24 animate-spin-slow text-purple-400 drop-shadow-lg" viewBox="0 0 100 100">
            <circle
              className="opacity-30"
              cx="50"
              cy="50"
              r="30"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
            />
            <path
              d="M50 20 a30 30 0 0 1 0 60 a30 30 0 0 1 0 -60"
              stroke="#a855f7"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              className="animate-spin-dash"
            />
          </svg>
          <span className="mt-8 text-lg text-purple-200 font-semibold animate-pulse">{message}</span>
        </div>
        <style>
          {`
            @keyframes spin-slow {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
            @keyframes spin-dash {
              0% { stroke-dasharray: 15, 200; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
              100% { stroke-dasharray: 15, 200; stroke-dashoffset: -125; }
            }
            .animate-spin-slow {
              animation: spin-slow 1.6s linear infinite;
            }
            .animate-spin-dash {
              animation: spin-dash 1.6s ease-in-out infinite;
            }
            .animate-fade-in {
              animation: fadeInBg 0.5s;
            }
            @keyframes fadeInBg {
              from { opacity: 0 }
              to { opacity: 1 }
            }
          `}
        </style>
      </div>
    );
}

export default Loader
