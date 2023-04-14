import "./App.css";
import { useState } from "react";
import Table from "./Components/table";
import FormAdd from "./Components/formAdd";
import Main from "./Components/Main";
import { RegistrationForm } from "./Components/RegistrationForm";
import { LoginForm } from "./Components/LoginForm";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const authorize = (value)=>{
    setAuthorized(value);
  }
  if (authorized)
    return (
      <>
        <Main authorize={authorize}/>
      </>
    );
  return (
    <>
      <LoginForm authorize={authorize}/>
      <RegistrationForm/>
    </>
  );
}

export default App;
