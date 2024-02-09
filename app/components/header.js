import Link from 'next/link';

export default function Header() {
    return (
        <header className="mt-4">

            <div className="flex justify-between items-center mx-4">

                <div className="flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/calculator">Calculator</Link>
                    <Link href="/odds">Odds</Link>
                    <Link href="/games">FR Odds</Link>
                </div>

                <Link href="/login">Login</Link>

            </div>

        </header>
    );
}