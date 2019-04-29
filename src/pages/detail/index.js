import { connect } from "dva"
import { Component } from "react"
import styles from "./index.css"
import { Navigator } from "../../components"
import { Skeleton, BackTop, Spin, Avatar, Icon } from "antd"
class Index extends Component {
  state = { id: "", loading: false }
  componentDidMount() {
    const { history } = this.props
    const { id } = history.location.query
    if (id) {
      this.getData(id)
    }
  }
  getData = async (id) => {
    this.setState({ loading: true })
    const { dispatch, introduct } = this.props
    await dispatch({ type: "global/getDetail", payload: { id } })
    if (!introduct) {
      await dispatch({ type: "global/getIntroduct" })
    }
    this.setState({ id, loading: false })
  }

  render() {
    const { loading } = this.state
    const { detail, introduct } = this.props
    return (
      <div className="container">
        <Spin spinning={loading}>

          <Navigator />
          <TitleComponents detail={detail} />
          <Skeleton active loading={loading}>
         
            <div dangerouslySetInnerHTML={{ __html: detail.content }} className={styles.mainHtml}></div>
          </Skeleton>
          <AboutComponents logo={introduct.logo} name={introduct.user} />
        </Spin>
      </div>
    )
  }
}


const TitleComponents = ({ detail }) => (
  <div id="top-nav" className={styles.main} style={{ backgroundImage: `url(${detail.img})` }}>
    <div className={styles.mask}></div>
    <div className={styles.mainContent}>
      <div className={styles.mainTop}>
        <h1 className={styles.mainTitle}>{detail.title}</h1>
        {detail.authors && <span className={styles.mainAuth}>- - by {detail.authors}</span>}
      </div>
      <div className={styles.mainCategory}>{detail.category}</div>
      <div className={styles.mainTime}>{detail.time}</div>
    </div>
    <div>
      <BackTop />
    </div>
  </div>
)

const AboutComponents = ({ logo, name }) => (
  <div className={styles.about}>
    <div className={styles.aboutImg}>
      <Avatar size={64} icon="user" src={logo} className={styles.aboutUser} />
    </div>
    <div className={styles.aboutInfo}>
      <div className={styles.aboutInfoTop}>
        <p className={styles.aboutName}>{name}</p>
        <p>The Front-end development</p>
      </div>
      <div className={styles.aboutInfoBottom}>
        <a href="http://kaaden.orrzt.com" className={styles.aboutHref}>http://kaaden.orrzt.com</a>
        <div>
          <a href="https://github.com/Kaaden" target={"_blank"}><Icon className={styles.iconItem} type="github" /></a>
          <a href="https://weibo.com/2332838831/profile?topnav=1&wvr=6&is_all=1" target={"_blank"}><Icon className={styles.iconItem} type="weibo-circle" /></a>
          <a href="http://kaaden.orrzt.com/admin#/" target={"_blank"}> <Icon className={styles.iconItem} type="codepen-circle" /></a>
        </div>
      </div>
    </div>
  </div>
)


function mapStateToProps(state) {
  const { detail, introduct } = state.global
  return { detail, introduct }
}

export default connect(mapStateToProps)(Index)
