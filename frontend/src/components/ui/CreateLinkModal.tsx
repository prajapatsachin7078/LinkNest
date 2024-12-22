import {  } from "hugeicons-react"

interface ModalTypes {
    open: boolean,
    onClose?: () => void

}
function CreateLinkModal({
    open,
    onClose
}: ModalTypes) {
    return (
        <div>

            {open && <div className="h-screen  w-screen  bg-opacity-30 fixed top-0 left-0 flex justify-center bg-slate-400 z-20 items-center">
                <div className="flex flex-col justify-center h-96 w-80 rounded-md bg-white" >
                    <div className="flex border-b">
                        
                    </div>
                </div>
            </div>}


        </div>
    )
}

export default CreateLinkModal