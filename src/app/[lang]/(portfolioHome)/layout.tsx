import HomeLayout from '@FsdApp/layouts/HomeLayout';
import getThemeCookie from '@FsdShared/config/theme/server-action/getThemeCookie';

interface Props {
  children: React.ReactNode;
}

export default async function HomePageLayout({ children }: Props) {
  const theme = await getThemeCookie();

  return <HomeLayout themeType={theme}>{children}</HomeLayout>;
}
