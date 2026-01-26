import { AuthProvider } from "@/context/AuthContext";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider storageKey="bienek_admin_session">
            <div className="min-h-screen bg-gray-100">
                {children}
            </div>
        </AuthProvider>
    );
}
