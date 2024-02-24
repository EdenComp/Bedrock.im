import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';

export default function Team(): ReactElement {
  const profiles = [
    {
      photo: "/placeholder.svg",
      name: "Florian Lauch",
      role: "Fullstack Engineer",
      description: "Visionary leader with a passion for innovation and teamwork."
    },
    {
      photo: "/placeholder.svg",
      name: "Dorian Moy",
      role: "Fullstack Engineer",
      description: "Technology enthusiast and problem solver."
    },
    {
      photo: "/placeholder.svg",
      name: "Tom Bariteau-Peter",
      role: "Fullstack Engineer",
      description: "Creative mind with an eye for beautiful design."
    }
  ]

  return (
    <Layout>
        <div className="container px-4 space-y-12 md:space-y-16 lg:space-y-20">
          <div className="space-y-2 text-center mt-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bedrock Dev Team</h2>
          </div>
          <div className="grid max-w-sm gap-6 mx-auto lg:max-w-4xl lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {profiles.map((profile) => (
              <div className="flex flex-col items-stretch space-y-2 border rounded-xl overflow-hidden dark:border-0 bg-gray-900 border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-5 transition-transform hover:scale-105">
                <img alt="Avatar" className="aspect-[4/5] object-cover" height="500" src={profile.photo}
                     width="400"/>
                <div className="flex-1 p-4">
                  <h3 className="font-bold">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                  <p className="text-sm text-gray-500">{profile.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}