import { useParams } from "react-router-dom";
import LoginForm from "../LOGIN/loginForm";
import RegisterForm from "../REGISTER/registerForm";

function AuthPage() {
  const { id } = useParams();
  // id va fi "login" sau "register", în funcție de ce ai în URL

  return (
    <div>
      {id === "login" && <LoginForm />}
      {id === "register" && <RegisterForm />}

      {/* Poți afișa și o eroare, dacă userul bagă /auth/ceva-necunoscut */}
      {id !== "login" && id !== "register" && (
        <p>URL invalid. The “{id}”  does not exist!</p>
      )}
    </div>
  );
}

export default AuthPage;