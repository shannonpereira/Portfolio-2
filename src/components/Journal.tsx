import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceItem {
  title: string;
  subtitle: string;
  location: string;
  period: string;
  bullets: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
}

const workHistory: ExperienceItem[] = [
  {
    title: "Software Engineer",
    subtitle: "Invenger Technologies Pvt.Ltd",
    location: "Mangalore, India",
    period: "02/2025 - Current",
    bullets: [
      "Developed, tested, debugged, and documented software programs using Java, JavaScript, HTML, and CSS, ensuring high-quality deliverables.",
      "Developed scalable software solutions for clients in various industries.",
      "Collaborated with cross-functional teams to enhance features and improve user experience across products.",
      "Utilized a variety of engineering languages to develop web applications.",
      "Integrated third-party APIs and services, improving software functionality and interoperability with external systems.",
      "Mentored junior developers, providing guidance on coding standards and techniques.",
      "Participated in regular meetings with stakeholders to discuss project progress, changes, challenges."
    ]
  },
  {
    title: "Intern",
    subtitle: "Niveus Solutions",
    location: "Mangalore, Karnataka",
    period: "01/2023 - 01/2024",
    bullets: [
      "Designed and implemented intelligent fleet management system to optimize vehicle utilization and enhance operational efficiency.",
      "Assisted in developing software solutions for client projects.",
      "Collaborated with team members on project requirements and specifications.",
      "Conducted research to support product development and innovation efforts."
    ]
  },
  {
    title: "IEI Core Team Member",
    subtitle: "Institution of Engineers (India) (IEI)",
    location: "Mangalore, Karnataka",
    period: "01/2023 - 01/2024",
    bullets: [
      "Collaborated with a team to organize and manage technical events, workshops, and seminars. Actively contributed to team meetings, providing insights and suggestions for continuous improvement of IEI activities.",
      "Led collaborative projects to enhance engineering practices and community engagement.",
      "Coordinated events and workshops to promote professional development among engineers.",
      "Developed training materials and resources for engineering professionals and students."
    ]
  },
  {
    title: "IEEE Team Member",
    subtitle: "Institute of Electrical and Electronics Engineers (IEEE)",
    location: "Mangalore, Karnataka",
    period: "01/2022 - 01/2024",
    bullets: [
      "Observed software development processes, project management techniques, and innovative logistics solutions at industry-leading companies, including Novigo Solutions and A1 Logics, to gain insights into real-world applications of engineering principles.",
      "Collaborated with team members on project planning and execution.",
      "Assisted in organizing workshops and seminars for professionals.",
      "Coordinated communication between departments to streamline operations."
    ]
  }
];

const internships: ExperienceItem[] = [
  {
    title: "Software Developer Intern",
    subtitle: "Invenger Technologies",
    location: "Mangalore, India",
    period: "Feb 2025 - Feb 2026",
    bullets: [
      "Worked on building Inoora, an AI-powered automation and device management platform.",
      "Developed a custom Android MDM (DPC) solution enabling secure BYOD usage with work/personal profile separation.",
      "Implemented real-time communication using Firebase Cloud Messaging (FCM) for device control and monitoring.",
      "Built automation systems for browser and desktop applications using Playwright, FlaUI, and .NET (WPF headless executables).",
      "Contributed to cross-platform development (Android, iOS, Windows .exe).",
      "Developed a Next.js admin panel for centralized management and analytics.",
      "Showcased the product at GITEX Global 2025 (Dubai).",
      "Also worked on hardware-integrated prototypes using Arduino, ESP32, and Kinect for object detection use cases."
    ]
  },
  {
    title: "Intern",
    subtitle: "Niveus Solutions",
    location: "Mangalore, Karnataka",
    period: "2023 - 2024",
    bullets: [
      "Contributed to the development of an intelligent fleet management system.",
      "Focused on optimizing fleet operations using data analysis and algorithmic approaches.",
      "Assisted in building scalable system components and improving operational efficiency."
    ]
  }
];

const educationList: EducationItem[] = [
  {
    degree: "Bachelor of Engineering: Computer Science",
    institution: "Sahyadri College of Engineering and Management",
    location: "Mangaluru, India",
    period: "2024 - 2026 (Graduation: 06/2025)",
    gpa: "CGPA - 9.45"
  },
  {
    degree: "Pre University: PCMB",
    institution: "Nalanda Gurukula International Independent Pre University College",
    location: "Kushalnagar, India",
    period: "2021",
    gpa: "Percentage - 91%"
  },
  {
    degree: "Indian Certificate of Secondary Education",
    institution: "Karaumbiahs Academy For Learning And Sports",
    location: "Gonikoppal, Coorg, India",
    period: "2019",
    gpa: "Percentage - 84%"
  }
];

const certifications = [
  "Database and SQL",
  "Full Stack Development",
  "ChatGPT Prompt Engineering Mastery",
  "C++ Complete Training Course"
];

const extracurriculars = [
  {
    role: "IEI Core Team Member",
    org: "Institution of Engineers (India) (IEI)",
    location: "Mangalore, Karnataka",
    period: "2023 - 2024",
    description: "Collaborated with a team to organize and manage technical events, workshops, and seminars. Actively contributed to team meetings, providing insights and suggestions for continuous improvement of IEI activities."
  },
  {
    role: "IEEE Team Member",
    org: "Institute of Electrical and Electronics Engineers (IEEE)",
    location: "Mangalore, Karnataka",
    period: "2022 - 2024",
    description: "Gained insights into real-world applications of engineering principles by visiting industry-leading companies, including Novigo Solutions and A1 Logics, where I observed software development processes, project management techniques, and innovative logistics solutions."
  }
];

export const Journal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"work" | "intern" | "edu" | "extra">("work");

  const tabs = [
    { id: "work", label: "Work History" },
    { id: "intern", label: "Internships" },
    { id: "edu", label: "Education & Certs" },
    { id: "extra", label: "Extracurriculars" }
  ] as const;

  return (
    <section id="resume" className="bg-bg py-16 md:py-24 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Resume & Credentials
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-text-primary">
              Work & <span className="font-display italic">experience</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md mt-4 leading-relaxed font-light">
              Overview of professional roles, internships, education, and technical certifications.
            </p>
          </div>

          {/* Interactive Navigation Tabs inside section */}
          <div className="flex flex-wrap gap-2 bg-surface/50 border border-stroke/80 p-1.5 rounded-2xl select-none w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs md:text-sm rounded-xl px-4 py-2 cursor-pointer font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-stroke text-text-primary shadow-sm"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* 1. WORK HISTORY */}
              {activeTab === "work" && (
                <div className="flex flex-col gap-8">
                  {workHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-surface/20 border border-stroke/50 hover:border-stroke rounded-3xl p-6 md:p-8 transition-colors duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-medium text-text-primary">
                            {item.title}
                          </h3>
                          <span className="text-xs text-muted font-light">
                            {item.subtitle} • {item.location}
                          </span>
                        </div>
                        <span className="text-xs md:text-sm text-muted font-mono font-medium">
                          {item.period}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 font-light text-muted text-sm md:text-base">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="pl-1">
                            <span className="text-text-primary/90">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. INTERNSHIPS */}
              {activeTab === "intern" && (
                <div className="flex flex-col gap-8">
                  {internships.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-surface/20 border border-stroke/50 hover:border-stroke rounded-3xl p-6 md:p-8 transition-colors duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-medium text-text-primary">
                            {item.title}
                          </h3>
                          <span className="text-xs text-muted font-light">
                            {item.subtitle} • {item.location}
                          </span>
                        </div>
                        <span className="text-xs md:text-sm text-muted font-mono font-medium">
                          {item.period}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 font-light text-muted text-sm md:text-base">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="pl-1">
                            <span className="text-text-primary/90">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. EDUCATION & CERTS */}
              {activeTab === "edu" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Education list */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <h3 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Academic Background
                    </h3>
                    {educationList.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-surface/20 border border-stroke/50 rounded-2xl p-5 md:p-6"
                      >
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-base md:text-lg font-medium text-text-primary">
                            {item.degree}
                          </h4>
                          <span className="text-xs text-muted font-mono">{item.period}</span>
                        </div>
                        <p className="text-xs text-muted mb-2">
                          {item.institution} | {item.location}
                        </p>
                        <span className="inline-block bg-stroke/50 border border-stroke px-2.5 py-1 rounded-lg text-xs font-semibold text-text-primary font-mono">
                          {item.gpa}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Certifications list */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <h3 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                      Certifications
                    </h3>
                    <div className="bg-surface/20 border border-stroke/50 rounded-2xl p-6 flex flex-col gap-3">
                      {certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 border-b border-stroke/30 last:border-0 pb-3 last:pb-0"
                        >
                          <div className="w-2 h-2 rounded-full accent-gradient" />
                          <span className="text-sm text-text-primary/95">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. EXTRACURRICULARS */}
              {activeTab === "extra" && (
                <div className="flex flex-col gap-6">
                  {extracurriculars.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-surface/20 border border-stroke/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-base md:text-lg font-medium text-text-primary">
                            {item.role}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-stroke" />
                          <span className="text-xs text-muted font-light">{item.org}</span>
                        </div>
                        <p className="text-sm text-muted font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-xs md:text-sm text-muted font-mono font-medium md:self-start">
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
