class _RokuWebCast {
  
  constructor(){
  	if (window.location.protocol != "http:")
  		throw("Only HTTP supported: https://github.com/aisayev/roku-web-cast#HTTPS");

    this.config = {
    	ipaddr: ((localStorage._RokuWebCastIP) ? localStorage._RokuWebCastIP : null),
    	check: true
    };

  }
  
  setDeviceIP(ipaddr = "") {
  		if (ipaddr.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)) {
			this.config.ipaddr = ipaddr;
			localStorage._RokuWebCastIP = ipaddr;
  		}
		else {
			this.onerror("Invalid IP Address");
		}
  }

  disableDeviceCheck() {
		this.config.check = false;
  }

  getDeviceIP() {
  		return this.config.ipaddr;
  }

  checkDevice(success, fail) {
  		if (this.config.check) {
  			var img = document.createElement('img');
  			
  			var timeout = setTimeout(fail, 5000);
  			
  			img.onload = function() {
  				clearTimeout(timeout);
  				success();
			}
  			
  			img.src="http://" + this.config.ipaddr + "/css/global.png";
  		}
  		else
  			success();
  }

  onerror(e) {
  		console.log('_RokuWebCast: ' + e);
  }


  cast(url, title = "") {
  		if (url == undefined || !url.match(/^https?:\/\//i))
  			this.onerror("Invalid URL");
  		else if (this.config.ipaddr == null)
  			this.onerror("Set IP Address first");
  		else {
  			var scope = this;
  			this.checkDevice(
  				function() {
  					
  					if (scope._iframe == undefined) {

  						scope._iframe = document.createElement("iframe");
  						scope._iframe.style.display = "none";
  						document.body.appendChild(scope._iframe);
  						scope._iframe.contentWindow.name = "_rokuWebCast";
  						scope._form = document.createElement("form");
  						scope._form.style.display = "none";
  						scope._form.target = scope._iframe.contentWindow.name;
  						scope._form.method = "POST";
  						document.body.appendChild(scope._form);  						

  					}
  					scope._form.action = "http://" + scope.config.ipaddr + ":8060/input/15985?t=v&u=" + encodeURIComponent(url) + "&videoName=" + encodeURIComponent(title);
  					scope._form.submit();  				
  				},
  				function () {
  					scope.onerror("Can't connect to device");
  				}
  			);
  		}	
  }

  stop() {

  		if (this.config.ipaddr == null || this._form == undefined)
  			this.onerror("Cast not started");
  		else {
  			this._form.action = "http://" + this.config.ipaddr + ":8060/input/15985?t=v&a=stop";
  			this._form.submit();  				
  		}  	
  }

  pause() {

  		if (this.config.ipaddr == null || this._form == undefined)
  			this.onerror("Cast not started");
  		else {
  			this._form.action = "http://" + this.config.ipaddr + ":8060/input/15985?t=v&a=pause";
  			this._form.submit();  				
  		}  	
  }

  resume() {

  		if (this.config.ipaddr == null || this._form == undefined)
  			this.onerror("Cast not started");
  		else {
  			this._form.action = "http://" + this.config.ipaddr + ":8060/input/15985?t=v&a=play";
  			this._form.submit();  				
  		}  	
  }


}
