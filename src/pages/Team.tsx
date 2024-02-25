import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';

const TeamCard = ({ profile, index }: { profile: any, index: number }): ReactElement => {
  return (
    <button onClick={() => window.open(profile.link, '_blank')} className="focus:outline-none" key={index}>
      <div key={index}
           className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 border-border-1 hover:border-border-2 active:border-border-3 bg-background-2 shadow-interactive-1 hover:shadow-interactive-2 active:shadow-interactive-3">
        <img alt={profile.name} className="w-full h-64 object-cover object-center hover:scale-110 transition duration-300 ease-in-out hover:-translate-y-2" src={profile.photo}/>
        <div className="p-6 z-auto bg-background-2 hover:bg-interactive-1 transition duration-300 ease-in-out">
          <h3 className="mb-4 text-text-1 text-2xl font-semibold">{profile.name}</h3>
          <p className="mb-1 text-text-2">{profile.role}</p>
          <p className="text-text-2 text-opacity-70">{profile.description}</p>
        </div>
      </div>
    </button>
  )
}

export default function Team(): ReactElement {
  const profiles = [
    {
      photo: "https://avatars.githubusercontent.com/u/33784129?v=4",
      name: "Florian Lauch",
      role: "Fullstack Engineer",
      description: "Visionary leader with a passion for innovation.",
      link: 'https://github.com/EdenComp'
    },
    {
      photo: "https://avatars.githubusercontent.com/u/54242096?v=4",
      name: "Dorian Moy",
      role: "Fullstack Engineer",
      description: "Technology enthusiast and problem solver.",
      link: 'https://github.com/Croos3r'
    },
    {
      photo: "https://avatars.githubusercontent.com/u/91875715?v=4",
      name: "Tom Bariteau-Peter",
      role: "Fullstack Engineer",
      description: "Creative mind with an eye for beautiful design.",
      link: 'https://github.com/Tomi-Tom'
    }
  ]

  return (
    <Layout>
      <div className="container px-4">
        <div className="mt-12 text-center">
          <h2 className="text-text-1 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="mt-3 text-text-2">We&apos;re a passionate team dedicated to building amazing products.</p>
        </div>
        <div className="grid gap-32 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, index) => (
            <TeamCard key={index} profile={profile} index={index}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}
