import { cn } from "@/utils";
import React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md border-[.5px] border-tertiary-100/10 focus-visible:border focus-visible:border-tertiary-100 bg-primary-200 px-3 py-2 text-base text-tertiary-100 placeholder:text-tertiary-100/80 outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-500",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
