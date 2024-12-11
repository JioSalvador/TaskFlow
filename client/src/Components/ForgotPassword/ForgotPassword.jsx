import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { formToJSON } from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    }

    return (
        <div>
            <div className='container'>
                <h2>Forgot Password</h2>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <p>Enter your email address</p>
                        <input
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                ) : (
                    <div>
                        <p>
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>

            <div className=''>
                <Link to="/LoginSignup">Back to Login</Link>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
