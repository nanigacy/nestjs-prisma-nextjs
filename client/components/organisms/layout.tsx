import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';

export default function Layout({ children }: any) {
  return (
    <>
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <div className="max-w-4xl min-h-screen mx-auto">{children}</div>
      <Footer />
    </>
  );
}
