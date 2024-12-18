
import { PlusIcon, Share2Icon } from 'lucide-react'
import './App.css'
import Button from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Add01Icon } from 'hugeicons-react';
function App() {
  const tags: string[] = ["chat", "messaging", "real-time", "GiggleChat", "notifications"];

  const handleClick = () => {
    console.log("Hi there I'm clicked!")

  }
  return (
    <>
    <header className='flex w-full gap-2 mb-10 mt-2 '>
        <div className='flex float-right gap-4 '>
          <Button handleClick={handleClick} variant='primary' text="Share Brain" startIcon={<Share2Icon size={18} />} size="sm" />

          <Button handleClick={handleClick} variant='secondary' text="Add Content" startIcon={<Add01Icon size={18} />} size="sm" />
        </div>

    </header>
      <div className='flex gap-4 flex-wrap justify-center'>
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a"} type="youtube" />
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/datchughuy/status/1869044565925339456"} type="twitter" />
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/TimesAlgebraIND/status/1869036673314537849"} type="twitter" />
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a"} type="youtube" />
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/datchughuy/status/1869044565925339456"} type="twitter" />
        <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/TimesAlgebraIND/status/1869036673314537849"} type="twitter" />

      </div>
    </>
  )
}

export default App
