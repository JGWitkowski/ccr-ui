import Link from '../../compoments/Link/Link'
import { getToken } from '../../utils/auth'
import ListHover from '../ListHover/ListHover'

export const NavBar = () => {
  return (
    <nav className="z-10 w-full fixed bg-white border-gray-200 dark:bg-gray-900 border-b-2">
      {/* <ListHover /> */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-400">
            Clam Chowder Inn
          </span>
        </a>
        {/* {!getToken() && <Link text="Login" url="/login" />} */}
        {/* <div className="mb-4 w-full"> */}
        <Link text="Add Review" url="/clams-submit" />
        {/* </div> */}
      </div>
    </nav>
  )
}

export default NavBar
