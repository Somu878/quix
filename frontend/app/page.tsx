import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//@ts-ignore
import { ArrowRight, BarChart2, Lock, Zap } from "lucide-react";
import Link from "next/link";
export default function Home() {
  let email;
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6 text-blue-500">
            Trade the Future with Quix
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            The fastest and most secure crypto exchange platform
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href={"/trade/BTC_USDC"}>Start Trading Now</Link>{" "}
            <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-blue-500">
              Why Choose Quix?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap size={40} />}
                title="Lightning Fast Trades"
                description="Execute trades in milliseconds with our cutting-edge technology."
              />
              <FeatureCard
                icon={<Lock size={40} />}
                title="Bank-Grade Security"
                description="Your assets are protected with state-of-the-art security measures."
              />
              <FeatureCard
                icon={<BarChart2 size={40} />}
                title="Advanced Analytics"
                description="Make informed decisions with our real-time market analysis tools."
              />
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            About Quix
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-center text-gray-300">
            Quix is a next-generation crypto exchange platform designed for both
            novice and experienced traders. Our mission is to make
            cryptocurrency trading accessible, fast, and secure for everyone.
          </p>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
              Stay Updated
            </h2>
            <form
              className="max-w-md mx-auto flex gap-4"
              action="/api/subscribe"
              method="POST"
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-gray-900 text-white border-gray-700 focus:border-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 py-6 text-sm text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Quix Exchange. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg text-center">
      <div className="text-blue-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
