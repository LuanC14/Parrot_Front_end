import { useEffect, useState } from "react"

import { Friend } from "../components/Friend"
import { Section } from "../components/Section"
import { Menu } from "../components/Menu"
import { Input } from "../components/Input"
import { MagnifyingGlassPlus } from "phosphor-react"

import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { Loading } from "../components/Loading"
import { TopMenu } from "../components/TopMenu"
import { Body } from "../components/Body"

export const Social = function () {
    const [inputSearchValue, setInputSearchValue] = useState<string>('*')
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [following, setFollowing] = useState<User[]>([])
    const [followers, setFollowers] = useState<User[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(true)
    const [showFollowers, setShowFollowers] = useState<boolean>(false)
    const [showFollowings, setShowFollowings] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { token, user, authEmail }: any = useAuth()

    function handleToggleFollowings() {
        setShowFollowings(!showFollowings)
        setShowFollowers(false)
        setShowSearch(false)
    }

    function verifyIsFollowed(id: string) {
        var isFollow = following.find(data => data.id == id)
        return isFollow ? true : false
    }

    function handleToggleFollowers() {
        setShowFollowers(!showFollowers)
        setShowFollowings(false)
        setShowSearch(false)
    }

    function handleToggleSearch() {
        setShowSearch(!showSearch)
        setShowFollowers(false)
        setShowFollowings(false)
    }

    async function handleFollows(followerId: string) {
        const alreadyFollowing = following?.find(data => data.id === followerId)
        setIsLoading(true)

        if (followerId == user) {
            alert("Você não pode se seguir")
            setIsLoading(false)
            return
        }

        if (alreadyFollowing) {

            await api.delete(`/follows/${followerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(() => {
                setIsLoading(false)
                console.log("Usuário removido")
            })

        } else {
            await api.post(`/follows/${followerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(() => {
                setIsLoading(false)
                console.log("Usuário seguido")
            })
        }
    }

    useEffect(() => {
        function showSearchScreenIfothersAreHidden() {
            if (!showFollowers && !showFollowings && !showSearch) {
                setShowSearch(true)
            }
        }
        showSearchScreenIfothersAreHidden()
    }, [showFollowers, showFollowings, showSearch])

    useEffect(() => {
        async function fetchFollowsAndFollowings() {
            const email = authEmail.replace(/"/g, "");

            try {
                const data = await api.get(`/user/email?email=${email}`)
                    .then((res) => res.data)

                const followingUsernames = data.following?.map((user: User) => user.username) ?? [];
                const followersUsernames = data.followers?.map((user: User) => user.username) ?? [];

                if (followingUsernames.length > 0) {
                    const allFollowings = [];

                    for (const username of followingUsernames) {
                        const response = await api.get(`/user/username?username=${username}`);
                        const data = response.data;
                        allFollowings.push(data);
                    }
                    allFollowings ? setFollowing(allFollowings) : 'wait'
                }

                if (followersUsernames.length > 0) {
                    const allFollowers = [];

                    for (const username of followersUsernames) {
                        const response = await api.get(`/user/username?username=${username}`);
                        const data = response.data;
                        allFollowers.push(data);
                    }
                    setFollowers(allFollowers);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchFollowsAndFollowings();

    }, [followers, following, verifyIsFollowed])

    useEffect(() => {
        async function fethAllUsers() {
            inputSearchValue.length <= 0 ? setInputSearchValue('*') : ''

            try {
                await api.get(`/user/all/${inputSearchValue}`)
                    .then((res) => setAllUsers(res.data))

            } catch (error) {
                console.log(error)
            }
        }
        fethAllUsers()
    }, [following, followers, inputSearchValue])

    return (
        <Body>
            <Menu />
            <Loading isLoading={isLoading} />

            <Section>
                <TopMenu>
                    <button className={`${showSearch == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleSearch}>Buscar</button>
                    <button className={`${showFollowers == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleFollowers} >Seguidores</button>
                    <button className={`${showFollowings == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleFollowings}>Seguindo</button>
                </TopMenu>


                <div className={`overflow-auto h-[775px] smallScreen:max-h-[480px] mediumScreen:max-h[600px] ${showFollowings ? '' : 'hidden'} `}>
                    {
                        following &&
                        following.map((data) => (
                            <Friend
                                name={data.name} key={data.id}
                                username={data.username}
                                handle={() => handleFollows(data.id)}
                                following={data.following}
                                follows={data.followers}
                                photoUrl={data.avatarUri}
                                isFollowed={verifyIsFollowed(data.id)}
                            />
                        ))
                    }
                    <p className={`text-center mt-[150px] text-white font-bold ${following ? 'hidden' : ''}`}>Você não está seguindo ninguém</p>
                </div>

                <div className={`overflow-auto h-[775px] smallScreen:max-h-[480px] mediumScreen:max-h[600px] ${showFollowers ? '' : 'hidden'}`}>
                    {
                        followers && followers.length > 0 &&
                        followers.map((data) => (
                            <Friend
                                following={data.following}
                                follows={data.followers}
                                name={data.name}
                                username={data.username}
                                handle={() => handleFollows(data.id)}
                                key={data.id}
                                photoUrl={data.avatarUri}
                                isFollowed={verifyIsFollowed(data.id)}
                            />
                        ))
                    }
                    <p className={`text-center mt-[150px] text-white font-bold ${followers.length <= 0 ? '' : 'hidden'}`}>Você ainda não possui seguidores</p>
                </div>

                <div className={`overflow-auto h-[750px] smallScreen:max-h-[480px] mediumScreen:max-h-[600px] ${showSearch ? '' : 'hidden'}`}>

                    <div className="w-[600px] mobile:w-[300px] mx-auto mobile:mx-16 pt-8">
                        <Input
                            placeholder="Digite o nome do usuário"
                            onChange={(event: any) => setInputSearchValue(event.target.value)}
                            title="Procurar usuários"
                            icon={MagnifyingGlassPlus}
                        />

                    </div>
                    {
                        allUsers && allUsers.length > 0 &&

                        allUsers.map((data) => (
                            <Friend
                                handle={() => handleFollows(data.id)}
                                following={data.following} follows={data.followers}
                                name={data.name}
                                username={data.username}
                                key={data.id}
                                photoUrl={data.avatarUri}
                                isFollowed={verifyIsFollowed(data.id)}
                            />
                        ))
                    }
                </div>
            </Section>
        </Body>

    )
}