import { ReactElement } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant:"primary"|"secondary",
    size:"sm"|"md"|"lg",
    text:string,
    loading?:boolean,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    handleClick?: ()=>void
}
const buttonSizes={
  "sm":"px-2 py-1 text-md",
  "md":"px-4 py-2 text-lg",
  "lg":"px-6 py-3 text-xl"
}


const buttonVariants = {
    'primary':"bg-blue-200 border rounded-md hover:bg-blue-300 hover:text-white active:scale-105",
    'secondary':"text-white bg-violet-600 border rounded-md hover:bg-violet-400 hover:text-black active:scale-105"
}

function Button(props:ButtonProps) {
    const {variant,size,text,loading,startIcon,endIcon, handleClick} = props;
  return (
    <button  onClick={handleClick}  className={`${buttonVariants[variant]} ${buttonSizes[size]} flex items-center`}><span className="pr-2">{startIcon}</span>{text}<span className="ps-2">{endIcon}</span></button>
  )
}

export default Button