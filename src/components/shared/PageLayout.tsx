import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationLink } from '../../types/employment';
import style from '../../assets/scss/shared/sharedComponents.module.scss';

interface PageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    navigationLinks?: NavigationLink[];
    className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
    title,
    description,
    children,
    navigationLinks,
    className
}) => {
    const location = useLocation();

    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const linkVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        hover: { x: 5, color: '#0072b3' }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className={`${style.pageContainer} ${className || ''}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                {navigationLinks && (
                    <motion.nav 
                        className={style.pageNavigation}
                        variants={staggerChildren}
                    >
                        <ul>
                            {navigationLinks.map((link, index) => (
                                <motion.li 
                                    key={link.path}
                                    variants={linkVariants}
                                    whileHover="hover"
                                    custom={index}
                                >
                                    <Link 
                                        to={link.path}
                                        className={location.pathname === link.path ? style.active : ''}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}

                <motion.div 
                    className={style.pageHeader}
                    variants={{
                        initial: { opacity: 0, y: -20 },
                        animate: { opacity: 1, y: 0, transition: { delay: 0.2 } }
                    }}
                >
                    <motion.h1
                        variants={{
                            initial: { opacity: 0, y: -20 },
                            animate: { opacity: 1, y: 0 }
                        }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { delay: 0.3 } }
                        }}
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <motion.div 
                    className={style.pageContent}
                    variants={staggerChildren}
                >
                    {children}
                </motion.div>

                <motion.div 
                    className={style.pageFooter}
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { delay: 0.4 } }
                    }}
                >
                    <div className={style.footerContent}>
                        <p>더 많은 정보가 필요하신가요?</p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/contact" className={style.contactButton}>
                                문의하기
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
