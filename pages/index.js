import React from 'react'
import Head from 'next/head'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Trending GitHub repositories</title>
      </Head>

      <div className="hero">
        <h1 className="title">Trending GitHub repositories</h1>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Home
