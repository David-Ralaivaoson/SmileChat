'use server';

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface State {
    errorMessage?: string | null;
}

export async function signUpAction(prevState: State, data: FormData){
    const rowsData = {
        email: data.get("email") as string,
        password: data.get("password") as string,
        firstname: data.get("firstname") as string,
        lastname: data.get("lastname") as string,
    }

    const {email, password, firstname, lastname} = rowsData;

    if (email.length === 0 || password.length === 0 || firstname.length === 0) {
        return { errorMessage: "Tous les champs sont requis !" };
    }
    try {
        await auth.api.signUpEmail({
            body: {
                name: `${lastname.length === 0 ? firstname : firstname + " " + lastname}`,
                email,
                password
            }
        });
    } catch (error) {
        if(error instanceof APIError){
            switch (error.status) {
                case "UNPROCESSABLE_ENTITY":
                    return { errorMessage: "Cette adresse email a déjà un compte !" };
                case "BAD_REQUEST":
                    return { errorMessage: "Mot de passe trop faible !" };
                default:
                    return { errorMessage: "Une erreur est survenue !" };
            }
        }
        
    }
    redirect('/auth/login')
}

export async function signInAction(prevState: State, data: FormData){
    const rowsData = {
        email: data.get("email") as string,
        password: data.get("password") as string,
    }

    const {email, password} = rowsData;
    if (email.length === 0 || password.length === 0) {
        return { errorMessage: "Tous les champs sont requis !" };
    }

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        });
    } catch (error) {
        console.log(`Erreur lors de SignUp : ${error}`)
        if(error instanceof APIError){
            console.log(error.status)
            switch (error.status) {
                case "UNAUTHORIZED" :
                    return { errorMessage: "Mot de passe ou email incorrect !"}
                case "BAD_REQUEST":
                    return { errorMessage: "Mot de passe ou email incorrect !"}
                default:
                    return { errorMessage: "Une erreur est survenue !"};
            }
        }
    }
    redirect('/')
}

export const signOutAction = async () => {
    try {
        await auth.api.signOut({headers: await headers()})
    } catch (error) {
        console.log(error)
    }
    redirect("/auth/login")
}

export async function signInWithGoogle() {
    const res = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/", // pas besoin du callback complet
    },
  })

  // ⚠️ Ici on fait redirect directement, sans try/catch ni console.log
  if (res.url) {
    redirect(res.url)
  }
}
export async function signInWithFacebook() {
    const res = await auth.api.signInSocial({
    body: {
      provider: "facebook",
      callbackURL: "/", // pas besoin du callback complet
    },
  })

  // ⚠️ Ici on fait redirect directement, sans try/catch ni console.log
  if (res.url) {
    redirect(res.url)
  }
}
