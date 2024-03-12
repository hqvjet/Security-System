'use client'
import { TableProps } from "antd";
import { Police, SecurityStaff, IoTDevice } from "@/datatype";
import { ROLE } from "@/constant/constant";

export const police_cols: TableProps<Police>['columns'] = [
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

export const security_staff_cols: TableProps<SecurityStaff>['columns'] = [
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

export const iot_cols: TableProps<IoTDevice>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => (<a className="underline">{text}</a>)
    },
    {
        title: 'Work At',
        dataIndex: 'work_at',
        key: 'work_at'
    },
    {
        title: 'Placed At',
        dataIndex: 'placed_at',
        key: 'placed_at'
    }
]

export const police_data: Police[] = [
    {
        id: 'PLC000001',
        full_name: 'Join Alice',
        age: 20,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000002',
        full_name: 'Join Egde',
        age: 21,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000003',
        full_name: 'Join Status',
        age: 22,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000004',
        full_name: 'Join Smith',
        age: 23,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000005',
        full_name: 'Join Johnson',
        age: 24,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000006',
        full_name: 'Join Williams',
        age: 25,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000007',
        full_name: 'Join Brown',
        age: 26,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000008',
        full_name: 'Join Davis',
        age: 27,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000009',
        full_name: 'Join Miller',
        age: 28,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000010',
        full_name: 'Join Wilson',
        age: 29,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000008',
        full_name: 'Join Davis',
        age: 27,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'PLC000009',
        full_name: 'Join Miller',
        age: 28,
        role: 'mobile_police',
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'PLC000010',
        full_name: 'Join Wilson',
        age: 29,
        role: 'mobile_police',
        avatar: '',
        work_at: 'B Place'
    }
]

const security_staff_data: SecurityStaff[] = [
    {
        id: 'SS000001',
        full_name: 'Kery Danse',
        age: 21,
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'SS000002',
        full_name: 'John Smith',
        age: 25,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'SS000003',
        full_name: 'Emma Johnson',
        age: 23,
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'SS000004',
        full_name: 'Michael Williams',
        age: 27,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'SS000005',
        full_name: 'Olivia Brown',
        age: 22,
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'SS000006',
        full_name: 'James Davis',
        age: 24,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'SS000007',
        full_name: 'Sophia Miller',
        age: 26,
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'SS000008',
        full_name: 'William Wilson',
        age: 28,
        avatar: '',
        work_at: 'A Place'
    },
    {
        id: 'SS000009',
        full_name: 'Ava Martinez',
        age: 29,
        avatar: '',
        work_at: 'B Place'
    },
    {
        id: 'SS000010',
        full_name: 'Alexander Taylor',
        age: 30,
        avatar: '',
        work_at: 'A Place'
    }
]

const iot_data: IoTDevice[] = [
    {
        id: 'ID000001',
        work_at: 'A Place',
        placed_at: '101 Hai Ba Trung, Ho Chi Minh'
    },
    {
        id: 'ID000002',
        work_at: 'A Place',
        placed_at: '103 Nguyen Hue, Ho Chi Minh'
    },
    {
        id: 'ID000003',
        work_at: 'B Place',
        placed_at: '201 Le Loi, Ho Chi Minh'
    },
    {
        id: 'ID000004',
        work_at: 'B Place',
        placed_at: '205 Pham Ngu Lao, Ho Chi Minh'
    },
    {
        id: 'ID000005',
        work_at: 'A Place',
        placed_at: '301 Vo Van Tan, Ho Chi Minh'
    },
    {
        id: 'ID000006',
        work_at: 'A Place',
        placed_at: '403 Le Duan, Ho Chi Minh'
    },
    {
        id: 'ID000007',
        work_at: 'B Place',
        placed_at: '501 Nguyen Trai, Ho Chi Minh'
    },
    {
        id: 'ID000008',
        work_at: 'B Place',
        placed_at: '503 Tran Hung Dao, Ho Chi Minh'
    },
    {
        id: 'ID000009',
        work_at: 'A Place',
        placed_at: '601 Cach Mang Thang Tam, Ho Chi Minh'
    },
    {
        id: 'ID000010',
        work_at: 'B Place',
        placed_at: '703 Nguyen Van Cu, Ho Chi Minh'
    }
]

export const all_data: {[key: string]: any} = {
    'police': police_data,
    'security': security_staff_data,
    'iot': iot_data
}

export const all_col: {[key: string]: any} = {
    police: police_cols,
    security: security_staff_cols,
    iot: iot_cols
}