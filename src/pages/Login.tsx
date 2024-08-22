import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
       
    }, [])

    return (
        <div>Login</div>
    )
}

export default Login