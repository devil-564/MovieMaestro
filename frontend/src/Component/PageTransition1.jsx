import { motion } from 'framer-motion'
import React from 'react'

const PageTransition1 = ({ children }) => {
    const pageTransition1 = {
        initial: { opacity: 0, x: '80%' },
        animate: { opacity: 1, x: '0' },
        exit: { opacity: 0, x: '80%' },
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition1}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition1
