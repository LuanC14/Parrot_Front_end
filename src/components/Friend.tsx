import { Button } from "./Button"
import { useEffect } from "react"
import * as HoverCard from '@radix-ui/react-hover-card';

export function Friend({ name, photoUrl, follows, following, handle, isFollowed, username }: FriendProps) {

    let photoProfileUrl;

    if (photoUrl != null || photoUrl != undefined) {
        photoProfileUrl = photoUrl
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    useEffect(() => {
    }, [isFollowed])

    return (
        <div className='flex flex-col border-b border-gray-300 pl-5 pt-5 pb-8'>

            <div className="flex gap-2">
               
                    <HoverCard.Root>
                        <HoverCard.Trigger asChild>
                            <a
                                className="flex gap-4 cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
                                href="https://twitter.com/radix_ui"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img
                                    className="block h-[45px] w-[45px] rounded-full"
                                    src={photoProfileUrl}
                                    alt="Radix UI"
                                />
                            </a>

                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                            <HoverCard.Content
                                className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-gray-600 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                                sideOffset={5}
                            >
                                <div className="flex flex-col gap-[7px]">
                                    <img
                                        className="block h-[60px] w-[60px] rounded-full"
                                        src={photoProfileUrl}
                                        alt="Radix UI"
                                    />
                                    <div className="flex flex-col gap-[15px]">
                                        <div>
                                            <div className="text-white m-0 text-[15px] font-medium leading-[1.5]">{name}</div>
                                            <div className="text-white m-0 text-[15px] leading-[1.5]">{username ? '@' : ''}{username}</div>
                                        </div>

                                        <div className={`flex gap-[5px] `}>

                                            <div className={"flex gap-[5px]"}>
                                                <div className="text-white m-0 text-[15px] font-medium leading-[1.5]">{!following ? 0 : following?.length}</div>
                                                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">Following</div>
                                            </div>

                                            <div className="flex gap-[5px]">
                                                <div className="text-white m-0 text-[15px] font-medium leading-[1.5]">{!follows ? 0 : follows?.length}</div>
                                                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">Followers</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <HoverCard.Arrow className="fill-white" />
                            </HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
               
                <div>
                    <p className='font-bold text-white text-lg mobile:text-md mobile:max-w-[150px] '>{name}</p>
                    <p className="flex-wrap text-gray-300 font-bold text-xs -mt-2">{username ? '@' : ''}{username}</p>
                </div>
            </div>

            <div className="flex-initial">
                <div className="mt-3 text-white flex flex-col text-xs ">
                    <span>{follows?.length ?? 0} Seguidores</span>
                    <span>Seguindo {following?.length ?? 0}</span>
                </div>

                <div className="w-[320px] mobile:w-[200px] mt-5">
                    <Button onClick={handle} title={`${isFollowed ? "Seguindo" : "Seguir"}`} />
                </div>
            </div>
        </div>
    )
}