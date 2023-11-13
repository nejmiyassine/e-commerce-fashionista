import { cardItemsData } from '../../data/cardItemsData';

const DashboardCard = () => {
    return (
        <div className='grid grid-rows-4 grid-flow-col md:grid-rows-2 lg:grid-rows-1 gap-4 mt-4'>
            {cardItemsData &&
                cardItemsData.map(
                    (
                        { title, number, Icon, percentage, PercentageIcon },
                        idx
                    ) => {
                        const icon = <Icon size={35} />;
                        const percentageIcon = (
                            <PercentageIcon
                                className={`${
                                    parseInt(percentage) > 0
                                        ? 'rotate-180'
                                        : 'rotate-0'
                                }`}
                            />
                        );

                        return (
                            <div
                                key={idx}
                                className='w-1/4 rounded-md w-full shadow-sm bg-white text-primary-light dark:bg-primary-deepDark dark:text-primary-dark'
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
                                        {icon}
                                    </div>
                                </div>
                                <div className='w-full border-b border-dash' />
                                <div
                                    className={`p-4 flex items-center text-sm gap-1 text-sm ${
                                        parseInt(percentage) >= 0
                                            ? 'text-green-600 dark:text-green-500'
                                            : 'text-red-600 dark:text-red-500'
                                    }  font-semibold`}
                                >
                                    <div className='flex items-center'>
                                        <p>{percentage}</p>
                                        {percentageIcon}
                                    </div>
                                    <p>From last week</p>
                                </div>
                            </div>
                        );
                    }
                )}
        </div>
    );
};

export default DashboardCard;
