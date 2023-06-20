import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => { }, [name, email, avatar, password]);

    const handleSubmit = (event) => {
        let toSend = { name: '', avatar: '', email: '', password: '' };
        toSend.name = name;
        toSend.avatar = avatar;
        toSend.email = email;
        toSend.password = password;
        const url = "http://localhost:5242/api/auth/register";
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(toSend)
        };
        fetch(url, options)
            .then((response) => { console.log(response); })
            .catch((error) => { console.log(error) })
    };

    return (
        <div>
            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' className='form-control'
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='avatar'>Avatar</label>
                    <input type='text' name='avatar' className='form-control'
                        value={avatar}
                        onChange={(event) => setAvatar(event.target.value)} />
                </div>
                <div className="form-group">
                    <input type='submit' value='Register' className='form-control'
                         />
                </div>
            </form>
        </div>
    )
}
