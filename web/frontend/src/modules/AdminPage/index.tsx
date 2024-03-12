'use client'
import { Row, Col, Table, TableProps, MenuProps } from "antd"
import { police_cols, police_data, all_data, all_col } from "./MOCKDATA"
import HorizontalNavigation from "@/components/HorizontalNavigation";
import { FcStatistics } from "react-icons/fc";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { SiSpringsecurity } from "react-icons/si";
import { GoDeviceCameraVideo } from "react-icons/go";
import { useState } from "react";
import { IoTDevice, Police, SecurityStaff } from "@/datatype";
import { ColumnsType } from "antd/es/table";
import Statistic from "@/components/Chart";
import MyLineChart from "@/components/Chart";

const items: MenuProps['items'] = [
    {
        label: 'Police',
        key: 'police',
        icon: <GiPoliceOfficerHead />,
        // children: [
        //     {
        //         label: 'Mobile Police Unit',
        //         key: 'mobile',
        //     },
        //     {
        //         label: 'Order Police Unit',
        //         key: 'order',
        //     }
        // ],
    },
    {
        label: 'Security Staff',
        key: 'security',
        icon: <SiSpringsecurity />
    },
    {
        label: 'IoT Device',
        key: 'iot',
        icon: <GoDeviceCameraVideo />,
    },
    {
        label: 'Statistic',
        key: 'statistic',
        icon: <FcStatistics />
    }
]

export default function Admin() {
    const [current, setCurrent] = useState('police')
    const [data, setData] = useState<Police[] | SecurityStaff[] | IoTDevice[]>(all_data.police)
    const [col, setCol] = useState<ColumnsType<Police> | ColumnsType<SecurityStaff> | ColumnsType<IoTDevice>>(all_col.police)
    const [statis, setStatis] = useState<boolean>(false)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key)
        const key = e.key 
        setStatis(key == 'statistic')
        setData(all_data[key])
        setCol(all_col[key])
        setCurrent(e.key)
    }

    return (
        <Col className="w-3/4">
            <HorizontalNavigation onClick={onClick} current={current} items={items} />
            {!statis ? (
            <Table
                columns={col as any}
                dataSource={data as any}
                className="bg-gray-800 border border-gray-700 divide-y divide-gray-700"
                components={{
                    header: {
                        cell: (props: any) => <th className="bg-gray-900 text-white">{props.children}</th>,
                    },
                    body: {
                        row: (props: any) => <tr className="bg-gray-800 hover:bg-gray-700 text-white">{props.children}</tr>,
                        cell: (props: any) => <td className="p-2">{props.children}</td>,
                    },
                }}
                pagination={{
                    itemRender: (page, type, originalElement) => {
                        if (type === 'prev') {
                            return (
                                <div className="cursor-pointer text-blue-500 rounded-full hover:bg-slate-500">&lt;</div>
                            );
                        }
                        if (type === 'next') {
                            return (
                                <div className="cursor-pointer text-blue-500 rounded-full hover:bg-slate-500">&gt;</div>
                            );
                        }
                        if (type === 'page') {
                            return (
                                <div className="cursor-pointer text-white bg-gray-400 rounded-full hover:bg-slate-500 ${page === current ? 'bg-slate-500 text-white' : 'bg-slate-500'">{page}</div>
                            )
                        }
                        return originalElement;
                    },
                }}
            />) : (
                <MyLineChart/>
            )}
        </Col>
    )
}