import { parseCookies } from "../helpers/cokieesFunc";
import Login from "./Agency";

export default function Home(props) {
    return (

        <Login />
    )
}

export async function getServerSideProps({ req, query }) {
    // Parse cookies from the request headers
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);
    // Check if the userId exists and is a valid number
    if (cookies["user-id"]) {
        // Redirect to '/new-booking' if userId exists
        return {
            redirect: {
                destination: '/new-booking',
                permanent: false,
            },
        };
    }
    // Return props to the page if no redirect
    return {
        props: {}, // You can pass additional props here if needed
    };
}