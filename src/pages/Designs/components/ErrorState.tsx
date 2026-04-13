import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorState({ message, onRetry,extraClass }:{message:string,onRetry:()=>void,extraClass?:string}) {
  return (
    <div className={`w-full h-full flex items-center justify-center px-6 ${extraClass}`}>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative group w-full max-w-lg"
      >
        {/* 🔥 Glow */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-red-500/30 via-pink-500/20 to-purple-500/30 blur-lg opacity-60"></div>

        {/* Container */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.08)]">

          {/* Header */}
          <div className="flex  items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20">
              <AlertTriangle className="text-red-400" size={20} />
            </div>

            <div>
              <h2 className="text-white text-sm font-semibold">
                Something went wrong
              </h2>
              {/* <p className="text-xs text-gray-400">
                The design pipeline failed to complete
              </p> */}
            </div>
          </div>

          {/* Message */}
          <div className="text-sm text-gray-300 mb-4 leading-relaxed text-center">
            {message || "Unexpected error occurred while generating your design."}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 place-items-center place-content-center">
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm shadow hover:scale-105 transition cursor-pointer"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}