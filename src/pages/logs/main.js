import Vue from 'vue'
import App from './index'
import { initPage } from '@/common/PageApp'

new Vue(initPage(App, Vue)).$mount()
