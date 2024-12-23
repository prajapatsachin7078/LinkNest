import { useState, ChangeEvent, FormEvent } from 'react';
import Input from './ui/Input'; // Assuming Input component is in the same folder
import Button from './ui/Button'; // Assuming Button component is in the same folder

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const errors: { email: string; password: string; confirmPassword: string } = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);

        // Check if there are any errors
        return Object.values(errors).every((error) => error === '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit logic here (e.g., API call)
            console.log('Form Submitted:', formData);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
                <div className="mb-4">
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        error={formErrors.confirmPassword}
                        required
                    />
                </div>
                <div className="mt-6">
                    <Button
                        variant="primary"
                        size="md"
                        text="Sign Up"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default Signup;
