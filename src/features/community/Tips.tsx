import {useTipsGetter} from "./hooks/useTipsGetter";
import {useEffect, useState} from "react";
import style from "../../assets/scss/sub/community.module.scss";
import {CommunityCategory} from "./CommunityCategory";
import spinner from "../../assets/img/community/loading_spinner.gif"
import {CommunityCategories, CommunityType} from "../../types/community";

export function Tips() {

    const {getTip, tips, isLoaded} = useTipsGetter();
    const [category, setCategory] = useState<CommunityCategories>(CommunityCategories.ALL)

    useEffect(() => {
        getTip().then();

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!isLoaded && (
                <img className={style.spinner} src={spinner} alt={'spinner'}/>
            )}
            <div className={style.communityUpperWrapper}>
                {/* 커뮤니티 헤더 */}
                <div className={style.communityTitleWrapper}>
                    <span className={style.title}>Share your tips</span>
                    <span className={style.subTitle}>What efforts have you made to pursue a career abroad</span>
                    <span className={style.subTitle}>Share your insights with others!</span>
                </div>

                <div className={style.contents}>
                    {/*  정렬, 카테고리  */}
                    <CommunityCategory categoryType={category} setCategoryType={setCategory}/>

                    {/*  검색, 페이징  */}
                    <div className={style.searchAreaWrapper}>
                        <div className={style.refreshImg}/>
                        <div className={style.searchArea}>
                            <input
                                className={style.searchInput}
                                placeholder={"검색어를 입력하세요."}
                            />
                        </div>
                        <div className={style.pageArea}>
                            1 / 3 page
                        </div>
                    </div>

                    {/*<CommunityContents result={tips}/>*/}
                </div>
            </div>
        </>
    );
}