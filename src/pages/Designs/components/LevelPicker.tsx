import { useState, useRef } from "react";

const LEVELS = [
  { label: "Low", value: "beginner" },
  { label: "Med", value: "intermediate" },
  { label: "High", value: "advanced" }
];

export default function LevelPicker({
  level,
  setLevel,
}: {
  level: "beginner" | "intermediate" | "advanced";
  setLevel: (level: "beginner" | "intermediate" | "advanced") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const activeIndex = LEVELS.findIndex(l => l.value === level);

  return (
    <div
      ref={ref}
      className="relative ml-2 flex place-content-center "
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
   {!open &&    <button
        onClick={() => setOpen(prev => !prev)}
        className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md hover:bg-white/10 transition"
      >
        {LEVELS[activeIndex].label}
      </button>}

      {/* Centered Expand */}
      {open && (
       <div
  className="
    absolute right-0
    top-1/2 -translate-y-1/2
    flex flex-col items-center
    bg-white/5 border border-white/10
    rounded-full py-1
    backdrop-blur-xl

    shadow-[0_0_10px_rgba(168,85,247,0.25),0_0_25px_rgba(168,85,247,0.15)]
    
    transition-all duration-200
  "
>
          {LEVELS.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setLevel(item.value as "beginner" | "intermediate" | "advanced");
                setOpen(false);
              }}
              className={`
                 px-2 py-1 text-sm w-full text-center transition
                ${level === item.value
                  ? "text-white"
                  : "text-white/50 hover:text-white"}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}