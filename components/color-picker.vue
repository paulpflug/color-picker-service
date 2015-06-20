<template>
  <div tabindex="-1" v-on="click: focusEl" class="color-picker-container">

  </div>
  <button v-on="click: selectColor" class="btn btn-primary icon icon-paintcan">Color</button>
  <button v-on="click: unColor" class="btn">Uncolor</button>
</template>
<script lang="coffee">
ColorPicker = null
module.exports =
  data: ->
    color: null
    cancelEvent: null
    scp: null
  ready: ->
    @log "ready"
    ColorPicker ?= require "simple-color-picker"
    @scp = new ColorPicker el: document.querySelector "div.color-picker-service>div.color-picker-container"
    @scp.setColor(@color)
  attached: ->
    @log "attached"
    @scp?.setColor(@color)
  detached: ->
    @log "detached"
    @cancelEvent?.dispose()

  methods:
    selectColor: ->
      @color = @scp.getHexString()
      @log "#{@color} selected"
      @cb?(@color)
      @cb = null
      @detach()
    unColor: ->
      @log "uncoloring selected"
      @cb?(false)
      @cb = null
      @detach()
    detach: ->
      @log "detaching"
      @cb?(undefined)
      @cb = null
      try
        @$remove()
      catch
    focusEl: ->
      @$el.focus()
    getRandomColor: ->
      letters = '0123456789ABCDEF'.split('')
      color = '#'
      for i in [0..5]
        color += letters[Math.floor(Math.random() * 16)]
      return color
    getNewColor: ({x, y, color}, cb) ->
      @detach()
      @cb = cb
      if color?
        @color = color
      else
        @color = @getRandomColor()
      unless @$el?
        container = document.createElement("div")
        container.classList.add "color-picker-service"
        container.setAttribute "tabindex", "-1"
        container.addEventListener "blur", (e) =>
          @log "catched blur"
          if e.relatedTarget.parentNode != e.target
            @detach
        @$mount container
      @$el.setAttribute "style", "top:#{y}px;left:#{x}px;"
      @$appendTo document.body
      @cancelEvent = atom.commands.add "atom-workspace",
        "core:cancel", @detach
</script>
