/**
 * @class Ext.ux.WebRTC
 * @extends Ext.Component
 */
Ext.define('Ext.ux.WebRTC', {
    extend: 'Ext.Component',
    xtype : 'webrtc',

    config: {
        useVideo : true,
        useAudio : true,
        useEffect: true,
        effectFn : Ext.emptyFn
    },

    template: [
        {
            tag      : 'video',
            reference: 'media',
            classList: [Ext.baseCSSPrefix + 'media'],
            style    : 'width:100%;height:100%'
        },
        {
            tag      : 'img',
            reference: 'img',
            classList: [Ext.baseCSSPrefix + 'img'],
            style    : 'width:100%;height:100%'
        },
        {
            tag      : 'canvas',
            reference: 'canvas',
            hidden   : true
        }
    ],

    initialize: function() {
        var me = this;
        me.callParent();
        me.successFn = Ext.bind(me.onGetUserMedia, me);
        me.failureFn = Ext.bind(me.onFailureGetUserMedia, me);

        var useEffect = me.getUseEffect();
        me.media.setVisible(!useEffect);
        me.img.setVisible(useEffect);

        navigator.webkitGetUserMedia({
            video: me.getUseVideo(),
            audio: me.getUseAudio()
        }, me.successFn, me.failureFn);
    },

    onGetUserMedia: function (stream) {
        var me = this,
            media = me.media.dom;

        media.src = URL.createObjectURL(stream);
        media.play();

        if (me.getUseEffect()) {
            me.draw();
        }
    },

    onFailureGetUserMedia: function (error) {
        alert('error');
    },

    draw: function () {
        var me = this;
        me.ctx = me.canvas.dom.getContext('2d');

        setInterval(function () {
            me.streamToImage(me.getEffectFn());
        }, 200);
    },

    streamToImage: function (effectFn) {
        var me = this,
            media  = me.media.dom,
            img    = me.img.dom,
            canvas = me.canvas.dom,
            ctx    = me.ctx,
            width  = me.getWidth() || 400,
            height = me.getHeight() || 500;

        var canvasImage = ctx.drawImage(media, 0, 0, width, height);
        canvasImage = ctx.getImageData(0, 0, width, height);
        effectFn(canvasImage.data);
        // me.sampleEffectFn(canvasImage.data);
        ctx.putImageData(canvasImage, 0, 0);

        var dataURL = canvas.toDataURL("image/octet-stream");
        img.src = dataURL;
    },

    sampleEffectFn: function (pixel) {
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            var gr = pixel[i] * 0.2 + pixel[i+1] * 0.2 + pixel[i+2] * 0.2;
            pixel[i  ] = gr; //R
            pixel[i+1] = gr; //G
            pixel[i+2] = gr; //B
        }
    }

});
