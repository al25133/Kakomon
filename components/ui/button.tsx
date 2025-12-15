import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import Link from "next/link"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#FBFEFF] text-[#3769F4] border border-[#3769F4] hover:bg-[#3769F4] hover:text-[#FBFEFF] active:bg-[#3769F4] active:text-[#FBFEFF]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-[#FBFEFF] text-[#3769F4] border border-[#3769F4] hover:bg-[#3769F4] hover:text-[#FBFEFF] active:bg-[#3769F4] active:text-[#FBFEFF]",
        secondary:
          "bg-[#FBFEFF] text-[#3769F4] border border-[#3769F4] hover:bg-[#3769F4] hover:text-[#FBFEFF] active:bg-[#3769F4] active:text-[#FBFEFF]",
        ghost: "bg-[#FBFEFF] text-[#3769F4] hover:bg-[#3769F4] hover:text-[#FBFEFF] active:bg-[#3769F4] active:text-[#FBFEFF]",
        link: "text-[#3769F4] underline-offset-4 hover:no-underline hover:text-[#3769F4]",
      },
      size: {
        default: "h-[5rem] px-10 w-2/5 max-w-md min-w-[240px] text-xl rounded-full",
        sm: "h-[2rem] px-6 w-2/5 max-w-md min-w-[200px] text-lg rounded-full",
        lg: "h-[5rem] px-12 w-2/5 max-w-md min-w-[260px] text-2xl rounded-full",
        icon: "h-[5rem] w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<any, ButtonProps>(
  ({ className, variant, size, asChild = false, href, children, style, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))
    const mergedStyle = { marginTop: "1.5rem", ...(style as React.CSSProperties) }

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref}
          style={mergedStyle}
          {...(props as any)}
        >
          {children}
        </Link>
      )
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={classes}
        ref={ref}
        style={mergedStyle}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }