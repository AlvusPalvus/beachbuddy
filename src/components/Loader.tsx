import { easeOut, motion } from 'framer-motion';
import { TbBallVolleyball } from 'react-icons/tb'

const animate = {
    y: -80
}

const bounceTransition = {
    y: {
        duration: .3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: easeOut
    }
}

export const Loader = () => {
    return (
        <motion.div 
            transition={bounceTransition}
            animate={animate}
            className="text-dkblue mt-56"
        >
            <TbBallVolleyball size={50}/>
        </motion.div>
    );
};