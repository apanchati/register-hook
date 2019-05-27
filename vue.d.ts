import Vue from 'vue'
import DataService from '@Services/DataService'
import ApplicationDictionaryService from '@Services/ApplicationDictionaryService'
import ProfileService from '@Services/ProfileService'
import LogManager from '@Utilities/LogManager'
import TranslationManager from '@Common/TranslationManager'
import ThemeManager from '@Utilities/ThemeManager'
import UserSessionManager from '@Common/UserSessionManager'
import CacheService from '@Services/CacheService'

declare module 'vue/types/vue' {
  interface Vue {
    $cisLog: LogManager,
    $cisDataService: DataService,
    $cisAppDictService: ApplicationDictionaryService,
    $cisProfileService: ProfileService,
    $cisTranslationManager: TranslationManager,
    $cisThemeManager: ThemeManager,
    $cisUserSessionManager: UserSessionManager,
    $cisCacheService: CacheService
  }
}
