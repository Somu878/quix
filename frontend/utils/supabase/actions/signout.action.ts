'use server'

import { createClient } from "../server"

export const signout = async()=>{
    const supabase = createClient()
    const {error} = await supabase.auth.signOut()

    if(error){
        throw error
    }
}