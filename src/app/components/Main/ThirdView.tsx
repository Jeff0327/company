import { motion } from "framer-motion";

function ThirdView() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white py-20 text-pretendard">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl mb-16 text-center">
          Make With Our Company
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={`text-4xl md:text-2xl`}
          >
            <p>Trying a new brand.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className={`text-4xl md:text-2xl`}
          >
            <p>우리는 새로운 브랜드에 도전합니다.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ThirdView;
