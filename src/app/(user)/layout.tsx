import MenuMobile from '@/components/layouts/menuMobileAdm';
import Sidebar from '@/components/layouts/sidebar';
import { MdAccountCircle } from 'react-icons/md';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MenuOptions = [
    {
      title: 'Conta',
      icon: <MdAccountCircle size={20} className="text-white" />,
      route: '/account',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 ">
      <div className="max-md:hidden">
        <Sidebar menu={MenuOptions} />
      </div>
      <div className="md:hidden">
        <MenuMobile />
      </div>
      <div className="h-full w-full max-h-screen overflow-y-auto  max-w-[1600px] min-h-screen px-4 ">
        {children}
      </div>
    </div>
  );
}
