import Head from "next/head";
import Sidebar from "../../widgets/Sidebar";
import TopBar from "../../widgets/TopBar";
import styles from "./styles.module.scss";
import Footer from "../../widgets/Footer";

const Layout = ({ children, title = "APL- Agency  | Airport Pickups London", description = "", keywords = "", loggedIn, isAuth, pageUrl = "" }) => {

  return (
    <div className={styles.container_layout}>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />  
         <meta name="robots" content="noindex,nofollow" />
      </Head>
      {loggedIn && <TopBar pageUrl={pageUrl} />}
      {loggedIn && <Sidebar pageUrl={pageUrl} />}
      <main>{children}</main>
      {(pageUrl !== "/my-bookings" && pageUrl !== "/account-users") ? <Footer /> : <></>}

    </div>
  );
};

export default Layout;
//channel id =>4