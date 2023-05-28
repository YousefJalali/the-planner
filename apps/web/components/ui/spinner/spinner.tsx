import { FC } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'

type Props = {
  size?: number
  className?: string
}

export const Spinner: FC<Props> = (props) => {
  return (
    <div className="flex animate-spin">
      <CgSpinnerTwo
        className={`[&>path]:fill-primary ${props.className}`}
        size={props.size || 20}
      />
    </div>
  )
}

export default Spinner
