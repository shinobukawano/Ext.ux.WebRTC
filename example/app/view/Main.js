Ext.define('Example.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.ux.WebRTC'
    ],
    config: {
        tabBarPosition: 'bottom',

        items         : [
            {
                title     : 'video',
                iconCls   : 'video',

                scrollable: 'vertical',

                items     : [
                    {
                        docked: 'top',
                        xtype : 'titlebar',
                        title : 'WebRTC DEMO'
                    },

                    /** Video stream **/
                    {
                        xtype: 'webrtc'
                    },

                    /** Use Canvas with monochrome effect **/
                    // {
                    //     xtype    : 'webrtc',
                    //     useEffect: true,
                    //     effectFn : 'monochrome'
                    // },

                    {
                        xtype  : 'button',
                        text   : 'End',
                        ui     : 'decline',
                        margin : '5% 10%',
                        width  : '80%',
                        iconCls: 'video'
                    }
                ]
            }
        ]
    }

});
