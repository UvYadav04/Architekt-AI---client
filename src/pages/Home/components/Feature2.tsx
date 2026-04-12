import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const question = "Why use an API Gateway?";
const answer =
  "An API Gateway acts as a single entry point for clients. It handles authentication, routing, rate limiting, and aggregation — reducing complexity in your services while improving scalability and security.";

export default function FeatureChat() {
  const [typedQ, setTypedQ] = useState("");
  const [typedA, setTypedA] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let qIndex = 0;
    let aIndex = 0;

    setTypedQ("");
    setTypedA("");
    setShowAnswer(false);

    // TYPE QUESTION
    const qInterval = setInterval(() => {
      qIndex++;
      setTypedQ(question.slice(0, qIndex));

      if (qIndex >= question.length) {
        clearInterval(qInterval);

        setTimeout(() => {
          setShowAnswer(true);

          // TYPE ANSWER
          const aInterval = setInterval(() => {
            aIndex++;
            setTypedA(answer.slice(0, aIndex));

            if (aIndex >= answer.length) {
              clearInterval(aInterval);

              // restart loop
              setTimeout(() => {
                setCycle((prev) => prev + 1);
              }, 2500);
            }
          }, 20);
        }, 600);
      }
    }, 40);

    return () => clearInterval(qInterval);
  }, [cycle]);

  useEffect(() => {
    if (!showAnswer) return;

    let aIndex = 0;

    const typeAnswer = setInterval(() => {
      setTypedA(answer.slice(0, aIndex));
      aIndex++;

      if (aIndex > answer.length) {
        clearInterval(typeAnswer);

        // restart loop
        setTimeout(() => {
          setTypedQ("");
          setTypedA("");
          setShowAnswer(false);
        }, 2500);
      }
    }, 20);

    return () => clearInterval(typeAnswer);
  }, [showAnswer]);

  return (
    <section className=" text-white py-32 xl:px-0 lg:px-8 md:px-6 px-4">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

     <div className="relative w-full max-w-xl mx-auto">

      {/* Chat container */}
      <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-4 backdrop-blur">

        {/* INPUT */}
   

        {/* ANSWER */}
   <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex items-center">

  {/* LOADING STATE */}
  {!showAnswer && (
    <div className="w-full flex items-center justify-center">

      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        <DotLottieReact
          src="chatbot.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

    </div>
  )}

  {/* ANSWER STATE */}
  {showAnswer && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-black/60 border min-h-full border-gray-800 rounded-md p-3 sm:p-4 text-sm sm:text-base text-gray-300 leading-relaxed"
    >
      <span>
        {typedA}
        <span className="animate-pulse">|</span>
      </span>
    </motion.div>
  )}

</div>
     <div className="border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 mb-4 flex items-center gap-2">

          <span className="flex-1">
            {typedQ}
            <span className="animate-pulse">|</span>
          </span>
        </div>
      </div>
              </div>
              

              
        <div className="w-full ">

          {/* Heading */}
          <h2 className=" text-4xl md:text-5xl font-semibold leading-tight group cursor-default">
            <span className="inline-block text-white transition group-hover:text-gray-400">
              Design
            </span>{" "}
            <span className="inline-block text-gray-400 transition group-hover:text-white">
              Talks!!
            </span>
          </h2>

          {/* Content */}
          <div className=" mt-6 space-y-4 text-gray-400 w-full text-base leading-relaxed">

            <p className="">
              Your system isn’t just a diagram — it’s something you can talk to. Ask questions, explore decisions, and understand every component like you would with a real engineer.
            </p>

            <p>
              Query why a service exists, how scaling works, or what happens
              under load. The system responds instantly with clear, contextual
              explanations.
            </p>

            <p className="text-gray-500">
              Learn faster, debug smarter, and build with confidence — all
              through conversation.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}