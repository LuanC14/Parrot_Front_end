import { Pencil } from "phosphor-react"
import { InputSelectProps } from "../types/components/InputSelectProps"

export function InputSelect({ selectId, title, children, onChange, handle }: InputSelectProps) {

    return (

        <div>
            <label htmlFor={selectId} className=" text-white text-xs ">{title}</label>

            <div className="w-[250px]">
                <select
                    id={selectId}
                    onChange={onChange}
                    className="h-12 py-3 px-4 rounded bg-gray-600 text-gray-300 w-full focus-within:ring-2 ring-cyan-300 blur-none mt-1"
                >

                    {children}

                </select>

            </div>
                <Pencil className="text-cyan-500 cursor-pointer absolute ml-[265px] -mt-[41px]" size={25} onClick={handle} />
        </div>


    )
}