# color-picker-service

provides a color picker as a service for other packages.

![color-picker-service](https://cloud.githubusercontent.com/assets/1881921/8267498/a91276a2-1764-11e5-9c7e-07e237f83306.png)

uses the [simple-color-picker](https://github.com/superguigui/simple-color-picker)

## Usage

package.json
```json
{
  "otherStuff": "otherData",
  "consumedServices": {
    "color-picker": {
      "versions": {
        "^0.0.1": "consumeColorPicker"
      }
    }
  }
}
```

your package:
```coffee
  #in main module
  consumeColorPicker: (colorPicker) =>
    @colorPicker = colorPicker

    #where you want to use it
    @colorPicker {x:x,y:y, color: oldColor}, (newColor) ->
      #do something with new color
      #newColor will be undefined on cancel and false on "uncolor"
      unless newColor? # not canceled
        if newColor
          #has a color
        else
          #uncolor was selected
```
