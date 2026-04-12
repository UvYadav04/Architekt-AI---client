import{ useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
import ErrorState from "./ErrorState";
import LevelPicker from "./LevelPicker";
import useUserInfo from "../../../hooks/useUserInfo";

type levels = "beginner" | "intermediate" | "advanced"

export default function DesignEmptyState({
  processor,
  setProcessor
}: {
    processor: { designing: boolean; thinking: boolean },
  setProcessor:Dispatch<SetStateAction<{thinking:boolean,designing:boolean}>>
  }) {
  const{userInfo} = useUserInfo()
const [phase, setPhase] = useState<string>("Initialized");
  const [query, setQuery] = useState("");
  const[level,setLevel] = useState<levels>("intermediate")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

    const fetchStreamingQuery = async () => {
        try {
            if (processor.designing) return;
            if(!userInfo)
            {
                toast.info("Please login to create a design.")
                return
            }
      setProcessor((prev) => ({ ...prev, designing: true }));
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/design/create-design`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify({
          query: query,
          level: level,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.message || "Failed to collect data, please try again.");
      }

      if (!response.body) throw new Error("No response body from server.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
          const chunk = decoder.decode(value, { stream: true });
        console.log(chunk)
        if (chunk) {
          try {
            const parsed = JSON.parse(chunk);
            if (parsed.type === "phase") {
              if (parsed?.data) setPhase(parsed.data);
            } else if (parsed.type === "final") {
              const type = parsed?.data?.type
              console.log(type)
              if (type === "error")
                    setError("Failed to design at the moment, please try again after sometime.")
              else {
                  const designId = parsed?.data?.designId
                  if(designId)
                      navigate(`/design/${designId}`)
                    else
                    navigate(`/designs`)
                }
              console.log(parsed);
            } else if (parsed.type === "error") {
              setError(JSON.stringify(parsed?.data?.message) || "Failed to generate design at the moment")
            }
          } catch (err) {
            // Ignore chunks that are not JSON
            console.log(chunk);
          }
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.info(err?.message || "Failed");
    } finally {
      setProcessor((prev) => ({ ...prev, designing: false }));
    }
  };
  if(error)
    return <ErrorState message={error} onRetry={() => navigate(0)} />

  return (
    <div className="w-full h-full flex items-center justify-center z-10 relative">
      <div className="w-full max-w-xl px-6">
        <div className="relative group w-full max-w-2xl mx-auto">

          {/* Subtle Glow */}
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-purple-500/60 via-pink-500/50 to-blue-500/60 opacity-80 blur-lg transition duration-500 pointer-events-none"></div>

          {/* Container */}
         <div className="relative flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 min-h-[60px] shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all">

  {/* 🔄 Processing State */}
  {processor.designing ? (
    <div className="flex items-center gap-3 w-full text-sm text-gray-300">

      {/* Animated Dot */}
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
      </div>

      {/* Stage Text */}
      <span className="animate-pulse">
        {phase}
      </span>

      {/* Optional shimmer line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[pulse_2s_infinite]" />

    </div>
  ) : (
    <div className="flex w-full gap-2 place-content-between place-items-center">
      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            fetchStreamingQuery();
          }
        }}
        placeholder="What do you want to design today?"
        className="flex-1 outline-none text-[15px] text-white placeholder:text-gray-400 "
                                  />
                                  <LevelPicker level={level} setLevel={setLevel} />
 

      {/* Button */}
      <button
        onClick={fetchStreamingQuery}
        className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white shadow-sm hover:scale-105 transition"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}