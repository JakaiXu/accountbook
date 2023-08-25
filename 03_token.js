const jwt = require("jsonwebtoken");
// let token = jwt.sign(
//   {
//     username: "zhangsan",
//   },
//   "atguigu",
//   {
//     expiresIn:60
//   }
// );
// console.log(token);
let t ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNjkyOTYwNTA0LCJleHAiOjE2OTI5NjA1NjR9.IrvtvZsdPuhjn7kkUuYlnkMK4TW6sn7vwz08aTn8lhE';
jwt.verify(t,'atguigu',(err,data) => {
    if(err){
        console.log('verify failed');
        return
    }
    console.log(data);
})