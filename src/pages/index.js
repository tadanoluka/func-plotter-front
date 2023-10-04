import Head from 'next/head'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button} from "@mui/material";


export default function Home() {
    const router = useRouter();

    const [userName, setUserName] = useState("")

    useEffect(() => {
        fetchContent().then(r => r);
    }, []);

    async function fetchContent() {
        let res;
        try {
            res = await fetch(`http://localhost:8080/secured/user`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        } catch (e) {
            console.log(e);
            await router.push("/signin")
            return;
        }

        if (res.ok) {
            const json = await res.text();
            setUserName(json)
        }else if (res.status === 401) {
            alert("401")
            await router.push("/signin")
        }else if (res.status === 403) {
            alert("403")
            await router.push("/signin")
        }
    }
    function handle() {
        localStorage.setItem("token", "");
    }

    return (
        <>
            <Head>
                <title>FuncPlotter</title>
                <meta name="description" content="FuncPlotter" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <Button onClick={handle}>Logout</Button>
                {
                    userName !== "" ?
                        <p>Signed in as: {userName}</p>
                        : <p>NOT AUTHORIZED</p>
                }
            </div>
        </>
    )
}
