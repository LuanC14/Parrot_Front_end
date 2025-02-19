import { Chat, Trash } from 'phosphor-react'
import { User } from './User';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useEffect, useState } from 'react'
import { PostFeedProps } from '../types/components/PostFeed';
import { PublicationProps } from '../types/entities/PublicationProps';

export function PostFeed({ photoProfileUrl, name, text, image, likes, handleLike, userLikedId, username, comments, postId, deletePubli, verifyIdAuthorPost, publications }: PostFeedProps) {
    const [publis, setPublis] = useState<PublicationProps[]>([])
    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        async function verifyLiked() {
            publications ? setPublis(publications) : console.log('waiting')

            const publi = publis.find(data => data.postId == postId)
            const like = publi?.likes?.some(data => data.userId == userLikedId)

            like ? setIsLiked(true) : setIsLiked(false)
        }

        verifyLiked()

    }, [handleLike])

    return (
        <section className='border-b border-gray-300 pt-5 pl-5 pb-5'>

            <div className='flex justify-between items-center mb-4'>
                <User name={name} photoUrl={photoProfileUrl} username={username}  />
                <Trash className={` pr-2 text-white cursor-pointer ${verifyIdAuthorPost == false ? "hidden" : ""}`} onClick={deletePubli} size={35} />

            </div>

            <div className='ml-[66px] mobile:pr-4'>

                <p className='text-md text-white font-normal mobile:text-sm'>{text}</p>
                <Link to={`/publication?id=${postId}`} >

                    {image &&
                        <img className='max-h-[216px] mobile:max-w-[180px] object-contain mt-2 rounded-[4px]' src={image} alt="" />
                    }
                </Link>

                <div className=' flex  text-white mt-3 text-md gap-10'>
                    <Link to={`/publication?id=${postId}`} className='flex items-center gap-2'><Chat className='cursor-pointer' size={24} /> {comments} </Link>

                    <span className='flex items-center gap-2'>
                        <FiHeart onClick={handleLike} className={`cursor-pointer ${isLiked ? 'fill-cyan-300 text-cyan-300' : ''}`} size={24} /> {likes}
                    </span>
                </div>
            </div>
        </section>
    )
}