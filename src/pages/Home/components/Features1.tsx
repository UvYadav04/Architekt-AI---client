import { motion } from "framer-motion";

const steps = [
  "Planning",
  "Connection Mapping",
  "Evaluation",
  "Refinement",
  "Graph Generation",
  "Final Evaluation",
];

export default function Feature1() {
  return (
    <section className="bg-transparent text-white xl:py-32 lg:py-24 md:py-16 py-10 xl:px-0 lg:px-8 md:px-6 px-4">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* 🧾 LEFT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Built on a <span className="text-gray-400">Multi-Agent System</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-lg">
            Our system doesn’t just generate architectures — it thinks through them.
            Each step is planned, evaluated, refined, and streamed in real-time,
            ensuring high-quality system designs every time.
          </p>

          <div className="mt-8 space-y-3 text-sm text-gray-500">
            <p>• Structured reasoning pipeline</p>
            <p>• Continuous evaluation & refinement</p>
            <p>• Real-time state streaming</p>
          </div>
        </div>

        {/* ⚙️ RIGHT (Pipeline Animation) */}
        <div className="relative">
          <div className="flex flex-col gap-4">

            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0.3, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.5,
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between"
              >
                <span className="text-sm">{step}</span>

                {/* status dot */}
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-green-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.3,
                  }}
                />
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}