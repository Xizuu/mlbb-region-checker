"use client"
import { Heart } from "lucide-react"

export function Footer() {

    return (
        <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-emerald-900/30">
            <div className="container mx-auto">
                {/* Top section with logo and social links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6">
                    {/* Logo and description */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center mb-3">
                            <div className="bg-emerald-500 w-10 h-10 rounded-lg flex items-center justify-center mr-2">
                                <span className="text-black font-bold text-xl">ML</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl">Region Checker</h3>
                                <p className="text-emerald-400 text-xs">Mobile Legends</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-2 text-center md:text-left max-w-xs">Check your Mobile Legends server region easily and get player information in seconds</p>
                    </div>
                </div>

                {/* Bottom section with copyright */}
                <div className="border-t border-slate-800 py-6 px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-slate-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Mobile Legends Region Checker. All rights reserved.
                    </div>
                    <div className="text-slate-500 text-xs flex items-center">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 mx-1 text-red-500" />
                        <span>Not affiliated with Moonton or Mobile Legends: Bang Bang</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

