import TeamCarousel from "@/components/common/carousel/team-carousel";
import SectionHeader from "@/components/common/header/section-header";
import { ITeamCard } from "@/types/website";

export const teamMembers: ITeamCard[] = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Frontend Developer",
    image: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday.  At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support ",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/alice.johnson" },
      { platform: "twitter", url: "https://twitter.com/aliceJ" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    position: "UI/UX Designer",
    image: "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday.  At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support ",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/bobsmith" },
      { platform: "instagram", url: "https://m.me/bobsmith" },
    ],
  },
  {
    id: 3,
    name: "Charlie Davis",
    position: "Backend Developer",
    image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    description:
      "At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support your posture, reduce fatigue, and help you stay focused throughout your workday.  At बSERA, we believe comfort isn’t a luxury—it’s a necessity. Our ergonomic solutions are designed to support ",
    // This member doesn't have any social links.
    socialLinks: [],
  },
];

const OurTeam = () => {
  return (
    <section className="space-y-8 padding">
      <SectionHeader
        title="Our Team"
        description="Hear our talented team"
        className="items-start"
      />

      <TeamCarousel />
    </section>
  );
};

export default OurTeam;
