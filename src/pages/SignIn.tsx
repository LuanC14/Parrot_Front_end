import { Input } from "../components/Input"
import { Logo } from "../components/Logo"
import { Button } from "../components/Button"
import { Envelope } from 'phosphor-react'
import { Lock } from 'phosphor-react'
import { Link } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../hooks/contexts/authContext"
import { Loading } from "../components/Loading"
import { Body } from "../components/Body"

export const SignIn = function () {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { signIn }: any = useAuth()

    async function handleSignIn(event: React.FormEvent) {
        setIsLoading(true)
        event.preventDefault()

        const response = await signIn({ email, password })

        setIsLoading(response)
    }

    return (
        <Body>
            <div className="mx-auto my-auto w-[400px]">
            <header>
                <Logo subtitle={'Faça o login e começe a usar'} />
            </header>

            <form className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-2 smallScreen:mt-7">
                <Input
                    icon={Envelope}
                    title="Endereço de email"
                    placeholder="Digite seu email"
                    type="text"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    icon={Lock}
                    title="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <div className="mt-6 smallScreen:mt-3">
                    <Button title={'Entrar'} onClick={handleSignIn} />
                </div>
            </form>

            <footer className=" mt-9 smallScreen:mt-3 text-center">
                <Link to="/signup" className="text-xs text-gray-300 underline">Não possui conta? Cria uma agora!</Link>
            </footer>

            <Loading isLoading={isLoading} />
            </div>

        </Body>

    )
}