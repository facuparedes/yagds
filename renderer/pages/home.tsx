import Head from "next/head";
import useIsOnline from "../common/hooks/useIsOnline";
import useisLoggedIn from "../common/hooks/useIsLoggedIn";
import LoadingOfflineAndLogin from "../common/components/pages/home/LoadingOfflineAndLogin";

export default function Home() {
  const [previousIsOnline, isOnline, retryingCountdown] = useIsOnline();
  // const [isLoggedIn] = useisLoggedIn();
  const isLoggedIn = false;

  return (
    <>
      <Head>
        <title>YAGDS</title>
      </Head>
      <LoadingOfflineAndLogin {...{ previousIsOnline, isOnline, retryingCountdown, isLoggedIn }} />
      {isOnline && isLoggedIn && <span>Dashboard</span>}
    </>
  );
}
