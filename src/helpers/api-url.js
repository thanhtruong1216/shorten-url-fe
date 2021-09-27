let apiUrl = ""

if (process.env.NODE_ENV === "production") {
  apiUrl = "https://shortenurlbe.herokuapp.com"
} else {
  apiUrl = "http://localhost:3000"
}

export default apiUrl
