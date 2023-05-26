
export function Loading({ isLoading }: {isLoading?: boolean}) {

    return (
        <div className={`absolute z-20 inset-0 bg-opacity-90 bg-black text-white ${isLoading ? '' : 'hidden'}`}>
            <p className="relative w-12 mx-auto top-4">Loading...</p>
        </div>
    )
}