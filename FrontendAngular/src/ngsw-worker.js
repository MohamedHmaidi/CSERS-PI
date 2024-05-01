self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.notification.title;
    const options = {
      body: data.notification.body,
      icon: '/assets/icon.png', 
      badge: '/assets/badge.png' 
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  