// foreach loop

// let arr=[1,2,3,4,5];
// arr.forEach(function(val){
//     console.log(val+ " Hello");
// })
// arr.forEach((val)=>{
//     console.log(val+ " World");
// }
// )

// Map

// let arr=[1,2,3,4,5];
// let newarr= arr.map((val)=>{
//     return val*2;   
// })
// console.log(newarr);

// filter

// let arr=[1,2,3,4,5];
// let newarr= arr.filter((val)=>{
//     if(val>3){
//         return true;
//     } 
//     else{
//         return false;
//     }
// })
// console.log(newarr);


// find 
// let arr=[1,2,3,4,5];
// let newarr= arr.find((val)=>{
//     if(val>3){

//         console.log(val) ;
//     }           
   
// })

// objects

// let obj={
//     name:"kiran",
//     age:21, 
//     hobbies:["coding","reading","gaming"],
//     greet:function(){
//         console.log("Hello");
//     }
// };
// console.log(obj.name);
// let hobby = obj.hobbies.map((val) => {
//     return val;
// });
// console.log(hobby); 
// obj.greet();

let  userdata= async function(){
    let user= await fetch('https://randomuser.me/api/');
    let data= await user.json();
    console.log(data);

}
userdata();