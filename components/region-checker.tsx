"use client"

import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ResultProps {
    users: string;
    nickname: string;
    country: string;
}

export function RegionChecker() {
    const [userId, setUserId] = useState("")
    const [serverId, setServerId] = useState("")
    const [result, setResult] = useState<ResultProps | null>(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const checkRegion = async () => {
        setError("")
        setResult(null)

        if (!userId.trim()) {
            setError("Please enter your user ID")
            return
        }

        if (!serverId.trim()) {
            setError("Please enter your server ID")
            return
        }

        const serverIdNum = Number.parseInt(serverId, 10)

        if (isNaN(serverIdNum)) {
            setError("Please enter a valid numeric server ID")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/stalk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    zoneId: serverId,
                }),
            })

            const data = await response.json()

            if (data.status) {

                setResult(data.data)
            } else {

                setError(data.message || "Failed to fetch player data. Please check your ID and try again.")
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.")
            console.error("API Error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700 rounded-lg">
                <div className="pt-6 px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-slate-300 mb-1">
                                User ID
                            </label>
                            <input
                                id="userId"
                                type="text"
                                placeholder="Enter your user ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="serverId" className="block text-sm font-medium text-slate-300 mb-1">
                                Server ID
                            </label>
                            <input
                                id="serverId"
                                type="text"
                                placeholder="Enter server ID"
                                value={serverId}
                                onChange={(e) => setServerId(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <Button
                            onClick={checkRegion}
                            disabled={isLoading}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:opacity-70 text-white rounded-md flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Checking...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Check Player
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {error && <div className="bg-red-900/40 border border-red-800 text-white p-4 rounded-md">{error}</div>}

            {result && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="bg-slate-700 py-3 px-6">
                        <h3 className="font-bold">Player Information</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-slate-400">Mobile Legends ID</div>
                                <div className="text-xl font-bold">{result.users}</div>
                            </div>

                            <div>
                                <div className="text-sm text-slate-400">Nickname</div>
                                <div className="text-xl font-bold">{result.nickname}</div>
                            </div>

                            <div>
                                <div className="text-sm text-slate-400">Country</div>
                                <div className="text-xl font-bold flex items-center">
                                    <span className="mr-2">{result.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-amber-900/20 border border-amber-800/30 rounded-md p-4 text-amber-200 text-sm">
                <p>
                    <strong>Tip:</strong> Your Mobile Legends ID is displayed in the format: <strong>User ID (Server ID)</strong>.
                    For example: 12345678 (1234)
                </p>
            </div>
        </div>
    )
}
