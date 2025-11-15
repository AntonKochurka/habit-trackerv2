import { type ReactNode, useState } from "react";

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
    children,
    content,
    position = "top"
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-1 mt-2",
        left: "right-full top-1/2 transform translate-x-1 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-x-1 -translate-y-1/2 ml-2"
    };

    const arrowClasses = {
        top: "top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700 border-x-transparent border-b-transparent border-t-4 border-x-2 border-b-0",
        bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700 border-x-transparent border-t-transparent border-b-4 border-x-2 border-t-0",
        left: "left-full top-1/2 transform -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700 border-y-transparent border-r-transparent border-l-4 border-y-2 border-r-0",
        right: "right-full top-1/2 transform -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700 border-y-transparent border-l-transparent border-r-4 border-y-2 border-l-0"
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="inline-block"
            >
                {children}
            </div>

            {isVisible && (
                <div className={`absolute z-50 ${positionClasses[position]}`}>
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg shadow-lg whitespace-nowrap">
                        {content}
                    </div>
                    <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
                </div>
            )}
        </div>
    );
}