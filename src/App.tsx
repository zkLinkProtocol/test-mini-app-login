import "./App.css";
import { useLogin } from "./hooks/useLogin";
function App() {
  const { login } = useLogin();
  const handleLogin = async () => {
    const account = await login();
    alert("account: " + account);
  };
  return (
    <>
      <div>
        <h1>Telegram mini app login</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

export default App;
