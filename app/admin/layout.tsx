import { getAdminSession } from '@/lib/admin/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The login page is rendered via its own nested layout but still passes through here.
  // The middleware handles the /admin/login exception, so we do a session check
  // but skip the sidebar/header for the login child (middleware already allows it).
  // We detect the login route by checking the absence of session without redirect for that path.
  // Since middleware already guards /admin/* except /admin/login, we can safely
  // check the session here for rendering the shell. If no session and we reach here
  // (which only happens for /admin/login due to middleware), render children plain.
  const session = await getAdminSession()

  if (!session) {
    // Middleware allows /admin/login without a token, so we just render children
    // without the admin shell. The login page layout below provides its own wrapper.
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader session={session} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
