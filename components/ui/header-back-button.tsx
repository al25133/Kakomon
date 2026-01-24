import * as React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

export interface HeaderBackButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  onClick?: () => void
}

const HeaderBackButton = React.forwardRef<HTMLElement, HeaderBackButtonProps>(
  ({ className, href, onClick, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          onClick={onClick}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">{children || "戻る"}</span>
        </Link>
      )
    }

    return (
      <button
        onClick={onClick}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">{children || "戻る"}</span>
      </button>
    )
  }
)
HeaderBackButton.displayName = "HeaderBackButton"

export { HeaderBackButton }