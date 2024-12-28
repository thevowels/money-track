import { useState, useEffect } from 'react'
import './styles/style.scss'
import {supabase} from "./utils/supabaseClient.js";
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession()
            .then(({data:{session}})=>{
                setSession(session);
            });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })
    },[])

  return (
    <div className="container">
        {!session ?<div className={"col-md-8 col-lg-5 mx-auto px-5"}>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>
        </div>: <div>Logged In</div>}
        {session && console.log(session)}

    </div>
  )
}

export default App
