"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Col, Row } from "antd";
import { usePathname } from 'next/navigation';
import ConditionalLogout from "@/components/Logout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <Col className='max-h-screen bg-slate-500'>
              <Row align={'middle'} justify={'end'} className='w-full fixed p-10'>
                <ConditionalLogout currentPage={"admin"}/>
              </Row>
            <Row className='w-full h-full' justify={'center'} align={'middle'}>
              {children}
            </Row>
          </Col>
      </body>
    </html>
  );
}
