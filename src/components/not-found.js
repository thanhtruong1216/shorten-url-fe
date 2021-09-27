import styled from "styled-components"

function NotFound() {
  const Container = styled.section`
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    backgroundColor: "#FFEFD5",
  `
  return (
    <>
      <Container
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          backgroundColor: "#FFEFD5",
        }}
      >
        <p>We are sorry...</p>
        <p>Page not found</p>
      </Container>
    </>
  )
}

export default NotFound
