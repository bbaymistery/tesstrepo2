import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom410() {
    const router = useRouter();

    // Optional: Redirect back to the homepage or another page after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            // router.push('/');
        }, 5000); // Redirects after 5 seconds
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Whoops! 410 - Page Gone</h1>
            <p>Looks like this page packed its bags and left town! 🏖 </p>
            <p>But don’t worry, we’ve got you covered.</p>
            <a href="/">
                Please click here to head back to the home page!
            </a>
        </div>
    );
}