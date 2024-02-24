import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';
import { Link } from "react-router-dom";

const PricingCard = ({ pricing, key }: { pricing: any, key: number }): ReactElement => {
  return (
    <div key={key}
         className="flex flex-col rounded-lg duration-300 ease-in-out shadow-2xl border-2 bg-background-2 border-border-1 hover:border-border-2 active:border-border-3 hover:-translate-y-5 hover:scale-105 shadow-interactive-1 hover:shadow-interactive-2 active:shadow-interactive-3  transition-transform">
      <div className="flex-1 grid items-center justify-center p-6">
        <h3 className="text-text-1 text-2xl font-bold">{pricing.title}</h3>
      </div>
      <div className="grid gap-4 p-6">
        <p className="text-2xl text-text-2 font-bold">{pricing.price}</p>
        <p className="text-sm text-text-2 text-opacity-80">{pricing.description}</p>
        <ul className="mt-4 space-y-2">
          {pricing.features.map((feature: any, index: number) => (
            <li key={index} className="flex items-center">
              <svg className="h-5 w-5 text-text-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M10 3a7 7 0 00-7 7c0 2.761 2.255 5 5 5a1 1 0 002 0c0-.553-.447-1-1-1-1.654 0-3-1.346-3-3 0-1.654 1.346-3 3-3 .553 0 1-.447 1-1s-.447-1-1-1A5 5 0 005 10c0 2.757 2.243 5 5 5s5-2.243 5-5c0-2.757-2.243-5-5-5z"
                      clipRule="evenodd"/>
              </svg>
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-background-2 border border-border-1 rounded-b-lg">
        <Link
          className="w-full inline-flex items-center justify-center rounded-md h-10 text-sm font-medium shadow-sm bg-interactive-1 hover:bg-interactive-2 active:bg-interactive-3 text-text-1 hover:text-text-2 transition-colors"
          to={pricing.link === 'Sign up' ? '/signup' : '/contact'}
        >
          {pricing.link}
        </Link>
      </div>
    </div>
  )
}

export default function Pricing(): ReactElement {
  const pricings = [
    {
      title: 'Starter',
      price: '$9',
      description: 'Perfect for small teams just getting started.',
      features: [
        'Up to 5 projects',
        'Basic analytics',
        'Email support'
      ],
      link: 'Sign up'
    },
    {
      title: 'Pro',
      price: '$29',
      description: 'Robust features for growing teams.',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority email support'
      ],
      link: 'Sign up'
    },
    {
      title: 'Business',
      price: '$99',
      description: 'All you need to maximize productivity.',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        '24/7 phone support'
      ],
      link: 'Contact Sales'
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'Scalable, secure, and customizable for large teams.',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        '24/7 phone support'
      ],
      link: 'Contact Sales'
    }
  ]

  return (
    <Layout>
      <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-text-1">Choose the perfect plan</h2>
            <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-text-2">
              Start with a 30-day free trial, no credit card required. Cancel anytime.
            </p>
          </div>
          <div className="grid gap-4 mx-auto lg:grid-cols-4 lg:gap-8 flex justify-center">
            {pricings.map((pricing, index) => (
              <PricingCard key={index} pricing={pricing} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
