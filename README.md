# roku-web-cast
Cast video from your website to Roku

## Quickstart

Just add roku-web-cast.min.js to your web page:
```html
<script type="text/javascript" src="roku-web-cast.min.js"></script>
```

Init main object and set IP address:
```javascript
const rokuWebCast = new _RokuWebCast();
rokuWebCast.setDeviceIP("192.168.1.100");
```

Use this object to cast videos:
```javascript
rokuWebCast.cast("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
  "Big Buck Bunny");
```

## Usage

```javascript
rokuWebCast.onerror = function(e){ console.log('Error: ' + e); };

rokuWebCast.setDeviceIP(address);  // set Roku IP address, saves it to localStorage

rokuWebCast.getDeviceIP();  // get current Roku IP or null

rokuWebCast.disableDeviceCheck();  // disable connection check before casting

rokuWebCast.checkDevice(function(){ console.log('Connected!') }, function (){ console.log('Failed!') });

rokuWebCast.cast(URL, [title]);

rokuWebCast.stop();

rokuWebCast.pause();

rokuWebCast.resume();
```

## HTTPS
You can't start casting from your page that use HTTPS.
To implement Roku cast you should place cast page to some HTTP resource and
call it from your cast button with 
`window.open("http://.../roku-web-cast.html?params=...");`
or use form submition with `action="http://.../roku-web-cast.html"` 
and `target="rokuWebCastWindow"` for example.




