import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

const LINKS: Record<string, string> = {
  GitHub: "https://github.com/ranjith9357",
  "Discord Community": "https://discord.gg/PP58URH7",
}

export default (() => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>Ranjith © {year}</p>

        <ul>
          {Object.entries(LINKS).map(([text, link]) => (
            <li key={text}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
