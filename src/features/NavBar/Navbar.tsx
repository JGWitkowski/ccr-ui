import { Box } from '@mui/material'
import Link from '../../compoments/Link/Link'
import { useSelector } from 'react-redux'
import ProfileIcon from '../../account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import AddIcon from '../../add_location_FILL0_wght400_GRAD0_opsz24.svg'

export const NavBar = () => {
  const user = useSelector((state) => state.user)
  console.log('user: ', user)
  const token = useSelector((state) => state.auth.token)

  return (
    <nav className="z-10 w-full fixed bg-white border-gray-200 dark:bg-gray-900 border-b-2">
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link
          url="/"
          className="border-none flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className=" font-serif self-center text-3xl tracking-wide font-semibold whitespace-nowrap dark:text-blue-400">
            [CCI LOGO]
          </span>
        </Link>
        <Box className="flex flex-row gap-5">
          {!localStorage.getItem('refreshToken') && (
            <>
              <Link text="Sign in" url="/login" />
              <Link text="Register" url="/create-account" />
            </>
          )}
          {localStorage.getItem('refreshToken') && (
            <>
              <Link url="/clams-submit">
                <img className="pr-1" src={AddIcon} />
                Add Review
              </Link>
              <Link url="/profile">
                <img src={ProfileIcon} className="pr-1" />
                {localStorage.getItem('username')}
              </Link>
            </>
          )}
        </Box>
      </div>
    </nav>
  )
}

export default NavBar
