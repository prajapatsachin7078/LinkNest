import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './ui/Input'; // Assuming Input component is in the same folder
import Button from './ui/Button'; // Assuming Button component is in the same folder

const Login = () => {
    const navigate = useNavigate(); // hook for navigation
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = (): boolean => {
        const errors = { email: '', password: '' };
        if (!formData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';

        if (!formData.password) errors.password = 'Password is required';

        setFormErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Login successful!', formData);
            // Redirect to home page after successful login
            navigate('/');
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="max-w-md mx-auto p-10 border-2 rounded-md">
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">Welcome to SmartDock</h2>
                <h3 className="text-2xl font-semibold mb-4 text-center">Login</h3>
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
                        <Button variant="primary" size="md" text="Login" type="submit" />
                    </div>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-500 hover:underline"
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
