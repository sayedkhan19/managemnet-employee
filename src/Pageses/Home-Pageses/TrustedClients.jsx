import React from "react";
import { Briefcase, Users, ShieldCheck } from "lucide-react";

const trustedClients = [
  {
    id: 1,
    name: "TechNova Inc.",
    logo: <Briefcase size={36} className="text-blue-600" />,
    description: "Innovative solutions for modern businesses worldwide.",
  },
  {
    id: 2,
    name: "Global Solutions",
    logo: <Users size={36} className="text-green-600" />,
    description: "Providing trusted enterprise management tools.",
  },
  {
    id: 3,
    name: "SecureCore",
    logo: <ShieldCheck size={36} className="text-red-600" />,
    description: "Leading in secure employee management solutions.",
  },
  {
    id: 4,
    name: "BrightTech",
    logo: <Briefcase size={36} className="text-purple-600" />,
    description: "Empowering businesses with smart technologies.",
  },
  {
    id: 5,
    name: "NextGen Corp.",
    logo: <Users size={36} className="text-yellow-600" />,
    description: "Next-level employee and HR management systems.",
  },
  {
    id: 6,
    name: "SafeNet Solutions",
    logo: <ShieldCheck size={36} className="text-indigo-600" />,
    description: "Trusted by hundreds for secure management.",
  },
];

const TrustedClients = () => {
  return (
    <section className="py-12 bg-gray-50 w-full mx-auto">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          🌟 Our Trusted Clients
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Companies around the world trust our platform to manage their employees efficiently and securely.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustedClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="mb-4">{client.logo}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{client.name}</h3>
              <p className="text-gray-500 text-sm">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
