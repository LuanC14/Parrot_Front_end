import ReactLoading from 'react-loading';

export function Loading({ isLoading }: {isLoading?: boolean}) {

    return (
        <div className={`max-h-screen overflow-hidden absolute z-20 inset-0 bg-opacity-90 bg-black text-white ${isLoading ? '' : 'hidden'}`}>

            <div className='relative top-1/2 left-1/2'>
            <ReactLoading type={'spin'} color={'cyan'} height={70} width={70} />

            </div>
        </div>
    )
}