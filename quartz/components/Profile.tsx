import { QuartzComponent, QuartzComponentProps } from "./types"

const Profile: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <details style={{ position: "relative" }}>
      <summary
        title="Profile"
        style={{
          cursor: "pointer",
          fontSize: "1.3rem",
          listStyle: "none",
        }}
      >
        👤
      </summary>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: "2rem",
          width: "220px",
          padding: "1rem",
          background: "var(--light)",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <img
          src="/static/profile.jpg"
          alt="Ranjith"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            marginBottom: "0.5rem",
          }}
        />
        <h3 style={{ margin: 0 }}>Ranjith</h3>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          Full Stack Developer
        </p>
        <p style={{ margin: 0, fontSize: "0.85rem" }}>🧠 Welcome to my Brain 	in the Cloud</p>
       <p style={{ margin: 0, fontSize: "0.85rem" }}>
         Connect with me:{" "}
    <a
      href="https://www.linkedin.com/in/ranjith9357"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#0A66C2", textDecoration: "none" }}
    >
      LinkedIn
    </a>
  </p>
      </div>
    </details>
  )
}

export default Profile
