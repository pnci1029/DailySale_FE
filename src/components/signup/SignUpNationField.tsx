import style from "../../assets/scss/sub/signup.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {ValidateStatus} from "../../types/signup";

interface Args{
    nation: string;
    setNation: (_: string) => void
    nationValidate: ValidateStatus;
    setNationValidate: React.Dispatch<React.SetStateAction<ValidateStatus>>;
}
export function SignUpNationField({nation, setNation, nationValidate, setNationValidate}:Args) {

    const [optionReveal, setOptionReveal] = useState(false)
    const [isNationChecked, setIsNationChecked] = useState(false)
    const nationWrapperRef = useRef<HTMLDivElement>(null);
    const nations = [
        {name: '국가를 선택해주세요!', value:''},
        {name: '한국', value:'kor'},
        {name: '미국', value:'usa'},
        {name: '캐나다', value:'can'},
        {name: '일본', value:'jap'},
        {name: '중국', value:'chi'},
    ]

    const getValue = (value: string) => {
        const nation = nations.find(item => item.value === value);
        return nation ? nation.name : null;
    }

    const handleSelectNation = () => {
        setNationValidate(ValidateStatus.NONE)
        setOptionReveal(() => !optionReveal)
    }

    const selectNation = (value:string) =>{
        setNation(value)
    }

    // 국가 선택 셀렉트박스 비활성화
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (nationWrapperRef.current && !nationWrapperRef.current.contains(event.target as Node)) {
                setOptionReveal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 국가 체크 부분
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log(error)
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const checkNation = () => {
            const { latitude, longitude } = location;

            const locations = [
                {
                    name: '한국',
                    value:'kor',
                    latRange: [33, 43],
                    lonRange: [124, 132],
                },
                {
                    name: '미국',
                    value:'usa',
                    latRange: [24, 49],  // 본토 기준
                    lonRange: [66, 172],
                },
                {
                    name: '캐나다',
                    value:'can',
                    latRange: [42, 83],
                    lonRange: [53, 141],
                },
                {
                    name: '일본',
                    value:'jap',
                    latRange: [20, 45],
                    lonRange: [122, 153],
                },
                {
                    name: '중국',
                    value:'chi',
                    latRange: [18, 53],
                    lonRange: [73, 123],
                }
            ];

            for (const loc of locations) {
                if (
                    latitude >= loc.latRange[0] && latitude <= loc.latRange[1] &&
                    longitude >= loc.lonRange[0] && longitude <= loc.lonRange[1]
                ) {
                    setNation(loc.value);
                    setIsNationChecked(true);
                    break;
                }
            }
        };

        if (location.latitude && location.longitude) {
            !isNationChecked && checkNation();
        }
    // eslint-disable-next-line
    }, [location, nation, optionReveal]);

    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    현재 거주중인 국가를 선택해주세요!
                </span>
                <div className={style.contentWithNation}>
                    <div className={style.nationWrapper} onClick={handleSelectNation} ref={nationWrapperRef}>
                        <span className={style.nationText}>
                            {getValue(nation)}
                        </span>
                        <div className={style.selectButton}>
                            {optionReveal && (
                                <div className={style.selectOptionsWrapper}>
                                    {nations
                                        .filter(data => data.value !== '')
                                        .map((data, idx) => (
                                        <div className={`${style.options} ${data.name === nation ? style.selected : ''}`} key={idx}
                                        onClick={() =>selectNation(data.value)}>
                                            {data.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {nationValidate === ValidateStatus.UNFILLED && (
                    <span className={style.duplicateMessage}>국가를 선택해주세요!</span>
                )}
            </div>
        </>
    )
}