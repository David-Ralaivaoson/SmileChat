import {createAuthClient} from "better-auth/react"

export const authclient = createAuthClient({});

export const {useSession, signIn, signOut, signUp} = authclient