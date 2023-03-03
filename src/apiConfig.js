let apiUrl
const expressPort = 3000
const apiUrls = {
  // production: 'https://thehive.onrender.com',
  production: 'https://busy-ruby-gazelle-cape.cyclic.app',
  development: `http://localhost:${expressPort}`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
