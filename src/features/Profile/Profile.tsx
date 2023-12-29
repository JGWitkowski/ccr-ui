import { Box } from '@mui/material'

export const Profile = (props) => {
  return (
    <>
      <Box className="max-w-2xl flex flex-col m-auto p-4 mb-12 w-full">
        <h1 className="text-2xl self-start mb-2 mt-12 font-bold">
          Hey {localStorage.getItem('username')}!<br /> Profile features coming
          soon.
        </h1>
      </Box>
    </>
  )
}
export default Profile
