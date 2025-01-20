import {useTranslation} from "react-i18next";
import "./About.css"

const About = () => {
    const {t} = useTranslation();

    return (
        <div className="about-container">
            <div className="about-box">
                <div>
                    <h4>{t("about")}</h4>
                    <p>{t("about1")}</p>
                </div>
                <img
                    src="https://8a.pl/8academy/wp-content/uploads/2019/02/2-dostosujmy-tempo-do-osoby-wolniejszej.jpg"
                    alt="onas"/>
            </div>
            <div className="about-box">
                <img
                    src="https://bi.im-g.pl/im/e5/6b/1c/z29800165AMP,Widok-na-Mount-Everest-.jpg"
                    alt="onas"/>
                <div>
                    <h4>{t("mission")}</h4>
                    <p>{t("about2")}</p>
                </div>
            </div>
            <div className="about-box">
                <div>
                    <h4>{t("visit")}</h4>
                    <p>{t("about3")}</p>
                </div>
                <img
                    src="https://wszczytowejformie.pl/wp-content/uploads/2019/04/20190407_130151.jpg"
                    alt="onas"/>
            </div>
        </div>
    );
}

export default About;