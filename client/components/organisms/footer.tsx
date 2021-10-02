import { APP_NAME } from '@/libs/constants';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <p className="mt-8 text-base text-center text-black">
          &copy; {`2021 ${APP_NAME}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
