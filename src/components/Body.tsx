import { ReactNode } from 'react'


export function Body({ children }: { children: ReactNode }) {

    return (
        <div className=" w-screen min-h-screen bg-gray-900 flex overflow-hidden">
            {children}
        </div>
    )
}