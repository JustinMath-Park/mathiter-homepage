"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

interface Props {
  content: string;
}

export default function PostBody({ content }: Props) {
  return (
    <article className="prose-custom">
      <ReactMarkdown
        // singleTilde: false → only `~~two~~` triggers strikethrough,
        // not single `~` used in Korean range expressions like "A*~G".
        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
        // rehypeRaw lets us use <strong>한국어 직접 조사</strong>-style HTML
        // because Korean particles ('은', '이', '를' …) right after **bold**
        // break CommonMark right-flanking and leave ** as raw text.
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        // Localize the GFM footnote section labels (default English →
        // "Footnotes" / "Back to reference"). Korean parents read these.
        remarkRehypeOptions={{
          footnoteLabel: "용어 설명",
          footnoteBackLabel: (referenceIndex: number) =>
            `↑ 본문 ${referenceIndex + 1}번 위치로 돌아가기`,
        }}
        components={{
          h2: ({ children, id, ...props }) => {
            // Footnote section's "용어 설명" header — smaller, marks the
            // start of the appendix area at the bottom of the article.
            if (id === "footnote-label") {
              return (
                <h2
                  id={id}
                  className="text-sm font-bold tracking-widest text-muted uppercase mt-16 pt-8 mb-5 border-t border-gray-200"
                  {...props}
                >
                  {children}
                </h2>
              );
            }
            return (
              <h2
                id={id}
                className="text-2xl sm:text-3xl font-bold mt-12 mb-4 text-foreground"
                {...props}
              >
                {children}
              </h2>
            );
          },
          // Footnote reference markers in the body (small primary-colored
          // superscript link). e.g. "TIMSS¹·PISA²".
          sup: ({ children, ...props }) => (
            <sup
              className="text-[0.7em] font-semibold text-primary"
              {...props}
            >
              {children}
            </sup>
          ),
          // Definitions list at the bottom of the article — slightly muted
          // body so it reads as appendix, not main content.
          section: ({ children, ...props }) => {
            const isFootnotes =
              (props as { "data-footnotes"?: boolean })["data-footnotes"];
            if (isFootnotes) {
              return (
                <section
                  className="text-sm text-foreground/75 leading-relaxed [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:my-3 [&_li_p]:my-1"
                  {...props}
                >
                  {children}
                </section>
              );
            }
            return <section {...props}>{children}</section>;
          },
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-[1.85] text-foreground/85">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/85">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/85">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.8]">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary/40 bg-primary/5 px-5 py-4 rounded-r-lg italic text-foreground/80">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 bg-surface-dark rounded text-sm font-mono text-primary-dark">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-4 bg-surface-dark rounded-lg text-sm font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-4 py-2 text-foreground/85">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          hr: () => <hr className="my-10 border-gray-200" />,
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <span className="block my-10 -mx-4 sm:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof src === "string" ? src : ""}
                  alt={alt ?? ""}
                  className="block w-full rounded-2xl border border-gray-100 shadow-sm bg-surface"
                  loading="lazy"
                />
                {alt && (
                  <span className="mt-3 block text-center text-xs text-muted italic">
                    {alt}
                  </span>
                )}
              </span>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
