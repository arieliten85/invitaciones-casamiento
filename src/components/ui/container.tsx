import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/class-names";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: "narrow" | "default";
};

export function Container({ as: Tag = "div", size = "default", className, ...props }: Props) {
  return (
    <Tag
      className={cn("mx-auto w-full px-5 sm:px-8", size === "narrow" ? "max-w-2xl" : "max-w-5xl", className)}
      {...props}
    />
  );
}
