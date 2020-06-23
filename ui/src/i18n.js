import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from '@/locales/date-time-formats'

Vue.use(VueI18n)

var loadLocaleMessages = function () {

	const locales = require.context('@/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
	console.log(locales)
	const messages = {}
	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i)
		if (matched && matched.length > 1) {
			const locale = matched[1]
			messages[locale] = locales(key)
		}
	})
	return messages
}

export default new VueI18n({
	locale: process.env.VUE_APP_I18N_LOCALE || 'fr',
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
	messages: loadLocaleMessages(),
	dateTimeFormats
})


// // i18n-setup.js
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import axios from 'axios'

// Vue.use(VueI18n)

// export const i18n = new VueI18n({
//   locale: 'en',
//   fallbackLocale: 'en'
// })

// const loadedLanguages = []

// function setI18nLanguage (lang) {
//   i18n.locale = lang
//   axios.defaults.headers.common['Accept-Language'] = lang
//   document.querySelector('html').setAttribute('lang', lang)
//   return lang
// }

// export function loadLanguageAsync (lang) {
//   if (loadedLanguages.includes(lang)) {
//     if (i18n.locale !== lang) setI18nLanguage(lang)
//     return Promise.resolve()
//   }
//   return axios.get(`/api/lang/${lang}`).then(response => {
//     let msgs = response.data
//     loadedLanguages.push(lang)
//     i18n.setLocaleMessage(lang, msgs.default)
//     setI18nLanguage(lang)
//   })
// }

// // router.js
// router.beforeEach((to, from, next) => {
//   const lang = to.params.lang
//   loadLanguageAsync(lang).then(() => next())
// })