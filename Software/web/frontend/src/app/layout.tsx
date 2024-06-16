"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Col, Row } from "antd";
import { usePathname } from 'next/navigation';
import AvatarField from "@/components/Logout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isAdminPage = path.includes('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
          <Col className='full-screen bg-slate-500'>
            {isAdminPage && (
              <Row align={'middle'} justify={'end'} className='w-full fixed p-5'>
                <AvatarField currentPage={"AdminPage"} />
              </Row>
            )}
            <Row className='w-full h-full' justify={'center'} align={'middle'}>
              {children}
            </Row>
          </Col>
      </body>
    </html>
  );
}
