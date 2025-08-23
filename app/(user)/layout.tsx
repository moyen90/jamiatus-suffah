import { UserLayout } from './UserLayout';
export default function UserDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayout>{children}</UserLayout>;
}