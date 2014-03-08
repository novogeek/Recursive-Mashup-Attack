/*
* SafeMash.js: A framework for ensuring privilege separation and secure interactions in web mashups.
* Author: Krishna Chaitanya Telikicherla (@novogeek)
* Date: 22-01-2014	
*/

(function(){
    var sm=function(selector){
        return new safeMash(selector);
    }
 
    var safeMash=function(selector){
		this.selector = document.querySelectorAll(selector)[0],
        this.version = '0.1.0';
		return this;
    };    
 
	//Extend the safeMash function object using prototype.
    safeMash.prototype={	
        init:function(){
			console.log('init this:', this);
            return this;
        },
        createWidget:function(options){
			//Ex: $sm.createWidget({id: 'widgetId', loadPage: page.html, csp:'img-src http://localhost:3000'});
			//console.log('createWidget: ', options, ' :: ', this.selector, ' :: ', widget);
			var widgetId= options.id || Math.floor((Math.random()*1000)+1);
			if(options.loadPage){
				//sandbox="allow-scripts allow-same-origin"
				var widget='<div id="divIfrWrap">'+
				'<iframe sandbox="allow-scripts allow-same-origin" id="'+widgetId+'"'+
				' src="'+options.loadPage+'" scrolling="no"></iframe></div>';
				
				/*		
				// The idea is to check if CSP is inherited by nested frames. Unfortunately it doesn't.
				if(options.csp){
					//widget+=' onload="$m.ifrLoad(\''+widgetId+'\')"></iframe></div>';
					widget+=' onload="$m.ifrLoad(\''+widgetId+'\',\''+options.csp+'\' )"></iframe></div>';
				}else{
					widget+='></iframe></div>';
				}
				*/
				
				this.selector.innerHTML=widget;
				//
				if(options.csp){
					//console.log('csp: true');
					setTimeout(function(){
						sm('#'+widgetId).send({message: options.csp});
					}, 80);
				}
			}
            return this;
        },
		send:function(options){
			//Ex: $m('#flickrWidget').send({message: address, origin: {target}});
			if(!this.selector) {
				console.error("Error in $sw.send: Widget does not exist. Please ensure that the selector is correct.");
				return;
			}
			var msg=options.message || '';
			var targetOrigin = options.origin || '*';
			var targetFrame = this.selector.contentWindow;
			targetFrame.postMessage(msg, targetOrigin);
			console.log('$m(id).send invoked', this.selector);
            return this;
        }
    }
	
	sm.receive=function(options){
		//Ex: $sw.receive({from: 'http://localhost:3000', callback: receiveMessage});
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
	
    if(!window.$m) {
        window.$m = sm;
    }
})();