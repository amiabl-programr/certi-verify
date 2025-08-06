// src/components/Navbar.jsx
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // Assuming you have lucide-react installed

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/take-quiz" },
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/signup",  isCta: true },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-6xl mx-auto px-4">
        {/* Logo/Brand Name */}
        <a href="/" className="mr-6 flex items-center">
          <span className="font-bold">YourBrand</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-end space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                item.isCta ? "bg-black text-white hover:bg-black/90 px-4 py-2 rounded-md" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex-1 flex items-center justify-end p-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 p-6 ">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-semibold transition-colors hover:text-primary ${
                      item.isCta ? "bg-black text-white hover:bg-black/90 px-4 py-2 rounded-md" : ""
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;