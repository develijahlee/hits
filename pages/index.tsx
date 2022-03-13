import { useEffect, useState, KeyboardEvent } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [copyData, setCopyData] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch('http://testapi.hits.ai/result/')
      const data = await response.json()
      setData(data)
      setCopyData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const searchData = (): void => {
    if (value.length > 0) {
      setData(copyData.filter((d: any) => d[0] === value))
    } else if (value.length === 0) {
      setData(copyData)
    }
  }

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchData()
    }
  }

  const sortData = (option: string): void => {
    if (option === 'sortFoxtrotAscending') {
      setData(data => [...data].sort((a, b) => a[1] - b[1]))
    } else if (option === 'sortFoxtrotDescending') {
      setData(data => [...data].sort((a, b) => b[1] - a[1]))
    } else if (option === 'sortGolfAscending') {
      setData(data => [...data].sort((a, b) => a[2] - b[2]))
    } else if (option === 'sortGolfDescending') {
      setData(data => [...data].sort((a, b) => b[2] - a[2]))
    }
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
                <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={(e) => handleOnEnter(e)} />
                <button onClick={searchData}>search</button>
              </div>
              <button>download</button>
            </div>
          </div>
          <div className={styles.selectedWrap}>
            {selected.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
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
                        <button onClick={() => sortData('sortFoxtrotAscending')}>
                          <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                        <button onClick={() => sortData('sortFoxtrotDescending')}>
                          <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                      </div>
                    </th>
                    <th className={styles.spaceTwo}></th>
                    <th className={styles.golf}>
                      <span>Golf</span>
                      <div>
                        <button onClick={() => sortData('sortGolfAscending')}>
                          <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                        <button onClick={() => sortData('sortGolfDescending')}>
                          <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <TableRow d={d} key={`${d[0] + d[1] + d[2]}`} setSelected={setSelected} />
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

const TableRow = ({ d, setSelected }: { d: any, setSelected: Function }) => {
  const [subData, setSubData] = useState([])
  const [showSubData, setShowSubData] = useState(false)
  const [subLoading, setSubLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(d[0])

  const fetchSubData = async (name: string): Promise<void> => {
    setIsOpen(open => !open)
    if (!showSubData) {
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
    } else if (showSubData && !isOpen) {
      setSubData(data => [...data].sort((a, b) => a[0] - b[0]))
    }
  }

  const sortSubData = (option: string): void => {
    if (option === 'sortFoxtrotAscending') {
      setSubData(data => [...data].sort((a, b) => a[1] - b[1]))
    } else if (option === 'sortFoxtrotDescending') {
      setSubData(data => [...data].sort((a, b) => b[1] - a[1]))
    } else if (option === 'sortGolfAscending') {
      setSubData(data => [...data].sort((a, b) => a[2] - b[2]))
    } else if (option === 'sortGolfDescending') {
      setSubData(data => [...data].sort((a, b) => b[2] - a[2]))
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
          <tr className={`${styles.subDataTrBtn} ${isOpen ? '' : styles.isClosed}`}>
            <td>
              <button className={styles.checkAllBtn}>check all</button>
              <button className={styles.clearBtn}>clear</button>
            </td>
          </tr>
          <tr className={`${styles.subDataTrHeader} ${isOpen ? '' : styles.isClosed}`}>
            <td>
              id
            </td>
            <td className={styles.spaceOne}></td>
            <td className={styles.subTableFoxtrotWrap}>
              <span>Foxtrot</span>
              <div>
                <button onClick={() => sortSubData('sortFoxtrotAscending')}>
                  <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                </button>
                <button onClick={() => sortSubData('sortFoxtrotDescending')}>
                  <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                </button>
              </div>
            </td>
            <td className={styles.spaceTwo}></td>
            <td className={styles.subTableGolfWrap}>
              <span>Golf</span>
              <div>
                <button onClick={() => sortSubData('sortGolfAscending')}>
                  <Image src="/images/up-arrow.svg" alt="logo" width={13} height={14}></Image>
                </button>
                <button onClick={() => sortSubData('sortGolfDescending')}>
                  <Image src="/images/down-arrow.svg" alt="logo" width={13} height={14}></Image>
                </button>
              </div>
            </td>
          </tr>
          {subData.map((d) => (
            <SubTableRow key={`${d[0] + d[1] + d[2]}`} d={d} isOpen={isOpen} name={name} setSelected={setSelected}></SubTableRow>
          ))}
        </>
      ) : (
        <>
        </>
      )}
    </>
  )
}

const SubTableRow = ({ d, isOpen, name, setSelected }: { d: any, isOpen: boolean, name: string, setSelected: Function }) => {
  const [isSelected, setIsSelected] = useState(false)

  const upDateSelected = (): void => {
    setIsSelected(true)
    setSelected((selected: any) => [...selected, name + d[0]])
  }

  return (
    <tr onClick={upDateSelected} className={`${styles.subDataTrData} ${isOpen ? '' : styles.isClosed} ${isSelected ? styles.isSelected : ''}`}>
      <td>
        {d[0]}
      </td>
      <td className={styles.spaceOne}></td>
      <td>
        {parseFloat(Number(d[1]).toFixed(5))}
      </td>
      <td className={styles.spaceTwo}></td>
      <td>
        {parseFloat(Number(d[2]).toFixed(5))}
      </td>
    </tr>
  )
}

export default Home
