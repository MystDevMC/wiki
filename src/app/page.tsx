import ProjectCard from "@/components/project-card";

export default function Page() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl mt-16 mb-8">
        <span> Welcome to </span>
        <span className="font-display font-semibold">MystDev`&apos;`s Wiki</span>
        <span>!</span>
      </h1>
      <h2 className="mb-4 text-lg">Projects</h2>
      <div className={"grid grid-cols-2 gap-4"}>
        <ProjectCard
          section={"recicropal"}
          title={"Recicropal"}
          shortDesc={"Crops and content, mutually reciprocal."}
        />
        <ProjectCard
          link={"https://github.com/MystDevMC/wiki"}
          title={"Wiki"}
          shortDesc={"Visit this wiki's source here!"}
        />
      </div>
    </div>
  );
}
