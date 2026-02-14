import Link from 'next/link';
import '../global.css'

const
  pages = [
    { href: '/', title: 'Home' },
    // { href: '/info', title: 'Info' },
    { href: 'click-fetch', title: 'get Users by click' },
    { href: 'mount-fetch', title: 'get Isers on mount' },
    { href: 'todo', title: 'ToDo' }
    // { href: 'like-button', title: 'Lesson 5' },
    // { href: 'click-fetch', title: 'Users by click' },
    // { href: 'mount-fetch', title: 'Users on mount' },
  ];

export function Nav() {
  return <nav>
    <ul>
      {pages.map(({ href, title }) =>
        <li key={href}>
          <Link  href={href}>{title}</Link>
        </li>)}
    </ul>
  </nav>
}


export default function App({ Component, pageProps }) {
  return <>
    <header>
      <Nav />
    </header>

    <main>
      <Component {...pageProps} />
    </main>

    <footer>подвал</footer>
  </>
}