import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, CreditCard, Menu, ScrollText } from "lucide-react";

interface SidebarProps {
  userName: string;
  userImage?: string;
  onLogout: () => void;
}

const SidebarContent = ({ userName, userImage, onLogout }: SidebarProps) => (
  <div className="flex flex-col h-full">
    <div className="p-5 flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={userImage} alt={userName} />
        <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-semibold">{userName}</h2>
    </div>

    <nav className="flex-1 px-4 py-8">
      <ul className="space-y-2">
        <li>
          <Link
            href="/admin/transactions"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
          >
            <CreditCard className="w-5 h-5" />
            <span>Transacciones</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/reports"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
          >
            <ScrollText className="w-5 h-5" />
            <span>Reportes</span>
          </Link>
        </li>
      </ul>
    </nav>
    <form className="p-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center space-x-2"
        formAction={onLogout}
      >
        <LogOut className="w-4 h-4" />
        <span>Cerrar sesión</span>
      </Button>
    </form>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({
  userName,
  userImage,
  onLogout,
}) => {
  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-background lg:border-r">
        <SidebarContent
          userName={userName}
          userImage={userImage}
          onLogout={onLogout}
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent
            userName={userName}
            userImage={userImage}
            onLogout={onLogout}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
