import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch('http://testapi.hits.ai/result/')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sortFoxtrotAscending = (): void => {
    setData(data => [...data].sort((a, b) => a[1] - b[1]))
  }

  const sortFoxtrotDescending = (): void => {
    setData(data => [...data].sort((a, b) => b[1] - a[1]))
  }

  const sortGolfAscending = (): void => {
    setData(data => [...data].sort((a, b) => a[2] - b[2]))
  }

  const sortGolfDescending = (): void => {
    setData(data => [...data].sort((a, b) => b[2] - a[2]))
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'></link>
      </Head>

      <header className={styles.header}>
        <Image src="/images/logo.png" alt="logo" width={200} height={73}></Image>
      </header>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/404">
              <a>Alpha</a>
            </Link>
          </li>
          <li>
            <Link href="/404">
              <a>Bravo</a>
            </Link>
          </li>
          <li>
            <Link href="/404">
              <a>Charlie</a>
            </Link>
          </li>
          <li>
            <Link href="/404">
              <a>Delta</a>
            </Link>
          </li>
          <li>
            <Link href="/404">
              <a>Echo</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Result</a>
            </Link>
          </li>
        </ul>
        <span>project name</span>
      </nav>

      <main className={styles.main}>
        <>
          <div className={styles.resultWrap}>
            <h2>Result</h2>
            <div className={styles.resultWrapInnerRight}>
              <div className={styles.searchBarWrap}>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                <button>search</button>
              </div>
              <button>download</button>
            </div>
          </div>
          {
            loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className={styles.spaceOne}></th>
                    <th className={styles.foxTrot}>
                      <span>Foxtrot</span>
                      <div>
                        <button onClick={sortFoxtrotAscending}>
                          <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                        <button onClick={sortFoxtrotDescending}>
                          <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                      </div>
                    </th>
                    <th className={styles.spaceTwo}></th>
                    <th className={styles.golf}>
                      <span>Golf</span>
                      <div>
                        <button onClick={sortGolfAscending}>
                          <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                        <button onClick={sortGolfDescending}>
                          <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <TableRow d={d} key={i} />
                  ))}
                </tbody>
              </table>
            )
          }
        </>
      </main>
    </div>
  )
}

const TableRow = ({ d }: { d: any }) => {
  const [subData, setSubData] = useState([])
  const [showSubData, setShowSubData] = useState(false)
  const [subLoading, setSubLoading] = useState(false)

  const fetchSubData = async (name: string): Promise<void> => {
    try {
      setSubLoading(true)
      const response = await fetch(`http://testapi.hits.ai/result/${name}`)
      const data = await response.json()
      setSubData(data)
      setShowSubData(true)
    } catch (error) {
      console.error(error)
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <>
      <tr className={styles.tableRow}>
        <td onClick={() => fetchSubData(d[0])} className={styles.name}><span>{d[0]}</span></td>
        <td className={styles.spaceOne}></td>
        <td>{parseFloat(Number(d[1]).toFixed(5))}</td>
        <td className={styles.spaceTwo}></td>
        <td>{parseFloat(Number(d[2]).toFixed(5))}</td>
      </tr>
      {subLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : showSubData ? (
        <>
          <tr>
            <td>
              <button>check all</button>
              <button>clear</button>
            </td>
          </tr>
          <tr>
            <td>
              id
            </td>
            <td className={styles.spaceOne}></td>
            <td>
              Foxtrot
            </td>
            <td className={styles.spaceTwo}></td>
            <td>
              Golf
            </td>
          </tr>
          {subData.map((d, i) => (
            <tr key={i}>
              <td>
                {d[0]}
              </td>
              <td className={styles.spaceOne}></td>
              <td>
                {d[1]}
              </td>
              <td className={styles.spaceTwo}></td>
              <td>
                {d[2]}
              </td>
            </tr>
          ))}
        </>
      ) : (
        <>
        </>
      )}
    </>
  )
}

export default Home
