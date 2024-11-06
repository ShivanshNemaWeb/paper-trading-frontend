"use client"

import { useEffect, useState } from "react"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "./button"
import tickers from "@/data/tickers.json"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"
import Swal from 'sweetalert2';
import constants from '../../constants.json'
const SUGGESTIONS = [
    { ticker: "TSLA", title: "Tesla Inc." },
    { ticker: "NVDA", title: "NVIDIA Corporation" },
    { ticker: "AAPL", title: "Apple Inc." },
    { ticker: "MSFT", title: "Microsoft Corporation" },
    { ticker: "GOOGL", title: "Alphabet Inc." },
    { ticker: "AMZN", title: "Amazon.com Inc." },
]

const token = Cookies.get('token')

export default function CommandMenu() {
    const baseUrl = constants.baseUrl
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleAddClick = async (ticker: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const response = await axios.post(`${baseUrl}/watchlist/add`,{ticker:ticker} ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Ticker added to watchlist!',
                    confirmButtonColor: '#3085d6',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        // Refresh the page when the alert closes
                        window.location.reload();
                      },
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Failed to add ticker to watchlist.',
                    confirmButtonColor: '#d33',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the ticker to the watchlist.',
                confirmButtonColor: '#d33',
            });
            console.error(error);
        }
    };

    return (
        <div style={{display:'center', alignItems:'center', justifyContent:'center'}}>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size={"sm"}
                className="group"
            >
                <p className="flex gap-10 text-sm text-muted-foreground group-hover:text-foreground">
                    Search...
                    <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-foreground sm:inline-flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </p>
            </Button>
            <div >
            <Command>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput
                        placeholder="Search by symbols or companies..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {search.length === 0 &&
                                SUGGESTIONS.map((suggestion) => (
                                    <div className="w-full flex justify-between" key={suggestion.ticker}>
                                        <CommandItem
                                            // ticker={suggestion.ticker}
                                            value={suggestion.ticker + "\n \n" + suggestion.title}
                                            onSelect={() => {
                                                setOpen(false)
                                                setSearch("")
                                                router.push(`/stocks/${suggestion.ticker}`)
                                            }}
                                        >
                                            <p className="mr-2 font-semibold">{suggestion.ticker}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {suggestion.title}
                                            </p>
                                            <button
                                                className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-green"
                                                onClick={(e) => handleAddClick(suggestion.ticker, e)}
                                            >
                                                Add
                                            </button>
                                        </CommandItem>
                                    </div>
                                ))}
                            {search.length > 0 &&
                                tickers
                                    .filter(
                                        (ticker) =>
                                            ticker.ticker
                                                .toLowerCase()
                                                .includes(search.toLowerCase()) ||
                                            ticker.title.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .slice(0, 10)
                                    .map((ticker) => (
                                        <div className="w-full flex justify-between" key={ticker.ticker}>
                                            <CommandItem
                                                // ticker={ticker.ticker}
                                                value={ticker.ticker + "\n \n" + ticker.title}
                                                onSelect={() => {
                                                    setOpen(false)
                                                    setSearch("")
                                                    router.push(`/stocks/${ticker.ticker}`)
                                                }}
                                            >
                                                <p className="mr-2 font-semibold">{ticker.ticker}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {ticker.title}
                                                </p>
                                                <button
                                                    className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-green"
                                                    onClick={(e) => handleAddClick(ticker.ticker, e)}
                                                >
                                                    Add
                                                </button>
                                            </CommandItem>
                                        </div>
                                    ))}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </Command>
            </div>
        </div>
    )
}
