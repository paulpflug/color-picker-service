reloader = null
load = null
log = null
logger = null
compile = null
comps = null

pkgName = "color-picker-service"

module.exports = new class ColorPickerService
  config:
    debug:
      type: "integer"
      default: 0
      minimum: 0
  vueColorPicker: null
  loadColorPicker: =>
    load ?= require "atom-vue-component-loader"
    comps = load "color-picker":null,
      cwd: "#{atom.packages.resolvePackagePath(pkgName)}/components_compiled/"
      reload: atom.inDevMode()
      debug: atom.inDevMode()
    @vueColorPicker = comps["color-picker"]
    comps["color-picker"].log = logger("color-picker")
  activate: ->
    setTimeout (->
      reloaderSettings = pkg:pkgName,folders:["lib","styles","components"]
      try
        reloader ?= require("atom-package-reloader")(reloaderSettings)
      ),500
    unless log?
      logger = require("atom-simple-logger")(pkg:pkgName)
      log = logger("main")
      log "activating"
    if atom.inDevMode()
      log "compiling components"
      try
        compile ?= require("atom-vue-component-compiler")(packageName: pkgName)
      if compile?
        compile ["color-picker"]
    @colorPickerService = (options,cb) =>
      @loadColorPicker() unless @vueColorPicker
      @vueColorPicker.getNewColor(options,cb)
  colorPickerService: null

  provideColorPicker: =>
    return @colorPickerService

  deactivate: ->
    log "deactivating"
    @colorPickerService = null
    comps?["color-picker"]?.$destroy true
    comps = null
    reloader?.dispose()
    reloader = null
    load = null
    log = null
    compile = null
