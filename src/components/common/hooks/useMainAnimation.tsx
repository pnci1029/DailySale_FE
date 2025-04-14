import React, {useMemo} from "react";
import {Box} from "@mui/material";

export function useMainAnimation() {
    const AnimatedBackground = React.memo(() => {
        // 애니메이션 항목들을 한 번만 생성
        const fallingItems = useMemo(() => {
            return Array.from({ length: 15 }).map((_, index) => ({
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                rotateStart: Math.random() * 60 - 30,
                rotateEnd: Math.random() * 360,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 10,
                color: index % 3 === 0 ? '#F29727' : index % 3 === 1 ? '#FFCD00' : '#FFA41B',
                emoji: index % 5 === 0 ? '🏷️' : index % 5 === 1 ? '💰' : index % 5 === 2 ? '🛒' : index % 5 === 3 ? '🔖' : '💯'
            }));
        }, []);

        const starItems = useMemo(() => {
            return Array.from({ length: 20 }).map((_, index) => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
                duration: Math.random() * 4 + 2,
                delay: Math.random() * 2,
                backgroundColor: index % 2 === 0 ? '#FFCD00' : '#F29727'
            }));
        }, []);

        return (
            <>
                {/* 떨어지는 할인 태그 애니메이션 */}
                {fallingItems.map((item, index) => (
                    <Box
                        key={`discount-tag-${index}`}
                        sx={{
                            position: 'absolute',
                            left: item.left,
                            top: `-100px`,
                            color: item.color,
                            fontSize: item.fontSize,
                            opacity: 0.6,
                            transform: `rotate(${item.rotateStart}deg)`,
                            animation: `fall-${index} ${item.duration}s linear ${item.delay}s infinite`,
                            [`@keyframes fall-${index}`]: {
                                '0%': {
                                    transform: `translateY(0) rotate(${item.rotateStart}deg)`,
                                    opacity: 0
                                },
                                '10%': {
                                    opacity: 0.6
                                },
                                '90%': {
                                    opacity: 0.6
                                },
                                '100%': {
                                    transform: `translateY(${window.innerHeight + 200}px) rotate(${item.rotateEnd}deg)`,
                                    opacity: 0
                                }
                            }
                        }}
                    >
                        {item.emoji}
                    </Box>
                ))}

                {/* 반짝이는 별 효과 */}
                {starItems.map((item, index) => (
                    <Box
                        key={`star-${index}`}
                        sx={{
                            position: 'absolute',
                            left: item.left,
                            top: item.top,
                            width: item.width,
                            height: item.height,
                            borderRadius: '50%',
                            backgroundColor: item.backgroundColor,
                            animation: `twinkle-${index} ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
                            [`@keyframes twinkle-${index}`]: {
                                '0%': {
                                    opacity: 0.3,
                                    transform: 'scale(1)'
                                },
                                '100%': {
                                    opacity: 0.8,
                                    transform: 'scale(1.5)'
                                }
                            }
                        }}
                    />
                ))}
            </>
        );
    });

    return {
        AnimatedBackground
    }

}