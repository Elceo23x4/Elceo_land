export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "monospace",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <h1 style={{ color: "#d4790a", fontSize: "3rem", margin: "0 0 0.5rem" }}>
          404
        </h1>
        <p style={{ color: "#888", marginBottom: "2rem", lineHeight: 1.6 }}>
          This route does not exist within the ELCEO surface.
        </p>
        <a
          href="/"
          style={{
            color: "#d4790a",
            textDecoration: "none",
            border: "1px solid #d4790a44",
            padding: "0.5rem 1.25rem",
            borderRadius: "3px",
            fontSize: "0.85rem",
            letterSpacing: "0.04em",
          }}
        >
          Return to ELCEO
        </a>
      </div>
    </div>
  );
}
