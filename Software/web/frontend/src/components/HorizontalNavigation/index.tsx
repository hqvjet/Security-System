'use client'
import { Col, Row, Menu } from "antd"
import { useState } from "react";

export default function HorizontalNavigation(props: any) {
    return (
        <Menu onClick={props.onClick} selectedKeys={[props.current]} mode="horizontal" items={props.items} className="rounded-full mb-5 w-1/3"/>
    )
}