import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

// --- Button Component ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "glow";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-bitte-blue hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]",
            outline: "border border-white/20 hover:border-bitte-blue hover:text-bitte-blue text-white/80 bg-transparent",
            ghost: "text-white/60 hover:text-white hover:bg-white/5",
            glow: "bg-gradient-to-r from-bitte-blue to-bitte-green text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-semibold",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// --- Card Component ---
// Omit children from HTMLMotionProps and redefine it as ReactNode to fix MotionValue incompatibility
interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => {
    return (
        <motion.div
            className={cn(
                "glass-panel rounded-xl p-6 relative overflow-hidden group",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};

export { Button, Card };
