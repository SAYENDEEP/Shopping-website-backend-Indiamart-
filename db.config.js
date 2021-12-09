module.exports=
{
    HOST:"localhost",
    USER:"postgres",
    PASSWORD:"6290472564",
    DB:"db1",
    dialect:"postgres",
    // logging:false,
    pool:{
        max:20,
        min:0,
        acquire:30000,
        idle:10000
    }
};