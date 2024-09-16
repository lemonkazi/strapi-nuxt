import strapiService from '~/services/strapiService'

export default ({ $axios, $strapi }, inject) => {
  inject('strapiService', strapiService($axios, $strapi))
}
