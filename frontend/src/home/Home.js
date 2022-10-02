import "./Home.css";
import { Redirect, useHistory } from "react-router";
import { useEffect, useState } from "react";

function Home() {
    const [user, setUser] = useState("");
    const history = useHistory();

    const accessToken = localStorage.getItem("access-token");
    useEffect(async () => {
        if (!accessToken) return;
        try {
            const res = await fetch("http://localhost:8080/user/me", {
                headers: { "Authorization": `Bearer ${accessToken}` }
            });
            if (res.status == 401) {
                localStorage.removeItem("access-token");
                return history.go(0);
            }
            const user = await res.json();
            console.log(`user: ${JSON.stringify(user)}`);
            // setName(user.name);
            setUser(user);
        } catch (err) {
            history.go(0);
        }
    }, [accessToken, history]);
    if (!accessToken) return <Redirect to="/login" />

    function logout(e) {
        e.preventDefault();

        localStorage.removeItem("access-token");
        history.push(0);
    }

    return (
        <div className="Card">
            <div className="Container">
                <img className="Avatar" src={user.imageUrl} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>

                <button className="Button Logout-button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;