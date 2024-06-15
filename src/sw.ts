import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})


self.addEventListener('fetch', function(event) {

});

const reactions = [
    {
        "id": ":strawberry:",
        "emoji": "🍓"
    },
    {
        "id": ":thumbs-up:",
        "emoji": "👍"
    },
    {
        "id": ":red-heart:",
        "emoji": "❤️"
    },
    {
        "id": ":fire:",
        "emoji": "🔥"
    },
    {
        "id": ":heart-on-fire:",
        "emoji": "❤️‍🔥"
    },
    {
        "id": ":clown-face:",
        "emoji": "🤡"
    },
    {
        "id": ":pile-of-poo:",
        "emoji": "💩"
    },
    {
        "id": ":middle-finger:",
        "emoji": "🖕"
    }
]

self.addEventListener('push', function(e) {
    const data = e.data?.json();
	console.log(data)

	let options = {};
	let title = "";
	let iconAvatar = "/icon-512x512.png";


	if (data.type == "check") {
		
		
		return;
	}

	if (data.type == "comment") {

		console.log(data)
		// if (notificationData.profile.avatar[0]) {

		// 	iconAvatar = notificationData.profile.avatar[0].picture;


		// 	console.log(notificationData.profile.avatar[0].picture)

		// }


		title = "New comment";

		options = {
			body: data.payload.text,
			icon: iconAvatar,
			badge: '/icon-transparent-512x512.png',
			data: {
				url: `/p/${data.payload.post_id}?comment_id=${data.payload.comment_id}`,
			},

			actions: [
				{
					action: 'mark-as-read-action',
					title: 'Mark as read',
					icon: '',
				},
			]
		}
	} else if (data.type == "friendship") {

		if (data.payload.type == "request") {
			title = "New friend request 👥";

			options = {
				icon: iconAvatar,
				badge: '/icon-transparent-512x512.png',
				data: {
					url: `/friends/requests`,
				},
			}
		} else {
			title = "Friend request accepted ✅";

			options = {
				icon: iconAvatar,
				badge: '/icon-transparent-512x512.png',
				data: {
					url: `/friends/requests`,
				},
			}
		}

	} else if (data.type == "reaction") {

		if (data.payload.type == "post") {
			title = `${reactions.find(r => r.id == data.payload.reaction_id)?.emoji} to your post`;
	
			options = {
				icon: iconAvatar,
				silent: true,
				badge: '/icon-transparent-512x512.png',
				data: {
					url: `/p/${data.payload.post_id}`,
				},
			}
		} else if (data.payload.type == "comment") {
			title = `${reactions.find(r => r.id == data.payload.reaction_id)?.emoji} to your comment`;
	
			options = {
				icon: iconAvatar,
				silent: true,
				badge: '/icon-transparent-512x512.png',
				data: {
					url: `/p/${data.payload.post_id}?comment_id=${data.payload.comment_id}`,
				},
			}
		}
	} else if (data.type == "repost") {
		title = `Your post was re-posted`;

		options = {
			icon: iconAvatar,
			badge: '/icon-transparent-512x512.png',
			data: {
				url: `/p/${data.payload.post_id}`,
			},
		}
	} else if (data.type == "message") {
		title = data.payload.profile.name != "" ? data.payload.profile.name : data.payload.profile.username;

		options = {
			body: data.payload.text,
			icon: data.payload.profile.avatar[0] ? `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${data.payload.profile.avatar[0].id}.webp` : iconAvatar,
			badge: '/icon-transparent-512x512.png',
			data: {
				url: `/messenger/${data.payload.profile.username}`,
			},
			actions: [
				{
					action: 'mark-as-read-action',
					title: 'Mark as read',
					icon: '',
				},
			]
		}
	}

	e.waitUntil(
		self.registration.showNotification(title, options)

	)
})

self.addEventListener('notificationclick', function(event) {// close the notification

	event.notification.close();// see if the current is open and if it is focus it
	// otherwise open new tab
	event.waitUntil(
		self.clients.matchAll().then(function(clientList) {
		
			// if (clientList.length > 0) {
			// 	return clientList[0].focus();
			// }
			
			return self.clients.openWindow(event.notification.data.url);
		})
	);
});