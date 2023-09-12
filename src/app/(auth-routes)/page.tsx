'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const [error, setError] = useState<string>( '' );

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError(result.error);
      setEmail('');
      setPassword('');
      return;
    }

    router.replace('/admin')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="email" 
          placeholder="Digite seu e-mail" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="relative h-12 rounded-md p-2 bg-transparent border border-gray-300">
          <input 
            className="w-full h-full bg-transparent border-none outline-none pr-12"
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Digite sua senha" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/>: <FaEye/>}
          </button>
          
        </div>

        <button
          type="submit"
          className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Entrar
        </button>

        {error && <div className="text-red-600 font-thin">{error}</div>}

      </form>
    </div>
  )
}
