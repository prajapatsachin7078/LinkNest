import { ReactElement, useState } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary",
  size: "sm" | "md" | "lg",
  text: string,
  loading?: boolean,
  startIcon?: ReactElement,
  endIcon?: ReactElement,
  handleClick?: () => void
}
const buttonSizes = {
  "sm": "px-2 py-2 text-md",
  "md": "px-4 py-2 text-lg",
  "lg": "px-6 py-3 text-xl"
}


const buttonVariants = {
  'primary': "bg-blue-400  rounded-md hover:bg-blue-300 text-white hover:scale-105  transition-transform",
  'secondary': "text-white bg-violet-600  rounded-md hover:bg-violet-500  hover:scale-105 transition-transform "
}

function Button(props: ButtonProps) {
  // const [loading,setLoading] = useState(false);
  const { variant, size, text, loading, startIcon, endIcon, handleClick } = props;
  return (
    <button onClick={handleClick} className={`${buttonVariants[variant]} ${buttonSizes[size]} outline-none flex items-center`}><span className="pr-2">{startIcon}</span>{text}<span className="ps-2">{endIcon}</span></button>
  )
}

export default Button