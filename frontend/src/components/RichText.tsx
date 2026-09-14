import React from "react";

interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

interface RichTextProps {
  content?: string | RichTextBlock[] | null;
  className?: string;
}

function renderChild(
  child: RichTextChild,
  key: string | number
): React.ReactNode {
  if (!child) {
    return null;
  }

  let content: React.ReactNode;

  if (child.children?.length) {
    content = child.children.map((nestedChild, index) =>
      renderChild(nestedChild, `${key}-${index}`)
    );
  } else {
    content = child.text ?? "";
  }

  if (child.code) {
    content = <code>{content}</code>;
  }

  if (child.bold) {
    content = <strong>{content}</strong>;
  }

  if (child.italic) {
    content = <em>{content}</em>;
  }

  if (child.underline) {
    content = <u>{content}</u>;
  }

  if (child.strikethrough) {
    content = <s>{content}</s>;
  }

  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderChildren(children?: RichTextChild[]) {
  if (!children?.length) {
    return null;
  }

  return children.map((child, index) =>
    renderChild(child, index)
  );
}

function getBlockText(block: RichTextBlock): string {
  return (block.children ?? [])
    .map((child) => {
      if (child.children?.length) {
        return child.children
          .map((nested) => nested.text ?? "")
          .join("");
      }

      return child.text ?? "";
    })
    .join("");
}

function parseManualHeading(text: string) {
  const match = text.match(
    /^\s*\[H([1-6])\]\s*(.*)$/i
  );

  if (!match) {
    return null;
  }

  return {
    level: Number(match[1]),
    text: match[2],
  };
}

function Heading({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  const safeLevel = Math.min(
    Math.max(level, 1),
    6
  );

  switch (safeLevel) {
    case 1:
      return <h1>{children}</h1>;

    case 2:
      return <h2>{children}</h2>;

    case 3:
      return <h3>{children}</h3>;

    case 4:
      return <h4>{children}</h4>;

    case 5:
      return <h5>{children}</h5>;

    case 6:
      return <h6>{children}</h6>;

    default:
      return <h2>{children}</h2>;
  }
}

export default function RichText({
  content,
  className = "",
}: RichTextProps) {
  if (!content) {
    return null;
  }

  if (typeof content === "string") {
    return (
      <div className={className}>
        {content.split("\n").map((line, index) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return null;
          }

          const manualHeading =
            parseManualHeading(trimmed);

          if (manualHeading) {
            return (
              <Heading
                key={index}
                level={manualHeading.level}
              >
                {manualHeading.text}
              </Heading>
            );
          }

          return <p key={index}>{line}</p>;
        })}
      </div>
    );
  }

  if (!Array.isArray(content)) {
    return null;
  }

  return (
    <div className={className}>
      {content.map((block, index) => {
        if (!block || typeof block !== "object") {
          return null;
        }

        const text = getBlockText(block);
        const trimmedText = text.trim();

        const manualHeading =
          parseManualHeading(trimmedText);

        if (manualHeading) {
          return (
            <Heading
              key={index}
              level={manualHeading.level}
            >
              {manualHeading.text}
            </Heading>
          );
        }

        if (block.type === "heading") {
          return (
            <Heading
              key={index}
              level={
                typeof block.level === "number"
                  ? block.level
                  : 2
              }
            >
              {renderChildren(block.children)}
            </Heading>
          );
        }

        if (block.type === "paragraph") {
          if (!trimmedText) {
            return null;
          }

          return (
            <p key={index}>
              {renderChildren(block.children)}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index}>
              {renderChildren(block.children)}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const isOrdered =
            block.format === "ordered";

          const ListTag = isOrdered ? "ol" : "ul";

          return (
            <ListTag key={index}>
              {renderChildren(block.children)}
            </ListTag>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>
                {renderChildren(block.children)}
              </code>
            </pre>
          );
        }

        if (block.type === "link") {
          return (
            <a
              key={index}
              href={text}
            >
              {renderChildren(block.children)}
            </a>
          );
        }

        if (trimmedText) {
          return (
            <p key={index}>
              {renderChildren(block.children)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}