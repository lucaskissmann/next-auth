import user from "@/types/User"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			authorize: async ( credentials ) => {
				const { email, password } = credentials;
				if( email === user.email && password === user.password ) {
					return Promise.resolve(user); 
				} else {
					return Promise.reject(new Error('Credenciais inválidas'));
				}
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
	},

	secret: process.env.SECRET,
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }