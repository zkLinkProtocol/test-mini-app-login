import "./App.css";
import { MagicLinkLoginResult, useLogin } from "./hooks/useLogin";
import { useState } from "react";
function App() {
  const { login, logout } = useLogin();
  const [info, setInfo] = useState<MagicLinkLoginResult>();
  const handleLogin = async () => {
    const account = await login();
    // alert("account: " + JSON.stringify(account));
    setInfo(account);
  };

  return (
    <>
      <div>
        <h1>Telegram mini app login</h1>
        <button onClick={handleLogin}>Login</button>
        {info && <p className="info">{JSON.stringify(info)}</p>}

        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default App;
