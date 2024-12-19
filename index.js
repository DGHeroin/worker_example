const welcome = "<h1>Welcome to Worker1!</h1>";

var api = require('api');
exports.default = {
    fetch: async function(request, env, ctx) {
        let url;
        try {
            url = new URL(request.url);
        } catch (error) {
            console.error('Error creating URL object:', error);
            console.log('request.url:', request.url);
            return new Response('Invalid URL', { status: 400 });
        }
      
//       cache_set("user", "key_1", 12345, 123)
//       var result = cache_get("user", "key_1")
//       console.log("cache got:"+JSON.stringify(result))
//       // 创建用户
//       collection_update('user', {
//       	name:"my name 666",
//         email:"a@a.com",
//         password:"password",
//         age:25
//       })
      var records= collection_query("user", {
      	"limit":10 ,
        "filters":["email", "=", "a@a.com"]
      })
      console.log('records:', JSON.stringify(records))
        let response;
        switch (url.pathname) {
            case '/':
                response = new Response(welcome, {
                    status: 200,
                    headers: { 'Content-Type': 'text/html' }
                });
                break;
            case '/api':
                response = api.process(request, env, ctx);
                break;
            default:
                response = new Response('Not Found: ' + url.pathname, {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' }
                });
        }
        return response;
    },
    websocket : async function(message){
        console.log('Received WebSocket message:', message);
        return 'Hello from js worker!';
    },
    onOpen : function (){
        console.log("WebSocket connection opened");
        this.interval = setInterval(() => {
            sendMessage("Periodic message from server");
        }, 2000);
    },
    onClose : function (){
        console.log("WebSocket connection closed");
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
};
