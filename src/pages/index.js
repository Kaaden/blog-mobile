import { connect } from "dva"
import { Component } from "react"
import styles from "./index.css"
import { Spin } from "antd"
import Home from "./home"
class Page extends Component {
    state = { loading: false }
    componentDidMount() {
        this.updatePage()
    }
    updatePage = () => {
        const that = this
        that.setState({ loading: true })
        setTimeout(() => {
            that.setState({ loading: false })
        }, 1000);
    }

    render() {
        const { loading } = this.state
        return (
            <div>
                {loading && <div className={styles.loadingBox}>
                    <Spin tip="Loading..." delay={600} />
                </div>}
                <Home />
            </div>
        )
    }
}

export default connect()(Page)
