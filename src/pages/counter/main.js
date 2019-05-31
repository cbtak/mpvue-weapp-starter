import Vue from 'vue'
import App from './index'
import { initPage } from '@/common/PageApp'

const app = new Vue(initPage(App, Vue))
app.$mount()
