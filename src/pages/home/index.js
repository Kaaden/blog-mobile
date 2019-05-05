import { connect } from "dva"
import { Component } from "react"
import { Head, Navigator,List, Footer } from "../../components"
class Index extends Component {
  render() {
    return (
      <div className="container">

        <Navigator />
        <Head />
        <div className="container-main">
          <List />
        </div>
        <Footer />
      </div>
    )
  }
}



export default connect()(Index)
