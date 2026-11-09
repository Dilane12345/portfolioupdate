import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import KeyFigures from "@/components/KeyFigures";
import Methodology from "@/components/Methodology";
import Process from "@/components/Process";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <KeyFigures />
        <Experience />
        <Methodology />
        <Process />
        <Expertise />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
