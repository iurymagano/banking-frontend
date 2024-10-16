import MenuMobileAdm from '@/components/layouts/menuMobileAdm';
import Sidebar from '@/components/layouts/sidebar';
import { HiHome } from 'react-icons/hi';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MenuOptions = [
    {
      title: 'Dashboard',
      icon: <HiHome size={20} className="text-white" />,
      route: '/dashboard',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 ">
      <div className="max-md:hidden">
        <Sidebar menu={MenuOptions} />
      </div>
      <div className="md:hidden">
        <MenuMobileAdm />
      </div>
      <div className="h-full w-full max-h-screen overflow-y-auto  max-w-[1600px] min-h-screen px-4 py-2">
        {children}
      </div>
    </div>
  );
}
