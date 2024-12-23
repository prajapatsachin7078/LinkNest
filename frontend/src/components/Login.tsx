import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface LoginFormData {
    email: string;
    password: string;
}
const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const errors: { email: string; password: string } = {
            email: '',
            password: ''
        };

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        setFormErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            // Simulate an API call with a delay (replace with actual API call)
            setTimeout(() => {
                console.log('Login Successful:', formData);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error('Login Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter your email"
                        error={formErrors.email}
                        required
                    />
                </div>
                <div className="mb-4">
                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Enter your password"
                        error={formErrors.password}
                        required
                    />
                </div>
                <div className="mt-6">
                    <Button
                        variant="primary"
                        size="md"
                        text={loading ? "Logging in..." : "Login"}
                        type="submit"
                        loading={loading}
                    />
                </div>
            </form>
        </div>
    );
};


export default Login;