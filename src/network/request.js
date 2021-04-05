import axios from "axios"

export function request(config, method) {
  const instance = axios.create({
    baseURL: "http://172.17.169.27:8080",
    timeout: 5000,
    method: method,
  })
  return instance(config)
}