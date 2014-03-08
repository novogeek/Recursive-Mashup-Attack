/*
* SafeWidget.js: A framework for ensuring privilege separation and secure interactions in web mashups.
* Author: Krishna Chaitanya Telikicherla (@novogeek)
* Date: 22-01-2014
*/

(function(){
    var sw=function(selector){
        return new safeWidget(selector);
    }
 
    var safeWidget=function(selector){
		this.selector = selector? top.document.querySelectorAll(selector)[0] : '',
        this.version = '0.1.0';
		return this;
    };    
 
	//Extend the safeMash function object using prototype.
    safeWidget.prototype={	
        init:function(){
			console.log('init this:', this);
            return this;
        },
        send:function(options){
			//console.log('$w().send invoked');
			//Ex: $w('#flickrWidget').send({message: address});
			if(!this.selector) {
				console.error("Error in $sw.send: Widget does not exist. Please ensure that the selector is correct.");
				return;
			}
			var msg=options.message || '';
			var targetOrigin = options.origin || '*';
			var targetFrame = this.selector.contentWindow;
			targetFrame.postMessage(msg, targetOrigin);
            return this;
        }
    }
	
	sw.receive=function(options){
		//Ex: $w.receive({from: 'http://localhost:3000', callback: receiveMessage});
		if(!options.callback){
			console.error("Error in $sw.receive: Please configure 'callback' property");
			return;
		}
		window.addEventListener("message", function(event){
			//console.log('$sw.receive invoked');
			if(options.from){
				if (event.origin !== options.from){
					console.warn('Blocked an unauthorized attempt to send messages!');
					return;
				}
			}
			else{
				var msg="Warning in $sw.receive: You current configuration receives messages from any random origin. "+
				"Please configure the 'from' property wisely.";
				console.warn(msg);
			}
			options.callback(event);
		}, false);
		return this;
	}
	
	sw.applyCSP=function(policy){
		//Ex: $w.applyCSP("img http://localhost:3000");
		console.log('configureCSP: ', policy);
		var cspMetaTag=document.createElement('meta');
		cspMetaTag.setAttribute('http-equiv','Content-Security-Policy');
		cspMetaTag.setAttribute('content', policy);
		document.getElementsByTagName('head')[0].appendChild(cspMetaTag);
	}
	
    if(!window.$w) {
        window.$w = sw;
    }
})();