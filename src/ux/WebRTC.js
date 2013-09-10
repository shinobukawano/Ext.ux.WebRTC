/**
 * @class Ext.ux.WebRTC
 * @extends Ext.Component
 * Custom component which wrapped WebRTC APIs for Sencha Touch 2.
 *
 * ## Notes
 *
 * - This component works fine on Chrome for Android only.
 *
 * ## Example
 *
 *     var panel = Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype    : 'webrtc',
 *                 useEffect: true,
 *                 effectFn : 'monochrome'
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.ux.WebRTC', {
    extend: 'Ext.Component',
    xtype : 'webrtc',

    config: {
        /**
         * @cfg {Boolean} useVideo
         * @accessor
         */
        useVideo : true,

        /**
         * @cfg {Boolean} useAudio
         * @accessor
         */
        useAudio : false,

        /**
         * @cfg {Boolean} useEffect
         * @accessor
         */
        useEffect: false,

        /**
         * @cfg {String|Function} effectFn
         * @accessor
         */
        effectFn : '',

        /**
         * @cfg {Number} canvasFps
         * @accessor
         */
        canvasFps: 10,

        /**
         * @cfg {String} errorText
         * @accessor
         */
        errorText: "We're sorry, we cannot got your video camera."
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
            classList: [Ext.baseCSSPrefix + '-webrtc-img']
        },
        {
            tag      : 'canvas',
            reference: 'canvas',
            hidden   : true
        }
    ],

    /**
     */
    initialize: function() {
        var me = this;
        me.callParent();

        var successFn = Ext.bind(me.onGetUserMedia, me);
        var failureFn = Ext.bind(me.onFailureGetUserMedia, me);

        if (Ext.isEmpty(navigator.webkitGetUserMedia)) {
            failureFn();
            return;
        }

        navigator.webkitGetUserMedia({
            video: me.getUseVideo(),
            audio: me.getUseAudio()
        }, successFn, failureFn);
    },

    /**
     */
    updateUseEffect: function(useEffect) {
        var me = this;
        me.media.setVisible(!useEffect);
        me.img.setVisible(useEffect);
    },

    /**
     * @private
     * @param  {LocalMediaStream} stream
     */
    onGetUserMedia: function (stream) {
        var me = this,
            media = me.media.dom;

        media.src = URL.createObjectURL(stream);

        setTimeout(function() {
            media.play();
            if (me.getUseEffect()) {
                me.draw();
            }
        });
    },

    /**
     * @private
     * @param  {LocalMediaStream} stream
     */
    onFailureGetUserMedia: function (error) {
        var me = this,
            tpl = new Ext.Template('<div style="text-align:center;color:#e74c3c">{0}</div>'),
            html = tpl.apply([me.getErrorText()]);

        me.setHtml(html);

        me.media.setVisible(false);
        me.img.setVisible(false);
        me.setMargin('5%');
    },

    /**
     * @private
     */
    draw: function () {
        var me = this;
        me.ctx = me.canvas.dom.getContext('2d');

        var fps = 1000 / me.getCanvasFps();
        setInterval(function () {
            var fn = me.effectFnFactory(me.getEffectFn());
            me.streamToImage(fn);
        }, fps);
    },

    /**
     * @private
     * @param  {String|Function} effectFn
     * @return {Function}
     */
    effectFnFactory: function(effectFn) {
        if (!Ext.isString(effectFn)) {
            return effectFn;
        }

        var me = this;
        switch (effectFn) {
            case 'monochrome':
                return me.toMonochromeFn;
            default:
                return Ext.emptyFn;
        }
    },

    /**
     * @private
     * @param  {Function} effectFn
     */
    streamToImage: function (effectFn) {
        var me     = this,
            media  = me.media.dom,
            img    = me.img.dom,
            canvas = me.canvas.dom,
            ctx    = me.ctx,
            width  = media.width  || 380,
            height = media.height || 300;

        img.width = width;
        img.height = height;

        var canvasImage = ctx.drawImage(media, 0, 0, width, height);
        canvasImage = ctx.getImageData(0, 0, width, height);
        effectFn(canvasImage.data);
        ctx.putImageData(canvasImage, 0, 0);

        var dataURL = canvas.toDataURL("image/octet-stream");
        img.src = dataURL;
    },

    /**
     * @private
     * @param  {ImageData.data} pixel
     */
    toMonochromeFn: function (pixel) {
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            var gr = pixel[i] * 0.2 + pixel[i+1] * 0.2 + pixel[i+2] * 0.2;
            pixel[i  ] = gr;  //R
            pixel[i+1] = gr;  //G
            pixel[i+2] = gr;  //B
        }
    }

});
