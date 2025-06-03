import './index.css';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Modern React App
      </motion.h1>

      <motion.p
        className="text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Styled with Tailwind CSS and animated with Framer Motion.
      </motion.p>

      <motion.button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Click Me!
      </motion.button>
    </div>
  );
}

export default App;
