import Image from 'next/image';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="flex flex-row items-center justify-between p-4 bg-white dark:bg-red-600" >
            <Image src="/logo.png" width={80} height={80} priority={true} alt="logo" />
            <Navbar />
        </header>
    );
}

export default Header;