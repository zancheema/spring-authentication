import { useState } from "react";
import { Redirect, useHistory } from "react-router";

import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function signupNewUser(e) {
        e.preventDefault();

        const body = { name, email, password };

        console.log(`signupNewUser body: ${body}`);

        try {
            await fetch(
                "http://localhost:8080/auth/signup",
                { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
            );
            alert('Signup successful');
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            alert(`Error signing up: ${err.message}`);
        }
        // alert(res.status === 201 ? "User signed up successfully." : "Signup failed");
    }

    if (localStorage.getItem("access-token")) return <Redirect to="/" />

    return (
        <div className="Signup">
            <div className="Card">
                <div className="Container">
                    <label><h2>Create new account</h2></label>
                    <form className="Signup-form" onSubmit={signupNewUser}>
                        <div className="Container">
                            <input className="Textfield" placeholder="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="Container">
                            <input className="Textfield" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="Container">
                            <input className="Textfield" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button className="Button" type="submit">Signup</button>
                    </form>
                    <p>Signedup already? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;