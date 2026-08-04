import { SignatureLoader } from "@/components/home/signature-loader";
import { Intro } from "@/components/home/intro";
import { ExperienceList } from "@/components/home/experience-list";
import { SelectedWork } from "@/components/home/selected-work";
import { ResumeCta } from "@/components/home/resume-cta";

export default function Page() {
  return (
    <>
      <SignatureLoader />
      <Intro />
      <ExperienceList />
      <SelectedWork />
      <ResumeCta />
    </>
  );
}
