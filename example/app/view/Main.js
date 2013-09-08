Ext.define('Example.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Url',
        'Ext.ux.WebRTC'
    ],
    config: {
        layout: 'vbox',
        pack: 'center',
        items: [
            {
                xtype : 'titlebar',
                title : 'Web RTC Example',
                docked: 'top'
            },
            {
                xtype: 'webrtc'
            },
            {
                xtype: 'fieldset',
                title: 'Waiting for someone to join:',
                items: [
                    {
                        xtype: 'urlfield',
                        name: 'go'
                    }
                ]
            },
            {
                xtype : 'button',
                ui    : 'confirm',
                text  : 'Connect',
                margin: '0 10'
            }
        ],
        control: {
            'button': {
                'tap': 'onTapConnectButton'
            }
        }
    },

    onTapConnectButton: function () {
        var me = this,
            webrtc = me.down('webrtc'),
            src = me.down('urlfield').getValue();

        webrtc.setSrc(src);
        webrtc.connect();
    }

});
