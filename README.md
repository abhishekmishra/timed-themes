# timed-themes

This extension switches between two themes (one dark and another light), at one or more times during the day.

## Features

* Set a dark theme and a light theme.
* Set the time ranges when the themes are active

## Note: If upgrading from v0.2.0
The default time range settings have been fixed. (The names did not match the time ranges earlier, now they do). To apply the same fixes, copy the time range settings from the settings below.

## Requirements

None

## Extension Settings

This extension contributes the following settings:

* `timed-themes.enabled`: enable/disable this extension
* `timed-themes.light`: set your light theme
* `timed-themes.dark`: set your dark theme
* `timed-themes.times`: set the times for your light and dark themes (this has to be in the settings editor). For example the following is the default - light theme from 8am to 6pm, and dark for the rest of the time. Adjust according to your schedule.:
```
{
    "light": [ [800, 1800 ] ],
    "dark": [ [ 0, 800 ], [ 1800, 2359 ] ]
}
```

## Known Issues



## Release Notes

### 0.3.0
* Fixed default times for dark and light themes (swapped).
* Fixed info message to show current theme.
* Changed display name for the extension.
* Upgraded packages.

### 0.2.0

Initial release