import React from "react";
import Head from "next/head";
import Link from "next/link";

function Home() {
  return (
    <>
      <Head>
        <title>YAGDS</title>
      </Head>
      <div className="grid grid-cols-5 h-full">
        {/* <div className="col-span-3 bg-custom-accent"></div> */}
        <div></div>
      </div>
    </>
  );
}

export default Home;
