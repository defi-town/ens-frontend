import { useRouter } from 'next/router';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import logo from '@/assets/images/ens-gods-logo.png';
import routes from '@/config/routes';

export default function Logo() {
  const router = useRouter();

  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <AnchorLink
      href={{
        pathname: routes.home,
      }}
      className="flex w-28 outline-none sm:w-32 4xl:w-36"
    >
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={logo} alt="logo" height={24} priority /> // TODO: Use new logo
        )}
        {isMounted && !isDarkMode && (
          <Image src={logo} alt="logo" height={24} priority />
        )}
      </span>
    </AnchorLink>
  );
}
