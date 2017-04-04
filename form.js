function Form()
{
    this.elems=[];
    console.log("Message "+mssg);
   
}

Form.prototype.addElem=function(nodes)
{
    this.elems.push(nodes)
}

Form.prototype.getElems=function()
{  
    return this.elems;
}

exports.create=function()
{
    return new Form();
};
