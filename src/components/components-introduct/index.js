import styles from "./index.css"
import { Icon, Tag, Statistic } from "antd"
import { connect } from "dva"
import { Component } from "react"
import placeImg from '../../assets/pic.png'
class Introduct extends Component {
    componentDidMount() {
        this.getData()
    }
    getData = () => {

        const { dispatch, introduct, tags } = this.props
        if (!introduct) {
            dispatch({ type: "global/getIntroduct" })
        }
        if (!tags.length) {
            dispatch({ type: "global/getTag" })
        }
        dispatch({ type: "global/updateView" })
    }

    render() {
        const { introduct, tags } = this.props
        return (
            <div className={styles.main}>
                <div className={styles.mainItem}>
                    <img className={styles.mainImg} src={introduct.logo} alt="" onError={(e) => e.target.src = placeImg} />
                    <div className={styles.mainItemContent}>
                        <div className={styles.mainName}>{introduct.user}</div>
                        <div className={styles.mainDesc}>{introduct.description}</div>
                        <div className={styles.mainSame}><Icon type="mail" style={{ marginRight: ".1rem" }} />{introduct.email}</div>
                        <div className={styles.mainSame}><Icon type="environment" style={{ marginRight: ".1rem" }} />{introduct.city}</div>
                        <div className={styles.mainItemBottom}>
                            <a href="https://github.com/Kaaden" target={"_blank"}><Icon className={styles.iconItem} type="github" /></a>
                            <a href="https://weibo.com/2332838831/profile?topnav=1&wvr=6&is_all=1" target={"_blank"}><Icon className={styles.iconItem} type="weibo-circle" /></a>
                            <a href="http://kaaden.orrzt.com/admin#/" target={"_blank"}> <Icon className={styles.iconItem} type="codepen-circle" /></a>
                        </div>
                    </div>
                </div>
                <div className={styles.mainItem} style={{ padding: "0.1rem 0.2rem" }}>
                    <div className={styles.mainItemTile}><Icon type="tags" style={{ marginRight: ".1rem" }} />标签</div>
                    <div className={styles.mainItemtag}>
                        {tags.length > 0 && tags.map((item, index) => (
                            <Tag color="#108ee9" key={index}>{item.tag}</Tag>

                        ))}
                    </div>
                </div>

                <div className={styles.mainItem} style={{ padding: "0.1rem 0.2rem" }}>
                    <div className={styles.mainItemTile}><Icon type="fire" style={{ marginRight: ".1rem" }} />访问量</div>
                    <div className={styles.mainItemtag}><Statistic value={introduct.pageview} /></div>
                </div>
                {/* <div className="syno-user">
                    <div className="syno-tag">标签</div>

                </div>


                <div className="syno-user"  >
                    <div className="syno-tag">访问量</div>

                </div > */}




            </div >
        )
    }
}



function mapStateToProps(state) {
    const { introduct, tags } = state.global
    return { introduct, tags }
}
export default connect(mapStateToProps)(Introduct)