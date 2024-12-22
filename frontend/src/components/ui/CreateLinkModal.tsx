import { MultiplicationSignIcon, PlusSignIcon } from "hugeicons-react";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

// Define the type for the content 
interface ContentTypes{
    title:string;
    link:string;
    type:string;
    tags:string[];
}

// Define the type for the modal props
interface ModalTypes {
    open: boolean;
    onClose?: () => void; // Optional close function
    onAddNewContent?: (content:ContentTypes)=>void
}

function CreateLinkModal({ open, onClose,onAddNewContent }: ModalTypes) {
    const defaultContent = {
        title: "",
        link: "",
        type: "youtube",// Default value for the dropdown
        tags: ["chat", "messaging"]
    };
    // State to store the link and type values
    const [input, setInput] = useState(defaultContent);

    // Create a ref to the modal container element
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle select change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInput({ ...input, type: e.target.value.toLowerCase()});
    };

    // Close the modal when clicked outside of the modal
    useEffect(() => {
        // Add event only if modal is opened
        if (!open) {
            return;
        }

        // Event when modal is opened
        const handleCloseModal = (e: MouseEvent) => {
            
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose && onClose();
            }
        }

        // Attaching the event to the dom
        document.addEventListener('mousedown', handleCloseModal);

        // Cleanup event on component unmount or when the modal closes
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        }
    }, [open, onClose]);

    return (
        <div>
            {open && (
                <div className="h-screen w-screen bg-opacity-30 fixed top-0 left-0 flex justify-center bg-slate-400 z-20 items-center"
                >
                    <div className="flex flex-col justify-center h-96 w-80 rounded-md bg-white px-2 relative"
                        ref={modalRef}>
                        {/* Card Header */}
                        <div className="flex items-center absolute top-0 left-0 pt-2 px-4 justify-between border-b-2 w-full pb-1">
                            <p className="px-2 text-2xl font-bold">Add Content</p>
                            {/* Multiplication icon to close the modal */}
                            <MultiplicationSignIcon
                                className="hover:cursor-pointer hover:scale-105 bold"
                                size={28}
                                color="red"
                                onClick={onClose} // Close the modal
                            />
                        </div>

                        {/* Modal Content */}
                        <div className="px-4 py-6">
                            {/* Platform Select */}
                            <div className="mb-4">
                                <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                                    Select Platform
                                </label>
                                <select
                                    id="platform"
                                    name="type"
                                    value={input.type}
                                    onChange={handleSelectChange} // Update state when the selection changes
                                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="youtube">YouTube</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="document">Document</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>


                            {/* Title Input */}
                            <div className="my-4">
                                <Input
                                    type="text"
                                    value={input.title}
                                    name="title"
                                    placeholder="Enter your title here..."
                                    onChange={handleChange} // Update link state on input change
                                />
                            </div>
                            {/* Link Input */}
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    value={input.link}
                                    name="link"
                                    placeholder="Enter your link here..."
                                    onChange={handleChange} // Update link state on input change
                                />
                            </div>
                            <div className="flex justify-center"
                                onClick={() => {
                        
                                    onAddNewContent?.(input)
                                    setInput(defaultContent);
                                    onClose?.();
                                }}>
                                <Button  variant="primary" text="Add" endIcon={<PlusSignIcon size={20} />} size="lg" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateLinkModal;
