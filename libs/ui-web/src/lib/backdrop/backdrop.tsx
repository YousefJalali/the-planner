import { x } from '@xstyled/styled-components'
import { motion } from 'framer-motion'

export const Backdrop = ({
  id,
  onClick,
}: {
  id: string
  onClick?: () => void
}) => {
  const variants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  }

  return (
    <motion.div
      transition={{ duration: 0.3 }}
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants}
    >
      <x.div
        id={id}
        position="absolute"
        top={0}
        left={0}
        h="100vh"
        w="100vw"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        onClick={onClick}
      />
    </motion.div>
  )
}

export default Backdrop
