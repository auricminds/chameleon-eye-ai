// Login has no sidebar or header — minimal centered layout
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {children}
    </div>
  )
}
