import Navbar from "@/components/ui-elements/Navbar";
import { auth } from "@/auth";
import Header from "@/components/ui-elements/Header";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#4C1B7A] text-white">
      <Header session={session} />
      
      <div className="p-4">
        {/* Main Container with Border and Spacing */}
        <div className="h-full border border-gray-400 relative">
          {/* Navbar Divider */}
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gray-400 pointer-events-none"></div>

        {/* Main Content */}
        <main className="flex h-[90vh]">
          {/* LEFT PANEL - Food Collage */}
          <div className="w-1/3 p-3 bg-[#4C1B7A]">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/food_main.jpg"
                alt="Food collage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* MIDDLE PANEL - Text Content */}
          <div className="w-1/3 p-8 bg-[#3B0270] flex flex-col justify-center">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-5xl font-bold mb-2">
                <span style={{ color: "#FCD34D", fontFamily: "JejuHallasan", fontWeight: 400 }}>
                  Yummy meals
                </span>
              </h2>
              <p className="text-5xl font-bold bd" style={{ fontFamily: "JejuHallasan", fontWeight: 400 }}>
                with any ingredient!
              </p>
            </div>

            {/* Body Text */}
            <p
              className="text-lg leading-relaxed text-gray-200"
              style={{
                fontFamily: "Inria Sans",
                fontSize: "18px",
                lineHeight: "140%",
                borderTop: "1px solid #9CA3AF",
                borderBottom: "1px solid #9CA3AF",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              Dawg Snacks' goal is to provide an easy and helpful way for UGA students to make meals with limited ingredients at home!
            </p>

            {/* Divider */}
            <div className="h-px w-full"></div>
          </div>

          {/* RIGHT PANEL - Images */}
          <div className="w-1/3 p-6 bg-[#3B0270] flex flex-col items-center justify-center">
            {/* Top Image - Cooking Together */}
            <div className="lg overflow-hidden mb-4 h-48">
              <img
                src="/cooking-image.jpg"
                alt="Cooking together"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Image - Single Food Image */}
            <div className="lg overflow-hidden h-auto w-auto">
              <img
                src="/food-second.jpg"
                alt="Food dish"
              />
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
