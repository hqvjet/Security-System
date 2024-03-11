'use client'
import { TableProps } from "antd";
import { Police } from "@/datatype"
import { ROLE } from "@/constant/constant";

export const cols: TableProps<Police>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => (<a className="underline">{text}</a>)
    },
    {
        title: 'Full Name',
        key: 'full_name',
        dataIndex: 'full_name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role'
    },
    {
        title: 'Work At',
        dataIndex: 'work_at',
        key: 'work_at'
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar'
    }
]

export const data: Police[] = [
    {
        id: 'PLC000001',
        full_name: 'Join Alice',
        age: 20,
        role: ROLE.MOBILE_POLICE,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000002',
        full_name: 'Join Egde',
        age: 20,
        role: ROLE.MOBILE_POLICE,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000003',
        full_name: 'Join Status',
        age: 20,
        role: ROLE.MOBILE_POLICE,
        avatar: '',
        work_at: 'B Place'
    },
]