import { Menu } from "../components/Menu"
import { Section } from "../components/Section"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { UserDataScreen } from "../components/UserDataScreen"
import { Biography } from "../components/Biography"
import { TopMenu } from "../components/TopMenu"
import { Body } from "../components/Body"

export const Profile = function () {
    const [userData, setUserData] = useState<User>()
    const [showUserDataScreen, setShowUserDataScreen] = useState<boolean>(true)
    const [showBiographyScreen, setShowBiographyScreen] = useState<boolean>(false)

    const { authEmail }: any = useAuth()

    function toggleUserData() {
        setShowUserDataScreen(!showUserDataScreen)
        setShowBiographyScreen(false)
    }

    function toggleBiography() {
        setShowBiographyScreen(!showBiographyScreen)
        setShowUserDataScreen(false)
    }

    useEffect(() => {
        async function fetchUserData() {
            const email: string = authEmail.replace(/"/g, "")

            try {
                const response = await api.get(`/user/email?email=${email}`)
                setUserData(response.data)

            } catch (error) {
                console.log("Error on fetchUserData function on page Profile.tsx" + error)
            }
        }
        fetchUserData()
    }, [userData])

    useEffect(() => {
        function showUserDataScreenIfothersAreHidden() {
            if (!showBiographyScreen && !showUserDataScreen) {
                setShowUserDataScreen(true)
            }
        }
        showUserDataScreenIfothersAreHidden()
    }, [showBiographyScreen, showUserDataScreen])

    return (
        <Body>
            <Menu />
            <Section>

                <TopMenu>
                    <button className={`${showUserDataScreen == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={toggleUserData}>Dados pessoais</button>
                    <button className={`${showBiographyScreen == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={toggleBiography}>Biografia</button>
                    <button>Suas publicações</button>
                </TopMenu>

                <div className={`flex flex-col items-center gap-6 mx-auto overflow-hidden  ${showUserDataScreen == false ? 'hidden' : ''}`}>
                    {userData &&
                        (
                            <UserDataScreen photoUrl={userData.avatarUri} email={userData.email} name={userData.name} username={userData.username} />
                        )
                    }
                </div>

                <div className="flex flex-col items-center gap-6 mt-20">
                    {showBiographyScreen &&
                        (
                            <Biography />
                        )
                    }

                </div>
            </Section>
        </Body>

    )
}