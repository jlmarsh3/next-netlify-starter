import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import { client } from '@utils/prismicPosts'
import Post from '@components/Post'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />

        <div className="posts">
          {posts !== undefined &&
            posts.map((p) => {
              let title = p.title[0].text
              let key = `${p.date}+${title}`
              return <Post key={key} date={p.date} image={p.image} title={title} />
            })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  // query() is empty on purpose!
  // https://prismic.io/docs/rest-api/query-the-api/query-all-documents
  const res = await client.query('')

  const posts = res.results.map((p) => {
    return p.data
  })

  return {
    props: {
      posts,
    },
  }
}