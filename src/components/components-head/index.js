import styles from "./index.css"
import { Icon, BackTop } from "antd"
import { connect } from "dva"
import { Component } from "react"
class Head extends Component {
    componentDidMount() {
        const { headConfig, dispatch } = this.props
        if (!headConfig) {
            dispatch({ type: "global/getconfig" })
        }
    }
    onPage = () => {
        document.documentElement.scrollTop = document.getElementById("top-nav").clientHeight - 100;
    }
    render() {
        const { headConfig } = this.props
        let desc = ""
        let title = "KAADEN"
        let bg = "http://kaaden.orrzt.com/uploads/8c23f4a2b2baf68c6c6c020542696629.jpg"
        const url = window.location.hash
        if (url === "#/") {
            bg = headConfig.homeurl
            title = headConfig.hometitle
            desc = headConfig.homelevel
        } else if (url === "#/about") {
            bg = headConfig.aboutImg
            title = headConfig.aboutitle
            desc = headConfig.aboutlevel
        }
        return (
            <div id="top-nav" className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
                <div className={styles.mainTitle}>
                    <div>{title}</div>
                    <div>{desc}</div>

                </div>
                <Icon type="down" className={styles.mainIcon} onClick={this.onPage} />
                <div>
                    <BackTop />
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    const { headConfig } = state.global
    return { headConfig }
}
export default connect(mapStateToProps)(Head)