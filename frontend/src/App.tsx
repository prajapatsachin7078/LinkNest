
import { PlusIcon, Share2Icon } from 'lucide-react'
import './App.css'
import Button from './components/ui/Button'

function App() {
  const handleClick = ()=>{
    console.log("Hi there I'm clicked!")
  }
  return (
   <>
    <Button handleClick={handleClick} variant='primary'   text="Share" startIcon={<Share2Icon size={16}/>} size="sm"/>
    <Button handleClick={handleClick} variant='primary'   text="Share" startIcon={<Share2Icon size={18}/>} size="md"/>
    <Button handleClick={handleClick} variant='primary'   text="Share" startIcon={<Share2Icon size={20}/>} size="lg"/>
    <Button handleClick={handleClick} variant='secondary' text="Add Content" startIcon={<PlusIcon size={18}/>} size="sm"/>
    <Button handleClick={handleClick} variant='secondary' text="Add Content" startIcon={<PlusIcon size={20}/>} size="md"/>
    <Button handleClick={handleClick} variant='secondary' text="Add Content" startIcon={<PlusIcon size={22}/>} size="lg"/>
   </>
  )
}

export default App
