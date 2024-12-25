import { useState } from 'react';
import Button from './ui/Button';
import { Card } from './ui/Card';
import { Add01Icon, CircleArrowDownDoubleIcon, CircleArrowUpDoubleIcon, Doc01Icon, Link01Icon, Link06Icon, LogoutSquare01Icon, Share02Icon, Tag01Icon } from 'hugeicons-react';
import XSquareIconSvg from './icons/XSquareIconSvg';
import XIconSvg from './icons/XIconSvg';
import YouTubeIconSvg from './icons/YouTubeIconSvg';
import RedHatIcon from './icons/RedHatIcon';
import CreateLinkModal from './CreateLinkModal';
import { CircleArrowUp } from 'lucide-react';

// Define an array of tags
const tags: string[] = ["chat", "messaging", "real-time", "GiggleChat", "notifications"];

// Define an array of objects to store card information
const cardData = [
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a",
        type: "youtube"
    },
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://x.com/datchughuy/status/1869044565925339456",
        type: "twitter"
    },
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://x.com/TimesAlgebraIND/status/1869036673314537849",
        type: "twitter"
    },
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://www.youtube.com/live/gGHaXVO-9j4?si=Kuz0_SeR4tgc6u3a",
        type: "youtube"
    },
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://x.com/datchughuy/status/1869044565925339456",
        type: "twitter"
    },
    {
        title: "Harkirat's Latent",
        tags: tags,
        link: "https://x.com/TimesAlgebraIND/status/1869036673314537849",
        type: "twitter"
    }
];

const Layout = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [links, setLinks] = useState(cardData);

    const handleClick = () => {
        console.log("Hi there I'm clicked!");
    };

    const handleAddContent = () => {
        setModalOpen(true);
    };

    const contentHandler = (content: any) => {
        setLinks((links) => [content, ...links]);
    };

    return (
        <div className="h-screen">
            <CreateLinkModal onAddNewContent={contentHandler} open={modalOpen} onClose={() => setModalOpen(false)} />

            {/* Header */}
            <div className="flex w-full items-center justify-between px-6 border-b-2 fixed z-10 bg-white">
                <div className="text-3xl mt-2 ">
                    <span className="relative flex items-center justify-center animate-fade-in">
                        {/* Brain */}
                        <span className="relative text-blue-500 font-bold text-4xl">
                            <span className="absolute  border-orange-500 border-4 mt-1 w-2  h-2 rounded-full -top-1 left-7">
                               
                            </span>
                           <span className='flex items-center'>
                                L<span className=' text-orange-500 -mb-2'>
                                    <Link06Icon />
                                </span>nk
                           </span>
                            
                        </span>
                        {/* Dock */}
                        <span className="text-orange-500 font-bold text-4xl">Nest</span>
                    </span>
                </div>
                <div className="flex gap-4 my-2 justify-end">
                    <Button handleClick={handleClick} variant="primary" text="Share Brain" startIcon={<Share02Icon size={18} />} size="sm" />
                    <Button handleClick={handleAddContent} variant="secondary" text="Add Content" startIcon={<Add01Icon size={18} />} size="sm" />
                </div>
            </div>

            {/* Main content */}
            <main className="flex w-full">
                {/* Left sidebar */}
                <div className="border-r-2 min-w-52 w-96 pt-10 flex flex-col text-center h-screen bg-white">
                    <div className="flex flex-col justify-center items-center mt-10">
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 hover:bg-slate-300 ps-2 py-2 rounded-md hover:cursor-pointer">
                                <XSquareIconSvg />
                                <span><XIconSvg /></span>
                            </li>
                            <li className="flex items-center space-x-3 hover:bg-slate-300 ps-2 py-2 rounded-md hover:cursor-pointer">
                                <YouTubeIconSvg />
                                <span>YouTube</span>
                            </li>
                            <li className="flex items-center space-x-3 hover:bg-slate-300 ps-2 py-2 rounded-md hover:cursor-pointer">
                                <Doc01Icon />
                                <span>Documents</span>
                            </li>
                            <li className="flex items-center space-x-3 hover:bg-slate-300 ps-2 py-2 rounded-md hover:cursor-pointer">
                                <Link06Icon />
                                <span>Links</span>
                            </li>
                            <li className="flex items-center space-x-3 hover:bg-slate-300 ps-2 py-2 rounded-md hover:cursor-pointer">
                                <Tag01Icon />
                                <span>Tags</span>
                            </li>
                            <li>
                                <Button variant="primary" text="Log Out" size="md" endIcon={<LogoutSquare01Icon />} />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="pt-16 flex border-4 h-screen flex-wrap gap-4 justify-center overflow-y-auto p-4">
                    {/* Map over the links array and render each Card */}
                    {links.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            tags={card.tags}
                            link={card.link}
                            type={card.type}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Layout;
