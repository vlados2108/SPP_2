import { useState } from "react";

export function LoginForm({authorize}) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");


  const login = async () => {
    const data = { username: username, password: pass };
    await fetch("http://localhost:5000/auth/login",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    ).then(res=>res.json).then(res=>{
      if (res.status = 200)
        authorize(true)
      else
        authorize(false)
    })
  };


  return (
    <>
      <div style={{ width: "30%", margin: "0 0 0 400px" }}>
        <h3>Login form</h3>
        <div className="form-group">
          <p>Username</p>
          <input
            type="text"
            value={username}
            id="login"
            className="form-control"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="login"
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            value={pass}
            type="password"
            id="password"
            className="form-control"
            name="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
}
