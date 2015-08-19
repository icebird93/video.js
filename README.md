# hola video.js - Enhanced HTML5 Video Player
hola video.js is a web video player based on the popular video.js open source project world. It supports HTML5 and Flash video. It supports video playback on desktops and mobile devices. hola video.js integrates advanced features from [holacdn.com](http://www.holacdn.com)


## Features

- Commercial grade video player
- Integrated hola analytics module
- Integrated bandwidth saver module
- All the features of the original video.js
  - Custom branding (no watermark)
  - HLS/HDS streaming
  - HTML/CSS skin system 
  - Plugin support
  - Multi platform (desktop and mobile devices)
  - Player API

## Quick start

To start using hola video.js, follow these steps:

1. Add these includes to your document's `<head>`:

  ```html
  <link href="http://vjs.zencdn.net/4.12/video-js.css" rel="stylesheet">
  <script src="http://vjs.zencdn.net/4.12/video.js"></script>
  ```

2. Add a `data-setup` attribute containing any hola video.js options to a `<video >` tag on your page. These options can include any hola video.js option plus potential plugin options, just make sure they're valid JSON!

  ```html
  <video id="really-cool-video" class="hola-video-js vjs-default-skin" controls
   preload="auto" width="640" height="264" poster="really-cool-video-poster.jpg"
   data-setup='{}'>
    <source src="really-cool-video.mp4" type='video/mp4'>
    <source src="really-cool-video.webm" type='video/webm'>
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading
       to a web browser that supports HTML5 video
    </p>
  </video>
  ```

3. Done!

If you're ready to dive in, the documentation is the first place to go for more information.

## Integrated video analytics

hola video.js comes integrated with the free hola video analytics module. To open your free account and have access to the analytics dashboard, check out holacdn. 
Hola analytics module provides the following information using the free dashboard:
- Start buffering times
- Total views
- Total minutes viewed
- Seek events
- Bandwidth saved using Bandwidth Saver
- And more..

The use of this feature requires a free hola account. To learn more about the hola analytics dashboard and to create your free account, visit [www.holacdn.com](www.holacdn.com). 


## Integrated bandwidth saver for progressive http

hola video.js comes integrated with the free hola bandwidth saver module. The bandwidth saver module uses progressive download methods to reduce buffer overhead while keeping the video loading time to a minimum and the player responsive.
Bandwidth saver works with MP4/FLV streams. 

## License

hola video.js is licensed under the Apache License, Version 2.0. [View the license file](LICENSE)

Copyright 2015 Hola Networks ltd
