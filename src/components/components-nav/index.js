import styles from "./index.css"
import { Component } from "react"
import classnames from "classnames"
import router from 'umi/router';
import { connect } from "dva"
import { Icon } from "antd"
let pathItem = "/"
class Navigtor extends Component {
    state = { list: ["HOME", "ABOUT"], isShow: false, path: "/" }
    componentDidMount() {
        let url = window.location.hash
        const routerPage = {
            "/": "HOME",
            "/about": "ABOUT",
            "/detail": "Detail"
        }
        try {
            url = url.split("#")
            pathItem = routerPage[url[1]]
            this.setState({ path: url[1] })
        } catch (err) {
            pathItem = "/"
        }
        window.addEventListener("scroll", this.onScroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll)
    }
    pathGo = (item) => {
        const List = {
            "HOME": "/",
            "ABOUT": "/about"
        }
        if (pathItem !== item) {
            pathItem = item
            router.push(List[item])
            document.documentElement.scrollTop = 0
        }
    }
    onScroll = (e) => {
        const body = document.documentElement;
        const scrollTop = body.scrollTop;
        this.changeData(scrollTop)
    }
    changeData = (scrollTop) => {
        const { dispatch } = this.props
        const headBg = document.getElementById("top-nav")
        const bgHeight = headBg ? headBg.clientHeight : 0;
        dispatch({ type: "global/change_Show", payload: scrollTop >= bgHeight ? true : false })
    }
    pathBack = () => {
        router.goBack()
    }
    render() {
        const { isNav } = this.props
        const { list, path } = this.state
        return (
            <div className={classnames([styles.main, { [styles.mainSel]: isNav }])}  >
                <div className={styles.nav}>
                    {path.includes("detail") && <Icon type="arrow-left" style={{ fontSize: ".3rem", cursor: "pointer" }} onClick={() => this.pathBack()} />}

                    <div style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
                        {list.map((item, index) => <div className={styles.navItem} key={index} onClick={() => this.pathGo(item)}>{item}</div>)}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { isNav } = state.global
    return { isNav }
}



export default connect(mapStateToProps)(Navigtor)