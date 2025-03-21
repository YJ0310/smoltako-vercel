import { cn } from "@/lib/utils"

interface TakoIllustrationProps {
  width?: number
  height?: number
  className?: string
}

export default function TakoIllustration({ width = 40, height = 40, className }: TakoIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
    >
      {/* Tako (Octopus) SVG */}
      <g>
        {/* Head */}
        <circle cx="50" cy="40" r="30" />

        {/* Eyes */}
        <circle cx="40" cy="30" r="5" fill="white" />
        <circle cx="60" cy="30" r="5" fill="white" />
        <circle cx="40" cy="30" r="2" fill="black" />
        <circle cx="60" cy="30" r="2" fill="black" />

        {/* Smile */}
        <path d="M40,45 Q50,55 60,45" fill="none" stroke="white" strokeWidth="2" />

        {/* Tentacles */}
        <path d="M25,50 Q15,60 10,70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M35,60 Q30,75 25,85" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M50,65 Q50,80 50,90" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M65,60 Q70,75 75,85" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M75,50 Q85,60 90,70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

