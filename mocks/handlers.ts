import { http, HttpResponse } from 'msw'

import { sleep } from '../src/utils/sleep'

export const handlers = [
  http.get('http://localhost:4000/api/docs_list', async () => {
    const data = [
      { name: 'Vite', url: 'https://vitejs.dev/' },
      { name: 'Redux Style Guide', url: 'https://redux.js.org/style-guide/' },
      { name: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
      {
        name: 'RTK Query API Reference',
        url: 'https://redux-toolkit.js.org/rtk-query/api/createApi',
      },
      { name: 'Vitest', url: 'https://vitest.dev/' },
      { name: 'MSW', url: 'https://mswjs.io/' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
      {
        name: 'CSS Nesting',
        url: 'https://developer.chrome.com/articles/css-nesting/',
      },
      {
        name: 'CSS Modules',
        url: 'https://github.com/css-modules/css-modules',
      },
    ]
    await sleep(3000)

    return HttpResponse.json(data)
  }),
  http.post('http://localhost:4000/api/login', async () => {
    await sleep(1200)

    return HttpResponse.json({
      id: '001',
      user: 'JGWitkowski',
      email: 'jgwitkowski@gmail.com',
      token: 'faketoken',
    })
  }),
  http.post('http://localhost:4000/api/save-clam', async () => {
    await sleep(1200)

    return HttpResponse.json({
      name: 'Emmets',
    })
  }),
]
