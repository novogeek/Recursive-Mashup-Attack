This demo shows how a frame phishing attack can be launched on iframes making use of "Descendent navigation policy" followed by web browsers. In this, data sent from a genuine site to its partner widget is stolen by the attacker using an evil widget.

Setup: There are 3 folders-partner, postMessage and attacker. Host each of them at different origins (host them on different domains or point them to different port numbers).

>>The partner site just listens to onmessage event and prints the data. 

>>The postMessage site contains an iframe to partner site and sends message to the partner using HTML5 postMessage API.

>>The attacker site has an iframe to postMessage site. Once the postMessage site is loaded in iframe, the attacker site redirects the partner site iframe to an evil gadget. This frame navigation is possible due to the "Descendent policy" followed by web browsers. Now, if the postMessage site sends a message to partner, it is actually reached to the evil gadget!!

This particular framing attack is called "Recursive Mashup attack". To prevent this attack, make sure your site uses frame busting techniques like JavaScript redirection or sending X-Frame-Options response header.

###UPDATE (8/3/2014):
Check the [nodeJs branch](https://github.com/novogeek/Recursive-Mashup-Attack/tree/nodeJs) of this repo for NodeJs version. Thanks to Node., running cross origin demos is easier as we can run 2 servers on different ports programmatically.
