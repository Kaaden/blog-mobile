import { connect } from "dva"
import { Component } from "react"
import styles from "./index.css"
import { Tag, Divider, Skeleton, Spin, Icon } from "antd"
import LazyLoad from 'react-lazyload';
import placeImg from '../../assets/pic.png'
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import router from 'umi/router';
let fetch = false
class List extends Component {
    state = { loading: false, skele: false, pageindex: 1 }
    async componentDidMount() {
        window.addEventListener("scroll", this.onScroll)
        if (!this.props.pageList.length) {
            this.setState({ skele: true })
            await this.getData(1)
            this.setState({ skele: false })
        }
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll)
    }
    getData = async (pageindex) => {
        const { dispatch, hasMore } = this.props
        if (!hasMore || fetch) {
            return
        }
        fetch = true
        this.setState({ loading: true })
        await dispatch({ type: "global/getList", payload: pageindex })
        this.setState({ loading: false })
        fetch = false
    }

    onScroll = (e) => {
        const body = document.documentElement;
        const scrollTop = body.scrollTop;
        const scrollBottom = body.scrollHeight - body.clientHeight;
        if (scrollTop >= scrollBottom) {
            let { pageindex } = this.props
            this.getData(pageindex + 1)
        }
    }
    goDetail = (id) => {
        router.push(`/detail?id=${id}`)
    }
    render() {
        const { skele, loading } = this.state
        const { pageList } = this.props
        return (
            <div id="page-list" className={styles.main}>
                <div>

                    <Skeleton active loading={skele}>
                        {pageList.length > 0 && pageList.map((item, index) => (
                            <div className={styles.mainItem} key={index} onClick={() => this.goDetail(item.id)}>
                                <div className={styles.mainItemContent}>
                                    <Ellipsis length={25} className={styles.mainItemTitle}>{item.title}</Ellipsis>
                                    <Ellipsis length={100} className={styles.mainItemTxt}>{item.description}</Ellipsis>
                                    <div className={styles.mainItemOrther}>
                                        <Tag color="#108ee9">{item.category}</Tag>
                                        <Divider type="vertical" />
                                        <span>{item.authors}</span>
                                        <Divider type="vertical" />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                                <LazyLoad height={200} offset={100}>
                                    <img src={item.img} alt="" className={styles.mainItemImg} onError={(e) => e.target.src = placeImg} />
                                </LazyLoad>
                            </div>
                        ))}
                    </Skeleton>
                </div>
                <div className="spin-loading">
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} />} spinning={loading} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pageList, hasMore, pageindex } = state.global
    return { pageList, hasMore, pageindex }
}

export default connect(mapStateToProps)(List)
