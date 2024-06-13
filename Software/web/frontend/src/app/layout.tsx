'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Col, Row } from "antd";
import { usePathname } from 'next/navigation'
// import AvatarField from "@/components/AvatarField";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname().split('/')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Col className='h-screen bg-slate-400'>
          {path[1] != 'signin' && (
            <Row align={'middle'} justify={'end'} className='w-full fixed p-5'>
              {/* <AvatarField /> */}
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