import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Lock, Envelope, Person, UserCircle } from 'phosphor-react'
import { Link } from "react-router-dom"
import { useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/Loading"
import { Body } from "../components/Body"

export const SignUp = function () {
    const [name, setName] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [repeatPassword, setRepeatPassword] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const navigate = useNavigate()

    async function handleSignUp(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        if (repeatPassword !== password) {
            return alert("As senhas não conferem")
        }

        if (!name || !username || !email || !password || !repeatPassword) {
            return alert("Preencha todos os campos do formulário!")
        }

        try {
            api.post("/user/signup", { name, email, username, password })
                .then(() => {
                    alert("Usuário cadastrado com sucesso")
                    navigate("/")
                    setIsLoading(false)
                })

        } catch (error) {
            setIsLoading(false)
            console.log("Error in handleSignUp function on page SignUp.tsx" + error)
        }
    }

    return (

        <Body>
            <div className="mx-auto my-auto w-[565px]">
                <header className="flex justify-center gap-2 pl-3 pr-3">
                    <h1 className="text-lg font-bold text-cyan-500 text-center flex items-start">
                        <img className="w-9 h-9" src="../../src/assets/logo.svg" alt="" />
                        Preencha os dados para realizar o cadastro
                    </h1>
                </header>

                <form className="flex flex-col gap-2 items-stretch mt-8 mobile:max-w-[300px]">

                    <Input
                        icon={Person}
                        title="Seu nome completo"
                        placeholder="Digite seu nome completo"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />

                    <Input
                        icon={UserCircle}
                        title="Seu nome de usuário"
                        placeholder="Digite seu nome de usuário"
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <Input
                        icon={Envelope}
                        title="Seu email"
                        placeholder="Digite seu email"
                        type="text"
                        onChange={(event) => setEmail(event.target.value)}

                    />

                    <div className="flex mobile:flex-col justify-between">
                        <Input
                            icon={Lock}
                            title="Sua senha"
                            placeholder="Digite sua senha"
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                           
                        />

                        <Input
                            icon={Lock}
                            title="Confirme sua senha"
                            placeholder="Digite sua senha novamente"
                            type="password"
                            onChange={(event) => setRepeatPassword(event.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <Button onClick={handleSignUp} title={'Cadastrar'} />
                    </div>

                </form>

                <footer className=" mt-8 text-center">
                    <Link to="/" className="text-xs text-gray-300 underline">Voltar para tela inicial</Link>
                </footer>

            </div>
            <Loading isLoading={isLoading} />


        </Body>

    )
}