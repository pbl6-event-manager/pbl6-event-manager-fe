import { Lock } from "lucide-react";

interface LockContentProps {
    message: string;
}

export const LockedContent: React.FC<LockContentProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Lock className="h-10 w-10 text-gray-400" />
        </div>
        <p className="text-base font-medium text-gray-900 mb-1">Access Restricted</p>
        <p className="text-sm text-muted-foreground">{message}</p>
    </div>
    )
}