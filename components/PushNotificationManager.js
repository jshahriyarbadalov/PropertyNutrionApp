
import PushNotification from 'react-native-push-notification';

PushNotification.configure({

    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    senderID: "812281397429",

    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
});

export const getNotification = (name, text) => {

    PushNotification.localNotificationSchedule({
        title: name,
        message: text,
        date: new Date(Date.now() + 259200 * 1000) //259200
    });

    PushNotification.configure({
        onNotification: function (notification) {
            console.log('Notification is clicked')
        }
    })
};

