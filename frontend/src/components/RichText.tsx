interface RichTextProps {
  content?: any;
  className?: string;
}

export default function RichText({
  content,
  className = "",
}: RichTextProps) {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className={className}>{content}</p>;
  }

  if (!Array.isArray(content)) return null;

  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className={className}>
                {block.children?.map((child: any) => child.text).join("")}
              </p>
            );

          case "heading":
            return (
              <h3 key={index} className={className}>
                {block.children?.map((child: any) => child.text).join("")}
              </h3>
            );

          default:
            return null;
        }
      })}
    </>
  );
}