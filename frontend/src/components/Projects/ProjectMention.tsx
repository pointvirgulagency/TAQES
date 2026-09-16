import RichText from "@/components/RichText";

interface ProjectMentionProps {
  project: any;
  locale: string;
}

export default function ProjectMention({
  project,
}: ProjectMentionProps) {
  if (!project?.mention) {
    return null;
  }

  return (
    <section className="bg-[#F5F3EF] px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-5 h-px w-12 bg-[#00674F]" />

        <div className="text-xs leading-6 text-gray-500">
          <RichText
            content={project.mention}
          />
        </div>
      </div>
    </section>
  );
}