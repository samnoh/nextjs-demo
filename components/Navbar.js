import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';

import { postLogout } from 'modules/user';

const NavbarStyle = styled.div`
    display: flex;
    background-color: gray;
    justify-content: space-around;
    padding: 1rem;
    color: blue;
`;

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const logout = useCallback(() => {
        dispatch(postLogout());
        Router.push('/');
    }, []);

    return (
        <NavbarStyle>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/contact">
                <a>Contact</a>
            </Link>
            {!user && (
                <Link href="/login">
                    <a>Login</a>
                </Link>
            )}
            {user && <a onClick={logout}>Logout</a>}
        </NavbarStyle>
    );
};

export default Navbar;
