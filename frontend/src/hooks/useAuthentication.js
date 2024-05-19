import { useState } from 'react';

export default function useAuthentication () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    const authenticate = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://192.168.54.191:8080/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            console.log(response)

            if (response.status === 401) throw new Error('Pogrešno korisničko ime ili lozinka!');

            if (!response.ok) throw new Error('Greška u prijavi!');

            const responseJson = await response.json();
            setToken(responseJson.token);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, loading, error, token, authenticate };
};