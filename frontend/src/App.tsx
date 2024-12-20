
import './App.css'
import Button from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Add01Icon, Doc01Icon, Link06Icon, LogoutSquare01Icon, Share02Icon, Tag01Icon } from 'hugeicons-react';
import XSquareIconSvg from './components/icons/XSquareIconSvg';
import XIconSvg from './components/icons/XIconSvg';
import YouTubeIconSvg from './components/icons/YouTubeIconSvg';
import RedHatIcon from './components/icons/RedHatIcon';
function App() {
  const tags: string[] = ["chat", "messaging", "real-time", "GiggleChat", "notifications"];

  const handleClick = () => {
    console.log("Hi there I'm clicked!");
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="border-r-2 w-72 z-20 fixed flex flex-col text-center top-0 left-0 h-screen bg-white">
        <div className="text-3xl mt-6  ">
          
          <span className="relative flex items-center  justify-center animate-fade-in">
            {/* Brain */}
            <span className="relative text-blue-500 font-bold text-4xl">
              <span className="absolute -top-2  animate-bounce">
                <RedHatIcon />
              </span>
              Smart
            </span>
            {/* Dock */}
            <span className="text-orange-500 font-bold text-4xl">Stack</span>
          </span>
       </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <XSquareIconSvg  />
              <span><XIconSvg/></span>
            </li> 
            <li className="flex items-center space-x-3">
              <YouTubeIconSvg />
              <span>YouTube</span>
            </li>
            <li className="flex items-center space-x-3">
              <Doc01Icon />
              <span>Documents</span>
            </li>
            <li className="flex items-center space-x-3">
              <Link06Icon />
              <span>Links</span>
            </li>
            <li className="flex items-center space-x-3">
              <Tag01Icon />
              <span>Tags</span>
            </li>
            <li>
              <Button variant="primary" text="Log Out" size="md" endIcon={<LogoutSquare01Icon />} />
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <main className="ml-72 w-full">
        {/* Header */}
        <div className="flex w-full justify-end border-b-2 z-10 gap-2  fixed right-0  bg-white top-0">
          <div className="flex gap-4  my-2 justify-end mr-4">
            <Button handleClick={handleClick} variant="primary" text="Share Brain" startIcon={<Share02Icon size={18} />} size="sm" />
            <Button handleClick={handleClick} variant="secondary" text="Add Content" startIcon={<Add01Icon size={18} />} size="sm" />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="mt-16 flex  flex-wrap gap-4 justify-center overflow-y-auto p-4">
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a"} type="youtube" />
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/datchughuy/status/1869044565925339456"} type="twitter" />
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/TimesAlgebraIND/status/1869036673314537849"} type="twitter" />
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a"} type="youtube" />
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/datchughuy/status/1869044565925339456"} type="twitter" />
          <Card title={"Harkirat's Latent"} tags={tags} link={"https://x.com/TimesAlgebraIND/status/1869036673314537849"} type="twitter" />
        </div>
      </main>
    </div>
  );
}

export default App;

