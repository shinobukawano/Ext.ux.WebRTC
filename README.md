# Ext.ux.WebRTC

Custom component which wrapped WebRTC APIs for Sencha Touch 2.

[![1](Logo-webrtc.png)](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/Logo-webrtc.png)

## Demo

- [Ext.ux.WebRTC Example](http://kawanoshinobu.com/apps/webrtc)

## Getting Started

### Usage

Simply, if you want to output camera stream to the web page,

    {
        xtype: 'webrtc'
    }

that's all. You open the page, then it shows the message to permit to use the device camera, please go ahead.

<img src="https://raw.github.com/kawanoshinobu/Ext.ux.WebRTC/master/image1.png" width="30%"/>

If it got the stream, display it to the web page.

<img src="https://raw.github.com/kawanoshinobu/Ext.ux.WebRTC/master/image2.png" width="30%"/>

If it cannot got it, shows error message.

<img src="https://raw.github.com/kawanoshinobu/Ext.ux.WebRTC/master/image3.png" width="30%"/>

if you want to effect stream,

    {
        xtype    : 'webrtc',
        useEffect: true,
        effectFn : 'monochrome'
    }

`useEffect` option changes the way of display, stream will be outputted by canvas (Normally, it use with video tag). `effectFn` option define function object or effect name which offered by component. If you define `monochrome`, it outputs the stream with monochrome effect.

<img src="https://raw.github.com/kawanoshinobu/Ext.ux.WebRTC/master/image4.png" width="30%"/>

### Initialization

Place the 'ux' folder somewhere within your application, then add the following to your app (at the top of 'app.js' is a good place):

    Ext.Loader.setPath({
        'Ext': 'touch/src',
        'MyApp': 'app',
        'Ext.ux': 'ux'
    });

Adjust './ux' to wherever you actually placed the 'ux' folder.

Then in whatever component you wish to use the view, add:

    requires = [
        'Ext.ux.WebRTC',
    ]

Before build with Sencha Cmd, you must define "${add.dir}/ux" to sencha.cfg:

    app.classpath=${app.dir}/app.js,${app.dir}/ux,${app.dir}/app

### Example

Execute the following command in the sources root directory

    sencha ant -f project.xml initialize

Then to place example directory to server's application directory.

## Note

This component works fine on Chrome for Android only.


## Version

0.0.1

## license

Copyright (c) 2013 KAWANO Shinobu. This software is licensed under the MIT License.

