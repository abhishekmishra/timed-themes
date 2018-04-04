# timed-themes

This extension switches between two themes (one dark and another light), at one or more times during the day.

## Features

* Set a dark theme and a light theme.
* Set the time ranges when the themes are active

## Requirements

None

## Extension Settings

This extension contributes the following settings:

* `timed-themes.enabled`: enable/disable this extension
* `timed-themes.light`: set your light theme
* `timed-themes.dark`: set your dark theme
* `timed-themes.times`: set the times for your light and dark themes. For example the following:
```
{
    "dark": [ [800, 1800 ] ],
    "light": [ [ 0, 800 ], [ 1800, 2359 ] ]
}
```

## Known Issues



## Release Notes

### 0.2.0

Initial release