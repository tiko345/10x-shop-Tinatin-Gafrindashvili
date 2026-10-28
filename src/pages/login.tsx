import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

type LoginErrors = {
    username?: string;
    password?: string;
};

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const [errors, setErrors] = useState<LoginErrors>({});

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors: LoginErrors = {};

        if (username.trim() === "") {
            nextErrors.username = "Username is required";
        }

        if (password === "") {
            nextErrors.password = "Password is required";
        } else if (password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters";
        }

        setErrors(nextErrors);

        if (nextErrors.username || nextErrors.password) {
            return;
        }

        login(username.trim());
        setPassword("");
        navigate("/", { replace: true });
    }
    return (
        <section className="mx-auto my-10 w-full max-w-md rounded-2xl bg-blue-100 px-6 py-8 text-slate-900 shadow-lg">
            <h1 className="mb-6 text-3xl font-bold">Log in</h1>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                    <label
                        htmlFor="username"
                        className="mb-1 block font-medium"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.username}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-1 block font-medium"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.password}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                    Log In
                </button>
            </form>

            <Link
                to="/"
                className="mt-6 inline-block rounded text-blue-700 hover:text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
                ← Back to catalog
            </Link>
        </section>
    );
}

export default Login;