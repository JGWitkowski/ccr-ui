const Home = () => {
  return (
    <div className="max-w-2xl flex flex-col m-auto items-start p-4">
      <h1 className="text-lg text-left mb-6">
        Clam system in progress. Choose between limited options below:
      </h1>
      <a
        href="/clams-submit"
        className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit Review
      </a>
      <a
        href="/clams"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        View All Reviews
      </a>
    </div>
  )
}

export default Home
