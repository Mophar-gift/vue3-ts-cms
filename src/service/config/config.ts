const TIME_OUT = 10000
let BASE_URL = '/api'

if (import.meta.env.PROD) {
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = '/api'
}

export { TIME_OUT, BASE_URL }
