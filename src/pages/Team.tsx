import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';

const TeamCard = ({ profile, index }: { profile: any, index: number }): ReactElement => {
  return (
    <button onClick={() => window.open(profile.link, '_blank')} className="focus:outline-none" key={index}>
      <div key={index}
           className="border-gray-700 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105">
        <img alt={profile.name} className="w-full h-64 object-cover object-center" src={profile.photo}/>
        <div className="p-6">
          <h3 className="mb-4 text-2xl font-semibold">{profile.name}</h3>
          <p className="mb-1 text-gray-400">{profile.role}</p>
          <p className="text-gray-500">{profile.description}</p>
        </div>
      </div>
    </button>
  )
}

export default function Team(): ReactElement {
  const profiles = [
    {
      photo: "/placeholder.svg",
      name: "Florian Lauch",
      role: "Fullstack Engineer",
      description: "Visionary leader with a passion for innovation and teamwork.",
      link: 'https://github.com/EdenComp'
    },
    {
      photo: "/placeholder.svg",
      name: "Dorian Moy",
      role: "Fullstack Engineer",
      description: "Technology enthusiast and problem solver.",
      link: 'https://github.com/Croos3r'
    },
    {
      photo: "/placeholder.svg",
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">We're a passionate team dedicated to building amazing products.</p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, index) => (
            <TeamCard profile={profile} index={index}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}
