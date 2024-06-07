import { useState } from 'react';

import envVars from "@/src/utils/envVars";

export default function authenticate () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    const authenticate = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            if (response.status === 401) throw new Error('Pogrešno korisničko ime ili lozinka!');

            if (!response.ok) throw new Error('Greška u prijavi!');

            const responseJson = await response.json();
            setToken(responseJson.token);

        } catch (error) {
            // @ts-ignore
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, loading, error, token, authenticate };
};