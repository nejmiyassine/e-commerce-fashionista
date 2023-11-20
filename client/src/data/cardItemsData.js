import { AiOutlineBarChart, AiOutlinePieChart } from 'react-icons/ai';
import { BiScatterChart } from 'react-icons/bi';
import { BsArrowDown } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';

export const cardItemsData = [
    {
        title: 'Sales',
        number: '1,000',
        Icon: AiOutlineBarChart,
        percentage: '15%',
        PercentageIcon: BsArrowDown,
    },
    {
        title: 'Customers',
        number: '19K',
        Icon: AiOutlinePieChart,
        percentage: '-30%',
        PercentageIcon: BsArrowDown,
    },
    {
        title: 'Orders',
        number: '30k',
        Icon: BiScatterChart,
        percentage: '20%',
        PercentageIcon: BsArrowDown,
    },
    {
        title: 'Incomes',
        number: '$3,000',
        Icon: MdAttachMoney,
        percentage: '-10%',
        PercentageIcon: BsArrowDown,
    },
];
