import * as service from "../util/service"
// import { message } from "antd";
// import { routerRedux } from "dva/router"
export default {

  namespace: 'global',

  state: {
    headConfig: "",
    pageList: [],
    hasMore: true,
    introduct: "",
    tags: [],
    isNav: false,
    aboutImg: [],
    detail: "",
    pageindex: 1,
  },
  reducers: {
    save_Config(state, { payload }) {
      let headConfig = state.headConfig
      if (payload) {
        headConfig = payload
      }
      return { ...state, headConfig }
    },
    save_List(state, { payload }) {
      const hasMore = payload.hasMore
      let list = state.pageList
      if (payload.list.length) {
        list = [...list, ...payload.list]
      }

      return { ...state, pageList: list, hasMore, pageindex: payload.pageindex }
    },
    save_Introduct(state, { payload }) {
      return { ...state, introduct: payload }
    },
    save_Tag(state, { payload }) {
      return { ...state, tags: payload }
    },
    change_Show(state, { payload }) {
      return { ...state, isNav: payload }
    },
    save_Img(state, { payload }) {
      return { ...state, aboutImg: payload }
    },
    save_Detail(state, { payload }) {
      payload.content = payload.content.replace(/↵/g, "");
      return { ...state, detail: payload }
    }
  },
  effects: {
    * getconfig(_, { call, put }) {
      const bing = yield call(service.request, ({ url: "bing" }))
      const { data } = yield call(service.request, ({ url: "config", data: { "status": 1 } }))
      if (data && data.isok) {
        yield put({
          type: "save_Config",
          payload: { ...data.data, homeurl: bing.data.data }
        })
      }
    },
    * getList({ payload }, { call, put }) {
      const { data } = yield call(service.request, ({ url: "content", data: { pageindex: payload, pageSize: 10, status: 1 } }))
      if (data) {
        yield put({
          type: "save_List",
          payload: { list: data.data, hasMore: data.isok, pageindex: payload }
        })
      }
    },
    * getIntroduct({ _ }, { call, put }) {
      const { data } = yield call(service.request, ({ url: "user" }))
      if (data && data.isok) {
        yield put({
          type: "save_Introduct",
          payload: data.data
        })
      }
    },
    * getTag({ _ }, { call, put }) {
      const { data } = yield call(service.request, ({ url: "tag" }))
      if (data && data.isok) {
        yield put({
          type: "save_Tag",
          payload: data.data
        })
      }
    },
    * updateView({ _ }, { call }) {
      const isView = window.localStorage.getItem("isView")
      if (!isView) {
        const { data } = yield call(service.request, ({ url: "updateView" }))
        if (data && data.isok) {
          window.localStorage.setItem("isView", "1")
        }
      }
    },
    * getPageImg({ _ }, { call, put }) {
      const { data } = yield call(service.request, ({ url: "findImg" }))
      if (data && data.isok) {
        yield put({
          type: "save_Img",
          payload: data.data
        })
      }
    },
    * getDetail({ payload }, { call, put }) {
      const { data } = yield call(service.request, ({ url: "detail", data: payload }))
      if (data && data.isok) {
        yield put({
          type: "save_Detail",
          payload: data.data
        })
      }
    }

  },
  subscriptions: {
    setup({ dispatch, history, query }) {
      return history.listen(async ({ pathname, search, query }) => {
      })
    },
  },
};
