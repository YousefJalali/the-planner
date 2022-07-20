import { AnimatePresence, motion } from 'framer-motion'

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

type Props<T> = {
  items: T[]
  children: (id: string, item: T) => JSX.Element
}

function AnimatedItem<T extends { id: string }>({ items, children }: Props<T>) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.li {...animations} key={item.id}>
          {children(item.id, item)}
        </motion.li>
      ))}
    </AnimatePresence>
  )
}

export default AnimatedItem
