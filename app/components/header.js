import Link from 'next/link';

export default function Header() {
    return (
        <header className="mt-4">

            <div className="flex justify-between items-center mx-4">

                <div className="flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                <Link href="/login">Login</Link>

            </div>

        </header>
    );
}