import {Button, Stack, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout";
import styles from "../components/layout.module.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2D2E33",
            hover: "#292A2E"
        },
        secondary: {
            main: "#616266",
            hover: "#515257",
        },
        mybg: {
            main: "#404146",
        }
    }
})

const MyTextField = styled(TextField)({
    '& .MuiFilledInput-root': {
        backgroundColor: '#2D2E33',
        borderRadius: '7px 7px 0 0',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
    },
    '& .MuiFilledInput-root:hover': {
        backgroundColor: '#292A2E',
    },
    '& .MuiInputLabel-root': {
        color: '#fff',
    },
    '& .MuiInputLabel-root:focus': {
        color: '#fff',
    },
    '& .MuiFilledInput-underline': {
        color: '#fff',
    },
    '& .MuiFilledInput-underline:before': {
        borderWidth: '2px',
        borderBottomColor: '#25262A',
    },
    '& .MuiFilledInput-underline:hover::before': {
        borderBottomColor: '#222326',
        borderWidth: '2px',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#616266',
    },
    '& .MuiFilledInput-underline:hover::after': {
        borderBottomColor: '#616266',
    },
});

export default function Signin() {
    return (
        <Layout>
            <Image className={styles.logoImage}
                   src="/images/Logo.png"
                   width={283}
                   height={146}
                   alt="Function\n Plotter" />

            <form className={styles.signinForm}>
                <ThemeProvider theme={theme}>
                    <Stack spacing={5}>
                        <MyTextField className={styles.signinFormField} type="login" label="Login" variant="filled" color="primary"/>
                        <MyTextField className={styles.signinFormField} type="password" label="Password" variant="filled"/>
                    </Stack>
                    <Button className={styles.signinFormButton} type="submit" variant="contained" color="secondary">Sign in</Button>
                </ThemeProvider>
            </form>
            <div className={styles.signupPanel}>
                Don't have an account?
                <Link href="/signup" className={styles.signupLink}>Sign up</Link>
            </div>
        </Layout>
    )
}
