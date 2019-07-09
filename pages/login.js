import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { postUser } from 'modules/user';
import useInput from 'hooks/useInput';

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const loadinLogin = useSelector(state => state.loading)['user/POST_USER'];

    useEffect(() => {
        if (user) {
            Router.push('/');
        }
    }, [user && user.userId]);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();

            return dispatch(
                postUser({
                    userId: id,
                    password
                })
            );
        },
        [id, password]
    );

    return (
        <>
            {!loadinLogin && !user && (
                <form onSubmit={onSubmit} style={{ textAlign: 'center', marginTop: '50px' }}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <input name="user-id" value={id} required onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <input
                            name="user-password"
                            type="password"
                            value={password}
                            required
                            onChange={onChangePassword}
                        />
                    </div>
                    <br />
                    <button type="submit">Login</button>
                </form>
            )}
        </>
    );
};

export default Signup;
