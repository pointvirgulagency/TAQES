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
  if (!child) return null;

  let content: React.ReactNode;

  if (child.children && child.children.length > 0) {
    content = child.children.map((nestedChild, index) =>
      renderChild(nestedChild, `${key}-${index}`)
    );
  } else {
    content = child.text ?? "";
  }

  if (child.code) {
    content = (
      <code
        key={`${key}-code`}
        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em]"
      >
        {content}
      </code>
    );
  }

  if (child.bold) {
    content = <strong key={`${key}-bold`}>{content}</strong>;
  }

  if (child.italic) {
    content = <em key={`${key}-italic`}>{content}</em>;
  }

  if (child.underline) {
    content = <u key={`${key}-underline`}>{content}</u>;
  }

  if (child.strikethrough) {
    content = <s key={`${key}-strike`}>{content}</s>;
  }

  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderChildren(children?: RichTextChild[]) {
  if (!children || !Array.isArray(children)) {
    return null;
  }

  return children.map((child, index) =>
    renderChild(child, index)
  );
}


function getBlockText(block: RichTextBlock): string {
  return (block.children ?? [])
    .map((child) => {
      if (child.children) {
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

/* =========================================================
   HEADING COMPONENT
========================================================= */

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

  const classes = {
    1: "mt-10 mb-6 text-4xl font-bold leading-tight tracking-tight text-[#094734]",
    2: "mt-10 mb-5 text-3xl font-bold leading-tight tracking-tight text-[#094734]",
    3: "mt-8 mb-4 text-2xl font-bold leading-tight text-[#094734]",
    4: "mt-7 mb-3 text-xl font-semibold leading-tight text-[#094734]",
    5: "mt-6 mb-3 text-lg font-semibold leading-tight text-[#094734]",
    6: "mt-5 mb-2 text-base font-semibold leading-tight text-[#094734]",
  } as const;

  const className = classes[
    safeLevel as keyof typeof classes
  ];

  switch (safeLevel) {
    case 1:
      return <h1 className={className}>{children}</h1>;

    case 2:
      return <h2 className={className}>{children}</h2>;

    case 3:
      return <h3 className={className}>{children}</h3>;

    case 4:
      return <h4 className={className}>{children}</h4>;

    case 5:
      return <h5 className={className}>{children}</h5>;

    case 6:
      return <h6 className={className}>{children}</h6>;

    default:
      return <h2 className={className}>{children}</h2>;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function RichText({
  content,
  className = "",
}: RichTextProps) {
  if (!content) {
    return null;
  }

  /* =======================================================
     PLAIN STRING
  ======================================================= */

  if (typeof content === "string") {
    const lines = content.split("\n");

    return (
      <div className={`rich-text ${className}`}>
        {lines.map((line, index) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return <div key={index} className="h-4" />;
          }

          /* Manual [H1] ... [H6] */
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

          return (
            <p
              key={index}
              className="mb-5 text-base leading-8 text-gray-700"
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }

  /* =======================================================
     INVALID CONTENT
  ======================================================= */

  if (!Array.isArray(content)) {
    return null;
  }

  /* =======================================================
     STRAPI BLOCKS
  ======================================================= */

  return (
    <div className={`rich-text ${className}`}>
      {content.map((block, index) => {
        if (
          !block ||
          typeof block !== "object"
        ) {
          return null;
        }

        const text = getBlockText(block);
        const trimmedText = text.trim();

        /* =================================================
           MANUAL [H2], [H3], ETC.
        ================================================= */

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

        /* =================================================
           STRAPI REAL HEADING
        ================================================= */

        if (block.type === "heading") {
          const level =
            typeof block.level === "number"
              ? block.level
              : 2;

          return (
            <Heading
              key={index}
              level={level}
            >
              {renderChildren(block.children)}
            </Heading>
          );
        }

        /* =================================================
           PARAGRAPH
        ================================================= */

        if (block.type === "paragraph") {
          /*
           * Also detect [H2] if it is stored as a paragraph.
           */

          const paragraphHeading =
            parseManualHeading(trimmedText);

          if (paragraphHeading) {
            return (
              <Heading
                key={index}
                level={paragraphHeading.level}
              >
                {paragraphHeading.text}
              </Heading>
            );
          }

          if (!trimmedText) {
            return (
              <div
                key={index}
                className="h-3"
              />
            );
          }

          return (
            <p
              key={index}
              className="mb-5 text-base leading-8 text-gray-700"
            >
              {renderChildren(block.children)}
            </p>
          );
        }

        /* =================================================
           QUOTE
        ================================================= */

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-8 border-l-4 border-[#7929e9] pl-6 text-lg italic leading-8 text-gray-600"
            >
              {renderChildren(block.children)}
            </blockquote>
          );
        }

        /* =================================================
           LIST
        ================================================= */
        if (block.type === "list") {
          const isOrdered = block.format === "ordered";
          const ListTag = isOrdered ? "ol" : "ul";

          return (
            <ListTag
              key={index}
              className={`mb-6 ml-6 space-y-1 text-base leading-6 text-gray-700 ${
                isOrdered ? "list-decimal" : "list-disc"
              }`}
            >
              <li>
                {renderChildren(block.children)}
              </li>
            </ListTag>
          );
        }
        /* =================================================
           CODE
        ================================================= */

        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="my-6 overflow-x-auto rounded-xl bg-[#080a1b] p-5 text-sm leading-7 text-white"
            >
              <code>
                {renderChildren(block.children)}
              </code>
            </pre>
          );
        }

        /* =================================================
           LINK
        ================================================= */

        if (block.type === "link") {
          return (
            <a
              key={index}
              href={text}
              className="text-[#7929e9] underline underline-offset-2"
            >
              {renderChildren(block.children)}
            </a>
          );
        }

        /* =================================================
           FALLBACK
        ================================================= */

        if (trimmedText) {
          return (
            <p
              key={index}
              className="mb-5 text-base leading-8 text-gray-700"
            >
              {renderChildren(block.children)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}
