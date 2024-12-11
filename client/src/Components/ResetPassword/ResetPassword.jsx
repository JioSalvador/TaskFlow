import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword, error, message } = useAuthStore()
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match!")
        }

        try{
            await resetPassword(token, password)
            toast.success('Password reset successfully, redirecting to login page...')

            setTimeout(()=>{
                navigate('/LoginSignup');
            }, 2000);
        } catch (err) {
            console.error(err)
            toast.error(error.message || "Error resetting password")
        }
    }

    return (
    <div className='container'>
        <div className='fields'>
            <h2>
                Reset password
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type = 'password'
                    placeholder = 'New Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required>
                </input>
                <input
                    type = 'password'
                    placeholder = 'Confirm Password'
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                    required>

                </input>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    </div>
    );
}

export default ResetPasswordPage;
