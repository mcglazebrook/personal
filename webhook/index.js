
module.exports = function (context, req) {
    context.log('Node.js HTTP trigger function processed a request. Name=' + req.originalUrl);


    //Let's take the req.body object and break it apart, building a JSON object for easier use.

    var reqbody = req.body.toString().split("&");
        //context.log("reqbody Length: " + reqbody.length);

    var reqbodyJSON_build = '{';

    for (var i = 0; i < reqbody.length; i++ ) {
        //context.log("reqbody[" + i + "]:" + reqbody[i]);
        if (i > 0 ) { 
            reqbodyJSON_build = reqbodyJSON_build + ','
        }
        
        reqbodyJSON_build = reqbodyJSON_build + '"' + reqbody[i].split("=")[0] + '":"' + reqbody[i].split("=")[1] + '"'
    }
    
    reqbodyJSON_build = reqbodyJSON_build + '}';
    
    var reqbodyJSON = JSON.parse(reqbodyJSON_build);

    //Ok, now we can actually start processing the request object.

    if (reqbodyJSON.token !== "rmxkmCp3juMMHknauajLacW4")
    {
        context.log("Token not recognized, returning 404");
        context.res = {
            status: 404
        }
        context.done()
    }
    else
    {
        context.log("Processing text: " + reqbodyJSON.text)
    
        var userName = reqbodyJSON.user_name;
        
        var botPayload = {
            text : "I'm not getting you down at all, am I?"
        }
    
        if (userName !== 'slackbot') {
            context.res = {
                status: 200,
                body: botPayload
            }
        }
        else {
            context.res = {
                status: 200
            }
            //context.res = {
                // status: 200, /* Defaults to 200 */
             //   body: "Hello " + req.query.name
            //}
        }
    }
    context.log(JSON.stringify(context.res));
    
    context.done();
};