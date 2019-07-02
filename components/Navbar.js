import Link from 'next/link';
import styled from 'styled-components';

const NavbarStyle = styled.div`
    display: flex;
    background-color: gray;
    justify-content: space-around;
    padding: 1rem;
    color: blue;
`;

const Navbar = () => {
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
        </NavbarStyle>
    );
};

export default Navbar;
