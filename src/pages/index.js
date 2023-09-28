import Head from 'next/head'
import { Button, Stack, TextField} from "@mui/material";
import Image from "next/image";
import {PasswordField} from "@/components/MyFields";
import Link from "next/link";


export default function Home() {
    return (
        <>
            <Head>
                <title>FuncPlotter</title>
                <meta name="description" content="FuncPlotter" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="loginPage">
                 <Image src="/images/Logo.png"
                    width={283}
                    height={146}
                    alt="Logo" />
                <TextField label="Login" variant="filled" />
                <PasswordField />
                <Button variant ="contained">
                    <Link href="/plotterPage">Log in</Link>
                </Button>

            </div>
        </>
    )
}
