import { AiOutlineBarChart, AiOutlinePieChart } from 'react-icons/ai';
import { BiScatterChart } from 'react-icons/bi';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';

const DashboardCard = () => {
    const cardItems = [
        {
            title: 'Sales',
            number: '1,000',
            icon: <AiOutlineBarChart size={35} />,
            percentage: '15%',
            percentageIcon: <HiOutlinePresentationChartBar size={35} />,
        },
        {
            title: 'Customers',
            number: '19K',
            icon: <AiOutlinePieChart size={35} />,
            percentage: '30%',
            percentageIcon: <HiOutlinePresentationChartBar size={35} />,
        },
        {
            title: 'Orders',
            number: '30k',
            icon: <BiScatterChart size={35} />,
            percentage: '20%',
            percentageIcon: <HiOutlinePresentationChartBar size={35} />,
        },
        {
            title: 'Incomes',
            number: '$3,000',
            icon: <HiOutlinePresentationChartBar size={35} />,
            percentage: '10%',
            percentageIcon: <HiOutlinePresentationChartBar size={35} />,
        },
    ];

    return (
        <div className='flex justify-between gap-4 mt-4'>
            {cardItems.map(({ title, number, icon }, idx) => (
                <div
                    key={idx}
                    className='rounded-md w-full shadow-sm bg-white text-primary-light dark:bg-primary-deepDark dark:text-primary-dark'
                >
                    <div className='p-4 flex items-center justify-between'>
                        <div>
                            <h3 className='font-semibold text-sm pb-4'>
                                {title}
                            </h3>
                            <span className='font-bold text-3xl tracking-wide'>
                                {number}
                            </span>
                            <p></p>
                        </div>
                        <div className='rounded-full bg-primary-blueCyan text-white dark:bg-primary-dark dark:text-primary-deepDark p-3'>
                            <div>{icon}</div>
                        </div>
                    </div>
                    {/* <div className='w-full border-b border-dash' />
                <div className='p-4'></div> */}
                </div>
            ))}
        </div>
    );
};

export default DashboardCard;
