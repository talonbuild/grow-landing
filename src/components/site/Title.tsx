import type { Headline } from "@/content/home";

/** A headline in lines with its one accent word, as in the App Store set (home.css .gd-title). */
export function Title({ lines, as: Tag = "h2", id, className = "" }: { lines: Headline; as?: "h1" | "h2"; id?: string; className?: string }) {
  return (
    <Tag className={`gd-title ${className}`} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="gd-line">
          {line.map((p, j) => (p.accent ? <em key={j}>{p.text}</em> : <span key={j}>{p.text}</span>))}
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
