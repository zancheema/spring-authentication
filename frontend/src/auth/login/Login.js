import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import "./Login.css";

const AUTHORIZATION_URL = "http://localhost:8080/oauth2/authorize";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    if (localStorage.getItem("access-token")) return <Redirect to="/" />

    async function login(e) {
        e.preventDefault();

        const body = { email, password };
        const res = await fetch(
            "http://localhost:8080/auth/login",
            { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
        );
        const authResponse = await res.json();
        console.log(`authResponse: ${JSON.stringify(authResponse)}`);
        const { accessToken } = authResponse;
        console.log(`accessToken: ${accessToken}`);
        if (accessToken) {
            localStorage.setItem("access-token", accessToken);
            history.go(0);
        }
    }

    return (
        <div className="Login">
            <div className="Card">
                <label><h2 className="Login-heading">Login</h2></label>
                <div className="Login-form">
                    <form onSubmit={login}>
                        <div className="Container">
                            <input className="Textfield" type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="Container">
                            <input className="Textfield" type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="Button">Login</button>
                    </form>

                    <div className="Seperator" />

                    <div>
                        <a href={`${AUTHORIZATION_URL}/google`}>
                            <GoogleLoginButton />
                        </a>
                    </div>

                    <div>
                        <a href={`${AUTHORIZATION_URL}/github`}>
                            <GithubLoginButton />
                        </a>
                    </div>
                    <p>New user? <a href="/signup">Create an account</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;