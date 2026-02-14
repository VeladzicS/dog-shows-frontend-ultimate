import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-screen px-4 py-[30px] lg:py-[60px]">
        <div className="flex items-center justify-center pb-5">
          <Image
            src="/logo.png"
            alt="dogs"
            width={245}
            height={82}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center justify-between border-t-1 border-black/30 pt-5 lg:flex-row">
          <ul className="flex flex-col items-center gap-2 sm:flex-row">
            <li>
              <a
                href="https://showsightmagazine.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-main uppercase transition-colors"
              >
                Showsight
              </a>
            </li>
            <li>
              <a
                href="https://showsightmagazine.com/showsight-express/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-main uppercase transition-colors"
              >
                Showsight Express
              </a>
            </li>
            <li>
              <a
                href="https://topnotchtoys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-main uppercase transition-colors"
              >
                Top Notch Toys
              </a>
            </li>
          </ul>
          <p className="lg:text-right pt-4 text-center lg:pt-0">
            Copyright © SHOWSIGHT Magazine {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
