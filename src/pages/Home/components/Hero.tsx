    import { motion } from "framer-motion";
    import ReactFlow from "../../Designs/ReactFlow";
    import { initialEdges, initialNodes } from "../../../initialData";
import useUserInfo from "../../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
    return (
        <section className="relative w-full lg:min-h-screen h-fit text-white overflow-hidden ">

        {/* 🌌 Background Grid */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px]" /> */}

        {/* 🔲 Container */}
        <div className="relative max-w-7xl  mx-auto  lg:px-8 md:px-8  px-10 xl:py-16 lg:py-28 md:py-28 py-28 grid lg:grid-cols-2 gap-10 items-center lg:h-screen h-fit">

            {/* 📝 LEFT SIDE */}
         
<div className="flex flex-col justify-center max-w-[600px]">

  {/* Heading */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="font-semibold leading-snug text-[clamp(2rem,4vw,3rem)]"
  >
    Design Scalable Systems
    <span className="block text-gray-400">
      Faster, Visual, AI-powered
    </span>
  </motion.h1>

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-[clamp(1rem,2vw,1.5rem)] space-y-4 text-gray-400 text-[clamp(0.9rem,1.2vw,1.05rem)]"
  >
    <p>
      Stop juggling diagrams, docs, and guesswork. Build complete system
      architectures visually with intelligent agents guiding every step.
    </p>

    <p>
      From high-level ideas to production-ready designs — explore flows,
      validate decisions, and iterate instantly without breaking your
      mental model.
    </p>

    <p className="text-gray-500 lg:block hidden">
      Perfect for system design prep, real-world architecture planning,
      and collaborative thinking.
    </p>
  </motion.div>

  {/* Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mt-[clamp(1.5rem,3vw,2rem)] flex flex-wrap gap-3 sm:gap-4"
  >
    <button onClick={()=>navigate("/new-design")} className="bg-white cursor-pointer text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm font-medium hover:scale-105 transition">
      Get Started
    </button>

    
   {userInfo?.designsCreated === 0 || !userInfo ?   <button className="cursor-pointer border border-gray-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm hover:bg-white/10 transition" onClick={()=>navigate("/new-design")}>
      Create First System
    </button> : <button  onClick={()=>navigate("/designs")} className="border cursor-pointer border-gray-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm hover:bg-white/10 transition">
      My Designs
    </button>}
  </motion.div>

</div>


            <div className="w-full  place-items-end flex items-end h-full  xl:relative absolute right-0 top-0 z-0 lg:opacity-100 md:opacity-50 opacity-20 overflow-visible " >


            <ReactFlow
                initialEdges={initialEdges}
                initialNodes={initialNodes}
                hero={true}
            />
            </div>

            </div>
            
            
        </section>
    );
    }