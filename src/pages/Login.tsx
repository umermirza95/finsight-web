import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("logging in")
        const email = process.env.REACT_APP_EMAIL;
        const password = process.env.REACT_APP_PASSWORD;
        if (!!email && !!password) {
            signInWithEmailAndPassword(getAuth(), email, password).then(() => {
                navigate("/", {replace: true})
            })
        }

    }, [])

    return (
        <div>Login Page</div>
    )
}

export default Login