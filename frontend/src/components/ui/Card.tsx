import { Delete02Icon, File02Icon, Link06Icon } from "hugeicons-react";
import {Tweet} from "react-tweet";
import XSquareIconSvg from "../icons/XSquareIconSvg";
import YouTubeIconSvg from "../icons/YouTubeIconSvg";

interface CardTypes {
    title: string,
    link: string,
    type?: string,
    tags?: string[]
}
export const Card = (props: CardTypes) => {
    const { title, link, tags, type } = props;

    // Method to extrac post
    const extractTweetId = (uri: string) => {
        const match = uri.match(/\/status\/(\d+)/);
        return match ? match[1] : null;
    };

    //

    const extractYouTubeID = (uri: string) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|live\/)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
        const match = uri.match(regex);
        return match ? match[1] : null;
    }

    return (
        <div className=" hover:scale-105 transition-transform border-2 mx-2 rounded-md max-w-72  px-4 py-2">
            {/* // Card Header */}
            <div className="flex items-center  justify-between m-2 border-b-2 pb-1"><span className="hover:cursor-pointer">
                {type === 'twitter' && <XSquareIconSvg /> || type === 'youtube' && <YouTubeIconSvg /> || <File02Icon />}
            </span>

                <h4 className="mx-2 font-bold">{title}</h4>
                <div className="flex">
                    <Delete02Icon className="hover:cursor-pointer mr-1" size={22} />
                    <Link06Icon className="hover:cursor-pointer" size={24} />
                </div>
            </div>
            {/* // Card Content */}
            <div className="w-full">
                {type === 'youtube'
                    && <iframe
                        className="w-full rounded-lg " height={285}
                        src={`https://www.youtube.com/embed/${extractYouTubeID(link)}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> ||

                    type === 'twitter' && <div className="max-h-72 rounded-lg -translate-y-6  overflow-y-hidden">
                        <Tweet id={`${extractTweetId(link)}`} />
                    </div>

                    // {`${extractTweetId(link)}`}
                }
            </div>
            {/* Card Footer */}
            <div className="flex flex-wrap">
                {tags?.map((tag, index) => (
                    <span key={index} className="border-2 rounded-lg m-1 px-2 py-1 text-green-400">#{tag}</span>
                ))}
            </div>
        </div>
    )
}