import React from 'react';
import { motion } from 'framer-motion';
import style from '../../../assets/scss/shared/sharedComponents.module.scss';

interface StatCardProps {
    title: string;
    mainStat: {
        label: string;
        value: string;
    };
    subStats?: Array<{
        label: string;
        value: string;
    }>;
    details?: Array<{
        label: string;
        items: string[];
    }>;
    tags?: string[];
    className?: string;
    variant?: 'primary' | 'secondary' | 'highlight';
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    mainStat,
    subStats,
    details,
    tags,
    className,
    variant = 'primary'
}) => {
    return (
        <motion.div
            className={`${style.statCard} ${style[variant]} ${className || ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
        >
            <div className={style.cardHeader}>
                <h3>{title}</h3>
                {tags && (
                    <div className={style.tagContainer}>
                        {tags.map((tag, index) => (
                            <span key={index} className={style.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={style.mainStat}>
                <span className={style.statValue}>{mainStat.value}</span>
                <span className={style.statLabel}>{mainStat.label}</span>
            </div>

            {subStats && (
                <div className={style.subStatsGrid}>
                    {subStats.map((stat, index) => (
                        <div key={index} className={style.subStat}>
                            <span className={style.statValue}>{stat.value}</span>
                            <span className={style.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {details && (
                <div className={style.detailsSection}>
                    {details.map((detail, index) => (
                        <div key={index} className={style.detailGroup}>
                            <h4>{detail.label}</h4>
                            <ul>
                                {detail.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};
