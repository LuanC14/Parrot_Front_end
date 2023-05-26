import { ReactNode } from 'react'

export function TopMenu({ children }: { children: ReactNode }) {


    return (
        <div className="flex gap-12 bg-black text-gray-300 items-center justify-center mx-auto px-32 py-3 rounded-xl mobile:flex-col mobile:gap-1  mobile:px-8">
            {children}
        </div>
    )
}