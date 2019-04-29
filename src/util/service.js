import axios from "axios"
import qs from "qs"
const HOST = "http://kaaden.orrzt.com/api/"
// const HOST = "http://127.0.0.1:80/"
const addr = {
    bing: HOST + "getBing",
    config: HOST + "getConfig",
    content: HOST + "getContent",
    tag: HOST + "getTags",
    user: HOST + "getUser",
    detail: HOST + "getDetail",
    token: HOST + "getToken_access",
    gitUser: HOST + "getGitUser",
    getComment: HOST + "getComment",
    addComment: HOST + "addComment",
    addReplay: HOST + "addReplay",
    findComment: HOST + "findComment",
    changeDz: HOST + "changeDz",
    findDzCount: HOST + "findDzCount",
    updateView: HOST + "updateView",
    findImg: HOST + "findImg"
};
export const request = async ({ url, data }) => {
    let response = { isok: false, msg: "fail" }
    data = data ? qs.stringify(data) : ""
    try {
        response = await axios({
            method: "post",
            url: `${addr[url]}`,
            data
        })
        return response
    } catch (err) {
        return response
    }
}
