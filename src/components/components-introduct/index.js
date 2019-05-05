import styles from "./index.css"
import { Icon, Tag, Statistic, Avatar, Card } from "antd"
import { connect } from "dva"
import { Component } from "react"
import placeImg from '../../assets/pic.png'
const { Meta } = Card;
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
        const Desc = (
            <div>
                <div className={styles.mainDesc}>{introduct.description}</div>
                <div className={styles.mainSame}><Icon type="mail" style={{ marginRight: ".5rem" }} />{introduct.email}</div>
                <div className={styles.mainSame}><Icon type="environment" style={{ marginRight: ".5rem" }} />{introduct.city}</div>
            </div>
        )
        return (
            <div className={styles.main}>
                <Card
                    style={{ width: "100%" }}
                    actions={[
                        <a href="https://github.com/Kaaden" target={"_blank"}><Icon type="github" style={{ fontSize: "1rem" }} /></a>,
                        <a href="https://weibo.com/2332838831/profile?topnav=1&wvr=6&is_all=1" target={"_blank"}><Icon type="weibo-circle" style={{ fontSize: "1rem" }} /></a>,
                        <a href="http://kaaden.orrzt.com/admin#/" target={"_blank"}> <Icon type="codepen-circle" style={{ fontSize: "1rem" }} /></a>]}
                >
                    <Meta
                        avatar={<Avatar src={introduct.logo} />}
                        title={introduct.user}
                        description={Desc}
                    />
                </Card>

                <div className={styles.mainItem} >
                    <div className={styles.mainItemTile}><Icon type="tags" style={{ marginRight: ".1rem" }} />标签</div>
                    <div className={styles.mainItemtag}>
                        {tags.length > 0 && tags.map((item, index) => (
                            <Tag color="#108ee9" key={index}>{item.tag}</Tag>

                        ))}
                    </div>
                </div>

                <div className={styles.mainItem} >
                    <div className={styles.mainItemTile}><Icon type="fire" style={{ marginRight: ".1rem" }} />访问量</div>
                    <div className={styles.mainItemtag}><Statistic value={introduct.pageview} /></div>
                </div>



            </div >
        )
    }
}



function mapStateToProps(state) {
    const { introduct, tags } = state.global
    return { introduct, tags }
}
export default connect(mapStateToProps)(Introduct)