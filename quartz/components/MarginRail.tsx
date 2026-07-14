import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

interface MarginNote {
  type: "footnote" | "scribble" | "image"
  num?: number
  text?: string
  caption?: string
  blank?: boolean
}

// Very small wikilink resolver: turns [[Page]] and [[Page|Display]]
// into real links. This is a simplified version of what Quartz's
// markdown transformer does for body text — frontmatter fields are
// NOT run through that pipeline automatically, which is why this
// exists at all. Matches on note title or a slugified filename;
// test against real notes before trusting it broadly, especially
// if you have similarly-titled notes.
function resolveWikilinks(
  text: string,
  allFiles: QuartzComponentProps["allFiles"],
  currentSlug: FullSlug,
): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = []
  const regex = /\[\[([^\]|]+)(\|([^\]]+))?\]\]/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const target = match[1].trim()
    const display = match[3]?.trim() ?? target
    const targetFile = allFiles.find(
      (f) =>
        f.frontmatter?.title === target ||
        f.slug?.endsWith(target.toLowerCase().replace(/\s+/g, "-")),
    )
    if (targetFile?.slug) {
      const href = resolveRelative(currentSlug, targetFile.slug)
      parts.push(
        <a key={key++} href={href} class="wikilink">
          {display}
        </a>,
      )
    } else {
      parts.push(display)
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export default (() => {
  const MarginRail: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const notes = (fileData.frontmatter?.marginNotes as MarginNote[] | undefined) ?? []
    if (notes.length === 0) return null

    return (
      <div class="margin-rail">
        {notes.map((note, i) => {
          if (note.type === "footnote") {
            return (
              <div class="margin-note" key={i}>
                <span class="fn-num">{note.num}</span>
                <span class="fn-text">
                  {resolveWikilinks(note.text ?? "", allFiles, fileData.slug!)}
                </span>
              </div>
            )
          }
          if (note.type === "scribble") {
            return (
              <div class={`margin-scribble${note.blank ? " blank" : ""}`} key={i}>
                {resolveWikilinks(note.text ?? "", allFiles, fileData.slug!)}
              </div>
            )
          }
          if (note.type === "image") {
            return (
              <div class="margin-image" key={i}>
                <span class="cap">{note.caption ?? "image"}</span>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
  return MarginRail
}) satisfies QuartzComponentConstructor
