import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-[0.18em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 select-none",
  {
    variants: {
      variant: {
        solid: "bg-primary text-on-primary hover:bg-primary-hover",
        outline: "border border-primary/50 bg-surface/60 text-primary hover:bg-primary-soft/50",
        danger: "bg-danger text-on-primary hover:brightness-95",
        quiet: "text-primary hover:bg-primary-soft/50",
        light: "bg-white text-foreground hover:bg-white/90",
      },
      size: {
        md: "min-h-12 px-8 text-sm",
        sm: "min-h-10 px-5 text-xs",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type StyleProps = VariantProps<typeof buttonStyles>;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return <a className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
