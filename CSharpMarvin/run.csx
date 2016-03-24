using System;
using System.Net;
using System.Threading.Tasks;

public static Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    var queryParamms = req.GetQueryNameValuePairs()
        .ToDictionary(p => p.Key, p => p.Value, StringComparer.OrdinalIgnoreCase);

    log.Verbose($"C# HTTP trigger function processed a request. RequestUri={req.RequestUri}");

    HttpResponseMessage res = null;
    string name;
    if (queryParamms.TryGetValue("name", out name))
    {
        res = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent("Hello " + name + ", you old mucker")
        };
    }
    else
    {
        res = new HttpResponseMessage(HttpStatusCode.BadRequest)
        {
            Content = new StringContent("Please pass a name on the query string")
        };
    }

    return Task.FromResult(res);
}
