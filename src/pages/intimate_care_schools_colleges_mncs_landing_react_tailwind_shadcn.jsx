import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, GraduationCap, Building2, School, ShieldCheck, HeartHandshake, Users2, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

// Color tokens inspired by your reference UI
const c = {
  bg: "#FFF7FA", // very light rose
  bgAlt: "#FFEDEE", // blush
  pink: "#F8A8C7",
  deepPink: "#E96AA3",
  peach: "#FFE2CF",
  mint: "#DFF7EC",
  lavender: "#EDE2FF",
  cream: "#FFF1E6",
  ink: "#222326",
};

const chips = [
  { label: "Consent", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Communication", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Boundaries", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Empathy", icon: <HeartHandshake className="w-4 h-4" /> },
  { label: "Psychological Safety", icon: <Users2 className="w-4 h-4" /> },
];

const programs = [
  {
    icon: <School className="w-6 h-6" />, 
    title: "Schools (Grade 9–12)",
    blurb: "Age-appropriate, stigma‑free modules for teens to build respect, self‑awareness and safe decision‑making.",
    bullets: [
      "Understanding feelings, attraction & respect",
      "Consent basics & bystander awareness",
      "Digital safety & cyber‑kindness",
      "Body autonomy & boundary-setting",
      "Asking for help — who/when/how",
    ],
    color: c.mint,
  },
  {
    icon: <GraduationCap className="w-6 h-6" />, 
    title: "Colleges & Universities",
    blurb: "Workshops that prepare young adults for healthy relationships, campus life, and early careers.",
    bullets: [
      "Negotiating boundaries & communicating needs",
      "Dating, intimacy & emotional safety",
      "Porn literacy & realistic expectations",
      "Managing stress, anxiety & attachment",
      "Inclusivity & allyship",
    ],
    color: c.lavender,
  },
  {
    icon: <Building2 className="w-6 h-6" />, 
    title: "MNCs & Workplaces",
    blurb: "Practical, inclusive trainings for respectful culture and high‑trust teams.",
    bullets: [
      "Psychological safety & empathy at work",
      "Healthy boundaries with managers & peers",
      "Stress, burnout & relationship spillover",
      "Dual‑career dynamics & caregiving",
      "Harassment prevention — speak up safely",
    ],
    color: c.peach,
  },
];

const outcomes = [
  "Confident conversations about consent & boundaries",
  "Higher empathy → fewer conflicts & better collaboration",
  "Improved focus by addressing stress & unresolved emotions",
  "Inclusive, stigma‑free culture students & teams trust",
  "Actionable toolkits educators & HR can roll out quickly",
];

const stats = [
  { k: "50+", v: "Institutions Engaged" },
  { k: "10k+", v: "Participants Impacted" },
  { k: "95%", v: "Felt Safer to Speak Up" },
  { k: "4.8/5", v: "Avg. Session Rating" },
];

const modules = {
  schools: [
    "Respect & kindness in relationships",
    "Consent & boundaries 101",
    "Digital safety, sexting & privacy",
    "Body image & self‑worth",
    "Saying no, hearing no, and seeking help",
  ],
  colleges: [
    "Attachment styles & communication",
    "Dating expectations vs reality (porn literacy)",
    "Conflict repair & emotional regulation",
    "Healthy sexuality & inclusivity",
    "Support systems & campus resources",
  ],
  mncs: [
    "Psychological safety & micro‑behaviors",
    "Difficult conversations & feedback rituals",
    "Boundaries in hybrid/remote setups",
    "Stress, burnout & relationship hygiene",
    "Policy → practice: harassment prevention",
  ],
};

const testimonials = [
  {
    quote:
      "Our students opened up respectfully and asked questions we’ve never heard in class — the room felt safe.",
    who: "Dean, Leading Arts College",
  },
  {
    quote:
      "The workshop connected emotional safety with teamwork. Managers said it was the most practical training this year.",
    who: "HRBP, Fortune‑500 MNC",
  },
  {
    quote:
      "Simple language, science‑backed, zero shaming. Exactly what schools need.",
    who: "Principal, CBSE School",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border" style={{ background: "#FFF", borderColor: "#F4C2D4", color: c.ink }}>
      {children}
    </span>
  );
}

function StatCard({ k, v }: { k: string; v: string }) {
  return (
    <Card className="border-0 shadow-sm" style={{ background: "#FFFFFF" }}>
      <CardContent className="p-6 text-center">
        <div className="text-3xl md:text-4xl font-extrabold" style={{ color: c.deepPink }}>{k}</div>
        <div className="mt-2 text-sm text-muted-foreground">{v}</div>
      </CardContent>
    </Card>
  );
}

function ProgramCard({ item }: { item: any }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
      <Card className="border-0 shadow-md rounded-2xl" style={{ background: item.color }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="p-2 rounded-xl bg-white/70">{item.icon}</span>
            <span>{item.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <p className="text-sm mb-4">{item.blurb}</p>
          <ul className="space-y-2 text-sm">
            {item.bullets.map((b: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionHeading({ over, title, sub }: { over?: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {over && (
        <div className="mb-2 text-xs font-semibold tracking-widest" style={{ color: c.deepPink }}>
          {over}
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight" style={{ color: c.ink }}>{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function IntimateCareLanding() {
  return (
    <div style={{ background: c.bg, color: c.ink }} className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b" style={{ background: "rgba(255,255,255,0.6)", borderColor: "#FFD7E6" }}>
        <nav className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles style={{ color: c.deepPink }} />
            <span className="font-semibold">Intimate <span style={{ color: c.deepPink }}>Care</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#programs" className="hover:opacity-80">Programs</a>
            <a href="#curriculum" className="hover:opacity-80">Curriculum</a>
            <a href="#impact" className="hover:opacity-80">Impact</a>
            <a href="#testimonials" className="hover:opacity-80">Stories</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <Button className="rounded-full" style={{ background: c.deepPink }}>Book a Discovery Call</Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex gap-2 mb-4 flex-wrap">
              {chips.map((cchip, i) => (
                <Pill key={i}>{cchip.icon}{cchip.label}</Pill>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Let’s make <span style={{ color: c.deepPink }}>intimacy education</span> a priority —
              in <span className="underline decoration-wavy" style={{ textDecorationColor: c.pink }}>schools</span>,
              <span> colleges</span> & <span>workplaces</span>.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Science‑backed, inclusive and stigma‑free programs that build emotional safety, consent,
              communication and respect — tailored for teens, young adults and professionals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-full" style={{ background: c.deepPink }}>
                Get Program Brochure <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="rounded-full border" style={{ borderColor: c.deepPink, color: c.deepPink }}>
                Talk to Us
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{ background: c.peach, filter: "blur(20px)", opacity: 0.6 }} />
              <Card className="relative border-0 rounded-3xl overflow-hidden shadow-xl" style={{ background: c.bgAlt }}>
                <CardContent className="p-0">
                  <img
                    src="https://backend-pocketbase.7za6uc.easypanel.host/api/files/pbc_3420988878/ywr0z33t2nx88s1/riz01372_7rbkydbgjn.JPG?token="
                    alt="Instructor portrait 1"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </CardContent>
              </Card>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card className="border-0 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src="https://backend-pocketbase.7za6uc.easypanel.host/api/files/pbc_3420988878/z9687j5x5l909wm/riz01350_bl4lrwsvnf.JPG?token="
                      alt="Instructor portrait 2"
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading over="OUR PROGRAMS" title="Tailored for schools, colleges and MNCs" sub="Each engagement is co‑designed with your team — inclusive, culturally aware and policy‑aligned." />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {programs.map((p, i) => (
              <ProgramCard key={i} item={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes & Stats */}
      <section id="impact" className="py-14 md:py-20" style={{ background: c.bg }}>
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading over="IMPACT" title="What changes after we work together?" />
          <div className="grid md:grid-cols-2 gap-8 mt-10 items-center">
            <div>
              <ul className="space-y-3">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: c.deepPink }} />
                    <span className="text-base">{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button className="rounded-full" style={{ background: c.deepPink }}>See Sample Agenda</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <StatCard key={i} k={s.k} v={s.v} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Tabs */}
      <section id="curriculum" className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading over="CURRICULUM" title="What we teach — and how" sub="Modular sessions (60–120 min) that build progressively. In‑person or virtual." />
          <Tabs defaultValue="schools" className="mt-8">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="schools">Schools</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
              <TabsTrigger value="mncs">MNCs</TabsTrigger>
            </TabsList>
            <TabsContent value="schools">
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {modules.schools.map((m, i) => (
                  <Card key={i} className="border-0 shadow-sm" style={{ background: c.mint }}>
                    <CardContent className="p-5 text-sm">{m}</CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="colleges">
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {modules.colleges.map((m, i) => (
                  <Card key={i} className="border-0 shadow-sm" style={{ background: c.lavender }}>
                    <CardContent className="p-5 text-sm">{m}</CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="mncs">
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {modules.mncs.map((m, i) => (
                  <Card key={i} className="border-0 shadow-sm" style={{ background: c.peach }}>
                    <CardContent className="p-5 text-sm">{m}</CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-14 md:py-20" style={{ background: c.bg }}>
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading over="STORIES" title="What educators & HR leaders say" />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-0 shadow-md rounded-2xl" style={{ background: c.cream }}>
                <CardContent className="p-6">
                  <p className="text-sm">“{t.quote}”</p>
                  <div className="mt-4 text-xs font-medium opacity-70">{t.who}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading over="FAQ" title="Common questions" />
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this aligned with school/HR policies?</AccordionTrigger>
              <AccordionContent>
                We customize language, scope and activities with your leadership so it’s age‑appropriate, culturally sensitive and policy‑compliant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long is a session and how many participants?</AccordionTrigger>
              <AccordionContent>
                60–120 minutes per module. Ideal group size: 25–120 depending on format (interactive vs seminar). Hybrid & virtual supported.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who facilitates the sessions?</AccordionTrigger>
              <AccordionContent>
                Certified sex educator & intimacy coach with experience across schools, colleges and global MNCs, supported by trained co‑facilitators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What outcomes can we measure?</AccordionTrigger>
              <AccordionContent>
                Pre/post feedback, psychological safety pulse, incident reporting comfort, and qualitative narratives from learners & leaders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14 md:py-20" style={{ background: c.bgAlt }}>
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading over="GET IN TOUCH" title="Bring Intimacy Education to your campus or company" sub="Share a few details and we’ll send a tailored proposal within 24–48 hours." />
          <div className="grid md:grid-cols-5 gap-6 mt-10">
            <Card className="border-0 shadow-md md:col-span-3">
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email" />
                  <Input placeholder="Phone" />
                  <Input placeholder="Organisation / Institution" />
                </div>
                <Tabs defaultValue="School">
                  <TabsList>
                    <TabsTrigger value="School">School</TabsTrigger>
                    <TabsTrigger value="College">College</TabsTrigger>
                    <TabsTrigger value="MNC">MNC</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Textarea placeholder="Tell us about your audience, goals & preferred dates" rows={6} />
                <Button className="rounded-full w-full md:w-auto" style={{ background: c.deepPink }}>Request Proposal</Button>
              </CardContent>
            </Card>
            <div className="md:col-span-2 space-y-4">
              <Card className="border-0" style={{ background: c.cream }}>
                <CardContent className="p-6 text-sm">
                  <div className="font-semibold mb-2">What you’ll receive</div>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />Tailored agenda & outcomes</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />Facilitator profile & credentials</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />Pricing options (in‑person/virtual)</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />Comms kit for parents/HR & learners</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0" style={{ background: c.mint }}>
                <CardContent className="p-6 text-sm">
                  <div className="font-semibold mb-2">Prefer email?</div>
                  <p>Write to <span className="font-medium">hello@intimatecare.in</span> and we’ll get back within a business day.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t" style={{ background: "#FFFFFF", borderColor: "#FFD7E6" }}>
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="font-semibold">Intimate <span style={{ color: c.deepPink }}>Care</span></div>
            <div className="text-sm text-muted-foreground">Science‑backed intimacy education for schools, colleges & MNCs.</div>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-2">Quick Links</div>
            <div className="grid grid-cols-2 gap-2">
              <a href="#programs" className="hover:underline">Programs</a>
              <a href="#curriculum" className="hover:underline">Curriculum</a>
              <a href="#impact" className="hover:underline">Impact</a>
              <a href="#testimonials" className="hover:underline">Stories</a>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-2">Contact</div>
            <div>hello@intimatecare.in</div>
            <div>Coimbatore, India</div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Intimate Care. All rights reserved.</div>
      </footer>
    </div>
  );
}
