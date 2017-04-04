var page=require('webpage').create();
var fs=require("fs");

var url="https://www.python.org/";

page.onConsoleMessage = function (msg) { console.log(msg); };

page.open(url, function(status)
{
    console.log("Status is"+status);
    if(status!="success")
    {
        console.log("Cannot open webpage");
        phantom.exit();
    }else{
        //webpage can be opened
        //Inject Jquery
        var pageobj={};
        pageobj.url=url;
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function(){            
               var frms = page.evaluate(function(){                
               var count = 0;
               var frms = [];
               var forms = document.getElementsByTagName("form");
               console.log("length of form" + forms.length);
               for(var i = 0 ; i < forms.length ; i++)
               {                   
                   var form={};
                   var nodes=[];
                   form.name=count;
                   count+=1;
                   console.log("Collecting Data for Form : " + count);
                   var elems=forms[i].elements;                   
                   for(var j=0;j<elems.length;j++)
                   {
                       var node={};
                       var id=elems[j].getAttribute("id");                                      
                       var name=elems[j].getAttribute("name");
                       var type=elems[j].getAttribute("type");
                       if(id!=null)
                       {
                           node.id=id;                          
                           node.name=name;
                           node.type=type;
                           nodes.push(JSON.stringify(node));
                       }
                   }
                   form.elements=nodes;
                   frms.push(JSON.stringify(form));
               }
               return frms;
             }, 'frms'); 
             console.log("Returned : "+frms);
             //Attach forms to the Page object
             pageobj.forms=frms;
             fs.write("Page.txt", JSON.stringify(pageobj), "w");
             //Write Page object to a file
             phantom.exit();
        });
    }

});

