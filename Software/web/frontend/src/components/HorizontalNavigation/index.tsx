'use client'
import { Menu } from "antd";
import { MenuProps } from 'antd';
import { useState } from "react";

interface HorizontalNavigationProps {
  onClick: MenuProps['onClick'];
  current: string;
  items: MenuProps['items'];
}

export default function HorizontalNavigation(props: HorizontalNavigationProps) {
    return (
        <div className="flex justify-start w-[460px]">
            <Menu 
                onClick={props.onClick} 
                selectedKeys={[props.current]} 
                mode="horizontal" 
                items={props.items} 
                className="rounded-full mb-5 w-[500px]"
            />
        </div>
    )
}
