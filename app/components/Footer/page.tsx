import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0E0B43] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
        {/* Logo and About Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="text-[#0E0B43] p-2 rounded-lg">
              <Image
                src="/assets/logo/logoFooter.png"
                layout="responsive"
                width={100}
                height={100}
                alt="logo"
              />
            </div>

            <span className="text-2xl font-bold">Eventick</span>
          </div>
          <p className="text-sm leading-relaxed">
            Eventick is a global self-service ticketing platform for live
            experiences that allows anyone to create, share, find, and attend
            events that fuel their passions and enrich their lives.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/facebook.png"
                alt="Facebook"
                className="w-6 transition-transform duration-300 hover:scale-110"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/twitter.png"
                alt="Twitter"
                className="w-6 transition-transform duration-300 hover:scale-110"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/linkedin.png"
                alt="LinkedIn"
                className="w-6 transition-transform duration-300 hover:scale-110"
              />
            </a>
          </div>
        </div>

        {/* Plan Events Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Plan Events</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/create"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Create and Set Up
              </a>
            </li>
            <li>
              <a
                href="/sell-tickets"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Sell Tickets
              </a>
            </li>
            <li>
              <a
                href="/rsvp"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Online RSVP
              </a>
            </li>
            <li>
              <a
                href="/online-events"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Online Events
              </a>
            </li>
          </ul>
        </div>

        {/* Eventick Information Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Eventick</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/about"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/press"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Press
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Privacy
              </a>
            </li>
          </ul>
        </div>

        {/* Stay In The Loop Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Stay In The Loop</h4>
          <p className="text-sm">
            Join our mailing list to stay in the loop with our newest events and
            concerts.
          </p>
          <form className="flex flex-col text-xs rounded-none max-w-[364px]">
            <div className="flex gap-2 p-2 w-full bg-white border-2  border-gray-200 rounded-full shadow-lg">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-4 py-2 rounded-l-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button className="px-6 py-2 bg-pink-600 rounded-full text-white hover:bg-pink-500 transition-transform duration-300 ease-in-out hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>Copyright © 2022 Avi Yansah</p>
      </div>
    </footer>
  );
}
