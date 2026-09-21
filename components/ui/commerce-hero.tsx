"use client";

import { ArrowUpRight, Menu, Search, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Cestas Clássicas",
    image: "/classic-basket.png",
    href: "#",
  },
  {
    title: "Românticas",
    image: "/romantic-basket.png",
    href: "#",
  },
  {
    title: "Aniversário",
    image: "/birthday-basket.png",
    href: "#",
  },
  {
    title: "Corporativo",
    image: "/corporate-basket.png",
    href: "#",
  },
];

const navigation = [
  { name: "Início", href: "#" },
  { name: "Montar Cesta", href: "#" },
  { name: "Ocasiões", href: "#" },
  { name: "Contato", href: "#" },
];

export function CommerceHero() {
  return (
    <div className="w-full relative container px-2 mx-auto max-w-7xl min-h-[80vh]">

        <div className="mt-6 bg-rose-50/50 rounded-2xl relative">
          <header className="flex items-center">
            <div className="w-full md:w-2/3 lg:w-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-br-2xl flex items-center gap-2 shadow-sm">
              <a href="#" className="text-2xl font-serif font-bold text-rose-600 tracking-tight">
                CF Gifts
              </a>

              <nav className="hidden lg:flex items-center justify-between w-full ml-8">
                {navigation.map((item) => (
                  <Button 
                    key={item.name} 
                    variant="link" 
                    className="cursor-pointer relative group hover:text-rose-600 transition-colors text-slate-600"
                  >
                    {item.name}
                  </Button>
                ))}
                <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-rose-600 transition-colors text-slate-600">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-rose-600 transition-colors text-slate-600">
                  <ShoppingBasket className="w-5 h-5" />
                </Button>
              </nav>

              <Sheet>
                <SheetTrigger asChild className="lg:hidden ml-auto">
                  <Button variant="ghost" size="icon" className="hover:text-rose-600 transition-colors">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] p-0 bg-white/95 backdrop-blur-md border-r border-rose-100"
                >
                  <SheetHeader className="p-6 text-left border-b border-rose-100">
                    <SheetTitle className="flex items-center justify-between">
                      <a href="#" className="text-xl font-serif font-bold text-rose-600">
                        CF Gifts
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col p-6 space-y-1">
                    {navigation.map((item) => (
                      <Button 
                        key={item.name}
                        variant="ghost" 
                        className="justify-start px-2 h-12 text-base font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-600"
                      >
                        {item.name}
                      </Button>
                    ))}
                  </nav>
                  <Separator className="mx-6 bg-rose-100" />
                  <div className="p-6 flex flex-col gap-4">
                    <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-rose-50 hover:text-rose-600 transition-colors border-rose-200">
                      <Search className="w-4 h-4" />
                      Buscar
                    </Button>
                    <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-rose-50 hover:text-rose-600 transition-colors relative border-rose-200">
                      <ShoppingBasket className="w-4 h-4" />
                      Carrinho
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden md:flex w-1/2 justify-end items-center pr-4 gap-4 ml-auto">
              <Button
                variant="default"
                className="cursor-pointer bg-rose-600 hover:bg-rose-700 text-white p-0 pl-4 pr-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group h-12"
              >
                <span className="py-2 text-sm font-bold uppercase tracking-wider">Fazer Pedido</span>
                <div className="rounded-full flex items-center justify-center bg-white text-rose-600 w-10 h-10 ml-3 group-hover:scale-105 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </Button>
            </div>
          </header>

          <motion.section
            className="w-full px-4 py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight text-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Cestas que abraçam,
                <br />
                <span className="text-rose-500 italic">
                  momentos que marcam.
                </span>
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Personalize seu presente com afeto. Escolha a cesta, os produtos e a mensagem perfeita para surpreender quem você ama.
              </motion.p>
            </div>
          </motion.section>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mt-12 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative bg-white border border-rose-100 rounded-3xl p-4 sm:p-6 min-h-[200px] w-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <a href={category.href} className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 group-hover:text-rose-600 transition-colors duration-300">
                  {category.title}
                </h2>
                
                <div className="self-end w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
    </div>
  );
}
