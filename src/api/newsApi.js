import axios from 'axios'

export const fetchFromGuardian = async ({ queryKey }) => {
  // queryKey: ['guardian', { q, page, pageSize }]
  const [_key, { q, page, pageSize }] = queryKey
  const params = {
    q: q || 'news',
    'page-size': pageSize || 12,
    page: page || 1,
    'show-fields': 'trailText,thumbnail,byline',
    'api-key': process.env.VITE_GUARDIAN_API_KEY
  }

  const res = await axios.get('/guardian/search', { params })
  return {
    results: res.data.response.results,
    total: res.data.response.total,
    currentPage: res.data.response.currentPage,
    pages: res.data.response.pages
  }
}
