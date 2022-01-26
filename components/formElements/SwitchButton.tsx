import { InputHTMLAttributes } from 'react'
import Btn from '../../styles/components/SwitchButtonStyle'

type Props = {
  height: number
} & InputHTMLAttributes<HTMLInputElement>

function SwitchButton(props: Props) {
  return (
    <Btn.Switch height={props.height}>
      <input type='checkbox' {...props} />
      <Btn.Slider height={props.height}></Btn.Slider>
    </Btn.Switch>
  )
}

export default SwitchButton
// import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// import { useController, UseControllerProps } from 'react-hook-form'
// import Btn from '../../styles/components/SwitchButtonStyle'

// type Props<T extends Record<string, any> = Record<string, any>> = {
//   height: number
// } & UseControllerProps<T> &
//   DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// function SwitchButton<T>(props: Props<T>) {
//   const {
//     field: { onChange, value, name },
//   } = useController(props)

//   return (
//     <Btn.Switch height={props.height}>
//       <input type='checkbox' checked={value as boolean} onChange={onChange} />
//       <Btn.Slider height={props.height}></Btn.Slider>
//     </Btn.Switch>
//   )
// }

// export default SwitchButton
