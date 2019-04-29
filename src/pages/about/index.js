import { connect } from "dva"
import { Component } from "react"
import { Head, Navigator, Introduct, Footer } from "../../components"
import styles from "./index.css"
import { Skeleton } from "antd"
import LazyLoad from 'react-lazyload';
import placeImg from "../../assets/pic.png"
class Index extends Component {
    state = { loading: false }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        const { dispatch, introduct, aboutImg } = this.props
        this.setState({ loading: true })
        if (!introduct) {
            await dispatch({ type: "global/getIntroduct" })
        }
        if (!aboutImg.length) {
            await dispatch({ type: "global/getPageImg" })
        }
        this.setState({ loading: false })
    }
    render() {
        const { introduct, aboutImg } = this.props
        const { loading } = this.state
        return (
            <div className="container">
                <Navigator />
                <Head />
                <div className="container-main">
                    <Skeleton active loading={loading}>
                        <div className={styles.containleft}>
                            <div className={styles.desc}>{introduct.description}</div>
                            <div className={styles.content}>{introduct.content}</div>
                            <div className={styles.desc}>{introduct.dec}</div>
                            <div className={styles.wrap}>
                                {aboutImg.length > 0 && aboutImg.map((item, index) => (
                                    <LazyLoad key={index} height={200} offset={100}>
                                        <div className={styles.wrapItem} >
                                            <img className={styles.wrapItemImg} src={item.img} alt="" onError={(e) => e.target.src = placeImg} />
                                        </div>
                                    </LazyLoad>

                                ))}
                            </div>
                        </div>
                    </Skeleton>
                    <Introduct />
                </div>
                <Footer />
            </div >
        )
    }
}


function mapStateToProps(state) {
    const { introduct, aboutImg } = state.global
    return { introduct, aboutImg }
}

export default connect(mapStateToProps)(Index)
