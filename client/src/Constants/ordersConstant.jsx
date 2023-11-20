import {
    LuCircleDashed,
    LuCircleDotDashed,
    LuContainer,
    LuRefreshCcw,
    LuTruck,
} from 'react-icons/lu';
import { HiBan } from 'react-icons/hi';

export const orderStatus = [
    { name: 'Pending', uid: 'pending', icon: <LuCircleDashed /> },
    { name: 'Processing', uid: 'processing', icon: <LuCircleDotDashed /> },
    { name: 'Shipped', uid: 'shipped', icon: <LuTruck /> },
    { name: 'Delivered', uid: 'delivered', icon: <LuContainer /> },
    { name: 'Refunded', uid: 'refunded', icon: <LuRefreshCcw /> },
    { name: 'Canceled', uid: 'canceled', icon: <HiBan /> },
];

export const statusColorMap = {
    pending: 'warning',
    processing: 'warning',
    shipped: 'success',
    delivered: 'success',
    refunded: 'danger',
    canceled: 'danger',
};
