import { useState, } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import DesignWithData from "./components/DesignWithData";
import Logo from "./Logo";
import DesignEmptyState from "./components/DesignWithoutData";
import { useDesign } from "../../hooks/useMyDesigns";
import ErrorState from "./components/ErrorState";
import Loader from "./Loader";


// Main Component
function Design() {
  const { id } = useParams();
  const{designInfo,gettingDesignInfo} = useDesign(id)

  const [processor, setProcessor] = useState({ designing: false, thinking: false });
  const [chatOpen, setChatOpen] = useState(true);

  const navigate = useNavigate()
  
  if (id && !designInfo && !gettingDesignInfo)
    return <ErrorState message={"Please select a valid design"} onRetry={() => navigate("/designs")} extraClass="pt-10" />
  
  if (gettingDesignInfo)
    return <Loader message={"Getting design info...."}/>

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 rounded-none">
        <div
          className="absolute inset-0 
        shadow-[inset_0_0_120px_rgba(168,85,247,0.18),inset_0_0_240px_rgba(236,72,153,0.12),0_0_80px_40px_rgba(168,85,247,0.16),0_0_160px_20px_rgba(0,206,209,0.08)]
      "
          style={{
            filter: "blur(1.5px) brightness(1.12)",
            transition: "filter 0.5s",
          }}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 blur-2xl opacity-60" />
      </div>

      <Logo />
      

      {!designInfo ||  !id ? (
        <DesignEmptyState
          processor={processor}
          setProcessor={setProcessor}
        
        />
      ) : (
        <DesignWithData data={designInfo} chatOpen={chatOpen} setChatOpen={setChatOpen} designId={id}/>
      )}
    </div>
  );
}

export default Design;