export const isLocal = () => {
  return !process.env.NODE_ENV
}
export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}
export const isProd = () => {
  return !isDev()
}

export const getEnv: any = (key) => {
  if (key) return process.env[key]
  return process.env
}
