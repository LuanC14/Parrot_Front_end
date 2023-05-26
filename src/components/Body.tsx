import { ReactNode } from 'react'


export function Body({ children }: { children: ReactNode }) {

    return (
        <div className="max-w-screen min-h-screen bg-gray-900 flex px-5 overflow-hidden">
            {children}
        </div>
    )
}