import { motion } from 'framer-motion';

const BadRequest = () => {
    return (

        <motion.div
            className="location container row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <h2>Location not available</h2>
        </motion.div>
    )
}

export default BadRequest;