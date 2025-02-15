import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate import
import './UserData.css';

const UserData = () => {
    const location = useLocation();
    const userId = location.state?.userId;
    const navigate = useNavigate(); // Add this hook


    const [user, setUser] = useState({
        name: '',           // Using username instead of name
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        userType: 'consumer',
    });

    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const userData = {
            userId,
            name: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address,
            userType: user.userType
        };
    

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setMessage('User data submitted successfully!');
                setUser({
                    username: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    address: '',
                    userType: 'consumer',
                });
                navigate('/dashboard', { state: { userId: userId } });            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.detail || 'Failed to submit user data'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="user-data-container">
            <h2>User Data</h2>
            {message && (
                <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your username"
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your address"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>User Type:</label>
                    <select
                        name="userType"
                        value={user.userType}
                        onChange={handleChange}
                    >
                        <option value="consumer">Consumer</option>
                        <option value="farmer">Farmer</option>
                    </select>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default UserData;