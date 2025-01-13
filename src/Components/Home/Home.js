import {useTranslation} from "react-i18next";
import "./Home.css";
import image from "../../Content/Projekt bez nazwy.png"

const Home = () => {
    const {t} = useTranslation();
    return (
        <div className="home-container">
            <div className="home-head">
                <div className="home-title">
                    {t("homeTitle").toUpperCase()}
                </div>
                <div className="home-summit-show">
                    <div>
                        <img src="https://skimagazyn.pl/wp-content/uploads/2019/02/DSC08287-1050x700.jpg" alt=""/>
                        <img src="https://atrakcje.info.pl/web/files/travel/40e3f766a6ba99f0353a9d26f33a74b3giewont.jpg" alt=""/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Szczyt_Babiej_G%C3%B3ry.jpg" alt=""/>
                        <img src="https://slowroad.pl/wp-content/uploads/sites/23/2023/09/G238779.jpg" alt=""/>
                        <img src="https://majatravels.com/wp-content/uploads/2016/08/bieszczady-national-park20.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="https://skimagazyn.pl/wp-content/uploads/2019/02/DSC08287-1050x700.jpg" alt=""/>
                        <img src="https://atrakcje.info.pl/web/files/travel/40e3f766a6ba99f0353a9d26f33a74b3giewont.jpg" alt=""/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Szczyt_Babiej_G%C3%B3ry.jpg" alt=""/>
                        <img src="https://slowroad.pl/wp-content/uploads/sites/23/2023/09/G238779.jpg" alt=""/>
                        <img src="https://majatravels.com/wp-content/uploads/2016/08/bieszczady-national-park20.jpg" alt=""/>
                    </div>
                </div>
            </div>
            <div className="home-description">
                {t("homeDesc")}
            </div>
            <div className="home-site-options">
                <div className="options-images">
                    <img src={image}/>
                </div>
                <div className="options-desc">
                    <div className="desc-head">
                        {t("optionDesc")}
                    </div>
                    <ul>
                        <li>{t("browsePeaks")}</li>
                        <li>{t("addComments")}</li>
                        <li>{t("addToList")}</li>
                        <li>{t("viewYourList")}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;