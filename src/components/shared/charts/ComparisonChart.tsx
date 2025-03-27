import React from 'react';
import { motion } from 'framer-motion';
import style from '../../../assets/scss/shared/sharedComponents.module.scss';

interface ComparisonData {
    label: string;
    value: string;
    percentage: number;
    color?: string;
}

interface ComparisonChartProps {
    title: string;
    data: ComparisonData[];
    className?: string;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
    title,
    data,
    className
}) => {
    const maxPercentage = Math.max(...data.map(item => item.percentage));

    return (
        <div className={`${style.comparisonChart} ${className || ''}`}>
            <h3>{title}</h3>
            <div className={style.chartContainer}>
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className={style.chartRow}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={style.chartLabel}>
                            <span>{item.label}</span>
                            <span className={style.value}>{item.value}</span>
                        </div>
                        <div className={style.barContainer}>
                            <motion.div
                                className={style.bar}
                                style={{ 
                                    backgroundColor: item.color || '#0072b3',
                                    width: '0%'
                                }}
                                animate={{ 
                                    width: `${(item.percentage / maxPercentage) * 100}%`
                                }}
                                transition={{ 
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                            />
                            <span className={style.percentage}>
                                {item.percentage}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const SalaryTrendChart: React.FC<{
    data: Array<{
        year: string;
        salary: number;
    }>;
    className?: string;
}> = ({ data, className }) => {
    const maxSalary = Math.max(...data.map(item => item.salary));

    return (
        <div className={`${style.trendChart} ${className || ''}`}>
            <h3>연봉 트렌드</h3>
            <div className={style.trendContainer}>
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className={style.trendPoint}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.div 
                            className={style.trendBar}
                            initial={{ height: 0 }}
                            animate={{ 
                                height: `${(item.salary / maxSalary) * 100}%`
                            }}
                            transition={{ 
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        />
                        <span className={style.trendYear}>{item.year}</span>
                        <span className={style.trendValue}>
                            ${item.salary.toLocaleString()}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
