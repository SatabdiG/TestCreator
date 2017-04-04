function Node(type, id, name)
{
    this.type=mssg;
    this.id=id;
    this.name=name;
}

exports.create=function(type, id, name)
{
    return new Node(type, id, name);
}