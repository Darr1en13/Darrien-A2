var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);


function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    try
    {
 
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var result = {};
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == 'CalcCharge')
    {
      result = serviceCharge(query);
    }
    else
    throw Error("The Command " + query['cmd'] + " is not a valid command");

    
   
 if (query['cmd'] == undefined)
      throw Error("A command must be specified");
        
 
    res.write(JSON.stringify(result));
    res.end('');
 

    }  
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
  
    
    }
  
//==============================================================================
function serviceCharge(query)
{

 console.log(query);
 var checkBal = query['checkBal'];
 var savingsBal = query['savingsBal'];
 var checks = query['checks'];
 var final ={};
 
//================================================= 


 if(isNaN(checks) || checks<0)
    throw Error("Checks must be a valid number");

if(isNaN(savingsBal) || savingsBal<0)
   throw Error("savingsBal must be a valid number");

if(isNaN(checkBal) || checkBal<0)
   throw Error("checkBal must be a valid number");
   


    
//================================================= 

 
 if(savingsBal>1000 || checkBal>1500)
 {
    final = {Charge: 0};
 }
 else if(savingsBal<=1000 || checkBal<=1500)
 {
    final= {Charge : query['checks']*.15};
     
 }

     return final;
}


  












