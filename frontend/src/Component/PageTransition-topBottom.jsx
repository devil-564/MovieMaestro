import React from 'react'
import { motion } from 'framer-motion'


const PageTransition_topBottom = ({ children }) => {
    const pageTransition = {
        initial: { opacity: 0.5, y: '-100%'},
        animate: { opacity: 1, y: '0'},
        exit: { opacity: 0.5, y: '100%'},
    };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition_topBottom
